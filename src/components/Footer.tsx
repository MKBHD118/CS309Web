// components/Footer.tsx
import React from "react";
import Link from "next/link"; // Import Link for internal navigation

interface FooterProps {
  isDarkMode: boolean;
}

const Footer: React.FC<FooterProps> = ({ isDarkMode }) => {
  return (
    <footer className={`py-8 ${isDarkMode ? "bg-gray-900 text-gray-400" : "bg-gray-100 text-gray-600"}`}>
      <div className="container mx-auto px-6 text-center">
        <p className="mb-4 text-sm">&copy; 2025 AbNormal Distributions. All rights reserved.</p>
        <div className="flex justify-center space-x-6">
          <Link
            href="/about"
            className={`transition-colors duration-200 hover:text-yellow-500 ${isDarkMode ? "hover:text-blue-400" : ""}`}
            aria-label="About Us"
          >
            About Us
          </Link>
          <Link
            href="/predict"
            className={`transition-colors duration-200 hover:text-yellow-500 ${isDarkMode ? "hover:text-blue-400" : ""}`}
            aria-label="About Us"
          >
            Predict
          </Link>
          <Link
            href="/results"
            className={`transition-colors duration-200 hover:text-yellow-500 ${isDarkMode ? "hover:text-blue-400" : ""}`}
            aria-label="About Us"
          >
            Results
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;