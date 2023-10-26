const Square = ({ value, onSquareClick, isSelected }) => {

    return (
        <button
            className={`square ${isSelected ? 'selected' : ''}`}
            onClick={onSquareClick}
        >
            {value}
        </button>
    )
}

export default Square
