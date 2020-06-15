export function changeAlgorithm(algorithm) {
    return {
        type: 'CHANGE_ALGORITHM',
        algorithm: algorithm
    }
}

export function generateData(size) {
    return {
        type: 'GENERATE',
        size: size
    }
}