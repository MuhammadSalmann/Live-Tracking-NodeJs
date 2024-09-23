const express = require('express');
const app = express();
const path = require('path');

const http = require('http')
const server = http.createServer(app)

const socketio = require('socket.io')
const io = socketio(server)

app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
    console.log('New Connection')
    socket.on('sendLocation', (data) => {
        io.emit('receiveLocation', { id: socket.id, ...data })
    })
    socket.on('disconnect', () => {
        io.emit('userDisconnected', socket.id)
    })
})

app.get('/', (req, res) => {
    res.render('index')
})

server.listen(3000)