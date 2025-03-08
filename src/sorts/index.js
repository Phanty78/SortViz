import { bubbleSort } from './bubbleSort.js';
import { selectionSort } from './selectionSort.js';
import { insertionSort } from './insertionSort.js';
import { mergeSort } from './mergeSort.js';
import { quickSort } from './quickSort.js';
import { heapSort } from './heapSort.js';
import { shellSort } from './shellSort.js';
import { countingSort } from './countingSort.js';
import { radixSort } from './radixSort.js';
import { bucketSort } from './bucketSort.js';
import { timSort } from './timSort.js';

export const sortingAlgorithms = {
    bubble: bubbleSort,
    selection: selectionSort,
    insertion: insertionSort,
    merge: mergeSort,
    quick: quickSort,
    heap: heapSort,
    shell: shellSort,
    counting: countingSort,
    radix: radixSort,
    bucket: bucketSort,
    tim: timSort
};

export const getSortingAlgorithm = (name) => {
    return sortingAlgorithms[name] || null;
};