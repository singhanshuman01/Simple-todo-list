const { Server } = require('socket.io');
const { createServer } = require('http');

const app = require('../index');
const session = require('../utils/session');
const query= require('../db/query');

const server = createServer(app);
const io = new Server(server);


io.use((socket, next) => {
  try {
    const cookieHeader = socket.handshake.headers.cookie || '';
    const cookies = Object.fromEntries(
      cookieHeader.split(';').map(c => c.trim().split('='))
    );

    const uid = cookies['uid'];
    if (!uid || !session[uid]) {
      return next(new Error('Unauthorized: invalid or missing session ID'));
    }

    socket.user_id = session[uid];
    next();
  } catch (err) {
    console.error(`Socket auth failed [${socket.id}]:`, err);
    next(new Error('Internal authentication error'));
  }
});


io.on('connection', (socket) => {
    console.log('A user connected.');

    if (socket.user_id) {
        const userRoom = `user_${socket.user_id}`;
        socket.join(userRoom);
        console.log(`Socket ${socket.id} joined room ${userRoom}`);
    }

    socket.on('added', async (newItem, targ) => {
        const newItemId = await query.addItem(newItem, targ, socket.user_id);
        console.log(`Item added: ${newItemId}-${newItem} by ${targ}`);
        io.to(`user_${socket.user_id}`).emit('addNew', newItemId, newItem, targ);
    });

    socket.on('update', async (newItemId, newItem, targ) => {
        console.log(`Item updated: ${newItemId}-${newItem} by ${targ}`);
        await query.updateList(newItemId, newItem, targ);
        io.to(`user_${socket.user_id}`).emit('upd', newItemId, newItem, targ);
    });

    socket.on('deleted', async (deleteId) => {
        console.log(`Item will be deleted: ${deleteId}`);
        await query.deleteItem(deleteId);
        io.to(`user_${socket.user_id}`).emit('del', deleteId);
    });

    socket.on('disconnect', () => {
        console.log(`A user disconnected.`);
    });
});

module.exports = { io, server };