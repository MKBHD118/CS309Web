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

const teamMembers = [
  {
    name: "KV Modak",
    designation: "Lead, Data Engineer",
    image1: "/m.jpg",
    image2: "/mr1.jpeg",
    socials: {
      linkedin: "https://www.linkedin.com/in/kv-modak-45aaa12aa/",
      github: "https://github.com/mod756",
      instagram: "https://www.instagram.com/modak_756/",
    },
  },
  {
    name: "Ausula Koustubh",
    designation: "Web Developer",
    image1: "/k.jpg",
    image2: "/reed_richards.webp",
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
    image1: "/b.jpg",
    image2: "/ichigo.webp",
    socials: {
      linkedin: "https://www.linkedin.com/in/barghav-abhilash-b-r-2ab2ba29a/",
      github: "https://github.com/Meow-Codes",
      instagram: "https://www.instagram.com/abhilash_2557/", // Fixed: was twitter URL
      twitter: "https://x.com/GFLess_Kurrodu", // Fixed: was instagram URL
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
      localStorage.setItem("darkMode", String(newMode));
      document.documentElement.classList.toggle("dark", newMode);
      return newMode;
    });
  };

  return (
    <>
      <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-200 transition-all duration-300">
        <div className="container mx-auto px-6 py-12">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
              Enhancing Credit Risk Prediction with Explainable AI
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              A hybrid statistical and machine learning framework designed for{" "}
              <strong>Microfinance Credit Risk Assessment</strong> and
              transparent lending decisions.
            </p>
          </div>

          {/* Project Overview */}
          <section className="mb-16">
            <div
              className={`rounded-lg shadow-sm border p-8 transition-all duration-300 hover:shadow-lg hover:border-blue-300 ${
                isDarkMode
                  ? "bg-gray-800 border-gray-700"
                  : "bg-white border-gray-200"
              }`}
            >
              <h2 className="text-2xl font-semibold mb-4">
                Project Overview: Core Objectives
              </h2>
              <p className="leading-relaxed mb-6">
                This project focuses on developing a robust and transparent
                framework for predicting <strong>credit default risk</strong>{" "}
                within a microfinance context. We utilized a large dataset (over
                2.24M loans) and deployed a highly optimized{" "}
                <strong>LightGBM</strong> model, achieving exceptional
                predictive performance while ensuring{" "}
                <strong>statistical rigor</strong> and{" "}
                <strong>full explainability</strong> using cutting-edge
                techniques like SHAP and LIME.
              </p>
              <div className="mt-6 flex flex-wrap justify-around text-center">
                <div className="p-4">
                  <FaClipboardList
                    size={40}
                    className="mx-auto text-blue-500 mb-2"
                  />
                  <p className="font-medium">2.24M Loan Dataset Analyzed</p>
                </div>
                <div className="p-4">
                  <FaFlask size={40} className="mx-auto text-green-500 mb-2" />
                  <p className="font-medium">Validated Statistical Power</p>
                </div>
                <div className="p-4">
                  <FaChartBar
                    size={40}
                    className="mx-auto text-purple-500 mb-2"
                  />
                  <p className="font-medium">AUC-ROC: 0.9594 Achieved</p>
                </div>
              </div>
            </div>
          </section>

          {/* Why This Project */}
          <section className="mb-16">
            <div
              className={`rounded-lg shadow-sm border p-8 transition-all duration-300 hover:shadow-lg hover:border-blue-300 ${
                isDarkMode
                  ? "bg-gray-800 border-gray-700"
                  : "bg-white border-gray-200"
              }`}
            >
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Why We Undertook This Project
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Our motivation stems from the critical need for sound,
                evidence-based, and <strong>fair</strong> credit assessment in
                the <strong>microfinance sector</strong>.
              </p>
              <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                {[
                  "Lack of Transparency: Solved with SHAP and LIME explainability.",
                  "Statistical Validity: Confirmed massively overpowered model (p < 0.05 across features).",
                  "Bias Mitigation: Stratified sampling by gender, region, and income tier.",
                  "High Default Detection: 91.54% Recall at optimal threshold (0.1317).",
                ].map((text, i) => (
                  <li key={i} className="flex items-start">
                    <FaCheckCircle className="text-blue-500 mr-2 mt-1 flex-shrink-0" />
                    <span>{text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Core Modules */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-10 text-gray-900 dark:text-white">
              Core Analytical Modules & Execution
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {/* Statistical Validation */}
              <div
                className={`rounded-lg shadow-sm border p-6 transition-all ${
                  isDarkMode
                    ? "bg-gray-800 border-gray-700"
                    : "bg-white border-gray-200"
                } hover:shadow-lg hover:border-blue-300`}
              >
                <h3 className="text-xl font-semibold mb-4">
                  Statistical Validation & Power
                </h3>
                <ul className="space-y-3">
                  {[
                    "Hypothesis Testing: t-tests & Chi-square (p < 0.05)",
                    "Sample Size Adequacy: Mean Cohen's d validated",
                    "Model Stability: 5-fold CV → Excellent (AUC CV = 0.07%)",
                  ].map((t, i) => (
                    <li key={i} className="flex items-start">
                      <FaCheckCircle className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">
                        {t}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* ML Implementation */}
              <div
                className={`rounded-lg shadow-sm border p-6 transition-all ${
                  isDarkMode
                    ? "bg-gray-800 border-gray-700"
                    : "bg-white border-gray-200"
                } hover:shadow-lg hover:border-blue-300`}
              >
                <h3 className="text-xl font-semibold mb-4">
                  Machine Learning Implementation
                </h3>
                <ul className="space-y-3">
                  {[
                    "LightGBM outperformed XGBoost, RF, LR, NN",
                    "Final AUC: 0.9655",
                    "Recall: 91.54% @ threshold 0.1317",
                  ].map((t, i) => (
                    <li key={i} className="flex items-start">
                      <FaCheckCircle className="text-purple-500 mr-2 mt-1 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">
                        {t}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* XAI */}
              <div
                className={`rounded-lg shadow-sm border p-6 transition-all ${
                  isDarkMode
                    ? "bg-gray-800 border-gray-700"
                    : "bg-white border-gray-200"
                } hover:shadow-lg hover:border-blue-300`}
              >
                <h3 className="text-xl font-semibold mb-4">
                  Explainable AI (XAI)
                </h3>
                <ul className="space-y-3">
                  {[
                    "Global SHAP: Top drivers identified",
                    "Local LIME/SHAP: Justification per loan",
                    "High agreement between SHAP & LIME",
                  ].map((t, i) => (
                    <li key={i} className="flex items-start">
                      <FaCheckCircle className="text-orange-500 mr-2 mt-1 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">
                        {t}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Feature Engineering */}
              <div
                className={`rounded-lg shadow-sm border p-6 transition-all ${
                  isDarkMode
                    ? "bg-gray-800 border-gray-700"
                    : "bg-white border-gray-200"
                } hover:shadow-lg hover:border-blue-300`}
              >
                <h3 className="text-xl font-semibold mb-4">
                  Feature Engineering & Integrity
                </h3>
                <ul className="space-y-3">
                  {[
                    "11 engineered risk features",
                    "Removed 27 data leakage columns",
                    "Stratified by demographics for fairness",
                  ].map((t, i) => (
                    <li key={i} className="flex items-start">
                      <FaCheckCircle className="text-teal-500 mr-2 mt-1 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">
                        {t}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Future Enhancements */}
          <section className="mb-16">
            <div
              className={`rounded-lg shadow-sm border p-8 transition-all duration-300 hover:shadow-lg hover:border-blue-300 ${
                isDarkMode
                  ? "bg-gray-800 border-gray-700"
                  : "bg-white border-gray-200"
              }`}
            >
              <h2 className="text-2xl font-semibold mb-4">
                Future Enhancements: Responsible AI
              </h2>
              <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                {[
                  "Formal fairness audit across demographics",
                  "Interactive SHAP dashboards",
                  "Real-time API deployment",
                ].map((t, i) => (
                  <li key={i} className="flex items-start">
                    <FaCheckCircle className="text-orange-500 mr-2 mt-1 flex-shrink-0" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Team Section */}
          <section className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-12">
              Meet Our Team
            </h2>
            <div className="grid gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
              {teamMembers.map((member, idx) => (
                <TeamMemberCard
                  key={idx}
                  member={member}
                  isDarkMode={isDarkMode}
                />
              ))}
            </div>
          </section>
        </div>
        <Footer isDarkMode={isDarkMode} />
      </div>
    </>
  );
}
