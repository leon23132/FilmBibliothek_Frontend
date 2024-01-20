import React, { useState, useEffect } from "react";
import { ActorTable } from "./ActorTable"
import { ActorEditor } from "./ActorEditor";
import { deleteData, getData, postData, putData } from './Reqeusts';

export function ActorDisplay() {

    const [actorList, setActorList] = useState([]);
    const [actor, setActor] = useState(null);

    const fetchData = async (url, setter) => {
        const data = await getData(url);
        if (data) {
            setter(data);
        }
    };

    useEffect(
        () => {
            fetchData("http://localhost:8080/actors/", setActorList);
        },
        []
    );

    const cancelCallback = () => setActor(null);

    const deleteCallback = async (actor) => {
        await deleteData(`http://localhost:8080/actors/delete/${actor.actor_id}`);
        await fetchData("http://localhost:8080/actors/", setActorList);
        setActor(null);
    };

    const editCallback = (actor) => setActor(actor);

    const saveCallback = async (actor) => {
        await (actor.actor_id
            ? putData(
                `http://localhost:8080/actors/update/${actor.actor_id}`,
                {
                    actor_name: actor.actor_name
                }
            )
            : postData(`http://localhost:8080/actors/add/${actor.actor_name}`)
        );
        await fetchData("http://localhost:8080/actors/", setActorList);
        setActor(null);
    };

    const createCallback = () => setActor(
        {
            actor_id: 0,
            actor_name: ""
        }
    );

    if (actor) {
        return (
            <ActorEditor
                actor={actor}
                saveCallback={saveCallback}
                cancelCallback={cancelCallback}
            />
        );
    }
    else {
        return (
            <div className="m-2">
                <ActorTable
                    actorList={actorList}
                    editCallback={editCallback}
                    deleteCallback={deleteCallback}
                />
                <div className="text-center">
                    <button className="btn btn-primary m-1" onClick={createCallback}>
                        Neuer Schauspieler
                    </button>
                </div>
            </div>
        );
    }
}
