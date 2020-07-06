import React, { Component } from "react";
import classes from "./FullBook.module.css";
class FullBook extends Component {
    state = {
        selectedBook: [],
        comment: {
            name: '',
            comment: ''
        }
    };

    componentDidMount() {
        const id = this.props.match.params.id
        const data = JSON.parse(localStorage.getItem(id))
        this.setState({ selectedBook: data })
    };
    //get old comments and new comment and save them into an array
    saveComment = () => {
        const comment = this.state.comment.comment
        let name = this.state.comment.name
        if (comment === '') return
        if (name === '') name = 'Anonymous'
        const newComment = {
            comment: String(comment),
            date: Date.now(),
            name: String(name)
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
            selectedBook: newBook,
            comment: {
                name: '',
                comment: ''
            }
        })

        const id = newBook.id
        const data = JSON.stringify(newBook)
        localStorage.setItem(id, data)

    }
    //set comment to state
    getComment = (event) => {
        const comment = { ...this.state.comment }
        comment[event.target.name] = event.target.value;
        this.setState({ comment: comment })
    }
    renderBook = () => {
        return (
            <div className={classes.Book}>
                <div className={classes.BookImage}>
                    <img src={this.state.selectedBook.image_url} alt={this.state.selectedBook.title} />
                </div>
                <div className={classes.BookInfos}>
                    <div className={classes.BookInfo}>
                        <h4>Title</h4>
                        <p>{this.state.selectedBook.title}</p>
                    </div>
                    <div className={classes.BookInfo}>
                        <h4>Author</h4>
                        <p>{this.state.selectedBook.author}</p>
                    </div>
                    <div className={classes.BookInfo}>
                        <h4>About</h4>
                        <p>{this.state.selectedBook.description}</p>
                    </div>
                    <div className={classes.BookInfo}>
                        <h4>Category</h4>
                        <p>{this.state.selectedBook.category === 'wantToRead' ? 'want to read' : this.state.selectedBook.category}</p>
                    </div>
                    <div className={classes.BookInfo}>
                        <h4>Created On</h4>
                        <p>{new Intl.DateTimeFormat('pt-BR').format(this.state.selectedBook.date)}</p>
                    </div>
                </div>
            </div>
        )
    }



    renderSingleComment = () => {
        let data = this.state.selectedBook.comments || []
        return (
            data.map(comment => (
                <div className={classes.SingleComment}>
                    <div className={classes.DateAndName}>
                        <span>
                            By  {comment.name}
                        </span>
                        <span>on {Intl.DateTimeFormat('pt-BR', {
                            year: 'numeric', month: 'numeric', day: 'numeric',
                            hour: 'numeric', minute: 'numeric',
                            hour12: false,
                        }).format(comment.date)}</span>
                    </div>
                    <div className={classes.TextComment}>
                        <p>{comment.comment}</p>
                    </div>
                </div >
            )
            )
        )
    }


    renderComments = () => {

        return (

            <div className={classes.CommentsContainer} >
                <h3>Have you read this book? </h3>
                <p>Leave a comment</p>
                <button onClick={this.saveComment}>Say it!</button>
                <div className={classes.inputName}>
                    <label>What's your name ?</label>
                    <input
                        type="text"
                        name="name"
                        value={this.state.comment.name}
                        onChange={(event) => { this.getComment(event) }}
                    />
                </div>
                <div className={classes.inputName}>
                    <label>Type below</label>
                    <textarea style={{ resize: 'none' }} value={this.state.comment.comment} name='comment' onChange={(event) => { this.getComment(event) }}></textarea>
                </div>
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