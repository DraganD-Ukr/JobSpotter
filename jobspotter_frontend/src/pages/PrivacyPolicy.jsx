export function PrivacyPolicy() {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-6">
        <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-8">
          <h1 className="text-4xl font-bold text-black mb-6">Privacy Policy</h1>
          
          <p className="text-gray-700 mb-4">
            Your privacy is important to us. This privacy policy explains what data we collect and how we use it.
          </p>
          
          <h2 className="text-2xl font-semibold text-gray-800 mt-8">1. Data Collection</h2>
          <p className="text-gray-600 mt-2">
            We collect the following types of data:
          </p>
          <ul className="list-disc pl-6 mt-2 text-gray-600">
            <li>Personal information such as name email address etc provided during registration.</li>
            <li>Usage data, such as pages visited and time spent on the platform.</li>
          </ul>
  
          <h2 className="text-2xl font-semibold text-gray-800 mt-8">2. Use of Data</h2>
          <p className="text-gray-600 mt-2">
            We use your data to:
          </p>
          <ul className="list-disc pl-6 mt-2 text-gray-600">
            <li>Provide and maintain our services.</li>
            <li>Improve user experience and site functionality.</li>
            <li>Send job-related updates and notifications.</li>
          </ul>
  
          <h2 className="text-2xl font-semibold text-gray-800 mt-8">3. Data Sharing</h2>
          <p className="text-gray-600 mt-2">
            We dont give away your data. We only share data with trusted sources when necessary.
          </p>
  
          <h2 className="text-2xl font-semibold text-gray-800 mt-8">4. Your Rights</h2>
          <p className="text-gray-600 mt-2">
            You have the right to access, correct, or delete your personal data at any time.
          </p>
  
          <p className="text-gray-600 mt-6">
            For questions about our privacy practices, contact us at <a href="mailto:privacy@jobspotter.com" className="text-green-600">privacy@jobspotter.com</a>.
          </p>
        </div>
      </div>
    );
  }
  