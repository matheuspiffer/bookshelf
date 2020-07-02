import React from 'react';
import classes from './Book.module.css';

const book = (props) => (

    <div className={classes.FlipCard} onClick={props.clicked}>
        <div className={classes.FlipCardInner}>
            <div className={classes.FlipCardFront}>
                <img src={props.image} alt="Avatar" />
                <h3>{props.title}</h3>
            </div>
            <div className={classes.FlipCardBack}>
                <h1>{props.title}</h1>
                <p>{props.author}</p>
                <p>{props.description}</p>
                <p>{props.date}</p>
                
            </div>
        </div>
    </div>

);

export default book;