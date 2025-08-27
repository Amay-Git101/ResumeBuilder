import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useResumeData } from "@/hooks/useResumeData";
import { Project } from "@/types/resume";
import { Plus, Trash2, Code, X } from "lucide-react";

export const ProjectsForm = () => {
  const { resumeData, updateProjects } = useResumeData();
  const { projects } = resumeData;
  const [newTechInput, setNewTechInput] = useState<{ [key: string]: string }>({});

  const addProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      title: '',
      description: '',
      techStack: [],
      link: '',
      github: '',
      startDate: '',
      endDate: ''
    };
    updateProjects([...projects, newProject]);
  };

  const removeProject = (id: string) => {
    updateProjects(projects.filter(project => project.id !== id));
  };

  const updateProjectItem = (id: string, field: string, value: string) => {
    updateProjects(projects.map(project => 
      project.id === id ? { ...project, [field]: value } : project
    ));
  };

  const addTechToProject = (projectId: string, tech: string) => {
    if (!tech.trim()) return;
    
    const updatedProjects = projects.map(project => 
      project.id === projectId 
        ? { ...project, techStack: [...project.techStack, tech.trim()] }
        : project
    );
    updateProjects(updatedProjects);
    setNewTechInput({ ...newTechInput, [projectId]: '' });
  };

  const removeTechFromProject = (projectId: string, techIndex: number) => {
    const updatedProjects = projects.map(project => 
      project.id === projectId 
        ? { ...project, techStack: project.techStack.filter((_, index) => index !== techIndex) }
        : project
    );
    updateProjects(updatedProjects);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-muted-foreground">
          Showcase your personal projects, open source contributions, and side work.
        </p>
        <Button onClick={addProject} size="sm" className="gap-2">
          <Plus className="h-4 w-4" />
          Add Project
        </Button>
      </div>

      {projects.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Code className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground text-center mb-4">
              No projects yet. Add your personal projects and portfolio pieces.
            </p>
            <Button onClick={addProject} className="gap-2">
              <Plus className="h-4 w-4" />
              Add Project
            </Button>
          </CardContent>
        </Card>
      ) : (
        projects.map((project, index) => (
          <Card key={project.id} className="relative">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Project #{index + 1}</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeProject(project.id)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Project Title</Label>
                  <Input
                    placeholder="E-commerce Website"
                    value={project.title}
                    onChange={(e) => updateProjectItem(project.id, 'title', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">Live Demo Link (Optional)</Label>
                  <Input
                    placeholder="https://myproject.com"
                    value={project.link}
                    onChange={(e) => updateProjectItem(project.id, 'link', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">GitHub Repository (Optional)</Label>
                  <Input
                    placeholder="https://github.com/username/project"
                    value={project.github}
                    onChange={(e) => updateProjectItem(project.id, 'github', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">Duration (Optional)</Label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Start"
                      value={project.startDate}
                      onChange={(e) => updateProjectItem(project.id, 'startDate', e.target.value)}
                      className="flex-1"
                    />
                    <Input
                      placeholder="End"
                      value={project.endDate}
                      onChange={(e) => updateProjectItem(project.id, 'endDate', e.target.value)}
                      className="flex-1"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Description</Label>
                <Textarea
                  placeholder="Describe your project, its purpose, key features, and your role in its development..."
                  value={project.description}
                  onChange={(e) => updateProjectItem(project.id, 'description', e.target.value)}
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Technologies Used</Label>
                
                {/* Tech Stack Tags */}
                {project.techStack.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-2">
                    {project.techStack.map((tech, techIndex) => (
                      <Badge key={techIndex} variant="secondary" className="gap-1">
                        {tech}
                        <button
                          onClick={() => removeTechFromProject(project.id, techIndex)}
                          className="ml-1 hover:text-destructive"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}

                {/* Add Tech Input */}
                <div className="flex gap-2">
                  <Input
                    placeholder="e.g., React, Node.js, MongoDB"
                    value={newTechInput[project.id] || ''}
                    onChange={(e) => setNewTechInput({ ...newTechInput, [project.id]: e.target.value })}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addTechToProject(project.id, newTechInput[project.id] || '');
                      }
                    }}
                  />
                  <Button
                    type="button"
                    size="sm"
                    onClick={() => addTechToProject(project.id, newTechInput[project.id] || '')}
                    disabled={!newTechInput[project.id]?.trim()}
                  >
                    Add
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Press Enter or click Add to include each technology.
                </p>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};