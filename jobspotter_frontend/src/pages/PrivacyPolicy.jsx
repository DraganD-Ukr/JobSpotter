export function PrivacyPolicy() {
  return (
    <div className="main-content min-h-screen p-4 animate-fadeIn">
      {/* Hero/Banner Section */}
      <div className="mt-16 mb-12 lava-lamp-background p-6 rounded-full shadow-2xl flex flex-col items-center justify-center w-2/4 mx-auto transition-all duration-1000">
        <h1 className="text-5xl font-extrabold text-white mb-2 tracking-wide drop-shadow-lg">
          Privacy Policy
        </h1>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 shadow-md rounded-lg p-8 transition-all duration-1000">
        <h2 className="text-3xl font-bold text-lime-600 mb-6">
          Our Privacy Commitment
        </h2>

        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Your privacy is important to us. This privacy policy explains what data we collect, how we use it, and the measures we take to protect your information.
        </p>

        <div className="space-y-8">
          <div>
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
              1. Data Collection
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              We collect personal information such as your name, email address, and other details provided during registration. We also gather usage data—like pages visited and time spent on the platform—to improve our service.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
              2. Use of Data
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Your data is used to provide and maintain our services, enhance user experience, and send you job-related updates and notifications.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
              3. Data Sharing
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              We do not sell or give away your data. It is only shared with trusted third parties when necessary and always with your consent.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
              4. Your Rights
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              You have the right to access, correct, or delete your personal data at any time. Contact us to exercise your rights.
            </p>
          </div>
        </div>

        <p className="text-gray-600 dark:text-gray-400 mt-8">
          For questions about our privacy practices, please contact us at{" "}
          <a
            href="mailto:privacy@jobspotter.com"
            className="text-green-600 dark:text-green-400 hover:underline"
          >
            privacy@jobspotter.com
          </a>.
        </p>
      </div>
    </div>
  );
}
