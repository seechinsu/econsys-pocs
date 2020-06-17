import React from "react";
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
} from "reactstrap";

import "./PositionGrid.css";

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
  // layout is an array of objects, see the demo for more complete usage
  const layout = [
    { i: "position1", x: 0, y: 0, w: 3, h: 8, isResizable: false },
    { i: "position2", x: 3, y: 0, w: 3, h: 8, isResizable: false },
    { i: "position3", x: 6, y: 0, w: 3, h: 8, isResizable: false },
    { i: "position4", x: 9, y: 0, w: 3, h: 8, isResizable: false },
    { i: "position5", x: 0, y: 8, w: 3, h: 8, isResizable: false },
    { i: "position6", x: 3, y: 8, w: 3, h: 8, isResizable: false },
    { i: "position7", x: 6, y: 8, w: 3, h: 8, isResizable: false },
    { i: "position8", x: 9, y: 8, w: 3, h: 8, isResizable: false },
  ];

  const position = {
    positionTitle: "Program Analyst",
    positionTitleVariations: [
      "Program Coordinator",
      "Assistant Program Analyst",
      "Program Specialist",
    ],
    series: "1101",
    grades: ["01", "02", "03"],
    vacancies: 10,
    totalPositions: 30,
    classificationDate: "01-01-2020",
    classifiedBy: "Se-Chien Hsu",
  };

  return (
    <Container fluid>
      <Row>
        <Col>
          <GridLayoutWithWidth
            className="layout"
            layout={layout}
            cols={12}
            rowHeight={30}
            measureBeforeMount>
            <div key="position1">
              <PositionCard {...position} />
            </div>
            <div key="position2">
              <PositionCard {...position} />
            </div>
            <div key="position3">
              <PositionCard {...position} />
            </div>
            <div key="position4">
              <PositionCard {...position} />
            </div>
            <div key="position5">
              <PositionCard {...position} />
            </div>
            <div key="position6">
              <PositionCard {...position} />
            </div>
            <div key="position7">
              <PositionCard {...position} />
            </div>
            <div key="position8">
              <PositionCard {...position} />
            </div>
          </GridLayoutWithWidth>{" "}
        </Col>
      </Row>
    </Container>
  );
};

export default PositionGrid;
