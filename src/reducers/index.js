const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
    filtersLoadingStatus: 'idle',
    filters: [],
    filter: 'all'
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'HEROES_FETCHING':
            return {
                ...state,
                heroesLoadingStatus: 'loading'
            }
        case 'HEROES_FETCHED':
            return {
                ...state,
                heroes: action.payload,
                heroesLoadingStatus: 'idle'
            }
        case 'HEROES_FETCHING_ERROR':
            return {
                ...state,
                heroesLoadingStatus: 'error'
            }
        case 'FILTERS_FETCHED':
            return {
                ...state,
                filters: action.payload,
                filtersLoadingStatus: 'idle'
            }
        case 'HERO_ADD':
        return {
            ...state,
            heroes: [...state.heroes, action.payload]  
        }
        case 'HERO_DELETE':
        return {
            ...state,
            heroes: state.heroes.filter(hero => hero.id !== action.payload)
        }
        case 'FILTER_CHANGE':
        return {
            ...state,
            filter: action.payload,
        }

        default: return state
    }
}

export default reducer;