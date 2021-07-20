import React, { useContext } from 'react'
import { GlobalContext } from "../context/GlobalState";
import { Grid, TextField, Button, Typography } from "@material-ui/core";

const Moviecontrols = ({movie, type}) => {
    const {removeMovieFromWatchlist, addMovieToWatched, moveToWatchlist, removeFromWatched } = useContext(GlobalContext);

    return (
      <div className="inner-card-controls">
      {type === "watchlist" && (
        <>
          <Button 
            className="ctrl-btn" 
            onClick={() => addMovieToWatched(movie)}
          >
            <i className="fa fa-eye"></i>
          </Button>

          <Button
            className="ctrl-btn"
            onClick={() => removeMovieFromWatchlist(movie.id)}
          >
            <i className="fa-fw fa fa-times"></i>
          </Button>
        </>
      )}

      {type === "watched" && (
        <>
          <Button 
            className="ctrl-btn" 
            onClick={() => moveToWatchlist(movie)}
          >
            <i className="fa-fw far fa-eye-slash"></i>
          </Button>

          <Button
            className="ctrl-btn"
            onClick={() => removeFromWatched(movie.id)}
          >
            <i className="fa-fw fa fa-times"></i>
          </Button>
        </>
      )}
    </div>
    )
}

export default Moviecontrols;
