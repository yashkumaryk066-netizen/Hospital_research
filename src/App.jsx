import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import useStore from './store/useStore';

// Main Layout
import Layout from './components/layout/Layout';

// Public Pages
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import NotFound from './pages/NotFound';

// Specialized Modules
import Triage from './pages/Triage';
import MLC from './pages/MLC';
import BloodBank from './pages/BloodBank';
import NeonatalCare from './pages/NeonatalCare';
import OTICUManagement from './pages/OTICUManagement';
import Refunds from './pages/Refunds';
import NursingWorkbench from './pages/NursingWorkbench';
import MISReports from './pages/Reports';
import Ambulance from './pages/Ambulance';

// Core Pages
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import Laboratory from './pages/Laboratory';
import Radiology from './pages/Radiology';
import Appointments from './pages/Appointments';
import OPDNewAppointment from './pages/OPDNewAppointment';
import OPDAppointmentList from './pages/OPDAppointmentList';
import IPDRequestList from './pages/IPDRequestList';
import IPDNewAdmission from './pages/IPDNewAdmission';
import IPDDashboard from './pages/IPDDashboard';
import IPDBedStatus from './pages/IPDBedStatus';
import IPDFloorMap from './pages/IPDFloorMap';
import Diagnosis from './pages/Diagnosis';
import OTBooking from './pages/OTBooking';
import Pharmacy from './pages/Pharmacy';
import Doctors from './pages/Doctors';
import PatientProfile from './pages/PatientProfile';
import Physiotherapy from './pages/Physiotherapy';
import OPD from './pages/OPD';
import Telemedicine from './pages/Telemedicine';
import Finance from './pages/Finance';
import Settings from './pages/Settings';
import DischargeManager from './pages/DischargeManager';
import Masters from './pages/masters/Masters';
import HospitalManagement from './pages/HospitalManagement';

// Guard for Protected Routes
const RoleGuard = ({ children, allowedRoles }) => {
  const user = useStore(state => state.user);
  
  if (!user) return <Navigate to="/login" replace />;
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
};

function App() {
  const user = useStore(state => state.user);

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        
        {/* Root Redirect based on Auth */}
        <Route path="/" element={user ? <Navigate to="/dashboard" replace /> : <LandingPage />} />

        {/* Protected Dashboard Routes */}
        <Route path="/dashboard" element={<RoleGuard><Layout /></RoleGuard>}>
          
          <Route index element={
            user?.role === 'Super Admin' ? <AdminDashboard /> : <Dashboard role={user?.role} />
          } />

          {/* OPD & Emergency (Doctor, Admin) */}
          <Route path="opd" element={<OPD />} />
          <Route path="opd/new" element={<RoleGuard allowedRoles={['Doctor', 'Super Admin']}><OPDNewAppointment /></RoleGuard>} />
          <Route path="opd/list" element={<RoleGuard allowedRoles={['Doctor', 'Super Admin']}><OPDAppointmentList /></RoleGuard>} />
          <Route path="opd/appointments" element={<Appointments />} />
          <Route path="triage" element={<Triage />} />
          <Route path="mlc" element={<MLC />} />
          <Route path="ambulance" element={<Ambulance />} />

          {/* IPD & Clinical (Doctor, Nurse, Admin) */}
          <Route path="ipd/dashboard" element={<IPDDashboard />} />
          <Route path="ipd/new" element={<IPDNewAdmission />} />
          <Route path="ipd/request" element={<IPDRequestList />} />
          <Route path="ipd/beds" element={<IPDBedStatus />} />
          <Route path="ipd/floormap" element={<IPDFloorMap />} />
          <Route path="diagnosis" element={<Diagnosis />} />
          <Route path="physio" element={<Physiotherapy />} />
          <Route path="nursing" element={<NursingWorkbench />} />
          <Route path="ot-icu" element={<RoleGuard allowedRoles={['Doctor', 'Super Admin']}><OTICUManagement /></RoleGuard>} />
          <Route path="ot" element={<RoleGuard allowedRoles={['Doctor', 'Super Admin']}><OTBooking /></RoleGuard>} /> {/* BUG-007 fix */}
          <Route path="discharge" element={<DischargeManager />} /> {/* BUG-007 fix */}

          {/* Specialized Modules (Clinical staff only) */}
          <Route path="neonatal" element={<NeonatalCare />} />
          <Route path="blood-bank" element={<BloodBank />} />
          <Route path="mortuary" element={<HospitalManagement defaultTab="mortuary" />} />
          <Route path="organ-donation" element={<HospitalManagement defaultTab="organ-donation" />} />

          {/* Administrative Modules (Super Admin only) */}
          <Route path="hr" element={<RoleGuard allowedRoles={['Super Admin']}><HospitalManagement defaultTab="hr" /></RoleGuard>} />
          <Route path="assets" element={<RoleGuard allowedRoles={['Super Admin']}><HospitalManagement defaultTab="assets" /></RoleGuard>} />
          <Route path="finance" element={<RoleGuard allowedRoles={['Super Admin']}><Finance /></RoleGuard>} />
          <Route path="reports" element={<RoleGuard allowedRoles={['Super Admin']}><MISReports /></RoleGuard>} />
          <Route path="settings" element={<RoleGuard allowedRoles={['Super Admin']}><Settings /></RoleGuard>} />
          <Route path="refunds" element={<RoleGuard allowedRoles={['Super Admin']}><Refunds /></RoleGuard>} />

          {/* Ancillary Services */}
          <Route path="laboratory" element={<Laboratory />} />
          <Route path="radiology" element={<Radiology />} />
          <Route path="pharmacy" element={<RoleGuard allowedRoles={['Pharmacy', 'Super Admin']}><Pharmacy /></RoleGuard>} />
          <Route path="stores" element={<RoleGuard allowedRoles={['Pharmacy', 'Super Admin']}><HospitalManagement defaultTab="stores" /></RoleGuard>} />

          {/* Masters & Profile */}
          <Route path="doctors" element={<Masters />} />
          <Route path="patients/profile" element={<PatientProfile />} />
          {/* BUG-007 fix: Masters sub-routes */}
          <Route path="masters/services" element={<Masters />} />
          <Route path="masters/medications" element={<Masters />} />
          <Route path="masters/wards" element={<Masters />} />
          <Route path="masters/diagnosis" element={<Masters />} />
          {/* BUG-007 fix: Missing admin routes */}
          <Route path="insurance" element={<RoleGuard allowedRoles={['Super Admin']}><HospitalManagement defaultTab="insurance" /></RoleGuard>} />
          <Route path="ipd/transfer" element={<RoleGuard allowedRoles={['Doctor', 'Nurse', 'Super Admin']}><HospitalManagement defaultTab="transfer" /></RoleGuard>} />
          
          {/* Default Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* Global Catch-all */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
