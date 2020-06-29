import React, { Component } from 'react'
import { Route, NavLink, Redirect } from 'react-router-dom'
import NavigationItem from './NavigationItem/NavigationItem'
import classes from './NavigationItems.module.css'

const navigationItems = () => {
    return (
            <ul className={classes.NavigationItems}>
                <NavigationItem to='/books' exact>Books</NavigationItem>
                <NavigationItem to='new-book'>New Book</NavigationItem>
            </ul>
    )
}

export default navigationItems