const net = require('net')

function broadcast(message, socketSent) {
    if (message === 'sair') {
        const index = sockets.indexOf(socketSent)
        sockets.splice(index, 1)
    } else {
        sockets.forEach(socket => {
            if (socket !== socketSent) socket.write(message)
        })
    }
}

let sockets = []

const server = net.createServer(socket => {
    sockets.push(socket)
    console.log('Cliente conectado.')

    socket.on('data', data => {
        broadcast(data, socket)
    })

    socket.on('error', err => {
        console.log('Um cliente foi desconectado inesperadamente.')
    })

    socket.on('close', () => {
        console.log('Um cliente saiu do chat.')
    })
})

server.listen(3333)
