import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { FileText, Download, Edit, Zap } from "lucide-react";
import { CreativePreview } from "@/components/TemplatePreviews";

const LandingPage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Edit className="h-6 w-6" />,
      title: "Easy Editing",
      description: "Intuitive form-based editing with real-time preview"
    },
    {
      icon: <FileText className="h-6 w-6" />,
      title: "Professional Templates",
      description: "Choose from modern, clean resume templates"
    },
    {
      icon: <Download className="h-6 w-6" />,
      title: "Instant Download",
      description: "Generate and download your resume as PDF instantly"
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Auto-Save",
      description: "Never lose your progress with automatic saving"
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="px-6 py-4 border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
            <FileText className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold text-foreground">Resume Builder</h1>
          </div>
          <Button
            variant="default"
            onClick={() => navigate('/templates')}
            className="hidden md:flex"
          >
            Get Started
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-6 py-12 md:py-20 text-center md:text-left relative overflow-hidden bg-gradient-subtle">
        <div className="absolute inset-0 z-0 opacity-30">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#0a0d0eff" strokeWidth="0.5"/>
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
        </div>
        <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">
          <div>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 font-serif leading-tight">
              Build Your <span className="text-primary">Professional</span> Resume
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-lg mx-auto md:mx-0">
              Choose a template, fill in your details, and generate a beautiful PDF resume in minutes.
              No design skills required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button
                variant="hero"
                size="xl"
                onClick={() => navigate('/templates')}
              >
                Get Started Free
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate('/templates')}
              >
                View Templates
              </Button>
            </div>
          </div>
          <div className="flex justify-center mt-8 md:mt-0">
            <Card className="p-4 shadow-large w-full max-w-xs md:max-w-sm rotate-3 transform transition-transform duration-300 hover:rotate-0 hover:scale-105">
              <div className="aspect-[3/4] bg-white rounded-md flex items-center justify-center border overflow-hidden">
                <CreativePreview />
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-16 bg-background">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Why Choose Our Resume Builder?</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Everything you need to create a standout resume that gets you noticed by recruiters and hiring managers.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-medium transition-transform duration-300 hover:-translate-y-1 border-border/50 bg-muted/30">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-4 text-primary">
                  {feature.icon}
                </div>
                <h4 className="font-semibold mb-2">{feature.title}</h4>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-16 bg-muted/30">
        <div className="container mx-auto max-w-4xl text-center">
          <Card className="p-8 bg-gradient-to-br from-primary to-primary-glow text-white border-0">
            <h3 className="text-3xl font-bold mb-4">Ready to Get Started?</h3>
            <p className="text-xl mb-6 opacity-90">
              Join thousands of job seekers who have built their perfect resume with us.
            </p>
            <Button
              variant="secondary"
              size="xl"
              onClick={() => navigate('/templates')}
              className="bg-white text-primary hover:bg-white/90"
            >
              Build Your Resume Now
            </Button>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;