import React, { useState, useEffect } from "react";
import { Row, Col, Container, Breadcrumb, BreadcrumbItem } from "reactstrap";
import "regenerator-runtime/runtime";

import BarChart from "./BarChart";

const PositionsByGrade = () => {
  const [data, setData] = useState([]);
  const [barData, setBarData] = useState([]);

  const [keys, setKeys] = useState([]);
  const [usState, setUsState] = useState();

  useEffect(() => {
    getHiringData();
  }, []);

  useEffect(() => {
    if (!usState) {
      const normalizedData = Object.entries(data).map(([key, value]) => {
        return { STATE: key, ...value };
      });

      setBarData(normalizedData);
    }

    if (usState) {
      const normalizedData = Object.entries(data[usState]["cities"]).map(
        ([key, value]) => {
          return { STATE: key, ...value };
        },
      );

      setBarData(normalizedData);
    }
  }, [usState]);

  const getHiringData = async () => {
    const res = await fetch("http://localhost:8000/fpac");
    const fpacData = await res.json();

    const barDataObj = fpacData.reduce((acc, d) => {
      if (d.STATE in acc) {
        acc[d.STATE][d.GRADE]
          ? (acc[d.STATE][d.GRADE] += 1)
          : (acc[d.STATE][d.GRADE] = 1);

        if (acc[d.STATE]["cities"][d.CITY]) {
          if (acc[d.STATE]["cities"][d.CITY][d.GRADE]) {
            acc[d.STATE]["cities"][d.CITY][d.GRADE] += 1;
          } else {
            acc[d.STATE]["cities"][d.CITY] = {
              ...acc[d.STATE]["cities"][d.CITY],
              [d.GRADE]: 1,
            };
          }
        } else {
          acc[d.STATE]["cities"][d.CITY] = { [d.GRADE]: 1 };
        }

        return acc;
      } else {
        acc[d.STATE] = { [d.GRADE]: 1 };
        acc[d.STATE]["cities"] = { [d.CITY]: { [d.GRADE]: 1 } };
        return acc;
      }
    }, {});

    setData(barDataObj);

    const keys = [...new Set(fpacData.map((d) => d.GRADE))];

    setKeys(keys);
    console.log(`keys`, keys);

    const normalizedData = Object.entries(barDataObj).map(([key, value]) => {
      return { STATE: key, ...value };
    });

    setBarData(normalizedData);
  };

  const handleBarClick = ({ data }) => {
    console.log("handle click data", data);

    if ("cities" in data) {
      setUsState(data.STATE);
    }
  };

  const breadCrumbStateSelect = (usState) => {
    console.log("usState", usState);
    setUsState(usState);
  };

  const breadCrumbBaseSelect = () => {
    setUsState(undefined);
  };

  return (
    <Container fluid>
      <Row
        style={{
          marginLeft: "200px",
          marginRight: "200px",
          marginTop: "20px",
        }}>
        <Col sm={12}>
          <Breadcrumb>
            <BreadcrumbItem>
              <a href="#" onClick={() => breadCrumbBaseSelect()}>
                United States
              </a>
            </BreadcrumbItem>
            {usState ? (
              <BreadcrumbItem>
                <a href="#" onClick={() => breadCrumbStateSelect(usState)}>
                  {usState}
                </a>
              </BreadcrumbItem>
            ) : undefined}
          </Breadcrumb>
        </Col>
      </Row>
      <Row style={{ height: "600px" }}>
        <Col sm={12}>
          <BarChart
            margin={{ top: -40, right: 250, bottom: 95, left: 175 }}
            indexBy="STATE"
            data={barData}
            keys={keys}
            axisLeftLegendOffset={-75}
            axisBottomLegend="Locations"
            axisLeftLegend="Number of Positions"
            handleBarClick={(data) => handleBarClick(data)}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default PositionsByGrade;
