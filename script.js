//You can edit ALL of the code here
// const home = document.getElementById("home");
const rootElem = document.getElementById("root");
const searchBox = document.getElementById("myInput");
const display = document.getElementById("display-label");
const divSelectAndSearchEpisodes = document.getElementById("top-part");
const topDivShowDropdown = document.getElementById("topPart2");
const home = document.getElementById("home");

// LEVEL 350  ------ MAKING A GET REQUEST ------

function getUrl(showValue) {
  divSelectAndSearchEpisodes.style.display = "block";
  topDivShowDropdown.style.display = "none";
  home.style.display = "none";
  let url = `https://api.tvmaze.com/shows/${showValue}/episodes`;
  const allEpiFromUrl = [];
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      data.forEach((ep) => {
        allEpiFromUrl.push(ep);
      });
      rootElem.innerText = " ";
      divTop.innerText = " ";
      searchBox.innerText = " ";
      display.innerHTML = " ";

      makePageForEpisodes(allEpiFromUrl);
      dropdownEpi(allEpiFromUrl);
      searchEpisodes(allEpiFromUrl);
      console.log(allEpiFromUrl);
    });
}

const allShows = getAllShows();

function setup() {
  dropdownShow(allShows);
  makeShowList(allShows);

  searchEpisodes(allShows);
}

// const allEpisodes = getAllEpisodes();
// function setup() {
//   makePageForEpisodes(allEpisodes);
//   dropdownEpi(allEpisodes);

// }

// LEVEL 100   ------ EPISODE DISPLAY -----

function makePageForEpisodes(episodeList) {
  var ulEpisodes = document.createElement("ul");
  rootElem.appendChild(ulEpisodes);
  ulEpisodes.setAttribute("id", "myUL");

  episodeList.map((episode) => {
    var liEpisodes = document.createElement("li");
    liEpisodes.className = "show";

    //    FOR MEDIUM IMG

    var picEpisodes = document.createElement("img");
    picEpisodes.src = episode.image.medium;
    liEpisodes.appendChild(picEpisodes);

    //    FOR SEASON AND EPISODE NUM

    var numEpisodes = document.createElement("h1");
    var numList = " ";
    if (episode.number < 10) {
      numList = `E0${episode.number}`;
    } else numList = `E${episode.number}`;
    numEpisodes.innerHTML = `S0${episode.season}` + "-" + numList;
    liEpisodes.appendChild(numEpisodes);

    //    FOR EPISODE NAME

    var headingEpi = document.createElement("h2");
    headingEpi.innerHTML = episode.name;
    liEpisodes.appendChild(headingEpi);

    //    FOR SUMMARY

    var summaryEpi = document.createElement("div");
    summaryEpi.innerHTML = episode.summary;
    liEpisodes.appendChild(summaryEpi);
    ulEpisodes.appendChild(liEpisodes);
  });
}

// LEVEL 200 ----- SEARCH BAR -----

var inputs = document.getElementById("myInput");
function searchEpisodes(allEpisodes) {
  inputs.addEventListener("input", (e) => {
    let value = e.target.value.toLowerCase();
    let visibleEpi = allEpisodes.filter((epidata) => {
      return (
        epidata.name.toLowerCase().includes(value) ||
        epidata.summary.toLowerCase().includes(value)
      );
    });
    rootElem.innerHTML = "";
    makePageForEpisodes(visibleEpi);
    var display = document.getElementById("display-label");
    display.innerHTML = "";
    display.innerHTML =
      "Displaying : " + visibleEpi.length + "/" + allEpisodes.length;
  });
}

// LEVEL 300 ----- DROPDOWN OPTIONS -----
var divTop = document.getElementById("selectEpi");
function dropdownEpi(allEpisodes) {
  for (var i = 0; i < allEpisodes.length; i++) {
    var opt = document.createElement("option");
    opt.setAttribute("value", allEpisodes[i].id);

    var numList = " ";
    if (allEpisodes[i].number < 10) {
      numList = `E0${allEpisodes[i].number}`;
    } else numList = `E${allEpisodes[i].number}`;

    opt.innerHTML =
      "S0" +
      allEpisodes[i].season +
      "-" +
      numList +
      "   ---   " +
      allEpisodes[i].name;
    divTop.appendChild(opt);
  }

  divTop.addEventListener("change", function () {
    let selectedVal = this.value;
    let selectedEpisode = allEpisodes.filter((x) => {
      return x.id == selectedVal;
    });

    rootElem.innerHTML = "";

    makePageForEpisodes(selectedEpisode);

    var display = document.getElementById("display-label");
    display.innerHTML =
      "Displaying : " + selectedEpisode.length + "/" + allEpisodes.length;
  });
}

// LEVEL 400 ----- SHOW DROPDOWN ----

function dropdownShow() {
  let divShow = document.getElementById("selectShow");

  for (let i = 0; i < allShows.length; i++) {
    var opt = document.createElement("option");
    opt.setAttribute("value", allShows[i].id);
    allShows.sort(function (a, b) {
      var nameA = a.name.toLowerCase(),
        nameB = b.name.toLowerCase();
      if (nameA < nameB) return -1;
      if (nameA > nameB) return 1;
      return 0;
    });

    opt.innerHTML = allShows[i].name;
    divShow.appendChild(opt);
  }

  divShow.addEventListener("change", function () {
    let showValue = this.value;

    getUrl(showValue);
  });
}

function makeShowList() {
  divSelectAndSearchEpisodes.style.display = "none";
  let showUL = document.createElement("ul");
  home.appendChild(showUL);

  allShows.map((show) => {
    let showLI = document.createElement("li");
    showLI.className = "show";
    showLI.setAttribute("id", "shows");
    showLI.setAttribute("value", show.id);

    let showImg = document.createElement("img");
    showImg.src = show.image.medium;
    showLI.appendChild(showImg);

    let showTi = document.createElement("h1");
    showTi.innerText = show.name;
    showLI.appendChild(showTi);

    let play = document.createElement("button");
    play.setAttribute("id", "button");
    play.setAttribute("value", show.id);
    play.className = "button play";
    showLI.appendChild(play);

    let showGe = document.createElement("h3");
    showGe.innerText = show.genres.join("\n");
    showLI.appendChild(showGe);

    let showRa = document.createElement("h4");
    showRa.innerText = show.rating.average;
    showLI.appendChild(showRa);

    let showSum = document.createElement("p");
    let sumSpan = document.createElement("span");
    sumSpan.innerText = "Read more...";
    sumSpan.style.fontWeight = "bold";
    //create an event listener
    showSum.innerHTML = show.summary.replace(/^(.{220}[^\s]*).*/, "$1");
    showSum.appendChild(sumSpan);
    showLI.appendChild(showSum);

    showUL.appendChild(showLI);

    play.addEventListener("click", () => {
      let selectedEpisode = show.id;
      getUrl(selectedEpisode);
    });
  });
}

let returnButton = document.createElement("button");
returnButton.setAttribute("id", "home");
divSelectAndSearchEpisodes.appendChild(returnButton);
returnButton.addEventListener("click", () => {
  location.reload();
});

window.onload = setup;
