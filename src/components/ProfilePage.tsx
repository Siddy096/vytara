import { useState } from 'react';
import { User, Mail, Phone, Activity, FileText, Heart, LogOut, Edit2, Download, Calendar, Droplet, Ruler, Weight } from 'lucide-react';
import { UserData } from '../App';
import logoImage from '../assets/Untitled design.png';
import { MedicalInfoForm } from './MedicalInfoForm';

type Props = {
  userData: UserData;
  onNavigateToHome: () => void;
  onNavigateToVault: () => void;
  onLogout: () => void;
  onUpdateUserData: (data: UserData) => void;
};

export function ProfilePage({ userData, onNavigateToHome, onNavigateToVault, onLogout, onUpdateUserData }: Props) {
  const [showEditForm, setShowEditForm] = useState(false);

  const handleFormSubmit = (updatedData: UserData) => {
    onUpdateUserData(updatedData);
    setShowEditForm(false);
  };

  const handleExportPDF = () => {
    const printWindow = window.open('', '', 'height=800,width=800');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Vytara - Medical Profile</title>
             <style>
              body { font-family: Arial, sans-serif; padding: 20px; }
              h1 { color: #309898; }
              h2 { color: #FF8000; margin-top: 20px; }
              .field { margin-bottom: 10px; }
              .label { font-weight: bold; color: #309898; }
            </style>
          </head>
          <body>
            <h1>Vytara Medical Profile</h1>
            <h2>Personal Summary</h2>
            <div class="field"><span class="label">Name:</span> ${userData.personalInfo.fullName}</div>
            <div class="field"><span class="label">Blood Group:</span> ${userData.personalInfo.bloodGroup}</div>
            <p>Generated on ${new Date().toLocaleDateString()}</p>
            <script>
              window.print();
              window.onafterprint = function() { window.close(); };
            </script>
          </body>
        </html>
      `);
      printWindow.document.close();
    }
  };

  return (
    <div className="min-h-screen bg-[#309898] pb-10">
      
      {/* 1. Navbar */}
      <header className="bg-white sticky top-0 z-40 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img 
                src={logoImage} 
                alt="Vytara Logo" 
                className="w-12 h-12 object-contain" 
              />
              <h1 className="text-xl font-bold text-[#309898]">Vytara</h1>
            </div>
            
            <div className="flex items-center gap-3">
              <button 
                onClick={onNavigateToHome} 
                className="hidden md:flex px-4 py-2 text-sm font-medium text-gray-600 hover:text-[#FF8000] transition"
              >
                Home
              </button>

              <button 
                onClick={onNavigateToVault} 
                className="hidden md:flex px-4 py-2 text-sm font-medium text-gray-600 hover:text-[#309898] transition"
              >
                Visit Vault
              </button>

              <button 
                onClick={handleExportPDF} 
                className="hidden md:flex items-center gap-2 px-4 py-2 text-sm bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition shadow-sm"
              >
                <Download className="w-4 h-4" /> Export
              </button>

              <button 
                onClick={onLogout} 
                className="p-2 text-gray-400 hover:text-red-500 transition"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* 2. THE HEADER GRID (Basic Info + Recent Visits) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          
          {/* LEFT: Basic Info & Vitals & Contacts (Takes up 2/3 space) */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between relative">
            
            {/* Edit Button */}
            <button onClick={() => setShowEditForm(true)} className="absolute top-4 right-4 p-2 text-gray-400 hover:text-[#FF8000] hover:bg-orange-50 rounded-lg transition">
                <Edit2 className="w-4 h-4" />
            </button>

            <div className="flex flex-col md:flex-row items-start gap-6 mb-6">
              {/* Avatar */}
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 flex items-center justify-center border-4 border-white shadow-md shrink-0">
                   <User className="w-8 h-8 text-slate-600" />
              </div>

              <div className="flex-1 grid md:grid-cols-2 gap-6 w-full">
                {/* Identity Column */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h2 className="text-2xl font-bold text-gray-900">{userData.personalInfo.fullName}</h2>
                    <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-wide rounded-full">
                      {userData.personalInfo.gender}
                    </span>
                  </div>
                  <p className="text-gray-400 text-xs">ID: @{userData.username}</p>
                </div>

                {/* Contact Details Column */}
                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Mail className="w-4 h-4 text-gray-400" /> 
                    <span className="truncate">{userData.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Phone className="w-4 h-4 text-gray-400" /> 
                    <span>{userData.personalInfo.contactNumber}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Calendar className="w-4 h-4 text-gray-400" /> 
                    <span>{new Date(userData.personalInfo.dateOfBirth).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Vitals Strip */}
            <div className="grid grid-cols-3 gap-4 bg-gray-50 px-6 py-4 rounded-xl border border-gray-100">
               <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1 flex items-center gap-1">
                    <Droplet className="w-3 h-3" /> Blood
                  </p>
                  <p className="text-lg font-bold text-gray-800">{userData.personalInfo.bloodGroup}</p>
               </div>
               <div className="border-l border-gray-200 pl-6">
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1 flex items-center gap-1">
                    <Ruler className="w-3 h-3" /> Height
                  </p>
                  <p className="text-lg font-bold text-gray-800">{userData.personalInfo.height || '--'} <span className="text-xs text-gray-400 font-normal">cm</span></p>
               </div>
               <div className="border-l border-gray-200 pl-6">
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1 flex items-center gap-1">
                    <Weight className="w-3 h-3" /> Weight
                  </p>
                  <p className="text-lg font-bold text-gray-800">{userData.personalInfo.weight || '--'} <span className="text-xs text-gray-400 font-normal">kg</span></p>
               </div>
            </div>
          </div>

          {/* RIGHT: Recent Visits */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col h-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-800 flex items-center gap-2">
                 <Activity className="w-4 h-4 text-blue-500"/> Recent Visits
              </h3>
              <button className="text-xs text-blue-600 hover:underline">View All</button>
            </div>
            
            <div className="flex-1 overflow-y-auto space-y-3 max-h-[200px] pr-2 custom-scrollbar">
              <div className="flex items-start gap-3 p-2 hover:bg-gray-50 rounded-lg transition cursor-pointer group">
                <div className="w-10 h-10 rounded-lg bg-green-50 group-hover:bg-green-100 flex flex-col items-center justify-center text-green-700 shrink-0 transition">
                   <span className="text-[10px] font-bold uppercase">Nov</span>
                   <span className="text-sm font-bold leading-none">24</span>
                </div>
                <div>
                   <p className="text-sm font-bold text-gray-900">General Checkup</p>
                   <p className="text-xs text-gray-500">Dr. Sarah Smith</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-2 hover:bg-gray-50 rounded-lg transition cursor-pointer group">
                <div className="w-10 h-10 rounded-lg bg-blue-50 group-hover:bg-blue-100 flex flex-col items-center justify-center text-blue-700 shrink-0 transition">
                   <span className="text-[10px] font-bold uppercase">Oct</span>
                   <span className="text-sm font-bold leading-none">12</span>
                </div>
                <div>
                   <p className="text-sm font-bold text-gray-900">Dental Cleaning</p>
                   <p className="text-xs text-gray-500">Dr. John Doe</p>
                </div>
              </div>
            </div>
          </div>
        </div>


        {/* 3. THE DASHBOARD GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* LEFT COLUMN (Wider - History & Status) */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            
            {/* Current Medical Status */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2">
                <Activity className="w-5 h-5 text-[#309898]" />
                <h3 className="font-bold text-gray-800">Current Medical Status</h3>
              </div>
              <div className="p-6 grid md:grid-cols-2 gap-6">
                 {/* Conditions */}
                 <div>
                    <label className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-3 block">Active Conditions</label>
                    <div className="flex flex-wrap gap-2">
                      {userData.currentMedical.conditions.length > 0 ? 
                        userData.currentMedical.conditions.map((c, i) => (
                          <span key={i} className="px-3 py-1.5 bg-red-50 text-red-600 rounded-lg text-sm font-medium border border-red-100">{c}</span>
                        )) : <span className="text-gray-400 text-sm">No active conditions</span>
                      }
                    </div>
                 </div>
                 {/* Allergies */}
                 <div>
                    <label className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-3 block">Allergies</label>
                    <div className="flex flex-wrap gap-2">
                      {userData.currentMedical.allergies.length > 0 ? 
                        userData.currentMedical.allergies.map((a, i) => (
                          <span key={i} className="px-3 py-1.5 bg-yellow-50 text-yellow-700 rounded-lg text-sm font-medium border border-yellow-100">{a}</span>
                        )) : <span className="text-gray-400 text-sm">No allergies recorded</span>
                      }
                    </div>
                 </div>
                 {/* Medications */}
                 <div className="md:col-span-2">
                    <label className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-3 block">Current Medications</label>
                    <div className="space-y-2">
                      {userData.currentMedical.medications.length > 0 ? 
                        userData.currentMedical.medications.map((med, i) => (
                          <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
                             <span className="font-medium text-gray-800">{med.name}</span>
                             <span className="text-sm text-gray-500">{med.dosage} • {med.frequency}</span>
                          </div>
                        )) : <div className="text-sm text-gray-400 italic">No medications</div>
                      }
                    </div>
                 </div>
              </div>
            </div>

            {/* Past History */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
               <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2">
                <FileText className="w-5 h-5 text-purple-500" />
                <h3 className="font-bold text-gray-800">History & Surgeries</h3>
              </div>
              <div className="p-6">
                 {userData.pastMedical.surgeries.length > 0 ? (
                   <div className="space-y-4">
                     {userData.pastMedical.surgeries.map((surg, i) => (
                       <div key={i} className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center text-purple-600 font-bold text-xs shrink-0">
                             {new Date(surg.date).getFullYear()}
                          </div>
                          <div>
                            <p className="text-gray-900 font-medium">{surg.name}</p>
                            <p className="text-gray-500 text-sm">{new Date(surg.date).toLocaleDateString()}</p>
                          </div>
                       </div>
                     ))}
                   </div>
                 ) : (
                   <p className="text-gray-400 text-sm">No surgery history recorded.</p>
                 )}

                 {/* Divider */}
                 <div className="my-6 border-t border-gray-100"></div>

                 <label className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-3 block">Past Diseases</label>
                 <div className="flex flex-wrap gap-2">
                    {userData.pastMedical.diseases.map((d, i) => (
                       <span key={i} className="text-gray-600 bg-gray-100 px-3 py-1 rounded-md text-sm">{d}</span>
                    ))}
                 </div>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN (Medical Team & Emergency) */}
          <div className="flex flex-col gap-6">
            
            {/* Doctors */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
               <h3 className="font-bold text-gray-800 mb-4">Medical Team</h3>
               <div className="space-y-4">
                 {userData.currentMedical.doctors.map((doc, i) => (
                   <div key={i} className="flex gap-3 items-start">
                      <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 font-bold text-xs">
                          Dr
                      </div>
                      <div>
                          <p className="text-sm font-bold text-gray-900">{doc.name}</p>
                          <p className="text-xs text-teal-600 font-medium">{doc.speciality}</p>
                          <p className="text-xs text-gray-400 mt-1">{doc.phone}</p>
                      </div>
                   </div>
                 ))}
               </div>
            </div>

            {/* Emergency Contacts */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
               <h3 className="font-bold text-gray-800 mb-4 text-red-500 flex items-center gap-2">
                 <Heart className="w-4 h-4" /> Emergency
               </h3>
               <div className="space-y-3">
                 {userData.personalInfo.emergencyContacts.map((contact, i) => (
                   <div key={i} className="p-3 bg-red-50 rounded-lg border border-red-100">
                      <div className="flex justify-between items-start mb-1">
                        <p className="font-bold text-gray-900 text-sm">{contact.name}</p>
                        {i===0 && <span className="text-[10px] bg-red-200 text-red-800 px-1.5 rounded">Primary</span>}
                      </div>
                      <p className="text-xs text-gray-600">{contact.phone}</p>
                   </div>
                 ))}
               </div>
            </div>

          </div>
        </div>
      </main>

      {/* Edit Form Modal */}
      {showEditForm && (
        <MedicalInfoForm
          initialData={userData}
          onComplete={handleFormSubmit}
          onClose={() => setShowEditForm(false)}
        />
      )}
    </div>
  );
}