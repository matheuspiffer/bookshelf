import React, { Component } from "react";
import classes from "./NewBook.module.css";

class NewBook extends Component {
    state = {
        id: 0,
        title: "",
        description: "",
        author: "",
        image_url: "",
        category: "",
        date: "",
        deleted: false,
    };

    componentDidMount() {
        let nextId = localStorage.getItem("id");
        if (nextId == null) {
            localStorage.setItem("id", 0);
            nextId = 1;
            this.setState({ id: nextId })
        } else {
            nextId = parseInt(nextId) + 1;
            this.setState({ id: nextId })
        }

    }

    bookDataHandler = () => {
        const id = this.state.id
        const data = {
            id: this.state.id,
            title: this.state.title,
            description: this.state.description,
            author: this.state.author,
            image_url: this.state.image_url,
            category: this.state.category,
            date: new Date(),
            deleted: false,
        };
        console.log(data)
        localStorage.setItem(id, JSON.stringify(data));
        localStorage.setItem("id", id);
        this.setState({ id: id + 1 })
    };

    render() {
        return (
            <div className={classes.Container}>
                <h1>Add a Book</h1>
                <div className={classes.NewBook}>
                    <div className={classes.BookImage}>
                        <img src={this.state.image_url}></img>
                    </div>
                    <div className={classes.BookInfos}>
                        <div className={classes.BookInfo}>
                            <label>Image URL</label>
                            <input
                                type="http"
                                value={this.state.image_url}
                                onChange={(event) =>
                                    this.setState({
                                        image_url: event.target.value
                                    })
                                }
                            />
                        </div>
                        <div className={classes.BookInfo}>
                            <label>Title</label>
                            <input
                                type="text"
                                value={this.state.title}
                                onChange={(event) =>
                                    this.setState({ title: event.target.value })
                                }
                            />
                        </div>

                        <div className={classes.BookInfo}>
                            <label>Author</label>
                            <input
                                type="text"
                                value={this.state.author}
                                onChange={(event) =>
                                    this.setState({
                                        author: event.target.value,
                                    })
                                }
                            />
                        </div>
                        <div className={classes.BookInfo}>
                            <label>About</label>
                            <input
                                type="text"
                                value={this.state.content}
                                onChange={(event) =>
                                    this.setState({
                                        description: event.target.value,
                                    })
                                }
                            />
                        </div>
                        <div className={classes.BookInfo}>
                            <label>Category</label>
                            <select
                                value={this.state.value}
                                onChange={(event) =>
                                    this.setState({
                                        category: event.target.value,
                                    })
                                }
                            >
                                <option value="wantToRead">Want to read</option>
                                <option value="reading">Reading</option>
                                <option value="read">Read</option>
                            </select>
                        </div>
                    </div>
                </div>
                <button onClick={this.bookDataHandler}>Add Book</button>
            </div>
        );
    }
}

export default NewBook;
