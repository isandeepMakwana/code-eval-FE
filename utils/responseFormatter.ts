import { EvaluationResult } from "@/types";
export const formatResults = (results: any[]): EvaluationResult[] => {
  return results
    .map((item) => {
      try {
        const lines = item.evaluation.split('\n').filter((line: any) => !line.startsWith('```'));
        const cleanedEvaluation = lines.join('\n').trim();
        const parsed = JSON.parse(cleanedEvaluation);
        return {
          score: parsed.Score,
          explanation: parsed.Explanation,
        };
      } catch (e) {
        console.error(e);
        return null;
      }
    })
    .filter((item): item is EvaluationResult => item !== null);
};