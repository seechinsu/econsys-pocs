import React from "react";
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
import SkillsMgmt from "./components/SkillsMgmt";
import HiringMgmtOrg from "./components/HiringMgmtOrg";

const App = () => {
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
                to="/hiring/position"
                activeClassName="active">
                Recruitment by Position
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                tag={RRNavLink}
                exact
                to="/hiring/org"
                activeClassName="active">
                Recruitment By Org
              </NavLink>
            </NavItem>
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
                to="/skill"
                activeClassName="active">
                Skills Analytics
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
          <Route path="/position">
            <PositionGrid />
          </Route>
          <Route path="/skill">
            <SkillsMgmt />
          </Route>
        </Switch>
      </Router>
    </React.Fragment>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
