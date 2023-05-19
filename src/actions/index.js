// IS NOT USED

// import { createAction } from "@reduxjs/toolkit";
// import {
//     heroesFetching,
//     heroesFetched,
//     heroesFetchingError
// } from '../components/heroesList/HeroesSlice'

// import {
//     filtersFeched
// } from '../components/heroesFilters/FilterSlice'

// export const fetchHeroes = (request, setShowHero) => (dispatch) => {
//     dispatch(heroesFetching());
//     request("http://localhost:3001/heroes")
//         .then(data => dispatch(heroesFetched(data)))
//         // .then(() => setShowHero(true))
//         .catch(() => dispatch(heroesFetchingError()))
// }

// export const fetchFilters = (request) => (dispatch) => {
//     request('http://localhost:3001/filters')
//             .then(data => dispatch(filtersFeched(data)))
//             .catch((error) =>  console.error(error))
// }

// export const heroesFetching = createAction('HEROES_FETCHING');
// export const heroesFetched = createAction('HEROES_FETCHED');
// export const heroesFetchingError = createAction('HEROES_FETCHING_ERROR');
// export const filtersFetching = createAction('FILTERS_FETCHING');
// export const filtersFeched = createAction('FILTERS_FETCHED');
// export const filtersFetchingError = createAction('FILTERS_FETCHING_ERROR');
// export const heroInfo = createAction('HERO_ADD');
// export const deletingHero = createAction('HERO_DELETE');
// export const changeFilter = createAction('FILTER_CHANGE');

// export const heroesFetching = () => {
//     return {
//         type: 'HEROES_FETCHING'
//     }
// }

// export const heroesFetched = (heroes) => {
//     return {
//         type: 'HEROES_FETCHED',
//         payload: heroes
//     }
// }

// export const heroesFetchingError = () => {
//     return {
//         type: 'HEROES_FETCHING_ERROR'
//     }
// }

// export const filtersFetching = () => {
//     return {
//         type: 'FILTERS_FETCHING'
//     }
// }

// export const filtersFeched = (filters) => {
//     return {
//         type: 'FILTERS_FETCHED',
//         payload: filters
//     }
// }

// export const filtersFetchingError = () => {
//     return {
//         type: 'FILTERS_FETCHING_ERROR'
//     }
// }

// export const heroInfo = (hero) => {
//     return {
//         type: 'HERO_ADD',
//         payload: hero,
//     }
// }

// export const deletingHero = (id) => {
//     return {
//         type: 'HERO_DELETE',
//         payload: id,
//     }
// }

// export const changeFilter = (filter) => {
//     return {
//         type: 'FILTER_CHANGE',
//         payload: filter,
//     }
// }

// export const  = () => {
//     return {
//         type: 'ADD_HERO_INFO'
//     }
// }