// Comprobar si las coordenadas x e y están presentes en la URL
const params = new URLSearchParams(window.location.search);
const x = parseInt(params.get('x'));
const y = parseInt(params.get('y'));

if (isNaN(x) || isNaN(y)) {
    console.log(JSON.stringify({ error: 'Coordinates not provided.' }));
} else {
    // Obtener el tablero almacenado en el almacenamiento local (simulando la sesión PHP)
    const board = JSON.parse(localStorage.getItem('board'));

    if (board) {
        const rows = board.length;
        const cols = board[0].length;

        // Comprobar si las coordenadas están dentro de los límites
        if (x >= 0 && x < rows && y >= 0 && y < cols) {
            console.log(JSON.stringify({ value: board[x][y] }));
        } else {
            console.log(JSON.stringify({ error: `Coordinates [${x}, ${y}] out of bounds.` }));
        }
    } else {
        console.log(JSON.stringify({ error: 'Board not found in session.' }));
    }
}
