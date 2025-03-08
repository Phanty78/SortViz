export const mergeSort = {
    name: 'Merge Sort',
    description: 'A divide-and-conquer algorithm that recursively breaks down the array into smaller subarrays until each subarray contains a single element, then merges them back in sorted order.',
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(n)',
    async sort(array, arrayBars, { compare, swap, sleep }) {
        const n = array.length;
        
        async function merge(start, mid, end) {
            const leftSize = mid - start + 1;
            const rightSize = end - mid;
            
            const leftArray = array.slice(start, mid + 1);
            const rightArray = array.slice(mid + 1, end + 1);
            
            let i = 0, j = 0, k = start;
            
            while (i < leftSize && j < rightSize) {
                if (leftArray[i] <= rightArray[j]) {
                    array[k] = leftArray[i];
                    arrayBars[k].style.height = `${(leftArray[i] / Math.max(...array)) * 100}%`;
                    arrayBars[k].classList.add('comparing');
                    await sleep(100);
                    arrayBars[k].classList.remove('comparing');
                    i++;
                } else {
                    array[k] = rightArray[j];
                    arrayBars[k].style.height = `${(rightArray[j] / Math.max(...array)) * 100}%`;
                    arrayBars[k].classList.add('comparing');
                    await sleep(100);
                    arrayBars[k].classList.remove('comparing');
                    j++;
                }
                k++;
            }
            
            while (i < leftSize) {
                array[k] = leftArray[i];
                arrayBars[k].style.height = `${(leftArray[i] / Math.max(...array)) * 100}%`;
                arrayBars[k].classList.add('comparing');
                await sleep(100);
                arrayBars[k].classList.remove('comparing');
                i++;
                k++;
            }
            
            while (j < rightSize) {
                array[k] = rightArray[j];
                arrayBars[k].style.height = `${(rightArray[j] / Math.max(...array)) * 100}%`;
                arrayBars[k].classList.add('comparing');
                await sleep(100);
                arrayBars[k].classList.remove('comparing');
                j++;
                k++;
            }
        }
        
        async function mergeSort(start, end) {
            if (start < end) {
                const mid = Math.floor((start + end) / 2);
                await mergeSort(start, mid);
                await mergeSort(mid + 1, end);
                await merge(start, mid, end);
            }
            if (start === end) {
                arrayBars[start].classList.add('sorted');
            }
        }
        
        await mergeSort(0, n - 1);
        arrayBars.forEach(bar => bar.classList.add('sorted'));
    }
}