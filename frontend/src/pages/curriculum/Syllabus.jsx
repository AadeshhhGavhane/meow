import React, { useState } from "react";
import { FlexboxGrid, SelectPicker } from "rsuite";
import { Link } from "react-router-dom";
import LinkIcon from "@rsuite/icons/legacy/Link";
import { IconButton, Tooltip, Whisper, Button, ButtonToolbar } from 'rsuite';

const subjects = ["AJP", "EST", "OSY", "STE", "CSS"].map((item) => ({
  label: item,
  value: item,
}));

function Syllabus() {
  const [selectedSubject, setSelectedSubject] = useState(null);

  const createPdfRoute = () => {
    if (selectedSubject) {
      return `/pdfs/syllabus/${selectedSubject}.pdf`;
    }
    return "";
  };

  const tooltip = (
    <Tooltip>
      Please Select the Subject
    </Tooltip>
  );

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
          <Link to={createPdfRoute()}>
            <ButtonToolbar>
              {selectedSubject ? (
                <IconButton
                  icon={<LinkIcon />}
                  style={{ width: "100%" }}
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
          </Link>
        </FlexboxGrid.Item>
      </FlexboxGrid>
    </div>
  );
}

export default Syllabus;
