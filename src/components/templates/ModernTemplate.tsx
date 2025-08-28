import { ResumeData } from "@/types/resume";
import { Mail, Phone, MapPin, Linkedin } from 'lucide-react';

interface Props {
  data: ResumeData;
}

export const ModernTemplate: React.FC<Props> = ({ data }) => {
  const { personalInfo, education, workExperience, skills, achievements } = data;

  const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <section className="mb-6">
      <h2 className="text-sm font-bold uppercase tracking-widest text-gray-600 border-b-2 border-gray-200 pb-1 mb-3">{title}</h2>
      {children}
    </section>
  );

  return (
    <div className="bg-white text-gray-800 p-8 font-sans text-xs flex flex-col min-h-[1123px]">
      {/* Header */}
      <header className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-4xl font-bold text-gray-800">{personalInfo.fullName}</h1>
          <p className="text-lg text-blue-600 font-semibold">Business Intelligence Analyst</p>
        </div>
        <div className="text-right text-[10px] space-y-0.5">
            {personalInfo.email && <div className="flex items-center justify-end gap-1.5"><p>{personalInfo.email}</p> <Mail size={10} className="text-blue-600"/></div>}
            {personalInfo.phone && <div className="flex items-center justify-end gap-1.5"><p>{personalInfo.phone}</p> <Phone size={10} className="text-blue-600"/></div>}
            {personalInfo.location && <div className="flex items-center justify-end gap-1.5"><p>{personalInfo.location}</p> <MapPin size={10} className="text-blue-600"/></div>}
            {personalInfo.linkedin && <div className="flex items-center justify-end gap-1.5"><p>{personalInfo.linkedin}</p> <Linkedin size={10} className="text-blue-600"/></div>}
        </div>
      </header>
      
      {/* Objective */}
      <section className="mb-6">
        <p className="text-xs leading-relaxed">
          Seeking a challenging role as a business intelligence analyst, where I can apply my extensive background in data science. I aim to use advanced techniques to extract actionable insights from complex datasets and expedite decision-making.
        </p>
      </section>

      <div className="grid grid-cols-3 gap-8 flex-grow">
        {/* Main Content */}
        <div className="col-span-2">
          {workExperience.length > 0 && (
            <Section title="Work Experience">
              <div className="space-y-4">
                {workExperience.map(exp => (
                  <div key={exp.id}>
                    <p className="text-xs uppercase font-bold text-gray-500">{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</p>
                    <h3 className="text-sm font-bold">{exp.position} | {exp.company} | {exp.location}</h3>
                    <ul className="list-disc list-inside mt-1 text-xs space-y-1">
                       {exp.description.split('\n').map((item, index) => item && <li key={index}>{item.replace('•','').trim()}</li>)}
                    </ul>
                  </div>
                ))}
              </div>
            </Section>
          )}

          {achievements.length > 0 && (
            <Section title="Achievements">
               <div className="space-y-3">
                {achievements.map(ach => (
                  <div key={ach.id}>
                    <p className="text-xs uppercase font-bold text-gray-500">{ach.date}</p>
                    <h3 className="text-sm font-bold uppercase">{ach.title}</h3>
                    {ach.issuer && <p className="text-xs">{ach.issuer}</p>}
                  </div>
                ))}
              </div>
            </Section>
          )}
        </div>

        {/* Sidebar */}
        <div>
          {education.length > 0 && (
            <Section title="Education">
              <div className="space-y-3">
                {education.map(edu => (
                  <div key={edu.id}>
                    <h3 className="text-sm font-bold">{edu.degree}</h3>
                    <p className="text-xs font-semibold text-gray-600">{edu.institution}</p>
                    <p className="text-xs text-gray-500">{edu.startDate} - {edu.endDate}</p>
                  </div>
                ))}
              </div>
            </Section>
          )}

          {skills.length > 0 && (
            <Section title="Skills">
               <ul className="space-y-1">
                {skills.map(skill => (
                  <li key={skill.id} className="text-xs">{skill.name}</li>
                ))}
              </ul>
            </Section>
          )}
        </div>
      </div>
    </div>
  );
};