//DOM MAnipulation - 
let btn = document.querySelector("button");
let hero = document.querySelector(".hero");
let loader = document.querySelector(".loader");

//MAkes the Quote Container "Hero" hidden
hero.style.display = "none"

//API FETCH
async function quote() {
  let url = `https://api.seriesquotes.10cyrilc.me/quote/`;

  const response = await fetch(url, {
    method: "GET",
  });

  //Convert the response to JSON
  const data = await response.json();

  return data;
}


async function changeBg() {
  //Set the countdown time
  let countdown = 3;

  //Initialize the fetch API function
  const quoteData = await quote();


  //Check if the repsonse from the api has values
  if (quoteData[0] != undefined) {
    //split the received quote string into an array seperated by space
    let words = quoteData[0].quote.split(" ");

    console.log(words.length);

    //if the length of the array word is greter than 65 which is the current limit the quote container can take b4 the quote text overflows it should rereun the changeBg function
    if (words.length > 65) {
      changeBg();
    }
    else {
      //start a countdown 
      setInterval(function () {

        //subtract 1 from countdown every second
        countdown -= 1;

        //when countdown is 0 stop the countdown, make the loader hidden and make the quote parent container visible
        if (countdown <= 0) {
          clearInterval();

          loader.style.display = "none";
          hero.style.display = "flex";
        }
      }, 1000);

      //add the quote gotten from the api to the html output
      document.getElementById("quote").textContent = quoteData[0].quote;
      //add the author gotten from the api to the html output
      document.getElementById("quoter").textContent = `- ${quoteData[0].author}`;

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