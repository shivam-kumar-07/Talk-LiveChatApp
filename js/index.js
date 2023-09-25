const socket = io('http://52.66.243.220:8000');

const form = document.getElementById("send-container")
const messageInput = document.getElementById("messageInp")
const messageContainer = document.querySelector(".chat-container")

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`You : ${message}`, 'sent');
    socket.emit('send', message);
    messageInput.value = "";
})

const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('chat');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
}

const userName = prompt("Enter Your Name to Join")
socket.emit('new-user-joined', userName)

socket.on('user-joined', name =>{
    console.log("in user-joined event")
    append(`${name} joined the chat`, 'joined' );
})

socket.on('receive', data =>{
    append(`${data.name} : ${data.message}`, 'received');
})