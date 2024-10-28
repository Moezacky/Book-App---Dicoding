/* eslint-disable linebreak-style */
import { addBooks, deleteBooksById, editBooksById, getAllBooks, getBooksById } from './handler.js';

const route = [
  {
    method: 'POST',
    path: '/books',
    handler: addBooks
  },
  {
    method: 'GET',
    path: '/books',
    handler: getAllBooks
  },
  {
    method: 'GET',
    path: '/books/{id}',
    handler: getBooksById
  },
  {
    method: 'PUT',
    path: '/books/{id}',
    handler: editBooksById
  },
  {
    method: 'DELETE',
    path: '/books/{id}',
    handler: deleteBooksById
  }
];

export default route;