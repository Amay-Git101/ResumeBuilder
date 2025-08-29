import { ResumeData } from "@/types/resume";

interface Props {
  data: ResumeData;
}

const ensureUrlProtocol = (url: string) => {
  if (!url) return "";
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  return `https://${url}`;
};

export const CreativeTemplate: React.FC<Props> = ({ data }) => {
  const { personalInfo, education, workExperience, skills, projects, achievements } = data;

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
            <h1 className="text-3xl font-bold">{personalInfo?.fullName ?? "Your Name"}</h1>
            {personalInfo?.jobTitle && <p className="text-md">{personalInfo.jobTitle}</p>}
        </div>
        <div className="space-y-6 text-sm">
            <SidebarSection title="Contact">
                {personalInfo?.phone && <a href={`tel:${personalInfo.phone}`} className="break-all hover:underline">{personalInfo.phone}</a>}
                {personalInfo?.email && <a href={`mailto:${personalInfo.email}`} className="break-all hover:underline">{personalInfo.email}</a>}
                {personalInfo?.location && <p>{personalInfo.location}</p>}
                {personalInfo?.linkedin && <a href={ensureUrlProtocol(personalInfo.linkedin)} target="_blank" rel="noopener noreferrer" className="break-all hover:underline">{personalInfo.linkedin}</a>}
            </SidebarSection>
            {education?.length > 0 && (
                <SidebarSection title="Education">
                    {education.map(edu => (
                        <div key={edu.id} className="mb-2">
                            <h3 className="font-bold">{edu.degree}</h3>
                            <p>{edu.institution}</p>
                            <p className="text-xs">{edu.startDate} - {edu.endDate}</p>
                            {edu.description && <p className="text-xs italic mt-1">{edu.description}</p>}
                        </div>
                    ))}
                </SidebarSection>
            )}
            {skills?.filter(s => s.category === 'soft').length > 0 && (
                <SidebarSection title="Soft Skills">
                     <ul className="list-disc list-inside">
                        {skills.filter(s => s.category === 'soft').map(skill => (
                          <li key={skill.id}>
                            {skill.name}{skill.level && ` (${skill.level.charAt(0).toUpperCase() + skill.level.slice(1)})`}
                          </li>
                        ))}
                    </ul>
                </SidebarSection>
            )}
        </div>
      </aside>

      {/* Main Content */}
      <main className="w-2/3 p-8 flex-grow flex flex-col">
        {personalInfo?.careerObjective && (
          <section className="mb-6">
            <h2 className="text-2xl font-bold uppercase text-gray-700 border-b-2 border-yellow-400 pb-2 mb-4">Career Objective</h2>
            <p className="text-sm text-gray-600">
              {personalInfo.careerObjective}
            </p>
          </section>
        )}

        {projects?.length > 0 && (
            <section className="mb-6">
                <h2 className="text-2xl font-bold uppercase text-gray-700 border-b-2 border-yellow-400 pb-2 mb-4">Projects</h2>
                <div className="space-y-4">
                    {projects.map(proj => (
                        <div key={proj.id}>
                            <h3 className="text-lg font-bold">{proj.title}</h3>
                            <p className="text-sm text-gray-600">{proj.description}</p>
                        </div>
                    ))}
                </div>
            </section>
        )}

        {workExperience?.length > 0 && (
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

        {achievements?.length > 0 && (
            <section className="mb-6">
                <h2 className="text-2xl font-bold uppercase text-gray-700 border-b-2 border-yellow-400 pb-2 mb-4">Achievements</h2>
                <div className="space-y-2">
                    {achievements.map(ach => (
                        <div key={ach.id}>
                            <h3 className="text-lg font-bold">{ach.title}</h3>
                            <p className="text-sm text-gray-600">{ach.issuer} ({ach.date})</p>
                            {ach.description && <p className="text-xs text-gray-600 mt-1">{ach.description}</p>}
                        </div>
                    ))}
                </div>
            </section>
        )}

         {skills?.filter(s => s.category !== 'soft').length > 0 && (
            <section className="flex-grow">
                <h2 className="text-2xl font-bold uppercase text-gray-700 border-b-2 border-yellow-400 pb-2 mb-4">Professional Skills</h2>
                <div className="flex flex-wrap gap-2">
                    {skills.filter(s => s.category !== 'soft').map(skill => (
                        <span key={skill.id} className="bg-gray-200 text-gray-800 px-3 py-1 text-sm rounded-full">
                          {skill.name}{skill.level && ` (${skill.level.charAt(0).toUpperCase() + skill.level.slice(1)})`}
                        </span>
                    ))}
                </div>
            </section>
        )}
      </main>
    </div>
  );
};