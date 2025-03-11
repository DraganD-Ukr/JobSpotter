export function TermsOfService() {
  return (
    <div className="main-content min-h-screen p-4 animate-fadeIn">
      {/* Banner */}
      <div className="mt-16 mb-12 lava-lamp-background p-6 rounded-full shadow-2xl flex flex-col items-center justify-center w-2/4 mx-auto transition-all duration-1000">
        <h1 className="text-5xl font-extrabold text-white mb-2 tracking-wide drop-shadow-lg">
          Terms of Service
        </h1>
      </div>

      <div className="card no-hover-glow max-w-4xl mx-auto shadow-md rounded-lg p-8 transition-all duration-1000">
        <p className="mb-4">
          Welcome to JobSpotter! Please read these terms of service carefully before using our platform.
        </p>

        <h2 className="text-2xl font-semibold mt-8 text-lime-600">
          1. Acceptance of Terms
        </h2>
        <p className="mt-2">
          By using JobSpotter, you agree to be bound by these terms. If you do not agree, please don’t use our platform.
        </p>

        <h2 className="text-2xl font-semibold mt-8 text-lime-600">
          2. Services Provided
        </h2>
        <p className="mt-2">
          JobSpotter helps users find job opportunities and connect with employers.
        </p>

        <h2 className="text-2xl font-semibold mt-8 text-lime-600">
          3. User Responsibilities
        </h2>
        <ul className="list-disc pl-6 mt-2">
          <li>Provide accurate and truthful information.</li>
          <li>Do not engage in any illegal activities on our platform.</li>
          <li>Respect other users and maintain professionalism.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 text-lime-600">
          4. Termination
        </h2>
        <p className="mt-2">
          We reserve the right to suspend or terminate access if users violate these terms.
        </p>

        <p className="mt-6">
          For more details, contact our support team at{" "}
          <a
            href="mailto:support@jobspotter.com"
            className="text-green-600"
          >
            support@jobspotter.com
          </a>.
        </p>
      </div>
    </div>
  );
}
