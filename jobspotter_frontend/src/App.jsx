import "./i18n"; 
import { ThemeProvider } from "./components/ThemeContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Notification from "./components/Notification";
import HelpAndSupport from "./pages/HelpAndSupport";
import { Routes, Route, useLocation } from "react-router-dom";
import Assistance from "./components/Assistance";

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
import { ViewMoreDetails } from "./components/ViewMoreDetails";
import { JobPostDetails } from "./pages/JobPostDetails";
import Data from "./pages/Data";
import Profile from "./pages/Profile";
import UserProfile from "./pages/UserProfile";
import { Dashboard } from "./pages/Dashboard";
import AdminReportManagementPopup from "./components/AdminReportManagementPopup";
import { SearchReport } from "./pages/SearchReport";  
import { UserReportFormPopup } from "./components/UserReportFormPopup";
import SearchReviews from "./pages/SearchReviews";
import UserReviewPopup from "./components/UserReviewPopup";
import HelpAndSupportIcon from "./components/HelpAndSupportIcon";

export default function App() {
  const location = useLocation();
  const isJobPostPage =
    location.pathname === "/SearchJobPost" ||
    location.pathname === "/JobPostHistory" ||
    location.pathname === "/MyJobs" ||
    location.pathname === "/SearchReviews" ||
    location.pathname === "/CreateJobPost";

  return (
    <ThemeProvider>
      <Navbar />
      <div className={`p-4 min-h-screen ${isJobPostPage ? "mx-20" : "container mx-auto"}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/notification" element={<Notification />} />
          <Route path="/About" element={<About />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />
          <Route path="/TermsOfService" element={<TermsOfService />} />
          {/* <Route path="/Data" element={<Data />} /> */}
          <Route path="/Address" element={<Address />} />
          <Route path="/CreateJobPost" element={<CreateJobPost />} />
          <Route path="/MyJobs" element={<MyJobs />} />
          <Route path="/SearchJobPost" element={<SearchJobPost />} />
          <Route path="/Settings" element={<Settings />} />
          <Route path="/JobPostHistory" element={<JobPostHistory />} />
          <Route path="/ViewMoreDetails" element={<ViewMoreDetails />} />
          <Route path="/myJob/:jobId" element={<ViewMoreDetails />} />
          <Route path="/job/:jobId" element={<JobPostDetails />} />
          <Route path="/HelpAndSupport" element={<HelpAndSupport />} />
          <Route path="/users/:userId" element={<UserProfile />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/adminreportmanagementpopup" element={<AdminReportManagementPopup />} />
          <Route path="/SearchReport" element={<SearchReport />} />
          <Route path="/userreportformpopup" element={<UserReportFormPopup />} />
          <Route path="/SearchReviews" element={<SearchReviews />} />
          <Route path="/userreviewpopup" element={<UserReviewPopup />} />
          <Route path="/assistance" element={<Assistance />} />
        </Routes>
      </div>
      <HelpAndSupportIcon />
      <Footer />
    </ThemeProvider>
  );
}
