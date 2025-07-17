const BASE_GRID_SIZE = 600;

function createGridElements(elementsInRow, gridContainer) {
    const totalGridElements = elementsInRow * elementsInRow;
    const elementSize = Math.floor(BASE_GRID_SIZE / elementsInRow);

    for (let i = 0; i < totalGridElements; i++) {
        const gridElement = document.createElement('div');
        gridElement.setAttribute('style', `border: 1px solid black;
                             height: ${elementSize}px; width: ${elementSize}px`);

        gridContainer.appendChild(gridElement);
    }
}

function adjustGridSize(elementsInRow, gridContainer) {
    const GRID_ELEMENT_BORDER= 2;

    let adjustedGridSize = BASE_GRID_SIZE + GRID_ELEMENT_BORDER * elementsInRow;

    if (BASE_GRID_SIZE % elementsInRow !== 0) {
        adjustedGridSize -= BASE_GRID_SIZE % elementsInRow;
    }

    gridContainer.setAttribute('style', `height: ${adjustedGridSize}px; width: ${adjustedGridSize}px`);
}

function generateGrid() {
    const gridContainer = document.querySelector('.grid-container');
    let elementsInRow= 16;

    createGridElements(elementsInRow, gridContainer);
    adjustGridSize(elementsInRow, gridContainer);
}

generateGrid();


