import React from "react";
import { useState } from "react";
import "../../styles.css";
import { FlexboxGrid, Panel } from "rsuite";
import { SelectPicker } from "rsuite";
import { Link } from "react-router-dom";
import LinkIcon from "@rsuite/icons/legacy/Link";
import { IconButton } from "rsuite";

const tests = ["UT1", "UT2", "WIN", "SUM"].map((item) => ({
  label: item,
  value: item,
}));

// Import the Table component from 'rsuite'
import { Table } from "rsuite";

// Your custom data (replace this with your own data)
const UT1M = [
  {
    AJP: "19",
    EST: "18",
    OSY: "17",
    STE: "16",
    CSS: "15",
  },
];

const UT2M = [
  {
    AJP: "20",
    EST: "15",
    OSY: "18",
    STE: "16",
    CSS: "15",
  }
];

const WINM = [
  {
    AJP: "70",
    EST: "45",
    OSY: "65",
    STE: "65",
    CSS: "15",
  }
];

const SUMM = [
  {
    AJP: "17",
    EST: "45",
    OSY: "17",
    STE: "16",
    CSS: "15",
  }
];

const { Column, HeaderCell, Cell } = Table;

function Marks() {
  const checkTest = () => {
    if (selectedTest==="UT1") {
      return UT1M
    }
    if (selectedTest==="UT2") {
      return UT2M
    }
    if (selectedTest==="WIN") {
      return WINM
    }
    if (selectedTest==="SUM") {
      return SUMM
    }
    return "";
  };
  const [selectedTest, setSelectedTest] = useState(null);

  return (
    <>
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
            />
          </FlexboxGrid.Item>
        </FlexboxGrid>
        <Table
          height={86}
          data={checkTest}
          bordered
          cellBordered
          onSortColumn={(sortColumn, sortType) => {
            console.log(sortColumn, sortType);
          }}
        >
          <Column flexGrow={1}>
            <HeaderCell>AJP</HeaderCell>
            <Cell dataKey="AJP" />
          </Column>

          <Column flexGrow={1}>
            <HeaderCell>EST</HeaderCell>
            <Cell dataKey="EST" />
          </Column>

          <Column flexGrow={1}>
            <HeaderCell>OSY</HeaderCell>
            <Cell dataKey="OSY" />
          </Column>

          <Column flexGrow={1}>
            <HeaderCell>CSS</HeaderCell>
            <Cell dataKey="CSS" />
          </Column>

          <Column flexGrow={1}>
            <HeaderCell>STE</HeaderCell>
            <Cell dataKey="STE" />
          </Column>
        </Table>
      </div>
    </>
  );
}

export default Marks;
