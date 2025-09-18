"use client";
import React, { useState, useEffect } from "react";
import TeamMemberCard from "@/components/TeamMemberCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  FaCheckCircle,
  FaChartBar,
  FaClipboardList,
  FaFlask,
} from "react-icons/fa";

// Team members data
const teamMembers = [
  {
    name: "KV Modak",
    designation: "Lead Data Engineer",
    image1: "/m.jpg", // Relative path to public directory
    image2: "/mr1.jpeg", // Relative path to public directory
    socials: {
      linkedin: "https://www.linkedin.com/in/kv-modak-45aaa12aa/",
      github: "https://github.com/mod756",
      instagram: "https://www.instagram.com/modak_756/",
    },
  },
  {
    name: "Ausula Koustubh",
    designation: "Web Developer",
    image1: "/k.jpg", // Relative path to public directory
    image2: "/reed_richards.webp", // Relative path to public directory
    socials: {
      linkedin: "https://www.linkedin.com/in/koustubhausula/",
      github: "https://github.com/Koustubh-here",
      instagram: "https://www.instagram.com/koustubh_.__/",
      twitter: "https://x.com/AusulaKous30542",
    },
  },
  {
    name: "Barghav Abhilash B R",
    designation: "Web Developer",
    image1: "/b.jpg", // Relative path to public directory
    image2: "/ichigo.webp", // Relative path to public directory
    socials: {
      linkedin: "https://www.linkedin.com/in/barghav-abhilash-b-r-2ab2ba29a/",
      github: "https://github.com/Meow-Codes",
      instagram: "https://x.com/GFLess_Kurrodu",
      twitter: "https://www.instagram.com/abhilash_2557/",
    },
  },
];

export default function About() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("darkMode");
    if (saved === "true") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => {
      const newMode = !prev;
      localStorage.setItem("darkMode", newMode.toString());
      if (newMode) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      return newMode;
    });
  };

  return (
    <>
      <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-200 transition-all">
        <div className="container mx-auto px-6 py-12">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
              Get to Know More About Our Data‑Driven Analysis Project
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Leveraging robust statistical methods to extract actionable
              insights from data.
            </p>
          </div>
          {/* Project Overview */}
          <div className="mb-16">
            <div
              className={`rounded-lg shadow-sm border ${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} p-8 transition-all duration-300 hover:shadow-lg hover:border-blue-300`}
            >
              <h2 className="text-2xl font-semibold mb-4">Project Overview: Fantastic 4</h2>
              <p className="leading-relaxed">Project Overview Here</p>
              <div className="mt-6 flex flex-wrap justify-around text-center">
                <div className="p-4">
                  <FaClipboardList size={40} className="mx-auto text-blue-500 mb-2" />
                  <p className="font-medium">Systematic Data Collection</p>
                </div>
                <div className="p-4">
                  <FaFlask size={40} className="mx-auto text-green-500 mb-2" />
                  <p className="font-medium">Rigorous Hypothesis Testing</p>
                </div>
                <div className="p-4">
                  <FaChartBar size={40} className="mx-auto text-purple-500 mb-2" />
                  <p className="font-medium">Actionable Data Insights</p>
                </div>
              </div>
            </div>
          </div>
          {/* Why We Undertook This Project */}
          <div className="mb-16">
            <div
              className={`rounded-lg shadow-sm border ${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} p-8 transition-all duration-300 hover:shadow-lg hover:border-blue-300`}
            >
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Why We Undertook This Project
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Our motivation stems from the critical need for sound,
                evidence-based conclusions in **[mention the relevant field or
                context]**, addressing common challenges such as:
              </p>
              <ul className="text-gray-700 dark:text-gray-300 space-y-2">
                <li className="flex items-start">
                  <FaCheckCircle className="text-blue-500 mr-2 mt-1 flex-shrink-0" />
                  <span>
                    Ensuring the representativeness and reliability of collected
                    data.
                  </span>
                </li>
                <li className="flex items-start">
                  <FaCheckCircle className="text-blue-500 mr-2 mt-1 flex-shrink-0" />
                  <span>
                    Drawing statistically valid inferences from sample data to
                    populations.
                  </span>
                </li>
                <li className="flex items-start">
                  <FaCheckCircle className="text-blue-500 mr-2 mt-1 flex-shrink-0" />
                  <span>
                    Differentiating between significant findings and random
                    variations.
                  </span>
                </li>
                <li className="flex items-start">
                  <FaCheckCircle className="text-blue-500 mr-2 mt-1 flex-shrink-0" />
                  <span>
                    Effectively analyzing and interpreting categorical and
                    quantitative data.
                  </span>
                </li>
              </ul>
            </div>
          </div>
          {/* Core Analytical Modules */}
          <div className="mb-16">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-8 text-center">
              Core Analytical Modules
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div
                className={`rounded-lg shadow-sm border ${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} p-6 transition-all duration-300 hover:shadow-lg hover:border-blue-300`}
              >
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Data Sourcing & Sampling
                </h3>
                <ul className="text-gray-700 dark:text-gray-300 space-y-2">
                  <li className="flex items-start">
                    <FaCheckCircle className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                    <span>
                      Utilizes various probability and non-probability sampling
                      techniques.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <FaCheckCircle className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                    <span>
                      Emphasis on designing effective survey instruments and
                      questionnaires.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <FaCheckCircle className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                    <span>
                      Focus on data integrity and comprehensive data collection
                      methods.
                    </span>
                  </li>
                </ul>
              </div>
              <div
                className={`rounded-lg shadow-sm border ${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} p-6 transition-all duration-300 hover:shadow-lg hover:border-blue-300`}
              >
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Parametric & Non-Parametric Tests
                </h3>
                <ul className="text-gray-700 dark:text-gray-300 space-y-2">
                  <li className="flex items-start">
                    <FaCheckCircle className="text-purple-500 mr-2 mt-1 flex-shrink-0" />
                    <span>
                      Application of large and small sample tests (e.g.,
                      Z-tests, t-tests).
                    </span>
                  </li>
                  <li className="flex items-start">
                    <FaCheckCircle className="text-purple-500 mr-2 mt-1 flex-shrink-0" />
                    <span>
                      Implementation of non-parametric methods (e.g., Sign,
                      Wilcoxon, Mann-Whitney U tests).
                    </span>
                  </li>
                  <li className="flex items-start">
                    <FaCheckCircle className="text-purple-500 mr-2 mt-1 flex-shrink-0" />
                    <span>
                      Robust analysis of variance and equality of
                      means/proportions.
                    </span>
                  </li>
                </ul>
              </div>
              <div
                className={`rounded-lg shadow-sm border ${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} p-6 transition-all duration-300 hover:shadow-lg hover:border-blue-300`}
              >
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Categorical Data & Goodness of Fit
                </h3>
                <ul className="text-gray-700 dark:text-gray-300 space-y-2">
                  <li className="flex items-start">
                    <FaCheckCircle className="text-orange-500 mr-2 mt-1 flex-shrink-0" />
                    <span>
                      Analysis using contingency tables and measures of
                      association.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <FaCheckCircle className="text-orange-500 mr-2 mt-1 flex-shrink-0" />
                    <span>
                      Goodness of Fit tests to assess observed vs. expected
                      distributions.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <FaCheckCircle className="text-orange-500 mr-2 mt-1 flex-shrink-0" />
                    <span>
                      Insights into relationships and independence within
                      categorical data.
                    </span>
                  </li>
                </ul>
              </div>
              <div
                className={`rounded-lg shadow-sm border ${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} p-6 transition-all duration-300 hover:shadow-lg hover:border-blue-300`}
              >
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Precision in Estimation
                </h3>
                <ul className="text-gray-700 dark:text-gray-300 space-y-2">
                  <li className="flex items-start">
                    <FaCheckCircle className="text-teal-500 mr-2 mt-1 flex-shrink-0" />
                    <span>
                      Methods for calculating adequate sample size for various
                      study designs.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <FaCheckCircle className="text-teal-500 mr-2 mt-1 flex-shrink-0" />
                    <span>
                      Construction of confidence intervals for population
                      parameters.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <FaCheckCircle className="text-teal-500 mr-2 mt-1 flex-shrink-0" />
                    <span>
                      Ensuring statistical power and reliability of conclusions.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {/* Future Enhancements */}
          <div className="mb-16">
            <div
              className={`rounded-lg shadow-sm border ${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} p-8 transition-all duration-300 hover:shadow-lg hover:border-blue-300`}
            >
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Future Enhancements
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                We are dedicated to expanding the analytical depth and practical
                applicability of this project, with planned enhancements
                including:
              </p>
              <ul className="text-gray-700 dark:text-gray-300 space-y-2">
                <li className="flex items-start">
                  <FaCheckCircle className="text-orange-500 mr-2 mt-1 flex-shrink-0" />
                  <span>
                    Integration of advanced statistical modeling techniques for
                    complex relationships.
                  </span>
                </li>
                <li className="flex items-start">
                  <FaCheckCircle className="text-orange-500 mr-2 mt-1 flex-shrink-0" />
                  <span>
                    Development of interactive visualizations for deeper data
                    exploration.
                  </span>
                </li>
                <li className="flex items-start">
                  <FaCheckCircle className="text-orange-500 mr-2 mt-1 flex-shrink-0" />
                  <span>
                    Capabilities to handle streaming data for real-time
                    statistical insights.
                  </span>
                </li>
              </ul>
            </div>
          </div>
          {/* Meet Our Team */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
              Meet Our Team
            </h2>
          </div>
          {/* Cards */}
          <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
            {teamMembers.map((member, idx) => (
              <TeamMemberCard
                key={idx}
                member={member}
                isDarkMode={isDarkMode}
              />
            ))}
          </div>
        </div>
        <Footer isDarkMode={isDarkMode} />
      </div>
    </>
  );
}