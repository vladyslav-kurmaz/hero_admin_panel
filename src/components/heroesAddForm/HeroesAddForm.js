import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { useHttp } from "../../hooks/http.hook";
import { useDispatch, useSelector } from "react-redux";
import { fetchFilters } from "../heroesFilters/FilterSlice";
import {heroesInfo} from '../heroesList/HeroesSlice';

const HeroesAddForm = () => {
    const {filtersAll} = useSelector(state => state.filters);
    const dispatch = useDispatch();
    const {request} = useHttp();
    const [infoForm, setInfoForm] = useState({});
    const [name, setName] = useState('');
    const [text, setText] = useState('');
    const [element, setElement] = useState('');

    useEffect(() => {
        dispatch(fetchFilters());
    }, [])

    const renderFilters = (filters) => {
        return filters.map((item, i) => {
            const {name, label, className} = item;
            if (item.name === 'all') return;

            return <option value={name} className={className} key={i}>{label}</option>
        })
    }

    const createHero = (e) => {
        e.preventDefault();

        request('http://localhost:3001/heroes', 'POST', JSON.stringify(infoForm))
            .then(res => console.log(`
               \\ /  __   __
                |  |__  |__
                |  |__   __|
            `))
            .then(dispatch(heroesInfo(infoForm)))
            .catch(error => console.error(error));
        
        setName('');
        setText('');
        setElement('');
    }

    const addHeroInfo = (e) => {
        switch(e.target.getAttribute('name')) {
            case 'name':
                setName(() => e.target.value);    
                return setInfoForm(state => (
                        {
                            ...state,
                            name: e.target.value
                        }
                    ));
            case 'text':
                setText(() => e.target.value); 
                return setInfoForm(state => (
                    {
                        ...state,
                        description: e.target.value
                    }
                ));
            case 'element':
                setElement(() => e.target.value);
                return setInfoForm(state => (
                    {
                        ...state,
                        element: e.target.value,
                        id: uuidv4()
                    }
                ));
            
            default:
                throw new Error('filter is not defined')
        }
    }
    
    return (
        <form className="border p-4 shadow-lg rounded" 
            onSubmit={(e) => createHero(e)}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">Ім'я нового героя</label>
                <input 
                    required
                    type="text" 
                    name="name" 
                    className="form-control" 
                    id="name" 
                    value={name}
                    onChange={(e) => addHeroInfo(e)}
                    placeholder="Як мене звати?"/>
            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">Опис</label>
                <textarea
                    required
                    name="text" 
                    className="form-control" 
                    id="text" 
                    value={text}
                    placeholder="Що я вмію?"
                    onChange={(e) => addHeroInfo(e)}
                    style={{"height": '130px'}}/>
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">Виберіть елемент героя</label>
                <select 
                    required
                    className="form-select" 
                    id="element" 
                    name="element"
                    value={element}
                    onChange={(e) => addHeroInfo(e)}>
                        <option>Який у тебе елемент...</option>
                    {renderFilters(filtersAll)}
                </select>
            </div>

            <button type="submit" 
                    onClick={() => setInfoForm(state => ({ 
                            ...state,
                            id: uuidv4()
                        })
                    )} 
                    className="btn btn-primary">Створити</button>
        </form>
    )
}

export default HeroesAddForm;