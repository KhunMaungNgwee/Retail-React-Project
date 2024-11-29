import * as product from "./product";
import * as order from "./order";
import * as user from "./auth/queries";
class API {
  product: typeof product;
  order: typeof order;
  user: typeof user;
  constructor() {
    this.product = product;
    this.order = order;
    this.user = user;
  }
}

const api = new API();
export default api;
