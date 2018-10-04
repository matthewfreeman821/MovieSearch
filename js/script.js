$(document).ready(() => {
    $('#searchForm').on('submit', (e) => {
        let searchText = $('#searchText').val();
        getMovies(searchText);
        e.preventDefault();
    })
});

function getMovies(searchText) {
    axios.get('http://www.omdbapi.com/?i=tt3896198&apikey=4e37285d&s=' + searchText)
        .then((response) => {
            console.log(response);
            let movies = response.data.Search;
            let output = '';
            $.each(movies, (index, movie) => {
                output += `
                    <div class ="col-md-3">
                        <div class="well text-center">
                            <img src="${movie.Poster}">
                            <h5>${movie.Title}</h5>
                            <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="#">Movie Details</a>
                        </div>
                    </div>
                `;
            });
            $('#movies').html(output);
        });
}

function movieSelected(id){
    var movieId = 'movieId';
    sessionStorage.setItem(movieId, id);//Issue is somewhere here, not storing as key value pair, only storing id in sessionStorage
    window.location = 'movie.html';
    return true;
};

function getMovie() {
    let imdbId = sessionStorage.getItem('movieId');
    axios.get('http://www.omdbapi.com/?i=tt3896198&apikey=4e37285d&i=' + imdbId)
        .then((response) => {
            console.log(response);
            let movie = response.data;
            let output = `
                <div class="row">
                    <div class="col-md-4">
                        <img src="${movie.poster}" class="thumbnail">
                    </div>
                    <div class="col-md-8">
                        <h2>${movie.Title}</h2>
                        <ul class="list-group">
                            <li class="list-group-item"><strong>Genre:</strong> ${movie.Genre}</li>
                            <li class="list-group-item"><strong>Released:</strong> ${movie.Released}</li>
                            <li class="list-group-item"><strong>Rated:</strong> ${movie.Rated}</li>
                            <li class="list-group-item"><strong>IMDB Rating:</strong> ${movie.imdbRating}</li>
                            <li class="list-group-item"><strong>Director:</strong> ${movie.Director}</li>
                            <li class="list-group-item"><strong>Writer:</strong> ${movie.Writer}</li>
                            <li class="list-group-item"><strong>Actors:</strong> ${movie.Actors}</li>
                        </ul>
                    </div>
                </div>
                <div class="row">
                    <div class="well">
                        <h3>Plot</h3>
                        ${movie.Plot}
                        <hr>
                        <a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary">View IMDB</a>
                        <a href="index.html" class="btn btn-default">Back to Search</a>
                    </div>
                </div>

            `;
            $('#movie').html(output);
        });
}