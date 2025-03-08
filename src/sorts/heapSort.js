export const heapSort = {
    name: 'Heap Sort',
    description: 'A comparison-based sorting algorithm that uses a binary heap data structure to build a max-heap and repeatedly extract the maximum element.',
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(1)',
    async sort(array, arrayBars, { compare, swap }) {
        const n = array.length;

        async function heapify(n, i) {
            let largest = i;
            const left = 2 * i + 1;
            const right = 2 * i + 2;

            if (left < n && await compare(largest, left)) {
                largest = left;
            }

            if (right < n && await compare(largest, right)) {
                largest = right;
            }

            if (largest !== i) {
                await swap(i, largest);
                await heapify(n, largest);
            }
        }

        // Build max heap
        for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
            await heapify(n, i);
        }

        // Extract elements from heap one by one
        for (let i = n - 1; i > 0; i--) {
            await swap(0, i);
            arrayBars[i].classList.add('sorted');
            await heapify(i, 0);
        }

        arrayBars[0].classList.add('sorted');
    }
}