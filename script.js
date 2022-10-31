//You can edit ALL of the code here

// LEVEL 350  ------ MAKING A GET REQUEST ------

function getUrl() {
  let url = "https://api.tvmaze.com/shows/82/episodes";
  const allEpiFromUrl = [];
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      data.forEach((ep) => {
        allEpiFromUrl.push(ep);
      });
      makePageForEpisodes(allEpiFromUrl);
      dropdownEpi(allEpiFromUrl);
      searchEpisodes(allEpiFromUrl);
      console.log(allEpiFromUrl);
    });
}

const allShows = getAllShows();

function setup() {
  getUrl();
  dropdownShow(allShows);
}

// function allfun(g) {
//   makePageForEpisodes(g);
//   dropdownEpi(g);
//   searchEpisodes(g);
// }
// const allEpisodes = getAllEpisodes();
// function setup() {
//   makePageForEpisodes(allEpisodes);
//   dropdownEpi(allEpisodes);

// }

// console.log(allShows);
const rootElem = document.getElementById("root");

// LEVEL 100   ------ EPISODE DISPLAY -----

function makePageForEpisodes(episodeList) {
  var ulEpisodes = document.createElement("ul");
  rootElem.appendChild(ulEpisodes);
  ulEpisodes.setAttribute("id", "myUL");

  episodeList.map((episode) => {
    var liEpisodes = document.createElement("li");
    liEpisodes.className = "listE";

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

function dropdownEpi(allEpisodes) {
  var divTop = document.getElementById("selectEpi");

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

function dropdownShow(allShows) {
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
    var divTop = document.getElementById("selectEpi");

    let showValue = this.value;
    const allEpisodesFromUrl = [];
    fetch(`https://api.tvmaze.com/shows/${showValue}/episodes`)
      .then((response) => response.json())
      .then((data) =>
        data.forEach((epi) => {
          allEpisodesFromUrl.push(epi);
        })
      );
    console.log(allEpisodesFromUrl);
    searchEpisodes(allEpisodesFromUrl);
    dropdownEpi(allEpisodesFromUrl);

    makePageForEpisodes(allEpisodesFromUrl);
    // allfun(allEpisodesFromUrl);
  });
}

window.onload = setup;
