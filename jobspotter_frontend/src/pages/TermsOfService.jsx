export function TermsOfService() {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-6">
        <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-8">
          <h1 className="text-4xl font-bold text-green-600 mb-6">Terms of Service</h1>
          
          <p className="text-gray-700 mb-4">
            Welcome to JobSpotter! Please read these terms of service carefully before using our platform.
          </p>
          
          <h2 className="text-2xl font-semibold text-gray-800 mt-8">1. Acceptance of Terms</h2>
          <p className="text-gray-600 mt-2">
            By using JobSpotter, you agree to be bound by these terms. If you do not agree, please dont use our platform.
          </p>
          
          <h2 className="text-2xl font-semibold text-gray-800 mt-8">2. Services Provided</h2>
          <p className="text-gray-600 mt-2">
            JobSpotter helps users find job opportunities and connect with employers.
          </p>
  
          <h2 className="text-2xl font-semibold text-gray-800 mt-8">3. User Responsibilities</h2>
          <ul className="list-disc pl-6 mt-2 text-gray-600">
            <li>Provide accurate and truthful information.</li>
            <li>Do not engage in any illegal activities on our platform.</li>
            <li>Respect other users and maintain professionalism.</li>
          </ul>
  
          <h2 className="text-2xl font-semibold text-gray-800 mt-8">4. Termination</h2>
          <p className="text-gray-600 mt-2">
            We reserve the right to suspend or terminate access if users violate these terms.
          </p>
  
          <p className="text-gray-600 mt-6">
            For more details, contact our support team at <a href="mailto:support@jobspotter.com" className="text-green-600">support@jobspotter.com</a>.
          </p>
        </div>
      </div>
    );
  }
  