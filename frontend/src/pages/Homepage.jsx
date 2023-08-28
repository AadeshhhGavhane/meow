import React from "react";
import { DatePicker, Stack } from "rsuite";
import { FlexboxGrid, Panel } from "rsuite";
import { Input, InputGroup } from "rsuite";
import { SelectPicker } from "rsuite";
import { IconButton, ButtonToolbar, ButtonGroup } from "rsuite";
import PlayIcon from "@rsuite/icons/legacy/Play";

import "../styles.css";
import FlexboxGridItem from "rsuite/esm/FlexboxGrid/FlexboxGridItem";
function Homepage() {
  const data = ["Journey", "Return"].map((item) => ({
    label: item,
    value: item,
  }));
  return (
    <>
      <FlexboxGrid justify="center" style={{ marginTop: 50 }}>
        <FlexboxGrid.Item>
          <h1>Welcome to meow meow Dashboard!!!</h1>
        </FlexboxGrid.Item>
      </FlexboxGrid>

      <FlexboxGrid justify="center" style={{ marginTop: 50 }}>
        <FlexboxGrid.Item>
          <h4>Weather : 26</h4>
        </FlexboxGrid.Item>
      </FlexboxGrid>
    </>
  );
}

export default Homepage;
