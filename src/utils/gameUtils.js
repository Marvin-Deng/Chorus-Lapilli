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

const adjacentNumbers = {
    0: new Set([1, 3, 4]),
    1: new Set([0, 2, 3, 4, 5]),
    2: new Set([1, 4, 5]),
    3: new Set([0, 1, 4, 6, 7]),
    4: new Set([0, 1, 2, 3, 5, 6, 7, 8]),
    5: new Set([1, 2, 4, 7, 8]),
    6: new Set([3, 4, 7]),
    7: new Set([3, 4, 5, 6, 8]),
    8: new Set([4, 5, 7]),
}

export function isValidMove(curr, dest) {
    return adjacentNumbers[curr].has(dest)
}

export function calculateWinner(squares) {
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i]
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a]
        }
    }
    return null
}

export function getWinningMoves(i, piece, squares) {
    
    const validMoves = new Set()
    let squaresCopy = [...squares];

    for (const neighbor of adjacentNumbers[i]) {
        squaresCopy[i] = null
        if (squaresCopy[neighbor] === null) {
            squaresCopy[neighbor] = piece
            for (let k = 0; k < lines.length; k++) {
                const [a, b, c] = lines[k]          
                if (squaresCopy[a] === piece && squaresCopy[a] === squaresCopy[b] && squaresCopy[a] === squaresCopy[c]) {
                    validMoves.add(neighbor)
                }
            }
        }
        squaresCopy = [...squares]
    }
    return validMoves
}

