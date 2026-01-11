import React, { useState } from 'react';
import { HashRouter, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { Shield, LogOut, Menu, X } from 'lucide-react';
import LandingView from './views/Landing';
import ClientDashboard from './views/ClientDashboard';
import OpsDashboard from './views/OpsDashboard';
import PlanningDocs from './views/PlanningDocs';
import SecurityPlansView from './views/SecurityPlans';
import CoverageView from './app/coverage/page';
import WorkForUsPage from './app/work-for-us/page';
import ApplyPage from './app/work-for-us/apply/page';
import OpsRecruitmentDashboard from './app/ops/recruitment/page';
import { UserRole } from './types';

const App: React.FC = () => {
  const [userRole, setUserRole] = useState<UserRole>(UserRole.PUBLIC);

  return (
    <HashRouter>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navigation userRole={userRole} setUserRole={setUserRole} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<LandingView />} />
            <Route path="/security-plans" element={<SecurityPlansView />} />
            <Route path="/client/*" element={<ClientDashboard />} />
            <Route path="/ops/*" element={<OpsDashboard />} />
            <Route path="/ops/recruitment" element={<OpsRecruitmentDashboard />} />
            <Route path="/docs" element={<PlanningDocs />} />
            <Route path="/coverage" element={<CoverageView />} />
            <Route path="/work-for-us" element={<WorkForUsPage />} />
            <Route path="/work-for-us/apply" element={<ApplyPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
};

const Navigation: React.FC<{ userRole: UserRole, setUserRole: (r: UserRole) => void }> = ({ userRole, setUserRole }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const handleRoleChange = (role: UserRole) => {
    setUserRole(role);
    if (role === UserRole.PUBLIC) navigate('/');
    if (role === UserRole.ORG_OWNER) navigate('/client');
    if (role === UserRole.OPS_ADMIN) navigate('/ops');
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="bg-indigo-600 p-1.5 rounded-lg">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900 tracking-tight">SecNaija</span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/security-plans" className={`text-sm font-medium ${isActive('/security-plans') ? 'text-indigo-600' : 'text-gray-500 hover:text-gray-900'}`}>Plans</Link>
            <Link to="/coverage" className={`text-sm font-medium ${isActive('/coverage') ? 'text-indigo-600' : 'text-gray-500 hover:text-gray-900'}`}>Coverage</Link>
            <Link to="/work-for-us" className={`text-sm font-medium ${isActive('/work-for-us') ? 'text-indigo-600' : 'text-gray-500 hover:text-gray-900'}`}>Work for Us</Link>
            
            <div className="h-6 w-px bg-gray-200"></div>

            <select 
              className="text-sm border-none bg-gray-50 rounded px-2 py-1 focus:ring-0 cursor-pointer"
              value={userRole}
              onChange={(e) => handleRoleChange(e.target.value as UserRole)}
            >
              <option value={UserRole.PUBLIC}>Public View</option>
              <option value={UserRole.ORG_OWNER}>Client Portal</option>
              <option value={UserRole.OPS_ADMIN}>Ops Dashboard</option>
            </select>

            {userRole === UserRole.PUBLIC ? (
              <button onClick={() => handleRoleChange(UserRole.ORG_OWNER)} className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 transition">
                Sign In
              </button>
            ) : (
              <button onClick={() => handleRoleChange(UserRole.PUBLIC)} className="flex items-center text-gray-500 hover:text-red-600 text-sm font-medium">
                <LogOut className="h-4 w-4 mr-1" /> Logout
              </button>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-500">
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 px-4 py-4 space-y-2">
           <Link to="/security-plans" onClick={() => setIsMenuOpen(false)} className="block py-2 text-gray-700 font-medium">Plans</Link>
           <Link to="/coverage" onClick={() => setIsMenuOpen(false)} className="block py-2 text-gray-700 font-medium">Coverage</Link>
           <Link to="/work-for-us" onClick={() => setIsMenuOpen(false)} className="block py-2 text-gray-700 font-medium">Work for Us</Link>
           <button onClick={() => { handleRoleChange(UserRole.ORG_OWNER); setIsMenuOpen(false); }} className="w-full text-left py-2 text-indigo-600 font-medium">Client Login</button>
           <button onClick={() => { handleRoleChange(UserRole.OPS_ADMIN); setIsMenuOpen(false); }} className="w-full text-left py-2 text-gray-600 font-medium">Ops Login</button>
        </div>
      )}
    </nav>
  );
};

const Footer: React.FC = () => (
  <footer className="bg-gray-900 text-white py-12">
    <div className="max-w-7xl mx-auto px-4 text-center">
      <div className="flex justify-center space-x-2 mb-4">
        <Shield className="h-6 w-6 text-indigo-400" />
        <span className="text-xl font-bold">SecNaija Nigeria</span>
      </div>
      <p className="text-gray-400 text-sm mb-6 max-w-md mx-auto">
        Licensed Private Guard Company support services. Working in partnership with NSCDC and Nigerian Police.
      </p>
      <div className="text-xs text-gray-500 space-y-1">
        <p>&copy; 2024 SecNaija Security Ltd. All rights reserved.</p>
        <p>Mowe-Ibafo Corridor Operational Center, Ogun State.</p>
      </div>
    </div>
  </footer>
);

export default App;