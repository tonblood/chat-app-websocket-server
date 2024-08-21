const express = require('express');
const socketio = require('socket.io');
const app = express();

app.set('view engine', 'ejs');
app.use('/public',express.static('public'));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index');
})

const server = app.listen(process.env.PORT || 3000, () => {
    console.log('server is running');
})

// initialize socket for the server
const io = socketio(server);
io.on('connection', socket => {
    console.log('New user connected');

    socket.username = 'Anonymous'

    socket.on('change_username', data => {
        socket.username = data.username
    })

    socket.on('new_message', data => {
        console.log('have new message')
        io.sockets.emit('recieve_message', {message: data.message, username: socket.username})
    })

    socket.on('typing', data => {
        console.log('typing');
        socket.broadcast.emit('typing', {username: socket.username})
        // io.sockets.emit('typing', {username: socket.username})
    })
})

