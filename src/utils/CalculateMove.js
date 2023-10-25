export default function isValidMove(curr, dest) {
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
    return adjacentNumbers[curr].has(dest)
}