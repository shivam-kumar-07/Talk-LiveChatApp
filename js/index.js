const socket = io('http://52.66.243.220:8001');

const form = document.getElementById("send-container")
const messageInput = document.getElementById("messageInp")
const messageContainer = document.querySelector(".chat-container")
const audio = new Audio('ding.mp3');

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
    if(position == 'received')
    {
        audio.play();
    }
}

const userName = prompt("Enter Your Name to Join")
socket.emit('new-user-joined', userName)

socket.on('user-joined', name =>{
    console.log("in user-joined event")
    append(`${name} joined the chat`, 'leftJoined' );
})

socket.on('receive', data =>{
    append(`${data.name} : ${data.message}`, 'received');
})

socket.on('left', name=>{
    append(`${name} left the chat`,'leftJoined')
})