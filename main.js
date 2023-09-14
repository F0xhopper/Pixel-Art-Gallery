const pixelContainer = document.querySelector("#pixelContainer");
const colorpicker = document.querySelector("#colorselector");
const clearButton = document.querySelector("#clearButton");
const saveButton = document.querySelector("#saveButton");
const appearLastSaveBut = document.querySelector("#appearLastSaved");

const createSelector = document.querySelector("#createSelector");
const gallerySelector = document.querySelector("#gallerySelector");
const artCreationContainer = document.querySelector("#artCreationContainer");
const finalCreateButtun = document.querySelector("#finalCreateBut");
const descripInput = document.querySelector("#descripInput");
const galleryContainer = document.querySelector("#galleryContainer");
const eraserTool = document.querySelector("#eraserTool");
const convertImageButton = document.querySelector("#convertImageButton");
const imageInput = document.querySelector("#imageInput");
const slectedImageDisplay = document.querySelector("#slectedImageDisplay");
const uploaded = document.querySelector("#uploaded");
let arrayOfSavedArt = [];
let eraserSelected = false;
class artPiece {
  constructor(piece, description) {
    this.piece = piece;
    this.description = description;
  }
}
fetch("http://localhost:8002/xx")
  .then((response) => response.json())
  .then((response) => console.log(JSON.stringify(response)));
function genreateEmptyCanvas() {
  for (let i = 0; i < 32 * 32; i++) {
    let newDiv = document.createElement("div");
    newDiv.classList.add(i + 1);
    newDiv.classList.add("pixel");
    newDiv.style.border = "1px solid lightgrey";
    pixelContainer.appendChild(newDiv);
  }
}
function makingPixelsPaintable() {
  document.querySelectorAll(".pixel").forEach((div) => {
    div.addEventListener("mouseover", (event) => {
      if (event.buttons == 1) {
        event.preventDefault();
        if (eraserSelected == true) {
          event.target.style.backgroundColor = "";
        } else event.target.style.backgroundColor = colorpicker.value;
      }
    });
    div.addEventListener("mousedown", (event) => {
      event.preventDefault();

      if (eraserSelected == true) {
        event.target.style.backgroundColor = "";
      } else event.target.style.backgroundColor = colorpicker.value;
    });
  });
}

function clearCanvas() {
  document.querySelectorAll(".pixel").forEach((div) => {
    div.style.backgroundColor = "";
  });
}
function createArt() {
  let pieceHTML = pixelContainer.innerHTML.replaceAll(
    "border: 1px solid lightgrey;",
    ""
  );
  let description = descripInput.value;

  arrayOfSavedArt.push(new artPiece(pieceHTML, description));
  console.log(arrayOfSavedArt);
}
function changingBrushColour() {
  eraserSelected = false;
  selectedColorOrEraser = colorpicker.value;
}
function convertPixelsToImage() {
  uploaded.src = URL.createObjectURL(imageInput.files[0]);
}
let ctx;
function imageLoad() {
  let ctx = slectedImageDisplay.getContext("2d");
  let img = document.getElementById("uploaded");

  ctx.drawImage(img, 0, 0, 300, 150);
}
let pixelColourArray = [];

function getArrayOfPixelColors() {
  pixelColourArray = [];
  for (let i = 0; i < 32; i++) {
    for (let x = 0; x < 32; x++) {
      let cells = [];
      let data = slectedImageDisplay
        .getContext("2d")
        .getImageData(x * 9.6, i * 4.8, 9, 9).data;

      pixelColourArray.push([data[0], data[1], data[2]]);
    }
  }
}

function changePixelsToImageArray() {
  let arrayOfPixels = document.querySelectorAll(".pixel");
  for (let b = 0; b < 1024; b++) {
    let cellColors = pixelColourArray[b];

    let thergb =
      "rgb(" + cellColors[0] + "," + cellColors[1] + "," + cellColors[2] + ")";
    arrayOfPixels[b].style.backgroundColor = thergb;
  }
}
function usingEraser() {
  eraserSelected = true;
}
function changingToGallery() {
  artCreationContainer.setAttribute("hidden", true);
  galleryContainer.removeAttribute("hidden", true);
  gallerySelector.classList.remove("gallerySelectorUnsel");
  gallerySelector.classList.add("gallerySelectorSel");
  createSelector.classList.remove("createSelectorSel");
  createSelector.classList.add("createSelectorUnsel");
}

function changingToCreate() {
  galleryContainer.setAttribute("hidden", true);
  artCreationContainer.removeAttribute("hidden", true);
  gallerySelector.classList.remove("gallerySelectorSel");
  gallerySelector.classList.add("gallerySelectorUnsel");
  createSelector.classList.remove("createSelectorUnsel");
  createSelector.classList.add("createSelectorSel");
}
function displaySaved() {
  galleryContainer.innerHTML = "";
  arrayOfSavedArt.forEach((artObj) => {
    galleryContainer.innerHTML += `   <div class='singleDisplayContainer'>
    <div class="displayCanvas">${artObj.piece}</div>
    <div class="displayText">${artObj.description}</div>
  </div>`;
  });
}

function init() {
  genreateEmptyCanvas();
  makingPixelsPaintable();
  clearButton.addEventListener("click", clearCanvas);
  gallerySelector.addEventListener("click", () => {
    changingToGallery();
    displaySaved();
  });
  convertImageButton.addEventListener("click", convertPixelsToImage);
  eraserTool.addEventListener("click", usingEraser);
  uploaded.addEventListener("load", () => {
    imageLoad();
    getArrayOfPixelColors();
    changePixelsToImageArray();
  });
  colorpicker.addEventListener("change", changingBrushColour);
  colorpicker.addEventListener("click", changingBrushColour);
  createSelector.addEventListener("click", changingToCreate);
  finalCreateButtun.addEventListener("click", createArt);
}
init();
