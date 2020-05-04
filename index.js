const RED_COLOR = "#FF4949";
const GREY_COLOR = "#808080";
const YELLOW_COLOR = "#FFFF00";
let inputArray = [];
let generateArray = document.querySelector("#generateArray");
let reset = document.querySelector("#reset");
let algoVisualiser = document.querySelector("#algo-visualiser");
let linearSearch = document.querySelector("#linearSearch");
let binarySearch = document.querySelector("#binarySearch");
let bubbleSort = document.querySelector("#bubbleSort");
let selectionSort = document.querySelector("#selectionSort");

console.log(arraySize);
function generateRandomArray(length = 10) {
  let arraySize = document.getElementById("arraySize").value;
  let upperBoundary = 100;
  let lowerBoundary = 1;
  if (arraySize > 0) {
    removeElements();
    inputArray = [];
    for (let index = 0; index < arraySize; index++) {
      inputArray[index] =
        Math.floor(Math.random() * (upperBoundary - lowerBoundary + 1)) +
        lowerBoundary;
    }
    console.log(inputArray);
    generateBlocks();
  } else alert("Enter array size value > 0");
}

generateArray.addEventListener("click", () => generateRandomArray());
reset.addEventListener("click", () => removeElements());
linearSearch.addEventListener("click", () => algorithmn("linearSearch"));
binarySearch.addEventListener("click", () => algorithmn("binarySearch"));
selectionSort.addEventListener("click", () => algorithmn("selectionSort"));
bubbleSort.addEventListener("click", () => algorithmn("bubbleSort"));

function generateBlocks() {
  let lengthOfArray = inputArray.length;
  for (let i = 0; i < lengthOfArray; i++) {
    const block = document.createElement("div");
    block.classList.add("block");
    block.style.height = `${inputArray[i] * 1}px`;
    block.style.transform = `translateX(${i * 30}px)`;
    const blockLabel1 = document.createElement("label");
    blockLabel1.classList.add("block_id");
    blockLabel1.innerHTML = inputArray[i];
    block.appendChild(blockLabel1);
    algoVisualiser.appendChild(block);
  }
}

function removeElements() {
  algoVisualiser.innerHTML = "";
}

async function algorithmn(choosenAlgo) {
  const length = inputArray.length;
  let blocks = document.querySelectorAll(".block");

  switch (choosenAlgo) {
    case "bubbleSort":
      let swapped;
      do {
        swapped = false;
        for (let j = 0; j < length - 1; j++) {
          blocks[j].style.backgroundColor = RED_COLOR;
          blocks[j + 1].style.backgroundColor = RED_COLOR;

          await delay();

          if (inputArray[j] > inputArray[j + 1]) {
            let temp = inputArray[j];
            let tempNum = blocks[j].innerHTML;
            let tempHeight = blocks[j].style.height;

            inputArray[j] = inputArray[j + 1];
            blocks[j].innerHTML = blocks[j + 1].innerHTML;
            blocks[j].style.height = blocks[j + 1].style.height;
            inputArray[j + 1] = temp;
            blocks[j + 1].innerHTML = tempNum;
            blocks[j + 1].style.height = tempHeight;

            swapped = true;
          }

          blocks[j].style.backgroundColor = GREY_COLOR;
          blocks[j + 1].style.backgroundColor = GREY_COLOR;
        }
      } while (swapped);
      console.log(inputArray);
      break;

    case "selectionSort":
      for (let i = 0; i < length; i++) {
        let minIndex = i;

        for (let j = i + 1; j < length; j++) {
          blocks[minIndex].style.backgroundColor = RED_COLOR;
          blocks[j].style.backgroundColor = RED_COLOR;
          await delay();

          if (inputArray[minIndex] > inputArray[j]) {
            blocks[minIndex].style.backgroundColor = GREY_COLOR;
            minIndex = j;
          } else blocks[j].style.backgroundColor = GREY_COLOR;
        }
        if (minIndex != i) {
          let temp = inputArray[minIndex];

          let tempNum = blocks[minIndex].innerHTML;
          let tempHeight = blocks[minIndex].style.height;

          inputArray[minIndex] = inputArray[i];
          blocks[minIndex].innerHTML = blocks[i].innerHTML;
          blocks[minIndex].style.height = blocks[i].style.height;

          inputArray[i] = temp;
          blocks[i].innerHTML = tempNum;
          blocks[i].style.height = tempHeight;
        }
        blocks[minIndex].style.backgroundColor = GREY_COLOR;
        blocks[i].style.backgroundColor = GREY_COLOR;
      }

      break;
    case "linearSearch":
      searchAlgo(choosenAlgo);

      break;
    case "binarySearch":
      searchAlgo(choosenAlgo);

      break;
  }
}

function delay() {
  return new Promise((resolve) => {
    setInterval(() => {
      resolve();
    }, 250);
  });
}

async function searchAlgo(choosenAlgo) {
  let length = inputArray.length;
  let searchValue = document.getElementById("searchValue").value;

  let blocks = document.querySelectorAll(".block");

  switch (choosenAlgo) {
    case "linearSearch":
      for (let i = 0; i < blocks.length; i++) {
        blocks[i].style.backgroundColor = RED_COLOR;
        await delay();
        if (inputArray[i] == searchValue) {
          blocks[i].style.backgroundColor = YELLOW_COLOR;

          return;
        }
        blocks[i].style.backgroundColor = GREY_COLOR;
      }
      break;
    case "binarySearch":
      inputArray.sort((a, b) => a - b);
      // remove previous unsorted array
      removeElements();
      // create sorted array
      for (let i = 0; i < length; i++) {
        const block = document.createElement("div");
        block.classList.add("block");
        block.style.height = `${inputArray[i] * 1}px`;
        block.style.transform = `translateX(${i * 30}px)`;
        const blockLabel1 = document.createElement("label");
        blockLabel1.classList.add("block_id");
        blockLabel1.innerHTML = inputArray[i];
        block.appendChild(blockLabel1);
        algoVisualiser.appendChild(block);
      }

      blocks = document.querySelectorAll(".block");
      searchContainer = document.querySelectorAll(".searchBox");
      let lowIndex = 0;
      let highIndex = length;
      let midIndex;
      while (lowIndex <= highIndex) {
        midIndex = Math.floor((lowIndex + highIndex) / 2);
        console.log("ss" + midIndex);
        console.log("ss" + lowIndex);
        console.log("ss" + highIndex);
        if (midIndex != lowIndex) {
          blocks[lowIndex].style.backgroundColor = RED_COLOR;
        }
        else{
          break;
        }

        await delay();
        if (inputArray[midIndex] == searchValue) {
          blocks[midIndex].style.backgroundColor = YELLOW_COLOR;
          console.log("found");
          return;
        } else if (inputArray[midIndex] > searchValue) {
          blocks[lowIndex].style.backgroundColor = GREY_COLOR;
          highIndex = midIndex - 1;
        } else {
          blocks[lowIndex].style.backgroundColor = GREY_COLOR;
          lowIndex = midIndex + 1;
        }
      }
      alert("not found");
      return null;
      break;
  }
}
