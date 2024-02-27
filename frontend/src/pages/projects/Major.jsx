import React, { useEffect, useState } from "react";
import { Table, Loader } from "rsuite";
import { useSelector } from "react-redux";
import { Grid, Row, Col, Input } from 'rsuite';

const { Column, HeaderCell, Cell } = Table;

function studentView() {
  const { userInfo } = useSelector((state) => state.auth);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  let enrollmentNo = userInfo.data.user.enrollmentNo;

  useEffect(() => {
    fetch("http://localhost:8000/api/v1/users/fetch-major-projects/telegram", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Add any other necessary headers here
      },
      body: JSON.stringify({
        enrollmentNo,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        const projects = data.data;
        const formattedData = Object.keys(projects).map((key) => ({
          subject: key,
          majorProject: projects[key],
        }));
        setData(formattedData);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setIsLoading(false);
      });
  }, []);

  return (
    <div
      style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}
    >
      {isLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "50px",
          }}
        >
          <Loader center size="lg" content="Loading..." vertical />
        </div>
      ) : (
        <Table data={data} height={400} width={600}>
          <Column width={200} align="center">
            <HeaderCell>Subject</HeaderCell>
            <Cell dataKey="subject" />
          </Column>

          <Column width={400} align="center">
            <HeaderCell>Major Project</HeaderCell>
            <Cell dataKey="majorProject" />
          </Column>
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
      <Row justify="center" align="middle">
        <Col
          xs={24}
          sm={18}
          md={16}
          style={{ marginBottom: "10px", textAlign: "center" }}
        >
          <h6>TYCO Major Projects:</h6>
          <Input
            readOnly
            value="https://docs.google.com/spreadsheets/d/1zz3b6wFPQTBoqGGlAtHiE8Ksqp7Pgah198awKkZEPIk"
          />
        </Col>
      </Row>
    </Grid>
  );
}

const Major = () => {
  const { userInfo } = useSelector((state) => state.auth);
  let role = userInfo.data.user.role;
  console.log("Role:", role); // Log the role to check its value
  if(role === "teacher"){
    return teacherView();
  }else{
    return studentView();
  }
};

export default Major;
