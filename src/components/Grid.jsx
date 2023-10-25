import Square from './Square'
import calculateWinner from '../utils/CalculateWinner'
import isValidMove from '../utils/CalculateMove'
import { useState } from 'react'

const Grid = () => {

    const [xIsNext, setXIsNext] = useState(true)
    const [squares, setSquares] = useState(Array(9).fill(null))
    const [selectedSquare, setSelectedSquare] = useState(null)
    const [turnX, setTurnX] = useState(1)
    const [turnO, setTurnO] = useState(1)

    const winner = calculateWinner(squares)
    let status

    if (winner) {
        status = "Winner: " + winner
    } else {
        status = "Next player: " + (xIsNext ? "X" : "O")
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

        // TicTacToe
        if (xIsNext && turnX <= 3) {
            if (currSquare) {
                return;
            }
            nextSquares[i] = "X"
            setTurnX(prevTurnX => prevTurnX + 1)
            setXIsNext(!xIsNext)
        }
        else if (!xIsNext && turnO <= 3) {
            if (currSquare) {
                return
            }
            nextSquares[i] = "O"
            setTurnO(prevTurnO => prevTurnO + 1)
            setXIsNext(!xIsNext)
        }

        // Chorus lapilli
        else {
            if (selectedSquare === null) {
                if (currSquare && currSquare === (xIsNext ? 'X' : 'O')) {
                    setSelectedSquare(i)
                }
            }
            else if (!currSquare && isValidMove(i, selectedSquare)) {
                status = "Player: " + (xIsNext ? "X" : "O") + "move a piece"
                nextSquares[i] = nextSquares[selectedSquare]
                nextSquares[selectedSquare] = null
                setSelectedSquare(null)
                setXIsNext(!xIsNext)
            } 
        }
        setSquares(nextSquares)
    }

    return (
        <div className="grid">
            <div className="status">{status}</div>
            <div className="board-row">
                <Square
                    value={squares[0]}
                    onSquareClick={() => handleMove(0)}
                />
                <Square
                    value={squares[1]}
                    onSquareClick={() => handleMove(1)}
                />
                <Square
                    value={squares[2]}
                    onSquareClick={() => handleMove(2)}
                />
            </div>
            <div className="board-row">
                <Square
                    value={squares[3]}
                    onSquareClick={() => handleMove(3)}
                />
                <Square
                    value={squares[4]}
                    onSquareClick={() => handleMove(4)}
                />
                <Square
                    value={squares[5]}
                    onSquareClick={() => handleMove(5)}
                />
            </div>
            <div className="board-row">
                <Square
                    value={squares[6]}
                    onSquareClick={() => handleMove(6)}
                />
                <Square
                    value={squares[7]}
                    onSquareClick={() => handleMove(7)}
                />
                <Square
                    value={squares[8]}
                    onSquareClick={() => handleMove(8)}
                />
            </div>
            <button 
                className = "reset"
                onClick = {handleReset}
            >
                RESET
            </button>
        </div>
    );
}

export default Grid