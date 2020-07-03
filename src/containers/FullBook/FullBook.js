/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from "react";
import classes from "./FullBook.module.css";
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
        if (this.state.selectedBook.comments) {
            const data = [...this.state.selectedBook.comments]
                data.push(comment)

            const updatedBook = {
                ...this.state.selectedBook,
                comments2: [
                    data
                ]
            }
            const id = this.state.selectedBook.id
            localStorage.setItem(id, JSON.stringify(updatedBook))
            this.setState({ comment: '' })
        } else {
            const updatedBook = {
                ...this.state.selectedBook,
                comments: [
                    comment
                ]


            }
            const id = this.state.selectedBook.id
            localStorage.setItem(id, JSON.stringify(updatedBook))
            this.setState({ comment: '' })
        }
    }

    updateComment = (event) => {
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
                        <h2>Title</h2>
                        <p>{this.state.selectedBook.title}</p>
                    </div>
                    <div className={classes.BookInfo}>
                        <h2>Author</h2>
                        <p>{this.state.selectedBook.author}</p>
                    </div>
                    <div className={classes.BookInfo}>
                        <h2>About</h2>
                        <p>{this.state.selectedBook.description}</p>
                    </div>
                    <div className={classes.BookInfo}>
                        <h2>Category</h2>
                        <p>{this.state.selectedBook.category}</p>
                    </div>
                    <div className={classes.BookInfo}>
                        <h2>Created On</h2>
                        <p>{new Intl.DateTimeFormat('pt-BR').format(this.state.selectedBook.date)}</p>
                    </div>
                </div>
            </div>
        )
    }

    renderSingleComment = () => {
        const comments = this.state.selectedBook.comments
        if (comments) {
            return (
                comments.forEach(comment => {
                    return (
                        <div className={classes.SingleComment}>
                            <p>{comment}</p>
                        </div>
                    )
                })
            )
        }
    }
    renderComments = () => {
        return (

            <div className={classes.CommentsContainer}>
                <h3>Have you read this book? </h3>
                <p>Leave a comment</p>
                <button className="btn btn-secondary btn-lg" onClick={this.saveComment}>Say it!</button>
                <textarea rows="4" cols="50" style={{ resize: 'none' }} value={this.state.comment} onChange={(event) => { this.updateComment(event) }}></textarea>
                <div className={classes.CommentArea}>

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