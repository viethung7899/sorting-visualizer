import {sleep} from './generalFunctions';

async function bubbleSort(props, speed) {
    const data = props.data;
    for (let i = 0; i < data.length - 1; i++) {
        for (let j = 0; j < data.length - i - 1; j++) {
            props.select(j); props.select(j+1);
            await sleep(speed)
            if (data[j] > data[j+1]) {
                swap(data, j, j+1);
            }
            props.deselect(j);
            props.deselect(j+1);
        }
        props.markSorted(data.length - i - 1);
    }
    props.markSorted(0);
    props.switchSort();
}

function swap(arr, i, j) {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

export default bubbleSort;