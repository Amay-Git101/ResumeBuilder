import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useResumeData } from "@/hooks/useResumeData";
import { Skill } from "@/types/resume";
import { Target, X, Plus } from "lucide-react";

const skillCategories = [
  { value: 'technical', label: 'Technical Skills' },
  { value: 'soft', label: 'Soft Skills' },
  { value: 'language', label: 'Languages' }
];

const skillLevels = [
  { value: 'beginner', label: 'Beginner' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'advanced', label: 'Advanced' },
  { value: 'expert', label: 'Expert' }
];

export const SkillsForm = () => {
  const { resumeData, updateSkills } = useResumeData();
  const { skills } = resumeData;
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillCategory, setNewSkillCategory] = useState<'technical' | 'soft' | 'language'>('technical');
  const [newSkillLevel, setNewSkillLevel] = useState<'beginner' | 'intermediate' | 'advanced' | 'expert'>('intermediate');

  const addSkill = () => {
    if (!newSkillName.trim()) return;

    const newSkill: Skill = {
      id: Date.now().toString(),
      name: newSkillName.trim(),
      category: newSkillCategory,
      level: newSkillLevel
    };

    updateSkills([...skills, newSkill]);
    setNewSkillName('');
  };

  const removeSkill = (id: string) => {
    updateSkills(skills.filter(skill => skill.id !== id));
  };

  const getSkillsByCategory = (category: 'technical' | 'soft' | 'language') => {
    return skills.filter(skill => skill.category === category);
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'intermediate': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'advanced': return 'bg-green-100 text-green-800 border-green-200';
      case 'expert': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      <p className="text-muted-foreground">
        Add your technical skills, soft skills, and language proficiencies to showcase your capabilities.
      </p>

      {/* Add New Skill Form */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <div className="space-y-2">
              <Label className="text-sm font-medium">Skill Name</Label>
              <Input
                placeholder="e.g., JavaScript, Leadership"
                value={newSkillName}
                onChange={(e) => setNewSkillName(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addSkill();
                  }
                }}
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Category</Label>
              <Select value={newSkillCategory} onValueChange={(value: any) => setNewSkillCategory(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {skillCategories.map(category => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Level (Optional)</Label>
              <Select value={newSkillLevel} onValueChange={(value: any) => setNewSkillLevel(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {skillLevels.map(level => (
                    <SelectItem key={level.value} value={level.value}>
                      {level.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button 
              onClick={addSkill}
              disabled={!newSkillName.trim()}
              className="gap-2"
            >
              <Plus className="h-4 w-4" />
              Add Skill
            </Button>
          </div>
        </CardContent>
      </Card>

      {skills.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Target className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground text-center mb-4">
              No skills added yet. Start by adding your key technical and soft skills.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {/* Skills by Category */}
          {skillCategories.map(category => {
            const categorySkills = getSkillsByCategory(category.value as any);
            if (categorySkills.length === 0) return null;

            return (
              <Card key={category.value}>
                <CardContent className="pt-6">
                  <h3 className="font-medium text-sm mb-4 text-muted-foreground uppercase tracking-wide">
                    {category.label} ({categorySkills.length})
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {categorySkills.map(skill => (
                      <Badge
                        key={skill.id}
                        variant="outline"
                        className={`gap-2 ${skill.level ? getLevelColor(skill.level) : ''}`}
                      >
                        <span>{skill.name}</span>
                        {skill.level && (
                          <span className="text-xs opacity-75">
                            {skill.level}
                          </span>
                        )}
                        <button
                          onClick={() => removeSkill(skill.id)}
                          className="ml-1 hover:text-destructive"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};