import React, { useState, useEffect } from "react";
import { DirectorTable } from "./DirectorTable"
import { DirectorEditor } from "./DirectorEditor";
import { deleteData, getData, postData, putData } from './Reqeusts';

export function DirectorDisplay() {

    const [directorList, setDirectorList] = useState([]);
    const [director, setDirector] = useState(null);

    const fetchData = async (url, setter) => {
        const data = await getData(url);
        if (data) {
            setter(data);
        }
    };

    useEffect(
        () => {
            fetchData("http://localhost:8080/directors/", setDirectorList);
        },
        []
    );

    const cancelCallback = () => setDirector(null);

    const deleteCallback = async (director) => {
        await deleteData(`http://localhost:8080/directors/delete/${director.director_id}`);
        await fetchData("http://localhost:8080/directors/", setDirectorList);
        setDirector(null);
    };

    const editCallback = (director) => setDirector(director);

    const saveCallback = async (director) => {
        await (director.director_id
            ? putData(
                `http://localhost:8080/directors/update/${director.director_id}`,
                {
                    firstname: director.firstname,
                    lastname: director.lastname
                }
            )
            : postData(`http://localhost:8080/directors/add/${director.firstname},${director.lastname}`)
        );
        await fetchData("http://localhost:8080/directors/", setDirectorList);
        setDirector(null);
    };

    const createCallback = () => setDirector(
        {
            director_id: 0,
            firstname: "",
            lastname: ""
        }
    );

    if (director) {
        return (
            <DirectorEditor
                director={director}
                saveCallback={saveCallback}
                cancelCallback={cancelCallback}
            />
        );
    }
    else {
        return (
            <div className="m-2">
                <DirectorTable
                    directorList={directorList}
                    editCallback={editCallback}
                    deleteCallback={deleteCallback}
                />
                <div className="text-center">
                    <button className="btn btn-primary m-1" onClick={createCallback}>
                        Neuer Regisseur
                    </button>
                </div>
            </div>
        );
    }
}
