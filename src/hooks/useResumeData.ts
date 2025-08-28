import { useState, useEffect, useMemo } from 'react';
import { ResumeData } from '@/types/resume';

const STORAGE_KEY = 'resume-builder-data';

export const sampleResumeData: ResumeData = {
  personalInfo: {
    fullName: 'Mark Griffin',
    email: 'markgriff91@email.com',
    phone: '(123) 456-7890',
    location: 'Chicago, IL',
    linkedin: 'linkedin.com/in/markgriffin',
    github: 'github.com/markgriffin',
    website: 'markgriffin.dev',
  },
  education: [
    {
      id: 'edu1',
      degree: 'Bachelor of Business Administration',
      institution: 'University of Illinois Chicago',
      startDate: 'Sep 2021',
      endDate: 'Present',
      description: 'Relevant Coursework: Human Resource Management, Organizational Behavior, Business Ethics, Labor Law, Compensation and Benefits.',
      gpa: '3.7/4.0',
    }
  ],
  workExperience: [
    {
      id: 'work1',
      company: 'Jugrnaut',
      location: 'Chicago, IL',
      position: 'Cashier',
      startDate: 'May 2023',
      endDate: 'Present',
      current: true,
      description: '• Processed an average of 32 customer transactions per day with 98% accuracy.\n• Upsold personalized accessories, resulting in a 4.1% increase in average cart value.\n• Fostered an inclusive work environment by engaging in 9+ team morale-building activities.\n• Handled all in-store return requests, resolving 86% of all returns within one day.',
    },
    {
        id: 'work3',
        company: 'University of Illinois',
        location: 'Chicago, IL',
        position: 'HR Research Assistant',
        startDate: 'Dec 2022',
        endDate: 'May 2023',
        current: false,
        description: '• Led a team of 6 students in a detailed study on HR practices, understanding key employee satisfaction drivers.\n• Used MS Office to create visual reports of the group\'s findings, presenting information to a classroom of 27 undergraduates.\n• Analyzed survey results to identify the latest trends in employee satisfaction.'
    },
    {
      id: 'work2',
      company: 'Campus Entrepreneurship Fair',
      location: 'Hyde Park, Chicago',
      position: 'Organizer',
      startDate: 'Aug 2022',
      endDate: 'Sep 2022',
      current: false,
      description: '• Organized a campus-wide fair, facilitating 42 student business presentations to 19 investors.\n• Designed an efficient workflow for the marketing team, attracting 21% more visitors than previous years.\n• Delegated and tracked 17 volunteer tasks using Asana, ensuring all tasks were completed on time.',
    }
  ],
  projects: [
      {
          id: 'proj1',
          title: 'HR Policy Handbook Analysis',
          description: 'Conducted a comprehensive review and update of a mock company\'s HR policy handbook. Identified 15 outdated policies and proposed revisions to align with current labor laws and best practices for diversity, equity, and inclusion (DEI).',
          techStack: ['Microsoft Word', 'Excel', 'LexisNexis'],
      }
  ],
  skills: [
    { id: 'skill1', name: 'Performance Management', category: 'technical', level: 'advanced' },
    { id: 'skill2', name: 'MS Office Suite', category: 'technical', level: 'expert' },
    { id: 'skill3', name: 'Asana', category: 'technical', level: 'intermediate' },
    { id: 'skill9', name: 'BambooHR', category: 'technical', level: 'beginner' },
    { id: 'skill4', name: 'Discretion and Ethical Judgment', category: 'soft', level: 'expert' },
    { id: 'skill5', name: 'Leadership', category: 'soft', level: 'advanced' },
    { id: 'skill7', name: 'Conflict Resolution', category: 'soft', level: 'advanced' },
    { id: 'skill8', name: 'Communication', category: 'soft', level: 'expert' },
    { id: 'skill6', name: 'English', category: 'language', level: 'expert' },
  ],
  achievements: [
    {
      id: 'ach1',
      title: 'SHRM Certified Professional (SHRM-CP)',
      date: '2023',
      issuer: 'SHRM',
      description: 'Credential recognizing expertise in HR policies and practices.'
    },
    {
        id: 'ach2',
        title: 'Dean\'s List',
        date: '2022-2023',
        issuer: 'University of Illinois Chicago',
        description: 'Awarded for achieving a GPA of 3.5 or higher for the academic year.'
    }
  ],
  selectedTemplate: 'traditional',
};

const emptyResumeData: ResumeData = {
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
  const [resumeData, setResumeData] = useState<ResumeData>(emptyResumeData);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = () => {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsedData = JSON.parse(stored);
          setResumeData(parsedData);
        } else {
          setResumeData(emptyResumeData);
        }
      } catch (error) {
        console.error('Error loading resume data:', error);
        setResumeData(emptyResumeData);
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
    setResumeData(emptyResumeData);
  };
  
  const fillSampleData = () => {
    saveData(sampleResumeData);
  };

  const getCompletionPercentage = () => {
    let completed = 0;
    let total = 0;

    const requiredPersonalFields = ['fullName', 'email', 'phone'];
    requiredPersonalFields.forEach(field => {
      total++;
      if (resumeData.personalInfo[field as keyof typeof resumeData.personalInfo]) {
        completed++;
      }
    });

    total++;
    if (resumeData.selectedTemplate) completed++;

    total += 4; // education, work, projects, skills
    if (resumeData.education.length > 0) completed++;
    if (resumeData.workExperience.length > 0) completed++;
    if (resumeData.projects.length > 0) completed++;
    if (resumeData.skills.length > 0) completed++;
    
    if (total === 0) return 0;
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
    fillSampleData,
    getCompletionPercentage,
  };
}