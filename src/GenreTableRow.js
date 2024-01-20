import React from "react";

export function GenreTableRow({ genre, editCallback, deleteCallback }) {

    return (
        <tr>
            <td>{genre.genre_name}</td>
            <td>
                <button className="btn btn-sm btn-warning m-1" onClick={() => editCallback(genre)}>
                    Edit
                </button>
                <button className="btn btn-sm btn-danger m-1" onClick={() => deleteCallback(genre)}>
                    Delete
                </button>
            </td>
        </tr>
    );
}
