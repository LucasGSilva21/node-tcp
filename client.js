const net = require('net')

const readLine = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
})

const waitForUsername = new Promise(resolve => {
    readLine.question('Digite um nome para entrar no chat: ', answer => {
        resolve(answer)
    })
})

waitForUsername.then((username) => {
    const socket = net.connect({
        port: 3333
    })

    readLine.on('line', data => {
        if (data === 'sair') {
            socket.write(`${username} saiu do chat.`)
            socket.setTimeout(1000)
        } else {
            socket.write(username + ': ' + data)
        }
    })

    socket.on('connect', () => {
        socket.write(username + ' entrou no chat.')
    })

    socket.on('data', data => {
        console.log('\x1b[33m%s\x1b[0m', data)
    })

    socket.on('timeout', () => {
        socket.end()
    })

    socket.on('end', () => {
        process.exit()
    })

    socket.on('error', () => {
        console.log('Problema no servidor. Tente novamente mais tarde...')
    })
})
