import jsSHA from "jssha";
import { apiRouteInfo, routeInfo } from "./models";
import * as env from "./env.variables.js";

export class DataService {
  /** Api 驗證 header */
  private static getAuthorizationHeader() {
    const AppID = env.AppId;
    const AppKey = env.AppKey;

    const UTCString = new Date().toUTCString();
    const ShaObj = new jsSHA("SHA-1", "TEXT");
    ShaObj.setHMACKey(AppKey, "TEXT");
    ShaObj.update("x-date: " + UTCString);
    const HMAC = ShaObj.getHMAC("B64");
    const Authorization =
      'hmac username="' +
      AppID +
      '", algorithm="hmac-sha1", headers="x-date", signature="' +
      HMAC +
      '"';
    return { Authorization: Authorization, "X-Date": UTCString };
  }

  public static async getBikeRoute(
    cityName: string,
    townName: string
  ): Promise<routeInfo[]> {
    return await fetch(
      `https://ptx.transportdata.tw/MOTC/v2/Cycling/Shape/${cityName}?$filter=Town%20eq%20'${townName}'&$format=JSON`,
      { headers: this.getAuthorizationHeader() }
    )
      .then((response) => response.json())
      .then((result: apiRouteInfo[]) =>
        result.map((data) => ({
          name: data.RouteName,
          start: data.RoadSectionStart,
          end: data.RoadSectionEnd,
          direction: data.Direction,
          cyclingLength: data.CyclingLength,
          geometry: data.Geometry,
        }))
      );
  }
}
