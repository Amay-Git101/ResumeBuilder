import { ResumeData } from "@/types/resume";
import { Page, Text, View, Document, StyleSheet, Link } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Times-Roman',
    fontSize: 10,
    color: '#333',
  },
  header: {
    textAlign: 'center',
    marginBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#333',
    paddingBottom: 10,
  },
  fullName: {
    fontSize: 28,
    fontFamily: 'Helvetica-Bold',
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  jobTitle: {
    fontSize: 12,
    color: '#555',
    textTransform: 'uppercase',
    letterSpacing: 3,
    marginTop: 2,
    fontFamily: 'Helvetica',
  },
  contactSection: {
    textAlign: 'center',
    marginBottom: 20,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 15,
    fontSize: 9,
    fontFamily: 'Helvetica',
  },
  link: {
    textDecoration: 'none',
    color: '#333',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontFamily: 'Helvetica-Bold',
    textTransform: 'uppercase',
    letterSpacing: 2,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 4,
    marginBottom: 8,
  },
  entry: {
    marginBottom: 10,
  },
  entryHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  position: {
    fontSize: 12,
    fontFamily: 'Times-Bold',
  },
  company: {
    fontSize: 11,
    fontFamily: 'Times-Italic',
  },
  date: {
    fontSize: 9,
    color: '#555',
    fontFamily: 'Helvetica',
  },
  descriptionList: {
    marginTop: 4,
    paddingLeft: 10,
  },
  descriptionItem: {
    fontSize: 10,
    marginBottom: 2,
    fontFamily: 'Helvetica',
  },
  skillContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  skill: {
    backgroundColor: '#eee',
    padding: '4px 8px',
    borderRadius: 4,
    fontSize: 9,
    fontFamily: 'Helvetica',
  },
  descriptionText: {
    fontSize: 10,
    fontFamily: 'Helvetica',
    color: '#555',
    marginTop: 2,
  },
});

const ensureUrlProtocolPDF = (url: string) => {
    if (!url) return "";
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }
    return `https://${url}`;
  };

export const MinimalistTemplatePDF: React.FC<{ data: ResumeData }> = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.fullName}>{data.personalInfo?.fullName ?? "Your Name"}</Text>
        {data.personalInfo?.jobTitle && <Text style={styles.jobTitle}>{data.personalInfo.jobTitle}</Text>}
      </View>

      <View style={styles.contactSection}>
        {data.personalInfo?.email && <Link src={`mailto:${data.personalInfo.email}`} style={styles.link}><Text>{data.personalInfo.email}</Text></Link>}
        {data.personalInfo?.phone && <Link src={`tel:${data.personalInfo.phone}`} style={styles.link}><Text>{data.personalInfo.phone}</Text></Link>}
        {data.personalInfo?.location && <Text>{data.personalInfo.location}</Text>}
        {data.personalInfo?.linkedin && <Link src={ensureUrlProtocolPDF(data.personalInfo.linkedin)} style={styles.link}><Text>{data.personalInfo.linkedin}</Text></Link>}
        {data.personalInfo?.github && <Link src={ensureUrlProtocolPDF(data.personalInfo.github)} style={styles.link}><Text>{data.personalInfo.github}</Text></Link>}
      </View>

      {data.personalInfo?.careerObjective && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Career Objective</Text>
          <Text style={{ fontFamily: 'Helvetica', fontSize: 10 }}>{data.personalInfo.careerObjective}</Text>
        </View>
      )}

    {data.projects?.length > 0 && (
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>Projects</Text>
            {data.projects.map(proj => (
            <View key={proj.id} style={styles.entry}>
                <Text style={styles.position}>{proj.title}</Text>
                <Text style={styles.descriptionItem}>{proj.description}</Text>
            </View>
            ))}
        </View>
    )}

      {data.workExperience?.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Work Experience</Text>
          {data.workExperience.map(exp => (
            <View key={exp.id} style={styles.entry}>
              <View style={styles.entryHeader}>
                <Text style={styles.position}>{exp.position}</Text>
                <Text style={styles.date}>{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</Text>
              </View>
              <Text style={styles.company}>{exp.company}</Text>
              <View style={styles.descriptionList}>
                {exp.description.split('\n').map((item, index) => item && <Text key={index} style={styles.descriptionItem}>• {item.replace('•','').trim()}</Text>)}
              </View>
            </View>
          ))}
        </View>
      )}

      {data.education?.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Education</Text>
          {data.education.map(edu => (
            <View key={edu.id} style={styles.entry}>
              <View style={styles.entryHeader}>
                <Text style={styles.position}>{edu.degree}</Text>
                <Text style={styles.date}>{edu.startDate} - {edu.endDate}</Text>
              </View>
              <Text style={styles.company}>{edu.institution}</Text>
              {edu.description && <Text style={styles.descriptionText}>{edu.description}</Text>}
            </View>
          ))}
        </View>
      )}

      {data.skills?.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Skills</Text>
          <View style={styles.skillContainer}>
            {data.skills.map(skill => (
              <Text key={skill.id} style={styles.skill}>
                {skill.name}{skill.level && ` (${skill.level.charAt(0).toUpperCase() + skill.level.slice(1)})`}
              </Text>
            ))}
          </View>
        </View>
      )}

      {data.achievements?.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Achievements & Certifications</Text>
          {data.achievements.map(cert => (
            <View key={cert.id} style={styles.entry}>
              <Text style={styles.position}>{cert.title}</Text>
              {cert.issuer && <Text style={{...styles.company, fontFamily: 'Helvetica'}}>{cert.issuer} ({cert.date})</Text>}
              {cert.description && <Text style={styles.descriptionText}>{cert.description}</Text>}
            </View>
          ))}
        </View>
      )}
    </Page>
  </Document>
);