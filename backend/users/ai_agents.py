import random
import re
import math
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A4
import os
from django.conf import settings
from django.utils import timezone
from .models import EmployerProfile
from jobs.models import Job, Contract, PaymentTransaction, Application

class IntakeAgent:
    @staticmethod
    def parse(message):
        """Extracts Name, Location, and Skills using regex/keywords"""
        msg = message.lower()
        extracted_name = "Worker"
        extracted_location = "Unknown"
        extracted_skills = []

        # Simple regex for 'naam [name] hai' or 'mera naam [name]'
        name_match = re.search(r'naam\s+([a-z]+)', msg)
        if name_match:
            extracted_name = name_match.group(1).capitalize()
        else:
            # Fallback checks
            if 'ramesh' in msg: extracted_name = "Ramesh"
            elif 'suresh' in msg: extracted_name = "Suresh"
            elif 'mohan' in msg: extracted_name = "Mohan"
            elif 'nancy' in msg: extracted_name = "Nancy"
        
        # Location matching
        locations = ['patna', 'lucknow', 'delhi', 'mumbai', 'bengaluru', 'pune', 'gurgaon', 'noida']
        for loc in locations:
            if loc in msg:
                extracted_location = loc.capitalize()
                break

        if extracted_location == "Unknown":
            extracted_location = "Lucknow" # Default fallback for demo

        # Skill matching
        skill_keywords = {
            'Electrician': ['electrician', 'bijli', 'wire', 'light'],
            'Shuttering': ['shuttering', 'rcc', 'slab', 'lenter'],
            'Plumber': ['plumber', 'pani', 'pipe', 'nal'],
            'Mason': ['mason', 'mistri', 'eet', 'chunaai'],
            'Painter': ['painter', 'paint', 'rang', 'putty']
        }

        for skill, keywords in skill_keywords.items():
            if any(k in msg for k in keywords):
                extracted_skills.append(skill)

        if not extracted_skills:
            extracted_skills = ["General Helper"]

        return {
            'name': extracted_name,
            'location': extracted_location,
            'skills': extracted_skills
        }


class SkillVerificationAgent:
    @staticmethod
    def verify(skills):
        """Simulates OCR/certificate verification, returning confidence"""
        verified_skills = []
        for skill in skills:
            confidence = random.randint(85, 99)
            verified_skills.append({
                'skill': skill,
                'verified': True,
                'confidence': confidence
            })
        return verified_skills


class SemanticMatchAgent:
    # Mock coordinates for calculation
    COORDS = {
        'Lucknow': (26.8467, 80.9462),
        'Patna': (25.5941, 85.1376),
        'Delhi': (28.7041, 77.1025),
        'Mumbai': (19.0760, 72.8777),
        'Unknown': (0, 0)
    }

    @staticmethod
    def calculate_distance(loc1, loc2):
        if loc1 not in SemanticMatchAgent.COORDS or loc2 not in SemanticMatchAgent.COORDS:
            return random.randint(2, 15) # Fallback

        lat1, lon1 = SemanticMatchAgent.COORDS[loc1]
        lat2, lon2 = SemanticMatchAgent.COORDS[loc2]

        # Haversine formula
        R = 6371 # Earth radius in km
        dlat = math.radians(lat2 - lat1)
        dlon = math.radians(lon2 - lon1)
        a = math.sin(dlat/2) * math.sin(dlat/2) + math.cos(math.radians(lat1)) * math.cos(math.radians(lat2)) * math.sin(dlon/2) * math.sin(dlon/2)
        c = 2 * math.atan2(math.sqrt(a), math.sqrt(1-a))
        distance = R * c
        
        # If it's the exact same city, mock a small internal distance 2-8km
        if distance < 1:
            return random.randint(2, 8)
        return int(distance)

    @staticmethod
    def find_match(worker_profile):
        """Finds open jobs matching skills and location"""
        jobs = Job.objects.filter(status='open')
        best_match = None
        best_score = 0
        distance = 0

        for job in jobs:
            score = 50
            if worker_profile.location and job.location and worker_profile.location.lower() == job.location.lower():
                score += 30
            
            # Intersection of skills
            job_skills = set(job.required_skills)
            worker_skills = set(worker_profile.skills)
            if job_skills & worker_skills:
                score += 20
            
            if score > best_score:
                best_score = score
                best_match = job
                distance = SemanticMatchAgent.calculate_distance(worker_profile.location, job.location)

        # Fallback if none matched
        if not best_match and jobs.exists():
            best_match = jobs.first()
            distance = SemanticMatchAgent.calculate_distance(worker_profile.location, best_match.location)

        return best_match, best_score, distance


class FraudDetectionAgent:
    @staticmethod
    def generate_score(employer_profile):
        """47-signal mock calculation"""
        # We'll use the profile's base score and jitter it to simulate dynamic checks
        base = employer_profile.fraud_predictor_score if employer_profile else 90
        final_score = min(100, max(0, base + random.randint(-5, 5)))
        
        risk_level = "LOW"
        if final_score < 50:
            risk_level = "HIGH"
        elif final_score < 75:
            risk_level = "MEDIUM"
            
        return final_score, risk_level


class NegotiationAgent:
    # Mock market rates per day
    MARKET_RATES = {
        'Electrician': 850,
        'Shuttering': 700,
        'Plumber': 800,
        'Mason': 900,
        'Painter': 650,
        'General Helper': 450
    }

    @staticmethod
    def get_benchmark(skills, location):
        # We take the highest paying skill as benchmark
        benchmark = 450
        for skill in skills:
            if skill in NegotiationAgent.MARKET_RATES:
                if NegotiationAgent.MARKET_RATES[skill] > benchmark:
                    benchmark = NegotiationAgent.MARKET_RATES[skill]
        
        # Slight variation by location
        if location == 'Delhi':
            benchmark = int(benchmark * 1.15)
        
        return benchmark

    @staticmethod
    def negotiate(job, worker_skills, worker_location):
        """Calculates a realistic counter-offer anchored to the benchmark"""
        benchmark = NegotiationAgent.get_benchmark(worker_skills, worker_location)
        current_offer = float(job.offered_wage)
        
        # If offer is way below benchmark, counter aggressively
        if current_offer < benchmark * 0.8:
            counter = benchmark
        # If it's close, counter slightly higher
        elif current_offer < benchmark:
            counter = current_offer + 50
        # If it's already above benchmark, accept or slight bump
        else:
            counter = current_offer + 20
            
        return int(counter)


class ContractAgent:
    @staticmethod
    def generate_pdf(contract):
        """Generates a bilingual PDF contract using reportlab"""
        # Ensure media directory exists
        media_root = getattr(settings, 'MEDIA_ROOT', os.path.join(settings.BASE_DIR, 'media'))
        contracts_dir = os.path.join(media_root, 'contracts')
        os.makedirs(contracts_dir, exist_ok=True)
        
        filename = f"contract_{contract.id}_{contract.worker.shram_id}.pdf"
        filepath = os.path.join(contracts_dir, filename)
        
        c = canvas.Canvas(filepath, pagesize=A4)
        c.setFont("Helvetica-Bold", 16)
        c.drawString(100, 800, "KaamSetu Digital Contract / KaamSetu Digital Anubandh")
        
        c.setFont("Helvetica", 12)
        c.drawString(100, 760, f"Contract ID: {contract.id}")
        c.drawString(100, 740, f"Date: {timezone.now().strftime('%Y-%m-%d')}")
        
        c.drawString(100, 700, "PARTIES / Pakshkaar")
        c.drawString(100, 680, f"Employer / Niyokta: {contract.job.employer.company_name if hasattr(contract.job.employer, 'company_name') else 'Independent'}")
        c.drawString(100, 660, f"Worker / Karmkaar: {contract.worker.user.name} ({contract.worker.shram_id})")
        
        c.drawString(100, 620, "TERMS / Shartein")
        c.drawString(100, 600, f"Job Role / Kaam: {contract.job.title}")
        c.drawString(100, 580, f"Daily Wage / Dihaadi: Rs {contract.final_wage}")
        c.drawString(100, 560, f"Location / Sthaan: {contract.job.location}")
        
        c.drawString(100, 500, "SIGNATURES (OTP Verified) / Hastakshar")
        c.drawString(100, 480, f"Employer Signed: {'Yes' if contract.employer_signed else 'No'}")
        c.drawString(100, 460, f"Worker Signed: {'Yes' if contract.worker_signed else 'No'}")
        
        c.drawString(100, 400, "Powered by AI Agents. 72-Hour Payment Guarantee active.")
        
        c.save()
        
        contract.pdf_url = f"/media/contracts/{filename}"
        contract.save()
        
        return contract.pdf_url


class PaymentEscrowAgent:
    @staticmethod
    def initiate_payout(attendance):
        """Simulates initiating a payout from escrow upon check-out"""
        contract = attendance.contract
        wage = contract.final_wage
        
        # Deduct from escrow
        if contract.escrow_balance >= wage:
            contract.escrow_balance -= wage
            contract.save()
            
            # Create a completed transaction (simulating instant UPI or 72-h window start)
            tx = PaymentTransaction.objects.create(
                contract=contract,
                amount=wage,
                transaction_type='payout',
                status='completed', # Assuming instant for demo purposes
                reference_id=f"UPI-{random.randint(10000000, 99999999)}"
            )
            
            # Update worker totals
            profile = contract.worker
            profile.total_earned += wage
            profile.jobs_completed += 1
            profile.trust_score = min(1000, profile.trust_score + 10)
            profile.save()
            
            return True, tx.reference_id
        else:
            # Escrow insufficient, trigger dispute
            return False, "Insufficient Escrow. Auto-Dispute Initiated."
