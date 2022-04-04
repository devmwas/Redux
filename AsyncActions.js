const redux = require('redux')
const thunk = require('redux-thunk').default
const axios = require('axios')
const reduxLogger = require('redux-logger')

const logger = reduxLogger.createLogger()
const createStore = redux.createStore
const applyMiddleWare = redux.applyMiddleware

// The initial state of our appluication
const initialState = {
    loading: false,
    users: [],
    error: ''
}

// Defining our actions
const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST'
const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS'
const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE'

// Creating our actions
const fetchUsers = () => {
    return {
        type: FETCH_USERS_REQUEST
    }
}

const fetchUsersSuccess = (users) => {
    return {
        type: FETCH_USERS_SUCCESS,
        payload: users
    }
}

const fetchUsersFailure = (error) => {
    return {
        type: FETCH_USERS_FAILURE,
        payload: error
    }
}

// Our Reducer
const reducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_USERS_REQUEST:
            return {
                loading: true,
                error: '',
                users: []
            }
        case FETCH_USERS_SUCCESS:
            return {
                error: '',
                loading: false,
                users: action.payload
            }
        case FETCH_USERS_FAILURE:
            return {
                loading: false,
                users: [],
                error: action.payload
            }
        default: return {...state}
    }
}

// Creating our async action function creator
const getUsers = () => {
    return (dispatch) => {
        dispatch(fetchUsers())
        axios.get('https://jsonplaceholder.typicode.com/users')
        .then(response => {
            const users = response.data.map(user => user.id)
            dispatch(fetchUsersSuccess(users))
        })
        .catch(error => {
            dispatch(fetchUsersFailure(error.message))
        })
    }
}

// Creating our store
const store = createStore(reducer, applyMiddleWare(thunk, logger))

// Now we can subscribe to the store and start dispatching actions
const unsubscribe = store.subscribe(() => {})
store.dispatch(getUsers())
// console.log('Display before users!!!')
// console.log('Display before users!!!')
// console.log('Display before users!!!')
// console.log('Display before users!!!')
// console.log('Display before users!!!')
// unsubscribe()
