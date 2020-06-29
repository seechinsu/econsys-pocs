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

  useEffect(() => {
    if (!branch && !section && data && data['Branches']) {
      setBarData(Object.values(data['Branches']));
    }

    if (branch && !section) {
      setBarData(Object.values(data['Branches'][branch]['Sections']));
    }
    if (section && branch) {
      const sections = Object.values(data['Branches'][branch]['Sections']);

      const curSection = sections.find((sec) => sec['City'] == section);

      console.log('curSection', curSection);

      if (curSection) {
        setBarData(Object.values(curSection['Teams']));
      }
    }
  }, [branch, section]);

  const getHiringData = async () => {
    const { data, columns } = await d3.json('http://localhost:8000/org');

    setColumns(columns);
    setData(data);
    setBarData(Object.values(data['Branches']));
  };

  const keys = [
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
    'City',
  ];

  const handleBarClick = (data) => {
    console.log('handle click data', data);

    if (branch && !section) {
      setSection(data.indexValue);
    }

    if (!branch) {
      setBranch(data.indexValue);
    }
  };

  const breadCrumbBranchSelect = (branch) => {
    console.log('branch', branch);
    setSection(undefined);
    setBranch(branch);
  };

  const breadCrumbDivisionSelect = () => {
    setSection(undefined);
    setBranch(undefined);
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
              <a href='#' onClick={() => breadCrumbDivisionSelect()}>
                Staffing Division
              </a>
            </BreadcrumbItem>
            {branch ? (
              <BreadcrumbItem>
                <a href='#' onClick={() => breadCrumbBranchSelect(branch)}>
                  {branch}
                </a>
              </BreadcrumbItem>
            ) : undefined}
            {section ? <BreadcrumbItem>{section}</BreadcrumbItem> : undefined}
          </Breadcrumb>
        </Col>
      </Row>
      <Row style={{ height: '600px' }}>
        <Col sm={12}>
          <BarChart
            layout='horizontal'
            margin={{ top: -40, right: 250, bottom: 95, left: 175 }}
            indexBy='City'
            data={barData}
            keys={keys}
            axisLeftLegendOffset={-145}
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
