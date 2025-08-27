import { useState, useEffect } from 'react';
import { ResumeData } from '@/types/resume';

const STORAGE_KEY = 'resume-builder-data';

const defaultResumeData: ResumeData = {
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    github: '',
    website: '',
  },
  education: [],
  workExperience: [],
  projects: [],
  skills: [],
  achievements: [],
  selectedTemplate: '',
};

export function useResumeData() {
  const [resumeData, setResumeData] = useState<ResumeData>(defaultResumeData);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = () => {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsedData = JSON.parse(stored);
          setResumeData(parsedData);
        }
      } catch (error) {
        console.error('Error loading resume data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const saveData = (data: ResumeData) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      setResumeData(data);
    } catch (error) {
      console.error('Error saving resume data:', error);
    }
  };

  const updatePersonalInfo = (personalInfo: ResumeData['personalInfo']) => {
    const updatedData = { ...resumeData, personalInfo };
    saveData(updatedData);
  };

  const updateEducation = (education: ResumeData['education']) => {
    const updatedData = { ...resumeData, education };
    saveData(updatedData);
  };

  const updateWorkExperience = (workExperience: ResumeData['workExperience']) => {
    const updatedData = { ...resumeData, workExperience };
    saveData(updatedData);
  };

  const updateProjects = (projects: ResumeData['projects']) => {
    const updatedData = { ...resumeData, projects };
    saveData(updatedData);
  };

  const updateSkills = (skills: ResumeData['skills']) => {
    const updatedData = { ...resumeData, skills };
    saveData(updatedData);
  };

  const updateAchievements = (achievements: ResumeData['achievements']) => {
    const updatedData = { ...resumeData, achievements };
    saveData(updatedData);
  };

  const updateSelectedTemplate = (templateId: string) => {
    const updatedData = { ...resumeData, selectedTemplate: templateId };
    saveData(updatedData);
  };

  const clearData = () => {
    localStorage.removeItem(STORAGE_KEY);
    setResumeData(defaultResumeData);
  };

  const getCompletionPercentage = () => {
    let completed = 0;
    let total = 0;

    // Personal info (required fields)
    const requiredPersonalFields = ['fullName', 'email', 'phone'];
    requiredPersonalFields.forEach(field => {
      total++;
      if (resumeData.personalInfo[field as keyof typeof resumeData.personalInfo]) {
        completed++;
      }
    });

    // Template selection
    total++;
    if (resumeData.selectedTemplate) completed++;

    // Sections with data
    total += 4; // education, work, projects, skills
    if (resumeData.education.length > 0) completed++;
    if (resumeData.workExperience.length > 0) completed++;
    if (resumeData.projects.length > 0) completed++;
    if (resumeData.skills.length > 0) completed++;

    return Math.round((completed / total) * 100);
  };

  return {
    resumeData,
    isLoading,
    updatePersonalInfo,
    updateEducation,
    updateWorkExperience,
    updateProjects,
    updateSkills,
    updateAchievements,
    updateSelectedTemplate,
    clearData,
    getCompletionPercentage,
  };
}