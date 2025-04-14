let currentPlayer = 'circle';
const button = document.querySelectorAll('button');
const player = document.getElementById('player');

button.forEach((button) => {
  button.addEventListener('click', (event) => {
    if (currentPlayer === 'circle') {
      event.target.classList.add('board__field--circle');
      currentPlayer = 'cross';
      player.src = 'img/hra2/cross.svg';
    } else if (currentPlayer === 'cross') {
      event.target.classList.add('board__field--cross');
      currentPlayer = 'circle';
      player.src = 'img/hra2/circle.svg';
    }
    event.target.disabled = true;
  });
});

const onRestart = document.getElementById('confirm');

onRestart.addEventListener('click', (event) => {
  const response = confirm('Opravdu chceš začít znovu?');
  if (response === false) {
    event.preventDefault();
  }
});
