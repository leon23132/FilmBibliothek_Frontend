import React, { useState, useEffect } from "react";
import { FilmTable } from "./FilmTable"
import { FilmEditor } from "./FilmEditor";
import { deleteData, getData, postData } from './Reqeusts';

export function FilmDisplay() {

    const [filmList, setFilmList] = useState([]);
    const [actorList, setActorList] = useState([]);
    const [directorList, setDirectorList] = useState([]);
    const [genreList, setGenreList] = useState([]);
    const [producerList, setProducerList] = useState([]);
    const [selState, setSelState] = useState({ director: 0, genre: 0, producer: 0, actor: 0, releasedate: 0 });
    const [film, setFilm] = useState(null);

    const fetchData = async (url, setter) => {
        const data = await getData(url);
        if (data) {
            setter(data);
        }
    };

    useEffect(
        () => {
            fetchData("http://localhost:8080/directors/", setDirectorList);
            fetchData("http://localhost:8080/producers/", setProducerList);
            fetchData("http://localhost:8080/actors/", setActorList);
            fetchData("http://localhost:8080/genres/", setGenreList);
            fetchData("http://localhost:8080/films/", setFilmList);
        },
        []
    );

    const selectorChanged = async (ev) => {
        const s = { ...selState, [ev.target.id]: ev.target.value };
        await fetchData(
            `http://localhost:8080/films/selection/${s.director},${s.genre},${s.producer},${s.actor},${s.releasedate}`,
            setFilmList
        );
        setSelState(s);
    };

    const cancelCallback = () => setFilm(null);

    const deleteCallback = async (film) => {
        await deleteData(`http://localhost:8080/films/delete/${film.filmId}`);
        const s = selState;
        await fetchData(
            `http://localhost:8080/films/selection/${s.director},${s.genre},${s.producer},${s.actor},${s.releasedate}`,
            setFilmList
        );
        setFilm(null);
    };

    const editCallback = (film) => setFilm(film);

    const saveCallback = async (film) => {
        await postData("http://localhost:8080/films/add", film);
        const s = selState;
        await fetchData(
            `http://localhost:8080/films/selection/${s.director},${s.genre},${s.producer},${s.actor},${s.releasedate}`,
            setFilmList
        );
        setFilm(null);
    };

    const createCallback = () => setFilm({
        filmId: 0,
        title: "",
        director: directorList[0],
        producer: producerList[0],
        genre: genreList[0],
        actors: [],
        releaseDate: [2000, 1, 1]
    });

    return film
        ? (
            <FilmEditor key={film.filmId}
                film={film}
                directorList={directorList}
                producerList={producerList}
                genreList={genreList}
                actorList={actorList}
                saveCallback={saveCallback}
                cancelCallback={cancelCallback}
            />
        )
        : (
            <div className="m-2">
                <FilmTable
                    filmList={filmList}
                    directorList={directorList}
                    producerList={producerList}
                    genreList={genreList}
                    actorList={actorList}
                    selectorChanged={selectorChanged}
                    editCallback={editCallback}
                    deleteCallback={deleteCallback}
                />
                <div className="text-center">
                    <button className="btn btn-primary m-1" onClick={createCallback}>
                        Neuer Film
                    </button>
                </div>
            </div>
        );
}
