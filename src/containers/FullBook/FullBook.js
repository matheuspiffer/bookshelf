/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from "react";
import classes from "./FullBook.module.css";
import Comment from './comment/comment'
class FullBook extends Component {
    state = {
        selectedBook: [],
        comment: ''
    };

    componentDidMount() {
        const id = this.props.match.params.id
        const data = JSON.parse(localStorage.getItem(id))
        this.setState({ selectedBook: data })
    


    };



    saveComment = () => {
        const comment = this.state.comment
        const newComment = {
            comment: String(comment),
            date: Date.now()
        }
        const bookComments = this.state.selectedBook.comments
        const comments = [
            ...bookComments,
            newComment
        ]

        const newBook = {
            ...this.state.selectedBook,
            comments: comments
        }
        this.setState({
            selectedBook: newBook
        })

        const id = newBook.id
        const data = JSON.stringify(newBook)
        localStorage.setItem(id, data)
    }

    getComment = (event) => {
        const comment = [event.target.value];
        this.setState({ comment: comment })
    }
    renderBook = () => {
        return (
            <div className={classes.Book}>
                <div className={classes.BookImage}>
                    <img src={this.state.selectedBook.image_url} />
                </div>
                <div className={classes.BookInfos}>
                    <div className={classes.BookInfo}>
                        <h3>Title</h3>
                        <p>{this.state.selectedBook.title}</p>
                    </div>
                    <div className={classes.BookInfo}>
                        <h3>Author</h3>
                        <p>{this.state.selectedBook.author}</p>
                    </div>
                    <div className={classes.BookInfo}>
                        <h3>About</h3>
                        <p>{this.state.selectedBook.description}</p>
                    </div>
                    <div className={classes.BookInfo}>
                        <h3>Category</h3>
                        <p>{this.state.selectedBook.category}</p>
                    </div>
                    <div className={classes.BookInfo}>
                        <h3>Created On</h3>
                        <p>{new Intl.DateTimeFormat('pt-BR').format(this.state.selectedBook.date)}</p>
                    </div>
                </div>
            </div>
        )
    }



    renderSingleComment = () => {
        let data = this.state.selectedBook.comments || []
        // let dataTransformed = Object.keys(data).map(igKey => {
        //     return [...Array(this.state.selectedBook.comments[igKey])]
        //         .map((c, i) => {
        //             return (
        //                 <Comment comment={c.comment} date={c.date} />
        //             )
        //         })
        // })
        // data.map(comment => {
        //     return (
        //         console.log(comment.comment)
                // <div >
                //     <p>{comment.comment}</p>
                //     <p>{comment.date}</p>
                // </div >
        //     )
        // })
    }


    renderComments = () => {

        return (

            <div className={classes.CommentsContainer} >
                <h3>Have you read this book? </h3>
                <p>Leave a comment</p>
                <button className="btn btn-secondary btn-lg" onClick={this.saveComment}>Say it!</button>
                <textarea rows="4" cols="50" style={{ resize: 'none' }} value={this.state.comment} onChange={(event) => { this.getComment(event) }}></textarea>
                <div className={classes.CommentArea}>
                    {this.renderSingleComment()}
                </div>
            </div>
        )
    }
    render() {

        return (

            <div className={classes.Container}>
                {this.renderBook()}
                {this.renderComments()}
            </div>
        );
    }
}

export default FullBook;