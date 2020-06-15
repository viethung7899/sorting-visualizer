import {sleep} from './generalFunctions';

async function quickSort(props, speed) {
    await quickSortHelper(props, speed, 0, props.data.length - 1);
    props.switchSort();
}

async function quickSortHelper(props, speed, low, high) {
    if (low < high) {
        const p = await parition(props, speed, low, high);
        props.markSorted(p);
        await quickSortHelper(props, speed, low, p-1);
        await quickSortHelper(props, speed, p+1, high);
    } else if (low === high) {
        props.markSorted(low);
    }
}

async function parition(props, speed, low, high) {
    const data = props.data;
    const pivot = await pickPivot(props, speed, low, high);
    await sleep(speed);
    let i = low;
    for (let j = low; j < high; j++) {
        if (data[j] < pivot) {
            props.select(i); props.select(j);
            await swap(data, i ,j, speed);
            props.deselect(i); props.deselect(j);
            i++;
        }
    }
    props.pick(i);
    await sleep(speed);
    swap(data, i, high, speed);
    props.deselect(high);
    await sleep(speed);
    return i;
}

async function pickPivot(props, speed, low, high) {
    const mid = Math.floor((low + high) / 2);
    const data = props.data;
    let minIndex = low;
    if (data[mid] < data[minIndex]) {
        minIndex = mid;
    }
    if (data[high] < data[minIndex]) {
        minIndex = high;
    }
    props.pick(minIndex);
    swap(data, minIndex, high, speed);
    props.deselect(minIndex);
    props.pick(high);
    return data[high];
}

async function swap(data, i, j, speed) {
    const temp = data[i];
    // Select
    data[i] = data[j];
    data[j] = temp;
    await sleep(speed);
    
}

export default quickSort;