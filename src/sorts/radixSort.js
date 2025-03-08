export const radixSort = {
    name: 'Radix Sort',
    description: 'A non-comparative integer sorting algorithm that sorts integers by processing each digit position, starting from the least significant digit.',
    timeComplexity: 'O(d * (n + k))',
    spaceComplexity: 'O(n + k)',
    async sort(array, arrayBars, { compare, swap, sleep }) {
        const n = array.length;
        
        // Find the maximum number to know number of digits
        const max = Math.max(...array);
        
        // Do counting sort for every digit
        for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
            const output = new Array(n).fill(0);
            const count = new Array(10).fill(0);
            
            // Store count of occurrences in count[]
            for (let i = 0; i < n; i++) {
                const digit = Math.floor(array[i] / exp) % 10;
                count[digit]++;
                arrayBars[i].classList.add('comparing');
                await sleep(100);
                arrayBars[i].classList.remove('comparing');
            }
            
            // Change count[i] so that count[i] now contains
            // actual position of this digit in output[]
            for (let i = 1; i < 10; i++) {
                count[i] += count[i - 1];
            }
            
            // Build the output array
            for (let i = n - 1; i >= 0; i--) {
                const digit = Math.floor(array[i] / exp) % 10;
                const index = count[digit] - 1;
                output[index] = array[i];
                count[digit]--;
                
                // Update visualization
                array[index] = array[i];
                if (index >= 0 && index < arrayBars.length) {
                    arrayBars[index].style.height = `${(array[i] / max) * 100}%`;
                    arrayBars[index].classList.add('swapping');
                    await sleep(100);
                    arrayBars[index].classList.remove('swapping');
                }
            }
            
            // Copy the output array to array[]
            for (let i = 0; i < n; i++) {
                array[i] = output[i];
                if (exp >= max) {
                    arrayBars[i].classList.add('sorted');
                }
            }
        }
    }
}