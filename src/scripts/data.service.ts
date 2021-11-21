import jsSHA from "jssha";
import { apiRouteInfo, routeInfo } from "./models";

export class DataService {
  /** Api 驗證 header */
  private static getAuthorizationHeader() {
    let AppID = "9649f6d1d1914fa59025a4ccf492a0a0";
    let AppKey = "I5P7DcPO81T5KJXG6lGrWeWtAIo";

    let UTCString = new Date().toUTCString();
    let ShaObj = new jsSHA("SHA-1", "TEXT");
    ShaObj.setHMACKey(AppKey, "TEXT");
    ShaObj.update("x-date: " + UTCString);
    let HMAC = ShaObj.getHMAC("B64");
    let Authorization =
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
