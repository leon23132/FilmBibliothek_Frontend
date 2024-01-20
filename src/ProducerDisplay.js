import React, { useState, useEffect } from "react";
import { ProducerTable } from "./ProducerTable"
import { ProducerEditor } from "./ProducerEditor";
import { deleteData, getData, postData, putData } from './Reqeusts';

export function ProducerDisplay() {

    const [producerList, setProducerList] = useState([]);
    const [producer, setProducer] = useState(null);

    const fetchData = async (url, setter) => {
        const data = await getData(url);
        if (data) {
            setter(data);
        }
    };

    useEffect(
        () => {
            fetchData("http://localhost:8080/producers/", setProducerList);
        },
        []
    );

    const cancelCallback = () => setProducer(null);

    const deleteCallback = async (producer) => {
        await deleteData(`http://localhost:8080/producers/delete/${producer.producer_id}`);
        await fetchData("http://localhost:8080/producers/", setProducerList);
        setProducer(null);
    };

    const editCallback = (producer) => setProducer(producer);

    const saveCallback = async (producer) => {
        await (producer.producer_id
            ? putData(
                `http://localhost:8080/producers/update/${producer.producer_id}`,
                {
                    firstname: producer.firstname,
                    lastname: producer.lastname
                }
            )
            : postData(`http://localhost:8080/producers/add/${producer.firstname},${producer.lastname}`)
        );
        await fetchData("http://localhost:8080/producers/", setProducerList);
        setProducer(null);
    };

    const createCallback = () => setProducer(
        {
            producer_id: 0,
            firstname: "",
            lastname: ""
        }
    );

    if (producer) {
        return (
            <ProducerEditor
                producer={producer}
                saveCallback={saveCallback}
                cancelCallback={cancelCallback}
            />
        );
    }
    else {
        return (
            <div className="m-2">
                <ProducerTable
                    producerList={producerList}
                    editCallback={editCallback}
                    deleteCallback={deleteCallback}
                />
                <div className="text-center">
                    <button className="btn btn-primary m-1" onClick={createCallback}>
                        Neuer Produzent
                    </button>
                </div>
            </div>
        );
    }
}
