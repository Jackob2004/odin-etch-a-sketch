const BASE_GRID_SIZE = 600;
const gridContainer = document.querySelector('.grid-container');

function calculateElementSize(elementsInRow) {
    const GRID_ELEMENT_BORDER= 2;
    return BASE_GRID_SIZE / elementsInRow - GRID_ELEMENT_BORDER;
}

function createGridElements(elementsInRow = 16) {
    const totalGridElements = elementsInRow * elementsInRow;
    const elementSize = calculateElementSize(elementsInRow);

    for (let i = 0; i < totalGridElements; i++) {
        const gridElement = document.createElement('div');
        gridElement.setAttribute('style', `border: 1px solid black; flex: 1 1 ${elementSize}px`);
        gridContainer.appendChild(gridElement);
    }
}

function changeGridElementColor(event) {
    const gridElement = event.target;

    if (gridElement === gridContainer) return;

    if (gridElement.style.backgroundColor !== '') return;

    gridElement.style.backgroundColor = 'black';
}

function regenerateGrid() {
    const newRowSize = +prompt('Enter new gird\'s dimension [1-100]', '');
    if (!newRowSize || !Number.isInteger(newRowSize)) return;

    let validatedRowSize = newRowSize;

    validatedRowSize = (validatedRowSize > 100) ? 100 : validatedRowSize;
    validatedRowSize = (validatedRowSize < 1) ? 1 : validatedRowSize;

    document.querySelectorAll('.grid-container div').forEach((node) => node.remove());
    createGridElements(validatedRowSize);
}

createGridElements();

gridContainer.addEventListener('mouseover', changeGridElementColor);
document.querySelector('button').addEventListener('click', regenerateGrid);
