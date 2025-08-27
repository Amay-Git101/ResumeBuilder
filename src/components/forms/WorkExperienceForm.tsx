import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useResumeData } from "@/hooks/useResumeData";
import { WorkExperience } from "@/types/resume";
import { Plus, Trash2, Briefcase } from "lucide-react";

export const WorkExperienceForm = () => {
  const { resumeData, updateWorkExperience } = useResumeData();
  const { workExperience } = resumeData;

  const addWorkExperience = () => {
    const newExperience: WorkExperience = {
      id: Date.now().toString(),
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
      achievements: []
    };
    updateWorkExperience([...workExperience, newExperience]);
  };

  const removeWorkExperience = (id: string) => {
    updateWorkExperience(workExperience.filter(exp => exp.id !== id));
  };

  const updateWorkExperienceItem = (id: string, field: string, value: string | boolean) => {
    updateWorkExperience(workExperience.map(exp => 
      exp.id === id ? { ...exp, [field]: value } : exp
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-muted-foreground">
          Add your professional work experience, internships, and relevant positions.
        </p>
        <Button onClick={addWorkExperience} size="sm" className="gap-2">
          <Plus className="h-4 w-4" />
          Add Experience
        </Button>
      </div>

      {workExperience.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Briefcase className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground text-center mb-4">
              No work experience entries yet. Add your professional background.
            </p>
            <Button onClick={addWorkExperience} className="gap-2">
              <Plus className="h-4 w-4" />
              Add Experience
            </Button>
          </CardContent>
        </Card>
      ) : (
        workExperience.map((exp, index) => (
          <Card key={exp.id} className="relative">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Experience #{index + 1}</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeWorkExperience(exp.id)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Company</Label>
                  <Input
                    placeholder="Tech Corp Inc."
                    value={exp.company}
                    onChange={(e) => updateWorkExperienceItem(exp.id, 'company', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">Position</Label>
                  <Input
                    placeholder="Software Engineer"
                    value={exp.position}
                    onChange={(e) => updateWorkExperienceItem(exp.id, 'position', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">Start Date</Label>
                  <Input
                    placeholder="Jan 2022"
                    value={exp.startDate}
                    onChange={(e) => updateWorkExperienceItem(exp.id, 'startDate', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">End Date</Label>
                  <Input
                    placeholder="Dec 2023"
                    value={exp.endDate}
                    onChange={(e) => updateWorkExperienceItem(exp.id, 'endDate', e.target.value)}
                    disabled={exp.current}
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id={`current-${exp.id}`}
                  checked={exp.current}
                  onCheckedChange={(checked) => {
                    updateWorkExperienceItem(exp.id, 'current', checked);
                    if (checked) {
                      updateWorkExperienceItem(exp.id, 'endDate', '');
                    }
                  }}
                />
                <Label htmlFor={`current-${exp.id}`} className="text-sm">
                  I currently work here
                </Label>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Job Description & Achievements</Label>
                <Textarea
                  placeholder="• Developed and maintained web applications using React and Node.js&#10;• Collaborated with cross-functional teams to deliver high-quality products&#10;• Improved system performance by 30% through optimization techniques"
                  value={exp.description}
                  onChange={(e) => updateWorkExperienceItem(exp.id, 'description', e.target.value)}
                  rows={6}
                />
                <p className="text-xs text-muted-foreground">
                  Use bullet points (•) to list your responsibilities and achievements. Press Enter for new lines.
                </p>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};