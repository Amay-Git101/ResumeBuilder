import { ResumeData } from "@/types/resume";
import { Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';

Font.register({
  family: 'Helvetica',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/helvetica/v10/0QI6MX1D_JOu_jM5_es7_w.ttf', fontWeight: 400 },
    { src: 'https://fonts.gstatic.com/s/helvetica/v10/0QI5MX1D_JOu_jM515-x-w.ttf', fontWeight: 700 },
  ],
});

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    fontFamily: 'Helvetica',
  },
  sidebar: {
    width: '33.33%',
    backgroundColor: '#ffc107',
    padding: 20,
    color: '#333',
  },
  main: {
    width: '66.67%',
    padding: 20,
  },
  header: {
    textAlign: 'center',
    marginBottom: 20,
  },
  fullName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  jobTitle: {
    fontSize: 14,
  },
  sidebarSection: {
    marginBottom: 20,
  },
  sidebarTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginBottom: 5,
  },
  sidebarText: {
    fontSize: 10,
    lineHeight: 1.4,
  },
  mainSection: {
    marginBottom: 20,
  },
  mainTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    color: '#444',
    borderBottomWidth: 2,
    borderBottomColor: '#ffc107',
    paddingBottom: 5,
    marginBottom: 10,
  },
  entry: {
    marginBottom: 10,
  },
  position: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  entryHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 10,
    color: '#555',
    marginBottom: 2,
  },
  descriptionList: {
    marginTop: 4,
    paddingLeft: 10,
  },
  descriptionItem: {
    fontSize: 10,
    marginBottom: 2,
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
  },
});

export const CreativeTemplatePDF: React.FC<{ data: ResumeData }> = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.sidebar}>
        <View style={styles.header}>
          <Text style={styles.fullName}>{data.personalInfo.fullName}</Text>
          <Text style={styles.jobTitle}>HR Intern</Text>
        </View>

        <View style={styles.sidebarSection}>
          <Text style={styles.sidebarTitle}>Contact</Text>
          <Text style={styles.sidebarText}>{data.personalInfo.phone}</Text>
          <Text style={styles.sidebarText}>{data.personalInfo.email}</Text>
          <Text style={styles.sidebarText}>{data.personalInfo.location}</Text>
          <Text style={styles.sidebarText}>{data.personalInfo.linkedin}</Text>
        </View>

        {data.education.length > 0 && (
          <View style={styles.sidebarSection}>
            <Text style={styles.sidebarTitle}>Education</Text>
            {data.education.map(edu => (
              <View key={edu.id}>
                <Text style={{...styles.sidebarText, fontWeight: 'bold'}}>{edu.degree}</Text>
                <Text style={styles.sidebarText}>{edu.institution}</Text>
                <Text style={{...styles.sidebarText, fontSize: 9}}>{edu.startDate} - {edu.endDate}</Text>
              </View>
            ))}
          </View>
        )}
        
        {data.skills.filter(s => s.category === 'soft').length > 0 && (
          <View style={styles.sidebarSection}>
            <Text style={styles.sidebarTitle}>Soft Skills</Text>
            {data.skills.filter(s => s.category === 'soft').map(skill => (
              <Text key={skill.id} style={styles.sidebarText}>• {skill.name}</Text>
            ))}
          </View>
        )}
      </View>
      <View style={styles.main}>
        <View style={styles.mainSection}>
          <Text style={styles.mainTitle}>Career Objective</Text>
          <Text style={{ fontSize: 10, lineHeight: 1.4 }}>
            Seeking a Human Resource internship where I can bring my knowledge in the best DEI practices and ability to lead teams. Eager to contribute to strategic talent development efforts.
          </Text>
        </View>

        {data.workExperience.length > 0 && (
          <View style={styles.mainSection}>
            <Text style={styles.mainTitle}>Work Experience</Text>
            {data.workExperience.map(exp => (
              <View key={exp.id} style={styles.entry}>
                <Text style={styles.position}>{exp.position}</Text>
                <View style={styles.entryHeader}>
                  <Text>{exp.company}</Text>
                  <Text>{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</Text>
                </View>
                <View style={styles.descriptionList}>
                  {exp.description.split('\n').map((item, index) => item && <Text key={index} style={styles.descriptionItem}>• {item.replace('•','').trim()}</Text>)}
                </View>
              </View>
            ))}
          </View>
        )}

        {data.skills.filter(s => s.category !== 'soft').length > 0 && (
          <View style={styles.mainSection}>
            <Text style={styles.mainTitle}>Professional Skills</Text>
            <View style={styles.skillContainer}>
              {data.skills.filter(s => s.category !== 'soft').map(skill => (
                <Text key={skill.id} style={styles.skill}>{skill.name}</Text>
              ))}
            </View>
          </View>
        )}
      </View>
    </Page>
  </Document>
);