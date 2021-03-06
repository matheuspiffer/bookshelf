import React from 'react'
import { NavLink } from 'react-router-dom'
import classes from './NavigationItem.module.css'
const navigationItems = (props) => {
    return (

        <li className={classes.NavigationItem}><NavLink to={props.to}>{props.children}</NavLink></li>

    )
}

export default navigationItems