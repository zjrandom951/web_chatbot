const chatLog = document.getElementById('chat-log');
const userInput = document.getElementById('chat-input');
let chatHistory = [];

function appendToChatLog(role, content) {
  let className = '';
  if (role === 'user') {
    className = 'user-message';
  } else if (role === 'ai') {
    className = 'ai-message';
  }
  const message = {
    role,
    content
  };
  chatHistory.push(message);
  chatLog.innerHTML += '<div class="' + className + '">' + content + '</div>';
  chatLog.scrollTop = chatLog.scrollHeight;
}

function sendUserInput() {
  const input = userInput.value.trim();
  if (input.length > 0) {
    appendToChatLog('user', input);
    userInput.value = '';
    document.getElementById('send-button').innerHTML = '<i class="fas fa-circle-notch fa-spin"></i>';
    document.getElementById('send-button').disabled = true;
    fetch('/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: 'input=' + encodeURIComponent(input)
    })
    .then(response => response.json())
    .then(data => {
      const message = data.response;
      appendToChatLog('ai', message);
    })
    .catch(error => {
      console.error('Error:', error);
    })
    .finally(() => {
      document.getElementById('send-button').innerHTML = '<i class="fas fa-paper-plane"></i>';
      document.getElementById('send-button').disabled = false;
    });
  }
}

userInput.addEventListener('keyup', function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    document.getElementById('send-button').click();
  }
});
