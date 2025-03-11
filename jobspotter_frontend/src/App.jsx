import { ThemeProvider } from "./components/ThemeContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Notification from "./components/Notification";
import HelpAndSupport from "./pages/HelpandSupport";
import { Routes, Route } from "react-router-dom";

import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { PrivacyPolicy } from "./pages/PrivacyPolicy";
import { TermsOfService } from "./pages/TermsOfService";
import { Address } from "./pages/Address";
import { CreateJobPost } from "./pages/CreateJobPost";
import { MyJobs } from "./pages/MyJobs";
import { Settings } from "./pages/Settings";
import { JobPostHistory } from "./pages/JobPostHistory";
import { SearchJobPost } from "./pages/SearchJobPost";
import { ViewMoreDetails } from "./pages/ViewMoreDetails";
import { JobPostDetails } from "./pages/JobPostDetails";
import Data from "./pages/Data";
import Profile from "./pages/Profile";
import { useLocation } from "react-router-dom";
import UserProfile from './pages/UserProfile';
import {Dashboard} from "./pages/Dashboard";


export default function App() {
  const location = useLocation();
  const isJobPostPage = location.pathname === "/SearchJobPost" || location.pathname === "/JobPostHistory";

  return (
    <ThemeProvider>
      <Navbar />
      <div className={`p-4 min-h-screen ${isJobPostPage ? "mx-20" : "container mx-auto"}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/notification" element={<Notification />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/privacypolicy" element={<PrivacyPolicy />} />
          <Route path="/termsofservice" element={<TermsOfService />} />
          <Route path="/data" element={<Data />} />
          <Route path="/address" element={<Address />} />
          <Route path="/createjobpost" element={<CreateJobPost />} />
          <Route path="/myJobs" element={<MyJobs />} />
          <Route path="/searchjobpost" element={<SearchJobPost />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/jobposthistory" element={<JobPostHistory />} />
          <Route path="/ViewMoreDetails" element={<ViewMoreDetails />} />
          <Route path="/myJob/:jobId" element={<ViewMoreDetails />} />
          <Route path="/job/:jobId" element={<JobPostDetails />} />
          <Route path="/helpandsupport" element={<HelpAndSupport />} />
          <Route path="/users/:userId" element={<UserProfile />} />
          <Route path="/dashboard" element={<Dashboard />} />

        </Routes>
      </div>
      <Footer />
    </ThemeProvider>
  );
}