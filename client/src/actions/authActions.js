import setAuthToken from '../utils/setAuthToken'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import { 
  GET_ERRORS,
  SET_CURRENT_USER
} from './types'

// Register User
export const registerUser = (userData, history) => dispatch => {
  axios.post('/api/users/register', userData)
    .then(res => history.push('/login'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    )
}

// Login - Get User Token
export const loginUser = userData => dispatch => {
  axios.post('/api/users/login', userData)
    .then(res => {
      // Save to LocalStorage
      const { token } = res.data
      // Set Token to LocalStorage
      localStorage.setItem('jwtToken', token)
      // Set Token to Auth Header
      setAuthToken(token)
      // Decode Token to Get User Data
      const decoded = jwt_decode(token)
      // Set Current User
      dispatch(setCurrentUser(decoded))
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    )
}

// Set Logged In User
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  }
}

// Log User Out
export const logoutUser = () => dispatch => {
  // Remove Token from LocalStorage
  localStorage.removeItem('jwtToken')
  // Remove Auth Header form Future Requests
  setAuthToken(false)
  // Set Current User to (), Which Will Set isAuthenticated to false
  dispatch(setCurrentUser({}))
}

// Delete Account
export const deleteAccount = () => dispatch => {
  if(window.confirm('Are you sure?  This can NOT be Undone!')) {
    axios.delete('/api/users')
      .then(res =>
        dispatch({
          type: SET_CURRENT_USER,
          payload: {}
        })
      ).catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      )
  }
}