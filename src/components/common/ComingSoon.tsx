const ComingSoon = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-(--main-bg) text-gray-800 p-6">
      {/* SVG Illustration */}
      <svg
        className="w-30 h-30 mb-6"
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="32" cy="32" r="30" stroke="#4F46E5" strokeWidth="4" />
        <path
          d="M32 12v20M32 36v4M32 44v4"
          stroke="#4F46E5"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <rect x="22" y="48" width="20" height="4" fill="#4F46E5" rx="2" />
      </svg>

      {/* Heading */}
      <h1 className="text-4xl font-bold mb-2 text-(--main-text)">
        Coming Soon
      </h1>

      {/* Subtext */}
      <p className="text-center text-(--main-text) max-w-xs">Stay tuned!</p>
    </div>
  );
};

export default ComingSoon;
