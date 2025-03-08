export const countingSort = {
    name: 'Counting Sort',
    description: 'A non-comparative integer sorting algorithm that works by counting the number of objects having distinct key values and using arithmetic to determine their positions.',
    timeComplexity: 'O(n + k)',
    spaceComplexity: 'O(k)',
    async sort(array, arrayBars, { compare, swap, sleep }) {
        const n = array.length;
        
        // Find the range of input array
        const max = Math.max(...array);
        const min = Math.min(...array);
        const range = max - min + 1;
        
        // Create count map and output array
        // Using a Map instead of an array to handle large ranges efficiently
        const countMap = new Map();
        const output = new Array(n);
        
        // Store count of each element
        for (let i = 0; i < n; i++) {
            const key = Math.floor(array[i]) - min;
            countMap.set(key, (countMap.get(key) || 0) + 1);
            arrayBars[i].classList.add('comparing');
            await sleep(100);
            arrayBars[i].classList.remove('comparing');
        }
        
        // Convert Map to cumulative counts
        let cumulative = 0;
        const cumulativeMap = new Map();
        
        // Sort the keys to ensure we process them in order
        const sortedKeys = Array.from(countMap.keys()).sort((a, b) => a - b);
        
        // Calculate cumulative counts
        for (const key of sortedKeys) {
            cumulative += countMap.get(key);
            cumulativeMap.set(key, cumulative);
        }
        
        // Build the output array
        for (let i = n - 1; i >= 0; i--) {
            const key = Math.floor(array[i]) - min;
            const count = cumulativeMap.get(key);
            const index = count - 1;
            output[index] = array[i];
            cumulativeMap.set(key, count - 1);
            
            // Update visualization
            array[index] = array[i];
            if (index >= 0 && index < arrayBars.length) {
                arrayBars[index].style.height = `${(array[i] / max) * 100}%`;
                arrayBars[index].classList.add('swapping');
                await sleep(100);
                arrayBars[index].classList.remove('swapping');
                arrayBars[index].classList.add('sorted');
            }
        }
        
        // Copy output array to original array
        for (let i = 0; i < n; i++) {
            array[i] = output[i];
        }
    }
}