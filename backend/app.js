require('./database/db');
const Document = require('./models/Document');

const io = require('socket.io')(3001, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  socket.on('get-document', async (documentId) => {
    const document = await findOrCreate(documentId);
    socket.join(documentId);
    socket.emit('load-document', document.data);

    socket.on('send-changes', (delta) => {
      socket.broadcast.to(documentId).emit('receive-changes', delta);
    });

    socket.on('save-document', async (data) => {
      console.log(data);
      await Document.findByIdAndUpdate(documentId, { data });
    });
  });
});

const findOrCreate = async (id) => {
  if (id === null) return;

  const doc = await Document.findById(id);
  if (doc) return doc;

  return await Document.create({ _id: id, data: '' });
};
