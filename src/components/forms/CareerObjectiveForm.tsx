import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useResumeData } from "@/hooks/useResumeData";

export const CareerObjectiveForm = () => {
  const { resumeData, updatePersonalInfo } = useResumeData();
  const { personalInfo } = resumeData;

  const handleChange = (field: string, value: string) => {
    updatePersonalInfo({
      ...personalInfo,
      [field]: value
    });
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="careerObjective" className="text-sm font-medium">
        Career Objective
      </Label>
      <Textarea
        id="careerObjective"
        placeholder="e.g., Seeking a challenging role as a business intelligence analyst..."
        value={personalInfo.careerObjective}
        onChange={(e) => handleChange('careerObjective', e.target.value)}
        rows={4}
      />
    </div>
  );
};