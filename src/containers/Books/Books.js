import React, { Component } from "react";
import { Link } from "react-router-dom";
import Book from "../../Components/Book/Book";
import classes from "./Books.module.css";
class Books extends Component {
    state = {
        books: [],
        filteredBooks: [],
        selectedBookId: "",
        error: false,
        filters: {
            reading: true,
            wantToRead: true,
            read: true,
        },
        order: false,
    };

    componentDidMount() {
        const books = [];

        const id = localStorage.getItem("id");

        for (let i = 1; i <= id; i++) {
            const book = JSON.parse(localStorage.getItem(i));
            if (book === null) continue;
            if (book.image_url === "")
                book.image_url =
                    "https://ik.imagekit.io/lc7oxtp9qa/default_book_GurI-Kgqs.jpg";
            books.push(book);
        }

        this.setState({ books: books });
    }

    filters(event) {
        // if (event.target.name === 'order') this.setState({ order: !this.state.order })
        const filters = { ...this.state.filters };
        filters[event.target.name] = !this.state.filters[event.target.name];
        this.setState({ filters: filters });
        const filteredBooks = this.state.books.filter(
            (book) => book.category == event.target.name
        );
        // console.log(filteredBooks);
    }

    order(a, b) {
        if (a.title < b.title) return -1
        if (a.title > b.title) return 1;
        return 0
    }

    buttonsRender() {
        return (
            <div>
                <button
                    name="read"
                    className={
                        this.state.filters.read
                            ? "btn btn-secondary"
                            : "btn btn-outline-secondary"
                    }
                    onClick={(event) => this.filters(event)}
                >
                    Read
                </button>
                <button
                    name="wantToRead"
                    className={
                        this.state.filters.wantToRead
                            ? "btn btn-secondary"
                            : "btn btn-outline-secondary"
                    }
                    onClick={(event) => this.filters(event)}
                >
                    Want to Read
                </button>
                <button
                    name="reading"
                    className={
                        this.state.filters.reading
                            ? "btn btn-secondary"
                            : "btn btn-outline-secondary"
                    }
                    onClick={(event) => this.filters(event)}
                >
                    Reading
                </button>
                <button
                    name="order"
                    className={
                        this.state.order
                            ? "btn btn-success"
                            : "btn btn-outline-success"
                    }
                    onClick={(event) => this.filters(event)}
                >
                    By order
                </button>
            </div>
        );
    }

    render() {

        let books = this.state.books.sort(this.order).map((book) => {
            return (
                <Link to={"book/" + book.id} key={book.id}>
                    <Book
                        title={book.title}
                        author={book.author}
                        image={book.image_url}
                        description={book.description}
                        category={book.category}
                        date={book.date}
                    />
                </Link>
            );
        });

        return (
            <section className={classes.Container}>
                <div className={classes.Filters}>{this.buttonsRender()}</div>
                <div className={classes.Books}>{books}</div>
            </section>
        );
    }
}

export default Books;
