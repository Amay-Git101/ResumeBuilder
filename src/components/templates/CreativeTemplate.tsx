import { ResumeData } from "@/types/resume";
import { Mail, Phone, MapPin, Linkedin } from 'lucide-react';

interface Props {
  data: ResumeData;
}

export const CreativeTemplate: React.FC<Props> = ({ data }) => {
  const { personalInfo, education, workExperience, skills, achievements } = data;

  const SidebarSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <section>
      <h2 className="text-lg font-semibold uppercase tracking-wider text-gray-800 pb-1 mb-2">{title}</h2>
      <div className="text-sm text-gray-700 space-y-1">{children}</div>
    </section>
  );

  return (
    <div className="bg-white flex font-sans min-h-[1123px]">
      {/* Sidebar */}
      <aside className="w-1/3 bg-yellow-400 p-8 text-gray-900 flex flex-col">
        <div className="text-center mb-8">
            <div className="w-24 h-24 bg-gray-800 rounded-full mx-auto mb-4"></div>
            <h1 className="text-3xl font-bold">{personalInfo.fullName}</h1>
            <p className="text-md">HR Intern</p>
        </div>
        <div className="space-y-6 text-sm">
            <SidebarSection title="Contact">
                {personalInfo.phone && <p className="break-all">{personalInfo.phone}</p>}
                {personalInfo.email && <p className="break-all">{personalInfo.email}</p>}
                {personalInfo.location && <p>{personalInfo.location}</p>}
                {personalInfo.linkedin && <p className="break-all">{personalInfo.linkedin}</p>}
            </SidebarSection>
            {education.length > 0 && (
                <SidebarSection title="Education">
                    {education.map(edu => (
                        <div key={edu.id} className="mb-2">
                            <h3 className="font-bold">{edu.degree}</h3>
                            <p>{edu.institution}</p>
                            <p className="text-xs">{edu.startDate} - {edu.endDate}</p>
                        </div>
                    ))}
                </SidebarSection>
            )}
            {skills.filter(s => s.category === 'soft').length > 0 && (
                <SidebarSection title="Soft Skills">
                     <ul className="list-disc list-inside">
                        {skills.filter(s => s.category === 'soft').map(skill => <li key={skill.id}>{skill.name}</li>)}
                    </ul>
                </SidebarSection>
            )}
        </div>
      </aside>

      {/* Main Content */}
      <main className="w-2/3 p-8 flex-grow flex flex-col">
        <section className="mb-6">
          <h2 className="text-2xl font-bold uppercase text-gray-700 border-b-2 border-yellow-400 pb-2 mb-4">Career Objective</h2>
          <p className="text-sm text-gray-600">
            Seeking a Human Resource internship where I can bring my knowledge in the best DEI practices and ability to lead teams. Eager to contribute to strategic talent development efforts.
          </p>
        </section>

        {workExperience.length > 0 && (
          <section className="mb-6">
            <h2 className="text-2xl font-bold uppercase text-gray-700 border-b-2 border-yellow-400 pb-2 mb-4">Work Experience</h2>
            <div className="space-y-4">
              {workExperience.map(exp => (
                <div key={exp.id}>
                  <h3 className="text-lg font-bold">{exp.position}</h3>
                  <div className="flex justify-between text-sm text-gray-500 mb-1">
                    <span>{exp.company}</span>
                    <span>{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</span>
                  </div>
                  <ul className="list-disc list-inside text-sm space-y-1 text-gray-700">
                    {exp.description.split('\n').map((item, index) => item && <li key={index}>{item.replace('•','').trim()}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}
         {skills.filter(s => s.category !== 'soft').length > 0 && (
            <section className="flex-grow">
                <h2 className="text-2xl font-bold uppercase text-gray-700 border-b-2 border-yellow-400 pb-2 mb-4">Professional Skills</h2>
                <div className="flex flex-wrap gap-2">
                    {skills.filter(s => s.category !== 'soft').map(skill => (
                        <span key={skill.id} className="bg-gray-200 text-gray-800 px-3 py-1 text-sm rounded-full">{skill.name}</span>
                    ))}
                </div>
            </section>
        )}
      </main>
    </div>
  );
};