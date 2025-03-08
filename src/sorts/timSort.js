export const timSort = {
    name: 'Tim Sort',
    description: 'A hybrid stable sorting algorithm, combining merge sort and insertion sort, designed to perform well on many kinds of real-world data.',
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(n)',
    async sort(array, arrayBars, { compare, swap, sleep }) {
        const n = array.length;
        const RUN = 32;

        // Do insertion sort for small subarrays
        async function insertionSort(left, right) {
            for (let i = left + 1; i <= right; i++) {
                let j = i;
                while (j > left && await compare(j - 1, j)) {
                    await swap(j - 1, j);
                    j--;
                }
            }
        }

        // Merge function to merge sorted runs
        async function merge(left, mid, right) {
            const leftArray = array.slice(left, mid + 1);
            const rightArray = array.slice(mid + 1, right + 1);
            let i = 0, j = 0, k = left;

            while (i < leftArray.length && j < rightArray.length) {
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

            while (i < leftArray.length) {
                array[k] = leftArray[i];
                arrayBars[k].style.height = `${(leftArray[i] / Math.max(...array)) * 100}%`;
                arrayBars[k].classList.add('comparing');
                await sleep(100);
                arrayBars[k].classList.remove('comparing');
                i++;
                k++;
            }

            while (j < rightArray.length) {
                array[k] = rightArray[j];
                arrayBars[k].style.height = `${(rightArray[j] / Math.max(...array)) * 100}%`;
                arrayBars[k].classList.add('comparing');
                await sleep(100);
                arrayBars[k].classList.remove('comparing');
                j++;
                k++;
            }
        }

        // First, sort small subarrays of size RUN
        for (let i = 0; i < n; i += RUN) {
            await insertionSort(i, Math.min(i + RUN - 1, n - 1));
        }

        // Start merging from size RUN
        for (let size = RUN; size < n; size = 2 * size) {
            for (let left = 0; left < n; left += 2 * size) {
                const mid = left + size - 1;
                const right = Math.min(left + 2 * size - 1, n - 1);
                if (mid < right) {
                    await merge(left, mid, right);
                }
            }
        }

        // Mark all elements as sorted
        arrayBars.forEach(bar => bar.classList.add('sorted'));
    }
}