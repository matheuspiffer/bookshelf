import React from 'react'
import NavigationItems from '../NavigationItems/NavigationItems'
import classes from './SideDrawer.module.css'
import Backdrop from '../Backdrop/Backdrop'
import Logo from '../Logo/Logo'

const sideDrawer = props => {
    let attachedClasses = [classes.SideDrawer, classes.Close]
    if (props.open) {
        attachedClasses = [classes.SideDrawer, classes.Open]
    }
    return (
        <div>
            <Backdrop show={props.open} clicked={props.closed} />
            <div className={attachedClasses.join(' ')}>
                <nav>
                    <Logo />
                    <NavigationItems />
                </nav>
            </div>
        </div>
    )
}

export default sideDrawer