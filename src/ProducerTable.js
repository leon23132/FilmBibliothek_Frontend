import React from "react";
import { ProducerTableRow } from "./ProducerTableRow";

export function ProducerTable({ producerList, editCallback, deleteCallback }) {

    return (
        <table className="table table-sm table-striped table-bordered">
            <thead>
                <tr>
                    <th colSpan="3" className="bg-primary text-white text-center h4 p-2">
                        Produzenten
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
                    producerList.map(producer =>
                        <ProducerTableRow
                            producer={producer}
                            key={producer.producer_id}
                            editCallback={editCallback}
                            deleteCallback={deleteCallback}
                        />)
                }
            </tbody>
        </table>
    );
}
