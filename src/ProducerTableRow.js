import React from "react";

export function ProducerTableRow({ producer, editCallback, deleteCallback }) {

    return (
        <tr>
            <td>{producer.firstname}</td>
            <td>{producer.lastname}</td>
            <button className="btn btn-sm btn-warning m-1"
                onClick={() => editCallback(producer)}>
                Edit
            </button>
            <button className="btn btn-sm btn-danger m-1"
                onClick={() => deleteCallback(producer)}>
                Delete
            </button>
        </tr>
    );
}
