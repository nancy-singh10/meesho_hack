import React, { useState } from 'react';
import WorkerLayout from '../../components/worker/WorkerLayout';
import { CheckCircle2, Circle, AlertCircle, FileText, Download } from 'lucide-react';
import { motion } from 'framer-motion';

const WorkerContract = () => {
  const [signed, setSigned] = useState(false);

  return (
    <WorkerLayout 
      title="Contract Agent" 
      subtitle="Bilingual contract generated · Sign with OTP"
    >
      <div className="p-8 max-w-7xl mx-auto space-y-6 pb-20">
        
        {/* Top Header Action */}
        <div className="flex justify-end mb-4">
            <button 
                onClick={() => setSigned(true)}
                className="bg-[#FF6B4A] hover:bg-[#e85a3a] text-white px-6 py-2.5 rounded-xl font-bold transition-all shadow-md hover:shadow-lg flex items-center gap-2"
                disabled={signed}
            >
                {signed ? 'Contract Signed' : 'Sign with OTP →'}
            </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Column: Timeline & Insurance */}
          <div className="space-y-6">
              
              {/* Contract Status */}
              <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-white border border-gray-200 shadow-sm rounded-3xl p-6"
              >
                  <h3 className="font-bold text-[#11111A] mb-6">Contract Status</h3>
                  
                  <div className="space-y-6 relative before:absolute before:inset-0 before:ml-[11px] before:mt-2 before:h-[80%] before:w-0.5 before:bg-gray-200">
                      
                      {/* Step 1 */}
                      <div className="relative flex gap-4">
                          <CheckCircle2 size={24} className="text-emerald-500 bg-white z-10 shrink-0" />
                          <div>
                              <h4 className="text-sm font-bold text-[#11111A]">Wage Agreed</h4>
                              <p className="text-xs text-[#4A4A5A] mt-1">₹980/day · 20 days · Total ₹19,600</p>
                              <p className="text-[10px] text-gray-500 mt-1">Negotiation complete · 2:24 PM</p>
                          </div>
                      </div>

                      {/* Step 2 */}
                      <div className="relative flex gap-4">
                          <CheckCircle2 size={24} className="text-emerald-500 bg-white z-10 shrink-0" />
                          <div>
                              <h4 className="text-sm font-bold text-[#11111A]">Contract Generated</h4>
                              <p className="text-xs text-[#4A4A5A] mt-1">Bilingual Hindi + English · Section 13</p>
                              <p className="text-[10px] text-gray-500 mt-1">2:24 PM · ContractAgent</p>
                          </div>
                      </div>

                      {/* Step 3 */}
                      <div className="relative flex gap-4">
                          {signed ? (
                              <CheckCircle2 size={24} className="text-emerald-500 bg-white z-10 shrink-0" />
                          ) : (
                              <AlertCircle size={24} className="text-amber-500 bg-white z-10 shrink-0" />
                          )}
                          <div>
                              <h4 className="text-sm font-bold text-[#11111A]">Awaiting Signatures</h4>
                              <p className="text-xs text-[#4A4A5A] mt-1">Worker OTP + Employer OTP required</p>
                              <p className="text-[10px] text-gray-500 mt-1">{signed ? 'Signed · Just now' : 'Pending'}</p>
                          </div>
                      </div>

                      {/* Step 4 */}
                      <div className="relative flex gap-4">
                          {signed ? (
                              <CheckCircle2 size={24} className="text-emerald-500 bg-white z-10 shrink-0" />
                          ) : (
                              <Circle size={24} className="text-gray-300 bg-white z-10 shrink-0" />
                          )}
                          <div className={signed ? "opacity-100" : "opacity-50"}>
                              <h4 className="text-sm font-bold text-[#11111A]">Insurance Activated</h4>
                              <p className="text-xs text-[#4A4A5A] mt-1">₹196 premium (1%) · Coverage ₹19,600</p>
                              <p className="text-[10px] text-gray-500 mt-1">{signed ? 'Active' : 'After signing'}</p>
                          </div>
                      </div>

                      {/* Step 5 */}
                      <div className="relative flex gap-4">
                          {signed ? (
                              <CheckCircle2 size={24} className="text-emerald-500 bg-white z-10 shrink-0" />
                          ) : (
                              <Circle size={24} className="text-gray-300 bg-white z-10 shrink-0" />
                          )}
                          <div className={signed ? "opacity-100" : "opacity-50"}>
                              <h4 className="text-sm font-bold text-[#11111A]">Payment Monitor Active</h4>
                              <p className="text-xs text-[#4A4A5A] mt-1">UPI tracking · 72h guarantee activated</p>
                              <p className="text-[10px] text-gray-500 mt-1">{signed ? 'Active' : 'After signing'}</p>
                          </div>
                      </div>

                  </div>
              </motion.div>

              {/* Wage Insurance Policy */}
              <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-white border border-gray-200 shadow-sm rounded-3xl p-6"
              >
                  <h3 className="font-bold text-[#11111A] mb-4">Wage Insurance Policy</h3>
                  <div className="space-y-2 text-sm">
                      <div className="flex justify-between border-b border-gray-100 pb-2">
                          <span className="text-[#4A4A5A]">Coverage amount</span>
                          <span className="font-bold text-[#11111A]">₹19,600</span>
                      </div>
                      <div className="flex justify-between border-b border-gray-100 pb-2">
                          <span className="text-[#4A4A5A]">Premium (1%)</span>
                          <span className="font-bold text-[#11111A]">₹196 (employer pays)</span>
                      </div>
                      <div className="flex justify-between border-b border-gray-100 pb-2">
                          <span className="text-[#4A4A5A]">Claim trigger</span>
                          <span className="font-bold text-[#11111A]">72h after due date</span>
                      </div>
                      <div className="flex justify-between">
                          <span className="text-[#4A4A5A]">Auto-claim</span>
                          <span className="font-bold text-emerald-600 flex items-center gap-1"><CheckCircle2 size={14}/> Yes · No action needed</span>
                      </div>
                  </div>
              </motion.div>
          </div>

          {/* Right Column: The Contract Document */}
          <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-2 bg-[#FDFCF8] border border-gray-200 shadow-md rounded-3xl p-8 lg:p-12 relative"
          >
              <div className="absolute top-6 right-6 flex gap-3">
                  <button className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-lg text-xs font-bold text-[#11111A] hover:bg-gray-200 transition-colors">
                      <FileText size={14} /> हिंदी
                  </button>
                  <button className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-lg text-xs font-bold text-[#11111A] hover:bg-gray-200 transition-colors">
                      <Download size={14} /> PDF
                  </button>
              </div>

              <div className="text-center mb-10 mt-4 border-b border-gray-200 pb-6">
                  <h1 className="text-xl font-bold text-[#1E234C] tracking-wide mb-2">SHRAM ROZGAR ANUBANDH / EMPLOYMENT CONTRACT</h1>
                  <p className="text-sm text-gray-500">KaamSetu Platform · Ref: KS-2025-BIH-9847</p>
              </div>

              <div className="space-y-8 text-sm">
                  
                  {/* Parties */}
                  <div>
                      <h4 className="text-[#FF6B4A] font-bold mb-3 border-b border-gray-100 pb-1">पक्षकार / PARTIES</h4>
                      <div className="grid grid-cols-3 gap-2">
                          <span className="text-gray-500">कर्मकार / Worker</span>
                          <span className="col-span-2 font-bold text-[#11111A]">{localStorage.getItem('shram_user_name') || 'Worker'} · SHRAM-047823</span>
                          
                          <span className="text-gray-500">नियोक्ता / Employer</span>
                          <span className="col-span-2 font-bold text-[#11111A]">Sharma Construction Pvt. Ltd.</span>
                          
                          <span className="text-gray-500">GST Number</span>
                          <span className="col-span-2 text-[#11111A]">10AABCS1429B1ZB</span>
                      </div>
                  </div>

                  {/* Job Details */}
                  <div>
                      <h4 className="text-[#FF6B4A] font-bold mb-3 border-b border-gray-100 pb-1">कार्य विवरण / JOB DETAILS</h4>
                      <div className="grid grid-cols-3 gap-2">
                          <span className="text-gray-500">कार्य / Work</span>
                          <span className="col-span-2 text-[#11111A]">RCC Shuttering & Formwork</span>
                          
                          <span className="text-gray-500">स्थान / Location</span>
                          <span className="col-span-2 text-[#11111A]">Kankarbagh, Patna, Bihar</span>
                          
                          <span className="text-gray-500">प्रारंभ / Start</span>
                          <span className="col-span-2 font-bold text-[#11111A]">18 February 2025</span>
                          
                          <span className="text-gray-500">अवधि / Duration</span>
                          <span className="col-span-2 text-[#11111A]">20 Working Days</span>
                          
                          <span className="text-gray-500">समय / Hours</span>
                          <span className="col-span-2 text-[#11111A]">8:00 AM – 6:00 PM (1 hr break)</span>
                      </div>
                  </div>

                  {/* Wages */}
                  <div>
                      <h4 className="text-[#FF6B4A] font-bold mb-3 border-b border-gray-100 pb-1">मजदूरी / WAGES</h4>
                      <div className="grid grid-cols-3 gap-2">
                          <span className="text-gray-500">दैनिक दर / Daily Rate</span>
                          <span className="col-span-2 font-bold text-emerald-600">₹980/day</span>
                          
                          <span className="text-gray-500">कुल / Total</span>
                          <span className="col-span-2 font-bold text-[#11111A]">₹19,600</span>
                          
                          <span className="text-gray-500">अग्रिम / Advance</span>
                          <span className="col-span-2 text-[#11111A]">₹2,000 (Day 1)</span>
                          
                          <span className="text-gray-500">भुगतान / Payment</span>
                          <span className="col-span-2 text-[#11111A]">UPI · Within 48h of completion</span>
                          
                          <span className="text-gray-500">Employer UPI</span>
                          <span className="col-span-2 text-[#11111A]">sharmaconstruction@okaxis</span>
                      </div>
                  </div>

                  {/* Dispute Resolution */}
                  <div>
                      <h4 className="text-[#FF6B4A] font-bold mb-3 border-b border-gray-100 pb-1">विवाद / DISPUTE RESOLUTION</h4>
                      <p className="text-gray-600 text-xs leading-relaxed">
                          Any payment dispute will be first mediated by KaamSetu within 48 hours. If unresolved, matter 
                          will be referred to the Labour Commissioner, Bihar, under the Payment of Wages Act, 1936. This 
                          contract is enforceable under Indian Contract Act, 1872.
                      </p>
                  </div>

                  {/* Signature Blocks */}
                  <div className="grid grid-cols-2 gap-6 pt-6">
                      <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
                          <p className="text-[10px] text-gray-500 mb-2">कर्मकार हस्ताक्षर / Worker Signature</p>
                          {signed ? (
                              <p className="font-dancing text-xl text-[#1E234C] font-bold">{localStorage.getItem('shram_user_name') || 'Worker'}</p>
                          ) : (
                              <p className="text-[#FF6B4A] font-bold text-sm">Awaiting OTP</p>
                          )}
                      </div>
                      <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
                          <p className="text-[10px] text-gray-500 mb-2">नियोक्ता हस्ताक्षर / Employer Signature</p>
                          {signed ? (
                              <p className="font-dancing text-xl text-[#1E234C] font-bold">Sharma Construction</p>
                          ) : (
                              <p className="text-amber-500 font-bold text-sm">Awaiting OTP</p>
                          )}
                      </div>
                  </div>

                  {/* Action Button */}
                  {!signed && (
                      <button 
                          onClick={() => setSigned(true)}
                          className="w-full mt-6 bg-[#FF6B4A] hover:bg-[#e85a3a] text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all"
                      >
                          Sign Contract (Simulate OTP)
                      </button>
                  )}
                  {signed && (
                      <div className="w-full mt-6 bg-emerald-50 text-emerald-700 border border-emerald-200 py-4 rounded-xl font-bold text-lg text-center flex items-center justify-center gap-2">
                          <CheckCircle2 size={24} /> Contract Successfully Signed
                      </div>
                  )}

              </div>
          </motion.div>

        </div>
      </div>
    </WorkerLayout>
  );
};

export default WorkerContract;
