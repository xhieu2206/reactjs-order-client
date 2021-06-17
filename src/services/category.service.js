import axios from 'axios';
import {ENTRY_POINT} from '../constants/URLs';

export default class CategoryService {
  async getCategories() {
    try {
      const res = await axios.get(`${ENTRY_POINT}/categories`);
      return res.data;
    } catch(e) {
      return {
        error: 'Error while trying to get products'
      };
    }
  }
}
