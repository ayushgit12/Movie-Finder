const API_KEY = 'api_key=aff98581fbcc8eff4609f1ab795c9a8f'
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;
const searchURL = BASE_URL+'/search/movie?'+API_KEY;
const IMAGE_URL = 'https://image.tmdb.org/t/p/w500'
const TV_Series_URL = BASE_URL+'/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc&'+API_KEY;
// https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=aff98581fbcc8eff4609f1ab795c9a8f

const main =document.querySelectorAll(".movie-list")

const form=document.getElementById('form')
const search = document.querySelector('.srch')

getMovies(API_URL)
function getMovies(url) {
    fetch(url).then(res => res.json()).then(data => {
        //  console.log(data.results);
        showMovies(data.results);
    })
}

function showMovies(data) {
    
    main[0].innerHTML=''

    data.forEach(movie => {
        const{title,poster_path,vote_average,overview} = movie
        const movieEl = document.createElement('div')
        movieEl.classList.add('movie-list-item')
        movieEl.innerHTML = `
        <img src="${IMAGE_URL+poster_path}" alt="" class="movie-list-item-img">
                            <span class="movie-list-item-title">${title}<span class="${getColor(vote_average)}">${vote_average}</span></span>
                            <p class="movie-list-item-desc">${overview}</p>
                            <button class="movie-list-item-button">WATCH</button>
                            `
        main[0].appendChild(movieEl)
    })
    

}

getTV(TV_Series_URL)
function getTV(url) {
    fetch(url).then(res => res.json()).then(data => {
         console.log(data.results);
        showTV(data.results);
    })
}

function showTV(data) {
    
    main[1].innerHTML=''

    data.forEach(movie => {
        const{name,poster_path,vote_average,overview} = movie
        const movieEl = document.createElement('div')
        movieEl.classList.add('movie-list-item')
        movieEl.innerHTML = `
        <img src="${IMAGE_URL+poster_path}" alt="" class="movie-list-item-img">
                            <span class="movie-list-item-title">${name} <span class="${getColor(vote_average)}">${vote_average}</span></span>
                            <p class="movie-list-item-desc">${overview}</p>
                            <button class="movie-list-item-button">WATCH</button>
                            `
        main[1].appendChild(movieEl)
    })
    

}

getMovies3(API_URL)
function getMovies3(url) {
    fetch(url).then(res => res.json()).then(data => {
        //  console.log(data.results);
        showMovies3(data.results);
    })
}

function showMovies3(data) {
    
    main[2].innerHTML=''

    for(let i=9; i<20; i++){
    // data.forEach(movie => {
        const{title,poster_path,vote_average,overview} = data[i]
        const movieEl = document.createElement('div')
        movieEl.classList.add('movie-list-item')
        movieEl.innerHTML = `
        <img src="${IMAGE_URL+poster_path}" alt="" class="movie-list-item-img">
                            <span class="movie-list-item-title">${title} <span class="${getColor(vote_average)}">${vote_average}</span></span>
                            <p class="movie-list-item-desc">${overview}</p>
                            <button class="movie-list-item-button">WATCH</button>
                            `
        main[2].appendChild(movieEl)
    // })
    }
    

}

getTV2(TV_Series_URL)
function getTV2(url) {
    fetch(url).then(res => res.json()).then(data => {
        //  console.log(data.results);
        showTV2(data.results);
    })
}

function showTV2(data) {
    
    main[3].innerHTML=''

    for(let i=9; i<20; i++){
    // data.forEach(movie => {
        const{name,poster_path,vote_average,overview} = data[i]
        const movieEl = document.createElement('div')
        movieEl.classList.add('movie-list-item')
        movieEl.innerHTML = `
        <img src="${IMAGE_URL+poster_path}" alt="" class="movie-list-item-img">
                            <span class="movie-list-item-title">${name} <span class="${getColor(vote_average)}">${vote_average}</span></span>
                            <p class="movie-list-item-desc">${overview}</p>
                            <button class="movie-list-item-button">WATCH</button>
                            `
        main[3].appendChild(movieEl)
    // })
    }
    

}


function getColor(vote){
    if(vote>=9){
        return 'green';
    }
    else if(vote>=7){
        return 'yellowgreen';
    }
    else if(vote>=4){
        return 'orange';
    }
    else{
        return 'red';
    }
}

form.addEventListener('submit',(e)=>{
    e.preventDefault()

    const searchTerm = search.value

    if(searchTerm){
        getMovies(searchURL+'&query='+searchTerm)
    }
})