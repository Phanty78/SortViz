// State management
let array = [];
let arrayBars = [];
let isSorting = false;
let isPaused = false;
let comparisons = 0;
let swaps = 0;
let startTime = 0;
let elapsedTime = 0;
let timerInterval = null;

// DOM Elements
const arrayContainer = document.getElementById('array-container');
const algorithmSelect = document.getElementById('algorithm');
const sizeSlider = document.getElementById('size');
const speedSlider = document.getElementById('speed');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const sizeValue = document.getElementById('size-value');
const speedValue = document.getElementById('speed-value');
const comparisonsElement = document.getElementById('comparisons');
const swapsElement = document.getElementById('swaps');
const algorithmDetails = document.getElementById('algorithm-details');
const timerElement = document.getElementById('timer');

// Import sorting algorithms
import { sortingAlgorithms, getSortingAlgorithm } from './src/sorts/index.js';

// Initialize the visualization
function init() {
    generateArray();
    updateSizeValue();
    updateSpeedValue();
    displayAlgorithmInfo();
}

// Generate random array
function generateArray() {
    const size = parseInt(sizeSlider.value);
    array = Array(size).fill(0).map(() => Math.random() * 100);
    visualizeArray();
}

// Visualize array as bars
function visualizeArray() {
    arrayContainer.innerHTML = '';
    arrayBars = [];
    
    const maxValue = Math.max(...array);
    const width = (arrayContainer.clientWidth - (array.length * 2)) / array.length;
    
    array.forEach((value, index) => {
        const bar = document.createElement('div');
        bar.className = 'array-bar';
        bar.style.height = `${(value / maxValue) * 100}%`;
        bar.style.width = `${width}px`;
        arrayContainer.appendChild(bar);
        arrayBars.push(bar);
    });
}

// Update display values
function updateSizeValue() {
    sizeValue.textContent = sizeSlider.value;
}

function updateSpeedValue() {
    speedValue.textContent = speedSlider.value;
}

function displayAlgorithmInfo() {
    const algorithm = algorithmSelect.value;
    const info = sortingAlgorithms[algorithm];
    if (info) {
        algorithmDetails.innerHTML = `
            <h4>${info.name}</h4>
            <p>${info.description}</p>
            <p><strong>Time Complexity:</strong> ${info.timeComplexity}</p>
            <p><strong>Space Complexity:</strong> ${info.spaceComplexity}</p>
        `;
    }
}

// Utility functions for sorting
async function sleep(ms) {
    // Ensure a minimum delay of 20ms for visual feedback
    const minDelay = 20;
    const actualDelay = Math.max(100 - speedSlider.value, minDelay);
    return new Promise(resolve => setTimeout(resolve, actualDelay));
}

async function swap(i, j) {
    if (isPaused) return;
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
    
    // Update visualization
    const tempHeight = arrayBars[i].style.height;
    arrayBars[i].style.height = arrayBars[j].style.height;
    arrayBars[j].style.height = tempHeight;
    
    arrayBars[i].classList.add('swapping');
    arrayBars[j].classList.add('swapping');
    await sleep(100 - speedSlider.value);
    arrayBars[i].classList.remove('swapping');
    arrayBars[j].classList.remove('swapping');
    
    swaps++;
    swapsElement.textContent = swaps;
}

async function compare(i, j) {
    if (isPaused) return;
    arrayBars[i].classList.add('comparing');
    arrayBars[j].classList.add('comparing');
    await sleep(100 - speedSlider.value);
    arrayBars[i].classList.remove('comparing');
    arrayBars[j].classList.remove('comparing');
    
    comparisons++;
    comparisonsElement.textContent = comparisons;
    return array[i] > array[j];
}

// Sorting Algorithms
async function runSort(algorithm) {
    const sortAlgorithm = getSortingAlgorithm(algorithm);
    if (!sortAlgorithm) return;
    
    await sortAlgorithm.sort(array, arrayBars, { compare, swap, sleep });
}

// Event Listeners
sizeSlider.addEventListener('input', () => {
    updateSizeValue();
    generateArray();
});

speedSlider.addEventListener('input', updateSpeedValue);

algorithmSelect.addEventListener('change', displayAlgorithmInfo);

function startTimer() {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(updateTimer, 10);
}

function updateTimer() {
    elapsedTime = Date.now() - startTime;
    timerElement.textContent = (elapsedTime / 1000).toFixed(2) + 's';
}

function stopTimer() {
    clearInterval(timerInterval);
}

function resetTimer() {
    stopTimer();
    elapsedTime = 0;
    timerElement.textContent = '0.00s';
}

startButton.addEventListener('click', async () => {
    if (isSorting) return;
    isSorting = true;
    comparisons = 0;
    swaps = 0;
    comparisonsElement.textContent = '0';
    swapsElement.textContent = '0';
    resetTimer();
    startTimer();
    
    const algorithm = algorithmSelect.value;
    await runSort(algorithm);
    
    stopTimer();
    isSorting = false;
});

resetButton.addEventListener('click', () => {
    generateArray();
    arrayBars.forEach(bar => bar.classList.remove('sorted', 'comparing', 'swapping'));
    comparisons = 0;
    swaps = 0;
    comparisonsElement.textContent = '0';
    swapsElement.textContent = '0';
    resetTimer();
});

pauseButton.addEventListener('click', () => {
    isPaused = !isPaused;
    pauseButton.textContent = isPaused ? 'Resume' : 'Pause';
});

// Initialize on load
window.addEventListener('load', init);
window.addEventListener('resize', visualizeArray);