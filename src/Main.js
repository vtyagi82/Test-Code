import React, { Component } from 'react';
import {Route, NavLink, HashRouter} from "react-router-dom";
import Dropdown from 'react-bootstrap/Dropdown';
import Icon from '@material-ui/core/Icon';
//Import Pages
import Jobs from "./Jobs";
import Files from "./Files";
import Workflows from "./Workflows";
import Connections from "./Connections";
import Desktops from "./Desktops";

class Main extends Component {
    render() {
      return(
        <HashRouter>
          <div className="wrapper">
            <div className="p-fix h-100 lft-pnl">
              <div className="w-100 h-100 logo"></div>
              <div className="w-100 h-100 sub-logo"></div>
              <ul className="side-nav-wrapper">
                    <li className="side-nav-link"><NavLink  to="/Jobs" className="nav-link"><Icon className="f-lft m-r-30 icn-clr">line_style</Icon>Jobs</NavLink></li>
                    <li className="side-nav-link"><NavLink exact  to="/Files" className="nav-link"><Icon className="f-lft m-r-30 icn-clr">insert_drive_file</Icon>Files</NavLink></li>
                    <li className="side-nav-link"><NavLink  to="/Workflows" className="nav-link"><Icon className="f-lft m-r-30 icn-clr">image_aspect_ratio</Icon>Workflows</NavLink></li>
                    <li className="side-nav-link"><NavLink  to="/Presets" className="nav-link"><Icon className="f-lft m-r-30 icn-clr">code</Icon>Presets</NavLink></li>
                    <li className="side-nav-link"><NavLink  to="/Software" className="nav-link"><Icon className="f-lft m-r-30 icn-clr">developer_mode</Icon>Software</NavLink></li>
                    <li className="side-nav-link"><NavLink  to="/Usage" className="nav-link"><Icon className="f-lft m-r-30 icn-clr">insert_chart_outlined</Icon>Usage</NavLink></li>
                    <li className="side-nav-link"><NavLink  to="/Connections" className="nav-link"><Icon className="f-lft m-r-30 icn-clr">cast_connected</Icon>Connections</NavLink></li>
                    <li className="side-nav-link"><NavLink  to="/Desktops" className="nav-link"><Icon className="f-lft m-r-30 icn-clr">desktop_windows</Icon>Desktops</NavLink></li>
                  </ul>
              <div className="side-nav-ftr">
                <ul className="side-nav-wrapper">
                  <li className="side-nav-link"><NavLink  to="/Contacts" className="nav-link"><Icon className="f-lft m-r-30 icn-clr">contact_mail</Icon>Contacts</NavLink ></li>
                </ul>
                <p class="copyright">&copy; 2019 Scala Computing.<br/>All rights reserved</p>
              </div>
            </div>
            <div className="rht-pnl">
              <div className="usr-info-wrpr">
              <Dropdown>
                <Dropdown.Toggle id="dropdown-basic">
                  Hi, Skymet
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="#/action-1">Settings</Dropdown.Item>
                  <Dropdown.Item href="#/action-2">Password</Dropdown.Item>
                  <Dropdown.Item href="#/action-3">Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              </div>
              <Route exact path="/" component={Files}/>
              <Route path="/Jobs" component={Jobs}/>
              <Route path="/Files" component={Files}/>
              <Route path="/Workflows" component={Workflows}/>
              <Route path="/Connections" component={Connections}/>
              <Route path="/Desktops" component={Desktops}/>
            </div>
          </div>
        </HashRouter>
      )
    }
  }
  
  export default Main;