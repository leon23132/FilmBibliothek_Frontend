import React from "react";
import { GenreTableRow } from "./GenreTableRow";

export function GenreTable({ genreList, editCallback, deleteCallback }) {

    return (
        <table className="table table-sm table-striped table-bordered">
            <thead>
                <tr>
                    <th colSpan="2"
                        className="bg-primary text-white text-center h4 p-2">
                        Genres
                    </th>
                </tr>
                <tr>
                    <th>Name</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {
                    genreList.map(genre =>
                        <GenreTableRow
                            genre={genre}
                            key={genre.genre_id}
                            editCallback={editCallback}
                            deleteCallback={deleteCallback}
                        />)
                }
            </tbody>
        </table>
    );
}
