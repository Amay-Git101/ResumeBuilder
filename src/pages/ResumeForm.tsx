import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useNavigate } from "react-router-dom";
import { useResumeData } from "@/hooks/useResumeData";
import {
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  User,
  GraduationCap,
  Briefcase,
  Code,
  Award,
  Target,
  Eye,
  Save,
  RefreshCw,
  FileText,
  Trash2,
  Sparkles,
  ClipboardList
} from "lucide-react";
import { PersonalInfoForm } from "@/components/forms/PersonalInfoForm";
import { EducationForm } from "@/components/forms/EducationForm";
import { WorkExperienceForm } from "@/components/forms/WorkExperienceForm";
import { ProjectsForm } from "@/components/forms/ProjectsForm";
import { SkillsForm } from "@/components/forms/SkillsForm";
import { AchievementsForm } from "@/components/forms/AchievementsForm";
import { CareerObjectiveForm } from "@/components/forms/CareerObjectiveForm";
import { toast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const sections = [
  {
    id: 'personal',
    title: 'Personal Information',
    icon: <User className="h-5 w-5" />,
    required: true,
    component: PersonalInfoForm
  },
  {
    id: 'objective',
    title: 'Career Objective',
    icon: <ClipboardList className="h-5 w-5" />,
    required: false,
    component: CareerObjectiveForm
  },
  {
    id: 'education',
    title: 'Education',
    icon: <GraduationCap className="h-5 w-5" />,
    required: false,
    component: EducationForm
  },
  {
    id: 'experience',
    title: 'Work Experience',
    icon: <Briefcase className="h-5 w-5" />,
    required: false,
    component: WorkExperienceForm
  },
  {
    id: 'projects',
    title: 'Projects',
    icon: <Code className="h-5 w-5" />,
    required: false,
    component: ProjectsForm
  },
  {
    id: 'skills',
    title: 'Skills',
    icon: <Target className="h-5 w-5" />,
    required: false,
    component: SkillsForm
  },
  {
    id: 'achievements',
    title: 'Achievements & Certifications',
    icon: <Award className="h-5 w-5" />,
    required: false,
    component: AchievementsForm
  }
];

const ResumeForm = () => {
  const navigate = useNavigate();
  const { clearData, fillSampleData, getCompletionPercentage } = useResumeData();
  const [openSections, setOpenSections] = useState<string[]>(['personal']);
  const [isSaving, setIsSaving] = useState(false);

  const toggleSection = (sectionId: string) => {
    setOpenSections(prev =>
      prev.includes(sectionId)
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const handleSaveProgress = async () => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
    toast({
      title: "Progress Saved",
      description: "Your resume data has been saved successfully.",
    });
  };

  const handleClearAll = () => {
    if (window.confirm("Are you sure you want to clear all data? This action cannot be undone.")) {
      clearData();
      toast({
        title: "Data Cleared",
        description: "All resume data has been cleared.",
        variant: "destructive"
      });
    }
  };
  
  const handleFillSample = () => {
    fillSampleData();
    toast({
      title: "Sample Data Loaded",
      description: "The form has been filled with sample data.",
    });
  }

  const completionPercentage = getCompletionPercentage();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 px-6 py-4 border-b bg-card/95 backdrop-blur-sm">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/templates')}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Templates
            </Button>
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
              <FileText className="h-6 w-6 text-primary" />
              <span className="font-semibold">Resume Builder</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2">
              <Badge variant="outline">Step 2 of 2</Badge>
              <Badge variant="secondary">{completionPercentage}% Complete</Badge>
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/preview')}
                className="gap-2"
              >
                <Eye className="h-4 w-4" />
                Preview
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={handleSaveProgress}
                disabled={isSaving}
                className="gap-2"
              >
                {isSaving ? (
                  <RefreshCw className="h-4 w-4 animate-spin" />
                ) : (
                  <Save className="h-4 w-4" />
                )}
                Save
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-6 py-8">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-4">Build Your Resume</h1>
            <p className="text-muted-foreground">
              Fill in your information below. All sections are saved automatically as you type.
            </p>
          </div>
          
          <div className="flex justify-end mb-4">
            <Button variant="outline" size="sm" onClick={handleFillSample} className="gap-2">
              <Sparkles className="h-4 w-4" />
              Fill with Sample Data
            </Button>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Progress</span>
              <span className="text-sm text-muted-foreground">{completionPercentage}%</span>
            </div>
            <Progress value={completionPercentage} className="h-2" />
          </div>

          {/* Form Sections */}
          <div className="space-y-6">
            {sections.map((section) => {
              const Component = section.component;
              const isOpen = openSections.includes(section.id);

              return (
                <Card key={section.id} className="overflow-hidden">
                  <Collapsible open={isOpen} onOpenChange={() => toggleSection(section.id)}>
                    <CollapsibleTrigger asChild>
                      <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="text-primary">
                              {section.icon}
                            </div>
                            <CardTitle className="text-lg">{section.title}</CardTitle>
                            {section.required && (
                              <Badge variant="destructive" className="text-xs">Required</Badge>
                            )}
                          </div>
                          {isOpen ? (
                            <ChevronUp className="h-5 w-5 text-muted-foreground" />
                          ) : (
                            <ChevronDown className="h-5 w-5 text-muted-foreground" />
                          )}
                        </div>
                      </CardHeader>
                    </CollapsibleTrigger>

                    <CollapsibleContent>
                      <CardContent className="pt-0">
                        <Component />
                      </CardContent>
                    </CollapsibleContent>
                  </Collapsible>
                </Card>
              );
            })}
          </div>

          {/* Action Buttons */}
          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => navigate('/preview')}
              className="gap-2"
            >
              <Eye className="h-4 w-4" />
              Preview & Download
            </Button>

            <Button
              variant="outline"
              size="lg"
              onClick={handleSaveProgress}
              disabled={isSaving}
              className="gap-2"
            >
              {isSaving ? (
                <RefreshCw className="h-4 w-4 animate-spin" />
              ) : (
                <Save className="h-4 w-4" />
              )}
              Save Progress
            </Button>

            <Button
              variant="destructive"
              size="lg"
              onClick={handleClearAll}
              className="gap-2"
            >
              <Trash2 className="h-4 w-4" />
              Clear All
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ResumeForm;