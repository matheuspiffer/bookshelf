/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from "react";
import classes from "./NewBook.module.css";
import Spinner from "../../Components/Spinner/Spinner";
import { Redirect } from "react-router-dom";
const initialState = {
    id: 0,
    title: "",
    description: "",
    author: "",
    image_url: "",
    category: "",
    deleted: false,
};
class NewBook extends Component {
    state = {
        book: {
            ...initialState,
        },
        loading: false,
        editing: false,
        submitted: false,
        books: [],
    };

    componentDidMount() {
        let nextId = localStorage.getItem("id");
        console.log(nextId);
        this.setState({ loading: !this.state.loading });
        if (nextId == null) {
            localStorage.setItem("id", 0);
            nextId = 1;
            this.state.book.id = nextId;
        } else {
            nextId = parseInt(nextId) + 1;
            this.state.book.id = nextId;
        }
        console.log(this.state.book.id);
        this.updateBookList();
    }

    clear = () => {
        this.setState({ book: initialState });
    };

    bookDataHandler = () => {
        const id = this.state.book.id;
        console.log(id);
        const data = {
            id: this.state.book.id,
            title: this.state.book.title,
            description: this.state.book.description,
            author: this.state.book.author,
            image_url: this.state.book.image_url,
            category: this.state.book.category,
            date: new Date(),
            deleted: false,
        };

        localStorage.setItem(id, JSON.stringify(data));
        localStorage.setItem("id", id);
        this.state.book.id = id + 1;
        this.setState({submitted: false, loading: true });
        this.clear();
        this.updateBookList();
    };

    updateBookList = () => {
        const books = [];
        const id = localStorage.getItem("id");
        if (!this.state.editing) {
            for (let i = 1; i <= id; i++) {
                const book = JSON.parse(localStorage.getItem(i));
                if (book === null) continue;
                books.push(book);
                this.setState({ books: books });
            }
        } else {
            const id = this.state.book.id;
            const book = JSON.stringify(this.state.book);
            localStorage.removeItem(id);
            console.log(id, book);
            localStorage.setItem(id, book);
            this.setState({ editing: false });
        }
    };

    updateFields = (event) => {
        const book = { ...this.state.book };
        book[event.target.name] = event.target.value;
        this.setState({ book: book, loading: false });
    };

    removeBook = (book) => {
        localStorage.removeItem(book.id);
        this.updateBookList();
    };

    loadBook = (book) => {
        this.setState({ book: book, loading: false, editing: true });
    };

    renderForm = () => {
        const img = this.state.loading ? (
            <div className={classes.Spinner}>
                <Spinner />
                <h2>Please fill the fields</h2>
            </div>
        ) : (
            <img src={this.state.book.image_url} />
        );
        return (
            <div className={classes.NewBook}>
                <div className={classes.BookImage}>{img}</div>
                <div className={classes.BookInfos}>
                    <div className={classes.BookInfo}>
                        <label>Image URL</label>
                        <input
                            type="url"
                            name="image_url"
                            value={this.state.book.image_url}
                            onChange={(event) => this.updateFields(event)}
                        />
                    </div>
                    <div className={classes.BookInfo}>
                        <label>Title</label>
                        <input
                            type="text"
                            name="title"
                            value={this.state.book.title}
                            onChange={(event) => this.updateFields(event)}
                        />
                    </div>

                    <div className={classes.BookInfo}>
                        <label>Author</label>
                        <input
                            type="text"
                            name="author"
                            value={this.state.book.author}
                            onChange={(event) => this.updateFields(event)}
                        />
                    </div>
                    <div className={classes.BookInfo}>
                        <label>About</label>
                        <input
                            type="text"
                            name="description"
                            value={this.state.book.description}
                            onChange={(event) => this.updateFields(event)}
                        />
                    </div>
                    <div className={classes.BookInfo}>
                        <label>Category</label>
                        <select
                            value={this.state.book.category}
                            name="category"
                            onChange={(event) => this.updateFields(event)}
                        >
                            <option>Select an option</option>
                            <option value="read">Read</option>
                            <option value="reading">Reading</option>
                            <option value="Want to read">Want to read</option>
                        </select>
                    </div>
                </div>
            </div>
        );
    };

    renderTable = () => {
        return (
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>{this.renderRows()}</tbody>
            </table>
        );
    };

    renderRows = () => {
        return this.state.books.map((book) => {
            return (
                <tr key={book.id}>
                    <td>{book.id}</td>
                    <td>{book.title}</td>
                    <td>{book.author}</td>
                    <td>
                        <button
                            className="btn btn-warning"
                            onClick={() => {
                                this.loadBook(book);
                            }}
                        >
                            <i className="fa fa-pencil"></i>
                        </button>
                        <button
                            className="btn btn-danger ml-2"
                            onClick={() => this.removeBook(book)}
                        >
                            <i className="fa fa-trash"></i>
                        </button>
                    </td>
                </tr>
            );
        });
    };

    render() {
        let redirect = null;
        if (this.state.submitted) {
            redirect = <Redirect to="/books" />;
        }
        return (
            <div className={classes.Container}>
                {redirect}
                <h1>Add a Book</h1>
                {this.renderForm()}

                <div className={classes.buttons}>
                    <button
                        className={classes.saveButton}
                        onClick={this.bookDataHandler}
                    >
                        Save Book
                    </button>
                    <button className={classes.saveButton} onClick={this.clear}>
                        Cancel
                    </button>
                </div>

                {this.renderTable()}
            </div>
        );
    }
}

export default NewBook;
