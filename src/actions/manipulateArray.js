export function select(index) {
    return {
        type: 'SELECT',
        index: index
    }
}

export function deselect(index) {
    return {
        type: 'DESELECT',
        index: index
    }
}

export function markSorted(index) {
    return {
        type: 'MARK_SORTED',
        index: index
    }
}

export function pick(index) {
    return {
        type: 'PICK',
        index: index
    }
}