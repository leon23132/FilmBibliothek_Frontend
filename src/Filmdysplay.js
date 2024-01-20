import React, { useEffect, useState } from "react";
import { getData } from './Reqeusts';
import { releaseDecades } from './Filmdata';

function Filmdysplay() {

    const [actorList, setActorList] = useState([]);
    const [directorList, setDirectorList] = useState([]);
    const [genreList, setGenreList] = useState([]);
    const [producerList, setProducerList] = useState([]);
    const [filmList, setFilmList] = useState([]);
    const [selState, setSelState] = useState({ director: 0, genre: 0, producer: 0, actor: 0, releasedate: 0 });


    useEffect(() => {
        const fetchData = async (url, setter) => {
            const data = await getData(url);
            if (data) {
                setter(data);
            }
        };

        fetchData("http://localhost:8080/directors/", setDirectorList);
        fetchData("http://localhost:8080/producers/", setProducerList);
        fetchData("http://localhost:8080/actors/", setActorList);
        fetchData("http://localhost:8080/genres/", setGenreList);
        fetchData("http://localhost:8080/films/", setFilmList);

    }, [setFilmList, setDirectorList, setProducerList, setActorList, setGenreList]);

    const dateConverter = ([year, month, day]) => { return new Date(year, month, day).toLocaleDateString("de-CH") }

    const selectorChanged = (ev) => {
        const fetchData = async (url, setter) => {
            const data = await getData(url);
            if (data) {
                setter(data);
            }
        };
        let s = selState;
        s[ev.target.id] = ev.target.value;
        setSelState(s);
        fetchData(`http://localhost:8080/films/selection/${s.director},${s.genre},${s.producer},${s.actor},${s.releasedate}`, setFilmList);
    };

    return (
        <table>
            <tbody>
                <tr>
                    <th>Titel</th>
                    <th>Regisseur<br />
                        <select id='director' onChange={selectorChanged}>
                            <option value={0}>Alle</option>
                            {directorList?.map(directors =>
                                <option key={directors.director_id} value={directors.director_id}>{directors.firstname + " " + directors.lastname}</option>
                            )}
                        </select>
                    </th>
                    <th>Produzent<br />
                        <select id='producer' onChange={selectorChanged}>
                            <option value={0}>Alle</option>
                            {producerList?.map(producers =>
                                <option key={producers.producer_id} value={producers.producer_id}>{producers.firstname + " " + producers.lastname}</option>
                            )}
                        </select>
                    </th>
                    <th>Veröffentlichungsdatum<br />
                        <select id='releasedate' onChange={selectorChanged}>
                            <option value={0}>Alle</option>
                            {releaseDecades?.map(releasedate =>
                                <option key={releasedate.value} value={releasedate.value}>{releasedate.text}</option>
                            )}
                        </select>
                    </th>
                    <th>Genre<br />
                        <select id='genre' onChange={selectorChanged}>
                            <option value={0}>Alle</option>
                            {genreList?.map((genre) => (
                                <option key={genre.genre_id} value={genre.genre_id}>{genre.genre_name}</option>
                            ))}
                        </select>
                    </th>
                    <th>Schauspieler<br />
                        <select id='actor' onChange={selectorChanged}>
                            <option value={0}>Alle</option>
                            {actorList?.map(actors =>
                                <option key={actors.actor_id} value={actors.actor_id}>{actors.actor_name}</option>
                            )}
                        </select>
                    </th>
                </tr>
                {filmList?.map((film) => (
                    <tr key={film.filmId}>
                        <td>{film.title}</td>
                        <td>{film.director.firstname + " " + film.director.lastname}</td>
                        <td>{film.producer.firstname + " " + film.producer.lastname}</td>
                        <td>{dateConverter(film.releaseDate)}</td>
                        <td>{film.genre.genre_name}</td>
                        <td>{film.actors.map((actor) => actor.actor_name).join(', ')}</td>

                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default Filmdysplay;