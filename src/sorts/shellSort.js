export const shellSort = {
    name: 'Shell Sort',
    description: 'An optimization of insertion sort that allows the exchange of items that are far apart, gradually reducing the gap between elements to be compared.',
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(1)',
    async sort(array, arrayBars, { compare, swap }) {
        const n = array.length;
        
        for (let gap = Math.floor(n/2); gap > 0; gap = Math.floor(gap/2)) {
            for (let i = gap; i < n; i++) {
                let temp = array[i];
                let j;
                
                for (j = i; j >= gap && await compare(j - gap, j); j -= gap) {
                    await swap(j - gap, j);
                }
                
                if (gap === 1) {
                    arrayBars[j].classList.add('sorted');
                }
            }
        }
        
        arrayBars.forEach(bar => bar.classList.add('sorted'));
    }
}