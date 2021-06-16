import axios from 'axios';
import { ENTRY_POINT } from '../constants/URLs';

export default class ProductService {
  async getAllProducts() {
    try {
      const res = await axios.get(`${ENTRY_POINT}/products`);
      return res.data;
    } catch(e) {
      return e.response.data;
    }
  }

  async getProductsByCategoryId(categoryId) {
    try {
      const res = await axios.get(`${ENTRY_POINT}/categories/${categoryId}`);
      return res.data.products;
    } catch(e) {
      return e.response.data;
    }
  }
}
