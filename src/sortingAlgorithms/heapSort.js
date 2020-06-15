import {sleep} from './generalFunctions';

async function heapSort(props, speed) {
    const {data, switchSort, markSorted} = props;
    // Heapify
    for (let index = Math.floor((data.length - 2) / 2); index >= 0; index--) {
        await bubbleDown(props, index, data.length - 1, speed);
    }
    // Sort
    for (let i = 0; i < data.length; i++) {
        await swap(props, 0, data.length - i - 1, speed);
        markSorted(data.length - i - 1);
        await bubbleDown(props, 0, data.length - i - 2, speed);
    }
    switchSort();
}

async function bubbleDown(props, index, last, speed) {
    const data = props.data;
    let maxIndex = 2*index + 1;
    while (maxIndex <= last) {
        if (maxIndex < last && data[maxIndex] < data[maxIndex + 1])
            maxIndex++;
        if (data[index] < data[maxIndex]) {
            await swap(props, index, maxIndex, speed);
            index = maxIndex;
            maxIndex = 2 * index + 1;
        } else {
            maxIndex = last + 1;
        }
    }
}

async function swap(props, i, j, speed) {
    const {data, select, deselect} = props;
    select(i); select(j);
    await sleep(speed);
    const temp = data[i];
    data[i] = data[j];
    data[j] = temp;
    deselect(i); deselect(j);
}

export default heapSort;