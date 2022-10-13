//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

let episodeData = [];

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");

  // rootElem.textContent = `Got ${episodeList.length} episode(s)`;
  var ulEpisodes = document.createElement("ul");
  ulEpisodes.setAttribute("id", "myUL");
  rootElem.appendChild(ulEpisodes);

  episodeData = episodeList.map((episode) => {
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
    // history.setAttribute("id", "head2");
    headingEpi.innerHTML = episode.name;
    liEpisodes.appendChild(headingEpi);
    //
    var summaryEpi = document.createElement("div");
    // summaryEpi.setAttribute("id", "summary");
    summaryEpi.innerHTML = episode.summary;
    liEpisodes.appendChild(summaryEpi);
    ulEpisodes.appendChild(liEpisodes);

    return { name: episode.name, summary: episode.summary };
  });
}

// for (let i = 0; i <= episodeList.length; i++) {
//     var liEpisodes = document.createElement("li");
//     liEpisodes.className = "listE";

//     //
//     var picEpisodes = document.createElement("img");
//     picEpisodes.src = episodeList[i].image.medium;
//     liEpisodes.appendChild(picEpisodes);
//     //
//     var numEpisodes = document.createElement("h1");
//     var numList = " ";
//     if (episodeList[i].number < 10) {
//       numList = `E0${episodeList[i].number}`;
//     } else numList = `E${episodeList[i].number}`;
//     numEpisodes.innerHTML = `S0${episodeList[i].season}` + "-" + numList;
//     liEpisodes.appendChild(numEpisodes);
//     //
//     var headingEpi = document.createElement("h2");
//     // history.setAttribute("id", "head2");
//     headingEpi.innerHTML = episodeList[i].name;
//     liEpisodes.appendChild(headingEpi);
//     //
//     var summaryEpi = document.createElement("div");
//     // summaryEpi.setAttribute("id", "summary");
//     summaryEpi.innerHTML = episodeList[i].summary;
//     liEpisodes.appendChild(summaryEpi);
//     ulEpisodes.appendChild(liEpisodes);
//   }
// }

// var list = document.querySelectorAll("li");
// var inputs = document.getElementById("myInput");
// inputs.addEventListener("input", (e) => {
//   const value = e.target.value;
//   var epiH2 = document.querySelectorAll("h2");
//   var sumEpi = document.querySelectorAll("div");

//   for (i = 0; i < list.length; i++) {
//     let txtValue =
//       epiH2[i].innerText.includes(value) || sumEpi[i].innerText.includes(value);

//     if (txtValue.toUpperCase().indexOf(filter) > -1) {
//       list[i].style.display = "";
//     } else {
//       list[i].style.display = "none";
//     }
// console.log(value);
// list.forEach((epi) => {
//   var epiH2 = document.querySelectorAll("h2");
//   console.log(epiH2);
//   var sumEpi = document.querySelectorAll("div");
//   const visibleEpi =
//     epiH2.innerText.includes(value) || sumEpi.innerText.includes(value);
//   epi.classList.toggle("hide", !visibleEpi);
//     // });
//   }
// });

window.onload = setup;
