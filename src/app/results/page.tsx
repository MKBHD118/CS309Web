// app/results/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FaChartLine, FaBrain, FaShieldAlt, FaTrophy } from "react-icons/fa";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Results() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Load dark mode from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("darkMode");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initial = saved ? saved === "true" : prefersDark;

    setIsDarkMode(initial);
    if (initial) {
      document.documentElement.classList.add("dark");
    } else {
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

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-16 px-6 transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          {/* Hero */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white mb-6">
              Model Results & Performance
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto">
              Trained on <span className="text-blue-600 dark:text-blue-400 font-bold">2.26 Million</span> real loans.
              Built for transparency, fairness, and maximum default detection.
            </p>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
            {[
              { icon: FaTrophy, label: "AUC-ROC", value: "0.9594", color: "text-yellow-500" },
              { icon: FaBrain, label: "Recall (Default Detection)", value: "91.54%", color: "text-green-500" },
              { icon: FaShieldAlt, label: "Dataset Size", value: "2.26M Loans", color: "text-blue-500" },
              { icon: FaChartLine, label: "Threshold", value: "0.1317", color: "text-purple-500" },
            ].map((stat, i) => (
              <div
                key={i}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 text-center transform hover:scale-105 transition-all duration-300"
              >
                <stat.icon className={`text-5xl mx-auto mb-4 ${stat.color}`} />
                <p className="text-gray-600 dark:text-gray-400 text-sm">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Plots */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
              <h3 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-white">
                ROC Curve
              </h3>
              <Image
                src="/results/Figure_ROC_Curve.png"
                alt="ROC Curve"
                width={800}
                height={600}
                className="rounded-lg shadow-md"
              />
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
              <h3 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-white">
                Top 15 Feature Importance (SHAP)
              </h3>
              <Image
                src="/results/Figure_SHAP_Importance.png"
                alt="SHAP Importance"
                width={800}
                height={600}
                className="rounded-lg shadow-md"
              />
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 lg:col-span-2">
              <h3 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-white">
                Default Rate Demographics (by income tier, by geographic region)
              </h3>
              <Image
                src="/results/Figure5_Default_Rate_Demographics.png"
                alt="Confusion Matrix"
                width={900}
                height={500}
                className="rounded-lg shadow-md mx-auto"
              />
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
              <h3 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-white">
                Model Comparision AUC
              </h3>
              <Image
                src="/results/Figure6_Model_Comparison_AUC.png"
                alt="ROC Curve"
                width={800}
                height={600}
                className="rounded-lg shadow-md"
              />
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
              <h3 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-white">
                Confusion Matrix (Optimal Threshold: 0.1317)
              </h3>
              <Image
                src="/results/Figure_Confusion_Matrix.png"
                alt="Confusion Matrix"
                width={800}
                height={600}
                className="rounded-lg shadow-md"
              />
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 lg:col-span-2">
              <h3 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-white">
                SHAP Effect Direction
              </h3>
              <Image
                src="/results/Figure7_SHAP_Effect_Direction.png"
                alt="Shap direction"
                width={900}
                height={500}
                className="rounded-lg shadow-md mx-auto"
              />
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 lg:col-span-2">
              <h3 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-white">
                Comparions amongst different implementations
              </h3>
              <Image
                src="/results/final_stats.png"
                alt="final stats"
                width={900}
                height={500}
                className="rounded-lg shadow-md mx-auto"
              />
            </div>
          </div>

          {/* CTA */}
          <div className="text-center py-12">
            <a
              href="/predict"
              className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold text-xl px-12 py-6 rounded-full shadow-2xl transform hover:scale-110 transition-all duration-300"
            >
              Try the Model Live → Predict Default Risk
            </a>
          </div>
        </div>

        <Footer isDarkMode={isDarkMode} />
      </div>
    </>
  );
}