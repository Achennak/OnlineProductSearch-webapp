import { createSlice } from "@reduxjs/toolkit";
import { createTuitThunk, deleteTuitThunk, findPropertiesThunk, updateTuitThunk } from "../services/home-page-thunks";
import {findPropertiesThunkById} from "../services/property-screen-thunk";



const initialState = {
    properties: [],
    loading: false
}

const propertiesSlice = createSlice({
    name: 'properties',
    initialState,
    extraReducers: {
        [findPropertiesThunk.pending]:
            (state) => {
                state.loading = true
                state.properties = []
            },
        [findPropertiesThunk.fulfilled]:
            (state, { payload }) => {
                state.loading = false
                state.properties = payload
            },
        [findPropertiesThunk.rejected]:
            (state) => {
                state.loading = false
            },
        [findPropertiesThunkById.fulfilled]:
            (state,{payload}) => {
                state.loading = false
                state.properties=payload
            },

        [findPropertiesThunkById.rejected]:
            (state) => {
                state.loading = false
            },
        [findPropertiesThunkById.pending]:
            (state) => {
                state.loading = true
                state.properties=[]
            }


        }

});

export default propertiesSlice.reducer;