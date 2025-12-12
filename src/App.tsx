import { useState } from 'react';
import { HomePage } from './components/HomePage';
import { LoginSignupModal } from './components/LoginSignupModal';
import { VaultPage } from './components/VaultPage';
import { ProfilePage } from './components/ProfilePage';
import { LandingPage } from './components/LandingPage';

export type UserData = {
  username: string;
  email: string;
  personalInfo: {
    fullName: string;
    dateOfBirth: string;
    gender: string;
    bloodGroup: string;
    height: string;
    weight: string;
    contactNumber: string;
    emergencyContacts: { name: string; phone: string; relation: string }[];
  };
  currentMedical: {
    conditions: string[];
    medications: { name: string; dosage: string; frequency: string; course: string; purpose: string }[];
    allergies: string[];
    treatments: string[];
    doctors: { name: string; phone: string; speciality: string }[];
  };
  pastMedical: {
    diseases: string[];
    surgeries: { name: string; date: string }[];
    hospitalizations: { reason: string; date: string }[];
    injuries: string[];
    childhoodIllnesses: string[];
    pastMedications: string[];
    longTermTreatments: string[];
  };
  familyHistory: { disease: string; relation: string }[];
};

export type Appointment = {
  id: string;
  date: string;
  time: string;
  title: string;
  type: string;
  doctor?: string;
  facility?: string;
};

export type Document = {
  id: string;
  name: string;
  category: 'lab-reports' | 'prescriptions' | 'insurance' | 'bills';
  uploadDate: string;
  owner: string;
  recentVisit?: string;
  file?: File;
};

export type InsurancePolicy = {
  id: string;
  name: string;
  provider: string;
  policyNumber: string;
  startDate: string;
  endDate: string;
  coverage: string;
  premium: string;
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [currentView, setCurrentView] = useState<'home' | 'vault' | 'profile'>('home');
  const [userData, setUserData] = useState<UserData | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [openUploadModal, setOpenUploadModal] = useState(false);
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: '1',
      name: 'Blood Test Report',
      category: 'lab-reports',
      uploadDate: '2024-01-15',
      owner: 'John Doe',
    },
    {
      id: '2',
      name: 'Prescription - Blood Pressure',
      category: 'prescriptions',
      uploadDate: '2024-01-20',
      owner: 'John Doe',
    },
    {
      id: '3',
      name: 'Insurance Policy',
      category: 'insurance',
      uploadDate: '2024-01-10',
      owner: 'John Doe',
    },
  ]);
  const [insurancePolicies, setInsurancePolicies] = useState<InsurancePolicy[]>([
    {
      id: '1',
      name: 'Health Plus Premium',
      provider: 'HealthCare Inc.',
      policyNumber: 'HCP-2024-001',
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      coverage: '$500,000',
      premium: '$250/month',
    },
  ]);

  const handleLoginSuccess = (data: UserData) => {
    setUserData(data);
    setIsLoggedIn(true);
    setShowAuthModal(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setShowAuthModal(false);
    setCurrentView('home');
    setUserData(null);
  };

  const handleAddAppointment = (appointment: Appointment) => {
    // Check if we're updating an existing appointment
    const existingIndex = appointments.findIndex(apt => apt.id === appointment.id);
    if (existingIndex !== -1) {
      // Update existing appointment
      const updatedAppointments = [...appointments];
      updatedAppointments[existingIndex] = appointment;
      setAppointments(updatedAppointments);
    } else {
      // Add new appointment
      setAppointments([...appointments, appointment]);
    }
  };

  const handleDeleteAppointment = (id: string) => {
    setAppointments(appointments.filter(apt => apt.id !== id));
  };

  const handleAddDocument = (document: Document) => {
    setDocuments([...documents, document]);
  };

  const handleDeleteDocument = (id: string) => {
    setDocuments(documents.filter(doc => doc.id !== id));
  };

  const handleUpdateEmergencyContacts = (contacts: { name: string; phone: string }[]) => {
    if (userData) {
      setUserData({
        ...userData,
        personalInfo: {
          ...userData.personalInfo,
          emergencyContacts: contacts,
        },
      });
    }
  };

  const handleUpdateUserData = (updatedData: UserData) => {
    setUserData(updatedData);
  };

  if (!isLoggedIn) {
    return (
      <>
        <LandingPage
          onLogin={() => {
            setAuthMode('login');
            setShowAuthModal(true);
          }}
          onGetStarted={() => {
            setAuthMode('signup');
            setShowAuthModal(true);
          }}
        />
        {showAuthModal && (
          <LoginSignupModal 
            onLoginSuccess={handleLoginSuccess}
            onClose={() => setShowAuthModal(false)}
            initialMode={authMode}
          />
        )}
      </>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {currentView === 'home' && (
        <HomePage
          userData={userData!}
          onNavigateToVault={() => setCurrentView('vault')}
          onNavigateToProfile={() => setCurrentView('profile')}
          appointments={appointments}
          onAddAppointment={handleAddAppointment}
          onDeleteAppointment={handleDeleteAppointment}
          insurancePolicies={insurancePolicies}
          onUpdateEmergencyContacts={handleUpdateEmergencyContacts}
          documents={documents}
        />
      )}
      {currentView === 'vault' && (
        <VaultPage
          userData={userData!}
          onNavigateToHome={() => setCurrentView('home')}
          onNavigateToProfile={() => setCurrentView('profile')}
          documents={documents}
          onAddDocument={handleAddDocument}
          onDeleteDocument={handleDeleteDocument}
          appointments={appointments}
          openUploadModal={openUploadModal}
        />
      )}
      {currentView === 'profile' && userData && (
        <ProfilePage
          userData={userData}
          onNavigateToHome={() => setCurrentView('home')}
          onNavigateToVault={() => setCurrentView('vault')}
          onLogout={handleLogout}
          onUpdateUserData={handleUpdateUserData}
          appointments={appointments}
          documents={documents}
        />
      )}
    </div>
  );
}

export default App;