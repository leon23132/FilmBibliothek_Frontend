import React, { useState, useEffect } from "react";
import { GenreTable } from "./GenreTable"
import { GenreEditor } from "./GenreEditor";
import { deleteData, getData, postData, putData } from './Reqeusts';

export function GenreDisplay() {

    const [genreList, setGenreList] = useState([]);
    const [genre, setGenre] = useState(null);

    const fetchData = async (url, setter) => {
        const data = await getData(url);
        if (data) {
            setter(data);
        }
    };

    useEffect(
        () => {
            fetchData("http://localhost:8080/genres/", setGenreList);
        },
        []
    );

    const cancelCallback = () => setGenre(null);

    const deleteCallback = async (genre) => {
        await deleteData(`http://localhost:8080/genres/delete/${genre.genre_id}`);
        await fetchData("http://localhost:8080/genres/", setGenreList);
        setGenre(null);
    };

    const editCallback = (genre) => setGenre(genre);

    const saveCallback = async (genre) => {
        await (genre.genre_id
            ? putData(
                `http://localhost:8080/genres/update/${genre.genre_id}`,
                {
                    genre_name: genre.genre_name
                }
            )
            : postData(`http://localhost:8080/genres/add/${genre.genre_name}`)
        );
        await fetchData("http://localhost:8080/genres/", setGenreList);
        setGenre(null);
    };

    const createCallback = () => setGenre(
        {
            genre_id: 0,
            genre_name: ""
        }
    );

    if (genre) {
        return (
            <GenreEditor
                genre={genre}
                saveCallback={saveCallback}
                cancelCallback={cancelCallback}
            />
        );
    }
    else {
        return (
            <div className="m-2">
                <GenreTable
                    genreList={genreList}
                    editCallback={editCallback}
                    deleteCallback={deleteCallback}
                />
                <div className="text-center">
                    <button className="btn btn-primary m-1" onClick={createCallback}>
                        Neuer Genre
                    </button>
                </div>
            </div>
        );
    }
}
