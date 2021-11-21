import { routeInfo } from "./models";

export class DomService {
  public static renderElement<T>(
    element: Element,
    nodeCreateFunction: (params: T) => string,
    createFunctionParams: T[]
  ) {
    element.innerHTML = "";
    if (createFunctionParams.length > 0) {
      element.innerHTML += createFunctionParams
        .map((data) => nodeCreateFunction(data))
        .join("");
    } else {
      element.innerHTML = '<div class="mt-3">查無資料，請重新查詢。</div>';
    }
  }

  public static createRouteCard({
    name,
    direction = "查無資料",
    start = "查無資料",
    end = "查無資料",
    cyclingLength = 0,
  }: routeInfo) {
    return `<div class="card my-3">
            <div class="card-header position-relative">
              <div class="fw-bold d-inline">${name}</div>
              <div class="
                    badge
                    rounded-pill
                    bg-secondary
                    position-absolute
                    end-0
                    top-50
                    translate-middle
                  ">
                ${direction}
              </div>
            </div>
            <div class="card-body">
              <div class="row position-relative">
                <div class="col">
                  <div class="
                        box
                        border
                        rounded-circle
                        text-center
                        fw-bold
                        d-inline-block
                      ">
                    起
                  </div>
                  <span class="p-2">${start}</span>
                  <span class="position-absolute top-0 end-0 d-flex flex-column align-items-center me-2">
                    <div class="text-secondary">全長</div>
                    <div class="main-color2 fw-bold">${(
                      cyclingLength / 1000
                    ).toFixed(1)}公里</div>
                  </span>
                </div>
              </div>
              <div class="row mt-2">
                <div class="col">
                  <div class="
                        box
                        border
                        rounded-circle
                        text-center
                        fw-bold
                        d-inline-block
                      ">
                    迄
                  </div>
                  <span class="p-2">${end}</span>
                </div>
              </div>
            </div>
            <a href="#" class="stretched-link"></a>
          </div>`;
  }
}
