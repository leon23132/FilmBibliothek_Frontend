import React from "react";
import { ActorTableRow } from "./ActorTableRow";

export function ActorTable({ actorList, editCallback, deleteCallback }) {

    return (
        <table className="table table-sm table-striped table-bordered">
            <thead>
                <tr>
                    <th colSpan="3" className="bg-primary text-white text-center h4 p-2">
                        Schauspieler
                    </th>
                </tr>
                <tr>
                    <th>Name</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {
                    actorList.map(actor =>
                        <ActorTableRow
                            actor={actor}
                            key={actor.actor_id}
                            editCallback={editCallback}
                            deleteCallback={deleteCallback}
                        />)
                }
            </tbody>
        </table>
    );
}
