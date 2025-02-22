
import Navbar from "./components/Navbar";
import Footer from "./components/Footer"; 
import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { PrivacyPolicy } from "./pages/PrivacyPolicy";
import { TermsOfService } from "./pages/TermsOfService";
import { JobPost } from "./pages/JobPost";
import { Address } from "./pages/Address";
import { CreateJobPost } from "./pages/CreateJobPost";
import { MyJobs } from "./pages/MyJobs";
import { AllJobs } from "./pages/AllJobs";
import { Settings } from "./pages/Settings";
import { JobPostHistory } from "./pages/JobPostHistory";
import Data from "./pages/Data";
import Profile from "./pages/Profile";

export default function App() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4 min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/privacypolicy" element={<PrivacyPolicy />} />
          <Route path="/termsofservice" element={<TermsOfService />} />
          <Route path="/jobpost" element={<JobPost />} />
          <Route path="/data" element={<Data />} />
          <Route path="/address" element={<Address />} />
          <Route path="/createjobpost" element={<CreateJobPost />} />
          <Route path="/myjobs" element={<MyJobs />} />
          <Route path="/alljobs" element={<AllJobs />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/jobposthistory" element={<JobPostHistory />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}
