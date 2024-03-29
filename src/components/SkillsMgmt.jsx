import React, { useState, useEffect } from "react";
import { Row, Col, Container } from "reactstrap";
import * as d3 from "d3";
import "regenerator-runtime/runtime";

import RadarChart from "./charts/RadarChart";
import DataGrid from "./DataGrid";

const SkillsMgmt = () => {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  useEffect(() => {
    getSkillData();
  }, []);

  const getSkillData = async () => {
    const { data, columns } = await d3.json("http://localhost:8000/skill");

    setColumns(columns);
    setData(data);
  };

  //   {
  //       "employeeName": "derek",
  //         "coding": 90,
  //         "testing": 75,
  //         "infrastructure": 60,
  //         "project management": 30,
  //         "requirements gathering": 30,
  //         "customer support": 40
  //     }

  //   {
  //     skill: "customer support",
  //     derek: 77,
  //     sam: 67,
  //     tom: 99,
  //     pete: 55,
  //   },

  const getRadarData = () => {
    if (selectedRows.length) {
      //   console.log("data", data);
      return columns
        .filter((col) => !col.includes("employee"))
        .map((col) => {
          return selectedRows.reduce(
            (acc, emp) => {
              console.log("emp", emp);
              return {
                [emp["employeeName"]]: emp[col],
                ...acc,
              };
            },
            { skill: col }
          );
        });
    }

    return selectedRows;
  };

  const getRadarKeys = () => {
    return selectedRows.length
      ? selectedRows.map((value) => value.employeeName)
      : [];
  };

  return (
    <Container fluid>
      <Row style={{ height: "400px" }}>
        <Col sm={12}>
          <RadarChart data={getRadarData()} keys={getRadarKeys()} />
        </Col>
      </Row>
      <Row>
        <Col sm={12}>
          <DataGrid
            widthProp={960}
            heightProp={300}
            columns={columns}
            data={data}
            rowSelection="multiple"
            updateSelectedRows={(rows) => setSelectedRows(rows)}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default SkillsMgmt;
