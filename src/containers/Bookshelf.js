import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import classes from './Bookshelf.module.css'
import Header from '../Components/Header/Header'
import SideDrawer from '../Components/Header/SideDrawer/SideDrawer'
import NewBook from './NewBook/NewBook'
import Books from './Books/Books'
class Bookshelf extends Component {
    state = {
        showSideDrawer: false
    }
    sideDrawerClosedHandler = () => {
        this.setState({ showSideDrawer: false })
    }

    sideDrawerToggleHandler = () => {
        this.setState((prevState) => {
            return { showSideDrawer: !prevState.showSideDrawer }
        })
    }
    render() {
        return (
            <div className={classes.Bookshelf}>
                <Header drawerToggleClicked={this.sideDrawerToggleHandler} />
                <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler} />
                <Route path="/new-book" component={NewBook} />
                <Route path="/books" component={Books} />
                <Redirect from="/" to="/books" />

            </div>
        )
    }
}

export default Bookshelf