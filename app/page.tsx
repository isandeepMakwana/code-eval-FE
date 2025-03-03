"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Label } from "@/components/ui/label";
import { CodeInput } from "../components/CodeInput";
import { useEvaluationForm } from "../hooks/use-evaluation-form";
import { servers } from "../constants/servers";
import type React from "react"; // Added import for React

export default function CodeEvaluationForm() {
  const {
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
  } = useEvaluationForm();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
        // handleSubmit(new Event("submit") as React.FormEvent);
        const form = event.target as HTMLFormElement;
        form.requestSubmit?.();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleSubmit]);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex-grow flex flex-col max-w-[1600px] w-full mx-auto px-4 py-4 sm:px-6 sm:py-6 md:px-8 lg:px-12">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-0">
            Code Evaluation Form
          </h1>
          <RadioGroup
            value={model}
            onValueChange={setModel}
            className="flex flex-wrap items-center gap-4"
          >
            {servers.map((server) => (
              <div key={server.id} className="flex items-center space-x-2">
                <RadioGroupItem
                  value={server.id}
                  id={server.id}
                  className="border-2"
                />
                <Label htmlFor={server.id} className="text-sm sm:text-base">
                  {server.name}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex-grow flex flex-col space-y-6 sm:space-y-8"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 flex-grow">
            <CodeInput
              label="Question 1"
              value={question1}
              onChange={setQuestion1}
              placeholder="Enter coding question 1"
              error={formErrors.question1}
            />
            <CodeInput
              label="Question 2"
              value={question2}
              onChange={setQuestion2}
              placeholder="Enter coding question 2"
              error={formErrors.question2}
            />
            <CodeInput
              label="Solution 1"
              value={solution1}
              onChange={setSolution1}
              placeholder="Enter solution 1"
              error={formErrors.solution1}
              result={results[0]}
              isLoading={isLoading}
            />
            <CodeInput
              label="Solution 2"
              value={solution2}
              onChange={setSolution2}
              placeholder="Enter solution 2"
              error={formErrors.solution2}
              result={results[1]}
              isLoading={isLoading}
            />
          </div>

          <div className="relative mt-auto">
            <Button
              type="submit"
              className="w-full bg-black hover:bg-gray-800 text-white h-12 sm:h-14 rounded-lg text-base sm:text-lg font-medium"
              disabled={isLoading || !isFormValid}
            >
              {isLoading
                ? `Evaluating (Server ${currentServerIndex + 1})...`
                : "Submit for Evaluation"}
            </Button>
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-xs sm:text-sm">
              (CMD+Enter)
            </span>
          </div>
        </form>

        {isLoading && (
          <div className="mt-6 space-y-2">
            <Progress value={progress} className="w-full h-2" />
            <p className="text-center text-xs sm:text-sm text-gray-600">
              Evaluating your code on Server {currentServerIndex + 1}...
            </p>
          </div>
        )}

        {error && (
          <Alert variant="destructive" className="mt-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  );
}
