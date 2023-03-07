const form = document.getElementById('login-form');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const errorMessage = document.getElementById('error-message');

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const username = usernameInput.value;
  const password = passwordInput.value;
  const response = await fetch('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password })
  });
  const data = await response.json();
  if (response.ok) {
    window.location.href = '/chat';
  } else {
    errorMessage.innerText = data.message;
  }
});
