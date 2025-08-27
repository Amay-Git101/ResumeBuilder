import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useResumeData } from "@/hooks/useResumeData";
import { Achievement } from "@/types/resume";
import { Plus, Trash2, Award } from "lucide-react";

export const AchievementsForm = () => {
  const { resumeData, updateAchievements } = useResumeData();
  const { achievements } = resumeData;

  const addAchievement = () => {
    const newAchievement: Achievement = {
      id: Date.now().toString(),
      title: '',
      description: '',
      date: '',
      issuer: ''
    };
    updateAchievements([...achievements, newAchievement]);
  };

  const removeAchievement = (id: string) => {
    updateAchievements(achievements.filter(achievement => achievement.id !== id));
  };

  const updateAchievementItem = (id: string, field: string, value: string) => {
    updateAchievements(achievements.map(achievement => 
      achievement.id === id ? { ...achievement, [field]: value } : achievement
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-muted-foreground">
          Highlight your certifications, awards, honors, and other notable achievements.
        </p>
        <Button onClick={addAchievement} size="sm" className="gap-2">
          <Plus className="h-4 w-4" />
          Add Achievement
        </Button>
      </div>

      {achievements.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Award className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground text-center mb-4">
              No achievements yet. Add your certifications, awards, and accomplishments.
            </p>
            <Button onClick={addAchievement} className="gap-2">
              <Plus className="h-4 w-4" />
              Add Achievement
            </Button>
          </CardContent>
        </Card>
      ) : (
        achievements.map((achievement, index) => (
          <Card key={achievement.id} className="relative">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Achievement #{index + 1}</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeAchievement(achievement.id)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Title/Name</Label>
                  <Input
                    placeholder="AWS Certified Solutions Architect"
                    value={achievement.title}
                    onChange={(e) => updateAchievementItem(achievement.id, 'title', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">Issuing Organization</Label>
                  <Input
                    placeholder="Amazon Web Services"
                    value={achievement.issuer}
                    onChange={(e) => updateAchievementItem(achievement.id, 'issuer', e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Date Achieved</Label>
                  <Input
                    placeholder="March 2023"
                    value={achievement.date}
                    onChange={(e) => updateAchievementItem(achievement.id, 'date', e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Description (Optional)</Label>
                <Textarea
                  placeholder="Brief description of the achievement, its significance, or any relevant details..."
                  value={achievement.description}
                  onChange={(e) => updateAchievementItem(achievement.id, 'description', e.target.value)}
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