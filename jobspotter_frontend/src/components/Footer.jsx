export default function Footer() {
    return (
      <footer className="bg-gradient-to-r from-green-500 to-lime-500 text-white py-6">
        <div className="container mx-auto flex flex-col items-center justify-center space-y-2">
          <p className="text-sm">&copy; {new Date().getFullYear()} JobSpotter. All Rights Reserved.</p>
          <ul className="flex gap-4">
            <li>
              <a href="/about" className="hover:underline hover:text-gray-200">About</a>
            </li>
            <li>
              <a href="/contact" className="hover:underline hover:text-gray-200">Contact</a>
            </li>
            <li>
              <a href="/privacypolicy" className="hover:underline hover:text-gray-200">Privacy Policy</a>
            </li>
            <li>
              <a href="/termsofservice" className="hover:underline hover:text-gray-200">Terms of Service</a>
            </li>
          </ul>
        </div>
      </footer>
    );
  }
  