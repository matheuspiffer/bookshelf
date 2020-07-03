import React from 'react';
import classes from './Book.module.css';

const book = (props) => (

    <div className={classes.FlipCard} onClick={props.clicked}>
        <div className={classes.FlipCardInner}>
            <span>{props.category}</span>
            <div className={classes.FlipCardFront}>
                <img src={props.image} alt="Avatar" />
                <h3>{props.title}</h3>
            </div>
            <div className={classes.FlipCardBack}>
                <div className={classes.BookInfo}>
                    <h2>{props.title}</h2>
                    <p>{props.author}</p>
                    <p>Posted on {new Intl.DateTimeFormat('pt-BR').format(props.date)}</p>
                </div>

            </div>
        </div>
    </div>

);

export default book;