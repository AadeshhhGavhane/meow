import React, { useState, useEffect } from "react";
import "../../styles.css";
import { Stack, FlexboxGrid, Table, SelectPicker, Loader } from "rsuite";
import { Grid, Row, Col } from 'rsuite';
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { Input } from 'rsuite';

const tests = ["UT1", "UT2"].map((item) => ({
  label: item,
  value: item,
}));

function studentView() {
  const { userInfo } = useSelector((state) => state.auth);
  const [selectedTest, setSelectedTest] = useState(null);
  const [marksData, setMarksData] = useState([]);
  const [loading, setLoading] = useState(false);
  let enrollmentNo = userInfo.data.user.enrollmentNo;

  useEffect(() => {
    if (selectedTest) {
      fetchMarks(selectedTest);
    } else {
      // Reset marksData when selectedTest is cleared
      setMarksData([]);
    }
  }, [selectedTest]);

  const fetchMarks = async (test) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/users/fetch-marks/telegram",
        { enrollmentNo: enrollmentNo }
      );
      const data = response.data;
      if (data.success) {
        setMarksData(data.data[test.toLowerCase()]);
      } else {
        console.error("Error fetching marks:", data.message);
      }
    } catch (error) {
      console.error("Error fetching marks:", error);
    } finally {
      setLoading(false);
    }
  };

  const columns = Object.keys(marksData).map((key) => ({
    key,
    name: key,
  }));
  return (
    <div>
      <h3 style={{ margin: "20px 10px" }}>Choose the Test</h3>
      <FlexboxGrid justify="center">
        <FlexboxGrid.Item colspan={6} style={{ margin: "20px 10px" }}>
          <SelectPicker
            placeholder="Test"
            data={tests}
            value={selectedTest}
            onChange={(value) => setSelectedTest(value)}
            style={{ width: "100%" }}
            cleanable={true} // Allow clearing the selection
          />
        </FlexboxGrid.Item>
      </FlexboxGrid>
      {loading ? (
        <Loader center content="Please wait..." />
      ) : (
        <Table
          height={86}
          data={[marksData]}
          bordered
          cellBordered
          onSortColumn={(sortColumn, sortType) => {
            console.log(sortColumn, sortType);
          }}
        >
          {columns.map((column) => (
            <Table.Column key={column.key} flexGrow={1}>
              <Table.HeaderCell>{column.name}</Table.HeaderCell>
              <Table.Cell dataKey={column.key} />
            </Table.Column>
          ))}
        </Table>
      )}
    </div>
  );
}

function teacherView() {
  const { userInfo } = useSelector((state) => state.auth);
  let teacher = userInfo.data.user.className;

  return (
    <Grid style={{ marginTop: "50px" }}>
      {teacher.includes("TYCO") && (
        <Row justify="center" align="middle">
          <Col xs={24} sm={18} md={16} style={{ marginBottom: '10px', textAlign: 'center' }}>
            <h6>TYCO:</h6>
            <Input readOnly value="https://docs.google.com/spreadsheets/d/1B1_H-S3QhooLQzk65XqEmoY7_qkAna6H-uuz9ZhbOIM" />
          </Col>
        </Row>
      )}
      {teacher.includes("SYCO") && (
        <Row justify="center" align="middle">
          <Col xs={24} sm={18} md={16} style={{ marginBottom: '10px', textAlign: 'center' }}>
            <h6>SYCO:</h6>
            <Input readOnly value="https://docs.google.com/spreadsheets/d/1oAThzs7OGJnszZeg0WtP1kbrTsIV8zc-kVHmkOoLqjY" />
          </Col>
        </Row>
      )}
      {teacher.includes("FYCO") && (
        <Row justify="center" align="middle">
          <Col xs={24} sm={18} md={16} style={{ marginBottom: '10px', textAlign: 'center' }}>
            <h6>FYCO:</h6>
            <Input readOnly value="https://docs.google.com/spreadsheets/d/1qQavOAOz5JMkER_KNrnEA13JHrf3Buyzx9FcqITESUE" />
          </Col>
        </Row>
      )}
    </Grid>
  );
}


const Marks = () => {
  const { userInfo } = useSelector((state) => state.auth);
  let role = userInfo.data.user.role;
  console.log("Role:", role); // Log the role to check its value
  if(role === "teacher"){
    return teacherView();
  }else{
    return studentView();
  }
};

export default Marks;
