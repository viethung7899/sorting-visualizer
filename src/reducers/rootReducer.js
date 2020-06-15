// Import algorithms
import bubbleSort from '../sortingAlgorithms/bubbleSort';
import insertionSort from '../sortingAlgorithms/insertionSort';
import mergeSort from '../sortingAlgorithms/mergeSort';
import quickSort from '../sortingAlgorithms/quickSort';
import selectionSort from '../sortingAlgorithms/selectionSort';
import heapSort from '../sortingAlgorithms/heapSort';

const initState = {
    running: false,
    algorithm: null,
    size: 0,
    data: [],
    colors: [],
    speed: 0
}

const color = {
    UNSELECTED: 'gray',
    SELECTED: 'red',
    SORTED: 'green',
    PIVOT: 'yellow'
}

const rootReducer = (state = initState, action) => {
    switch(action.type) {
        case 'SWITCH':
            return {
                ...state,
                running: !state.running
            }
        case 'CHANGE_ALGORITHM':
            return {
                ...state,
                algorithm: getAlgorithmFromId(action.algorithm)
            }
        case 'GENERATE':
            return {
                ...state,
                size: action.size,
                data: generateArray(action.size),
                colors: generateColorArray(action.size),
                speed: map(action.size, 50, 250, 20, 1)
            }
        case 'SELECT':
            return {
                ...state,
                colors: change(state.colors, action.index, color.SELECTED)
            }
        case 'DESELECT':
            return {
                ...state,
                colors: change(state.colors, action.index, color.UNSELECTED)
            }
        case 'MARK_SORTED':
            return {
                ...state,
                colors: change(state.colors, action.index, color.SORTED)
            }
        case 'PICK':
            return {
                ...state,
                colors: change(state.colors, action.index, color.PIVOT)
            }
        default: {
            return state;
        }
    }
}

function generateArray(size) {
    let arr = [];
    for (let i = 0; i < size; i++)  {
        arr.push(getRandomIntInclusive(50, 600));
    }
    return arr;
}

function generateColorArray(size) {
    let arr = [];
    for (let i = 0; i < size; i++)  {
        arr.push(color.UNSELECTED);
    }
    return arr;
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}

function change(colors, index, color) {
    const newColors = colors.slice();
    newColors[index] = color;
    return newColors;
}

function map(value, x1, x2, y1, y2) {
    return y1 + (y2 - y1) / (x2 - x1) * (value - x1);
}

function getAlgorithmFromId(algorithm) {
    switch(algorithm) {
        case 'bubble-sort':
            return bubbleSort;
        case 'insertion-sort':
            return insertionSort;
        case 'merge-sort':
            return mergeSort;
        case 'quick-sort':
            return quickSort;
        case 'selection-sort':
            return selectionSort;
        case 'heap-sort':
            return heapSort;
        default:
            return null;
    }
}

export default rootReducer;