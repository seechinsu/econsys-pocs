import React, { useState, useEffect } from "react";
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
  CardFooter,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Label,
  Input,
} from "reactstrap";

import "./PositionGrid.css";
import DataGrid from "./DataGrid";

const DropDown = ({ dropdownOpen, toggle, sortPositions }) => (
  <Dropdown isOpen={dropdownOpen} toggle={toggle} style={{ margin: "10px" }}>
    <DropdownToggle color="primary" caret>
      Sort By
    </DropdownToggle>
    <DropdownMenu>
      <DropdownItem
        onClick={() =>
          sortPositions({ field: "totalPositions", order: "asc" })
        }>
        Num Position Ascending
      </DropdownItem>
      <DropdownItem
        onClick={() =>
          sortPositions({ field: "totalPositions", order: "desc" })
        }>
        Num Positions Descending
      </DropdownItem>
      <DropdownItem
        onClick={() => sortPositions({ field: "vacancies", order: "asc" })}>
        Num Vacancies Ascending
      </DropdownItem>
      <DropdownItem
        onClick={() => sortPositions({ field: "vacancies", order: "desc" })}>
        Num Vacancies Descending
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
  payPlan,
}) => {
  const [modal, setModal] = useState(false);
  const [budgetCodes, setBudgetCodes] = useState([]);
  const [statusCodes, setStatusCodes] = useState([]);
  const [gradeCodes, setGradeCodes] = useState([]);

  const toggle = () => setModal(!modal);

  useEffect(() => {
    setBudgetCodes(
      Array.from({ length: totalPositions }, () =>
        Math.floor(Math.random() * 1000 + 1),
      ),
    );

    setStatusCodes(
      Array.from({ length: totalPositions }, () =>
        Math.floor(Math.random() * 2 + 1),
      ),
    );

    setGradeCodes(
      Array.from(
        { length: totalPositions },
        () => grades[Math.floor(Math.random() * grades.length)],
      ),
    );
  }, []);

  const data = Array(totalPositions)
    .fill({
      "First Name": "John",
      "Last Name": "Doe",
      "Position Title": positionTitle,
      "Pay Plan": payPlan,
    })
    .map((pos, index) => ({
      ["Status"]: statusCodes[index] === 1 ? "Active" : "Inactive",
      ["Budget Code"]: budgetCodes[index],
      Grade: gradeCodes[index],
      ...pos,
    }));

  const keys = [
    "First Name",
    "Last Name",
    "Position Title",
    "Budget Code",
    "Pay Plan",
    "Status",
    "Grade",
  ];

  return (
    <React.Fragment>
      <Modal isOpen={modal} toggle={toggle} size="lg">
        <ModalHeader toggle={toggle}>{positionTitle}</ModalHeader>
        <ModalBody>
          <Row>
            <Col sm={12}></Col>
          </Row>
          <DataGrid
            widthProp={960}
            heightProp={300}
            columns={keys}
            data={data}
            rowSelection="single"
            onRowDoubleClicked={(data) => console.log(data)}
            updateSelectedRows={(rows) => null}
          />
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
      <Card>
        <CardHeader style={{ fontSize: "14px", fontWeight: "bold" }}>
          {positionTitle}
        </CardHeader>
        <CardBody style={{ height: "230px" }}>
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
        </CardBody>
        <CardFooter style={{ textAlign: "right" }}>
          <Button onClick={toggle}>View Positions</Button>
        </CardFooter>
      </Card>
    </React.Fragment>
  );
};

const searchFields = [
  {
    label: "First Name",
    name: "firstName",
    placeholder: "First",
  },
  {
    label: "Last Name",
    name: "lastName",
    placeholder: "Last",
  },
  {
    label: "Position Title",
    name: "positionTitle",
    placeholder: "Title",
  },
  {
    label: "Budget Code",
    name: "budgetCode",
    placeholder: "Budget Code",
  },
  {
    label: "Pay Plan",
    name: "payPlan",
    placeholder: "Pay Plan",
  },
  {
    label: "Status",
    name: "status",
    placeholder: "Status",
  },
  {
    label: "Grade",
    name: "grade",
    placeholder: "Grade",
  },
];

const initSearchState = searchFields.reduce((acc, field) => {
  return { ...acc, [field]: "" };
}, {});

const PositionGrid = ({ positions }) => {
  const [dropdownOpen, setdropdownOpen] = useState(false);
  const [sortedPositions, setSortedPositions] = useState(positions);
  const [searchParams, setSearchParams] = useState(initSearchState);

  const layout = [];

  for (let index = 0; index < 48; index++) {
    layout.push({
      i: "position" + index,
      x: (index % 3) * 4,
      y: Math.floor(index / 3) * 8,
      w: 4,
      h: 9,
      isDraggable: false,
      isResizable: false,
    });
  }

  console.log(layout);

  const sortPositions = ({ field, order }) => {
    const sorted =
      order === "asc"
        ? [...sortedPositions].sort((a, b) => a[field] - b[field])
        : [...sortedPositions].sort((a, b) => b[field] - a[field]);

    setSortedPositions(sorted);
  };

  const handleSearch = () => {
    const trimmedSearchParams = Object.entries(searchParams).reduce(
      (acc, [k, v]) => {
        return v.trim().length !== 0 ? { ...acc, [k]: v.trim() } : acc;
      },
      {},
    );

    console.log(`trimmedSearchParams`, trimmedSearchParams);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

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
        {searchFields.map((f) => (
          <Col key={`position-${f.name}`}>
            <FormGroup>
              <Label for={f.name}>{f.label}</Label>
              <Input
                type="text"
                name={f.name}
                id={`position-${f.name}`}
                placeholder={f.placeholder}
                value={searchParams[f.name]}
                onKeyDown={handleKeyDown}
                onChange={(e) =>
                  setSearchParams({
                    ...searchParams,
                    [f.name]: e.target.value,
                  })
                }
              />
            </FormGroup>
          </Col>
        ))}
        <Col
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
          }}>
          <FormGroup
            style={{
              display: "flex",
              flexDirection: "inherit",
              justifyContent: "flex-end",
            }}>
            <Button
              type="button"
              color="primary"
              onClick={handleSearch}
              style={{ width: "inherit" }}>
              Search
            </Button>
          </FormGroup>
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
              <div key={`position${index}`}>
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
