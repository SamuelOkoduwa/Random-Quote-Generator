let btn = document.querySelector("button");
let hero = document.querySelector(".hero");
let loader = document.querySelector(".loader");

hero.style.display = "none"

async function quote() {
  let url = `https://api.seriesquotes.10cyrilc.me/quote/`;

  const response = await fetch(url, {
    method: "GET",
  });

  const data = await response.json();

  return data;
}


async function changeBg() {
  let countdown = 3;

  const quoteData = await quote();

  if (quoteData[0] != undefined) {
    let words = quoteData[0].quote.split(" ");

    console.log(words.length);

    if (words.length > 65) {
      changeBg();
    }
    else {
      setInterval(function () {
        countdown -= 1;

        if (countdown <= 0) {
          clearInterval();

          loader.style.display = "none";
          hero.style.display = "flex";
        }
      }, 1000);

      document.getElementById("quote").textContent = quoteData[0].quote;
      document.getElementById("quoter").textContent = `- ${quoteData[0].author}`;

      // if (words.length <= 15) {
      //   document.getElementById("quote").style.fontSize = "1.5rem";
      // }else if(words.length > 15 && words.length <= 70){
      //   document.getElementById("quote").style.fontSize = "1rem";
      // }
    }
  }
}

let imgBtn = document.getElementById("reload");

btn.addEventListener("click", changeBg);

btn.addEventListener("click", () => {
  let anime = 2;

  imgBtn.classList.add("reload");

  document.getElementsByClassName("reload")[0].style.animation = "rotate 1s ease-in-out 1";

  setInterval(function () {
    anime -= 1;

    if (anime == 0) {
      document.getElementsByClassName("reload")[0].style.animation = "";
      clearInterval();
    }
  }, 1000);
});

window.onload = changeBg();