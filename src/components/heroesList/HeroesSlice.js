import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useHttp } from "../../hooks/http.hook";


const initialState = {
    heroesAll: [],
    heroesLoadingStatus: 'idle',
}



export const fetchHeroes = createAsyncThunk(
    'heroes/fetchHeroes',
    () => {

        const {request} = useHttp();    
        return request("http://localhost:3001/heroes")
    }
)

const heroesSlice = createSlice({
    name: 'heroes',
    initialState,
    reducers: {
        heroesInfo: (state, action) => {
            state.heroesAll.push(action.payload);
        },
        heroesDeleting: (state, action) => {
            state.heroesAll = state.heroesAll.filter(hero => hero.id !== action.payload)
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchHeroes.pending, state => {
                state.heroesLoadingStatus = 'loading';
            })
            .addCase(fetchHeroes.fulfilled, (state, action) => {
                state.heroesAll = action.payload;
                state.heroesLoadingStatus = 'idle';
            })
            .addCase(fetchHeroes.rejected, state => {
                state.heroesLoadingStatus = 'error';
            })
            .addDefaultCase(() => {})
    }
});

const {actions, reducer} = heroesSlice;

export default reducer;
export const  {
    heroesFetching,
    heroesFetched,
    heroesFetchingError,
    heroesInfo,
    heroesDeleting
} = actions;
