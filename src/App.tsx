import "@/styles/App.css"
import { AuthProvider } from "@/contexts/AuthContext"
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import SignUpPage from "./pages/SignUpPage";
import RegistrationSuccessPage from "./pages/RegistrationSuccessPage";
import ViewPostPage from "./pages/ViewPostPage";

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/registration-success" element={<RegistrationSuccessPage />} />
          <Route path="/post/:postId" element={<ViewPostPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
