import React, { Component } from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import classes from './Bookshelf.module.css'
import Header from '../Components/Header/Header'
import SideDrawer from '../Components/Header/SideDrawer/SideDrawer'
import BookManager from './BookManager/BookManager'
import Books from './Books/Books'
import FullBook from './FullBook/FullBook'


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
                <Switch>
                    <Route path="/books" component={Books} />
                    <Route path="/book/new-book" component={BookManager} />
                    <Route path="/book/:id" component={FullBook} />
                    <Redirect from="/" to="/books" />
                </Switch>

            </div>
        )
    }
}

export default Bookshelf