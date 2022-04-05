import './Nav.css'
import React from 'react'
import NavItem from './Nav-Item'

export default props =>
    <aside className='menu-area'>
        <nav className="menu">
            <NavItem link='' icon='home' title='Início'/>
            <NavItem link='users' icon='users' title='Usuários'/>
        </nav>
    </aside>