import React, { useState } from "react";
import { FlexboxGrid, SelectPicker } from "rsuite";
import { Link } from "react-router-dom";
import LinkIcon from "@rsuite/icons/legacy/Link";
import { IconButton, Tooltip, Whisper, Button, ButtonToolbar } from 'rsuite';

const subjects = ["PWP","MAD","WBP"].map((item) => ({
  label: item,
  value: item,
}));

function Syllabus() {
  const [selectedSubject, setSelectedSubject] = useState(null);

  const createPdfRoute = () => {
    if (selectedSubject) {
      return `/public/data/syllabus/${selectedSubject.toLowerCase()}.pdf`;
    }
    return "";
  };

  const tooltip = (
    <Tooltip>
      Please Select the Subject
    </Tooltip>
  );

  const handleLinkClick = () => {
    const pdfRoute = createPdfRoute();
    if (pdfRoute) {
      window.open(pdfRoute, '_blank');
    }
  };

  return (
    <div>
      <h3 style={{ margin: "20px 10px" }}>
        Choose Your Subject For Syllabus
      </h3>
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
          <ButtonToolbar>
            {selectedSubject ? (
              <IconButton
                icon={<LinkIcon />}
                style={{ width: "100%" }}
                onClick={handleLinkClick}
                disabled={!createPdfRoute()}
              >
                Link
              </IconButton>
            ) : (
              <Whisper placement="top" controlId="control-id-hover" trigger="hover" speaker={tooltip}>
                <IconButton
                  icon={<LinkIcon />}
                  style={{ width: "100%" }}
                  disabled={!createPdfRoute()}
                >
                  Link
                </IconButton>
              </Whisper>
            )}
          </ButtonToolbar>
        </FlexboxGrid.Item>
      </FlexboxGrid>
    </div>
  );
}

export default Syllabus;