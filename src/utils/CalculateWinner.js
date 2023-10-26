const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

export function calculateWinner(squares) {
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i]
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a]
        }
    }
    return null
}

export function getWinningMoves(piece, squares) {
    const winningMoves = []
    lines.forEach(line => {
        const [a, b, c] = line
        if (squares[a] === null && squares[b] === piece && squares[c] === piece) {
            winningMoves.push(a)
        }
        else if (squares[b] === null && squares[a] === piece && squares[c] === piece) {
            winningMoves.push(b)
        }
        else if (squares[c] === null && squares[a] === piece && squares[b] === piece) {
            winningMoves.push(c)
        }
    })
    return winningMoves
}

