# 📄 Resume Builder

A modern, web-based resume builder that helps you create professional resumes with ease. Built with **React, Vite, TypeScript, and Tailwind CSS**.

🔗 **Live Demo**: [https://robust-resume-builder.vercel.app/](#)

---

## 📊 Repository Info

- **Repository**: [amay-git101/resumebuilder](https://github.com/amay-git101/resumebuilder)  
- **Latest Commit**: `6f0ce473ac5912e1d6b6dd55f4ea546fd9f0c2be`  
- **Files Analyzed**: 90  
- **Estimated Tokens**: ~68.8k  

---

## ✨ Features

- **Professional Templates** – Minimalist & Creative resume styles ready to use.  
- **Dynamic Forms** – Fill out personal info, education, skills, work experience, and more.  
- **Real-Time Preview** – See changes instantly while editing.  
- **Client-Side PDF Export** – Download resumes directly from your browser.  
- **Auto-Save** – Data persists locally, so your progress is never lost.  
- **Responsive UI** – Works seamlessly across devices.  

---


## 📸 Screenshots

### Landing Page  
![Landing Page 1](Screenshots/landing_1.png)  
![Landing Page 2](Screenshots/landing_2.png)

### Template Selection  
![Template Selection](Screenshots/templates.png)

### Resume Form  
![Resume Form](Screenshots/form.png)

### Final Resume Preview  
![Final Resume Preview](Screenshots/preview.png)


---

## ⚙️ Workflow Overview
```
graph TD
    A[User Input] --> B[Form Components]
    B --> C[Resume Data State]
    C --> D[Templates]
    D --> E[PDF Generator]
    E --> F[Download Resume]

amay-git101-resumebuilder/
├── README.md
├── components.json
├── eslint.config.js
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.ts
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
├── public/
│   └── robots.txt
└── src/
    ├── App.css
    ├── App.tsx
    ├── index.css
    ├── main.tsx
    ├── vite-env.d.ts
    ├── components/
    │   ├── TemplatePreviews.tsx
    │   ├── forms/
    │   │   ├── AchievementsForm.tsx
    │   │   ├── CareerObjectiveForm.tsx
    │   │   ├── EducationForm.tsx
    │   │   ├── PersonalInfoForm.tsx
    │   │   ├── ProjectsForm.tsx
    │   │   ├── SkillsForm.tsx
    │   │   └── WorkExperienceForm.tsx
    │   ├── templates/
    │   │   ├── CreativeTemplate.tsx
    │   │   ├── CreativeTemplatePDF.tsx
    │   │   ├── index.ts
    │   │   ├── MinimalistTemplate.tsx
    │   │   └── MinimalistTemplatePDF.tsx
    │   └── ui/  (Reusable UI components like buttons, dialogs, forms, etc.)
    ├── hooks/
    │   ├── use-mobile.tsx
    │   ├── use-toast.ts
    │   └── useResumeData.ts
    ├── lib/
    │   └── utils.ts
    ├── pages/
    │   ├── Index.tsx
    │   ├── LandingPage.tsx
    │   ├── NotFound.tsx
    │   ├── PreviewPage.tsx
    │   ├── ResumeForm.tsx
    │   └── TemplateSelection.tsx
    └── types/
        └── resume.ts
```
