/** @format */

import { createContext, useEffect, useReducer } from 'react';
// utils
import { setSession } from '../utils/jwt';
import axios from 'axios';
import CryptoJS from 'crypto-js';
import { secretKey, HOST_API } from 'config.js';
import { getAllMenuOption, sampleMenuOption } from 'menu';

//

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
  role: '',
};

export const encryptFn = (data) => {
  const encryptionSecret = secretKey.encryptionSecret;
  var key = CryptoJS.enc.Latin1.parse(encryptionSecret);
  var iv = CryptoJS.enc.Latin1.parse(encryptionSecret);
  var encrypted = CryptoJS.AES.encrypt(data, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.ZeroPadding,
  });
  return encrypted.toString();
};
const handlers = {
  INITIALIZE: (state, action) => {
    const { isAuthenticated, user } = action.payload;
    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user,
    };
  },
  LOGIN: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      role: 'admin',
      user,
    };
  },
  LOGOUT: (state) => ({
    ...state,
    isAuthenticated: false,
    user: null,
  }),
  REGISTER: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
};

const reducer = (state, action) =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

const AuthContext = createContext({
  ...initialState,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  register: () => Promise.resolve(),
});

// ----------------------------------------------------------------------
function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const initialize = async () => {
      try {
        const accessToken = window.sessionStorage.getItem('accessToken');
        console.log(accessToken);

        if (accessToken) {
          setSession(accessToken);

          // const response = await axios.get('/api/account/my-account');
          const user = JSON.parse(window.sessionStorage.getItem('userDetails'));
          const mappedMenuOptions = getAllMenuOption(sampleMenuOption);
          user.menuOption = mappedMenuOptions;

          dispatch({
            type: 'INITIALIZE',
            payload: {
              isAuthenticated: true,
              user,
            },
          });
        } else {
          dispatch({
            type: 'INITIALIZE',
            payload: {
              isAuthenticated: false,
              user: null,
            },
          });
        }
      } catch (err) {
        console.error(err, 'init');
        dispatch({
          type: 'INITIALIZE',
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    };

    initialize();
  }, []);

  const login = async (formData) => {
    const encryptedUserName = encryptFn(formData.username);
    const encryptedPassword = encryptFn(formData.password);
    const req = {
      userName: encryptedUserName,
      password: encryptedPassword,
    };

    const { data } = await axios.post(HOST_API + 'hmis-user-service/user/userLogin', req);
    if (data.message === 'Wrong Credentials') {
      setSession(null);
      throw new Error(data.message);
    }
    setSession(data.token);
    window.sessionStorage.setItem('userDetails', JSON.stringify(data));
    const mappedMenuOptions = getAllMenuOption(sampleMenuOption);
    data.menuOption = mappedMenuOptions;
    dispatch({
      type: 'LOGIN',
      payload: {
        user: data,
      },
    });
    return data;
  };

  const logout = async () => {
    setSession(null);
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
