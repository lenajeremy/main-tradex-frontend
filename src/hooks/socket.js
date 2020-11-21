import socketIoClient from 'socket.io-client';
const ENDPOINT = 'http://localhost:4000';

let socket;

const initialize = (id) => {
  socket = socketIoClient(ENDPOINT);
  socket.emit('identification', id);
}

const get = () => socket

export default {initialize, get};