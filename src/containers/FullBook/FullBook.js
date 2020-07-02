/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from "react";
import classes from "./FullBook.module.css";
class FullBook extends Component {
    state = {
        selectedBook: [[]]
    };
    F
    componentDidMount() {
        const id = this.props.match.params.id
        const data = JSON.parse(localStorage.getItem(id))
        console.log(data)
        this.setState({ selecteBook: data })
        console.log(this.state.selectedBook)
    };

    render() {

        return (
            <div className={classes.Container}>
                <h1></h1>
            </div>
        );
    }
}

export default FullBook;