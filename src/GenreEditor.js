import React, { useState } from "react";

export function GenreEditor({ genre, saveCallback, cancelCallback }) {

    const [formData, setFormData] = useState({
        name: genre.genre_name,
    });

    const handleSave = (ev) => {
        const newGenre = {
            ...genre,
            genre_name: formData.name
        };
        saveCallback(newGenre);
    };

    const selectorChanged = (ev) => {
        let newFormData = { ...formData };
        const { name, value } = ev.target;
        switch (name) {
            default:
                newFormData[name] = value;
                break;
        }
        setFormData(newFormData);
    };

    return (
        <div className="m-2">
            <div className="form-group">
                <label>Genre</label>
                <h6 className="text-danger" key="name_err"
                    hidden={formData.name.length !== 0}>
                    Der Name des Genres darf nicht leer sein
                </h6>
                <input className="form-control" name="name"
                    value={formData.name}
                    onChange={selectorChanged}
                />
            </div>

            <div className="text-center">
                <button className="btn btn-primary m-1" onClick={handleSave}
                    disabled={formData.name.length === 0}
                >
                    Save
                </button>
                <button className="btn btn-secondary"
                    onClick={() => cancelCallback()}>
                    Cancel
                </button>
            </div>
        </div>
    );
}
