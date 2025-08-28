import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useResumeData } from "@/hooks/useResumeData";
import { ArrowLeft, Download, Edit, FileText } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { pdf } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';

// Import all templates
import { 
  MinimalistTemplate, 
  CreativeTemplate,
  MinimalistTemplatePDF,
  CreativeTemplatePDF
} from "@/components/templates";

// Map for on-screen display
const templateMap: { [key: string]: React.FC<{ data: any }> } = {
  minimalist: MinimalistTemplate,
  creative: CreativeTemplate,
};

// Map for PDF generation
const templateMapPDF: { [key: string]: React.FC<{ data: any }> } = {
  minimalist: MinimalistTemplatePDF,
  creative: CreativeTemplatePDF,
};

const PreviewPage = () => {
  const navigate = useNavigate();
  const { resumeData } = useResumeData();
  const [isGenerating, setIsGenerating] = useState(false);

  // Component for on-screen preview
  const SelectedTemplate = templateMap[resumeData.selectedTemplate] || MinimalistTemplate;
  
  // Component for PDF generation
  const SelectedTemplatePDF = templateMapPDF[resumeData.selectedTemplate] || MinimalistTemplatePDF;

  const handleDownloadPDF = async () => {
    setIsGenerating(true);
    try {
      const blob = await pdf(<SelectedTemplatePDF data={resumeData} />).toBlob();
      saveAs(blob, `${resumeData.personalInfo.fullName || 'resume'}.pdf`);
      
      toast({
        title: "PDF Generated!",
        description: "Your resume has been downloaded successfully.",
      });
    } catch (error) {
      console.error("PDF Generation Error: ", error);
      toast({
        title: "Error",
        description: "Failed to generate PDF. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

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