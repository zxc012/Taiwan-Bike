export type apiRouteInfo = {
  RouteName: string;
  AuthorityName: string;
  CityCode: string;
  City: string;
  Town: string;
  RoadSectionStart: string;
  RoadSectionEnd: string;
  Direction: string;
  CyclingLength: number;
  FinishedTime: string;
  UpdateTime: string;
  Geometry: string;
};

export type routeInfo = {
  name: string;
  start: string;
  end: string;
  direction: string;
  cyclingLength: number;
  geometry: string;
};
