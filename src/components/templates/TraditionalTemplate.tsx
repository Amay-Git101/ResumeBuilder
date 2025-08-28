import { ResumeData } from "@/types/resume";
import { Mail, Phone, MapPin, Linkedin } from 'lucide-react';

interface Props {
  data: ResumeData;
}

export const TraditionalTemplate: React.FC<Props> = ({ data }) => {
  const { personalInfo, education, workExperience, skills, achievements } = data;

  const Section: React.FC<{ title: string; children: React.ReactNode; className?: string }> = ({ title, children, className }) => (
    <section className={className}>
      <h2 className="text-lg font-semibold uppercase tracking-wider text-gray-700 border-b border-gray-300 pb-1 mb-3">{title}</h2>
      {children}
    </section>
  );

  return (
    <div className="bg-white text-gray-800 p-8 font-sans text-sm min-h-[1123px]">
      <div className="grid grid-cols-3 gap-8">
        {/* Left Column (Main Content) */}
        <div className="col-span-2">
          <header className="mb-8">
            <h1 className="text-4xl font-bold text-gray-800">{personalInfo.fullName}</h1>
            <p className="text-xl text-gray-600">Human Resource Intern</p>
          </header>

          {workExperience.length > 0 && (
            <Section title="Work Experience" className="mb-6">
              <div className="space-y-4">
                {workExperience.map(exp => (
                  <div key={exp.id}>
                    <h3 className="text-md font-bold">{exp.position}</h3>
                    <div className="flex justify-between text-xs text-gray-600 mb-1">
                      <span>{exp.company}</span>
                      <span>{exp.startDate} - {exp.current ? 'Present' : exp.endDate} | {exp.location}</span>
                    </div>
                    <ul className="list-disc list-inside text-xs space-y-1 text-gray-700">
                       {exp.description.split('\n').map((item, index) => item && <li key={index}>{item.replace('•','').trim()}</li>)}
                    </ul>
                  </div>
                ))}
              </div>
            </Section>
          )}
        </div>

        {/* Right Column (Sidebar) */}
        <div className="col-span-1">
          <div className="space-y-2 text-xs text-gray-700 mb-6">
            {personalInfo.email && <div className="flex items-center gap-2"><Mail size={12} /> {personalInfo.email}</div>}
            {personalInfo.phone && <div className="flex items-center gap-2"><Phone size={12} /> {personalInfo.phone}</div>}
            {personalInfo.location && <div className="flex items-center gap-2"><MapPin size={12} /> {personalInfo.location}</div>}
            {personalInfo.linkedin && <div className="flex items-center gap-2"><Linkedin size={12} /> {personalInfo.linkedin}</div>}
          </div>

          <Section title="Objective" className="mb-6">
            <p className="text-xs text-gray-700">
                BBA undergraduate seeking a Human Resource internship, where I can bring my knowledge in the best DEI practices and ability to lead teams.
            </p>
          </Section>

          {education.length > 0 && (
            <Section title="Education" className="mb-6">
              <div className="space-y-2">
                {education.map(edu => (
                  <div key={edu.id}>
                    <h3 className="text-sm font-bold">{edu.degree}</h3>
                    <p className="text-xs text-gray-700">{edu.institution}</p>
                    <p className="text-xs text-gray-600">{edu.startDate} - {edu.endDate}</p>
                  </div>
                ))}
              </div>
            </Section>
          )}

          {skills.length > 0 && (
            <Section title="Skills" className="mb-6">
              <ul className="list-disc list-inside text-xs space-y-1 text-gray-700">
                {skills.map(skill => (
                  <li key={skill.id}>{skill.name}</li>
                ))}
              </ul>
            </Section>
          )}
           {achievements.length > 0 && (
            <Section title="Certs" className="mb-6">
              <ul className="text-xs space-y-1 text-gray-700">
                {achievements.map(ach => (
                  <li key={ach.id} className="font-semibold">{ach.title}</li>
                ))}
              </ul>
            </Section>
          )}
        </div>
      </div>
    </div>
  );
};