import React, { createContext, useContext, useState } from 'react';
import { loginApi } from '../services/api';

const AuthCtx = createContext(null);

export function AuthProvider({ children }){
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  async function login(email, password){
    const data = await loginApi(email, password);
    if (data.token){
      setToken(data.token); setUser(data.user);
      return true;
    }
    return false;
  }

  function logout(){ setToken(null); setUser(null); }

  return <AuthCtx.Provider value={{ token, user, login, logout }}>{children}</AuthCtx.Provider>
}

export function useAuth(){ return useContext(AuthCtx); }
