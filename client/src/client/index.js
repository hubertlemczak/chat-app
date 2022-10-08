import axios from 'axios';

const host = 'https://chat-app-3ql0.onrender.com/api';

const client = {
  get: path => {
    const token = localStorage.getItem('chat-app-token');
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    return axios.get(`${host}${path}`, { headers });
  },
  post: async (path, data) => {
    const token = localStorage.getItem('chat-app-token');
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    return axios.post(`${host}${path}`, data, { headers });
  },
  patch: async (path, data) => {
    const token = localStorage.getItem('chat-app-token');
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    return axios.patch(`${host}${path}`, data, { headers });
  },
  delete: async path => {
    const token = localStorage.getItem('chat-app-token');
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    return axios.delete(`${host}${path}`, { headers });
  },
};

export default client;
