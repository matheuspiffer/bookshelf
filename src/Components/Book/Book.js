import React from "react";
import classes from "./Book.module.css";

const book = (props) => (
    <div className={classes.Card} onClick={props.clicked}>
        <span>{props.category}</span>
        <div className={classes.img}>
            <img src={props.image} alt="Avatar" />
        </div>
        <div className={classes.Transition}>
            <h3>{props.title}</h3>
        </div>
    </div>
);

export default book;
