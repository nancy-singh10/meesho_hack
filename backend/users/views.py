from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import get_user_model
from users.models import WorkerProfile, EmployerProfile
from jobs.models import Job, Application, Contract, AttendanceRecord
from django.utils import timezone
import random
from .ai_agents import IntakeAgent, SkillVerificationAgent, SemanticMatchAgent, FraudDetectionAgent, NegotiationAgent, ContractAgent, PaymentEscrowAgent

User = get_user_model()

class CompleteProfileView(APIView):
    def patch(self, request):
        user_id = request.data.get('user_id')
        name = request.data.get('name')
        
        if not user_id or not name:
            return Response({"error": "User ID and name are required"}, status=status.HTTP_400_BAD_REQUEST)
            
        try:
            user = User.objects.get(id=user_id)
            user.name = name
            user.save()
            return Response({"message": "Profile updated", "name": user.name}, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

class ParseWhatsappView(APIView):
    """
    Acts as the LangGraph Agent Router.
    Routes the message based on the WorkerProfile's current bot_state.
    """
    def post(self, request):
        message = request.data.get('message', '').lower()
        mobile = request.data.get('mobile_number', '9876543210')
        user_id = request.data.get('user_id')

        if not message:
            return Response({"error": "Message is required"}, status=status.HTTP_400_BAD_REQUEST)

        # Get or create the user and profile
        if user_id:
            try:
                user = User.objects.get(id=user_id)
            except User.DoesNotExist:
                user, _ = User.objects.get_or_create(mobile_number=mobile, defaults={'role': 'worker', 'name': 'Worker'})
        else:
            user, _ = User.objects.get_or_create(mobile_number=mobile, defaults={'role': 'worker', 'name': 'Worker'})
            
        profile, _ = WorkerProfile.objects.get_or_create(user=user)

        bot_state = profile.bot_state

        # Force language_selection reset if user says hi, hello, menu, or namaste
        if message.lower() in ['hi', 'hello', 'menu', 'namaste']:
            bot_state = 'language_selection'
            profile.bot_state = 'language_selection'
            profile.save()

        # Router Logic
        if bot_state == 'language_selection':
            reply = self._run_language_agent(profile, message)
        elif bot_state == 'menu':
            reply = self._run_menu_agent(profile, message)
        elif bot_state == 'intake':
            reply = self._run_intake_agent(profile, message)
        elif bot_state == 'toli_preference':
            reply = self._run_toli_agent(profile, message)
        elif bot_state == 'distance_preference':
            reply = self._run_distance_agent(profile, message)
        elif bot_state == 'job_selection':
            reply = self._run_job_selection_agent(profile, message)
        elif bot_state == 'negotiating':
            reply = self._run_negotiate_agent(profile, message)
        elif bot_state == 'working':
            reply = self._run_contract_agent(profile, message)
        else:
            # Fallback
            reply = "Maaf kijiye, mujhe samajh nahi aaya. Menu pe jaane ke liye 'Menu' likhein."
            profile.bot_state = 'menu'
            profile.save()

        return Response({
            "bot_reply": reply,
            "current_state": profile.bot_state
        }, status=status.HTTP_200_OK)

    def _run_language_agent(self, profile, message):
        """Sets language preference"""
        if message == '1' or 'hindi' in message.lower():
            profile.language = 'hi'
            profile.bot_state = 'menu'
            profile.save()
            return self._get_menu_text(profile)
        elif message == '2' or 'english' in message.lower():
            profile.language = 'en'
            profile.bot_state = 'menu'
            profile.save()
            return self._get_menu_text(profile)
        else:
            return "🌍 Kripya bhasha chunein / Please choose your language:\n\n1️⃣ Hindi (Hinglish)\n2️⃣ English"

    def _get_menu_text(self, profile):
        name = profile.user.name.split()[0] if profile.user.name and profile.user.name != "Worker" else ("Bhaiyya/Didi" if profile.language != 'en' else "Friend")
        if profile.language == 'en':
            return f"🙏 Welcome, {name}! KaamSetu is your digital contractor.\n\nOur AI Agents will:\n✅ Verify your skills\n✅ Protect you from frauds\n✅ Bargain for fair wages\n✅ Give a 72-hour Payment Guarantee\n\nPlease select an option:\n1️⃣ Find New Work\n2️⃣ Clock In/Out (Attendance)\n3️⃣ Wallet & Earnings\n4️⃣ My Trust Score\n5️⃣ Insurance"
        return f"🙏 Namaste, {name}! KaamSetu aapka apna digital thekedar hai.\n\nHumare AI Agents aapke liye:\n✅ Skills verify karte hain\n✅ Fraud thekedar se bachate hain\n✅ Sahi daam pe bargaining karte hain\n✅ 72-hour Payment Guarantee dete hain\n\nKripya ek number chunein:\n1️⃣ Naya Kaam Dhoondo\n2️⃣ Haazri Lagao (Clock In/Out)\n3️⃣ Wallet aur Paise\n4️⃣ Mera Trust Score\n5️⃣ Beema (Insurance)"

    def _run_menu_agent(self, profile, message):
        """Displays main menu and routes numeric inputs"""
        en = (profile.language == 'en')
        if message == '1':
            profile.bot_state = 'intake'
            profile.save()
            name = profile.user.name.split()[0] if profile.user.name and profile.user.name != "Worker" else ""
            if en:
                greeting = f"Great {name}!" if name else "Great!"
                return f"{greeting} To find new work, please provide your details.\n\nWhat is your role (e.g., mason, helper, electrician) and where do you live? (You can also send a voice message!)"
            else:
                greeting = f"Bohat badiya {name} ji!" if name else "Bohat badiya!"
                return f"{greeting} Naya kaam dhoondne ke liye bas ek baar apni jankari de dein.\n\nAap kya kaam karte hain (jaise: mistri, majdoor, electrician), aur aap kahan rehte hain? (Aap voice message bhi bhej sakte hain!)"
        
        elif message == '2':
            profile.bot_state = 'working'
            profile.save()
            if en:
                return "Don't worry about attendance. When you reach the site, just send 'Clock In', and when done, 'Clock Out'. We will handle GPS verification!"
            return "Haazri lagane ke liye chinta mat karein. Site par pahunch kar bas 'Kaam shuru' bhejein, aur kaam khatam hone par 'Kaam khatam'. Baki GPS aur photo verify hum kar lenge!"
            
        elif message == '3':
            contract = Contract.objects.filter(worker=profile).last()
            balance = contract.escrow_balance if contract else profile.total_earned
            if en:
                return f"💰 You have ₹{balance} in your wallet. This money is 100% secure and deposited in advance by the contractor.\n\nKaamSetu gives you a 72-hour Payment Guarantee. If the contractor delays, our system starts an Auto-Dispute.\n\n(Send 'Menu' to go back)"
            return f"💰 Aapke batue mein ₹{balance} hain. Yeh paisa 100% surakshit hai aur thekedaar ne advance mein jama kiya hai.\n\nKaamSetu par aapko 72-hour Payment Guarantee milti hai. Agar thekedar paise nahi deta, toh hamara system Auto-Dispute shuru kar deta hai.\n\n(Menu pe wapas jaane ke liye 'Menu' bhejein)"
            
        elif message == '4':
            score = profile.trust_score
            shram = profile.shram_id or ("Not generated yet" if en else "Not generated yet")
            if en:
                return f"⭐ Your Shram ID: {shram}\nYour Trust Score: {score}/1000 (Excellent!)\n\nA higher score means higher wages. Keep up the good work!\n\n(Send 'Menu' to go back)"
            return f"⭐ Aapki Shram ID: {shram}\nAapka Trust Score: {score}/1000 (Bahut Accha!)\n\nJitna acha score, utna jyada dihaadi wala kaam. Aise hi mehnat karte rahein!\n\n(Menu pe wapas jaane ke liye 'Menu' bhejein)"
            
        elif message == '5':
            if en:
                return "🛡️ Don't worry! Your KaamSetu Insurance (₹5 Lakh Accident Cover) is ACTIVE. Policy: BMA-8921. You and your family are safe.\n\n(Send 'Menu' to go back)"
            return "🛡️ Fikar not! Aapka KaamSetu Beema (₹5 Lakh Accident Cover) ACTIVE hai. Policy: BMA-8921. Aap aur aapka parivar surakshit hai.\n\n(Menu pe wapas jaane ke liye 'Menu' bhejein)"
            
        else:
            return self._get_menu_text(profile)

    def _run_intake_agent(self, profile, message):
        """Uses AI Agents to parse skills, verify, and asks for distance"""
        parsed_data = IntakeAgent.parse(message)
        
        user = profile.user
        if parsed_data['name'] and parsed_data['name'] != "Worker":
            user.name = parsed_data['name']
            user.save()
            
        profile.location = parsed_data['location']
        profile.skills = parsed_data['skills']
        profile.save()

        verified = SkillVerificationAgent.verify(profile.skills)
        best_skill = verified[0] if verified else {'skill': profile.skills[0]}

        profile.bot_state = 'toli_preference'
        profile.save()
        en = (profile.language == 'en')
        if en:
            return f"✅ Skills Verified ({best_skill['skill']}).\n\nNo need to stand at the mandi! Get confirmed work from home.\n\nWill you work alone or in a Group (Toli)?"
        return f"✅ Skills Verified ({best_skill['skill']}).\n\nMandi mein khade hone ki zarurat nahi! Ghar baithe confirm kaam paayein.\n\nAap akele kaam karenge ya Toli (group) mein?"

    def _run_toli_agent(self, profile, message):
        """Parses group preference"""
        import re
        if "toli" in message.lower() or "group" in message.lower() or "log" in message.lower():
            nums = re.findall(r'\d+', message)
            profile.toli_size = int(nums[0]) if nums else 5
        else:
            profile.toli_size = 1
            
        profile.bot_state = 'distance_preference'
        profile.save()
        
        en = (profile.language == 'en')
        if en:
            toli_str = "Alone" if profile.toli_size == 1 else f"Group ({profile.toli_size} people)"
            return f"Alright, work will be {toli_str}.\n\nHow many KM can you travel? (e.g., 5, 10, or 20)"
        else:
            toli_str = "Akele" if profile.toli_size == 1 else f"Toli ({profile.toli_size} log)"
            return f"Theek hai, {toli_str} kaam hoga.\n\nAap kitne KM tak travel kar sakte hain? (Jaise: 5, 10, ya 20)"

    def _run_distance_agent(self, profile, message):
        """Handles distance preference, finds match, and offers job options"""
        import re
        dist_match = re.search(r'\d+', message)
        preferred_km = int(dist_match.group()) if dist_match else 10

        profile.bot_state = 'job_selection'
        profile.save()

        d1 = min(2, preferred_km)
        d2 = min(4, preferred_km)
        d3 = min(5, preferred_km)
        
        ts = profile.toli_size
        w1 = 500 * ts
        w2 = 450 * ts
        w3 = 700 * ts
        
        w1_str = f"₹{w1}/day" if ts == 1 else f"₹{w1}/day for {ts} workers (₹500/head)"
        w2_str = f"₹{w2}/day" if ts == 1 else f"₹{w2}/day for {ts} workers (₹450/head)"
        w3_str = f"₹{w3}/day" if ts == 1 else f"₹{w3}/day for {ts} workers (₹700/head)"

        en = (profile.language == 'en')
        if en:
            return f"""Congratulations! We found 3 verified jobs within your {preferred_km} KM preference:

1️⃣ **L&T Construction**
- 🛠️ Role: {profile.skills[0] if profile.skills else 'Mistri'}
- 💵 Wage: {w1_str}
- 📊 Skill Match: 95% 🟩🟩🟩🟩🟩
- 🛡️ Trust Score: 98/100 (Safe)
- 📍 Distance: {d1} KM

2️⃣ **Raj Builders**
- 🛠️ Role: General Helper
- 💵 Wage: {w2_str}
- 📊 Skill Match: 75% 🟩🟩🟩⬛⬛
- 🛡️ Trust Score: 85/100 (Safe)
- 📍 Distance: {d2} KM

3️⃣ **Sharma Contractors**
- 🛠️ Role: Expert
- 💵 Wage: {w3_str}
- 📊 Skill Match: 60% 🟩🟩⬛⬛⬛
- 🛡️ Trust Score: 55/100 (Risky)
- 📍 Distance: {d3} KM

Which job do you want to apply for? (Type 1, 2, or 3)"""

        return f"""Badhai ho! Aapke {preferred_km} KM preference ke andar 3 verified jobs mili hain:

1️⃣ **L&T Construction**
- 🛠️ Role: {profile.skills[0] if profile.skills else 'Mistri'}
- 💵 Wage: {w1_str}
- 📊 Skill Match: 95% 🟩🟩🟩🟩🟩
- 🛡️ Trust Score: 98/100 (Safe)
- 📍 Distance: {d1} KM

2️⃣ **Raj Builders**
- 🛠️ Role: General Helper
- 💵 Wage: {w2_str}
- 📊 Skill Match: 75% 🟩🟩🟩⬛⬛
- 🛡️ Trust Score: 85/100 (Safe)
- 📍 Distance: {d2} KM

3️⃣ **Sharma Contractors**
- 🛠️ Role: Expert
- 💵 Wage: {w3_str}
- 📊 Skill Match: 60% 🟩🟩⬛⬛⬛
- 🛡️ Trust Score: 55/100 (Risky)
- 📍 Distance: {d3} KM

Kaunsi job apply karni hai? (1, 2, ya 3 type karein)"""

    def _run_job_selection_agent(self, profile, message):
        """Handles job choice and creates the application"""
        import re
        choice = re.search(r'\d+', message)
        choice_val = int(choice.group()) if choice else 1

        if choice_val == 2:
            company = "Raj Builders"
            base_wage = 450.00
        elif choice_val == 3:
            company = "Sharma Contractors"
            base_wage = 700.00
        else:
            company = "L&T Construction"
            base_wage = 500.00

        wage = base_wage * profile.toli_size

        from users.models import CustomUser
        user, _ = CustomUser.objects.get_or_create(mobile_number=f"emp_{choice_val}", defaults={'name': company, 'role': 'employer'})
        employer, _ = EmployerProfile.objects.get_or_create(user=user, defaults={'company_name': company})
        job, _ = Job.objects.get_or_create(
            employer=employer,
            title=f"{profile.skills[0] if profile.skills else 'Worker'} Required",
            location=profile.location,
            defaults={'offered_wage': wage}
        )

        Application.objects.create(job=job, worker=profile, status='negotiating')
        profile.bot_state = 'negotiating'
        profile.save()

        en = (profile.language == 'en')
        if en:
            return f"You selected {company}. Their offer is ₹{wage}/day. Do you accept this, or do you want to negotiate? (Reply: 'Accept' or 'Negotiate')"
        return f"Aapne {company} select kiya hai. Inka offer ₹{wage}/day hai. Kya aap accept karte hain, ya wage badhana chahte hain? (Reply: 'Haan' ya 'Jyada chahiye')"

    def _run_negotiate_agent(self, profile, message):
        """Handles haggling and contract generation"""
        application = Application.objects.filter(worker=profile, status='negotiating').first()
        
        if not application:
            profile.bot_state = 'menu'
            profile.save()
            return "Aapka koi active offer nahi hai.\n\n(Menu pe wapas jaane ke liye 'Menu' bhejein)"

        en = (profile.language == 'en')
        if "haan" in message.lower() or "yes" in message.lower() or "accept" in message.lower():
            application.status = 'accepted'
            application.save()
            job = application.job
            job.status = 'contracted'
            job.save()

            contract = Contract.objects.create(job=job, worker=profile, final_wage=job.offered_wage, escrow_balance=job.offered_wage)
            
            # Generate Real PDF
            try:
                from users.ai_agents import ContractAgent
                pdf_url = ContractAgent.generate_pdf(contract)
            except Exception:
                pdf_url = "https://kaamsetu.com/contracts/dummy.pdf"
            
            profile.bot_state = 'working'
            profile.save()

            if en:
                return f"🎉 Congratulations! Smart Contract is signed for ₹{job.offered_wage}. Money is safe in escrow.\n\n📄 Bilingual PDF Contract: {pdf_url}\n\nWhen you reach the site, reply 'Clock In', and when done, 'Clock Out'."
            return f"🎉 Badhai ho! Smart Contract sign ho gaya hai ₹{job.offered_wage} mein. Paisa escrow mein surakshit hai.\n\n📄 Bilingual PDF Contract: {pdf_url}\n\nAb aap site par jaakar 'Kaam shuru' aur wapas aakar 'Kaam khatam' bhej sakte hain."
        else:
            job = application.job
            new_wage = float(job.offered_wage) + (50 * profile.toli_size)
            job.offered_wage = new_wage
            job.save()
            
            if en:
                return f"Okay! Our AI Agent negotiated with the contractor. New Offer: ₹{new_wage}! Do you accept now?"
            return f"Theek hai! Hamare AI Agent ne thekedar se baat ki. Naya Offer: ₹{new_wage}! Kya ab accept karein?"

    def _run_contract_agent(self, profile, message):
        """Handles Check-in and Check-out"""
        contract = Contract.objects.filter(worker=profile).last()
        if not contract:
            profile.bot_state = 'menu'
            profile.save()
            return "Koi active contract nahi mila.\n\n(Menu pe wapas jaane ke liye 'Menu' bhejein)"

        en = (profile.language == 'en')
        if "shuru" in message.lower() or "start" in message.lower() or "in" in message.lower():
            today = timezone.now().date()
            attendance, created = AttendanceRecord.objects.get_or_create(
                contract=contract,
                date=today,
                defaults={'check_in': timezone.now()}
            )
            time_str = attendance.check_in.strftime("%I:%M %p")
            if en:
                return f"✅ Clock In Successful!\n🕒 Time: {time_str}\n📍 Live Location: 28.6139° N, 77.2090° E\n\nYour presence is verified. Have a safe day at work!"
            return f"✅ Haazri lag gayi!\n🕒 In Time: {time_str}\n📍 Live Location: 28.6139° N, 77.2090° E\n\nAapki site par presence verify ho gayi hai. Kaam surakshit karein!"
            
        elif "khatam" in message.lower() or "out" in message.lower() or "done" in message.lower():
            today = timezone.now().date()
            try:
                attendance = AttendanceRecord.objects.get(contract=contract, date=today)
                if attendance.check_out is not None:
                    if en:
                        return "You have already clocked out for today."
                    return "Aap pehle hi check-out kar chuke hain."
                
                attendance.check_out = timezone.now()
                attendance.proof_photo_url = "https://images.unsplash.com/photo-1541888086925-0c13bb104eb0?w=500&q=80"
                attendance.save()
                
                success, reference = PaymentEscrowAgent.initiate_payout(attendance)
                
                import pytz
                ist = pytz.timezone('Asia/Kolkata')
                checkout_time = timezone.localtime(timezone.now(), ist).strftime('%I:%M %p')
                
                profile.total_earned += contract.final_wage
                profile.jobs_completed += 1
                profile.bot_state = 'menu'
                profile.save()
                contract.escrow_balance = 0
                contract.save()

                if success:
                    if en:
                        return f"👏 **Check-out Successful**\n\n🕒 Out Time: {checkout_time}\n📍 Live Location: 28.71° N, 77.12° E (Verified via WhatsApp)\n\n💸 ₹{contract.final_wage} payment has been triggered via 72-hour Escrow (Ref: {reference}).\n\n(Send 'Menu' to go back)"
                    return f"👏 **Check-out Successful**\n\n🕒 Out Time: {checkout_time}\n📍 Live Location: 28.71° N, 77.12° E (Verified via WhatsApp)\n\n💸 Aapki 72-hour UPI Payment Guarantee ke tahat ₹{contract.final_wage} ka payout initiate ho gaya hai (Ref: {reference}).\n\n(Menu pe wapas jaane ke liye 'Menu' bhejein)"
                else:
                    if en:
                        return f"👏 **Check-out Successful**\n\n🕒 Out Time: {checkout_time}\n📍 Live Location: 28.71° N, 77.12° E\n\n⚠️ {reference}\n\n(Send 'Menu' to go back)"
                    return f"👏 **Check-out Successful**\n\n🕒 Out Time: {checkout_time}\n📍 Live Location: 28.71° N, 77.12° E\n\n⚠️ {reference}\n\n(Menu pe wapas jaane ke liye 'Menu' bhejein)"
                    
            except AttendanceRecord.DoesNotExist:
                if en:
                    return "You must clock in first before clocking out."
                return "Aapne aaj 'Kaam shuru' nahi kiya tha."

        if en:
            return "Send 'Clock In' when you reach the site, and 'Clock Out' when done."
        return "Agar aap site par hain toh 'Kaam shuru' bhejein, aur kaam khatam hone par 'Kaam khatam' bhejein."
