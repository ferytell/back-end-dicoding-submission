const { nanoid } = require("nanoid");
const books =[];
//const querystring = require('querystring');
//---------------------------------------------------------------------------------------
// handler to input new book data, generate id, finishing status, and updated and inserted time, client should put name, and page read not bigger than page count
//---------------------------------------------------------------------------------------
const handler1 = function (request, h) {
  const id = nanoid(16); //---------------------------------- Nanoid used for generate random ID for books
  const { 
    name, 
    year, 
    author, 
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload; // ------------------------------------ format json :  data yg akan dikirim ke server ketika bikin API request

  const insertedAt = new Date().toISOString(); // ------------ variable yg terbuat dari fungsi Date(), buat mendapatkan waktu, dububah jadi string biar bisa diinput 
  const updatedAt = insertedAt; // --------------------------- variable buat update tanggal kalo ada pembaharuan data
  let finished = false;
  
  if ( pageCount === readPage ){
    finished = true;
  } // ------------------------------------------------------- fungsi if buat ngasih tau kalo halaman hitung sama dengan jumlah total halaman maka nilai finished menjadi true

  const newBook ={ id, name, year, author, summary, publisher, pageCount, readPage, finished, reading, insertedAt, updatedAt }; // menggabungkan semua variable data
  
  books.push(newBook); // ------------------------------------- melakukan push data di newBook ke list books
  
  const isSuccess1 = books.filter(( book ) => book.id === id ).length > 0;
  if ( isSuccess1 ){
    //books.push(newBook);
    //----------------------------------------------------- jika nama buku tidak di isi maka error ini akan dipanggi;
    if (name == undefined){
      const response = h.response({
        status: 'fail',
        message: 'Gagal menambahkan buku. Mohon isi nama buku',
      });
      books.pop(); // -------------------------------------- karena data sudah dimasukan di atas menggunakan push() maka data terakhir di list book harus dihapus karena tidack sesuai
      response.code(400);
      return response;
    }
    //----------------------------------------------------- Jika input readPage lebih dari pageCount error ini yg akan dipanggil 
    if (readPage > pageCount){
      const response = h.response({
        status: 'fail',
        message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
      });
      books.pop();
      response.code(400);
      return response;
    }
    //---------------------------------------------------------  Jika tidack ada masalah maka ini yang akan dipanggil
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id,
      },
    });
    response.code(201);
    return response;
    //------------------------------------------------------------ Jika gagal karena masalah lain maka ini yg akan terpanggil
  }
  const response = h.response({
    status: 'fail',
    message: 'Buku gagal di tambahkan',
  });
  response.code(500);
  return response;
};
//---------------------------------------------------------------------------------------
// handler for showing all saved books data
//---------------------------------------------------------------------------------------
const handler2 = (request, h) => {
 
  const { reading, finished } = request.query;
                                                    //------------------//
  if (reading === '1') {                                                //
    const response = h.response({                                       //
      status: 'success',                                                // 
      data: {                                                           //
        books: books                                                    //  
        .filter((isRead) => isRead.reading === true)                    //
        .map((book) => ({                                               //  
          id: book.id,                                                  //
          name: book.name,                                              //  
          publisher: book.publisher,                                    //
        })),                                                            //
      },                                                                //
    });                                                                 //
    response.code(200);                                                 //  
    return response;                                                    //
  }                                                                //=====
  if (reading === '0') {                                                //
    const response = h.response({                                       //    
      status: 'success',                                                //   
      data: {                                                           //
        books: books                                                    //
        .filter((isRead) => isRead.reading === false)                   //
        .map((book) => ({                                               //      
          id: book.id,                                                  //
          name: book.name,                                              // 
          publisher: book.publisher,                                    //  
        })),                                                            //
      },                                                                //
    });                                                                 //
    response.code(200);                                                 //
    return response;                                                    //
  }                                                   //----------------//
  if (finished === '1') {                                               //
    const response = h.response({                                       //
      status: 'success',                                                //
      data: {                                                           //
        books: books                                                    //
        .filter((isFinish) => isFinish.finished === true)               //
        .map((book) => ({                                               //
          id: book.id,                                                  //
          name: book.name,                                              //
          publisher: book.publisher,                                    //
        })),                                                            //
      },                                                                //
    });                                                                 //
    response.code(200);                                                 //
    return response;                                                    //
  }                                                                 //====
  if (finished === '0') {                                               //
    const response = h.response({                                       //
      status: 'success',                                                //
      data: {                                                           //
        books: books                                                    //
        .filter((isFinish) => isFinish.finished === false)              //
        .map((book) => ({                                               //
          id: book.id,                                                  //
          name: book.name,                                              //
          publisher: book.publisher,                                    //
        })),                                                            //
      },                                                                //
    });                                                                 //
    response.code(200);                                                 //  
    return response;                                                    //
  }                                                  //-----------------//
  //var nama = request.query.name;
//  const { name } = request.query;
  //const namab = books.filter(( n ) => n.name == name )[0];
  const name = request.query.name;
  if (!name) {
    const response = h.response({
      status: 'success',
      data:{
        books: books.map((books) => ({
          id: books.id,
          name: books.name,
          publisher: books.publisher,
        })),
      },
    });
    console.log(books+"test2");
    response.code(200);
    return response;
  }

 
  const response = h.response({
    status: 'success',
    data:{
      books: books
      .filter(book => book.name.toLowerCase().includes(name.toLowerCase()))
      .map((books) => ({
        id: books.id,
        name: books.name,
        publisher: books.publisher,
      })),
    },
  });
//  console.log(books+"test2");
  response.code(200);
  return response;



  
};
//---------------------------------------------------------------------------------------
// handler for showing books data by id, 
//---------------------------------------------------------------------------------------
const handler3 = ( request, h ) => {
  const { bookId } = request.params;
  const book = books.filter(( n ) => n.id === bookId )[0];
  if ( book !== undefined ) {
    return {
      status: 'success',
      data: {
        book,
      },
    };
  }
  const response = h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan',
  });
  response.code( 404 );
  console.log(books)
  return response;
};
//---------------------------------------------------------------------------------------
// handler for edit books data, and like when we input the data first time , fif client didn't input the name or put readPage bigger then pageCount ehis eill throw error
//---------------------------------------------------------------------------------------
const handler4 = ( request, h ) => {
  const { bookId } = request.params;
  const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;
  const updatedAt = new Date().toISOString();
  const index = books.findIndex(( books ) => books.id === bookId );
  if ( index !== -1 ) {
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
      updatedAt,
    };
    //----------------------------------------------------------
    if ( name == undefined ){
      const response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. Mohon isi nama buku',
      });
      response.code(400);
      return response;
    }
    //----------------------------------------------------------
    if ( readPage > pageCount ){
      const response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
      });
      response.code(400);
      return response;
    }
    //----------------------------------------------------------
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui',
    });
    response.code(200);
    return response;
  }
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Id tidak ditemukan',
    });
    response.code(404);
    return response;
};
//---------------------------------------------------------------------------------------
// handler for delete book data
//---------------------------------------------------------------------------------------  
const handler5 = (  request, h ) => {
  const { bookId } = request.params;
  const index = books.findIndex(( book) => book.id === bookId );
  if ( index !== -1 ) {
    books.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    });
    response.code(200);
    return response;
  }
  const response = h.response({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan',
  });
  response.code( 404 );
  return response;
};
  module.exports = { handler1,handler2,handler3, handler4, handler5 };