import React from "react";

export function DirectorTableRow({ director, editCallback, deleteCallback }) {

    return (
        <tr>
            <td>{director.firstname}</td>
            <td>{director.lastname}</td>
            <td>
                <button className="btn btn-sm btn-warning m-1" onClick={() => editCallback(director)}>
                    Edit
                </button>
                <button className="btn btn-sm btn-danger m-1" onClick={() => deleteCallback(director)}>
                    Delete
                </button>
            </td>
        </tr>
    );
}
