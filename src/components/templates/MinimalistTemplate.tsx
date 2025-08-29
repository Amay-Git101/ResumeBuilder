import { ResumeData } from "@/types/resume";
import { Mail, Phone, MapPin, Linkedin, Github } from 'lucide-react';

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

export const MinimalistTemplate: React.FC<Props> = ({ data }) => {
  const { personalInfo, education, workExperience, skills, achievements, projects } = data;

  return (
    <div className="bg-white text-gray-800 p-10 font-serif text-sm flex flex-col min-h-[1123px]">
      {/* Header */}
      <header className="text-center mb-8 border-b-2 border-gray-800 pb-4">
        <h1 className="text-4xl font-bold tracking-wider uppercase">{personalInfo?.fullName ?? "Your Name"}</h1>
        {personalInfo?.jobTitle && <p className="text-lg text-gray-600 tracking-widest uppercase mt-1">{personalInfo.jobTitle}</p>}
      </header>

      {/* Contact */}
      <section className="text-center mb-8">
        <div className="flex justify-center items-center flex-wrap gap-x-6 gap-y-2 text-xs">
          {personalInfo?.email && <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-1.5 hover:underline"><Mail size={12} /> {personalInfo.email}</a>}
          {personalInfo?.phone && <a href={`tel:${personalInfo.phone}`} className="flex items-center gap-1.5 hover:underline"><Phone size={12} /> {personalInfo.phone}</a>}
          {personalInfo?.location && <div className="flex items-center gap-1.5"><MapPin size={12} /> {personalInfo.location}</div>}
          {personalInfo?.linkedin && <a href={ensureUrlProtocol(personalInfo.linkedin)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:underline"><Linkedin size={12} /> {personalInfo.linkedin}</a>}
          {personalInfo?.github && <a href={ensureUrlProtocol(personalInfo.github)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:underline"><Github size={12} /> {personalInfo.github}</a>}
        </div>
      </section>

      {/* Main Content */}
      <div className="space-y-8 flex-grow">
        {/* Career Objective */}
        {personalInfo?.careerObjective && (
          <section>
            <h2 className="text-xl font-bold uppercase tracking-wider border-b-2 border-gray-300 pb-1 mb-3">Career Objective</h2>
            <p className="text-sm text-gray-700 font-sans">{personalInfo.careerObjective}</p>
          </section>
        )}

        {/* Projects */}
        {projects?.length > 0 && (
            <section>
                <h2 className="text-xl font-bold uppercase tracking-wider border-b-2 border-gray-300 pb-1 mb-3">Projects</h2>
                <div className="space-y-4">
                    {projects.map(proj => (
                        <div key={proj.id}>
                            <h3 className="text-lg font-bold">{proj.title}</h3>
                            <p className="text-sm text-gray-700 font-sans">{proj.description}</p>
                        </div>
                    ))}
                </div>
            </section>
        )}

        {/* Work Experience */}
        {workExperience?.length > 0 && (
          <section>
            <h2 className="text-xl font-bold uppercase tracking-wider border-b-2 border-gray-300 pb-1 mb-3">Work Experience</h2>
            <div className="space-y-4">
              {workExperience.map(exp => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-lg font-bold">{exp.position}</h3>
                    <p className="text-xs text-gray-600 font-sans">{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</p>
                  </div>
                  <p className="text-md italic text-gray-700">{exp.company}</p>
                  <ul className="list-disc list-inside mt-2 text-sm space-y-1 font-sans">
                    {exp.description.split('\n').map((item, index) => item && <li key={index}>{item.replace('•','').trim()}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}
        
        {/* Education */}
        {education?.length > 0 && (
          <section>
             <h2 className="text-xl font-bold uppercase tracking-wider border-b-2 border-gray-300 pb-1 mb-3">Education</h2>
              <div className="space-y-3">
                {education.map(edu => (
                  <div key={edu.id}>
                     <div className="flex justify-between items-baseline">
                      <h3 className="text-lg font-bold">{edu.degree}</h3>
                      <p className="text-xs text-gray-600 font-sans">{edu.startDate} - {edu.endDate}</p>
                    </div>
                    <p className="text-md italic">{edu.institution}</p>
                    {edu.description && <p className="text-sm text-gray-600 font-sans mt-1">{edu.description}</p>}
                  </div>
                ))}
              </div>
          </section>
        )}

        {/* Skills */}
        {skills?.length > 0 && (
          <section>
            <h2 className="text-xl font-bold uppercase tracking-wider border-b-2 border-gray-300 pb-1 mb-3">Skills</h2>
            <div className="flex flex-wrap gap-2 font-sans">
                {skills.map(skill => (
                  <span key={skill.id} className="text-sm bg-gray-200 px-3 py-1 rounded">
                    {skill.name}{skill.level && ` (${skill.level.charAt(0).toUpperCase() + skill.level.slice(1)})`}
                  </span>
                ))}
            </div>
          </section>
        )}

        {/* Achievements */}
        {achievements?.length > 0 && (
           <section>
            <h2 className="text-xl font-bold uppercase tracking-wider border-b-2 border-gray-300 pb-1 mb-3">Achievements & Certifications</h2>
            <div className="space-y-2">
              {achievements.map(cert => (
                  <div key={cert.id} className="text-sm font-sans">
                      <p className="font-bold">{cert.title}</p>
                      {cert.issuer && <p className="text-gray-600">{cert.issuer} ({cert.date})</p>}
                      {cert.description && <p className="text-xs text-gray-600 mt-1">{cert.description}</p>}
                  </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};