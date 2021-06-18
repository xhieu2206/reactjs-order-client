import axios from 'axios';
import { ENTRY_POINT } from '../constants/URLs';

export default class OrderService {
  async getAllOrders(token) {
    try {
      const res = await axios.get(`${ENTRY_POINT}/orders`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
      if (res.data.length === 0) {
        return {
          error: `You haven't had any orders yet`
        }
      }
      return res.data;
    } catch(e) {
      return {
        error: 'Error while trying to get all the orders'
      }
    }
  }

  async createOrder({ productName, image, quantity, deliveryAddress, customerName, phone, email }, token) {
    try {
      const res = await axios.post(`${ENTRY_POINT}/orders`, {
        productName, image, quantity, deliveryAddress, customerName, phone, email
      }, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      return res.data;
    } catch(e) {
      return {
        error: 'Error while creating new order'
      };
    }
  }

  async getOrderById(id, token) {
    try {
      const res = await axios.get(`${ENTRY_POINT}/orders/${id}`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      return res.data;
    } catch(e) {
      return {
        error: 'Error while getting an order'
      }
    }
  }

  async cancelOrder(order, token) {
    try {
      const res = await axios.put(`${ENTRY_POINT}/orders/${order.id}`, {
        ...order,
        status: 'cancelled'
      }, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      return res.data;
    } catch(e) {
      return {
        error: 'Error while trying to cancel order'
      }
    }
  }
}
