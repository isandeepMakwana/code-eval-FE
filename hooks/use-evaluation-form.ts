"use client";

import { useState, useEffect } from "react";
import { FormErrors, EvaluationResult } from "../types/index";
import { servers } from "../constants/servers";
import { submitToServer } from "../utils/api";
import { formatResults } from "@/utils/responseFormatter";
import type React from "react"; // Added import for React

export function useEvaluationForm() {
  const [question1, setQuestion1] = useState("");
  const [question2, setQuestion2] = useState("");
  const [solution1, setSolution1] = useState("");
  const [solution2, setSolution2] = useState("");
  const [results, setResults] = useState<EvaluationResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [progress, setProgress] = useState(0);
  const [formErrors, setFormErrors] = useState<FormErrors>({
    question1: "",
    question2: "",
    solution1: "",
    solution2: "",
  });
  const [model, setModel] = useState("dev");
  const [currentServerIndex, setCurrentServerIndex] = useState(0);

  useEffect(() => {
    if (
      !process.env.NEXT_PUBLIC_DEV_API_URL ||
      !process.env.NEXT_PUBLIC_PROD_API_URL
    ) {
      console.error("Environment variables for API URLs are not set properly.");
      setError(
        "Application is not configured correctly. Please contact support."
      );
    }
  }, []);

  const validateForm = () => {
    const errors = {
      question1: question1.trim() ? "" : "Question 1 is required",
      question2: question2.trim() ? "" : "Question 2 is required",
      solution1: solution1.trim() ? "" : "Solution 1 is required",
      solution2: solution2.trim() ? "" : "Solution 2 is required",
    };
    setFormErrors(errors);
    return Object.values(errors).every((error) => error === "");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setError("");
    setProgress(0);
    setResults([]);

    let success = false;
    const currentServer = servers.find((s) => s.id === model) || servers[0];
    let serverIndex = servers.indexOf(currentServer);

    while (!success && serverIndex < servers.length) {
      try {
        setCurrentServerIndex(serverIndex);
        const payload = {
          questions: [{ description: question1 }, { description: question2 }],
          solutions: [[solution1], [solution2]],
        };
        const data = await submitToServer(servers[serverIndex].url!, payload);
        const formattedData = formatResults(data.results);
        setResults(formattedData);
        success = true;
      } catch (error) {
        console.error(`Error with server ${serverIndex + 1}:`, error);
        serverIndex++;
      }
    }

    if (!success) {
      setError(
        "Failed to get a response from any server. Please try again later."
      );
    }

    setIsLoading(false);
    setProgress(100);
  };

  useEffect(() => {
    if (isLoading) {
      const timer = setInterval(() => {
        setProgress((oldProgress) => {
          const diff = Math.random() * 10;
          return Math.min(oldProgress + diff, 99.9);
        });
      }, 500);

      return () => clearInterval(timer);
    }
  }, [isLoading]);

  const isFormValid =
    question1.trim() &&
    question2.trim() &&
    solution1.trim() &&
    solution2.trim();

  return {
    question1,
    setQuestion1,
    question2,
    setQuestion2,
    solution1,
    setSolution1,
    solution2,
    setSolution2,
    results,
    isLoading,
    error,
    progress,
    formErrors,
    model,
    setModel,
    currentServerIndex,
    handleSubmit,
    isFormValid,
  };
}
