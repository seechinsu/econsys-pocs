import React, { useState, useEffect } from 'react';
import GridLayout, { WidthProvider } from 'react-grid-layout';
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
} from 'reactstrap';

import './PositionGrid.css';
import DataGrid from './DataGrid';

const PositionModal = (props) => {
  const { buttonLabel, className } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button color='danger' onClick={toggle}>
        {buttonLabel}
      </Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Modal title</ModalHeader>
        <ModalBody>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </ModalBody>
        <ModalFooter>
          <Button color='primary' onClick={toggle}>
            Do Something
          </Button>{' '}
          <Button color='secondary' onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

const DropDown = ({ dropdownOpen, toggle, sortPositions }) => (
  <Dropdown isOpen={dropdownOpen} toggle={toggle} style={{ margin: '10px' }}>
    <DropdownToggle color='primary' caret>
      Sort By
    </DropdownToggle>
    <DropdownMenu>
      <DropdownItem
        onClick={() =>
          sortPositions({ field: 'totalPositions', order: 'asc' })
        }>
        Num Position Ascending
      </DropdownItem>
      <DropdownItem
        onClick={() =>
          sortPositions({ field: 'totalPositions', order: 'desc' })
        }>
        Num Positions Descending
      </DropdownItem>
      <DropdownItem
        onClick={() => sortPositions({ field: 'vacancies', order: 'asc' })}>
        Num Vacancies Ascending
      </DropdownItem>
      <DropdownItem
        onClick={() => sortPositions({ field: 'vacancies', order: 'desc' })}>
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
  // const [selectedRows, setSelectedRows] = useState([]);
  const [budgetCodes, setBudgetCodes] = useState([]);
  const [statusCodes, setStatusCodes] = useState([]);
  const [gradeCodes, setGradeCodes] = useState([]);

  const toggle = () => setModal(!modal);

  useEffect(() => {
    setBudgetCodes(
      Array.from({ length: totalPositions }, () =>
        Math.floor(Math.random() * 1000 + 1)
      )
    );

    setStatusCodes(
      Array.from({ length: totalPositions }, () =>
        Math.floor(Math.random() * 2 + 1)
      )
    );

    setGradeCodes(
      Array.from(
        { length: totalPositions },
        () => grades[Math.floor(Math.random() * grades.length)]
      )
    );
  }, []);

  const data = Array(totalPositions)
    .fill({
      'First Name': 'John',
      'Last Name': 'Doe',
      'Position Title': positionTitle,
      'Pay Plan': payPlan,
    })
    .map((pos, index) => ({
      ['Status']: statusCodes[index] === 1 ? 'Active' : 'Inactive',
      ['Budget Code']: budgetCodes[index],
      Grade: gradeCodes[index],
      ...pos,
    }));

  const keys = [
    'First Name',
    'Last Name',
    'Position Title',
    'Budget Code',
    'Pay Plan',
    'Status',
    'Grade',
  ];

  return (
    <React.Fragment>
      <Modal isOpen={modal} toggle={toggle} size='lg'>
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
            rowSelection='single'
            onRowDoubleClicked={(data) => console.log(data)}
            updateSelectedRows={(rows) => null}
          />
        </ModalBody>
        <ModalFooter>
          <Button color='secondary' onClick={toggle}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
      <Card>
        <CardHeader style={{ fontSize: '14px', fontWeight: 'bold' }}>
          {positionTitle}
        </CardHeader>
        <CardBody style={{ height: '230px' }}>
          <CardTitle style={{ fontSize: '12px' }}>
            <strong>Position Title Variations:</strong>{' '}
            {positionTitleVariations.join(', ')}
          </CardTitle>
          <CardText>
            <p>
              <strong>Series:</strong> {series}
            </p>
            <p>
              <strong>Grades:</strong> {grades.join(', ')}
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
        <CardFooter style={{ textAlign: 'right' }}>
          <Button onClick={toggle}>View Positions</Button>
        </CardFooter>
      </Card>
    </React.Fragment>
  );
};

const PositionGrid = ({ positions }) => {
  const [dropdownOpen, setdropdownOpen] = useState(false);
  const [sortedPositions, setSortedPositions] = useState(positions);

  // x
  //   index%3 * 4

  // y
  //   Math.floor(index/3)*8

  const layout = [];

  for (let index = 0; index < 48; index++) {
    layout.push({
      i: 'position' + index,
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
      order === 'asc'
        ? [...sortedPositions].sort((a, b) => a[field] - b[field])
        : [...sortedPositions].sort((a, b) => b[field] - a[field]);

    setSortedPositions(sorted);
  };

  return (
    <Container fluid>
      <Row>
        <Col sm={12} style={{ textAlign: 'right' }}>
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
            className='layout'
            layout={layout}
            cols={12}
            rowHeight={30}
            measureBeforeMount>
            {sortedPositions.map((pos, index) => (
              <div key={`position${index}`}>
                <PositionCard {...pos} />
              </div>
            ))}
          </GridLayoutWithWidth>{' '}
        </Col>
      </Row>
    </Container>
  );
};

export default PositionGrid;
