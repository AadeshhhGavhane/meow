import React, { useState, useEffect } from "react";
import { FlexboxGrid, Panel } from "rsuite";
import { IconButton, ButtonToolbar, ButtonGroup } from "rsuite";
import { Icon } from "@rsuite/icons";
import { MdPlayArrow } from "react-icons/md";
import "../styles.css";

function Homepage() {
  const [weather, setWeather] = useState(null);
  const [weatherIcon, setWeatherIcon] = useState(null);

  useEffect(() => {
    fetchWeather();
  }, []);

  const fetchWeather = async () => {
    try {
      const response = await fetch(
        "http://api.weatherapi.com/v1/current.json?key=93490d6be62c4b71a72151146242602&q=Thane, Maharashtra&aqi=no"
      );
      if (response.ok) {
        const data = await response.json();
        setWeather(data.current.temp_c);
        setWeatherIcon(data.current.condition.icon);
      } else {
        console.error("Failed to fetch weather data:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching weather data:", error.message);
    }
  };

  return (
    <>
      <FlexboxGrid justify="center" style={{ marginTop: 50 }}>
        <FlexboxGrid.Item>
          <h1>VPM-X | Streamlined Education & Collaboration.</h1>
          <h4>For Students, By Students.</h4>
        </FlexboxGrid.Item>
      </FlexboxGrid>

      <FlexboxGrid justify="center" style={{ marginTop: 20 }}>
        <FlexboxGrid.Item colspan={20}>
          <Panel bordered>
            <p>
              <strong>Weather in Thane, Maharashtra, India:</strong>
            </p>
            <div style={{ display: "flex", alignItems: "center" }}>
              {weatherIcon && (
                <img
                  src={`http:${weatherIcon}`}
                  alt="Weather Icon"
                  style={{ marginRight: 10 }}
                />
              )}
              <h2 style={{ fontSize: 36, fontWeight: "bold" }}>{weather}°C</h2>
            </div>

          </Panel>
        </FlexboxGrid.Item>
      </FlexboxGrid>
    </>
  );
}

export default Homepage;
