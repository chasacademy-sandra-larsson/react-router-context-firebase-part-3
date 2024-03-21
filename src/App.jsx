import { BrowserRouter, Routes, Route, Navigate, Link, Outlet } from 'react-router-dom'
import HomePage from "./components/HomePage";
import SignInPage from './components/SignInPage';
import SignUpPage from './components/SignUpPage';
import Dashboard from './components/Dashboard'
import { AuthContext } from './context/AuthContext';
import { useContext } from 'react';
import { signOut } from "firebase/auth";
import { auth } from "./firebase-config";

import './App.css'

function ProtectedRoute() {

  const authContext = useContext(AuthContext);

  const isAuthenticated = authContext && authContext.user !== null;
  console.log("isAuthenticated", isAuthenticated)

  return isAuthenticated ? <Outlet /> : <Navigate to="/signin" replace />;

}


function App() {
  const authContext = useContext(AuthContext);
  console.log("authContext: ", authContext);


  const isAuthenticated = authContext && authContext.user !== null;
  console.log("isAuthenticated", isAuthenticated)

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("User signed out successfully");
        // Additional actions after sign out, such as redirecting to another page
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  };


  return (
    <BrowserRouter>
          <header>
            <nav>
              <ul>
                <li>
                  <Link to="/signin">Sign in</Link>
                </li>
                <li>
                  <Link to="/signup">Sign up</Link>
                </li>
                <li>
                  <button onClick={handleSignOut}>Sign Out</button>
                </li>
              </ul>
            </nav>
          </header>
          <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/dashboard" element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
    </BrowserRouter>
  )
}

export default App
