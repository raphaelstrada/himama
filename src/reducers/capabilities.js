import { createAction, createReducer } from 'redux-act'
import { pending, resolve, reject } from '../utils/actions'
// import { isLocal } from '../utils'
import { showLoading, hideLoading } from './ui'
import Location from '../utils/Location'

const initialState = {
  hasCamera: false,
  hasLocation: false
}

export const requestLocation = () => dispatch => {
  dispatch(showLoading())
  dispatch(getLocation(dispatch))
}

export const requestCamera = () => dispatch => {
  dispatch(showLoading())
  dispatch(getCamera(dispatch))
}

const getCamera = createAction('GET_CAMERA', dispatch => new Promise(async (resolve, reject) => {
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      resolve(stream)
      dispatch(hideLoading())
    } catch (e) {
      reject(new Error('No camera'))
    }
  } else {
    reject(new Error('No camera'))
  }
}))

const getLocation = createAction('GET_LOCATION', dispatch => new Promise(async (resolve, reject) => {
  try {
    const position = await Location.getGeolocation()
    dispatch(hideLoading())
    resolve(position)
  } catch (error) {
    reject(error)
  }
}))

export default createReducer(
  {
    [pending(getCamera)]: state => ({
      ...state,
      error: undefined
    }),
    [resolve(getCamera)]: state => ({
      ...state,
      hasCamera: true
    }),
    [reject(getCamera)]: state => ({
      ...state
    }),

    [pending(getLocation)]: state => ({
      ...state,
      error: undefined
    }),
    [resolve(getLocation)]: state => ({
      ...state,
      hasLocation: true
    }),
    [reject(getLocation)]: state => ({
      ...state
    })
  },
  initialState
)
