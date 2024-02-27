import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, SelectPicker, FlexboxGrid, Col } from 'rsuite';

const { Column, HeaderCell, Cell } = Table;

function SeeQuizResults() {
  const [results, setResults] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/v1/results/fetch-quiz-result');
        setResults(response.data.results);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const filteredResults = selectedSubject
    ? results.filter(result => result.subject === selectedSubject)
    : results;

  return (
    <FlexboxGrid justify="center" style={{ marginTop: "20px" }}>
      <FlexboxGrid.Item colspan={20}>
        <h2 style={{ textAlign: 'center' }}>See Quiz Results</h2>
        <SelectPicker
          placeholder="Select Subject"
          value={selectedSubject}
          onChange={value => setSelectedSubject(value)}
          data={[
            { label: 'MNG', value: 'MNG' },
            { label: 'ETI', value: 'ETI' }
          ]}
          style={{ width: 200, marginBottom: 20 }}
        />
        <Table data={filteredResults}>
          <Column flexGrow={1} align="center">
            <HeaderCell>Subject</HeaderCell>
            <Cell dataKey="subject" />
          </Column>
          <Column flexGrow={1} align="center">
            <HeaderCell>Total Questions</HeaderCell>
            <Cell dataKey="totalQuestions" />
          </Column>
          <Column flexGrow={1} align="center">
            <HeaderCell>Marks</HeaderCell>
            <Cell dataKey="marks" />
          </Column>
          <Column flexGrow={1} align="center">
            <HeaderCell>Full Name</HeaderCell>
            <Cell dataKey="fullName" />
          </Column>
          <Column flexGrow={1} align="center">
            <HeaderCell>Response Submitted At</HeaderCell>
            <Cell>
              {(rowData) => {
                const date = new Date(rowData.createdAt);
                return <span>{date.toLocaleString()}</span>;
              }}
            </Cell>
          </Column>
        </Table>
      </FlexboxGrid.Item>
    </FlexboxGrid>
  );
}

export default SeeQuizResults;
