import React from "react";
import { ResponsiveRadar } from "@nivo/radar";

const placeholderData = [
  {
    skill: "coding",
    derek: 53,
    sam: 29,
    tom: 106,
    pete: 75,
  },
  {
    skill: "testing",
    derek: 59,
    sam: 98,
    tom: 97,
    pete: 86,
  },
  {
    skill: "infrastructure",
    derek: 59,
    sam: 98,
    tom: 97,
    pete: 45,
  },
  {
    skill: "project management",
    derek: 59,
    sam: 98,
    tom: 97,
    pete: 35,
  },
  {
    skill: "requirements gathering",
    derek: 59,
    sam: 98,
    tom: 97,
    pete: 55,
  },
  {
    skill: "customer support",
    derek: 77,
    sam: 67,
    tom: 99,
    pete: 55,
  },
];

const placeholderKeys = ["derek", "sam", "tom", "pete"];

const RadarChart = ({ data = placeholderData, keys = placeholderKeys }) => (
  <ResponsiveRadar
    data={data}
    keys={keys}
    indexBy="skill"
    maxValue="auto"
    margin={{ top: 60, right: 80, bottom: 60, left: 80 }}
    curve="linearClosed"
    borderWidth={2}
    borderColor={{ from: "color" }}
    gridLevels={5}
    gridShape="circular"
    gridLabelOffset={30}
    enableDots={true}
    dotSize={10}
    dotColor={{ theme: "background" }}
    dotBorderWidth={2}
    dotBorderColor={{ from: "color" }}
    enableDotLabel={true}
    dotLabel="value"
    dotLabelYOffset={-12}
    colors={{ scheme: "nivo" }}
    fillOpacity={0.25}
    blendMode="multiply"
    animate={true}
    motionStiffness={90}
    motionDamping={6}
    isInteractive={true}
    legends={[
      {
        anchor: "top-left",
        direction: "column",
        translateX: -50,
        translateY: -40,
        itemWidth: 80,
        itemHeight: 20,
        itemTextColor: "#999",
        symbolSize: 12,
        symbolShape: "circle",
        effects: [
          {
            on: "hover",
            style: {
              itemTextColor: "#000",
            },
          },
        ],
      },
    ]}
  />
);

export default RadarChart;
