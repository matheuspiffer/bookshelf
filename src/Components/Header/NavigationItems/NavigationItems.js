import React from 'react'
import NavigationItem from './NavigationItem/NavigationItem'
import classes from './NavigationItems.module.css'

const navigationItems = () => {
    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem to='/books' exact>Books</NavigationItem>
            <NavigationItem to='/book/new-book'>New Book</NavigationItem>
        </ul>
    )
}

export default navigationItems