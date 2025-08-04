let gameState = {
    players: [],
    currentPlayerIndex: 0,
    winner: null
}

module.exports = {
    getGameState: () => gameState,
    addPlayer: (userId) => {
        if (gameState.players.length < 2 && !gameState.players.includes(userId)) {
            gameState.players.push(userId);
            return true;
        }
        return false;
    },
    nextTurn: () => {
        gameState.currentPlayerIndex = (gameState.currentPlayerIndex + 1) % 2;
    },
    setWinner: (userId) => {
        gameState.winner = userId;
    },
    resetGame: () => {
        gameState = {
            players: [],
            currentPlayerIndex: 0,
            gameStarted: false,
            winner: null
        }
    }
}