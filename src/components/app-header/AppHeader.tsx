import * as React from 'react'
import { IProps, IState } from './AppHeader.PropsState'
import './AppHeader.css'
import { Link } from 'react-router-dom'
import { Navbar, Nav, NavItem } from 'react-bootstrap'

class AppHeader extends React.Component<IProps, IState>{
  /**
   *
   */
  constructor(props: Readonly<IProps>) {
    super(props);
  }
  render() {
    return (

      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#home">VO HONG SON | ReactJS Assignment</a>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav>
          <NavItem eventKey={1} href="#">
            <Link to='/'>Currency converter</Link></NavItem>
          <NavItem eventKey={1} href="#">
            <Link to='/about'>About</Link></NavItem>
        </Nav>
      </Navbar>
    );
  }
}
export default AppHeader