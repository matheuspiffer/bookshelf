import React, { Component } from 'react'
import NavigationItems from './NavigationItems/NavigationItems'
import DrawerToggle from './SideDrawer/DrawerToggle/DrawerToggle'
import classes from './Header.module.css'

class Header extends Component {

    render() {
        return (
            <header className={classes.Header}>

                <DrawerToggle clicked={this.props.drawerToggleClicked} />
                <nav className={classes.DesktopOnly}>
                    <NavigationItems />
                </nav>
            </header>
        )
    }
}

export default Header