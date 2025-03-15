import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer lava-lamp-background py-6">
      <div className="flex flex-col items-center justify-center space-y-2">
        <p className="text-sm text-white">
          &copy; {new Date().getFullYear()} JobSpotter. All Rights Reserved.
        </p>
        <ul className="flex gap-4 text-white text-sm">
          <li>
            <Link to="/about" className="hover:underline hover:text-gray-200">
              About
            </Link>
          </li>
          <li>
            <Link to="/contact" className="hover:underline hover:text-gray-200">
              Contact
            </Link>
          </li>
          <li>
            <Link
              to="/privacypolicy"
              className="hover:underline hover:text-gray-200"
            >
              Privacy Policy
            </Link>
          </li>
          <li>
            <Link
              to="/termsofservice"
              className="hover:underline hover:text-gray-200"
            >
              Terms of Service
            </Link>
          </li>
          <li>
            <Link
              to="/helpandsupport"
              className="hover:underline hover:text-gray-200"
            >
              Help & Support
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}
