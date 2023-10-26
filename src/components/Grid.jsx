import Square from './Square'
import { calculateWinner, getWinningMoves } from '../utils/CalculateWinner'
import { isValidMove, getWinningSquares } from '../utils/CalculateMove'
import { useState } from 'react'

const Grid = () => {
    const [xIsNext, setXIsNext] = useState(true)
    const [squares, setSquares] = useState(Array(9).fill(null))
    const [selectedSquare, setSelectedSquare] = useState(null)
    const [turnX, setTurnX] = useState(1)
    const [turnO, setTurnO] = useState(1)
    const allPositions = new Set(Array.from({ length: 9 }, (_, index) => index))

    const winner = calculateWinner(squares)
    let status

    if (winner) {
        status = "Winner: " + winner
    } 
    else {
        status = "Turn: " + (xIsNext ? "X" : "O")
        if ((squares[4] === 'X' && xIsNext && turnX > 3) || (squares[4] === 'O' && !xIsNext && turnO > 3)) {
            status = status + " owns the center square"
        }
    }

    const handleReset = () => {
        setXIsNext(true)
        setSquares(Array(9).fill(null))
        setSelectedSquare(null)
        setTurnX(1)
        setTurnO(1)
    }

    const handleMove = (i) => {
        const nextSquares = squares.slice()
        const currSquare = squares[i]

        if ((xIsNext && turnX <= 3) || (!xIsNext && turnO <= 3)) {
            if (currSquare) {
                return;
            }
            nextSquares[i] = xIsNext ? 'X' : 'O';
            if (xIsNext) {
                setTurnX(prevTurnX => prevTurnX + 1)
            } 
            else {
                setTurnO(prevTurnO => prevTurnO + 1)
            }
            setXIsNext(!xIsNext)
        }
        else if ((xIsNext && nextSquares[4] == 'X') || (!xIsNext && nextSquares[4] == 'O')) {
            const winningMoves = getWinningMoves(nextSquares[4], squares)
            const winningSquares = getWinningSquares(nextSquares[4], squares, winningMoves)
            
            if (winningSquares.has(i)) {
                selectPiece(i)
            } 
            else if (selectedSquare === 4) {
                movePiece(i, nextSquares, allPositions)
            }
            else {
                movePiece(i, nextSquares, new Set(winningMoves))
            }
        }
        else {
            selectPiece(i)
            movePiece(i, nextSquares, allPositions)
        }
        setSquares(nextSquares)
    }

    const selectPiece = (i) => {
        if (squares[i] != null && squares[i] === (xIsNext ? 'X' : 'O')) {
            setSelectedSquare(i)
        }
    }

    const movePiece = (i, nextSquares, validMoves) => {
        if (validMoves.has(i) && selectedSquare != null && squares[i] === null && isValidMove(selectedSquare, i)) {
            nextSquares[i] = nextSquares[selectedSquare]
            nextSquares[selectedSquare] = null
            setSelectedSquare(null)
            setXIsNext(!xIsNext)
        }
    }

    return (
        <div className="grid">
            <div className="status">{status}</div>
            {Array(3).fill(null).map((_, row) => (
                <div className="board-row" key={row}>
                    {Array(3).fill(null).map((_, col) => {
                        const squareIndex = row * 3 + col;
                        return (
                            <Square
                                key={squareIndex}
                                value={squares[squareIndex]}
                                onSquareClick={() => handleMove(squareIndex)}
                                isSelected={selectedSquare === squareIndex}
                            />
                        );
                    })}
                </div>
            ))}
            <button
                className="reset"
                onClick={handleReset}
            >
                RESET
            </button>
        </div>
    );
}

export default Grid