import { useHttp } from "../../hooks/http.hook";

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect'

import { heroesDeleting, fetchHeroes } from './HeroesSlice';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';

const HeroesList = () => {
    const filteredHeroesSelector = createSelector(
        (state) => state.filters.filter,
        (state) => state.heroes.heroesAll,
        (filter, heroesAll) => {
            if (filter === 'all') {
                return heroesAll
            } else {
                return heroesAll.filter(item => item.element === filter) 
            }
        }
    )

    const filteredHero = useSelector(filteredHeroesSelector);
    const heroesLoadingStatus = useSelector((state) => state.heroes.heroesLoadingStatus);
    const [showHero, setShowHero] = useState(false);
    const dispatch = useDispatch();
    const {request} = useHttp();

    useEffect(() => {
        setShowHero(false)

        dispatch(fetchHeroes(setShowHero));
        setShowHero(true)
        // eslint-disable-next-line
    }, []);

    if (heroesLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (heroesLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Помилка завантаження</h5>
    }

    const onDeleteHero = (id) => {
        dispatch(heroesDeleting(id))
        request(`https://ash-gregarious-earth.glitch.me/heroes/${id}`, 'DELETE')
    }

    

    const renderHeroesList = (arr) => {
        if (arr.length === 0) {
            return <h5 className="text-center mt-5">Героїв поки не створено</h5>
        }

        return arr.map(({id, ...props}) => {
            return (
                <HeroesListItem  
                    show={showHero}
                    key={id} 
                    deleteHero={() => onDeleteHero(id)}
                    {...props}/>
            )
        })
    }

    const elements = renderHeroesList(filteredHero);
    return (
            <ul>
                {elements}
            </ul>
    )
}

export default HeroesList;