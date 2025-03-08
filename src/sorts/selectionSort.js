export const selectionSort = {
    name: 'Selection Sort',
    description: 'Divides the input list into a sorted and an unsorted region, and repeatedly selects the smallest element from the unsorted region to add to the sorted region.',
    timeComplexity: 'O(n²)',
    spaceComplexity: 'O(1)',
    async sort(array, arrayBars, { compare, swap }) {
        const n = array.length;
        for (let i = 0; i < n - 1; i++) {
            let minIdx = i;
            for (let j = i + 1; j < n; j++) {
                if (await compare(j, minIdx)) {
                    minIdx = j;
                }
            }
            if (minIdx !== i) {
                await swap(i, minIdx);
            }
            arrayBars[i].classList.add('sorted');
        }
        arrayBars[n - 1].classList.add('sorted');
    }
}