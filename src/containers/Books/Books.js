import React, { Component } from 'react'

import Book from '../../Components/Book/Book'
import classes from './Books.module.css'
class Books extends Component {
    state = {
        books: [],
        selectedBookId: '',
        error: false
    };


    componentDidMount() {
        const books = []
        const id = localStorage.getItem('id')

        for (let i = 1; i <= id; i++) {
            const book = JSON.parse(localStorage.getItem(i))
            if (book === null) continue
            if (book.image_url == '') book.image_url = 'https://ik.imagekit.io/lc7oxtp9qa/default_book_GurI-Kgqs.jpg'
            console.log(book.image_url)
            books.push(book)
        }
        const updatedBooks = books.map((book) => {
            return {
                ...book,
            };
        });
        this.setState({ books: updatedBooks });

    }

    bookSelectedHandler = (id) => {
        this.setState({ selectedBookId: id });
    };

    render() {
        let books = (
            <p style={{ textAlign: "center" }}>Something went wrong!</p>
        );
        if (!this.state.error) {
            books = this.state.books.map((book) => {
                return (
                    <Book
                        key={book.id}
                        title={book.title}
                        author={book.author}
                        image={book.image_url}
                        clicked={() => this.bookSelectedHandler(book.id)}
                    />
                );
            });
        }
        return (
            <section className={classes.Books}>{books}</section>
        )
    }
}

export default Books