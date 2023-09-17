import React, { useState } from "react";
import { FlexboxGrid, SelectPicker } from "rsuite";
import { Table } from "rsuite";

const subjects = ["AJP", "EST", "OSY", "STE", "CSS"].map((item) => ({
  label: item,
  value: item,
}));

const assprac = ["Assignments", "Practicals"].map((item) => ({
  label: item,
  value: item,
}));

// Data structure for assignments and practicals for each subject
const subjectData = {
  AJP: {
    Assignments: [
      {
        assignmentNo: 1,
        isCheckedColumn: true,
        marks: 90,
        dateOfChecking: "2023-09-20",
      },
      {
        assignmentNo: 2,
        isCheckedColumn: true,
        marks: 90,
        dateOfChecking: "2023-09-20",
      },
      {
        assignmentNo: 3,
        isCheckedColumn: true,
        marks: 90,
        dateOfChecking: "2023-09-20",
      },
      {
        assignmentNo: 4,
        isCheckedColumn: true,
        marks: 90,
        dateOfChecking: "2023-09-20",
      },
      {
        assignmentNo: 5,
        isCheckedColumn: true,
        marks: 90,
        dateOfChecking: "2023-09-20",
      },
      // Add more assignments for AJP
    ],
    Practicals: [
      {
        practicalNo: 1,
        isCheckedColumn: true,
        marks: 90,
        dateOfChecking: "2023-09-20",
      },
      {
        practicalNo: 2,
        isCheckedColumn: true,
        marks: 90,
        dateOfChecking: "2023-09-20",
      },
      {
        practicalNo: 3,
        isCheckedColumn: true,
        marks: 90,
        dateOfChecking: "2023-09-20",
      },
      {
        practicalNo: 4,
        isCheckedColumn: true,
        marks: 90,
        dateOfChecking: "2023-09-20",
      },
      {
        practicalNo: 5,
        isCheckedColumn: true,
        marks: 90,
        dateOfChecking: "2023-09-20",
      },
      {
        practicalNo: 6,
        isCheckedColumn: true,
        marks: 90,
        dateOfChecking: "2023-09-20",
      },
      {
        practicalNo: 7,
        isCheckedColumn: true,
        marks: 90,
        dateOfChecking: "2023-09-20",
      },
      {
        practicalNo: 8,
        isCheckedColumn: true,
        marks: 90,
        dateOfChecking: "2023-09-20",
      },
      {
        practicalNo: 9,
        isCheckedColumn: true,
        marks: 90,
        dateOfChecking: "2023-09-20",
      },
      {
        practicalNo: 10,
        isCheckedColumn: true,
        marks: 90,
        dateOfChecking: "2023-09-20",
      },
      // Add more practicals for AJP
    ],
  },
  EST: {
    Assignments: [
      {
        assignmentNo: 1,
        isCheckedColumn: true,
        marks: 90,
        dateOfChecking: "2023-09-20",
      },
      {
        assignmentNo: 2,
        isCheckedColumn: true,
        marks: 90,
        dateOfChecking: "2023-09-20",
      },
      {
        assignmentNo: 3,
        isCheckedColumn: true,
        marks: 90,
        dateOfChecking: "2023-09-20",
      },
      {
        assignmentNo: 4,
        isCheckedColumn: true,
        marks: 90,
        dateOfChecking: "2023-09-20",
      },
      {
        assignmentNo: 5,
        isCheckedColumn: true,
        marks: 90,
        dateOfChecking: "2023-09-20",
      },
    ],
    Practicals: [
      {
        practicalNo: 1,
        isCheckedColumn: true,
        marks: 90,
        dateOfChecking: "2023-09-20",
      },
      {
        practicalNo: 2,
        isCheckedColumn: true,
        marks: 90,
        dateOfChecking: "2023-09-20",
      },
      {
        practicalNo: 3,
        isCheckedColumn: true,
        marks: 90,
        dateOfChecking: "2023-09-20",
      },
      {
        practicalNo: 4,
        isCheckedColumn: true,
        marks: 90,
        dateOfChecking: "2023-09-20",
      },
      {
        practicalNo: 5,
        isCheckedColumn: true,
        marks: 90,
        dateOfChecking: "2023-09-20",
      },
      {
        practicalNo: 6,
        isCheckedColumn: true,
        marks: 90,
        dateOfChecking: "2023-09-20",
      },
      {
        practicalNo: 7,
        isCheckedColumn: true,
        marks: 90,
        dateOfChecking: "2023-09-20",
      },
      {
        practicalNo: 8,
        isCheckedColumn: true,
        marks: 90,
        dateOfChecking: "2023-09-20",
      },
      {
        practicalNo: 9,
        isCheckedColumn: true,
        marks: 90,
        dateOfChecking: "2023-09-20",
      },
      {
        practicalNo: 10,
        isCheckedColumn: true,
        marks: 90,
        dateOfChecking: "2023-09-20",
      },
    ],
  },
  OSY: {
    Assignments: [
      {
        assignmentNo: 1,
        isCheckedColumn: true,
        marks: 90,
        dateOfChecking: "2023-09-20",
      },
      {
        assignmentNo: 2,
        isCheckedColumn: true,
        marks: 90,
        dateOfChecking: "2023-09-20",
      },
      {
        assignmentNo: 3,
        isCheckedColumn: true,
        marks: 90,
        dateOfChecking: "2023-09-20",
      },
      {
        assignmentNo: 4,
        isCheckedColumn: true,
        marks: 90,
        dateOfChecking: "2023-09-20",
      },
      {
        assignmentNo: 5,
        isCheckedColumn: true,
        marks: 90,
        dateOfChecking: "2023-09-20",
      },
    ],
    Practicals: [
      {
        practicalNo: 1,
        isCheckedColumn: true,
        marks: 90,
        dateOfChecking: "2023-09-20",
      },
      {
        practicalNo: 2,
        isCheckedColumn: true,
        marks: 90,
        dateOfChecking: "2023-09-20",
      },
      {
        practicalNo: 3,
        isCheckedColumn: true,
        marks: 90,
        dateOfChecking: "2023-09-20",
      },
      {
        practicalNo: 4,
        isCheckedColumn: true,
        marks: 90,
        dateOfChecking: "2023-09-20",
      },
      {
        practicalNo: 5,
        isCheckedColumn: true,
        marks: 90,
        dateOfChecking: "2023-09-20",
      },
      {
        practicalNo: 6,
        isCheckedColumn: true,
        marks: 90,
        dateOfChecking: "2023-09-20",
      },
      {
        practicalNo: 7,
        isCheckedColumn: true,
        marks: 90,
        dateOfChecking: "2023-09-20",
      },
      {
        practicalNo: 8,
        isCheckedColumn: true,
        marks: 90,
        dateOfChecking: "2023-09-20",
      },
      {
        practicalNo: 9,
        isCheckedColumn: true,
        marks: 90,
        dateOfChecking: "2023-09-20",
      },
      {
        practicalNo: 10,
        isCheckedColumn: true,
        marks: 90,
        dateOfChecking: "2023-09-20",
      },
    ],
  },
  STE: {
    Assignments: [
      {
        assignmentNo: 1,
        isCheckedColumn: true,
        marks: 90,
        dateOfChecking: "2023-09-20",
      },
      {
        assignmentNo: 2,
        isCheckedColumn: true,
        marks: 90,
        dateOfChecking: "2023-09-20",
      },
      {
        assignmentNo: 3,
        isCheckedColumn: true,
        marks: 90,
        dateOfChecking: "2023-09-20",
      },
      {
        assignmentNo: 4,
        isCheckedColumn: true,
        marks: 90,
        dateOfChecking: "2023-09-20",
      },
      {
        assignmentNo: 5,
        isCheckedColumn: true,
        marks: 90,
        dateOfChecking: "2023-09-20",
      },
    ],
    Practicals: [
      {
        practicalNo: 1,
        isCheckedColumn: true,
        marks: 90,
        dateOfChecking: "2023-09-20",
      },
      {
        practicalNo: 2,
        isCheckedColumn: true,
        marks: 90,
        dateOfChecking: "2023-09-20",
      },
      {
        practicalNo: 3,
        isCheckedColumn: true,
        marks: 90,
        dateOfChecking: "2023-09-20",
      },
      {
        practicalNo: 4,
        isCheckedColumn: true,
        marks: 90,
        dateOfChecking: "2023-09-20",
      },
      {
        practicalNo: 5,
        isCheckedColumn: true,
        marks: 90,
        dateOfChecking: "2023-09-20",
      },
      {
        practicalNo: 6,
        isCheckedColumn: true,
        marks: 90,
        dateOfChecking: "2023-09-20",
      },
      {
        practicalNo: 7,
        isCheckedColumn: true,
        marks: 90,
        dateOfChecking: "2023-09-20",
      },
      {
        practicalNo: 8,
        isCheckedColumn: true,
        marks: 90,
        dateOfChecking: "2023-09-20",
      },
      {
        practicalNo: 9,
        isCheckedColumn: true,
        marks: 90,
        dateOfChecking: "2023-09-20",
      },
      {
        practicalNo: 10,
        isCheckedColumn: true,
        marks: 90,
        dateOfChecking: "2023-09-20",
      },
    ],
  },
  CSS: {
    Assignments: [
      {
        assignmentNo: 1,
        isCheckedColumn: true,
        marks: 90,
        dateOfChecking: "2023-09-20",
      },
      {
        assignmentNo: 2,
        isCheckedColumn: true,
        marks: 90,
        dateOfChecking: "2023-09-20",
      },
      {
        assignmentNo: 3,
        isCheckedColumn: true,
        marks: 90,
        dateOfChecking: "2023-09-20",
      },
      {
        assignmentNo: 4,
        isCheckedColumn: true,
        marks: 90,
        dateOfChecking: "2023-09-20",
      },
      {
        assignmentNo: 5,
        isCheckedColumn: true,
        marks: 90,
        dateOfChecking: "2023-09-20",
      },
    ],
    Practicals: [
      {
        practicalNo: 1,
        isCheckedColumn: true,
        marks: 90,
        dateOfChecking: "2023-09-20",
      },
      {
        practicalNo: 2,
        isCheckedColumn: true,
        marks: 90,
        dateOfChecking: "2023-09-20",
      },
      {
        practicalNo: 3,
        isCheckedColumn: true,
        marks: 90,
        dateOfChecking: "2023-09-20",
      },
      {
        practicalNo: 4,
        isCheckedColumn: true,
        marks: 90,
        dateOfChecking: "2023-09-20",
      },
      {
        practicalNo: 5,
        isCheckedColumn: true,
        marks: 90,
        dateOfChecking: "2023-09-20",
      },
      {
        practicalNo: 6,
        isCheckedColumn: true,
        marks: 90,
        dateOfChecking: "2023-09-20",
      },
      {
        practicalNo: 7,
        isCheckedColumn: true,
        marks: 90,
        dateOfChecking: "2023-09-20",
      },
      {
        practicalNo: 8,
        isCheckedColumn: true,
        marks: 90,
        dateOfChecking: "2023-09-20",
      },
      {
        practicalNo: 9,
        isCheckedColumn: true,
        marks: 90,
        dateOfChecking: "2023-09-20",
      },
      {
        practicalNo: 10,
        isCheckedColumn: true,
        marks: 90,
        dateOfChecking: "2023-09-20",
      },
    ],
  },
};

const { Column, HeaderCell, Cell } = Table;

function Submission() {
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedAssPrac, setSelectedAssPrac] = useState(null);

  const subjectDataForSelected = subjectData[selectedSubject] || {};
  const selectedData = subjectDataForSelected[selectedAssPrac] || [];

  const renderTable = () => {
    if (!selectedSubject || !selectedAssPrac) {
      return <p>Please select a subject and Assignemnt/Practical.</p>;
    }

    return (
      <Table
        height={500}
        data={selectedData}
        bordered
        cellBordered
        onSortColumn={(sortColumn, sortType) => {
          console.log(sortColumn, sortType);
        }}
      >
        {/* Render columns for assignments or practicals */}
        {selectedAssPrac === "Assignments" && (
          <>
            <Column flexGrow={1}>
              <HeaderCell>Assignment No</HeaderCell>
              <Cell dataKey="assignmentNo" />
            </Column>
            <Column flexGrow={1}>
              <HeaderCell>isChecked</HeaderCell>
              <Cell>
                {(rowData) => (rowData.isCheckedColumn ? "Yes" : "No")}
              </Cell>
            </Column>
            <Column flexGrow={1}>
              <HeaderCell>Marks</HeaderCell>
              <Cell dataKey="marks" />
            </Column>
            <Column flexGrow={1}>
              <HeaderCell>Date of Checking</HeaderCell>
              <Cell dataKey="dateOfChecking" />
            </Column>
          </>
        )}

        {selectedAssPrac === "Practicals" && (
          <>
            <Column flexGrow={1}>
              <HeaderCell>Practical No</HeaderCell>
              <Cell dataKey="practicalNo" />
            </Column>
            <Column flexGrow={1}>
              <HeaderCell>isChecked</HeaderCell>
              <Cell>
                {(rowData) => (rowData.isCheckedColumn ? "Yes" : "No")}
              </Cell>
            </Column>
            <Column flexGrow={1}>
              <HeaderCell>Marks</HeaderCell>
              <Cell dataKey="marks" />
            </Column>
            <Column flexGrow={1}>
              <HeaderCell>Date of Checking</HeaderCell>
              <Cell dataKey="dateOfChecking" />
            </Column>
          </>
        )}
      </Table>
    );
  };

  return (
    <>
      <div>
        <h3 style={{ margin: "10px 10px" }}>Choose the Subject and Assignment/Practical</h3>
        <FlexboxGrid justify="center">
          <FlexboxGrid.Item colspan={6} style={{ margin: "10px 10px" }}>
            <SelectPicker
              placeholder="Subject"
              data={subjects}
              value={selectedSubject}
              onChange={(value) => setSelectedSubject(value)}
              style={{ width: "100%" }}
            />
          </FlexboxGrid.Item>
          <FlexboxGrid.Item colspan={6} style={{ margin: "10px 10px" }}>
            <SelectPicker
              placeholder="Assignment/Practical"
              data={assprac}
              value={selectedAssPrac}
              onChange={(value) => setSelectedAssPrac(value)}
              style={{ width: "100%" }}
            />
          </FlexboxGrid.Item>
        </FlexboxGrid>
        {renderTable()}
      </div>
    </>
  );
}

export default Submission;
