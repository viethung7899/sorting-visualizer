import {sleep} from './generalFunctions';

async function insertionSort(props, speed) {
    const data = props.data;
    for (let i = 1; i < data.length; i++) {
        for (let j = i; j > 0 && data[j-1] > data[j]; j--) {
            props.select(j);
            await sleep(speed);
            swap(data, j-1, j);
            props.deselect(j);
        }
    }

    for (let i = 0; i < data.length; i++) {
        props.markSorted(i);
        await sleep(speed);
    }
    props.switchSort();
}

function swap(arr, i, j) {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

export default insertionSort;