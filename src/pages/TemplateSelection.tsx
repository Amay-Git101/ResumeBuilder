import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { useResumeData } from "@/hooks/useResumeData";
import { ArrowLeft, Check, FileText } from "lucide-react";
import {
  MinimalistPreview,
  ModernPreview,
  TraditionalPreview,
  CreativePreview
} from "@/components/TemplatePreviews";

const templates = [
  {
    id: "minimalist",
    name: "Minimalist",
    description: "Clean and simple design perfect for any industry.",
    component: MinimalistPreview,
    tags: ["Clean typography", "Plenty of white space", "ATS-friendly"]
  },
  {
    id: "modern",
    name: "Modern",
    description: "Contemporary design with subtle colors and modern styling.",
    component: ModernPreview,
    tags: ["Modern styling", "Color accents", "Professional layout"]
  },
  {
    id: "traditional",
    name: "Traditional",
    description: "Classic professional format trusted by recruiters.",
    component: TraditionalPreview,
    tags: ["Time-tested format", "Conservative design", "Widely accepted"]
  },
  {
    id: "creative",
    name: "Creative",
    description: "Stand out with unique design elements and creative flair.",
    component: CreativePreview,
    tags: ["Creative elements", "Eye-catching design", "Perfect for creative roles"]
  }
];

const TemplateSelection = () => {
  const navigate = useNavigate();
  const { resumeData, updateSelectedTemplate } = useResumeData();
  const [selectedTemplate, setSelectedTemplate] = useState(resumeData.selectedTemplate);

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
  };

  const handleContinue = () => {
    if (selectedTemplate) {
      updateSelectedTemplate(selectedTemplate);
      navigate('/resume-form');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="px-6 py-4 border-b bg-card">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/')}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
              <FileText className="h-6 w-6 text-primary" />
              <span className="font-semibold">Resume Builder</span>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <Badge variant="outline">Step 1 of 2</Badge>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-6 py-8">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Choose Your Resume Template</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Select a professional template that matches your style and industry.
              You can always change it later.
            </p>
          </div>

          {/* Template Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {templates.map((template) => {
              const TemplateComponent = template.component;
              const isSelected = selectedTemplate === template.id;
              return (
                <div
                  key={template.id}
                  className="cursor-pointer group"
                  onClick={() => handleTemplateSelect(template.id)}
                >
                  <Card className={`overflow-hidden transition-all duration-300 ${isSelected ? 'ring-2 ring-primary' : 'hover:shadow-large'}`}>
                    <CardHeader className="p-0">
                      <div className="aspect-[3/4] bg-gray-100 flex items-center justify-center relative overflow-hidden border-b group-hover:opacity-90 transition-opacity">
                        <TemplateComponent />
                        {isSelected && (
                          <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                            <div className="bg-white rounded-full p-2 shadow-lg">
                              <Check className="h-6 w-6 text-primary" />
                            </div>
                          </div>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="p-4">
                      <CardTitle className="text-lg mb-2">{template.name}</CardTitle>
                      <p className="text-muted-foreground text-sm mb-4 h-12">
                        {template.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {template.tags.map(tag => (
                          <Badge key={tag} variant="secondary">{tag}</Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )
            })}
          </div>

          {/* Continue Button */}
          <div className="text-center">
            <Button
              size="lg"
              onClick={handleContinue}
              disabled={!selectedTemplate}
              className="min-w-48"
            >
              Continue to Form
            </Button>

            {!selectedTemplate && (
              <p className="text-sm text-muted-foreground mt-2">
                Please select a template to continue
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default TemplateSelection;