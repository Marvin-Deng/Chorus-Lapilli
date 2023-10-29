import { useState } from 'react'
import { calculateWinner, isValidMove, getWinningMoves } from '../utils/gameUtils'
import Square from './Square'

const Grid = () => {
    const [xIsNext, setXIsNext] = useState(true)
    const [squares, setSquares] = useState(Array(9).fill(null))
    const [selectedSquare, setSelectedSquare] = useState(null)
    const [turn, setTurn] = useState(1)

    const allPositions = new Set(Array.from({ length: 9 }, (_, index) => index))
    const winner = calculateWinner(squares)
    const currPiece = xIsNext ? "X" : "O"

    let status = winner ? `Winner: ${winner}` : `Turn: ${currPiece}`

    if (turn > 6 && squares[4] === currPiece) {
        status += " owns the center square"
    }

    const handleReset = () => {
        setXIsNext(true)
        setSquares(Array(9).fill(null))
        setSelectedSquare(null)
        setTurn(1)
    }

    const handleMove = (i) => {
        if (winner) {
            return
        }

        const nextSquares = [...squares]

        if (turn <= 6) {
            if (squares[i]) {
                return;
            }
            nextSquares[i] = currPiece;
            setTurn(prevTurn => prevTurn + 1)
            setXIsNext(!xIsNext)
        }
        else if (nextSquares[4] == currPiece) {
            if (squares[i] != null) {
                const centerMoves = getWinningMoves(i, nextSquares[4], squares)
                if (centerMoves.size || i === 4) {
                    selectPiece(i)
                }
            }
            else {
                if (selectedSquare === 4) {
                    movePiece(i, nextSquares, allPositions)
                }
                else {
                    const centerMoves = getWinningMoves(selectedSquare, nextSquares[4], squares)
                    movePiece(i, nextSquares, centerMoves)
                }
            }
        }
        else {
            selectPiece(i)
            movePiece(i, nextSquares, allPositions)
        }
        setSquares(nextSquares)
    }

    const selectPiece = (i) => {
        if (squares[i] === currPiece) {
            setSelectedSquare(i)
        }
    }

    const movePiece = (i, nextSquares, validMoves) => {
        if (isValidMove(selectedSquare, i) && validMoves.has(i) && selectedSquare != null && squares[i] === null) {
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