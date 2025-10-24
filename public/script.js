function checkUsername() {
  const username = document.getElementById('username').value;

  fetch(`/check?username=${username}`)
    .then(res => res.json())
    .then(data => {
      document.getElementById('result').textContent =
        data.status === 'Available'
          ? 'Username is available'
          : 'Username is taken';
    });
}