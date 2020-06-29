import React, { useState, useEffect } from 'react';
import { Row, Col, Container } from 'reactstrap';
import * as d3 from 'd3';
import 'regenerator-runtime/runtime';

import DataGrid from './DataGrid';
import BarChart from './BarChart';
import PieChart from './PieChart';

const steps = [
  'Pre-Recruitment Process',
  'Recruitment Package Development',
  'Draft Job Opportunity Announcement',
  'Review JOA',
  'Finalize and Post JOA',
  'JOA Open',
  'Review Applicants and Create Cert',
  'Interview and Selection',
  'Tentative Offer',
  'Acceptance',
  'Conduct Checks',
  'Final Offer/ EOD Established',
];

const HiringMgmtPosition = () => {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  useEffect(() => {
    getHiringData();
  }, []);

  const getHiringData = async () => {
    const { data, columns } = await d3.json('http://localhost:8000/position');

    setColumns(columns);
    setData(data);
  };

  const getBarData = () => {
    const getBarDataObject = (initObj) =>
      Object.entries(initObj)
        .filter(
          ([key, value]) =>
            (steps.includes(key) ||
              key.includes('Position Title') ||
              key.includes('Recruitment')) &&
            !key.includes('Total') &&
            !key.includes('Date')
        )
        .reduce((acc, [key, value]) => {
          return { [key]: value, ...acc };
        }, {});

    const barData = data
      .map((initBarObj) => getBarDataObject(initBarObj))
      .slice(0, 5);

    const getBarKeys = (column) => {
      const keys = data.length
        ? Object.keys(data[0]).filter(
            (key) => key.includes(column) && !key.includes('Total')
          )
        : [];

      return keys;
    };

    const barKeys = getBarKeys('Duration');

    console.log('barData', barData);
    console.log('barKeys', barKeys);

    return { barData, barKeys: steps };
  };

  const removeTotal = (data) => {
    if (data) {
      const { total, ...filteredData } = data;
      return filteredData;
    }
    return undefined;
  };

  return (
    <Container fluid>
      <Row>
        <Col sm={6} style={{ textAlign: 'center', marginTop: 5 }}>
          Longest 5 Hiring Durations
        </Col>
      </Row>
      <Row style={{ height: '400px' }}>
        <Col sm={6}>
          <BarChart
            indexBy={(data) => {
              return `${data['Position Title']}-${data['Recruitment Case #']}`;
            }}
            margin={{ top: 10, right: 250, bottom: 75, left: 75 }}
            data={getBarData(data).barData}
            keys={getBarData(data).barKeys}
            axisLeftLegendOffset={-45}
            axisLeftLegend='Duration'
            axisBottomTickRotation={10}
          />
        </Col>
        <Col sm={6}>
          <PieChart data={removeTotal(selectedRows[0])} />
        </Col>
      </Row>
      <Row>
        <Col>
          <DataGrid
            widthProp={960}
            heightProp={300}
            columns={columns}
            data={data}
            rowSelection='single'
            // onRowDoubleClicked={(data) => console.log(data)}
            updateSelectedRows={(rows) => setSelectedRows(rows)}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default HiringMgmtPosition;
