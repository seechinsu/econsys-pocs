import React, { useState, useEffect } from "react";
import { Row, Col, Container } from "reactstrap";
import * as d3 from "d3";
import "regenerator-runtime/runtime";

import BarChart from "./BarChart";

const HiringMgmtOrg = () => {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    getHiringData();
  }, []);

  const getHiringData = async () => {
    const { data, columns } = await d3.json("http://localhost:8000/hiring/org");

    setColumns(columns);
    setData(data);
  };

  const getBarData = () => {
    const getBarDataObject = (initObj) =>
      Object.entries(initObj)
        .filter(
          ([key, value]) =>
            (key.includes("Duration") ||
              key.includes("Position Title") ||
              key.includes("Recruitment")) &&
            !key.includes("Total")
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
            (key) => key.includes(column) && !key.includes("Total")
          )
        : [];

      return keys;
    };

    const barKeys = getBarKeys("Duration");

    return { barData, barKeys };
  };

  return (
    <Container fluid>
      <Row>
        <Col sm={12} style={{ textAlign: "center", marginTop: 5 }}>
          Longest 5 Hiring Durations
        </Col>
      </Row>
      <Row>
        <Col sm={12}>
          <BarChart
            data={getBarData(data).barData}
            keys={getBarData(data).barKeys}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default HiringMgmtOrg;
