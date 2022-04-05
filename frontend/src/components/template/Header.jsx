import './Header.css'
import React from 'react'

export default props =>
    <header className="header d-flex justify-content-between">
        <h1 className="mt-3">
            <i className={`fa fa-${props.icon}`}></i> {props.title}
        </h1>
        <p className="mt-3 text-muted ">{props.subtitle}</p>
    </header>