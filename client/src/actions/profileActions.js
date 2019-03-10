import axios from 'axios'
import { 
  GET_ERRORS,
  PROFILE_LOADING,
  GET_PROFILE,
  CLEAR_CURRENT_PROFILE,
} from './types'

// Profile Loading
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  }
}

// Get Current User
export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading())
  axios.get('/api/users/current')
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: {}
      })
    )
}

// Clear Profile
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  }
}

// Add A Weight
export const addWeight = (weightData, history) => dispatch => {
  axios.post('/api/users/weights', weightData)
    .then(res => {
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
      history.push('/dashboard')
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    )
}

// Delete A Weight
export const deleteWeight = id => dispatch => {
  axios.delete(`/api/users/weights/${id}`)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    ).catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    )
}

// Add Calories
export const addCalorie = (calorieData, history) => dispatch => {
  axios.post('/api/users/calories', calorieData)
    .then(res => {
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
      history.push('/dashboard')
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    )
}

// Delete A Weight
export const deleteCalories = id => dispatch => {
  axios.delete(`/api/users/calories/${id}`)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    ).catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    )
}