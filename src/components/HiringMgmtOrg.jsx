import React, { useState, useEffect } from 'react';
import { Row, Col, Container, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import * as d3 from 'd3';
import 'regenerator-runtime/runtime';

import BarChart from './BarChart';
import { Column } from 'ag-grid-community';

const HiringMgmtOrg = () => {
  const [data, setData] = useState([]);
  const [level, setLevel] = useState(0);
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    getHiringData();
  }, []);

  const getHiringData = async () => {
    const { data, columns } = await d3.json('http://localhost:8000/org');

    setColumns(columns);
    setData(data);
  };

  const getBarData = () => {
    const getBarDataObject = (initObj) =>
      Object.entries(initObj)
        .filter(
          ([key, value]) =>
            (key.includes('Duration') || key.includes('Organization')) &&
            !key.includes('Total')
        )
        .reduce((acc, [key, value]) => {
          return { [key]: value, ...acc };
        }, {});

    const barData = data.map((initBarObj) => getBarDataObject(initBarObj));

    const getBarKeys = (column) => {
      const keys = data.length
        ? Object.keys(data[0]).filter(
            (key) => key.includes(column) && !key.includes('Total')
          )
        : [];

      return keys;
    };

    const barKeys = getBarKeys('Duration');

    console.log(barData);

    console.log(barKeys);

    return { barData, barKeys };
  };

  return (
    <Container fluid>
      <Row
        style={{
          marginLeft: '200px',
          marginRight: '200px',
          marginTop: '20px',
        }}>
        <Col sm={12}>
          <Breadcrumb>
            <BreadcrumbItem>
              <a href='#'>Division</a>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <a href='#'>Branch</a>
            </BreadcrumbItem>
            <BreadcrumbItem active>Section</BreadcrumbItem>
          </Breadcrumb>
        </Col>
      </Row>
      <Row style={{ height: '600px' }}>
        <Col sm={12}>
          <BarChart
            layout='horizontal'
            margin={{ top: -40, right: 130, bottom: 95, left: 125 }}
            indexBy='Organization Level 1'
            data={getBarData(data).barData}
            keys={getBarData(data).barKeys}
            axisLeftLegendOffset={-85}
            axisBottomLegend='Average Duration'
            axisLeftLegend='Organization'
          />
        </Col>
      </Row>
    </Container>
  );
};

export default HiringMgmtOrg;
