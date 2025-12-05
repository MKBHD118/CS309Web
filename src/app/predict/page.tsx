// app/predict/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import {
  FaSpinner,
  FaExclamationTriangle,
  FaCheckCircle,
} from "react-icons/fa";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Predict() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Load dark mode from localStorage + respect OS preference
  useEffect(() => {
    const saved = localStorage.getItem("darkMode");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const initial = saved !== null ? saved === "true" : prefersDark;

    setIsDarkMode(initial);
    document.documentElement.classList.toggle("dark", initial);
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => {
      const newMode = !prev;
      localStorage.setItem("darkMode", String(newMode));
      document.documentElement.classList.toggle("dark", newMode);
      return newMode;
    });
  };

  const [formData, setFormData] = useState({
    loan_amnt: 10000,
    annual_inc: 60000,
    fico_range_high: 720,
    int_rate: 12.5,
    dti: 20,
    term: "36",
    grade: "B",
    emp_length: "5",
    home_ownership: "RENT",
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    probability: number;
    risk: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    // --- START MODEL-INFORMED SIMULATION ---

    // 1. Define Model Constants (from Python notebook analysis)
    // Optimal Threshold determined by Youden's J for best Recall (91.54%)
    const OPTIMAL_THRESHOLD = 0.1317;
    const BASE_PROBABILITY = 0.04; // Baseline risk for a neutral/average applicant

    // 2. Calculate Key Risk Proxies (based on Top SHAP Features)
    const loanToIncomeRatio = formData.loan_amnt / formData.annual_inc;
    // FICO is the strongest protective factor; normalize around a good score (e.g., 700)
    const ficoImpact = (formData.fico_range_high - 700) / 100;
    // DTI is a strong risk factor; normalize around a common limit (e.g., 35%)
    const dtiNormalized = formData.dti / 35;

    // 3. Weighted Risk Score Calculation (Simulating SHAP effects)
    let riskScore = BASE_PROBABILITY;

    // FICO: Highest negative weight (protective). Higher FICO = lower riskScore.
    riskScore -= ficoImpact * 0.15;

    // Loan-to-Income: High LTI increases risk (positive weight).
    riskScore += loanToIncomeRatio * 0.1;

    // DTI: High DTI increases risk (positive weight).
    riskScore += dtiNormalized * 0.08;

    // Interest Rate & Term (minor factors compared to FICO/LTI/DTI)
    riskScore += (formData.int_rate / 20) * 0.05;
    if (formData.term === "60") {
      riskScore += 0.02; // Longer term slightly increases risk
    }

    // Add minor noise for realistic variation in the prediction
    riskScore += Math.random() * 0.03 - 0.015;

    // Clamp the probability between 2% and 95%
    const prob = Math.min(0.95, Math.max(0.02, riskScore));

    // 4. Determine Risk Category based on OPTIMAL THRESHOLD (0.1317)
    let risk = "";
    if (prob < OPTIMAL_THRESHOLD * 0.75) {
      // Well below threshold: safe APPROVE
      risk = "Low (APPROVE)";
    } else if (prob < OPTIMAL_THRESHOLD * 1.25) {
      // Near threshold: requires closer look
      risk = "Medium (BORDERLINE)";
    } else {
      // Well above threshold: DENY
      risk = "High (DENY)";
    }

    setResult({ probability: prob, risk });
    // --- END MODEL-INFORMED SIMULATION ---

    setLoading(false);
  };

  // Proper handler for number inputs
  const handleNumberChange =
    (name: keyof typeof formData) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value === "" ? 0 : parseFloat(e.target.value);
      setFormData((prev) => ({ ...prev, [name]: value }));
    };

  return (
    <>
      <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-16 px-6 transition-colors duration-300">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-yellow-500">
              Notice: This is just a mock up version. The real model
              implementation is underway
            </h1>
            <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white mb-6">
              Live Credit Risk Prediction
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Enter loan details and see real-time default probability
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-10">
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              <Input
                label="Loan Amount ($)"
                name="loan_amnt"
                value={formData.loan_amnt}
                onChange={handleNumberChange("loan_amnt")}
                min={1000}
                max={40000}
                step={1000}
              />
              <Input
                label="Annual Income ($)"
                name="annual_inc"
                value={formData.annual_inc}
                onChange={handleNumberChange("annual_inc")}
                min={10000}
                max={300000}
                step={5000}
              />
              <Input
                label="FICO Score"
                name="fico_range_high"
                value={formData.fico_range_high}
                onChange={handleNumberChange("fico_range_high")}
                min={600}
                max={850}
              />
              <Input
                label="Interest Rate (%)"
                name="int_rate"
                value={formData.int_rate}
                onChange={handleNumberChange("int_rate")}
                min={5}
                max={30}
                step={0.1}
              />
              <Input
                label="Debt-to-Income Ratio (%)"
                name="dti"
                value={formData.dti}
                onChange={handleNumberChange("dti")}
                min={0}
                max={50}
              />

              {/* Term Select */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Loan Term (Months)
                </label>
                <select
                  className="w-full p-4 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  value={formData.term}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, term: e.target.value }))
                  }
                >
                  {["36", "60"].map((t) => (
                    <option key={t} value={t}>
                      {t} Months
                    </option>
                  ))}
                </select>
              </div>

              {/* Grade Select */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Credit Grade
                </label>
                <select
                  className="w-full p-4 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  value={formData.grade}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, grade: e.target.value }))
                  }
                >
                  {["A", "B", "C", "D", "E"].map((g) => (
                    <option key={g} value={g}>
                      Grade {g}{" "}
                      {g === "A" ? "(Best)" : g === "E" ? "(Riskiest)" : ""}
                    </option>
                  ))}
                </select>
              </div>

              {/* Home Ownership Select */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Home Ownership
                </label>
                <select
                  className="w-full p-4 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  value={formData.home_ownership}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      home_ownership: e.target.value,
                    }))
                  }
                >
                  {["RENT", "MORTGAGE", "OWN", "ANY"].map((h) => (
                    <option key={h} value={h}>
                      {h}
                    </option>
                  ))}
                </select>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="md:col-span-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold text-xl py-6 rounded-xl shadow-lg disabled:opacity-70 flex items-center justify-center gap-3 transition-all mt-4"
              >
                {loading ? (
                  <>
                    <FaSpinner className="animate-spin" /> Analyzing Risk...
                  </>
                ) : (
                  "Predict Default Risk"
                )}
              </button>
            </form>

            {/* Result Display */}
            {result && (
              <div className="mt-12 p-10 rounded-2xl text-white text-center shadow-2xl">
                <div
                  className={`p-6 rounded-xl ${
                    result.risk === "Low (APPROVE)"
                      ? "bg-green-600"
                      : result.risk === "Medium (BORDERLINE)"
                      ? "bg-yellow-600"
                      : "bg-red-600"
                  }`}
                >
                  <h2 className="text-5xl font-bold mb-4">
                    {(result.probability * 100).toFixed(2)}% Default Risk
                  </h2>
                  <div
                    className={`text-3xl font-bold flex items-center justify-center gap-4`}
                  >
                    {result.risk === "Low (APPROVE)" ? (
                      <FaCheckCircle />
                    ) : (
                      <FaExclamationTriangle />
                    )}
                    <span>{result.risk}</span>
                  </div>
                </div>

                <p className="mt-4 text-gray-700 dark:text-gray-300 text-sm">
                  <span className="inline-block bg-gray-200 dark:bg-gray-600 px-2 py-0.5 rounded text-xs mr-1">
                    *Based on the
                  </span>
                  <span className="font-semibold text-blue-600 dark:text-blue-400">
                    Optimal Threshold
                  </span>
                  <span className="inline-block bg-gray-200 dark:bg-gray-600 px-2 py-0.5 rounded text-xs ml-1">
                    (0.1317)
                  </span>
                  <span>
                    {" "}
                    derived from the LightGBM model. Borderline cases suggest a
                    need for{" "}
                  </span>
                  <span className="font-semibold text-orange-600 dark:text-orange-400">
                    Manual Review
                  </span>
                  <span> or conditional approval.</span>
                </p>
                <div className="mt-6 text-left p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Key Factors Simulated:
                  </h3>
                  <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 text-sm space-y-2">
                    <li>
                      <span className="inline-flex items-center gap-1.5">
                        <span className="font-bold text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-900/30 px-2 py-0.5 rounded">
                          FICO Score:
                        </span>
                        <span>
                          The most protective factor. Higher scores strongly
                          decrease risk.
                        </span>
                      </span>
                    </li>
                    <li>
                      <span className="inline-flex items-center gap-1.5">
                        <span className="font-bold text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-900/30 px-2 py-0.5 rounded">
                          Loan-to-Income Ratio:
                        </span>
                        <span>
                          A key risk indicator. High LTI increases the predicted
                          risk.
                        </span>
                      </span>
                    </li>
                    <li>
                      <span className="inline-flex items-center gap-1.5">
                        <span className="font-bold text-orange-700 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/30 px-2 py-0.5 rounded">
                          DTI (Debt-to-Income):
                        </span>
                        <span>
                          High DTI drives the probability towards default.
                        </span>
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>

        <Footer isDarkMode={isDarkMode} />
      </div>
    </>
  );
}

// Clean, safe Input component — no more React warnings
function Input({
  label,
  name,
  value,
  onChange,
  ...props
}: {
  label: string;
  name: string;
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  [key: string]: any;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        {label}
      </label>
      <input
        type="number"
        name={name}
        value={value}
        onChange={onChange}
        className="w-full p-4 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
        {...props}
      />
    </div>
  );
}
