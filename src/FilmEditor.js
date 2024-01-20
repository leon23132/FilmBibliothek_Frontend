import React, { useState, useEffect } from "react";

export function FilmEditor({ film, directorList, producerList, genreList, actorList, saveCallback, cancelCallback }) {

    const [formData, setFormData] = useState({
        title: film.title,
        director: film.director?.director_id || 0,
        producer: film.producer?.producer_id || 0,
        releaseDate: "",
        genre: film.genre?.genre_id || 0,
        actors: film.actors.map(actor => actor.actor_id)
    });

    useEffect(() => {
        if (film.releaseDate) {
            const formattedDate = new Date(film.releaseDate).toISOString().split('T')[0];
            setFormData(prevData => ({
                ...prevData,
                releaseDate: formattedDate
            }));
        }
    }, [film.releaseDate]);


    const handleSave = (ev) => {
        const newFilm = {
            ...film,
            title: formData.title,
            director: directorList.find(director => director.director_id === formData.director) || 0,
            producer: producerList.find(producer => producer.producer_id === formData.producer) || 0,
            genre: genreList.find(genre => genre.genre_id === formData.genre) || 0,
            actors: actorList.filter(actor => formData.actors.includes(actor.actor_id)),
            releaseDate: formData.releaseDate.split("-").map(Number)
        };
        saveCallback(newFilm);
    };

    const selectorChanged = (ev) => {
        const newFormData = { ...formData };
        const { name, value } = ev.target;
        switch (name) {
            case "director":
            case "producer":
            case "genre":
                newFormData[name] = Number.parseInt(value);
                break;
            case "actors":
                newFormData[name] = Array.from(ev.target)
                    .filter(target => target.selected)
                    .map(target => Number.parseInt(target.value), 10);
                break;
            case "releaseDate":
                newFormData[name] = value;
                break;
            default:
                newFormData[name] = value;
                break;
        }
        setFormData(newFormData);
    };

    return (
        <div className="m-2">
            <div className="form-group">
                <label>Titel</label>
                <h6 className="text-danger" key="title_err"
                    hidden={formData.title.length !== 0}>
                    Der titel darf nicht leer sein
                </h6>
                <input className="form-control" name="title"
                    value={formData.title}
                    onChange={selectorChanged} />
            </div>
            <div className="form-group">
                <label>Regisseur</label>
                <select className="form-control" name="director" type="text" onChange={selectorChanged}>
                    {directorList?.map(director =>
                        <option key={director.director_id}
                            value={director.director_id}
                            selected={director.director_id === formData.director}
                        >
                            {director.firstname + " " + director.lastname}
                        </option>
                    )}
                </select>
            </div>
            <div className="form-group">
                <label>Produzent</label>
                <select className="form-control" name="producer" onChange={selectorChanged}>
                    {producerList?.map(producer =>
                        <option key={producer.producer_id}
                            value={producer.producer_id}
                            selected={producer.producer_id === formData.producer}
                        >
                            {producer.firstname + " " + producer.lastname}
                        </option>
                    )}
                </select>
            </div>
            <div className="form-group">
                <label>Datum</label>
                <input className="form-control" name="releaseDate"
                    value={formData.releaseDate}
                    onChange={selectorChanged}
                    type="date"
                />
            </div>
            <div className="form-group">
                <label>Genre</label>
                <select className="form-control" name="genre" onChange={selectorChanged}>
                    {genreList?.map(genre =>
                        <option key={genre.genre_id}
                            value={genre.genre_id}
                            selected={genre.genre_id === formData.genre}
                        >
                            {genre.genre_name}
                        </option>
                    )}
                </select>
            </div>
            <div className="form-group">
                <label>Schauspieler</label>
                <h6 className="text-danger" key="title_err" hidden={formData.actors.length !== 0}>
                    Sie m&uuml;ssen mindestens einen Schauspieler ausw&auml;hlen
                </h6>
                <select className="form-control" name="actors" multiple onChange={selectorChanged}>
                    {actorList?.map(actor =>
                        <option key={actor.actor_id}
                            value={actor.actor_id}
                            selected={formData.actors.includes(actor.actor_id)}
                        >
                            {actor.actor_name}
                        </option>
                    )}
                </select>
            </div>

            <div className="text-center">
                <button id="save" className="btn btn-primary m-1" onClick={handleSave}
                    disabled={formData.title.length === 0 || formData.actors.length === 0}
                >
                    Save
                </button>
                <button className="btn btn-secondary" onClick={() => cancelCallback()}>
                    Cancel
                </button>
            </div>
        </div>
    );
}
