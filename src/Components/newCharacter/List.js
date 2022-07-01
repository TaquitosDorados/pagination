import React, {useState, useEffect} from 'react';
import Character from './Character';
import Pagination from '@mui/material/Pagination';
import './styles.css';

export default function List (){
    const [characters, setCharacter] = useState([]);
    const [loading, setLoading] = useState(true);

    const[currentPageUrl, setCurrentPageUrl] = useState("https://rickandmortyapi.com/api/character");
    const[pages, setPages] = useState();
    const[page, setPage] = useState(1);
    

    useEffect(() => {
        const url = currentPageUrl;

        async function fetchData() {
            const data = await fetch(url);
            const {results, info} = await data.json();

            setCharacter(results);
            setLoading(false);
            setPages(info.pages)
        }

        fetchData();
    }, [currentPageUrl]);

    const goToPage = (event, number) =>{
        setPage(number)
        setCurrentPageUrl(`https://rickandmortyapi.com/api/character?page=${number}`)
    }
    if(loading)
    return (<div>Loading...</div>);

    return (
        <div className="List">
            <Pagination className="pagination" count={pages} page={page} onChange={goToPage} />
            <h2>Characters</h2>
            <div className="row">
                {
                    characters.map((character) =>(
                        <Character
                        key={character.id}
                        name={character.name}
                        origin={character.origin}
                        image={character.image}
                        />
                    ))
                }
            </div>
            <Pagination count={pages} page={page} onChange={goToPage} />
        </div>
    )
}