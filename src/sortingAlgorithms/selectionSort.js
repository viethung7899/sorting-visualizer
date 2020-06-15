import {sleep} from './generalFunctions';

async function selectionSort(props, speed) {
    const data = props.data;
    for (let i = 0; i < data.length; i++) {
        let min = data[i];
        let minIndex = i;
        props.pick(i);
        await sleep(speed);
        for (let j = i + 1; j < data.length; j++) {
            props.select(j);
            await sleep(speed);
            // Find minimum
            if (min > data[j]) {
                props.deselect(minIndex);
                props.pick(j);
                min = data[j];
                minIndex = j;
                props.pick(minIndex);
                await sleep(speed);
            }
            if (j !== minIndex) {
                props.deselect(j);
            }
        }
        props.deselect(minIndex);
        swap(data, i, minIndex);
        props.pick(i);
        await sleep(speed);
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

export default selectionSort;