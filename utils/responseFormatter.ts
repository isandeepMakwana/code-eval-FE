import { EvaluationResult } from "@/types";
export const formatResults = (results: any[]): EvaluationResult[] => {
  return results
    .map((item) => {
      try {
        const cleanedEvaluation = item.evaluation.replace(
          /^```json\s*|\s*```$/g,
          ""
        );
        const parsed = JSON.parse(cleanedEvaluation);
        return {
          score: parsed.Score, // Ensure case consistency
          explanation: parsed.Explanation, // Ensure correct field names
        };
      } catch (e) {
        return null;
      }
    })
    .filter((item): item is EvaluationResult => item !== null);
};
