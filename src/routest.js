const {
  addNoteHandler, getAllNotesHandler, getNoteByHandler, editNoteByHandler, deleteNoteByHandler,
} = require('./handler');

const routes = [
  {
    method: 'POST',
    path: '/notes',
    handler: addNoteHandler,
  },
  {
    method: 'GET',
    path: '/notes',
    handler: getAllNotesHandler,
  },
  {
    method: 'GET',
    path: '/notes/{ id }',
    handler: getNoteByHandler,
  },

  {
    method: 'PUT',
    path: '/notes/{ id }',
    handler: editNoteByHandler,
  },
  {
    method: 'PUT',
    path: '/notes/{ id }',
    handler: deleteNoteByHandler,
  },
];

module.exports = routes;
