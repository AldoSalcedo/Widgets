import React, { useState, useEffect } from "react";
import axios from "axios";

const Search = ()  => {
    const [term, setTerm] = useState(''); //*State hook
    const [debouncedTerm, setDebouncedTerm] = useState(term); //*this state is created to eliminate a bug caused for setting a timer to change something and cancelling it if we make another change that to soon
    const [results, setResults] = useState([]);

    //this one updates debounced term
/*(1)*/ useEffect(() => {
        const timerId = setTimeout(() => {
            setDebouncedTerm(term); //! 2.- Everytime Term changes, we gonna que up a change to debouncedTerm, is gonna execute in 1sec
        }, 1000);

// cleanup function cancels timer 
        return () => {
            clearTimeout(timerId); //! 3.- this clears the previous timeout if the user cahnges Term again to quickly and sets a new timer
        };
    }, [term]); //! 1.- This is a useEffect running everytime TERM changes
    //! 4.- if the change to setDebouncedTerm goes through and processed, we run the second useEffect

/*(2)*/useEffect(() => { //we cannot mark our useEffect function with async or await keywords inside the function IEX: useEffect(async () => {}
        const search = async () => {
            const { data } = await axios.get('https://en.wikipedia.org/w/api.php', {
                params: { //! 6.- it makes a request
                    action: 'query',
                    list: 'search',
                    origin: '*',
                    format: 'json',
                    srsearch: debouncedTerm
                }
                // there is just one single type of value that useEffect function let us return inside of it and is another function
            });

            setResults(data.query.search); //! 7.- it takes some results and updates our results piece of state
        };
        if (debouncedTerm) {
            search(); //! 5.- when this one runs, we call search
        }
    }, [debouncedTerm]); //! *this one is going to run whenever our component first shows up on the screen making a search inmediately*
    //*in useEffect we declare a second argument, wich culd be one of 3 options: [] = run at initial render, ..nothing.. = run at initial render and after every single rerender, [data] = run at initial render and after every rerender if data has changed since las render
        //[term] decides when to rerun our useEffect function

    const renderedResults = results.map((result) => {
        const regex = /(<([^>]+)>)|(&quot;)/gi //NEW
        const cleanSnippet = result.snippet.replace(regex, ""); //NEW 

        return ( // {result.snippet} was replaced with {cleanSnippet} 
            <div key={result.pageid} className="item">
                <div className="right floated content">
                    <a className="ui button" href={`https://en.wikipedia.org?curid=${result.pageid}`}>Go</a>
                </div>
                <div className="content">
                    <div className="header">{result.title}</div>
                    {cleanSnippet} 
                </div>
            </div>
        )
    });

    return (
        <div>
            <div className="ui form">
                <div className="field">
                    <label>Enter Search Term</label>
                    <input value={term} onChange={e => setTerm(e.target.value)} className="input" />
                </div>
            </div>
            <div className="ui celled list">{renderedResults}</div>
        </div>
    )
}

export default Search;