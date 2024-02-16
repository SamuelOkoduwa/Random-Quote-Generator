let hero = document.querySelector(".hero");
hero.style.display = "none";
let loader = document.querySelector(".loader");

async function quote() {
  let url = `https://api.api-ninjas.com/v1/quotes`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-Api-Key": "VT6Z7rKdInt3F8kOrNmuKA==dhTFCZac9OjS5d8Z",
    },
  });
  const data = await response.json();
  return data;
}

let btn = document.querySelector("button");

async function changeBg() {
  let countdown = 3;
  const quoteData = await quote();
  const quoter = document.getElementById("quoter");
  const quoteText = document.getElementById("quote");

  if (quoteData[0] != undefined) {
    setInterval(function () {
      countdown -= 1;
      if (countdown <= 0) {
        clearInterval();

        loader.style.display = "none";
        hero.style.display = "flex";
      }
    }, 1000);
  }

  setInterval(async function () {
    const quoteData = await quote();
    let words = quoteData[0].quote.split(" ");
    // console.log(words);
    // console.log(words.length);
    quoteText.textContent = quoteData[0].quote;
    quoter.textContent = `- ${quoteData[0].author}`;
    if (words.length <= 15) {
      quoteText.style.fontSize = "1.5rem";
    }else if(words.length > 15 && words.length <= 70){
      quoteText.style.fontSize = "1rem";}

  }, 10000);
}

btn.addEventListener("click", changeBg);
window.onload = changeBg();
