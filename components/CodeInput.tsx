"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ChevronDown, ChevronUp } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import type { CodeInputProps } from "../types/index";

export function CodeInput({
  label,
  value,
  onChange,
  placeholder,
  error,
  result,
  isLoading,
  ...props
}: CodeInputProps) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="space-y-2 sm:space-y-3 h-full flex flex-col">
      <div className="flex justify-between items-center">
        <Label htmlFor={label} className="text-base sm:text-lg font-semibold">
          {label}
        </Label>
        {!label.includes("Question") && (
          <div className="text-xs sm:text-sm font-medium">
            {isLoading ? (
              <span className="text-blue-600">Evaluating...</span>
            ) : result ? (
              <span className="text-green-600">Score: {result.score}/10</span>
            ) : (
              <span className="text-gray-400">Waiting for submission...</span>
            )}
          </div>
        )}
      </div>
      <div className="flex-grow">
        <Textarea
          id={label}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="resize-none h-full min-h-[150px] font-mono text-sm sm:text-base border-2 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
          {...props}
        />
      </div>
      {error && <p className="text-red-500 text-xs sm:text-sm">{error}</p>}
      {result && result.explanation && (
        <Collapsible
          defaultOpen
          open={isOpen}
          onOpenChange={setIsOpen}
          className="w-full"
        >
          <CollapsibleTrigger asChild>
            <Button
              variant="outline"
              className="w-full flex justify-between items-center text-xs sm:text-sm"
            >
              Explanation
              {isOpen ? (
                <ChevronUp className="h-3 w-3 sm:h-4 sm:w-4" />
              ) : (
                <ChevronDown className="h-3 w-3 sm:h-4 sm:w-4" />
              )}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-2">
            <div className="p-3 sm:p-4 bg-gray-100 rounded-lg">
              <ul className="list-disc pl-4 sm:pl-5 space-y-1 sm:space-y-2 text-xs sm:text-sm">
                {result.explanation.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>
            </div>
          </CollapsibleContent>
        </Collapsible>
      )}
    </div>
  );
}
