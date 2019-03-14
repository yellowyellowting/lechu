import request from './request'

export const login = data => request('/login', data, 'POST');

export const register = data => request('/register', data, 'POST');

export const getTaoSeats = () => request('/getTaoSeats', null, 'GET');