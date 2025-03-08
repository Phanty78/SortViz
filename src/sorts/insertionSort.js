export const insertionSort = {
    name: 'Insertion Sort',
    description: 'Builds the final sorted array one item at a time by repeatedly inserting a new element into a sorted portion of the array.',
    timeComplexity: 'O(n²)',
    spaceComplexity: 'O(1)',
    async sort(array, arrayBars, { compare, swap }) {
        const n = array.length;
        for (let i = 1; i < n; i++) {
            let j = i;
            while (j > 0 && await compare(j - 1, j)) {
                await swap(j - 1, j);
                j--;
            }
            arrayBars[j].classList.add('sorted');
        }
        arrayBars[n - 1].classList.add('sorted');
    }
}