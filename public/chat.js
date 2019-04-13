const socket = io.connect('http://localhost:4000');

// dom elements
const message = document.querySelector('#message');
const name = document.querySelector('#handle');
const btn = document.querySelector('#send');
const output = document.querySelector('#output');
const feedback = document.querySelector('#feedback');

// emit events
btn.addEventListener('click', () => {
  socket.emit('chat', {
    message: message.value,
    name: name.value
  });
});

message.addEventListener('keyup', () => {
  socket.emit('typing', {
    name: name.value
  });
});

// listen events
socket.on('chat', data => {
  feedback.innerHTML = '';
  output.innerHTML += `
    <p>
      <strong>${data.name}: </strong>${data.message}
    </p>
  `;

  message.value = '';
  name.value = '';
});

socket.on('typing', data => {
  feedback.innerHTML = `<p><em>${data.name} is typing...</em></p>`;
});
