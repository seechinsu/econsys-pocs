import React from "react";
import { ResponsivePie } from "@nivo/pie";

const steps = [
  "Pre-Recruitment Process",
  "Recruitment Package Development",
  "Draft Job Opportunity Announcement",
  "Review JOA",
  "Finalize and Post JOA",
  "JOA Open",
  "Review Applicants and Create Cert",
  "Interview and Selection",
  "Tentative Offer",
  "Acceptance",
  "Conduct Checks",
  "Final Offer/ EOD Established",
];

const placeholderData = [
  {
    id: "haskell",
    label: "haskell",
    value: 584,
    color: "hsl(334, 70%, 50%)",
  },
  {
    id: "c",
    label: "c",
    value: 259,
    color: "hsl(65, 70%, 50%)",
  },
  {
    id: "css",
    label: "css",
    value: 472,
    color: "hsl(159, 70%, 50%)",
  },
  {
    id: "javascript",
    label: "javascript",
    value: 530,
    color: "hsl(175, 70%, 50%)",
  },
  {
    id: "erlang",
    label: "erlang",
    value: 189,
    color: "hsl(325, 70%, 50%)",
  },
];

const PieChart = ({ data = placeholderData }) => {
  const pieData = Object.entries(data)
    .filter(
      ([key, value]) =>
        steps.includes(key) && !key.includes("Total") && !key.includes("Date")
    )
    .reduce((acc, [key, value]) => {
      return [{ id: key, label: key, value }, ...acc];
    }, []);

  return (
    <ResponsivePie
      data={pieData.length ? pieData : placeholderData}
      margin={{ top: 40, right: 300, bottom: 80, left: 40 }}
      innerRadius={0.65}
      padAngle={1}
      colors={{ scheme: "accent" }}
      borderWidth={1}
      borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
      enableRadialLabels={false}
      radialLabelsSkipAngle={10}
      radialLabelsTextXOffset={6}
      radialLabelsTextColor="#333333"
      radialLabelsLinkOffset={0}
      radialLabelsLinkDiagonalLength={5}
      radialLabelsLinkHorizontalLength={10}
      radialLabelsLinkStrokeWidth={1}
      radialLabelsLinkColor={{ from: "color" }}
      slicesLabelsSkipAngle={10}
      slicesLabelsTextColor="#333333"
      animate={true}
      motionStiffness={90}
      motionDamping={15}
      legends={[
        {
          anchor: "right",
          direction: "column",
          translateY: 0,
          translateX: 100,
          itemWidth: 100,
          itemHeight: 18,
          itemsSpacing: 2,
          itemTextColor: "#999",
          symbolSize: 18,
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
};

export default PieChart;
