import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useResumeData } from "@/hooks/useResumeData";
import { ArrowLeft, Download, Edit, FileText } from "lucide-react";
import { toast } from "@/hooks/use-toast";

// Import the new template components
import { MinimalistTemplate } from "@/components/templates/MinimalistTemplate";
import { ModernTemplate } from "@/components/templates/ModernTemplate";
import { TraditionalTemplate } from "@/components/templates/TraditionalTemplate";
import { CreativeTemplate } from "@/components/templates/CreativeTemplate";

const templateMap: { [key: string]: React.FC<{ data: any }> } = {
  minimalist: MinimalistTemplate,
  modern: ModernTemplate,
  traditional: TraditionalTemplate,
  creative: CreativeTemplate,
};

const PreviewPage = () => {
  const navigate = useNavigate();
  const { resumeData } = useResumeData();
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownloadPDF = async () => {
    setIsGenerating(true);
    toast({
      title: "PDF Generation",
      description: "This feature is coming soon! For now, you can use your browser's print function (Ctrl/Cmd + P) to save as PDF.",
    });
    // In a real implementation, you would use a library like @react-pdf/renderer
    // to generate the PDF from the selected template component.
    setTimeout(() => setIsGenerating(false), 2000);
  };

  const SelectedTemplate = templateMap[resumeData.selectedTemplate] || MinimalistTemplate; // Fallback to Minimalist

  return (
    <div className="min-h-screen bg-muted/40">
      {/* Header */}
      <header className="sticky top-0 z-50 px-6 py-4 border-b bg-card/95 backdrop-blur-sm">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/resume-form')}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Edit
            </Button>
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
              <FileText className="h-6 w-6 text-primary" />
              <span className="font-semibold">Resume Preview</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={() => navigate('/resume-form')}
              className="gap-2"
            >
              <Edit className="h-4 w-4" />
              Edit Resume
            </Button>

            <Button
              onClick={handleDownloadPDF}
              disabled={isGenerating}
              className="gap-2"
            >
              {isGenerating ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                  Generating...
                </>
              ) : (
                <>
                  <Download className="h-4 w-4" />
                  Download PDF
                </>
              )}
            </Button>
          </div>
        </div>
      </header>

      {/* Preview Content */}
      <main className="px-6 py-8">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-white shadow-large rounded-lg overflow-hidden">
            {/* The selected template component is rendered here */}
            <SelectedTemplate data={resumeData} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default PreviewPage;