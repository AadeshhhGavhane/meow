import React, { useState } from "react";
import "../../styles.css";
import { FlexboxGrid, SelectPicker } from "rsuite";
import LinkIcon from "@rsuite/icons/legacy/Link";
import { IconButton, Tooltip, Whisper, ButtonToolbar } from 'rsuite';
import { useNavigate } from "react-router-dom";

const tooltip = (
  <Tooltip>
    This is a help <i>tooltip</i>.
  </Tooltip>
);

const subjects = ["PWP", "MAD", "WBP"].map((item) => ({
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
      return `/public/data/pyqma/${selectedSubject.toLowerCase()}/${selectedYear.toLowerCase()}.pdf`;
    }
    return ""; // Return an empty string if values are not selected
  };

  const handleLinkClick = () => {
    const pdfRoute = createPdfRoute();
    if (pdfRoute) {
      window.open(pdfRoute, '_blank');
    }
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
          <ButtonToolbar>
            <Whisper placement="top" controlId="control-id-hover" trigger="hover" speaker={tooltip}>
              <IconButton
                icon={<LinkIcon />}
                style={{ width: "100%" }}
                onClick={handleLinkClick}
                disabled={!createPdfRoute()}
              >
                Link
              </IconButton>
            </Whisper>
          </ButtonToolbar>
        </FlexboxGrid.Item>
      </FlexboxGrid>
    </div>
  );
}

export default Pyqma;