import { combineReducers } from 'redux';

import * as types from '../actions/types'; //Import the actions types constant we defined in our actions

let dataState = { cats: [] };

const dataReducer = (state = dataState, action) => {
    switch (action.type) {
        case types.ADD_CAT:
            let { cat } = action.data;

            //clone the current state
            let clone = JSON.parse(JSON.stringify(state.cats));

            clone.unshift(cat); //add the new cat to the top

            return {...state, cats: clone};

        case types.CATS_AVAILABLE:
            let { cats } = action.data;

            return {...state, cats};

        case types.UPDATE_CAT:{
            let { cat } = action.data;

            //clone the current state
            let clone = JSON.parse(JSON.stringify(state.cats));

            //check if bookmark already exist
            const index = clone.findIndex((obj) => obj.id === cat.id);

            //if the cat is in the array, update the cat
            if (index !== -1) clone[index] = cat;

            return {...state, cats: clone};
        }

        case types.DELETE_CAT:{
            let { id } = action.data;

            //clone the current state
            let clone = JSON.parse(JSON.stringify(state.cats));

            //check if cat already exist
            const index = clone.findIndex((obj) => obj.id === id);

            //if the cat is in the array, remove the cat
            if (index !== -1) clone.splice(index, 1);

            return {...state, cats: clone};
        }

        default:
            return state;
    }
};

// const dataReducer = (state = dataState, action) => {
//     const { type, payload } = action;
//     debugger;
//     switch (type) {
//         case types.ADD_CAT:
//             let { cat } = payload;
//
//             //clone the current state
//             let clone = JSON.parse(JSON.stringify(state.cats));
//
//             clone.unshift(cat); //add the new cat to the top
//
//             return {...state, cats: clone};
//
//         case types.CATS_AVAILABLE:
//             let { cats } = payload;
//
//             return {...state, cats};
//
//         case types.UPDATE_CAT:{
//             let { cat } = payload;
//
//             //clone the current state
//             let clone = JSON.parse(JSON.stringify(state.cats));
//
//             //check if bookmark already exist
//             const index = clone.findIndex((obj) => obj.id === cat.id);
//
//             //if the cat is in the array, update the cat
//             if (index !== -1) clone[index] = cat;
//
//             return {...state, cats: clone};
//         }
//
//         case types.DELETE_CAT:{
//             let { id } = payload;
//
//             //clone the current state
//             let clone = JSON.parse(JSON.stringify(state.cats));
//
//             //check if cat already exist
//             const index = clone.findIndex((obj) => obj.id === id);
//
//             //if the cat is in the array, remove the cat
//             if (index !== -1) clone.splice(index, 1);
//
//             return {...state, cats: clone};
//         }
//
//         default:
//             return state;
//     }
// };

// Combine all the reducers
const rootReducer = combineReducers({dataReducer});

export default rootReducer;
