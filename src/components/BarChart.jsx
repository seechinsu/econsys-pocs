import React from 'react';
import { ResponsiveBar } from '@nivo/bar';

const placeholderKeys = [
  'hot dog',
  'burger',
  'sandwich',
  'kebab',
  'fries',
  'donut',
];

const placeholderData = [
  {
    country: 'AD',
    'hot dog': 174,
    'hot dogColor': 'hsl(213, 70%, 50%)',
    burger: 60,
    burgerColor: 'hsl(192, 70%, 50%)',
    sandwich: 191,
    sandwichColor: 'hsl(174, 70%, 50%)',
    kebab: 127,
    kebabColor: 'hsl(323, 70%, 50%)',
    fries: 184,
    friesColor: 'hsl(327, 70%, 50%)',
    donut: 11,
    donutColor: 'hsl(32, 70%, 50%)',
  },
  {
    country: 'AE',
    'hot dog': 12,
    'hot dogColor': 'hsl(182, 70%, 50%)',
    burger: 127,
    burgerColor: 'hsl(122, 70%, 50%)',
    sandwich: 39,
    sandwichColor: 'hsl(80, 70%, 50%)',
    kebab: 35,
    kebabColor: 'hsl(74, 70%, 50%)',
    fries: 36,
    friesColor: 'hsl(24, 70%, 50%)',
    donut: 84,
    donutColor: 'hsl(95, 70%, 50%)',
  },
  {
    country: 'AF',
    'hot dog': 140,
    'hot dogColor': 'hsl(204, 70%, 50%)',
    burger: 185,
    burgerColor: 'hsl(45, 70%, 50%)',
    sandwich: 93,
    sandwichColor: 'hsl(3, 70%, 50%)',
    kebab: 191,
    kebabColor: 'hsl(76, 70%, 50%)',
    fries: 54,
    friesColor: 'hsl(185, 70%, 50%)',
    donut: 134,
    donutColor: 'hsl(112, 70%, 50%)',
  },
  {
    country: 'AG',
    'hot dog': 87,
    'hot dogColor': 'hsl(330, 70%, 50%)',
    burger: 76,
    burgerColor: 'hsl(33, 70%, 50%)',
    sandwich: 4,
    sandwichColor: 'hsl(250, 70%, 50%)',
    kebab: 124,
    kebabColor: 'hsl(46, 70%, 50%)',
    fries: 47,
    friesColor: 'hsl(276, 70%, 50%)',
    donut: 102,
    donutColor: 'hsl(4, 70%, 50%)',
  },
  {
    country: 'AI',
    'hot dog': 186,
    'hot dogColor': 'hsl(151, 70%, 50%)',
    burger: 95,
    burgerColor: 'hsl(20, 70%, 50%)',
    sandwich: 37,
    sandwichColor: 'hsl(103, 70%, 50%)',
    kebab: 114,
    kebabColor: 'hsl(278, 70%, 50%)',
    fries: 140,
    friesColor: 'hsl(294, 70%, 50%)',
    donut: 18,
    donutColor: 'hsl(188, 70%, 50%)',
  },
  {
    country: 'AL',
    'hot dog': 38,
    'hot dogColor': 'hsl(17, 70%, 50%)',
    burger: 139,
    burgerColor: 'hsl(156, 70%, 50%)',
    sandwich: 114,
    sandwichColor: 'hsl(231, 70%, 50%)',
    kebab: 113,
    kebabColor: 'hsl(321, 70%, 50%)',
    fries: 123,
    friesColor: 'hsl(153, 70%, 50%)',
    donut: 116,
    donutColor: 'hsl(137, 70%, 50%)',
  },
  {
    country: 'AM',
    'hot dog': 137,
    'hot dogColor': 'hsl(133, 70%, 50%)',
    burger: 34,
    burgerColor: 'hsl(154, 70%, 50%)',
    sandwich: 192,
    sandwichColor: 'hsl(310, 70%, 50%)',
    kebab: 99,
    kebabColor: 'hsl(137, 70%, 50%)',
    fries: 93,
    friesColor: 'hsl(156, 70%, 50%)',
    donut: 1,
    donutColor: 'hsl(121, 70%, 50%)',
  },
];

const BarChart = ({
  data = placeholderData,
  keys = placeholderKeys,
  layout = 'vertical',
  indexBy,
  margin = { top: 10, right: 100, bottom: 75, left: 75 },
  axisLeftLegendOffset = 0,
  axisBottomLegend = undefined,
  axisLeftLegend = undefined,
  axisBottomTickRotation = 0,
}) => {
  return (
    <ResponsiveBar
      data={data}
      keys={keys}
      layout={layout}
      indexBy={indexBy}
      margin={margin}
      padding={0.45}
      colors={{ scheme: 'paired' }}
      borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
      axisTop={null}
      axisRight={null}
      onClick={(data) => console.log(data)}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: axisBottomTickRotation,
        legend: axisBottomLegend,
        legendPosition: 'middle',
        legendOffset: 45,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: axisLeftLegend,
        legendPosition: 'middle',
        legendOffset: axisLeftLegendOffset,
      }}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
      legends={[
        {
          dataFrom: 'keys',
          anchor: 'right',
          direction: 'column',
          justify: false,
          translateX: 110,
          translateY: 0,
          itemsSpacing: 2,
          itemWidth: 100,
          itemHeight: 20,
          itemDirection: 'left-to-right',
          itemOpacity: 0.85,
          symbolSize: 20,
          effects: [
            {
              on: 'hover',
              style: {
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
      animate={true}
      motionStiffness={90}
      motionDamping={15}
    />
  );
};

export default BarChart;
