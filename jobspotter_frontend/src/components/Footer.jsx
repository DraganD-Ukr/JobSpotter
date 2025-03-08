export default function Footer() {
  return (
    <footer className="footer lava-lamp-background py-6">
      <div className="flex flex-col items-center justify-center space-y-2">
        <p className="text-sm text-white">
          &copy; {new Date().getFullYear()} JobSpotter. All Rights Reserved.
        </p>
        <ul className="flex gap-4 text-white text-sm">
          <li>
            <a href="/about" className="hover:underline hover:text-gray-200">
              About
            </a>
          </li>
          <li>
            <a href="/contact" className="hover:underline hover:text-gray-200">
              Contact
            </a>
          </li>
          <li>
            <a
              href="/privacypolicy"
              className="hover:underline hover:text-gray-200"
            >
              Privacy Policy
            </a>
          </li>
          <li>
            <a
              href="/termsofservice"
              className="hover:underline hover:text-gray-200"
            >
              Terms of Service
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
