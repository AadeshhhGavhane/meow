import React, { useState, useEffect } from "react";
import { FlexboxGrid, SelectPicker, Table, Loader } from "rsuite";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

import { Grid, Row, Col, Input } from 'rsuite';

const subjects = ["PWP", "MAD", "WBP"].map((item) => ({
  label: item,
  value: item,
}));

const assprac = ["Assignments", "Practicals"].map((item) => ({
  label: item,
  value: item,
}));

function studentView(){
  
  const { userInfo } = useSelector((state) => state.auth);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedAssPrac, setSelectedAssPrac] = useState(null);
  const [marksData, setMarksData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedSubject && selectedAssPrac) {
      fetchMarks(selectedSubject, selectedAssPrac);
    } else {
      // Reset marksData when subject or assignment/practical type is not selected
      setMarksData([]);
    }
  }, [selectedSubject, selectedAssPrac]);

  const fetchMarks = async (subject, assPrac) => {
    setLoading(true);
    try {
      let url = "";
      if (assPrac === "Assignments") {
        url =
          "http://localhost:8000/api/v1/users/fetch-assignment-marks/telegram";
      } else if (assPrac === "Practicals") {
        url =
          "http://localhost:8000/api/v1/users/fetch-practical-marks/telegram";
      }

      let enrollmentNo = userInfo.data.user.enrollmentNo;
      const response = await axios.post(url, {enrollmentNo: enrollmentNo});
      const data = response.data;
      console.log("Response data:", data); // Log response data

      if (data.success) {
        // Filter only the data for the selected subject
        const subjectData = data.data[subject];
        const flattenedData = Object.keys(subjectData).map((assignment) => {
          return {
            subject,
            // Include the practical number in the data
            practicalNo: assPrac === "Practicals" ? assignment : null,
            assignmentNo: assPrac === "Assignments" ? assignment : null,
            marks: subjectData[assignment],
          };
        });
        setMarksData(flattenedData);
      } else {
        console.error("Error fetching marks:", data.message);
      }
    } catch (error) {
      console.error("Error fetching marks:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderTable = () => {
    if (!selectedSubject || !selectedAssPrac) {
      return <p>Please select a subject and Assignment/Practical.</p>;
    }

    if (loading) {
      return <Loader center content="Loading..." />;
    }

    if (marksData && marksData.length > 0) {
      return (
        <Table
          height={500}
          data={marksData}
          bordered
          cellBordered
          onSortColumn={(sortColumn, sortType) => {
            console.log(sortColumn, sortType);
          }}
        >
          <Table.Column flexGrow={1}>
            <Table.HeaderCell>
              {selectedAssPrac === "Assignments"
                ? "Assignment No"
                : "Practical No"}
            </Table.HeaderCell>
            <Table.Cell
              dataKey={
                selectedAssPrac === "Assignments"
                  ? "assignmentNo"
                  : "practicalNo"
              }
            />
          </Table.Column>

          <Table.Column flexGrow={1}>
            <Table.HeaderCell>Marks</Table.HeaderCell>
            <Table.Cell dataKey="marks" />
          </Table.Column>
        </Table>
      );
    }

    return <p>No data available.</p>;
  };
  return(
    <div>
        <h3 style={{ margin: "10px 10px" }}>
          Choose the Subject and Assignment/Practical
        </h3>
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
  )
}

function teacherView(){
  const { userInfo } = useSelector((state) => state.auth);
  let teacher = userInfo.data.user.className;
  return(
    <Grid style={{ marginTop: "50px" }}>
      {teacher.includes("TYCO") && (
        <Row justify="center" align="middle">
          <Col xs={24} sm={18} md={16} style={{ marginBottom: '10px', textAlign: 'center' }}>
            <h6>TYCO Practicals:</h6>
            <Input readOnly value="https://docs.google.com/spreadsheets/d/1Qxg-sP4lLk7GKOc21f0UlxkHe41DwNNzSBC3INHlvzo/" />
          </Col>
        </Row>
      )}
      {teacher.includes("TYCO") && (
        <Row justify="center" align="middle">
          <Col xs={24} sm={18} md={16} style={{ marginBottom: '10px', textAlign: 'center' }}>
            <h6>TYCO Assignments:</h6>
            <Input readOnly value="https://docs.google.com/spreadsheets/d/1Ew7OxCNGQ79UxijKdlvzbmh_QaHRvqyYQgpYHiLpXrc" />
          </Col>
        </Row>
      )}
      {teacher.includes("SYCO") && (
        <Row justify="center" align="middle">
          <Col xs={24} sm={18} md={16} style={{ marginBottom: '10px', textAlign: 'center' }}>
            <h6>SYCO Practicals:</h6>
            <Input readOnly value="https://docs.google.com/spreadsheets/d/1KM6qZ9dHlq_0jxGIzPggZkcwcT7jM6R-aqWw5nf7Xus" />
          </Col>
        </Row>
      )}
       {teacher.includes("SYCO") && (
        <Row justify="center" align="middle">
          <Col xs={24} sm={18} md={16} style={{ marginBottom: '10px', textAlign: 'center' }}>
            <h6>SYCO Assignments:</h6>
            <Input readOnly value="https://docs.google.com/spreadsheets/d/1Dwaw8mJgutkbeDlndoqBur_i-mvDqQ1x0wKci5hP8qs" />
          </Col>
        </Row>
      )}
      {teacher.includes("FYCO") && (
        <Row justify="center" align="middle">
          <Col xs={24} sm={18} md={16} style={{ marginBottom: '10px', textAlign: 'center' }}>
            <h6>FYCO Practicals:</h6>
            <Input readOnly value="https://docs.google.com/spreadsheets/d/1J9GsbPk2J9EYu5i_uLohLnGwHpVkj7eou-KfWkvp5W0" />
          </Col>
        </Row>
      )}
      {teacher.includes("FYCO") && (
        <Row justify="center" align="middle">
          <Col xs={24} sm={18} md={16} style={{ marginBottom: '10px', textAlign: 'center' }}>
            <h6>FYCO Assignments:</h6>
            <Input readOnly value="https://docs.google.com/spreadsheets/d/1pFdLrN00zZ_pGsJmPpBIArs52UAeYknPF47QcKOkAf0" />
          </Col>
        </Row>
      )}
    </Grid>
  )
}

function Submission() {

  
  const { userInfo } = useSelector((state) => state.auth);
  let role = userInfo.data.user.role;
  console.log("Role:", role); // Log the role to check its value
  if(role === "teacher"){
    return teacherView();
  }else{
    return studentView();
  }
  
}

export default Submission;
