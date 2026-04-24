import "@/styles/App.css"
import { AuthProvider } from "@/contexts/AuthContext"
import LandingPage from "./pages/LandingPage";
import ViewPostPage from "./pages/ViewPostPage";

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/post/:postId" element={<ViewPostPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
