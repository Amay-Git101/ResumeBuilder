import { ResumeData } from "@/types/resume";
import { Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';

// Register Lora font
Font.register({
  family: 'Lora',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/lora/v23/0QI6MX1D_JOu_jM5_es7_w.ttf', fontWeight: 400 },
    { src: 'https://fonts.gstatic.com/s/lora/v23/0QI5MX1D_JOu_jM515-x-w.ttf', fontWeight: 700 },
  ],
});


const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Lora',
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
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  jobTitle: {
    fontSize: 12,
    color: '#555',
    textTransform: 'uppercase',
    letterSpacing: 3,
    marginTop: 2,
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
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 700,
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
    fontWeight: 'bold',
  },
  company: {
    fontSize: 11,
    fontStyle: 'italic',
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
});

export const MinimalistTemplatePDF: React.FC<{ data: ResumeData }> = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.fullName}>{data.personalInfo.fullName}</Text>
        <Text style={styles.jobTitle}>Software Engineer</Text>
      </View>

      <View style={styles.contactSection}>
        <Text>{data.personalInfo.email}</Text>
        <Text>{data.personalInfo.phone}</Text>
        <Text>{data.personalInfo.location}</Text>
        <Text>{data.personalInfo.linkedin}</Text>
      </View>

      {data.workExperience.length > 0 && (
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

      {data.education.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Education</Text>
          {data.education.map(edu => (
            <View key={edu.id} style={styles.entry}>
              <View style={styles.entryHeader}>
                <Text style={styles.position}>{edu.degree}</Text>
                <Text style={styles.date}>{edu.startDate} - {edu.endDate}</Text>
              </View>
              <Text style={styles.company}>{edu.institution}</Text>
            </View>
          ))}
        </View>
      )}

      {data.skills.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Skills</Text>
          <View style={styles.skillContainer}>
            {data.skills.map(skill => (
              <Text key={skill.id} style={styles.skill}>{skill.name}</Text>
            ))}
          </View>
        </View>
      )}
    </Page>
  </Document>
);