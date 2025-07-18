const BASE_GRID_SIZE = 600;
const HEX_CHARACTERS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"];

const gridContainer = document.querySelector('.grid-container');
const dimensionInput = document.querySelector('.dimension-control input');
const dimensionLabel = document.querySelector('.dimension-control label');

const mainPanelButtons = document.querySelectorAll('.buttons-panel button');

const paintModes= Object.freeze({
    ERASER: "ERASER",
    BLACK: "BLACK",
    RGB: "RGB",
});

let mouseDown = false;
let currPaintMode = paintModes.RGB;

function calculateElementSize(elementsInRow) {
    return BASE_GRID_SIZE / elementsInRow;
}

function createGridElements(elementsInRow = 16) {
    const totalGridElements = elementsInRow * elementsInRow;
    const elementSize = calculateElementSize(elementsInRow);

    for (let i = 0; i < totalGridElements; i++) {
        const gridElement = document.createElement('div');
        gridElement.setAttribute('style', `flex: 1 1 ${elementSize}px`);
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

function getCurrentHexColor() {
    let color;

    switch (currPaintMode) {
        case paintModes.ERASER:
            color = "";
            break;
        case paintModes.BLACK:
            color = "#000000";
            break;
        case paintModes.RGB:
            color = getRandomHexColor();
            break;
    }

    return color;
}

function updateOpacity(gridElement) {
    let updatedOpacity = (+gridElement.style.opacity + 0.1).toFixed(1);

    if (updatedOpacity <= 1.0) {
        gridElement.style.opacity = `${updatedOpacity}`;
    }
}

function changeGridElementColor(event) {
    if (!mouseDown) return;

    const gridElement = event.target;

    if (gridElement === gridContainer) return;

    gridElement.style.backgroundColor = getCurrentHexColor();

    if (currPaintMode === paintModes.ERASER){
        gridElement.style.opacity = '';
        return;
    }

    updateOpacity(gridElement);
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

function changePaintMode(paintMode, event) {
    mainPanelButtons.forEach((button) => button.style.boxShadow = 'none');
    const button = event.target;
    button.style.boxShadow = '2px 4px 16px rgba(9 249 127)';

    currPaintMode = paintMode;
}

createGridElements();

gridContainer.addEventListener('mouseover', changeGridElementColor);

dimensionInput.addEventListener('change', regenerateGrid);
dimensionInput.addEventListener('input', () => updateInputLabel());

document.querySelector('#subtract').addEventListener('click', () => updateDimensionByOne(-1));
document.querySelector('#addition').addEventListener('click', () => updateDimensionByOne(1));

gridContainer.onmousedown = (e) => {
    e.preventDefault();
    mouseDown = true;
}
document.body.onmouseup = () => mouseDown = false;

document.querySelector('#reset').onclick = () => regenerateGrid();
document.querySelector('#eraser').onclick = (e) => changePaintMode(paintModes.ERASER, e);
document.querySelector('#black').onclick = (e) => changePaintMode(paintModes.BLACK, e);
document.querySelector('#rgb').onclick = (e) => changePaintMode(paintModes.RGB, e);