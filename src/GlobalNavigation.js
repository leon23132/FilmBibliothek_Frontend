import React from "react";
import { BrowserRouter as Router, Route, Routes, NavLink, Navigate } from "react-router-dom";
import { ActorDisplay } from "./ActorDisplay";
import { DirectorDisplay } from "./DirectorDisplay";
import { FilmDisplay } from "./FilmDisplay";
import { GenreDisplay } from "./GenreDisplay";
import { ProducerDisplay } from "./ProducerDisplay";
import Home from "./Home";

export function GlobalNavigation() {

    return (
        <Router>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-2">
                        <NavLink className="m-2 btn btn-block btn-primary" activeClassName="active"
                            to="/home">Home</NavLink>
                        <NavLink className="m-2 btn btn-block btn-primary" activeClassName="active"
                            to="/films">Filme</NavLink>
                        <NavLink className="m-2 btn btn-block btn-primary" activeClassName="active"
                            to="/directors">Regisseure</NavLink>
                        <NavLink className="m-2 btn btn-block btn-primary" activeClassName="active"
                            to="/producers">Produzenten</NavLink>
                        <NavLink className="m-2 btn btn-block btn-primary" activeClassName="active"
                            to="/actors">Schauspieler</NavLink>
                        <NavLink className="m-2 btn btn-block btn-primary" activeClassName="active"
                            to="/genres">Genres</NavLink>
                    </div>
                    <div className="col">
                        <Routes>
                            <Route path="/home" element={<Home />} />
                            <Route path="/actors" element={<ActorDisplay />} />
                            <Route path="/directors" element={<DirectorDisplay />} />
                            <Route path="/films" element={<FilmDisplay />} />
                            <Route path="/genres" element={<GenreDisplay />} />
                            <Route path="/producers" element={<ProducerDisplay />} />
                            <Route path="/" element={() => <Navigate to="/films" />} />
                        </Routes>
                    </div>
                </div>
            </div>
        </Router>
    );
}
