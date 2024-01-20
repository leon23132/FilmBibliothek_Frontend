import React from "react";

export function FilmTableRow({ film, editCallback, deleteCallback }) {

    const dateConverter = ([year, month, day]) => new Date(year, month, day).toLocaleDateString("de-CH");

    return (
        <tr>
            <td>{film.title}</td>
            <td>{film.director.firstname + " " + film.director.lastname}</td>
            <td>{film.producer.firstname + " " + film.producer.lastname}</td>
            <td>{dateConverter(film.releaseDate)}</td>
            <td>{film.genre.genre_name}</td>
            <td>{film.actors.map((actor) => actor.actor_name).join(', ')}</td>
            <td>
                <button className="btn btn-sm btn-warning m-1" onClick={() => editCallback(film)}>
                    Edit
                </button>
                <button className="btn btn-sm btn-danger m-1" onClick={() => deleteCallback(film)}>
                    Delete
                </button>
            </td>
        </tr>
    );
}
