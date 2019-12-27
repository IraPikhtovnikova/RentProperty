import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Glyphicon, Nav, Navbar, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Dropdown, Menu } from 'semantic-ui-react';
import './NavMenu.css';



export class NavMenu extends Component {
    displayName = NavMenu.name

    render() {
        return (
            <Navbar fixedTop fluid collapseOnSelect style={{ backgroundColor: '#81C1C1' }}>
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link to={'/'} style={{ color: 'white' }} ><Glyphicon glyph='object-align-bottom' /> NewTown</Link>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        <LinkContainer to={'/'} exact>
                            <NavItem>
                                <Glyphicon glyph='home' /> Главная
</NavItem>
                        </LinkContainer>
                        <LinkContainer to={'/client'}>
                            <NavItem>
                                <Glyphicon glyph='user' /> Клиенты
</NavItem>
                        </LinkContainer>
                        <LinkContainer to={'/district'}>
                            <NavItem>
                                <Glyphicon glyph='globe' /> Районы
</NavItem>
                        </LinkContainer>
                        <LinkContainer to={'/realtor'}>
                            <NavItem>
                                <Glyphicon glyph='briefcase' /> Риэлторы
</NavItem>
                        </LinkContainer>
                        <LinkContainer to={'/type'}>
                            <NavItem>
                                <Glyphicon glyph='chevron-up' /> Типы объектов
</NavItem>
                        </LinkContainer>
                        <LinkContainer to={'/propobj'}>
                            <NavItem>
                                <Glyphicon glyph='equalizer' /> Объекты
</NavItem>
                        </LinkContainer>

                        <LinkContainer to={'/request'}>
                            <NavItem>
                                <Glyphicon glyph='search' /> Заявки
</NavItem>
                        </LinkContainer>

                        <LinkContainer to={'/rstatus'}>
                            <NavItem>
                                <Glyphicon glyph='flag' /> Статусы (заявки)
</NavItem>
                        </LinkContainer>

                        <LinkContainer to={'/dstatus'}>
                            <NavItem>
                                <Glyphicon glyph='flag' /> Статусы (сделки)
</NavItem>
                        </LinkContainer>

                        <LinkContainer to={'/deal'}>
                            <NavItem>
                                <Glyphicon glyph='ok' /> Сделки
</NavItem>
                        </LinkContainer>

                    </Nav>
                </Navbar.Collapse>
            </Navbar >
        );

    }
}
