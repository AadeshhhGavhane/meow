import { useState } from "react";
import "../../styles.css";
import { FlexboxGrid, Panel } from "rsuite";
import { SelectPicker } from "rsuite";
import { Link } from "react-router-dom";
import LinkIcon from "@rsuite/icons/legacy/Link";
import { IconButton } from "rsuite";

const subjects = ["AJP", "EST", "OSY", "STE", "CSS"].map((item) => ({
  label: item,
  value: item,
}));
const year = ["Sum22", "Win22", "Sum21", "Win21"].map((item) => ({
  label: item,
  value: item,
}));

function Pyqma() {
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);

  const createPdfRoute = () => {
    if (selectedSubject && selectedYear) {
      // Construct the PDF route based on selected values
      return `/pdfs/pyqma/${selectedSubject}_${selectedYear}.pdf`;
    }
    return ""; // Return an empty string if values are not selected
  };

  return (
    <div>
      <h3 style={{ margin: "20px 10px" }}>Choose Your Subject and The Year</h3>
      <FlexboxGrid justify="start">
        <FlexboxGrid.Item colspan={6} style={{ margin: "20px 10px" }}>
          <SelectPicker
            placeholder="Subject"
            data={subjects}
            value={selectedSubject}
            onChange={(value) => setSelectedSubject(value)}
            style={{ width: "100%" }}
          />
        </FlexboxGrid.Item>
        <FlexboxGrid.Item colspan={6} style={{ margin: "20px 10px" }}>
          <SelectPicker
            placeholder="Year"
            data={year}
            value={selectedYear}
            onChange={(value) => setSelectedYear(value)}
            style={{ width: "100%" }}
          />
        </FlexboxGrid.Item>
        <FlexboxGrid.Item colspan={6} style={{ margin: "20px 10px" }}>
          <Link to={createPdfRoute()}>
            <IconButton
              icon={<LinkIcon />}
              style={{ width: "100%" }}
              disabled={!createPdfRoute()}
            >
              Link
            </IconButton>
          </Link>
        </FlexboxGrid.Item>
      </FlexboxGrid>
    </div>
  );
}

export default Pyqma;
