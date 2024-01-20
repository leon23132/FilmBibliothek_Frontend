import React from "react";
import { FilmTableRow } from "./FilmTableRow";
import { releaseDecades } from './Filmdata';

export function FilmTable({ filmList, directorList, producerList, genreList, actorList, selectorChanged, editCallback, deleteCallback }) {

    return (
        <table className="table table-sm table-striped table-bordered">
            <thead>
                <tr>
                    <th colSpan="7"
                        className="bg-primary text-white text-center h4 p-2">
                        Filme
                    </th>
                </tr>
                <tr>
                    <th>Titel</th>
                    <th>Regisseur<br />
                        <select id='director' onChange={selectorChanged}>
                            <option value={0}>Alle</option>
                            {directorList?.map(directors =>
                                <option
                                    key={directors.director_id}
                                    value={directors.director_id}>
                                    {directors.firstname + " " + directors.lastname}
                                </option>
                            )}
                        </select>
                    </th>
                    <th>Produzent<br />
                        <select id='producer' onChange={selectorChanged}>
                            <option value={0}>Alle</option>
                            {producerList?.map(producers =>
                                <option
                                    key={producers.producer_id}
                                    value={producers.producer_id}>
                                    {producers.firstname + " " + producers.lastname}
                                </option>
                            )}
                        </select>
                    </th>
                    <th>Datum<br />
                        <select id='releasedate' onChange={selectorChanged}>
                            <option value={0}>Alle</option>
                            {releaseDecades?.map(releasedate =>
                                <option
                                    key={releasedate.value}
                                    value={releasedate.value}>
                                    {releasedate.text}
                                </option>
                            )}
                        </select>
                    </th>
                    <th>Genre<br />
                        <select id='genre' onChange={selectorChanged}>
                            <option value={0}>Alle</option>
                            {genreList?.map((genre) => (
                                <option
                                    key={genre.genre_id}
                                    value={genre.genre_id}>
                                    {genre.genre_name}
                                </option>
                            ))}
                        </select>
                    </th>
                    <th>Schauspieler<br />
                        <select id='actor' onChange={selectorChanged}>
                            <option value={0}>Alle</option>
                            {actorList?.map(actors =>
                                <option
                                    key={actors.actor_id}
                                    value={actors.actor_id}>
                                    {actors.actor_name}
                                </option>
                            )}
                        </select>
                    </th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {
                    filmList.map(film =>
                        <FilmTableRow
                            film={film}
                            key={film.id}
                            editCallback={editCallback}
                            deleteCallback={deleteCallback}
                        />)
                }
            </tbody>
        </table>
    );
}
