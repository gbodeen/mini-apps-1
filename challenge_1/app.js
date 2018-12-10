
let winner = '';
let player = 'X';

const handleCellClick = (e) => {
    // Check if there's a game going on.
    if (winner) return;
    // Check if the cell is available.
    if (e.target.innerText) return;
    console.log(e, e.target);
    // Check for whose turn it is. Put a letter in the cell.
    e.target.innerText = player;
    // Check for a win or a tie.
}




const cells = document.getElementsByClassName('cell');

for (let cell of cells) {
    cell.addEventListener('click', handleCellClick);
}




