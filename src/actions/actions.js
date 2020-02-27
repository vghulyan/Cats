import * as types from './types';

// Get Cats
export const addCats = (cats) => ({
    type: types.CATS_AVAILABLE,
    data: {cats}
});

// Add Cat - CREATE (C)
export const addCat = (cat) => ({
    type: types.ADD_CAT,
    data: {cat}
});

// Update Cat - UPDATE (U)
export const updateCat = (cat) => ({
    type: types.UPDATE_CAT,
    data: {cat}
});

// Delete Cat - DELETE (D)
export const deleteCat = (id) => ({
    type: types.DELETE_CAT,
    data: {id}
});
