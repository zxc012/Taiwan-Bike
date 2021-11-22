import L from "leaflet";
import * as env from "./env.variables.js";

export class MapService {
  public static createMap(mapId: string) {
    const map = L.map("mapId").setView([25.0597679, 121.5519794], 15);
    L.tileLayer(
      "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
      {
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: "mapbox/streets-v11",
        tileSize: 512,
        zoomOffset: -1,
        accessToken: env.MapKey,
      }
    ).addTo(map);
  }
}
