import React, { useState, useEffect } from 'react';
import { Row, Col, Container, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import * as d3 from 'd3';
import 'regenerator-runtime/runtime';

import BarChart from './BarChart';
import { Column } from 'ag-grid-community';

const HiringMgmtOrg = () => {
  const [data, setData] = useState([]);
  const [barData, setBarData] = useState([]);
  const [branch, setBranch] = useState();
  const [section, setSection] = useState();
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    getHiringData();
  }, []);

  const getHiringData = async () => {
    const { data, columns } = await d3.json('http://localhost:8000/org');

    setColumns(columns);
    setData(data);
    setBarData(Object.values(data['Branches']));
  };

  const keys = [
    'Duration1',
    'Duration2',
    'Duration3',
    'Duration4',
    'Duration5',
    'Duration6',
    'Duration7',
    'Duration8',
    'Duration9',
    'Duration10',
    'Duration11',
    'Duration12',
    'City',
  ];

  const updateBarData = (selectedBranch) => {
    console.log('updating bar data', selectedBranch);
    if (!branch && selectedBranch) {
      setBarData(Object.values(data['Branches'][selectedBranch]['Sections']));
    }
  };

  const handleBarClick = (data) => {
    console.log('handle click data', data);

    branch ? setSection(data.indexValue) : setBranch(data.indexValue);
    updateBarData(data.indexValue);
  };

  const breadCrumbBranchSelect = (branch) => {
    console.log('branch', branch);
    setSection(undefined);
    updateBarData(branch);
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
              <a href='/hiring/org'>Staffing Division</a>
            </BreadcrumbItem>
            {branch ? (
              <BreadcrumbItem>
                <a href='#' onClick={() => breadCrumbBranchSelect(branch)}>
                  {branch}
                </a>
              </BreadcrumbItem>
            ) : undefined}
            {section ? (
              <BreadcrumbItem active>{section}</BreadcrumbItem>
            ) : undefined}
          </Breadcrumb>
        </Col>
      </Row>
      <Row style={{ height: '600px' }}>
        <Col sm={12}>
          <BarChart
            layout='horizontal'
            margin={{ top: -40, right: 130, bottom: 95, left: 125 }}
            indexBy='City'
            data={barData}
            keys={keys}
            axisLeftLegendOffset={-85}
            axisBottomLegend='Average Duration'
            axisLeftLegend='Organization'
            handleBarClick={(data) => handleBarClick(data)}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default HiringMgmtOrg;
