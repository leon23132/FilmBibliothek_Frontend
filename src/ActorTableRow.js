import React from "react";

export function ActorTableRow({ actor, editCallback, deleteCallback }) {

    return (
        <tr>
            <td>{actor.actor_name}</td>
            <td>
                <button className="btn btn-sm btn-warning m-1" onClick={() => editCallback(actor)}>
                    Edit
                </button>
                <button className="btn btn-sm btn-danger m-1" onClick={() => deleteCallback(actor)}>
                    Delete
                </button>
            </td>
        </tr>
    );
}
