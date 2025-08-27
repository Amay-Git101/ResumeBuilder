import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useResumeData } from "@/hooks/useResumeData";

export const PersonalInfoForm = () => {
  const { resumeData, updatePersonalInfo } = useResumeData();
  const { personalInfo } = resumeData;

  const handleChange = (field: string, value: string) => {
    updatePersonalInfo({
      ...personalInfo,
      [field]: value
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-2">
        <Label htmlFor="fullName" className="text-sm font-medium">
          Full Name <span className="text-destructive">*</span>
        </Label>
        <Input
          id="fullName"
          placeholder="John Doe"
          value={personalInfo.fullName}
          onChange={(e) => handleChange('fullName', e.target.value)}
          className="h-10"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email" className="text-sm font-medium">
          Email Address <span className="text-destructive">*</span>
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="john@example.com"
          value={personalInfo.email}
          onChange={(e) => handleChange('email', e.target.value)}
          className="h-10"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone" className="text-sm font-medium">
          Phone Number <span className="text-destructive">*</span>
        </Label>
        <Input
          id="phone"
          placeholder="+1 (555) 123-4567"
          value={personalInfo.phone}
          onChange={(e) => handleChange('phone', e.target.value)}
          className="h-10"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="location" className="text-sm font-medium">
          Location
        </Label>
        <Input
          id="location"
          placeholder="New York, NY"
          value={personalInfo.location}
          onChange={(e) => handleChange('location', e.target.value)}
          className="h-10"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="linkedin" className="text-sm font-medium">
          LinkedIn Profile
        </Label>
        <Input
          id="linkedin"
          placeholder="linkedin.com/in/johndoe"
          value={personalInfo.linkedin}
          onChange={(e) => handleChange('linkedin', e.target.value)}
          className="h-10"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="github" className="text-sm font-medium">
          GitHub Profile
        </Label>
        <Input
          id="github"
          placeholder="github.com/johndoe"
          value={personalInfo.github}
          onChange={(e) => handleChange('github', e.target.value)}
          className="h-10"
        />
      </div>

      <div className="space-y-2 md:col-span-2">
        <Label htmlFor="website" className="text-sm font-medium">
          Personal Website
        </Label>
        <Input
          id="website"
          placeholder="www.johndoe.com"
          value={personalInfo.website}
          onChange={(e) => handleChange('website', e.target.value)}
          className="h-10"
        />
      </div>
    </div>
  );
};