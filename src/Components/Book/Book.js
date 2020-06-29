import React from 'react';
import classes from './Book.module.css';

const book = (props) => (
    <article className={classes.Book} onClick={props.clicked}>
        <img src={props.image} />
        <h1>{props.title}</h1>
        <div className={classes.Info}>
            <div className={classes.Author}>{props.author}</div>
        </div>
    </article>
);

export default book;