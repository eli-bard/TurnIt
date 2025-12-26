document.addEventListener('DOMContentLoaded', () => {
    const GRID_SIZE = 5;
    let board = []; // Representa o estado atual do tabuleiro
    const gridBoardElement = document.getElementById('grid-board');
    const messageElement = document.getElementById('message');
    const resetButton = document.getElementById('reset-button');

    // Função para inicializar o tabuleiro com X e O alternados
    function initializeBoard() {
        board = []; // Limpa o tabuleiro anterior
        gridBoardElement.innerHTML = ''; // Limpa os elementos HTML anteriores
        messageElement.textContent = 'Tente transformar todos os quadros em \'X\'!';
        messageElement.classList.remove('win');

        for (let row = 0; row < GRID_SIZE; row++) {
            board[row] = [];
            for (let col = 0; col < GRID_SIZE; col++) {
                // Alterna X e O: (0,0) é X, (0,1) é O, (0,2) é X, etc.
                // Usamos a soma do índice da linha e coluna para alternar
                // Se (row + col) for par, é 'X', se for ímpar, é 'O'.
                const symbol = (row * GRID_SIZE + col) % 2 === 0 ? 'X' : 'O';
                board[row][col] = symbol;

                const cell = document.createElement('div');
                cell.classList.add('cell', symbol); // Adiciona classes 'cell' e 'X' ou 'O'
                cell.dataset.row = row; // Armazena a linha no dataset
                cell.dataset.col = col; // Armazena a coluna no dataset
                cell.textContent = symbol;
                cell.addEventListener('click', handleCellClick);
                gridBoardElement.appendChild(cell);
            }
        }
    }

    // Função para alternar o símbolo de uma célula
    function toggleSymbol(row, col) {
        if (row >= 0 && row < GRID_SIZE && col >= 0 && col < GRID_SIZE) {
            board[row][col] = (board[row][col] === 'X' ? 'O' : 'X');
            // Atualiza a representação visual da célula
            const cellElement = gridBoardElement.querySelector(`[data-row="${row}"][data-col="${col}"]`);
            if (cellElement) {
                cellElement.textContent = board[row][col];
                cellElement.classList.remove('X', 'O');
                cellElement.classList.add(board[row][col]);
            }
        }
    }

    // Função que lida com o clique em uma célula
    function handleCellClick(event) {
        if (isGameOver()) { // Impede cliques após a vitória
            return;
        }

        const row = parseInt(event.target.dataset.row);
        const col = parseInt(event.target.dataset.col);

        // Inverte a célula clicada
        toggleSymbol(row, col);

        // Inverte as células adjacentes (cima, baixo, esquerda, direita)
        toggleSymbol(row - 1, col); // Cima
        toggleSymbol(row + 1, col); // Baixo
        toggleSymbol(row, col - 1); // Esquerda
        toggleSymbol(row, col + 1); // Direita

        checkWinCondition();
    }

    // Função para verificar se o jogador venceu
    function checkWinCondition() {
        if (isGameOver()) {
            messageElement.textContent = 'Parabéns! Você transformou todos em \'X\'!';
            messageElement.classList.add('win');
            // Opcional: Desativar cliques ou mostrar algo mais
        }
    }

    // Verifica se todas as células são 'X'
    function isGameOver() {
        for (let row = 0; row < GRID_SIZE; row++) {
            for (let col = 0; col < GRID_SIZE; col++) {
                if (board[row][col] === 'O') {
                    return false; // Ainda existe um 'O', jogo não acabou
                }
            }
        }
        return true; // Todos são 'X'
    }

    // Event listener para o botão de reiniciar
    resetButton.addEventListener('click', initializeBoard);

    // Inicializa o jogo quando a página carrega
    initializeBoard();
});