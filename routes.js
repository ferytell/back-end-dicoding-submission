const {  handler1, handler2, handler3, handler4, handler5 } = require("./handlers");

const routes = [
    {
        method: 'POST',
        path: '/books',
        handler :handler1, // handler to input new book data 
    },
    {
        method: 'GET',
        path: '/books',
        handler :handler2, // handler for showing all saved books data
    },
   {
        method: 'GET',
        path: '/books/{bookId}',
        handler :handler3, // handler for showing books data by id
    },
    {
        method: 'PUT',
        path: '/books/{bookId}',
        handler :handler4, // handler for edit books data
    },
    {
        method: 'DELETE',
        path: '/books/{bookId}',
        handler :handler5, // handler for delete book data
    },
];
module.exports = routes;
