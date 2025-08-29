# 📄 Resume Builder

A modern, web-based resume builder that helps you create professional resumes with ease. Built with **React, Vite, TypeScript, and Tailwind CSS**.

🔗 **Live Demo**: [Coming Soon](#)

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

👉 Add screenshots of your app in the `screenshots/` folder and link them here.  

### Landing Page  
![Landing Page](screenshots/landing.png)

### Template Selection  
![Template Selection](screenshots/templates.png)

### Resume Form  
![Resume Form](screenshots/form.png)

### Final Resume Preview  
![Final Resume Preview](screenshots/preview.png)

---

## ⚙️ Workflow Overview

```mermaid
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
