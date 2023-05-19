import { useEffect } from "react";
import { useHttp } from "../../hooks/http.hook";
import { useSelector, useDispatch } from "react-redux";
import {changeFilter} from './FilterSlice';
import classNames from "classnames";
import {fetchHeroes} from '../heroesList/HeroesSlice';

const HeroesFilters = () => {
    const {filtersAll, filter} = useSelector(state => state.filters);
    const dispatch = useDispatch();
    const {request} = useHttp();

    useEffect(() => {
        request('http://localhost:3001/heroes')
            .then(res => {
                dispatch(fetchHeroes(res.filter(item => filter === 'all' ? item : item.element === filter)))
            })
    }, [filter])

    const onActiveButton = (name) => {
        dispatch(changeFilter(name))
    }

    const renderFilters = (filters) => {
        return filters.map(({name, label, className}, i) => {
            const active = filter === name ? classNames({active: true}) : classNames({active: false})
            
            return <button key={i} onClick={() => onActiveButton(name)} className={`btn ${className} ${active} `}>{label}</button>
        })
    }

    

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Відфільтруйте героїв по елементах</p>
                <div className="btn-group">
                    {renderFilters(filtersAll)}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;