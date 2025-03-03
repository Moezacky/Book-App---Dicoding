/* eslint-disable linebreak-style */
import { nanoid } from 'nanoid';
import books from './books.js';

const addBooks = (request, h) => {
  const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;

  const id = nanoid(16);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  const newBooks = { id, name, year, author, summary, publisher, pageCount, readPage, finished: readPage === pageCount, reading, insertedAt, updatedAt };

  if (!name){
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku'
    });
    response.code(400);
    return response;
  }

  if (readPage > pageCount){
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount'
    });
    response.code(400);
    return response;
  }

  books.push(newBooks);

  const reqSucces = books.filter((book) => book.id === id).length > 0;

  if (!name){
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku'
    });
    response.code(400);
    return response;
  }

  if (readPage > pageCount){
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount'
    });
    response.code(400);
    return response;
  }

  if (reqSucces){
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id,
      }
    });
    response.code(201).header('Content-Type', 'application/json');
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'gagal'
  });
  response.code(400);
  return response;
};

const getAllBooks = (request, h) => {
  const { name, finished, reading } = request.query;

  const filteredBooks = books.filter((book) => {
    if (name) {
      return book.name.toLowerCase().includes(name.toLowerCase());
    }
    return true;
  });

  const filteredByReading = filteredBooks.filter((book) => {
    if (reading !== undefined) {
      return book.reading === (reading === '1');
    }
    return true;
  });

  const filteredBooksFinal = filteredByReading.filter((book) => {
    if (finished !== undefined) {
      return book.finished === (finished === '1');
    }
    return true;
  });

  const response = h.response({
    status: 'success',
    data: {
      books: filteredBooksFinal.map((book) => ({
        id: book.id,
        name: book.name,
        publisher: book.publisher
      }))
    }
  });
  response.code(200);
  return response;
};

const getBooksById = (request, h) => {
  const { id } = request.params;

  const book = books.filter((n) => n.id === id)[0];

  if (book) {
    const response = h.response({
      status: 'success',
      data: {
        book
      }
    });
    response.code(200);
    return response;
  };
  const response = h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan'
  });
  response.code(404);
  return response;
};

const editBooksById = (request, h) => {
  const { id } = request.params;

  const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;

  const updatedAt = new Date().toISOString();

  const index = books.findIndex((book) => book.id === id);

  if (!name){
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku'
    });
    response.code(400);
    return response;
  }

  if (!id){
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Id tidak ditemukan'
    });
    response.code(404);
    return response;
  }

  if (readPage > pageCount){
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount'
    });
    response.code(400);
    return response;
  }

  if (index !== -1){
    books[index] = {
      ...books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      updatedAt
    };
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui'
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui buku. Id tidak ditemukan'
  });
  response.code(404);
  return response;
};

const deleteBooksById = (request, h) => {
  const { id } = request.params;
  const index = books.findIndex((n) => n.id === id);
  if (index !== -1){
    books.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil dihapus'
    });
    response.code(200);
    return response;
  }
  const response = h.response({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan'
  });
  response.code(404);
  return response;
};

export { addBooks, getAllBooks, getBooksById, editBooksById, deleteBooksById };
