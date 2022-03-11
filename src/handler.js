const { nanoid } = require('nanoid');
const notes = require('./notes');

const addNoteHandler = (request, h) => {
  const { title, tags, body } = request.payload;
  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updateAt = createdAt;

  const newNote = {
    title, tags, body, id, createdAt, updateAt,
  };
  notes.push(newNote);

  const isSuccess = notes.filter((note) => note.id === id).length > 0;
  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'catatan berhasil di tambahkan',
      data: {
        noteId: id,
      },

    });
    response.code(201);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'catatan gagal di tambahkan',
  });
  response.code(500);
  return response;
};

const getAllNotesHandler = () => ({
  status: 'success',
  data: {
    notes,
  },
});

const getNoteByHandler = (request, h) => {
  const { id } = request.params;

  const note = notes.filter((n) => n.id === id)[0];

  if (note !== undefined) {
    return {
      status: 'success',
      data: {
        note,
      },
    };
  }
  const response = h.response({
    status: 'fail',
    message: 'Catatan tidack di temukan',
  });
  response.code(404);
  return response;
};

module.exports = { addNoteHandler, getAllNotesHandler, getNoteByHandler };
