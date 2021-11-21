import L from "leaflet";
import { DataService } from "./data.service";
import { DomService } from "./dom.service";
import { townDataList } from "./town-data";

function onCityNameChange() {
  const selectCity = (
    document.querySelector("#selectCity") as HTMLSelectElement
  ).value;
  const selectTownElement: HTMLSelectElement =
    document.querySelector("#selectTown");

  selectTownElement.innerHTML = "";
  for (let townData of townDataList[selectCity]) {
    const newOption = document.createElement("option");
    newOption.setAttribute("value", townData.townName);
    newOption.textContent = `鄉鎮區：${townData.townName}`;
    selectTownElement.appendChild(newOption);
  }
  selectTownElement.firstElementChild.toggleAttribute("selected");
  onTownNameChange();
}

async function onTownNameChange() {
  const cityName = (document.querySelector("#selectCity") as HTMLSelectElement)
    .value;
  const townName = (document.querySelector("#selectTown") as HTMLSelectElement)
    .value;
  const routeList = document.querySelector("#routeList");
  const routeDataList = await DataService.getBikeRoute(cityName, townName);
  const resultCount = document.querySelector("#resultCount");
  resultCount.textContent = `共${routeDataList.length}筆`;

  DomService.renderElement(
    routeList,
    DomService.createRouteCard,
    routeDataList
  );
}

function onInit() {
  onCityNameChange();
  onTownNameChange();
}

async function main() {
  onInit();
  document
    .querySelector("#selectCity")
    .addEventListener("change", () => onCityNameChange());
  document
    .querySelector("#selectTown")
    .addEventListener("change", () => onTownNameChange());

  // 地圖
  const map = L.map("map").setView([25.0597679, 121.5519794], 15);
  L.tileLayer(
    "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
    {
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: "mapbox/streets-v11",
      tileSize: 512,
      zoomOffset: -1,
      accessToken:
        "pk.eyJ1IjoienhjMDEyIiwiYSI6ImNrdzJhdndkeGJvZzgybnF3bGM3MDNkYjkifQ.DM60EYi4EHbkfNJMg1Z0pA",
    }
  ).addTo(map);
}

main();
