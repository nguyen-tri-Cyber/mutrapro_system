import { Platform } from 'react-native';

// For Android emulator use 10.0.2.2, else localhost.
const BASE = Platform.OS === 'android' ? 'http://10.0.2.2:4000' : 'http://localhost:4000';

async function req(path, method='GET', body, token){
  const res = await fetch(BASE + path, {
    method,
    headers: { 'Content-Type': 'application/json', ...(token? { 'Authorization':'Bearer '+token } : {}) },
    body: body ? JSON.stringify(body) : undefined
  });
  return res.json();
}

// Auth
export async function loginApi(email, password){
  return req('/api/auth/login', 'POST', { email, password });
}
export async function registerApi(name, email, password, role){
  return req('/api/auth/register', 'POST', { name, email, password, role });
}

// Orders
export async function createOrder(token, service_type, description, price=0){
  return req('/api/orders/orders', 'POST', { service_type, description, price }, token);
}
export async function listOrders(token){
  return req('/api/orders/orders', 'GET', null, token);
}

// Tasks
export async function myTasks(token){
  return req('/api/tasks/tasks/my', 'GET', null, token);
}
export async function setTaskStatus(token, id, status){
  return req('/api/tasks/tasks/'+id+'/status', 'POST', { status }, token);
}

// Studio
export async function listStudios(token){
  return req('/api/studios/studios', 'GET', null, token);
}
export async function myBookings(token){
  return req('/api/studios/bookings/my', 'GET', null, token);
}
export async function createBooking(token, studio_id, order_id, start_time, end_time){
  return req('/api/studios/bookings', 'POST', { studio_id, order_id, start_time, end_time }, token);
}

// Notifications
export async function myNotifications(token){
  return req('/api/notifications/my', 'GET', null, token);
}
