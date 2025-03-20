/** @format */
const container = document.querySelector("body");
const quoteContainer = document.querySelector(".quoteContainer");
const generateQuoteBtn = document.querySelector(".generateQuoteBtn");
const quoteTheme = document.querySelector("#quoteTheme");
const copyBtn = document.getElementById("copyBtn");
const xBtn = document.getElementById("xBtn");
const exportBtn = document.getElementById("exportBtn");

// let backgrounds = [
//   "https://unsplash.com/photos/green-leaf-with-water-drops-dXYE1d08BiY",
//   "https://unsplash.com/photos/a-view-of-the-night-sky-over-a-body-of-water-xQv9jeYdZiA",
//   "https://unsplash.com/photos/an-aerial-view-of-a-body-of-water-surrounded-by-land-q59v7fPcBsw",
//   "https://unsplash.com/photos/a-scenic-view-of-a-mountain-range-with-trees-and-mountains-in-the-background-AcpMp_eOhHU",
// ];

let backgrounds = [
  "./assets/photo-1.avif",
  "./assets/photo-2.avif",
  "./assets/photo-3.avif",
  "./assets/photo-4.avif",
  "./assets/photo-5.avif",
];

//:::::::::::::::::Functions:::::::::::::::::

//function for generating quotes

async function generateQuotes() {
  quoteContainer.innerHTML = `Loading quotes....<i class="fa-solid fa-sync fa-spin"></i> `;
  generateQuoteBtn.innerText = "Generating...";
  //For making fetch api call url and options are created
  const url = "https://api.freeapi.app/api/v1/public/quotes/quote/random";
  const options = { method: "GET", headers: { accept: "application/json" } };

  try {
    const response = await fetch(url, options);
    const data = await response.json();

    //function call for Displaying quotes
    displayQuotes(data);

    // console.log(data);
  } catch (error) {
    console.error(error);
  }
}

//Displaying Quotes:::::

function displayQuotes(data) {
  let quoteDiv = document.createElement("div");

  //inserting quotes to the Quote Container
  quoteContainer.innerText = "";
  quoteDiv.innerHTML += `<i class="fa-solid fa-quote-left"></i> &nbsp`;
  quoteDiv.innerHTML += data.data.content;
  quoteDiv.innerHTML += `&nbsp<i class="fa-solid fa-quote-right"></i>  `;
  generateQuoteBtn.innerText = "New Quotes";

  //Adding Author Name
  quoteDiv.innerHTML += `<div class="author"><span>__</span>${data.data.author}</div>`;

  //appending the quoteDiv to the quote container
  quoteContainer.appendChild(quoteDiv);

  //inserting quote theme
  quoteTheme.innerText = data.data.tags[0];

  //Background Image change:
  changeQuotesBackground(backgrounds);
}

// Background Image change:::::::::::::

function changeQuotesBackground(backgrounds) {
  const randomBackgroundIndex = Math.floor(Math.random() * backgrounds.length);

  quoteContainer.style.backgroundImage = `url(${backgrounds[randomBackgroundIndex]})`;
}

//Copying the quotes:::::::::::

function copyQuotes() {
  window.navigator.clipboard.writeText(quoteContainer.innerText).then(() => {
    // Change the background color of the text
    quoteContainer.classList.add("highlight");

    // Optionally, reset the highlight after a delay
    setTimeout(() => {
      quoteContainer.classList.remove("highlight");
    }, 1000); // 2-second delay
  });
}

//sharing quotes in x.com:::::

function shareToXHandle() {
  const link = `https://x.com/intent/tweet?url=${quoteContainer.innerText}`;
  window.open(link, "_blank");

  console.log(quoteContainer.innerText);
}

// Function to export the quote as an image::::::::

function exportingQuotes() {
  html2canvas(quoteContainer).then((canvas) => {
    const link = document.createElement("a");
    link.download = "quote.png";
    link.href = canvas.toDataURL();
    link.click();
  });
}

//::::::::::::::::::::::::::Adding Event Listener:::::::::::::::::::::::::::::::::::::

//Generate New Quotes on window loading
window.addEventListener("load", generateQuotes());

//Generate New Quotes by Clicking the Button:
generateQuoteBtn.addEventListener("click", generateQuotes);

//Copy the quotes in the clipboard
copyBtn.addEventListener("click", copyQuotes);

//Sharing on X.com
xBtn.addEventListener("click", shareToXHandle);

//Exporting the quotes

// exportBtn.addEventListener("click", exportingQuotes);

exportBtn.addEventListener("click", exportingQuotes);
