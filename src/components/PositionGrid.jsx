import React, { useState } from "react";
import GridLayout, { WidthProvider } from "react-grid-layout";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardText,
  Button,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

import "./PositionGrid.css";
import DataGrid from "./DataGrid";

const positions = [
  {
    positionTitle: "Program Analyst",
    positionTitleVariations: [
      "Program Coordinator",
      "Assistant Program Analyst",
      "Program Specialist",
    ],
    series: "3101",
    grades: ["01", "03", "03", "04", "05", "06", "07"],
    vacancies: 15,
    totalPositions: 100,
    classificationDate: "01-01-2020",
    classifiedBy: "Se-Chien Hsu",
  },
  {
    positionTitle: "Program Engineer",
    positionTitleVariations: [
      "Program Coordinator",
      "Assistant Program Analyst",
      "Program Specialist",
    ],
    series: "4111",
    grades: ["13", "14", "15"],
    vacancies: 10,
    totalPositions: 90,
    classificationDate: "01-01-2020",
    classifiedBy: "Se-Chien Hsu",
  },
  {
    positionTitle: "Data Analyst",
    positionTitleVariations: [
      "Program Coordinator",
      "Assistant Program Analyst",
      "Program Specialist",
    ],
    series: "1101",
    grades: ["01", "02", "03"],
    vacancies: 3,
    totalPositions: 20,
    classificationDate: "01-01-2020",
    classifiedBy: "Se-Chien Hsu",
  },
  {
    positionTitle: "Project Manager",
    positionTitleVariations: [
      "Program Coordinator",
      "Assistant Program Analyst",
      "Program Specialist",
    ],
    series: "1201",
    grades: ["04", "05", "06"],
    vacancies: 7,
    totalPositions: 30,
    classificationDate: "01-01-2020",
    classifiedBy: "Se-Chien Hsu",
  },
  {
    positionTitle: "Security Analyst",
    positionTitleVariations: [
      "Program Coordinator",
      "Assistant Program Analyst",
      "Program Specialist",
    ],
    series: "0030",
    grades: ["02", "03", "04", "05"],
    vacancies: 10,
    totalPositions: 50,
    classificationDate: "01-01-2020",
    classifiedBy: "Se-Chien Hsu",
  },
];

const DropDown = ({ dropdownOpen, toggle, sortPositions }) => (
  <Dropdown isOpen={dropdownOpen} toggle={toggle} style={{ margin: "10px" }}>
    <DropdownToggle color="primary" caret>
      Sort By
    </DropdownToggle>
    <DropdownMenu>
      <DropdownItem onClick={() => sortPositions("desc")}>
        Num Positions Descending
      </DropdownItem>
      <DropdownItem onClick={() => sortPositions("asc")}>
        Num Position Ascending
      </DropdownItem>
    </DropdownMenu>
  </Dropdown>
);

const GridLayoutWithWidth = WidthProvider(GridLayout);

const PositionCard = ({
  positionTitle,
  positionTitleVariations,
  series,
  grades,
  vacancies,
  totalPositions,
  classificationDate,
  classifiedBy,
}) => (
  <Card>
    <CardHeader>{positionTitle}</CardHeader>
    <CardBody>
      <CardTitle style={{ fontSize: "12px" }}>
        <strong>Position Title Variations:</strong>{" "}
        {positionTitleVariations.join(", ")}
      </CardTitle>
      <CardText>
        <p>
          <strong>Series:</strong> {series}
        </p>
        <p>
          <strong>Grades:</strong> {grades.join(", ")}
        </p>
        <p>
          <strong>Total Positions: {totalPositions}</strong>
        </p>
        <p>
          <strong>Filled Positions:</strong> {totalPositions - vacancies}
        </p>
        <p>
          <strong>Vacancies:</strong> {vacancies}
        </p>
        <p>
          <strong>Classification Date:</strong> {classificationDate}
        </p>
        <p>
          <strong>Classified By:</strong> {classifiedBy}
        </p>
      </CardText>
      <Row>
        <Col style={{ textAlign: "right" }}>
          <Button>View Positions</Button>
        </Col>
      </Row>
    </CardBody>
  </Card>
);

const PositionGrid = () => {
  const [dropdownOpen, setdropdownOpen] = useState(false);
  const [sortedPositions, setSortedPositions] = useState(positions);

  const sortPositions = (order) => {
    const sorted =
      order === "asc"
        ? [...positions].sort((a, b) => a.totalPositions - b.totalPositions)
        : [...positions].sort((a, b) => b.totalPositions - a.totalPositions);

    setSortedPositions(sorted);
  };

  // layout is an array of objects, see the demo for more complete usage
  const layout = [
    { i: "position1", x: 0, y: 0, w: 3, h: 9, isResizable: false },
    { i: "position2", x: 3, y: 0, w: 3, h: 9, isResizable: false },
    { i: "position3", x: 6, y: 0, w: 3, h: 9, isResizable: false },
    { i: "position4", x: 9, y: 0, w: 3, h: 9, isResizable: false },
    { i: "position5", x: 0, y: 8, w: 3, h: 9, isResizable: false },
    // { i: "position6", x: 3, y: 8, w: 3, h: 8, isResizable: false },
    // { i: "position7", x: 6, y: 8, w: 3, h: 8, isResizable: false },
    // { i: "position8", x: 9, y: 8, w: 3, h: 8, isResizable: false },
  ];

  return (
    <Container fluid>
      <Row>
        <Col sm={12} style={{ textAlign: "right" }}>
          <DropDown
            dropdownOpen={dropdownOpen}
            toggle={() => setdropdownOpen(!dropdownOpen)}
            sortPositions={(order) => sortPositions(order)}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <GridLayoutWithWidth
            className="layout"
            layout={layout}
            cols={12}
            rowHeight={30}
            measureBeforeMount>
            {sortedPositions.map((pos, index) => (
              <div key={`position${index + 1}`}>
                <PositionCard {...pos} />
              </div>
            ))}
          </GridLayoutWithWidth>{" "}
        </Col>
      </Row>
    </Container>
  );
};

export default PositionGrid;
