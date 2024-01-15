// import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
// import { getDatabase, get, ref, child } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
// import { getAuth} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";



const API_KEY = 'api_key=aff98581fbcc8eff4609f1ab795c9a8f'
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;
const searchURL = BASE_URL + '/search/movie?' + API_KEY;
const IMAGE_URL = 'https://image.tmdb.org/t/p/w500'
const TV_Series_URL = BASE_URL + '/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc&' + API_KEY;
// https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=aff98581fbcc8eff4609f1ab795c9a8f
// https://api.themoviedb.org/3/genre/movie/list?api_key=aff98581fbcc8eff4609f1ab795c9a8f


const genres = [{ "id": 28, "name": "Action" }, { "id": 12, "name": "Adventure" }, { "id": 16, "name": "Animation" }, { "id": 35, "name": "Comedy" }, { "id": 80, "name": "Crime" }, { "id": 99, "name": "Documentary" }, { "id": 18, "name": "Drama" }, { "id": 10751, "name": "Family" }, { "id": 14, "name": "Fantasy" }, { "id": 36, "name": "History" }, { "id": 27, "name": "Horror" }, { "id": 10402, "name": "Music" }, { "id": 9648, "name": "Mystery" }, { "id": 10749, "name": "Romance" }, { "id": 878, "name": "Science Fiction" }, { "id": 10770, "name": "TV Movie" }, { "id": 53, "name": "Thriller" }, { "id": 10752, "name": "War" }, { "id": 37, "name": "Western" }]





const main = document.querySelectorAll(".movie-list")

const form = document.getElementById('form')
const search = document.querySelector('.srch')
const tagsEl = document.querySelector('.tags')
var selectedGenre = [];
var selectedGenreName = [];

setGenre()
function setGenre() {
    tagsEl.innerHTML = ''
    genres.forEach(genre => {
        const t = document.createElement('div');
        t.classList.add('tag');
        t.id = genre.id;
        t.innerText = genre.name
        t.addEventListener('click', () => {


            document.querySelector('.toph').style.display = 'none'
            document.querySelector('.top-slide').style.display = 'none'
            // document.getElementById('greet').style.display = 'none'
            if (selectedGenre.length == 0) {
                // document.getElementById('greet')=""
                selectedGenre.push(genre.id)
                selectedGenreName.push(genre.name)
                t.style.backgroundColor = 'yellowgreen'
                selectedGenreName.forEach(g => {
                    document.getElementById('greet').innerHTML = g
                })
            }
            else {
                if (selectedGenre.includes(genre.id)) {
                    selectedGenre.forEach((id, idx) => {
                        if (id == genre.id) {
                            selectedGenre.splice(idx, 1);
                            selectedGenreName.splice(idx, 1);
                            t.style.backgroundColor = '#f1f1f1'
                        }
                    })

                    if (selectedGenre.length == 0) {
                        document.querySelector('.toph').style.display = 'block'
                        document.querySelector('.top-slide').style.display = 'block'

                        document.getElementById('greet').innerHTML = ""
                        document.querySelector('.titletop').innerHTML = `<b>NEW RELEASES</b>`;
                    }

                }
                else {
                    selectedGenre.push(genre.id)
                    selectedGenreName.push(genre.name)
                    t.style.backgroundColor = 'yellowgreen'


                }

            }
            clearBtn()
            document.getElementById('greet').style.fontSize = '18px'
            document.getElementById('greet').innerHTML = selectedGenreName.join("&nbsp&nbsp&nbsp&nbsp&nbsp")
            if (selectedGenre.length !== 0)
                document.querySelector('.titletop').innerHTML = 'Search Results : ';

            // console.log(selectedGenreName)


            // console.log(selectedGenre)
            getMovies(API_URL + '&with_genres=' + encodeURI(selectedGenre.join(',')));
        })
        tagsEl.append(t);
    })

}


function clearBtn() {
    let clearBtn = document.getElementById("clear")
    if (clearBtn)
        return
    let clear = document.createElement('div');
    clear.classList.add('tag')
    clear.id = 'clear'
    clear.innerText = 'Clear All Filters X'
    tagsEl.append(clear)
    clear.addEventListener('click', () => {
        selectedGenre = []
        selectedGenreName = []
        setGenre()
        getMovies(API_URL)
        document.getElementById('greet').innerHTML = ''
        document.querySelector('.titletop').innerHTML = `<b>NEW RELEASES</b>`
        document.querySelector('.toph').style.display = 'block'
        document.querySelector('.top-slide').style.display = 'block'
    })

}


getMovies(API_URL)
function getMovies(url) {
    fetch(url).then(res => res.json()).then(data => {
        //  console.log(data.results);
        if (data.results.length !== 0) {
            // main[0].style.display='block'
            console.log(data)
            showMovies(data.results);

            if (data.results.length > 5)
                document.querySelector(".arrow").style.display = 'block'
            else
                document.querySelector(".arrow").style.display = 'none'

        }
        else {
            document.querySelector(".titletop").style.display = 'block'
            document.querySelector(".arrow").style.display = 'none'
            document.querySelector(".titletop").innerHTML = `<h1 class="nores">Psssshhh.... No results found! Closest results found : </h1><br><br>`

        }
    })
}


let watchLaterLs = new Set()
console.log(sessionStorage.getItem("watchLater"))
let s = sessionStorage.getItem("watchLater").split(',')
s.forEach(s1=>{
    watchLaterLs.add(s1)
})



function getMoviesWL(url) {
    fetch(url).then(res => res.json()).then(data => {
        
        // console.log(data.results);
	  if(watchLaterLs.has(data.results[0].title)){
        // console.log(data.results[0].id)    
            document.getElementById(`2${data.results[0].id}`).innerHTML = `<i class="fa-solid fa-plus watchL"></i>`
            document.getElementById(`2${data.results[0].id}`).style.backgroundColor='yellowgreen'
            watchLaterLs.delete(data.results[0].title)
        }
	else{
        document.getElementById(`2${data.results[0].id}`).innerHTML = `<i class="fa-solid fa-check watchL"></i>`
        document.getElementById(`2${data.results[0].id}`).style.backgroundColor='cyan'
        // document.querySelector(".watchLaterdesc").style.display="block"
      	watchLaterLs.add(data.results[0].title)
        }
    const c = Array.from(watchLaterLs).join(',')
    sessionStorage.setItem("WatchLater",(c))  
    console.log(c)
        // console.log(document.querySelector(".watchListNav"))

        
        
    }
        
    )
}
  

document.querySelector(".watchListNav").addEventListener('click',()=>{
    window.location.href='watchlist.html';
})





function showMovies(data) {

    main[0].innerHTML = ''

    data.forEach(movie => {
        const { title, poster_path, vote_average, id } = movie
        const movieEl = document.createElement('div')
        movieEl.classList.add('movie-list-item')
        movieEl.innerHTML = `
        <img src="${(poster_path) ? IMAGE_URL + poster_path : "images/noimg.webp"}" alt="" class="movie-list-item-img" style=" box-shadow: 12px 7px 7px rgb(16, 16, 16);">
                            <span class="movie-list-item-title">${title}</span><span class="${getColor(vote_average)}">${vote_average}</span>
                            <button class="movie-list-item-button">WATCH</button>
                            <button class="know-more" id=${id}>Know More</button>
                            <span class="watchLaterdesc">Add to Watch Later</span>
                            <button class="watchLater" id=2${movie.id}><i class="fa-solid fa-plus watchL"></i></button>
                            `
        main[0].appendChild(movieEl)
        // console.log(movie.id)

        document.getElementById(id).addEventListener('click', () => {
            // console.log(id)
            openNav(movie)
            // window.location.href = 'info.html'
        })

        // document.getElementById(`2${id}`).addEventListener('click',()=>{
        //     document.getElementById("watchLaterdesc").style.opacity='1';

        //     })
        document.getElementById(`2${id}`).addEventListener('click', () => {
            console.log(title);
            getMoviesWL(searchURL + '&query=' + title)


            }
        )




        })
    }





let movieImg = document.querySelectorAll(".movie-list-item-button")
// console.log(movieImg)
movieImg.forEach(mI => {
    // console.log(mI)
    mI.addEventListener('click', () => {
        window.location.href = 'info.html'
    }
    )
})



const similar1 = 'https://api.themoviedb.org/3/movie/'
const similar2 = '/similar?&api_key=aff98581fbcc8eff4609f1ab795c9a8f'
const genresOv = 'https://api.themoviedb.org/3/movie/'
const genresOv2 = '?language=en-US&' + API_KEY

const cast1 = 'https://api.themoviedb.org/3/movie/'
const cast2 = '/credits?&' + API_KEY

// https://api.themoviedb.org/3/movie/ /credits&api_key=aff98581fbcc8eff4609f1ab795c9a8f
/* Open when someone clicks on the span element */
function openNav(movie) {
    let id = movie.id



    fetch((genresOv + id + genresOv2)).then(res => res.json()).then(data => {
        fetch((cast1+id+cast2)).then(res=>res.json()).then(cast=>{
            // console.log(cast.cast)
            let casting = []
            cast.cast.forEach(c=>{
                casting.push(c.name)
            })
            // console.log(casting)
            
        // console.log(data.budget);
        // showTV(data.results);
        // console.log(data.genres)
        let genreOv = []
        data.genres.forEach(gen => {
            genreOv.push(gen.name)
        })
        console.log(genreOv)


        // console.log(movie)
        if (movie.origin_country && movie.release_date)
            document.getElementById("overlay-content").innerHTML = `<div class="origin-country" style="color:orange">Country of Origin: ${movie.origin_country}</div><h2 style="color:white; padding-bottom:10px">${movie.title}</h2><img src="${IMAGE_URL + movie.poster_path}" style="width:20vw;box-shadow: 12px 7px 7px black;"><h4 style="color: rgb(178, 212, 109); padding-top:20px ">Released on : ${movie.release_date}</h4><div style="font-size:17px;z-index:999; color: white; padding:35px 80px">${movie.overview}</div><div style="font-size:20px; color:black;background-color:yellowgreen;margin:0 60px;">${genreOv.join("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;")}</div><br><br><div style="color: gray; text-align:start; padding-left:80px ">Budget for the Film : &#36;${data.budget}</div><div style="color:white; margin:40px 70px">CAST : ${casting.toString()}</div><button class="watchlater-btn" style="padding:10px; border-radius:8px">ADD TO WATCH LATER</div>`

        else if (movie.origin_country)
            document.getElementById("overlay-content").innerHTML = `<div class="origin-country" style="color:orange">Country of Origin: ${movie.origin_country}</div><h2 style="color:white; padding-bottom:10px">${movie.title}</h2><img src="${IMAGE_URL + movie.poster_path}" style="width:20vw;box-shadow: 12px 7px 7px black;"><div style="font-size:17px;z-index:999; color: white; padding:35px 80px">${movie.overview}</div><div style="font-size:20px; color:black;background-color:yellowgreen;margin:0 60px;">${genreOv.join("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;")}</div><br><br><div style="color: gray; text-align:start; padding-left:80px ">Budget for the Film : &#36;${data.budget}</div><div style="color:white; margin:40px 70px">CAST : ${casting.toString()}</div><button class="watchlater-btn" style="padding:10px; border-radius:8px">ADD TO WATCH LATER</div>`

        else if (movie.release_date)
            document.getElementById("overlay-content").innerHTML = `<h2 style="color:white; padding-bottom:10px">${movie.title}</h2><img src="${IMAGE_URL + movie.poster_path}" style="width:20vw;box-shadow: 12px 7px 7px black;""><h4 style="color: rgb(178, 212, 109); padding-top:20px ">Released on : ${movie.release_date}</h4><div style="font-size:17px;z-index:999; color: white; padding:35px 80px">${movie.overview}</div><div style="font-size:20px; color:gray;background-color:yellowgreen; color:black; margin:0 60px; border-radius:6px">${genreOv.join("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;")}</div><br><br><div style="color: gray; text-align:start; padding-left:80px ">Budget for the Film : &#36;${data.budget}</div><div style="color:white; margin:40px 70px">CAST : ${casting.toString()}</div><button class="watchlater-btn" id=1${id} style="padding:10px; border-radius:8px">ADD TO WATCH LATER</div>`


        else
            document.getElementById("overlay-content").innerHTML = `<h2 style="color:white; padding-bottom:10px">${movie.title}</h2><img src="${IMAGE_URL + movie.poster_path}" style="width:20vw;box-shadow: 12px 7px 7px black;""><div style="font-size:17px;z-index:999; color: white; padding:35px 80px">${movie.overview}</div><div style="font-size:20px; color:black;background-color:yellowgreen; margin:0 60px;">${genreOv.join("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;")}</div><br><br><div style="color: gray; text-align:start; padding-left:80px ">Budget for the Film : &#36;${data.budget}</div><div style="color:white; margin:40px 70px">CAST : ${casting.toString()}</div><button class="watchlater-btn" style="padding:10px; border-radius:8px">ADD TO WATCH LATER</div>`

        // WATCH LATER
        let watchLat = document.getElementById(`1${movie.id}`)// BUTTON CAUGHT
        console.log(watchLat)

        watchLat.addEventListener('click', () => {
            console.log("1")
            watchLat.style.display = 'none'
        })


        fetch(BASE_URL + "/movie/" + id + '/videos?' + API_KEY).then(res => res.json()).then((videoData) => {
            if (videoData) {
                document.getElementById("overlay-content").innerHTML += `<br><br><br>`
                document.getElementById("myNav").style.width = "100%";
                if (videoData.results.length > 0) {
                    var emb = []
                    videoData.results.forEach(vid => {
                        let { name, key, site } = vid

                        if (site == 'YouTube')
                            emb.push(`<iframe width="560" height="315" src="https://www.youtube.com/embed/${key}" title="${name}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`);


                    })

                    document.getElementById("overlay-content").innerHTML += emb.join('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;')
                }
                else {
                    document.getElementById("overlay-content").innerHTML += ``;
                }
                // console.log(videoData)
            
            }
        })
        .catch((error) => {
            console.log("")
        })
            
    })
    }
    )
}


const genresOvTV = 'https://api.themoviedb.org/3/tv/'
const genresOvTV2 = '?language=en-US&' + API_KEY

const cast1TV = 'https://api.themoviedb.org/3/tv/'
const cast2TV = '/credits?&' + API_KEY

function openNavTV(movie) {
    let id = movie.id



    fetch((genresOvTV + id + genresOvTV2)).then(res => res.json()).then(data => {
        fetch((cast1TV+id+cast2TV)).then(res=>res.json()).then(cast=>{
        console.log(data);
        // showTV(data.results);
        // console.log(data.genres)
        let genreOv = []
        data.genres.forEach(gen => {
            genreOv.push(gen.name)
        })
        console.log(genreOv)

        let casting = []
            cast.cast.forEach(c=>{
                casting.push(c.name)
            })






        // console.log(movie)
        if (movie.origin_country && movie.release_date)
            document.getElementById("overlay-content").innerHTML = `<div class="origin-country" style="color:orange">Country of Origin: ${movie.origin_country}</div><h2 style="color:white; padding-bottom:10px">${movie.name}</h2><img src="${IMAGE_URL + movie.poster_path}" style="width:20vw;box-shadow: 12px 7px 7px black"><h4 style="color: rgb(178, 212, 109); ">Released on : ${movie.release_date}</h4><div style="font-size:17px;z-index:999; color: white; padding:35px 80px">${movie.overview}</div><div style="font-size:20px; color:black;background-color:yellowgreen;margin:0 60px; border-radius:6px ">${genreOv.join("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;")}</div><div style="color:white; margin:40px 70px">CAST : ${casting.toString()}</div><button class="watchlater-btn" style="padding:10px; border-radius:8px">ADD TO WATCH LATER</button>`

        else if (movie.origin_country)
            document.getElementById("overlay-content").innerHTML = `<div class="origin-country" style="color:orange">Country of Origin: ${movie.origin_country}</div><h2 style="color:white; padding-bottom:10px">${movie.name}</h2><img src="${IMAGE_URL + movie.poster_path}" style="width:20vw;box-shadow: 12px 7px 7px black"><div style="font-size:17px;z-index:999; color: white; padding:35px 80px">${movie.overview}</div><div style="font-size:20px; color:black;background-color:yellowgreen;margin:0 60px; border-radius:6px ">${genreOv.join("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;")}</div><div style="color:white; margin:40px 70px">CAST : ${casting.toString()}</div><button class="watchlater-btn" style="padding:10px; border-radius:8px; margin-top:20px">ADD TO WATCH LATER</div>`

        else if (movie.release_date)
            document.getElementById("overlay-content").innerHTML = `<h2 style="color:white; padding-bottom:10px">${movie.name}</h2><img src="${IMAGE_URL + movie.poster_path}" style="width:20vw;box-shadow: 12px 7px 7px black;"><h4 style="color: rgb(178, 212, 109); ">Released on : ${movie.release_date}</h4><div style="font-size:17px;z-index:999; color: white; padding:35px 80px">${movie.overview}</div><div style="font-size:20px; color:black;background-color:yellowgreen;margin:0 60px; border-radius:6px ">${genreOv.join("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;")}</div><div style="color:white; margin:40px 70px">CAST : ${casting.toString()}</div><button class="watchlater-btn" style="padding:10px; border-radius:8px">ADD TO WATCH LATER</button>`

        else
            document.getElementById("overlay-content").innerHTML = `<h2 style="color:white; padding-bottom:10px">${movie.name}</h2><img src="${IMAGE_URL + movie.poster_path}" style="width:20vw;box-shadow: 12px 7px 7px black"><div style="font-size:17px;z-index:999; color: white; padding:35px 80px">${movie.overview}</div><div style="font-size:20px; color:black;background-color:yellowgreen;margin:0 60px; border-radius:6px ">${genreOv.join("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;")}</div><div style="color:white; margin:40px 70px">CAST : ${casting.toString()}</div><button class="watchlater-btn" style="padding:10px; border-radius:8px">ADD TO WATCH LATER</button>`

        fetch(BASE_URL + "/tv/" + id + '/videos?' + API_KEY).then(res => res.json()).then((videoData) => {
            if (videoData) {
                document.getElementById("overlay-content").innerHTML += `<br><br><br>`
                document.getElementById("myNav").style.width = "100%";
                if (videoData.results.length > 0) {
                    var emb = []
                    videoData.results.forEach(vid => {
                        let { name, key, site } = vid

                        if (site == 'YouTube')
                            emb.push(`<iframe width="560" height="315" src="https://www.youtube.com/embed/${key}" title="${name}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`);


                    })

                    document.getElementById("overlay-content").innerHTML += emb.join('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;')
                }
                else {
                    document.getElementById("overlay-content").innerHTML += ``;
                }
                // console.log(videoData)
            }
        })
    })
})
}









/* Close when someone clicks on the "x" symbol inside the overlay */
function closeNav() {
    document.getElementById("myNav").style.width = "0%";
}




getTV(TV_Series_URL)
function getTV(url) {
    fetch(url).then(res => res.json()).then(data => {
        // console.log(data.results);
        showTV(data.results);
    })
}

function showTV(data) {

    main[1].innerHTML = ''

    data.forEach(movie => {
        const { name, poster_path, vote_average, id } = movie
        const movieEl = document.createElement('div')
        movieEl.classList.add('movie-list-item')
        movieEl.innerHTML = `
        <img src="${IMAGE_URL + poster_path}" alt="" class="movie-list-item-img" style=" box-shadow: 12px 7px 7px rgb(16, 16, 16);" >
                            <span class="movie-list-item-title">${name}</span><span class="${getColor(vote_average)}">${vote_average}</span>
                            <button class="movie-list-item-button">WATCH</button>
                            <button class="know-more" id=${id}>Know More</button>
                            `
        main[1].appendChild(movieEl)

        document.getElementById(id).addEventListener('click', () => {
            console.log(id)
            openNavTV(movie)
        })
    })


}

getMovies3(API_URL + "&page=2")
function getMovies3(url) {
    fetch(url).then(res => res.json()).then(data => {
        //  console.log(data.results);
        showMovies3(data.results);
    })
}

function showMovies3(data) {

    main[2].innerHTML = ''

    // for (let i = 9; i < 20; i++) {
    data.forEach(movie => {
        const { title, poster_path, vote_average, overview, id } = movie
        const movieEl = document.createElement('div')
        movieEl.classList.add('movie-list-item')
        movieEl.innerHTML = `
        <img src="${IMAGE_URL + poster_path}" alt="" class="movie-list-item-img" style=" box-shadow: 12px 7px 7px rgb(16, 16, 16);">
                            <span class="movie-list-item-title">${title} </span><span class="${getColor(vote_average)}">${vote_average}</span>
                            <button class="movie-list-item-button">WATCH</button>
                            <button class="know-more" id=${id}>Know More</button>
                            `
        main[2].appendChild(movieEl)
        // console.log(document.getElementById(id));
        // console.log(document.getElementById(id))
        document.getElementById(id).addEventListener('click', () => {
            openNav(movie)
        })

    })


}



getTV2(TV_Series_URL + '&page=2')
function getTV2(url) {
    fetch(url).then(res => res.json()).then(data => {
        //  console.log(data.results);
        showTV2(data.results);
    })
}

function showTV2(data) {

    main[3].innerHTML = ''

    // for (let i = 9; i < 20; i++) {
    data.forEach(movie => {
        const { name, poster_path, vote_average, overview, id } = movie
        const movieEl = document.createElement('div')
        movieEl.classList.add('movie-list-item')
        movieEl.innerHTML = `
        <img src="${IMAGE_URL + poster_path}" alt="images/nopic.jpeg" class="movie-list-item-img" style=" box-shadow: 12px 7px 7px rgb(16, 16, 16);">
                            <span class="movie-list-item-title">${name}</span> <span class="${getColor(vote_average)}">${vote_average}</span>
                            <button class="movie-list-item-button">WATCH</button>
                            <button class="know-more" id=${id}>Know More</button>
                            `
        main[3].appendChild(movieEl)

        document.getElementById(id).addEventListener('click', () => {
            console.log(id)
            openNavTV(movie)
        })
    })
}







getMovies4(BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY + '&with_genres=27');
function getMovies4(url) {
    fetch(url).then(res => res.json()).then(data => {
        //  console.log(data.results);
        showMovies4(data.results);
    })
}

function showMovies4(data) {

    main[4].innerHTML = ''


    data.forEach(movie => {
        const { title, poster_path, vote_average, overview, id } = movie
        const movieEl = document.createElement('div')
        movieEl.classList.add('movie-list-item')
        movieEl.innerHTML = `
        <img src="${IMAGE_URL + poster_path}" alt="" class="movie-list-item-img" style=" box-shadow: 12px 7px 7px rgb(16, 16, 16);">
                            <span class="movie-list-item-title">${title} </span><span class="${getColor(vote_average)}">${vote_average}</span>
                            <button class="movie-list-item-button">WATCH</button>
                            <button class="know-more" id=${id}>Know More</button>
                            `
        main[4].appendChild(movieEl)
        // console.log(document.getElementById(id));
        document.getElementById(id).addEventListener('click', () => {
            console.log(document.getElementById(id))
            openNav(movie)
        })

    })
}




function getColor(vote) {
    if (vote >= 9) {
        return 'green';
    }
    else if (vote >= 7) {
        return 'yellowgreen';
    }
    else if (vote >= 4) {
        return 'orange';
    }
    else {
        return 'red';
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault()

    document.querySelector('.toph').style.display = 'none'
    document.querySelector('.top-slide').style.display = 'none'
    document.getElementById('greet').style.display = 'none'
    const searchTerm = search.value
    console.log(searchTerm)


    document.querySelector('.titletop').innerHTML = 'Search Results for "' + searchTerm + '"';


    if (searchTerm) {
        getMovies(searchURL + '&query=' + searchTerm)
        // console.log(getMovies(searchURL+'&query='+searchTerm))
    }
    document.querySelector('.title2').innerHTML = 'Some other related Results:';
})



