import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useResumeData } from "@/hooks/useResumeData";
import { Education } from "@/types/resume";
import { Plus, Trash2, GraduationCap } from "lucide-react";

export const EducationForm = () => {
  const { resumeData, updateEducation } = useResumeData();
  const { education } = resumeData;

  const addEducation = () => {
    const newEducation: Education = {
      id: Date.now().toString(),
      degree: '',
      institution: '',
      startDate: '',
      endDate: '',
      description: '',
      gpa: ''
    };
    updateEducation([...education, newEducation]);
  };

  const removeEducation = (id: string) => {
    updateEducation(education.filter(edu => edu.id !== id));
  };

  const updateEducationItem = (id: string, field: string, value: string) => {
    updateEducation(education.map(edu => 
      edu.id === id ? { ...edu, [field]: value } : edu
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-muted-foreground">
          Add your educational background, degrees, and academic achievements.
        </p>
        <Button onClick={addEducation} size="sm" className="gap-2">
          <Plus className="h-4 w-4" />
          Add Education
        </Button>
      </div>

      {education.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <GraduationCap className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground text-center mb-4">
              No education entries yet. Add your first degree or certification.
            </p>
            <Button onClick={addEducation} className="gap-2">
              <Plus className="h-4 w-4" />
              Add Education
            </Button>
          </CardContent>
        </Card>
      ) : (
        education.map((edu, index) => (
          <Card key={edu.id} className="relative">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Education #{index + 1}</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeEducation(edu.id)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Degree/Program</Label>
                  <Input
                    placeholder="Bachelor of Computer Science"
                    value={edu.degree}
                    onChange={(e) => updateEducationItem(edu.id, 'degree', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">Institution</Label>
                  <Input
                    placeholder="University of Example"
                    value={edu.institution}
                    onChange={(e) => updateEducationItem(edu.id, 'institution', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">Start Date</Label>
                  <Input
                    placeholder="Sep 2019"
                    value={edu.startDate}
                    onChange={(e) => updateEducationItem(edu.id, 'startDate', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">End Date</Label>
                  <Input
                    placeholder="May 2023"
                    value={edu.endDate}
                    onChange={(e) => updateEducationItem(edu.id, 'endDate', e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">GPA (Optional)</Label>
                  <Input
                    placeholder="3.8/4.0"
                    value={edu.gpa}
                    onChange={(e) => updateEducationItem(edu.id, 'gpa', e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Description (Optional)</Label>
                <Textarea
                  placeholder="Relevant coursework, honors, activities..."
                  value={edu.description}
                  onChange={(e) => updateEducationItem(edu.id, 'description', e.target.value)}
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};