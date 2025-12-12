import { useState } from 'react';
import {
  Calendar, Users, Stethoscope, Pill, Activity, Building2, Shield,
  AlertCircle, Sparkles, X, Phone, Clock, Star, ChevronRight, FileText, Edit, Trash2,
  ChevronLeft
} from 'lucide-react';
// Keep your existing logo import
import logoImage from '../assets/Untitled design.png';
import { MedicalInfoForm } from './MedicalInfoForm';
import { UserData, Appointment } from '../App';

type Props = {
  userData: UserData;
  onNavigateToVault: () => void;
  onNavigateToProfile: () => void;
  appointments: Appointment[];
  onAddAppointment: (appointment: Appointment) => void;
  onDeleteAppointment: (id: string) => void;
  insurancePolicies: any[];
  onUpdateEmergencyContacts: (contacts: { name: string; phone: string }[]) => void;
  documents: any[];
};

// ---- LOCAL DATE HELPER TO AVOID OFF-BY-ONE BUG ----
const formatDateKey = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

export function HomePage({
  userData,
  onNavigateToVault,
  onNavigateToProfile,
  appointments,
  onAddAppointment,
  onDeleteAppointment,
  onUpdateEmergencyContacts
}: Props) {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [showSummaryModal, setShowSummaryModal] = useState(false);
  const [summaryText, setSummaryText] = useState('');
  const [recentDocs, setRecentDocs] = useState<any[]>([]);
  const [showMedicalForm, setShowMedicalForm] = useState(false);
  const [medicalFormSection, setMedicalFormSection] = useState(1);

  // Sample documents for demo
  const documents = [
    { id: '1', name: 'Blood Test Report.pdf', uploadDate: '2024-01-15', category: 'lab-reports' },
    { id: '2', name: 'X-Ray Results.pdf', uploadDate: '2024-02-20', category: 'imaging' },
    { id: '3', name: 'Prescription.pdf', uploadDate: '2024-03-10', category: 'prescriptions' },
  ];

  const handleGetSummary = () => {
    const sortedDocs = documents
      .sort((a, b) => new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime())
      .slice(0, 5);

    if (sortedDocs.length > 0) {
      setRecentDocs(sortedDocs);
      const summary = `AI Summary for ${sortedDocs.length} document${sortedDocs.length > 1 ? 's' : ''}:\n\n${sortedDocs.map(doc => `- ${doc.name}: Analyzed successfully`).join('\n')}\n\nKey findings: All documents processed. No critical issues detected.`;
      setSummaryText(summary);
      setShowSummaryModal(true);
    }
  };

  const closeSummaryModal = () => {
    setShowSummaryModal(false);
  };

  const handleSOSClick = () => {
    alert('🚨 SOS Alert! Emergency contacts will be notified immediately.');
  };

  const handleEditEmergency = () => {
    setMedicalFormSection(1);
    setShowMedicalForm(true);
  };

  const handleEditDoctors = () => {
    setMedicalFormSection(2);
    setShowMedicalForm(true);
  };

  const handleEditMedications = () => {
    setMedicalFormSection(2);
    setShowMedicalForm(true);
  };

  const handleDeleteEmergencyContact = (index: number) => {
    const updatedContacts = userData.personalInfo.emergencyContacts.filter((_, i) => i !== index);
    onUpdateEmergencyContacts(updatedContacts);
  };



  const cards = [
    { id: 'appointments', title: 'Upcoming Appointments', icon: Calendar, color: '#309898' },
    { id: 'emergency', title: 'Emergency Contacts', icon: Users, color: '#FF8000' },
    { id: 'doctors', title: 'Medical Team', icon: Stethoscope, color: '#309898' },
    { id: 'medications', title: 'Current Medication', icon: Pill, color: '#FF8000' },
  ];

  // --- 2. DYNAMIC CONTENT RENDERER ---
  const renderModalContent = () => {
    switch (activeModal) {
      case 'appointments':
        return <CalendarView
          appointments={appointments}
          onAddAppointment={onAddAppointment}
          onDeleteAppointment={onDeleteAppointment}
        />;
      case 'emergency':
        return <EmergencyContactsView
          data={userData.personalInfo.emergencyContacts}
          onEdit={handleEditEmergency}
          onDelete={handleDeleteEmergencyContact}
        />;
      case 'doctors':
        return <DoctorsView
          data={userData.currentMedical.doctors}
          onEdit={handleEditDoctors}
        />;
      case 'medications':
        return <MedicationsView
          data={userData.currentMedical.medications}
          onEdit={handleEditMedications}
        />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-orange-50 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-teal-400 rounded-full blur-3xl opacity-10 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange-400 rounded-full blur-3xl opacity-10 translate-x-1/2 -translate-y-1/2"></div>
      
      {/* Header */}
      <header className="bg-white shadow-lg sticky top-0 z-50 border-b-2 border-teal-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <img src={logoImage} alt="Vytara Logo" className="w-12 h-12 sm:w-20 sm:h-20 object-contain flex-shrink-0" />
            <h1 className="text-lg sm:text-xl lg:text-2xl font-bold" style={{ color: '#309898' }}>Vytara</h1>
          </div>

          <div className="flex items-center gap-3 flex-shrink-0">
            <button
              onClick={handleGetSummary}
              disabled={documents.length === 0}
              className="flex items-center gap-2 px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all shadow-lg font-semibold"
            >
              <Sparkles className="w-4 h-4" />
              <span className="hidden sm:inline">Get Summary</span>
            </button>

            <button
              onClick={onNavigateToVault}
              className="px-3 py-2 rounded-lg transition-all font-semibold shadow-lg border-2"
              style={{ backgroundColor: '#FF8000', color: 'white', borderColor: '#FF8000' }}
            >
              <span className="hidden sm:inline">Vault</span>
              <span className="sm:hidden">Vault</span>
            </button>

            <button
              onClick={onNavigateToProfile}
              className="px-3 py-2 rounded-lg transition-all font-semibold shadow-lg border-2"
              style={{ backgroundColor: '#309898', color: 'white', borderColor: '#309898' }}
            >
              <span className="hidden sm:inline">Profile</span>
              <span className="sm:hidden">Profile</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* SOS Button */}
        <div className="flex justify-center mb-12">
          <button
            onClick={handleSOSClick}
            className="w-40 h-40 bg-gradient-to-br from-red-500 to-red-700 text-white rounded-full shadow-2xl flex flex-col items-center justify-center hover:scale-110 transition-transform duration-200"
          >
            <AlertCircle className="w-14 h-14 mb-1" />
            <span className="text-2xl font-bold">SOS</span>
          </button>
        </div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.id}
                className="cursor-pointer transition-all duration-300 hover:scale-105"
                onClick={() => setActiveModal(card.id)}
              >
                <div
                  className="bg-white rounded-2xl shadow-lg p-8 border-4 hover:shadow-xl transition-all"
                  style={{ borderColor: card.color }}
                >
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center mb-6 mx-auto"
                    style={{ backgroundColor: `${card.color}30` }}
                  >
                    <Icon className="w-10 h-10" style={{ color: card.color }} />
                  </div>
                  <h3 className="text-center font-semibold">
                    {card.title}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white/90 mt-16 border-t-2 border-teal-200">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                  V
                </div>
                <h3 className="text-teal-600 text-xl font-bold">Vytara</h3>
              </div>
              <p className="text-gray-600">
                Your Personal Health Companion - Managing your medical records with care and security.
              </p>
            </div>
            
            <div>
              <h4 className="text-orange-500 mb-4 font-semibold">Quick Links</h4>
              <ul className="space-y-2 text-gray-600">
                <li><button className="hover:text-teal-600">Vault</button></li>
                <li><button className="hover:text-teal-600">Profile</button></li>
                <li><button className="hover:text-teal-600">Appointments</button></li>
                <li><button className="hover:text-teal-600">Emergency Contacts</button></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-orange-500 mb-4 font-semibold">Services</h4>
              <ul className="space-y-2 text-gray-600">
                <li><button className="hover:text-teal-600">Doctors</button></li>
                <li><button className="hover:text-teal-600">Pharmacy</button></li>
                <li><button className="hover:text-teal-600">Diagnostics</button></li>
                <li><button className="hover:text-teal-600">Hospitals</button></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t-2 border-teal-100 mt-8 pt-6 text-center text-gray-600">
            <p>&copy; 2024 Vytara. All rights reserved. Your health, our priority.</p>
          </div>
        </div>
      </footer>

      {/* --- CONTENT MODAL (Dynamic) --- */}
      {activeModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={() => setActiveModal(null)}>
          <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-8 relative animate-in zoom-in-95 duration-200" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 p-2 bg-gray-100 rounded-full z-10"
            >
              <X className="w-6 h-6" />
            </button>
            {renderModalContent()}
          </div>
        </div>
      )}

      {/* --- SUMMARY MODAL (Fixed Layout) --- */}
      {showSummaryModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">

          {/* Modal Container: Fixed Height with Flex Column */}
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl flex flex-col max-h-[85vh] overflow-hidden border border-gray-200">

            {/* 1. Header (Fixed at top) */}
            <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-white shrink-0">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Sparkles className="w-5 h-5 text-purple-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-800">AI Medical Summary</h2>
              </div>
              <button
                onClick={closeSummaryModal}
                className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-500 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* 2. Scrollable Content Area */}
            <div className="p-6 overflow-y-auto custom-scrollbar flex-1 bg-white">
              {/* Tags */}
              <div className="mb-6">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                  Analyzed Documents ({recentDocs.length})
                </p>
                <div className="flex flex-wrap gap-2">
                  {recentDocs.map(doc => (
                    <span key={doc.id} className="px-3 py-1 bg-purple-50 text-purple-700 border border-purple-100 rounded-full text-xs font-semibold">
                      {doc.name}
                    </span>
                  ))}
                </div>
              </div>

              {/* Text Summary */}
              <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                <pre className="text-gray-700 whitespace-pre-wrap font-sans text-sm leading-relaxed">
                  {summaryText || '🤖 AI is processing your documents...'}
                </pre>
              </div>
            </div>

            {/* 3. Footer (Pinned at bottom) */}
            <div className="p-4 border-t border-gray-100 bg-gray-50 shrink-0 flex gap-3">
               <button
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-gray-300 text-gray-700 font-bold hover:bg-white transition bg-white shadow-sm"
                onClick={() => alert("Downloading Summary PDF...")}
              >
                <FileText className="w-4 h-4" /> Download PDF
              </button>

              <button
                onClick={closeSummaryModal}
                className="flex-1 py-2.5 rounded-xl bg-teal-600 text-white font-bold shadow-lg hover:bg-teal-700 transition-transform active:scale-95"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

      {/* --- MEDICAL INFO FORM MODAL --- */}
      {showMedicalForm && (
        <MedicalInfoForm
          onComplete={(data) => {
            console.log('Medical data updated:', data);
            setShowMedicalForm(false);
          }}
          onClose={() => setShowMedicalForm(false)}
          initialSection={medicalFormSection}
        />
      )}
    </div>
  );
}

// --- 3. SUB-COMPONENTS FOR MODALS ---

// Calendar View Component
function CalendarView({ appointments, onAddAppointment, onDeleteAppointment }: {
  appointments: Appointment[];
  onAddAppointment: (appointment: Appointment) => void;
  onDeleteAppointment: (id: string) => void;
}) {
  const handleEditAppointment = (updatedAppointment: Appointment) => {
    // For now, we'll delete the old one and add the updated one
    // In a real app, you'd have a proper update function
    onDeleteAppointment(updatedAppointment.id);
    onAddAppointment(updatedAppointment);
  };
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showAddEventModal, setShowAddEventModal] = useState(false);
  const [showEventDetailsModal, setShowEventDetailsModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Appointment | null>(null);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days: (Date | null)[] = [];
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    while (days.length < 42) {
      days.push(null);
    }
    return days;
  };

  const getAppointmentsForDate = (date: Date) => {
    const key = formatDateKey(date);
    return appointments.filter(apt => apt.date === key);
  };

  const handleDateClick = (date: Date, event?: Appointment) => {
    setSelectedDate(date);
    if (event) {
      setSelectedEvent(event);
      setShowEventDetailsModal(true);
    } else {
      setShowAddEventModal(true);
    }
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const days = getDaysInMonth(currentDate);
  const today = new Date();

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-teal-100 rounded-xl">
          <Calendar className="w-8 h-8 text-teal-700" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Calendar</h2>
        </div>
      </div>

      {/* Month Navigation */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={handlePrevMonth}
          className="p-2 bg-[#FF8000] text-white rounded-lg hover:bg-[#FF8000]/80 transition"
        >
          <ChevronLeft className="w-4 h-4 rotate-180" />
        </button>

        <span className="text-lg font-bold text-gray-800">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </span>

        <button
          onClick={handleNextMonth}
          className="p-2 bg-[#FF8000] text-white rounded-lg hover:bg-[#FF8000]/80 transition"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 mb-6">
        <div className="grid grid-cols-7 gap-2 text-center mb-4">
          {['Su','Mo','Tu','We','Th','Fr','Sa'].map(d => (
            <div key={d} className="text-sm font-bold text-gray-400 uppercase">{d}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1 sm:gap-3">
          {days.map((date, index) => {
            if (!date) {
              return <div key={index} className="h-16 w-14 sm:h-20 sm:w-20"></div>;
            }

            const dayAppointments = getAppointmentsForDate(date);
            const isToday = date.toDateString() === today.toDateString();
            const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString();

            return (
              <div
                key={index}
                onClick={() => handleDateClick(date)}
                className={
                  `h-16 w-14 sm:h-20 sm:w-20 flex flex-col items-center justify-start text-sm rounded-lg relative cursor-pointer
                   transition-all p-1 bg-white text-gray-700 border border-gray-100 hover:bg-teal-50
                   ${isToday ? 'ring-2 ring-[#309898] font-bold' : ''}
                   ${isSelected && !isToday ? 'ring-2 ring-teal-300' : ''}`
                }
              >
                <span className="font-semibold">{date.getDate()}</span>
                {dayAppointments.length > 0 && (
                  <div className="flex flex-col items-stretch mt-1 w-full gap-1">
                    {/* Teal rectangles, slightly smaller + spaced */}
                    {dayAppointments
                      .sort((a, b) => a.time.localeCompare(b.time))
                      .slice(0, 3)
                      .map((appt) => (
                        <div
                          key={appt.id}
                          className="text-[9px] leading-snug text-left truncate w-full
                                     bg-[#309898] text-white rounded px-1 py-px
                                     cursor-pointer hover:bg-[#247575]"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDateClick(date, appt);
                          }}
                        >
                          {appt.title.length > 10 ? `${appt.title.substring(0, 10)}…` : appt.title}
                        </div>
                      ))}
                    {dayAppointments.length > 3 && (
                      <span className="text-[9px] text-[#309898] font-semibold">
                        +{dayAppointments.length - 3} more
                      </span>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* All Appointments */}
      <h3 className="font-bold text-gray-800 mb-3 text-sm uppercase tracking-wide">All Appointments</h3>
      <div className="space-y-3 max-h-[300px] overflow-y-auto">
        {appointments
          .sort((a, b) => {
            const dateA = new Date(a.date).getTime();
            const dateB = new Date(b.date).getTime();
            if (dateA !== dateB) {
              return dateA - dateB;
            }
            return a.time.localeCompare(b.time);
          })
          .map((appt) => (
            <div
              key={appt.id}
              className="flex items-center gap-4 p-3 border border-gray-100 rounded-xl hover:bg-teal-50 transition cursor-pointer group"
              onClick={() => {
                setSelectedEvent(appt);
                setShowEventDetailsModal(true);
              }}
            >
              <div className="flex flex-col items-center bg-teal-100 text-teal-800 px-3 py-1 rounded-lg min-w-[60px]">
                <span className="text-xs font-bold uppercase">
                  {new Date(appt.date).toLocaleDateString('en-US', { month: 'short' })}
                </span>
                <span className="text-lg font-bold">{new Date(appt.date).getDate()}</span>
              </div>
              <div className="flex-1">
                <p className="font-bold text-gray-800">{appt.title}</p>
                <p className="text-xs text-gray-500 flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {appt.time}
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-teal-600" />
            </div>
          ))}
        {appointments.length === 0 && (
          <p className="text-gray-500 text-center py-4">No appointments scheduled</p>
        )}
      </div>

      {/* Modals (unchanged) */}
      {showAddEventModal && selectedDate && (
        <AddEventModal
          selectedDate={selectedDate}
          onClose={() => setShowAddEventModal(false)}
          onAdd={onAddAppointment}
        />
      )}
      {showEventDetailsModal && selectedEvent && (
        <EventDetailsModal
          event={selectedEvent}
          onClose={() => setShowEventDetailsModal(false)}
          onEdit={handleEditAppointment}
          onDelete={onDeleteAppointment}
        />
      )}
    </div>
  );
}


// Add Event Modal Component
function AddEventModal({ selectedDate, onClose, onAdd }: {
  selectedDate: Date;
  onClose: () => void;
  onAdd: (appointment: Appointment) => void;
}) {
  const [eventName, setEventName] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [eventType, setEventType] = useState<'consultation' | 'follow-up' | 'test/scan' | 'procedure' | 'other'>('consultation');
  const [doctor, setDoctor] = useState('');
  const [facility, setFacility] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (eventName.trim() && eventTime) {
      const newAppointment: Appointment = {
        id: Date.now().toString(),
        // use local date key (no toISOString)
        date: formatDateKey(selectedDate),
        time: eventTime,
        title: eventName,
        type: eventType, // ✅ store selected type
        doctor: doctor || undefined,
        facility: facility || undefined,
      };
      onAdd(newAppointment);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 p-2 bg-gray-100 rounded-full"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-2xl font-bold text-gray-800 mb-4">Add Event</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[#309898] mb-2">Event Name</label>
            <input
              type="text"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border-2 border-[#309898]/30 focus:border-[#FF8000] focus:outline-none"
              placeholder="Enter event name"
              required
            />
          </div>

          <div>
            <label className="block text-[#309898] mb-2">Event Type</label>
            <select
              value={eventType}
              onChange={(e) => {
                setEventType(e.target.value as any);
                setDoctor('');
                setFacility('');
              }}
              className="w-full px-4 py-2 rounded-lg border-2 border-[#309898]/30 focus:border-[#FF8000] focus:outline-none bg-white"
            >
              <option value="consultation">Consultation</option>
              <option value="follow-up">Follow-up</option>
              <option value="test/scan">Test / Scan</option>
              <option value="procedure">Procedure</option>
              <option value="other">Other</option>
            </select>
          </div>

          {eventType !== 'other' && (
            <>
              <div>
                <label className="block text-[#309898] mb-2">Concerned Doctor</label>
                <input
                  type="text"
                  value={doctor}
                  onChange={(e) => setDoctor(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border-2 border-[#309898]/30 focus:border-[#FF8000] focus:outline-none"
                  placeholder="Enter doctor name"
                />
              </div>
              <div>
                <label className="block text-[#309898] mb-2">Medical Facility Name</label>
                <input
                  type="text"
                  value={facility}
                  onChange={(e) => setFacility(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border-2 border-[#309898]/30 focus:border-[#FF8000] focus:outline-none"
                  placeholder="Enter facility name"
                />
              </div>
            </>
          )}

          <div>
            <label className="block text-[#309898] mb-2">Date</label>
            <input
              type="date"
              value={formatDateKey(selectedDate)}
              className="w-full px-4 py-2 rounded-lg border-2 border-[#309898]/30 bg-gray-50 cursor-not-allowed"
              disabled
            />
          </div>

          <div>
            <label className="block text-[#309898] mb-2">Time</label>
            <input
              type="time"
              value={eventTime}
              onChange={(e) => setEventTime(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border-2 border-[#309898]/30 focus:border-[#FF8000] focus:outline-none"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#FF8000] text-white rounded-lg hover:bg-[#FF8000]/80 transition font-semibold"
          >
            Add Event
          </button>
        </form>
      </div>
    </div>
  );
}


// Event Details Modal Component (view + edit + delete)
function EventDetailsModal({ event, onClose, onEdit, onDelete }: {
  event: Appointment;
  onClose: () => void;
  onEdit: (updatedEvent: Appointment) => void;
  onDelete: (id: string) => void;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(event.title);
  const [editTime, setEditTime] = useState(event.time);
  const [editType, setEditType] = useState(event.type || 'consultation');

  const handleSaveEdit = () => {
    const updatedEvent: Appointment = {
      ...event,
      title: editName,
      time: editTime,
      type: editType
    };
    onEdit(updatedEvent);
    setIsEditing(false);
  };

  const handleDelete = () => {
    onDelete(event.id);
    onClose();
  };

  const prettyType = event.type
    ? event.type
        .replace('/', ' / ')
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
    : 'Not specified';

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 p-2 bg-gray-100 rounded-full"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          {isEditing ? 'Edit Event' : 'Event Details'}
        </h2>

        {isEditing ? (
          <form onSubmit={(e) => { e.preventDefault(); handleSaveEdit(); }} className="space-y-4">
            <div>
              <label className="block text-[#309898] mb-2">Event Name</label>
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border-2 border-[#309898]/30 focus:border-[#FF8000] focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-[#309898] mb-2">Event Type</label>
              <select
                value={editType}
                onChange={(e) => setEditType(e.target.value as any)}
                className="w-full px-4 py-2 rounded-lg border-2 border-[#309898]/30 focus:border-[#FF8000] focus:outline-none bg-white"
              >
                <option value="consultation">Consultation</option>
                <option value="follow-up">Follow-up</option>
                <option value="test/scan">Test / Scan</option>
                <option value="procedure">Procedure</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-[#309898] mb-2">Date</label>
              <input
                type="date"
                value={event.date}
                className="w-full px-4 py-2 rounded-lg border-2 border-[#309898]/30 bg-gray-50 cursor-not-allowed"
                disabled
              />
            </div>

            <div>
              <label className="block text-[#309898] mb-2">Time</label>
              <input
                type="time"
                value={editTime}
                onChange={(e) => setEditTime(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border-2 border-[#309898]/30 focus:border-[#FF8000] focus:outline-none"
                required
              />
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                className="flex-1 py-2 bg-[#309898] text-white rounded-lg hover:bg-[#309898]/80 transition font-semibold"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="flex-1 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition font-semibold"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="block text-[#309898] mb-2">Event Name</label>
              <p className="text-gray-800 font-semibold">{event.title}</p>
            </div>

            <div>
              <label className="block text-[#309898] mb-2">Event Type</label>
              <p className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-[#309898]/10 text-[#309898]">
                {prettyType}
              </p>
            </div>

            <div>
              <label className="block text-[#309898] mb-2">Date</label>
              <p className="text-gray-800">
                {new Date(event.date).toLocaleDateString()}
              </p>
            </div>

            <div>
              <label className="block text-[#309898] mb-2">Time</label>
              <p className="text-gray-800">{event.time}</p>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                onClick={() => setIsEditing(true)}
                className="flex-1 py-2 bg-[#309898] text-white rounded-lg hover:bg-[#309898]/80 transition font-semibold"
              >
                Edit Event
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition font-semibold"
              >
                Delete Event
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Emergency Contacts View Component
function EmergencyContactsView({ data, onEdit, onDelete }: {
  data: { name: string; phone: string }[];
  onEdit: () => void;
  onDelete: (index: number) => void;
}) {
  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-red-100 rounded-xl">
          <Phone className="w-8 h-8 text-red-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Emergency Contacts</h2>
      </div>

      <div className="flex justify-end mb-4">
        <button
          onClick={onEdit}
          className="flex items-center gap-2 px-4 py-2 bg-[#FF8000] text-white rounded-lg hover:bg-[#FF8000]/80 transition"
        >
          <Edit className="w-4 h-4" />
          Edit
        </button>
      </div>

      <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
        {data.map((contact, index) => (
          <div key={index} className="p-4 border border-gray-100 rounded-xl hover:shadow-md transition bg-white">
            <div className="flex-1">
              <p className="font-bold text-gray-900 text-lg">{contact.name}</p>
              <p className="text-sm text-gray-500">{contact.phone}</p>
            </div>
          </div>
        ))}
        {data.length === 0 && (
          <p className="text-gray-500 text-center py-4">No emergency contacts added</p>
        )}
      </div>
    </div>
  );
}

// Doctors View Component
function DoctorsView({ data, onEdit }: {
  data: { name: string; phone: string; speciality: string }[];
  onEdit: () => void;
}) {
  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-teal-100 rounded-xl">
          <Stethoscope className="w-8 h-8 text-teal-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Medical Team</h2>
      </div>

      <div className="flex justify-end mb-4">
        <button
          onClick={onEdit}
          className="flex items-center gap-2 px-4 py-2 bg-[#FF8000] text-white rounded-lg hover:bg-[#FF8000]/80 transition"
        >
          <Edit className="w-4 h-4" />
          Edit
        </button>
      </div>

      <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
        {data.map((doctor, index) => (
          <div key={index} className="p-4 border border-gray-100 rounded-xl hover:shadow-md transition bg-white">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="font-bold text-gray-900 text-lg">{doctor.name}</p>
                <p className="text-sm text-gray-500">{doctor.speciality}</p>
                <p className="text-sm text-blue-600">{doctor.phone}</p>
              </div>
            </div>
          </div>
        ))}
        {data.length === 0 && (
          <p className="text-gray-500 text-center py-4">No doctors added</p>
        )}
      </div>
    </div>
  );
}

// Medications View Component
function MedicationsView({ data, onEdit }: {
  data: { name: string; dosage: string; frequency: string }[];
  onEdit: () => void;
}) {
  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-orange-100 rounded-xl">
          <Pill className="w-8 h-8 text-orange-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Current Medications</h2>
      </div>

      <div className="flex justify-end mb-4">
        <button
          onClick={onEdit}
          className="flex items-center gap-2 px-4 py-2 bg-[#FF8000] text-white rounded-lg hover:bg-[#FF8000]/80 transition"
        >
          <Edit className="w-4 h-4" />
          Edit
        </button>
      </div>

      <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
        {data.map((med, index) => (
          <div key={index} className="p-4 border border-gray-100 rounded-xl bg-white">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-500">Name</p>
                <p className="font-semibold text-gray-900">{med.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Dosage</p>
                <p className="font-semibold text-gray-900">{med.dosage}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Frequency</p>
                <p className="font-semibold text-gray-900">{med.frequency}</p>
              </div>
            </div>
          </div>
        ))}
        {data.length === 0 && (
          <p className="text-gray-500 text-center py-4">No medications added</p>
        )}
      </div>
    </div>
  );
}

// Generic List View Component
function ListView({ title, data, icon, type, onEdit }: { title: string, data: any[], icon: any, type: string, onEdit?: () => void }) {
  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-gray-100 rounded-xl">
          {icon}
        </div>
        <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
      </div>

      {onEdit && (
        <div className="flex justify-end mb-4">
          <button
            onClick={onEdit}
            className="flex items-center gap-2 px-4 py-2 bg-[#FF8000] text-white rounded-lg hover:bg-[#FF8000]/80 transition"
          >
            <Edit className="w-4 h-4" />
            Edit
          </button>
        </div>
      )}

      <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
        {data.map((item) => (
          <div key={item.id} className="p-4 border border-gray-100 rounded-xl hover:shadow-md transition bg-white flex items-center justify-between group">
             <div className="flex-1">
                <p className="font-bold text-gray-900 text-lg">{item.name}</p>

                {/* Contextual Subtext */}
                {type === 'emergency' && <p className="text-sm text-gray-500">{item.relation} • <span className="text-blue-600 font-medium">{item.phone}</span></p>}

                {type === 'doctors' && (
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs bg-teal-50 text-teal-700 px-2 py-0.5 rounded-full font-medium">{item.special}</span>
                    <span className="text-xs text-gray-500 flex items-center gap-1"><Star className="w-3 h-3 text-orange-400 fill-orange-400"/> {item.rating}</span>
                  </div>
                )}

                {type === 'pharmacy' && <p className="text-sm text-gray-500">{item.sub} • ETA: {item.eta}</p>}

                {(type === 'diagnostics' || type === 'hospitals' || type === 'insurance') && <p className="text-sm text-gray-500">{item.sub} {item.dist ? `• ${item.dist}` : ''} {item.policy ? `• ${item.policy}` : ''}</p>}
             </div>

             {/* Status Indicators */}
             <div className="text-right">
                {type === 'pharmacy' && <span className={`text-xs font-bold px-2 py-1 rounded-full ${item.status === 'Open' || item.status.includes('24/7') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{item.status}</span>}
                {type === 'doctors' && <button className="text-xs bg-teal-600 text-white px-3 py-1.5 rounded-lg hover:bg-teal-700">Book</button>}
                {type === 'emergency' && <button className="p-2 bg-red-50 text-red-600 rounded-full hover:bg-red-100"><Phone className="w-4 h-4"/></button>}
             </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Medication View Component
function MedicationView({ onEdit }: { onEdit: () => void }) {
  const medications = [
    { id: 1, name: 'Aspirin', dosage: '75mg', frequency: 'Once daily', purpose: 'Blood thinner' },
    { id: 2, name: 'Metformin', dosage: '500mg', frequency: 'Twice daily', purpose: 'Diabetes management' },
    { id: 3, name: 'Lisinopril', dosage: '10mg', frequency: 'Once daily', purpose: 'Blood pressure' },
  ];

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-orange-100 rounded-xl">
          <Pill className="w-8 h-8 text-orange-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Current Medications</h2>
      </div>

      <div className="flex justify-end mb-4">
        <button
          onClick={onEdit}
          className="flex items-center gap-2 px-4 py-2 bg-[#FF8000] text-white rounded-lg hover:bg-[#FF8000]/80 transition"
        >
          <Edit className="w-4 h-4" />
          Edit
        </button>
      </div>

      <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
        {medications.map((med) => (
          <div key={med.id} className="p-4 border border-gray-100 rounded-xl bg-white">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-gray-500">Name</p>
                <p className="font-semibold text-gray-900">{med.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Dosage</p>
                <p className="font-semibold text-gray-900">{med.dosage}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Frequency</p>
                <p className="font-semibold text-gray-900">{med.frequency}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Purpose</p>
                <p className="font-semibold text-gray-900">{med.purpose}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
