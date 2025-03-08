export const bucketSort = {
    name: 'Bucket Sort',
    description: 'A distribution sorting algorithm that distributes elements into a number of buckets, sorts the buckets individually, and then concatenates them to get the final sorted array.',
    timeComplexity: 'O(n + k)',
    spaceComplexity: 'O(n + k)',
    async sort(array, arrayBars, { compare, swap, sleep }) {
        const n = array.length;
        const bucketCount = Math.floor(Math.sqrt(n));
        
        // Create buckets
        const buckets = Array.from({ length: bucketCount }, () => []);
        const max = Math.max(...array);
        
        // Distribute elements into buckets
        for (let i = 0; i < n; i++) {
            const bucketIndex = Math.floor((array[i] * (bucketCount - 1)) / max);
            buckets[bucketIndex].push(array[i]);
            arrayBars[i].classList.add('comparing');
            await sleep(100);
            arrayBars[i].classList.remove('comparing');
        }
        
        // Sort individual buckets (using insertion sort)
        for (let i = 0; i < bucketCount; i++) {
            buckets[i].sort((a, b) => a - b);
        }
        
        // Concatenate all buckets into array
        let index = 0;
        for (let i = 0; i < bucketCount; i++) {
            for (let j = 0; j < buckets[i].length; j++) {
                array[index] = buckets[i][j];
                arrayBars[index].style.height = `${(buckets[i][j] / max) * 100}%`;
                arrayBars[index].classList.add('swapping');
                await sleep(100);
                arrayBars[index].classList.remove('swapping');
                arrayBars[index].classList.add('sorted');
                index++;
            }
        }
    }
}