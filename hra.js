import { findWinner } from 'https://unpkg.com/piskvorky@0.1.4';

let currentPlayer = 'circle';
const buttons = document.querySelectorAll('button');
const player = document.getElementById('player');

buttons.forEach((button) => {
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

    const herniPole = Array.from(buttons).map((button) => {
      if (button.classList.contains('board__field--circle')) return 'o';
      if (button.classList.contains('board__field--cross')) return 'x';
      else return '_';
    });

    const winner = findWinner(herniPole);
    if (winner === 'x') {
      setTimeout(() => {
        alert('Vyhral krizek!');
        location.reload();
      }, 210);
    }
    if (winner === 'o') {
      setTimeout(() => {
        alert('Vyhralo kolecko!');
        location.reload();
      }, 210);
    }
    if (winner === 'tie') {
      setTimeout(() => {
        alert('Hra skoncila nerozhodne!');
        location.reload();
      }, 210);
    }

    /*   if (winner === 'x' || winner === 'o') {
      setTimeout(() => {
        alert(`Vyhral hrac se symbolem ${winner}!`);
      }, 1000);
      location.reload();} ....... */

    console.log('values', herniPole);
    console.log('winner', winner);
  });
});

const onRestart = document.getElementById('confirm');

onRestart.addEventListener('click', (event) => {
  const response = confirm('Opravdu chceš začít znovu?');
  if (response === false) {
    event.preventDefault();
  }
});
