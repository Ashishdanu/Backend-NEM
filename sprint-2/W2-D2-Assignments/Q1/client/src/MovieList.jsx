import React, { useState, useEffect } from 'react';

function MovieList() {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/movies')
            .then(response => response.json())
            .then(data => setMovies(data))
            .catch(error => console.error('Error fetching movies:', error));
    }, []);

    return (
        <div>
            <h1>Movie Listing</h1>
            <ul>
                {movies.map(movie => (
                    <li key={movie.id}>
                        {movie.title} ({movie.year}) - Directed by {movie.director}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default MovieList;
