import axios from 'axios';
import { ENTRY_POINT } from '../constants/URLs';

export default class ProductService {
  async getAllProducts() {
    try {
      const res = await axios.get(`${ENTRY_POINT}/products`);
      return res.data;
    } catch(e) {
      return {
        error: 'Error while trying to get all products'
      };
    }
  }

  async getProductsByCategoryId(categoryId) {
    try {
      const res = await axios.get(`${ENTRY_POINT}/categories/${categoryId}`);
      return res.data.products;
    } catch(e) {
      return {
        error: 'Error while trying to get products of this category'
      }
    }
  }

  async get(id) {
    try {
      const res = await axios.get(`${ENTRY_POINT}/products/${id}`);
      return res.data;
    } catch(e) {
      return {
        error: 'Error while trying to get product detail'
      }
    }
  }
}
