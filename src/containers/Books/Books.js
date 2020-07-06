import React, { Component } from "react";
import { Link } from "react-router-dom";
import Book from "../../Components/Book/Book";
import classes from "./Books.module.css";
class Books extends Component {
    state = {
        books: [],
        filteredBooks: [],
        selectedBookId: "",
        showFilters: false,
        filter: false,
        filters: {
            reading: false,
            wantToRead: false,
            read: false,
        },
        alphabeticOrder: false,
        dateOrder: false,
    };

    componentDidMount() {
        const books = [];

        const id = localStorage.getItem("id");
        //get data from localstorage and set a default imagem if it's an empty field
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
    // filters for the categories
    filters(event) {
        if (event.target.name === 'all') return this.setState({ filter: false })
        this.setState({ filter: true })
        const filters = { ...this.state.filters };
        filters[event.target.name] = !this.state.filters[event.target.name];
        const filteredBooks = this.state.books.filter(
            (book) => book.category === event.target.name
        );
        this.setState({ filteredBooks: filteredBooks });
        console.log(filteredBooks);
    }

    dateOrder(a, b) {
        if (a.date < b.date) return 1;
        if (a.date > b.date) return -1;
        return 0;
    }

    alphabeticOrder(a, b) {
        if (a.title < b.title) return -1;
        if (a.title > b.title) return 1;
        return 0;
    }

    filtersRender() {
        if (!this.state.showFilters) {
            return (
                <div>
                    <h4 style={{ cursor: 'pointer' }} onClick={() => { this.setState({ showFilters: true }); }}>Show Filters</h4>
                </div>
            );
        }
        return (
            <div>
                <h4 style={{ cursor: 'pointer', textAlign: 'center', marginBottom: '16px' }} onClick={() => { this.setState({ showFilters: false }); }}>Hide Filters</h4>
                <div className={classes.FiltersControl}>
                    <button
                        name="all"
                        className={classes.Button}
                        onClick={(event) => this.filters(event)}>
                        All
                </button>
                    <button
                        name="read"
                        className={classes.Button}
                        onClick={(event) => this.filters(event)}>
                        Read
                </button>
                    <button
                        name="wantToRead"
                        className={classes.Button}
                        onClick={(event) => this.filters(event)}>
                        Want to Read
                    </button>
                    <button
                        name="reading"
                        className={classes.Button}
                        onClick={(event) => this.filters(event)}>
                        Reading
                        </button>
                    <button
                        name="alphabetic"
                        className={classes.Button}
                        onClick={() => this.setState({ alphabeticOrder: true, dateOrder: false })}>
                        Alphabetical Order
                            </button>
                    <button
                        name="date"
                        className={classes.Button}
                        onClick={() => this.setState({ alphabeticOrder: false, dateOrder: true })}>
                        Date Order
                    </button>
                </div>
            </div>
        );
    }
    // check first if books(data from local storage) or filtered books(categories) must be shown, 
    //then check if alphabetical order or date order has a true state
    bookRender() {
        let filteredBooks = null
        let books = this.state.filter ? this.state.filteredBooks : this.state.books
        if (this.state.alphabeticOrder) {
            filteredBooks = books.sort(this.alphabeticOrder).map(book => {
                return (
                    <Link to={"book/" + book.id} key={book.id} className={classes.OutterCard}>
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
            })
        }
        if (this.state.dateOrder) {
            filteredBooks = books.sort(this.dateOrder).map(book => {
                return (
                    <Link to={"book/" + book.id} key={book.id} className={classes.OutterCard}>
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
            })
        }
        filteredBooks = books.map(book => {
            return (
                <Link to={"book/" + book.id} key={book.id} className={classes.OutterCard}>
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
        })
        return filteredBooks
    }

    render() {
        return (
            <section className={classes.Container}>
                <div className={classes.Filters}>{this.filtersRender()}</div>
                <div className={classes.Books}>{this.bookRender()}</div>
            </section>
        );
    }
}

export default Books;
