import {sleep} from './generalFunctions';

async function mergeSort(props, speed) {
    const auxData = props.data.splice();
    await mergeSortHelper(props, auxData, 0, props.data.length - 1, speed);
    for (let i = 0; i < props.data.length; i++) {
        props.markSorted(i);
        await sleep(speed);
    }
    props.switchSort();
}

async function mergeSortHelper(props, auxData, low, high, speed) {
    const data = props.data;
    if (low < high) {
        let mid = Math.floor((low + high) / 2);
        copyDatatoAuxData(data, auxData, low, high);
        await mergeSortHelper(props, auxData, low, mid, speed);
        await mergeSortHelper(props, auxData, mid+1, high, speed);
        await merge(props, auxData, low, mid, high, speed);
        copyDatatoAuxData(data, auxData, low, high);
    }
}

async function merge(props, auxData, low, mid, high, speed) {
    const data = props.data;
    let i = low, j = mid+1, k = low;
    while(i <= mid && j <= high) {
        let index1 = i, index2 = j;
        props.select(index1); props.select(index2);
        if (auxData[i] < auxData[j]) {
            data[k] = auxData[i];
            i++;
        } else {
            data[k] = auxData[j];
            j++;
        }
        k++;
        await sleep(speed);
        props.deselect(index1); props.deselect(index2);
    }

    while(i <= mid) {
        props.select(i); props.select(high);
        data[k] = auxData[i];
        await sleep(speed);
        props.deselect(i); props.deselect(high);
        i++; k++;
    }

    while(j <= high) {
        props.select(j); props.select(mid);
        data[k] = auxData[j];
        await sleep(speed);
        props.deselect(j); props.deselect(mid);
        j++; k++;
    }
}

function copyDatatoAuxData(data, auxData, low, high) {
    for (let i = low; i <= high; i++) {
        auxData[i] = data[i];
    }
}

export default mergeSort;