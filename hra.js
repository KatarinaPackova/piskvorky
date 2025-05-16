import { findWinner } from 'https://unpkg.com/piskvorky@0.1.4';

let currentPlayer = 'circle';
const buttons = document.querySelectorAll('button');
const player = document.getElementById('player');
let isGameOver = false;

const getHerniPole = () => {
  return Array.from(buttons).map((button) => {
    if (button.classList.contains('board__field--circle')) return 'o';
    if (button.classList.contains('board__field--cross')) return 'x';
    else return '_';
  });
};

const circleMove = async () => {
  const herniPole = getHerniPole();
  const winner = findWinner(herniPole);
  if (!winner && currentPlayer === 'cross') {
    const response = await fetch(
      'https://piskvorky.czechitas-podklady.cz/api/suggest-next-move',
      {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          board: herniPole,
          player: 'x', // Hledá tah pro křížek.
        }),
      },
    );
    const data = await response.json();

    const { x, y } = data.position;
    const index = x + y * 10;
    const field = buttons[index];
    if (!isGameOver) {
      // Zkontrolujeme ještě jednou
      field.click();
    }
    // field.click();
  }
};

buttons.forEach((button) => {
  button.addEventListener('click', async (event) => {
    if (isGameOver || event.target.disabled) return;
    if (currentPlayer === 'circle') {
      event.target.classList.add('board__field--circle');
      currentPlayer = 'cross';

      player.src = 'img/hra2/cross.svg';
      const herniPole = getHerniPole();
      const winner = findWinner(herniPole);

      if (!winner) {
        await circleMove();
      }
    } else if (currentPlayer === 'cross') {
      event.target.classList.add('board__field--cross');

      currentPlayer = 'circle';
      player.src = 'img/hra2/circle.svg';
    }
    event.target.disabled = true;
    const herniPole = getHerniPole();
    const winner = findWinner(herniPole);

    if (winner && !isGameOver) {
      isGameOver = true;

      setTimeout(() => {
        if (winner === 'x') alert('Vyhral krizek!');
        else if (winner === 'o') alert('Vyhralo kolecko!');
        else if (winner === 'tie') alert('Hra skoncila nerozhodne!');
        console.log('Reloading page now');

        location.reload();
      }, 210);
      return;
    }

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
