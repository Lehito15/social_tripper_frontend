import { NavLink } from 'react-router-dom'; 
import { Route, Routes, Navigate } from 'react-router-dom';
import './Register.css'
import RegisterNext from './RegisterNext.jsx';
import GeneralDetails from './GeneralDetails.jsx';
import AccountDetails from './AccountDetails.jsx';
import Skills from './Skills.jsx';

function Register(){
    return (
        <div className="register-container">
            <div className="login-logo">
                <img src={`${process.env.PUBLIC_URL}/LeftBarTopComponent.svg`} alt="Logo" className="logo-image" />
            </div>
            <div className="register-steps">
                <NavLink  className={({ isActive }) => isActive ? "menu-option active" : "menu-option" } to="/register/"  exact  >
                        <div className="step-content">
                            <div className="step-number">1</div>
                            <span className="step-text">General Details</span>
                        </div>
                </NavLink >
                <div className="line"></div>
                <NavLink  className={({ isActive }) => isActive ? "menu-option active" : "menu-option" } to="/register/accountdetails"   >
                    <div className="step-content">
                            <div className="step-number">2</div>
                            <span className="step-text">Account Details</span>
                        </div>
                </NavLink >
                <div className="line"></div>

                <NavLink  className={({ isActive }) => isActive ? "menu-option active" : "menu-option" } to="/register/skills   "   >
                <div className="step-content">
                        <div className="step-number">3</div>
                            <span className="step-text">Skills</span>
                        </div>
                </NavLink >
            </div>
        <div className="different-profile-info">
            <Routes>
                <Route path="/" element={<Navigate to="generaldetails" replace />} />
                <Route path="/generaldetails" element={<GeneralDetails />} />
                <Route path="accountdetails" element={<AccountDetails />} />
                <Route path="skills" element={<Skills />} />
            </Routes>
       </div>
       <RegisterNext />

        </div>

    );
}
export default Register;