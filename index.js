const redux = require('redux')
const reduxLogger = require('redux-logger')

const logger = reduxLogger.createLogger()
const combineReducers = redux.combineReducers
const applyMiddleWare = redux.applyMiddleware
// Our store creator
const createStore = redux.createStore

const BUY_CAKE = 'BUY_CAKE'
const BUY_ICECREAM = 'BUY_ICECREAM'

// Actions in redux
const buyCake = () => {
    return {
        type: BUY_CAKE,
        info: 'Imma buy me some cakes and cookies'
    }
}

const buyIceCream = () => {
    return {
        type: BUY_ICECREAM,
    }
}

const initialState = {
    numOfCakes: 10,
    numOfIceCreams: 20
}

// The redux way of handling multiple reducers is by creating them separately
const initialCakeState = {
    numOfCakes: 10
}

const initialIceCreamState = {
    numOfIceCreams: 20
}

// Ice Cream reducer
const iceCreamReducer = (state = initialIceCreamState, action) => {
    switch(action.type) {
        case BUY_ICECREAM:
            return {
                numOfIceCreams: state.numOfIceCreams - 1
            }
        default: return state
    }
}

// Cakes Reducer
const cakeReducer = (state = initialCakeState, action) => {
    switch(action.type) {
        case BUY_CAKE:
            return {
                numOfCakes: state.numOfCakes - 1
            }
        default: return state
    }
}

// And then we combine the reducers
const rootReducer  = combineReducers(
    {
        cake: cakeReducer,
        iceCream: iceCreamReducer
    }
)

// // Reducer takes state and action and returns the new state
// const reducer = (state = initialState, action) => {
//     switch(action.type) {
//         case BUY_CAKE:
//             return {
//                 ...state,
//                 numOfCakes: state.numOfCakes - 1
//             }
//         case 'BUY_ICECREAM':
//             return {
//                 ...state,
//                 numOfIceCreams: state.numOfIceCreams - 1
//             }
//         default: return state
//     }
// }



// Our store
const store = createStore(rootReducer, applyMiddleWare(logger))
// console.log("Initial state is: ", store.getState())
// Subscribing to the store
unsubscribe = store.subscribe(() => {})
// Dispatching several actions
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyCake())
// Finally unsubscribing from the store
// unsubscribe()
store.dispatch(buyIceCream())
store.dispatch(buyIceCream())
store.dispatch(buyIceCream())



