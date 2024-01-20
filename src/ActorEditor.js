import React, { useState } from "react";

export function ActorEditor({ actor, saveCallback, cancelCallback }) {

    const [formData, setFormData] = useState({
        name: actor.actor_name,
    });

    const handleSave = (ev) => {
        const newActor = {
            ...actor,
            actor_name: formData.name
        };
        saveCallback(newActor);
    };

    const selectorChanged = (ev) => {
        const newFormData = { ...formData };
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
                <label>Name und Vorname</label>
                <h6 className="text-danger" key="name_err"
                    hidden={formData.name.length !== 0}>
                    Der Name des Schauspielers darf nicht leer sein
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
