import React, {createContext, useContext, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {useDispatch} from 'react-redux';
import {
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
} from '../../../../shared/constants/ActionTypes';
import jwtAxios, {setAuthToken} from './jwt-api';

const JWTAuthContext = createContext();
const JWTAuthActionsContext = createContext();

export const useJWTAuth = () => useContext(JWTAuthContext);

export const useJWTAuthActions = () => useContext(JWTAuthActionsContext);

const JWTAuthAuthProvider = ({children}) => {
  const [firebaseData, setJWTAuthData] = useState({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  const dispatch = useDispatch();

  useEffect(() => {
    const getAuthUser = () => {
      const token = localStorage.getItem('token');
      const id = localStorage.getItem('id');
      if (!token) {
        setJWTAuthData({
          user: undefined,
          isLoading: false,
          isAuthenticated: false,
        });
        return;
      }
      setAuthToken(token);
      jwtAxios
        .get('user/' + id)
        .then((res) => {
          console.log('Esla Wuni', res);
          setJWTAuthData({
            user: res.data.data,
            isLoading: false,
            isAuthenticated: true,
          });
        })
        .catch(() => {
          // console.log('Esla Wuni', err);

          setJWTAuthData({
            user: undefined,
            isLoading: false,
            isAuthenticated: false,
          });
        });
    };

    getAuthUser();
  }, []);

  const signInUser = async ({email, password}) => {
    dispatch({type: FETCH_START});
    try {
      const {data} = await jwtAxios.post('user/login', {email, password});
      console.log(data);
      localStorage.setItem('token', data.data.token);
      localStorage.setItem('id', data.data.user._id);
      setAuthToken(data.token);
      setJWTAuthData({
        user: data.data.user,
        isAuthenticated: true,
        isLoading: false,
      });
      dispatch({type: FETCH_SUCCESS});
    } catch (error) {
      setJWTAuthData({
        ...firebaseData,
        isAuthenticated: false,
        isLoading: false,
      });
      dispatch({type: FETCH_ERROR, payload: error.message});
    }
  };

  const signUpUser = async ({name, email, password, passwordConfirm}) => {
    console.log(name, email, password, passwordConfirm);
    dispatch({type: FETCH_START});
    try {
      const {data} = await jwtAxios.post('user/signup', {
        name,
        email,
        password,
        passwordConfirm,
      });
      localStorage.setItem('token', data.data.token);
      localStorage.setItem('id', data.data.user._id);

      setAuthToken(data.token);
      setJWTAuthData({
        user: data.data.user,
        isAuthenticated: true,
        isLoading: false,
      });
      dispatch({type: FETCH_SUCCESS});
    } catch (error) {
      setJWTAuthData({
        ...firebaseData,
        isAuthenticated: false,
        isLoading: false,
      });
      dispatch({type: FETCH_ERROR, payload: error.message});
    }
  };

  const logout = async () => {
    localStorage.removeItem('token');
    setAuthToken();
    setJWTAuthData({
      user: null,
      isLoading: false,
      isAuthenticated: false,
    });
  };

  return (
    <JWTAuthContext.Provider
      value={{
        ...firebaseData,
      }}>
      <JWTAuthActionsContext.Provider
        value={{
          signUpUser,
          signInUser,
          logout,
        }}>
        {children}
      </JWTAuthActionsContext.Provider>
    </JWTAuthContext.Provider>
  );
};
export default JWTAuthAuthProvider;

JWTAuthAuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
