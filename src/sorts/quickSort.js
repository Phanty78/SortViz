export const quickSort = {
    name: 'Quick Sort',
    description: 'A divide-and-conquer algorithm that picks a pivot element and partitions the array around it, recursively sorting the sub-arrays.',
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(log n)',
    async sort(array, arrayBars, { compare, swap }) {
        const n = array.length;

        async function partition(low, high) {
            const pivot = array[high];
            let i = low - 1;

            for (let j = low; j < high; j++) {
                if (await compare(high, j)) {
                    i++;
                    if (i !== j) {
                        await swap(i, j);
                    }
                }
            }
            if (i + 1 !== high) {
                await swap(i + 1, high);
            }
            return i + 1;
        }

        async function quickSort(low, high) {
            if (low < high) {
                const pi = await partition(low, high);
                arrayBars[pi].classList.add('sorted');
                await quickSort(low, pi - 1);
                await quickSort(pi + 1, high);
            }
            if (low === high) {
                arrayBars[low].classList.add('sorted');
            }
        }

        await quickSort(0, n - 1);
    }
}