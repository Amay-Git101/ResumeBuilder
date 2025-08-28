import { ResumeData } from "@/types/resume";
import { Mail, Phone, MapPin, Linkedin, Github } from 'lucide-react';

interface Props {
  data: ResumeData;
}

export const MinimalistTemplate: React.FC<Props> = ({ data }) => {
  const { personalInfo, education, workExperience, skills, achievements } = data;

  return (
    <div className="bg-white text-gray-800 p-10 font-serif text-sm flex flex-col min-h-[1123px]">
      {/* Header */}
      <header className="text-center mb-8 border-b-2 border-gray-800 pb-4">
        <h1 className="text-4xl font-bold tracking-wider uppercase">{personalInfo.fullName}</h1>
        {personalInfo.email && <p className="text-lg text-gray-600 tracking-widest uppercase mt-1">Software Engineer</p>}
      </header>

      {/* Contact */}
      {personalInfo.email && (
        <section className="text-center mb-8">
          <div className="flex justify-center items-center flex-wrap gap-x-6 gap-y-2 text-xs">
            {personalInfo.email && <div className="flex items-center gap-1.5"><Mail size={12} /> {personalInfo.email}</div>}
            {personalInfo.phone && <div className="flex items-center gap-1.5"><Phone size={12} /> {personalInfo.phone}</div>}
            {personalInfo.location && <div className="flex items-center gap-1.5"><MapPin size={12} /> {personalInfo.location}</div>}
            {personalInfo.linkedin && <div className="flex items-center gap-1.5"><Linkedin size={12} /> {personalInfo.linkedin}</div>}
            {personalInfo.github && <div className="flex items-center gap-1.5"><Github size={12} /> {personalInfo.github}</div>}
          </div>
        </section>
      )}

      {/* Main Content */}
      <div className="space-y-8 flex-grow">
        {/* Work Experience */}
        {workExperience.length > 0 && (
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
        {education.length > 0 && (
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
                  </div>
                ))}
              </div>
          </section>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <section>
            <h2 className="text-xl font-bold uppercase tracking-wider border-b-2 border-gray-300 pb-1 mb-3">Skills</h2>
            <div className="flex flex-wrap gap-2 font-sans">
                {skills.map(skill => (
                  <span key={skill.id} className="text-sm bg-gray-200 px-3 py-1 rounded">{skill.name}</span>
                ))}
            </div>
          </section>
        )}

        {/* Certifications */}
        {achievements.length > 0 && (
           <section>
            <h2 className="text-xl font-bold uppercase tracking-wider border-b-2 border-gray-300 pb-1 mb-3">Certifications</h2>
            <div className="space-y-2">
              {achievements.map(cert => (
                  <div key={cert.id} className="text-sm font-sans">
                      <p className="font-bold">{cert.title}</p>
                      {cert.issuer && <p className="text-gray-600">{cert.issuer}</p>}
                  </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};