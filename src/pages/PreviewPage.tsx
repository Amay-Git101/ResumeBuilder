import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { useResumeData } from "@/hooks/useResumeData";
import { ArrowLeft, Download, Edit, FileText, Mail, Phone, MapPin, Globe, Github, Linkedin } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const PreviewPage = () => {
  const navigate = useNavigate();
  const { resumeData } = useResumeData();
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownloadPDF = async () => {
    setIsGenerating(true);
    try {
      // Simulate PDF generation
      await new Promise(resolve => setTimeout(resolve, 2000));

      // In a real implementation, you would use @react-pdf/renderer or similar
      toast({
        title: "PDF Generated!",
        description: "Your resume has been downloaded successfully.",
      });

      // Create a dummy download link for demo purposes
      const link = document.createElement('a');
      link.download = `${resumeData.personalInfo.fullName || 'resume'}.pdf`;
      link.href = '#'; // Would be a real PDF blob URL
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate PDF. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const { personalInfo, education, workExperience, projects, skills, achievements } = resumeData;

  return (
    <div className="min-h-screen bg-background">
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
            {/* Resume Template Preview */}
            <div className="p-8">
              {/* Header Section */}
              <div className="text-center mb-8 pb-6 border-b border-gray-200">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {personalInfo.fullName || 'Your Name'}
                </h1>

                <div className="flex flex-wrap justify-center gap-4 text-gray-600">
                  {personalInfo.email && (
                    <div className="flex items-center gap-1">
                      <Mail className="h-4 w-4" />
                      {personalInfo.email}
                    </div>
                  )}
                  {personalInfo.phone && (
                    <div className="flex items-center gap-1">
                      <Phone className="h-4 w-4" />
                      {personalInfo.phone}
                    </div>
                  )}
                  {personalInfo.location && (
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {personalInfo.location}
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap justify-center gap-4 mt-2 text-sm text-gray-500">
                  {personalInfo.linkedin && (
                    <div className="flex items-center gap-1">
                      <Linkedin className="h-4 w-4" />
                      {personalInfo.linkedin}
                    </div>
                  )}
                  {personalInfo.github && (
                    <div className="flex items-center gap-1">
                      <Github className="h-4 w-4" />
                      {personalInfo.github}
                    </div>
                  )}
                  {personalInfo.website && (
                    <div className="flex items-center gap-1">
                      <Globe className="h-4 w-4" />
                      {personalInfo.website}
                    </div>
                  )}
                </div>
              </div>

              {/* Work Experience */}
              {workExperience.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Work Experience</h2>
                  <div className="space-y-4">
                    {workExperience.map(exp => (
                      <div key={exp.id}>
                        <div className="flex justify-between items-start mb-1">
                          <h3 className="font-semibold text-gray-900">{exp.position}</h3>
                          <span className="text-sm text-gray-600">
                            {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                          </span>
                        </div>
                        <p className="font-medium text-gray-700 mb-2">{exp.company}</p>
                        {exp.description && (
                          <div className="text-gray-600 text-sm whitespace-pre-line">
                            {exp.description}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Education */}
              {education.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Education</h2>
                  <div className="space-y-4">
                    {education.map(edu => (
                      <div key={edu.id}>
                        <div className="flex justify-between items-start mb-1">
                          <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                          <span className="text-sm text-gray-600">
                            {edu.startDate} - {edu.endDate}
                          </span>
                        </div>
                        <p className="font-medium text-gray-700 mb-1">{edu.institution}</p>
                        {edu.gpa && (
                          <p className="text-sm text-gray-600 mb-1">GPA: {edu.gpa}</p>
                        )}
                        {edu.description && (
                          <p className="text-gray-600 text-sm">{edu.description}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Projects */}
              {projects.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Projects</h2>
                  <div className="space-y-4">
                    {projects.map(project => (
                      <div key={project.id}>
                        <h3 className="font-semibold text-gray-900 mb-1">{project.title}</h3>
                        {project.techStack.length > 0 && (
                          <div className="flex flex-wrap gap-1 mb-2">
                            {project.techStack.map((tech, index) => (
                              <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                                {tech}
                              </span>
                            ))}
                          </div>
                        )}
                        <p className="text-gray-600 text-sm mb-2">{project.description}</p>
                        <div className="flex gap-4 text-xs text-gray-500">
                          {project.link && <span>Demo: {project.link}</span>}
                          {project.github && <span>Code: {project.github}</span>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Skills */}
              {skills.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Skills</h2>
                  <div className="space-y-3">
                    {['technical', 'soft', 'language'].map(category => {
                      const categorySkills = skills.filter(skill => skill.category === category);
                      if (categorySkills.length === 0) return null;

                      return (
                        <div key={category}>
                          <h3 className="font-medium text-gray-800 text-sm mb-2 capitalize">
                            {category === 'technical' ? 'Technical Skills' :
                             category === 'soft' ? 'Soft Skills' : 'Languages'}
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {categorySkills.map(skill => (
                              <span key={skill.id} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                                {skill.name}
                                {skill.level && ` (${skill.level})`}
                              </span>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Achievements */}
              {achievements.length > 0 && (
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Achievements & Certifications</h2>
                  <div className="space-y-3">
                    {achievements.map(achievement => (
                      <div key={achievement.id}>
                        <div className="flex justify-between items-start mb-1">
                          <h3 className="font-semibold text-gray-900">{achievement.title}</h3>
                          <span className="text-sm text-gray-600">{achievement.date}</span>
                        </div>
                        {achievement.issuer && (
                          <p className="font-medium text-gray-700 text-sm mb-1">{achievement.issuer}</p>
                        )}
                        {achievement.description && (
                          <p className="text-gray-600 text-sm">{achievement.description}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 text-center">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={handleDownloadPDF}
                disabled={isGenerating}
                className="gap-2 min-w-48"
              >
                {isGenerating ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                    Generating PDF...
                  </>
                ) : (
                  <>
                    <Download className="h-4 w-4" />
                    Download Resume
                  </>
                )}
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate('/resume-form')}
                className="gap-2"
              >
                <Edit className="h-4 w-4" />
                Continue Editing
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PreviewPage;