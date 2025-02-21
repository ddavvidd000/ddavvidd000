// Función para crear el tablero
function createBoard(size) {
    const totalPairs = (size * size) / 2;
    let numbers = [];
    
    // Generar los números
    for (let i = 1; i <= totalPairs; i++) {
        numbers.push(i, i); // Añadir cada número dos veces
    }

    // Barajar los números
    numbers = numbers.sort(() => Math.random() - 0.5);

    // Crear el tablero
    const board = [];
    for (let i = 0; i < size; i++) {
        board[i] = [];
        for (let j = 0; j < size; j++) {
            board[i][j] = numbers.pop(); // Colocar los números en el tablero
        }
    }

    // Almacenar el tablero en localStorage
    localStorage.setItem('board', JSON.stringify(board));
}

// Obtener el parámetro "size" de la URL
const params = new URLSearchParams(window.location.search);
const size = parseInt(params.get('size'));

let response;

if (!isNaN(size) && size >= 2 && size <= 8 && size % 2 === 0) {
    // Crear el tablero si el tamaño es válido
    createBoard(size);
    response = { success: 1 };
} else {
    // Respuesta de error si el tamaño no es válido
    response = { success: 0 };
}

// Mostrar la respuesta en formato JSON en la consola
console.log(JSON.stringify(response));
