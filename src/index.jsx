import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink as RRNavLink,
} from "react-router-dom";
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from "reactstrap";
import "bootstrap/dist/css/bootstrap.css";

import HiringMgmtPosition from "./components/HiringMgmtPosition";
import PositionGrid from "./components/PositionGrid";
import HiringMgmtOrg from "./components/HiringMgmtOrg";
import PositionsByGrade from "./components/PositionsByGrade";

const App = () => {
  const [positions, setPositions] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8000/positions")
      .then((res) => res.json())
      .then((positions) => setPositions(positions));
  }, []);

  return (
    <React.Fragment>
      <Router>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">FedHR Navigator</NavbarBrand>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink
                tag={RRNavLink}
                exact
                to="/position"
                activeClassName="active">
                Position Management
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                tag={RRNavLink}
                exact
                to="/positions/grade"
                activeClassName="active">
                Positions By Grade
              </NavLink>
            </NavItem>
          </Nav>
        </Navbar>
        <Switch>
          <Route path="/hiring/org">
            <HiringMgmtOrg />
          </Route>
          <Route path="/hiring/position">
            <HiringMgmtPosition />
          </Route>
          <Route path="/positions/grade">
            <PositionsByGrade />
          </Route>
          <Route path="/position">
            <PositionGrid positions={positions} />
          </Route>
        </Switch>
      </Router>
    </React.Fragment>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
