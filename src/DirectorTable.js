import React from "react";
import { DirectorTableRow } from "./DirectorTableRow";

export function DirectorTable({ directorList, editCallback, deleteCallback }) {

    return (
        <table className="table table-sm table-striped table-bordered">
            <thead>
                <tr>
                    <th colSpan="3"
                        className="bg-primary text-white text-center h4 p-2">
                        Regisseure
                    </th>
                </tr>
                <tr>
                    <th>Vorname</th>
                    <th>Name</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {
                    directorList.map(director =>
                        <DirectorTableRow
                            director={director}
                            key={director.director_id}
                            editCallback={editCallback}
                            deleteCallback={deleteCallback}
                        />)
                }
            </tbody>
        </table>
    );
}
