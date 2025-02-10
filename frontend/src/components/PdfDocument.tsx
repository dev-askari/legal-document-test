import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    padding: 30,
    fontSize: 12,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  header: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

interface PdfDocumentProps {
  documentName: string;
  extractions: { extraction: string; page: number }[];
}

const PdfDocument: React.FC<PdfDocumentProps> = ({ documentName, extractions }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.header}>Document: {documentName}</Text>
        {extractions.map((item, index) => (
          <Text key={index}>
            Extraction: {item.extraction} - Page {item.page}
          </Text>
        ))}
      </View>
    </Page>
  </Document>
);

export default PdfDocument;