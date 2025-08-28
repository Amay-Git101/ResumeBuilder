import { useState, useEffect } from 'react';
import { ResumeData } from '@/types/resume';

const STORAGE_KEY = 'resume-builder-data';

const defaultResumeData: ResumeData = {
  personalInfo: {
    fullName: 'Ashley Taylor',
    email: 'ashley.taylor@email.com',
    phone: '(123) 456-7890',
    location: 'San Diego, CA',
    linkedin: 'linkedin.com/in/ashleytaylor',
    github: 'github.com/ashleytaylor',
    website: 'ashleytaylor.dev',
  },
  education: [
    {
      id: 'edu1',
      degree: 'M.S. in Computer Science',
      institution: 'San Diego State University',
      startDate: 'Feb 2016',
      endDate: 'June 2018',
      description: '',
      gpa: '3.8',
    },
    {
      id: 'edu2',
      degree: 'B.S. in Computer Science',
      institution: 'National University',
      startDate: 'Aug 2011',
      endDate: 'May 2015',
      description: '',
      gpa: '3.5',
    }
  ],
  workExperience: [
    {
      id: 'work1',
      company: 'Illumina',
      location: 'San Diego, CA',
      position: 'Data Scientist',
      startDate: 'Mar 2021',
      endDate: 'Present',
      current: true,
      description: '• Pioneered the use of advanced segmentation in Google Analytics 4.\n• Conducted data analyses, uncovering business insights.\n• Introduced data-driven attribution to identify the most effective marketing campaigns.',
    },
    {
      id: 'work2',
      company: 'ServiceNow',
      location: 'San Diego, CA',
      position: 'Data Analyst',
      startDate: 'Jul 2019',
      endDate: 'Feb 2021',
      current: false,
      description: '• Integrated data from 6 sources within ServiceNow.\n• Used Google Analytics to track website traffic patterns for 3 clients.\n• Revamped existing data cleaning processes to support a machine learning project.',
    }
  ],
  projects: [
    {
      id: 'proj1',
      title: 'Customer Segmentation Analysis',
      description: 'Developed a machine learning model to segment customers based on purchasing behavior, leading to a 15% increase in targeted marketing campaign effectiveness.',
      techStack: ['Python', 'Scikit-learn', 'Pandas', 'Matplotlib'],
      link: 'project-demo.com',
      github: 'github.com/ashley/segmentation',
    }
  ],
  skills: [
    { id: 'skill1', name: 'Google Analytics 4', category: 'technical', level: 'expert' },
    { id: 'skill2', name: 'SQL', category: 'technical', level: 'advanced' },
    { id: 'skill3', name: 'Power BI', category: 'technical', level: 'advanced' },
    { id: 'skill4', name: 'Data Cleaning', category: 'technical', level: 'expert' },
    { id: 'skill5', name: 'Team Leadership', category: 'soft', level: 'advanced' },
    { id: 'skill6', name: 'English', category: 'language', level: 'expert' },
  ],
  achievements: [
    {
      id: 'ach1',
      title: 'Google Analytics Individual Qualification (GAIQ)',
      date: '2019',
      issuer: 'Google',
    },
    {
      id: 'ach2',
      title: 'First Prize in Google Analytics Hackathon',
      date: '2014',
      issuer: 'National University',
    }
  ],
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
        } else {
          setResumeData(defaultResumeData);
        }
      } catch (error) {
        console.error('Error loading resume data:', error);
        setResumeData(defaultResumeData);
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