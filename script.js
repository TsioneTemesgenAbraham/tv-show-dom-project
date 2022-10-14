//You can edit ALL of the code here

const allEpisodes = getAllEpisodes();
function setup() {
  getEpisodesFromURL();

  //makePageForEpisodes(allEpisodes);
}

const rootElem = document.getElementById("root");

function makePageForEpisodes(episodeList) {
  //getEpisodesFromURL();
  var ulEpisodes = document.createElement("ul");
  rootElem.appendChild(ulEpisodes);
  ulEpisodes.setAttribute("id", "myUL");
  episodeList.forEach((episode) => {
    var liEpisodes = document.createElement("li");
    liEpisodes.className = "listE";
    var picEpisodes = document.createElement("img");
    picEpisodes.src = episode.image.medium;
    liEpisodes.appendChild(picEpisodes);
    var numEpisodes = document.createElement("h1");
    var numList = " ";
    if (episode.number < 10) {
      numList = `E0${episode.number}`;
    } else numList = `E${episode.number}`;
    numEpisodes.innerHTML = `S0${episode.season}` + "-" + numList;
    liEpisodes.appendChild(numEpisodes);
    //
    var headingEpi = document.createElement("h2");
    headingEpi.innerHTML = episode.name;
    liEpisodes.appendChild(headingEpi);
    //
    var summaryEpi = document.createElement("div");
    summaryEpi.innerHTML = episode.summary;
    liEpisodes.appendChild(summaryEpi);
    ulEpisodes.appendChild(liEpisodes);
  });
}

var inputs = document.getElementById("myInput");
function searchEpisodes() {
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
      "Displaying" + visibleEpi.length + "/" + allEpisodes.length;
  });
}

searchEpisodes();

function dropdownEpi() {
  var divTop = document.getElementById("selectEpi");

  for (var i = 0; i < allEpisodes.length; i++) {
    var opt = document.createElement("option");
    opt.setAttribute("value", allEpisodes[i].id);
    opt.innerHTML = allEpisodes[i].season + allEpisodes[i].name;
    divTop.appendChild(opt);
  }

  divTop.addEventListener("change", function () {
    let selectedVal = this.value;
    let selectedEpisode = allEpisodes.filter((x) => x.id == selectedVal);

    rootElem.innerHTML = "";

    makePageForEpisodes(selectedEpisode);

    var display = document.getElementById("display-label");
    display.innerHTML =
      "Displaying" + selectedEpisode.length + "/" + allEpisodes.length;
  });
}

dropdownEpi();

window.onload = setup;
