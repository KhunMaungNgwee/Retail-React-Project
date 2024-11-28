import * as product from "./product";
import * as order from "./order";
class API {
  product: typeof product;
  order: typeof order;
  constructor() {
    this.product = product;
    this.order = order;
  }
}

const api = new API();
export default api;
