import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useHttp } from "../../hooks/http.hook";

const initialState = {
    filtersLoadingStatus: 'idle',
    filtersAll: [],
    filter: 'all'
}

export const fetchFilters = createAsyncThunk(
    'filters/fetchFilters',
    () => {
        const {request} = useHttp();  
        return request('http://localhost:3001/filters')
    }
)

const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        filtersFeched: (state, action) => {
            state.filtersAll = action.payload;
            state.filtersLoadingStatus = 'idle';
        },
        changeFilter: (state, action) => {
            state.filter = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchFilters.pending, state => {
                state.filtersLoadingStatus = 'idle'
            })
            .addCase(fetchFilters.fulfilled, (state, action) => {
                state.filtersAll = action.payload;
                state.filtersLoadingStatus = 'idle';
            })
            .addCase(fetchFilters.rejected, state => {
                state.filtersLoadingStatus = 'error';
            })
            .addDefaultCase(() => {})
    }
})

const {actions, reducer} = filterSlice;

export default reducer;
export const {
    filtersFeched,
    changeFilter
} = actions;