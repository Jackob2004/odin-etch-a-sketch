const BASE_GRID_SIZE = 600;
const HEX_CHARACTERS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"];
const gridContainer = document.querySelector('.grid-container');

const dimensionInput = document.querySelector('.dimension-control input');
const dimensionLabel = document.querySelector('.dimension-control label');

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

function getRandomHexColor() {
    let hexColor = "#";

    for (let i = 0; i < 6; i++) {
        const randomIndex = Math.floor(Math.random() * HEX_CHARACTERS.length);
        hexColor += HEX_CHARACTERS[randomIndex];
    }

    return hexColor;
}

function changeGridElementColor(event) {
    const gridElement = event.target;

    if (gridElement === gridContainer) return;

    if (gridElement.style.backgroundColor === '') {
        gridElement.style.opacity = '0.1';
        gridElement.style.backgroundColor = `${getRandomHexColor()}`;
        return;
    }

    let updatedOpacity = (+gridElement.style.opacity + 0.1).toFixed(1);
    
    if (updatedOpacity <= 1.0) {
        gridElement.style.opacity = `${updatedOpacity}`;
    }
}

function regenerateGrid() {
    const updatedDimension = dimensionInput.value;

    document.querySelectorAll('.grid-container div').forEach((node) => node.remove());
    createGridElements(updatedDimension);
}

function updateInputLabel() {
    const currentValue = dimensionInput.value;
    dimensionLabel.textContent = currentValue + "x" + currentValue;
}

function updateDimensionByOne(value) {
    const currDimension = +dimensionInput.value;
    dimensionInput.value = currDimension + value;

    updateInputLabel();
    regenerateGrid();
}

createGridElements();

gridContainer.addEventListener('mouseover', changeGridElementColor);

dimensionInput.addEventListener('change', regenerateGrid);
dimensionInput.addEventListener('input', () => updateInputLabel());

document.querySelector('.subtract').addEventListener('click', () => updateDimensionByOne(-1));
document.querySelector('.addition').addEventListener('click', () => updateDimensionByOne(1));
// TODO: ability to change between black/rgb/eraser, change colors on hover + left click down, better looking UI