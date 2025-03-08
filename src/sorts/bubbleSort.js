export const bubbleSort = {
    name: 'Bubble Sort',
    description: 'A simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.',
    timeComplexity: 'O(n²)',
    spaceComplexity: 'O(1)',
    async sort(array, arrayBars, { compare, swap }) {
        const n = array.length;
        for (let i = 0; i < n - 1; i++) {
            for (let j = 0; j < n - i - 1; j++) {
                if (await compare(j, j + 1)) {
                    await swap(j, j + 1);
                }
            }
            arrayBars[n - i - 1].classList.add('sorted');
        }
        arrayBars[0].classList.add('sorted');
    }
}