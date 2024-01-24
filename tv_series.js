const API_KEY = 'api_key=aff98581fbcc8eff4609f1ab795c9a8f'
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;
const searchURL = BASE_URL + '/search/movie?' + API_KEY;
const IMAGE_URL = 'https://image.tmdb.org/t/p/w500'
const TV_Series_URL = BASE_URL + '/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc&' + API_KEY;
// https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=aff98581fbcc8eff4609f1ab795c9a8f
// https://api.themoviedb.org/3/genre/movie/list?api_key=aff98581fbcc8eff4609f1ab795c9a8f
// https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc&api_key=aff98581fbcc8eff4609f1ab795c9a8f&page=2

const genres = [{ "id": 28, "name": "Action" }, { "id": 12, "name": "Adventure" }, { "id": 16, "name": "Animation" }, { "id": 35, "name": "Comedy" }, { "id": 80, "name": "Crime" }, { "id": 99, "name": "Documentary" }, { "id": 18, "name": "Drama" }, { "id": 10751, "name": "Family" }, { "id": 14, "name": "Fantasy" }, { "id": 36, "name": "History" }, { "id": 27, "name": "Horror" }, { "id": 10402, "name": "Music" }, { "id": 9648, "name": "Mystery" }, { "id": 10749, "name": "Romance" }, { "id": 878, "name": "Science Fiction" }, { "id": 10770, "name": "TV Movie" }, { "id": 53, "name": "Thriller" }, { "id": 10752, "name": "War" }, { "id": 37, "name": "Western" }]





const main = document.querySelectorAll(".movie-list")

const form = document.getElementById('form')
const search = document.querySelector('.srch')
const tagsEl = document.querySelector('.tags')



getMovies(TV_Series_URL + '&page=171')
function getMovies(url) {
    fetch(url).then(res => res.json()).then(data => {
        //  console.log(data.results);
        if (data.results.length !== 0) {
            // main[0].style.display='block'
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




function getTVwl(url) {
    fetch(url).then(res => res.json()).then(data => {
        console.log(data);



        if (watchLaterLsTV.has(data.results[0].name)) {
            // console.log(data.results[0].id)    
            document.getElementById(`2${data.results[0].id}`).innerHTML = `<i class="fa-solid fa-plus watchL"></i>`
            document.getElementById(`2${data.results[0].id}`).style.backgroundColor = 'yellowgreen'
            watchLaterLsTV.delete(data.results[0].name)

        }
        else {
            document.getElementById(`2${data.results[0].id}`).innerHTML = `<i class="fa-solid fa-check watchL"></i>`
            document.getElementById(`2${data.results[0].id}`).style.backgroundColor = 'white'
            // document.querySelector(".watchLaterdesc").style.display="block"
            watchLaterLsTV.add(data.results[0].name)
        }
        const c = Array.from(watchLaterLsTV).join(',')
        sessionStorage.setItem("watchLaterTV", (c))
        console.log(c)
    })
}




let s = []
let watchLaterLsTV = new Set()
if (sessionStorage.getItem("watchLaterTV")) {
    console.log(sessionStorage.getItem("watchLaterTV"))
    s = sessionStorage.getItem("watchLaterTV").split(',')
    s.forEach(s1 => {
        watchLaterLsTV.add(s1)
    })
}




function showMovies(data) {

    main[0].innerHTML = ''

    data.forEach(movie => {
        const { name, poster_path, backdrop_path, vote_average, id } = movie
        const movieEl = document.createElement('div')
        movieEl.classList.add('movie-list-item')


        if (watchLaterLsTV.has(name)) {
            // console.log(title)
            // console.log(data.results[0].id)
            movieEl.innerHTML = `
                            <img src="${(backdrop_path) ? IMAGE_URL + backdrop_path : "images/noimg.webp"}" alt="" class="movie-list-item-img" style=" box-shadow: 12px 7px 7px rgb(16, 16, 16);">
                                                <span class="movie-list-item-title">${name}</span><span class="${getColor(vote_average)}">${(Math.floor(vote_average * 10)) / 10}</span>
                                                <button class="movie-list-item-button">WATCH</button>
                                                <button class="know-more" id=${id}>Know More</button>
                                                <span class="watchLaterdesc">Add to Watch Later</span>
                                                <button class="watchLater" id=2${movie.id} style="background-color:pink"><i class="fa-solid fa-check watchL"></i></button>
                                                `

        }
        else {
            // document.getElementById(`2${movie.id}`).innerHTML = `<i class="fa-solid fa-check watchL"></i>`
            // document.getElementById(`2${movie.id}`).style.backgroundColor='white'
            movieEl.innerHTML = `
                                <img src="${(backdrop_path) ? IMAGE_URL + backdrop_path : "images/noimg.webp"}" alt="" class="movie-list-item-img" style=" box-shadow: 12px 7px 7px rgb(16, 16, 16);">
                                                    <span class="movie-list-item-title">${name}</span><span class="${getColor(vote_average)}">${(Math.floor(vote_average * 10)) / 10}</span>
                                                    <button class="movie-list-item-button">WATCH</button>
                                                    <button class="know-more" id=${id}>Know More</button>
                                                    <span class="watchLaterdesc">Add to Watch Later</span>
                                                    <button class="watchLater" id=2${movie.id}><i class="fa-solid fa-plus watchL"></i></button>
                                                    `
            // document.querySelector(".watchLaterdesc").style.display="block"
            // watchLaterLsTV.add(data.results[0].title)
        }

        main[0].appendChild(movieEl)

        document.getElementById(id).addEventListener('click', () => {
            console.log(id)
            openNavTV(movie)
        })

        document.getElementById(`2${id}`).addEventListener('click', () => {
            console.log(name);
            // watchLaterLsTV.add(title)
            // sessionStorage.setItem("WatchLater",(watchLaterLsTV))  
            getTVwl('https://api.themoviedb.org/3/search/tv?' + '&query=' + name + '&' + API_KEY)


        }
        )
    })


}




/* Open when someone clicks on the span element */


const genresOvTV = 'https://api.themoviedb.org/3/tv/'
const genresOvTV2 = '?language=en-US&' + API_KEY



const trans1TV = 'https://api.themoviedb.org/3/tv/'
const trans2TV = '/translations?&' + API_KEY



const cast1TV = 'https://api.themoviedb.org/3/tv/'
const cast2TV = '/credits?&' + API_KEY


const ss1TV = 'https://api.themoviedb.org/3/tv/'
const ss2TV = '/images?&api_key=aff98581fbcc8eff4609f1ab795c9a8f'
function openNavTV(movie) {
    let id = movie.id
    // console.log(id)



    fetch((genresOvTV + id + genresOvTV2)).then(res => res.json()).then(data => {
        fetch((cast1TV + id + cast2TV)).then(res => res.json()).then(cast => {
            fetch((trans1TV + id + trans2TV)).then(res => res.json()).then(transl => {
                fetch((ss1TV + id + ss2TV)).then(res => res.json()).then(ss => {



                    let screenshots = []
                    // console.log(ss)
                    ss.backdrops.forEach(ssI => {
                        screenshots.push(ssI.file_path)
                    })
                    console.log(data);
                    // showTV(data.results);
                    // console.log(data.genres)
                    let genreOv = []
                    data.genres.forEach(gen => {
                        genreOv.push(gen.name)
                    })
                    console.log(genreOv)
                    let castingImg = []
                    let casting = []
                    cast.cast.forEach(c => {
                        console.log(c)
                        casting.push(c.name)
                        castingImg.push(c.profile_path)
                    })
                    let transLang = []
                    console.log(transl)
                    transl.translations.forEach(tr => {
                        transLang.push(tr.english_name)
                    })


                    // console.log(movie)
                    if (movie.origin_country && movie.release_date)
                        document.getElementById("overlay-content").innerHTML = `<div class="origin-country" style="color:orange">Country of Origin: ${movie.origin_country}</div><h2 style="color:white; padding-bottom:10px">${movie.name}</h2><img src="${IMAGE_URL + movie.poster_path}" style="width:20vw"><h4 style="color: rgb(178, 212, 109); ">Released on : ${movie.release_date}</h4><div style="font-size:17px;z-index:999; color: gray; padding:35px 80px">${movie.overview}</div><div style="font-size:20px; color:black;background-color:yellowgreen;margin:0 60px; border-radius:6px  ">${genreOv.join("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;")}</div><div style="color:white; margin: 40px 70px; background-color: rgb(30, 30, 30); padding:16px 10px; border-radius:8px">Languages available : <br> ${transLang.join(' , ')}</div>`

                    else if (movie.origin_country)
                        document.getElementById("overlay-content").innerHTML = `<div class="origin-country" style="color:orange">Country of Origin: ${movie.origin_country}</div><h2 style="color:white; padding-bottom:10px">${movie.name}</h2><img src="${IMAGE_URL + movie.poster_path}" style="width:20vw"><div style="font-size:17px;z-index:999; color: white; padding:35px 80px">${movie.overview}</div><div style="font-size:20px; color:black;background-color:yellowgreen; margin:0 60px; border-radius:6px ">${genreOv.join("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;")}</div><div style="color:white; margin: 40px 70px; background-color: rgb(30, 30, 30); padding:16px 10px; border-radius:8px">Languages available : <br> ${transLang.join(' , ')}</div><div style="color:white">RATE HERE :<br> <span><i class="fa-solid fa-star"  id="a" style="color: white; font-size:30px"></i> </span><span><i class="fa-solid fa-star"  id="b" style="color: white;font-size:30px"></i> </span><span><i class="fa-solid fa-star" id="c" style="color: white;font-size:30px"></i> </span><span><i class="fa-solid fa-star"  id="d"style="color: white;font-size:30px"></i> </span><span><i class="fa-solid fa-star"  id="e" style="color: white;font-size:30px"></i></span><br><div id="review" style="color:white"></div><br>`

                    else if (movie.release_date)
                        document.getElementById("overlay-content").innerHTML = `<h2 style="color:white; padding-bottom:10px">${movie.name}</h2><img src="${IMAGE_URL + movie.poster_path}" style="width:20vw"><h4 style="color: rgb(178, 212, 109); ">Released on : ${movie.release_date}</h4><div style="font-size:17px;z-index:999; color: gray; padding:35px 80px">${movie.overview}</div><div style="font-size:20px; color:black;background-color:yellowgreen; margin:0 60px; border-radius:6px ">${genreOv.join("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;")}</div><div style="color:white; margin: 40px 70px; background-color: rgb(30, 30, 30); padding:16px 10px; border-radius:8px">Languages available : <br> ${transLang.join(' , ')}</div>`

                    else
                        document.getElementById("overlay-content").innerHTML = `<h2 style="color:white; padding-bottom:10px">${movie.name}</h2><img src="${IMAGE_URL + movie.poster_path}" style="width:20vw"><div style="font-size:17px;z-index:999; color: gray; padding:35px 80px">${movie.overview}</div><div style="font-size:20px; color:black;background-color:yellowgreen; margin:0 60px; border-radius:6px ">${genreOv.join("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;")}</div><div style="color:white; margin: 40px 70px; background-color: rgb(30, 30, 30); padding:16px 10px; border-radius:8px">Languages available : <br> ${transLang.join(' , ')}</div>`

                    if (castingImg) {
                        var div = document.createElement("div");
                        // div.style.width = "100px";
                        div.style.height = "250px";
                        div.style.display = "flex";
                        if (casting.length < 15)
                            div.style.justifyContent = 'center';
                        div.style.overflow = "scroll";
                        document.getElementById("overlay-content").innerHTML += '<p style="color:white; font-size:22px">CAST</p>'
                        document.getElementById("overlay-content").appendChild(div)

                        console.log(castingImg)
                        if (screenshots.length !== 0) {
                            var div = document.createElement("div");
                            // div.style.width = "100px";
                            div.style.height = "150px";
                            div.style.display = "flex";
                            if (screenshots.length < 15)
                                div.style.justifyContent = 'center';
                            div.style.overflow = "scroll";
                            document.getElementById("overlay-content").innerHTML += '<p style="color:white; font-size:22px">SOME SCREENSHOTS : </p>'
                            document.getElementById("overlay-content").appendChild(div)

                            for (let i = 0; i <= screenshots.length; i++) {
                                if (castingImg[i])
                                    div.innerHTML += `<div style="padding:10px; color:white; width:180px"><img style="width:150px" height="120px" src="${IMAGE_URL + screenshots[i]}"></div>`;

                            }
                        }
                        document.getElementById("overlay-content").innerHTML += `<br><br>`

                        if (casting.length !== 0) {

                            for (let i = 0; i <= casting.length; i++) {
                                if (castingImg[i])
                                    div.innerHTML += `<div style="padding:10px;width:110px; color:white"><img style="width:100px" src="${IMAGE_URL + castingImg[i]}">${casting[i]}</div>`;

                            }
                        }

                    }


                    document.getElementById(`a`).addEventListener('click', () => {
                        if (document.getElementById(`a`).style.color == 'red') {
                            document.getElementById(`a`).style.color = 'white'
                            document.getElementById(`b`).style.color = 'white'
                            document.getElementById(`c`).style.color = 'white'
                            document.getElementById(`d`).style.color = 'white'
                            document.getElementById(`e`).style.color = 'white'
                            sessionStorage.setItem("rating", "0");
                            document.getElementById(`a`).style.cursor = 'pointer'
                            document.getElementById('review').innerText = ''


                        }
                        else {
                            document.getElementById(`a`).style.color = 'red'
                            document.getElementById(`b`).style.color = 'white'
                            document.getElementById(`c`).style.color = 'white'
                            document.getElementById(`d`).style.color = 'white'
                            document.getElementById(`e`).style.color = 'white'
                            document.getElementById(`a`).style.cursor = 'pointer'
                            sessionStorage.setItem("rating", "1");
                            document.getElementById('review').innerText = 'I hate it'

                        }
                    })
                    // document.getElementById(`a`).addEventListener('mouseout', () => {
                    //     document.getElementById(`a`).style.color = 'white'
                    // })
                    document.getElementById(`b`).addEventListener('click', () => {

                        if (document.getElementById(`b`).style.color == 'orange') {
                            document.getElementById(`a`).style.color = 'white'
                            document.getElementById(`b`).style.color = 'white'
                            document.getElementById(`c`).style.color = 'white'
                            document.getElementById(`d`).style.color = 'white'
                            document.getElementById(`e`).style.color = 'white'
                            document.getElementById(`a`).style.cursor = 'pointer'
                            sessionStorage.setItem("rating", "0");
                            document.getElementById('review').innerText = ''


                        }
                        else {
                            document.getElementById(`a`).style.color = 'orange'
                            document.getElementById(`a`).style.cursor = 'pointer'
                            document.getElementById(`b`).style.color = 'orange'
                            document.getElementById(`b`).style.cursor = 'pointer'
                            document.getElementById(`c`).style.color = 'white'
                            document.getElementById(`d`).style.color = 'white'
                            document.getElementById(`e`).style.color = 'white'
                            sessionStorage.setItem("rating", "2");
                            document.getElementById('review').innerText = "It's Okayish"
                        }
                    })
                    // document.getElementById(`b`).addEventListener('mouseout', () => {
                    //     document.getElementById(`a`).style.color = 'white'
                    //     document.getElementById(`b`).style.color = 'white'
                    // })
                    document.getElementById(`c`).addEventListener('click', () => {


                        if (document.getElementById(`c`).style.color == 'yellow') {
                            document.getElementById(`a`).style.color = 'white'
                            document.getElementById(`b`).style.color = 'white'
                            document.getElementById(`c`).style.color = 'white'
                            document.getElementById(`d`).style.color = 'white'
                            document.getElementById(`e`).style.color = 'white'
                            document.getElementById(`a`).style.cursor = 'pointer'
                            sessionStorage.setItem("rating", "0");
                            document.getElementById('review').innerText = ''

                        }
                        else {
                            document.getElementById(`a`).style.color = 'yellow'
                            document.getElementById(`b`).style.color = 'yellow'
                            document.getElementById(`c`).style.color = 'yellow'
                            document.getElementById(`a`).style.cursor = 'pointer'
                            document.getElementById(`b`).style.cursor = 'pointer'
                            document.getElementById(`c`).style.cursor = 'pointer'
                            document.getElementById(`d`).style.color = 'white'
                            document.getElementById(`e`).style.color = 'white'
                            sessionStorage.setItem("rating", "3");
                            document.getElementById('review').innerText = 'I like it !'
                        }
                    })
                    // document.getElementById(`c`).addEventListener('mouseout', () => {
                    //     document.getElementById(`a`).style.color = 'white'
                    //     document.getElementById(`b`).style.color = 'white'
                    //     document.getElementById(`c`).style.color = 'white'
                    // })
                    document.getElementById(`d`).addEventListener('click', () => {

                        if (document.getElementById(`d`).style.color == 'yellowgreen') {
                            document.getElementById(`a`).style.color = 'white'
                            document.getElementById(`b`).style.color = 'white'
                            document.getElementById(`c`).style.color = 'white'
                            document.getElementById(`d`).style.color = 'white'
                            document.getElementById(`e`).style.color = 'white'
                            document.getElementById(`a`).style.cursor = 'pointer'
                            sessionStorage.setItem("rating", "0");
                            document.getElementById('review').innerText = ''

                        }
                        else {
                            document.getElementById(`a`).style.color = 'yellowgreen'
                            document.getElementById(`b`).style.color = 'yellowgreen'
                            document.getElementById(`c`).style.color = 'yellowgreen'
                            document.getElementById(`d`).style.color = 'yellowgreen'
                            document.getElementById(`a`).style.cursor = 'pointer'
                            document.getElementById(`b`).style.cursor = 'pointer'
                            document.getElementById(`c`).style.cursor = 'pointer'
                            document.getElementById(`d`).style.cursor = 'pointer'
                            document.getElementById(`e`).style.color = 'white'
                            sessionStorage.setItem("rating", "4");
                            document.getElementById('review').innerText = 'I love It !'
                        }
                    })
                    // document.getElementById(`d`).addEventListener('mouseout', () => {
                    //     document.getElementById(`a`).style.color = 'white'
                    //     document.getElementById(`b`).style.color = 'white'
                    //     document.getElementById(`c`).style.color = 'white'
                    //     document.getElementById(`d`).style.color = 'white'
                    // })
                    document.getElementById(`e`).addEventListener('click', () => {


                        if (document.getElementById(`e`).style.color = 'green') {
                            document.getElementById(`a`).style.color = 'white'
                            document.getElementById(`b`).style.color = 'white'
                            document.getElementById(`c`).style.color = 'white'
                            document.getElementById(`d`).style.color = 'white'
                            document.getElementById(`e`).style.color = 'white'
                            document.getElementById(`a`).style.cursor = 'pointer'
                            sessionStorage.setItem("rating", "0");
                            document.getElementById('review').innerText = ''

                        }
                        else {
                            document.getElementById(`a`).style.color = 'green'
                            document.getElementById(`b`).style.color = 'green'
                            document.getElementById(`c`).style.color = 'green'
                            document.getElementById(`d`).style.color = 'green'
                            document.getElementById(`e`).style.color = 'green'
                            document.getElementById(`a`).style.cursor = 'pointer'
                            document.getElementById(`b`).style.cursor = 'pointer'
                            document.getElementById(`c`).style.cursor = 'pointer'
                            document.getElementById(`d`).style.cursor = 'pointer'
                            document.getElementById(`e`).style.cursor = 'pointer'
                            sessionStorage.setItem("rating", "5");
                            document.getElementById('review').innerText = 'Absolutely Loved It !'
                        }
                    })

                    // document.getElementById(`e`).addEventListener('mouseout', () => {
                    //     document.getElementById(`a`).style.color = 'white'
                    //     document.getElementById(`b`).style.color = 'white'
                    //     document.getElementById(`c`).style.color = 'white'
                    //     document.getElementById(`d`).style.color = 'white'
                    //     document.getElementById(`e`).style.color = 'white'
                    // })



                    // document.getElementById(`greet`).addEventListener('mouseout', () => {
                    //     document.getElementById(`a`).style.color = 'white'
                    //     document.getElementById(`b`).style.color = 'white'
                    //     document.getElementById(`c`).style.color = 'white'
                    //     document.getElementById(`d`).style.color = 'white'
                    //     document.getElementById(`e`).style.color = 'white'
                    // })



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
        })
    })
}











/* Close when someone clicks on the "x" symbol inside the overlay */
function closeNav() {

    document.getElementById("myNav").style.width = "0%";
}




getTV(TV_Series_URL + '&with_genres=16')
function getTV(url) {
    fetch(url).then(res => res.json()).then(data => {
        // console.log(data.results);
        showTV(data.results);
    })
}

function showTV(data) {

    main[1].innerHTML = ''

    data.forEach(movie => {
        const { name, poster_path, backdrop_path, vote_average, overview, id } = movie
        const movieEl = document.createElement('div')
        movieEl.classList.add('movie-list-item')


        if (watchLaterLsTV.has(name)) {
            // console.log(title)
            // console.log(data.results[0].id)
            movieEl.innerHTML = `
                            <img src="${(backdrop_path) ? IMAGE_URL + backdrop_path : poster_path ? IMAGE_URL + poster_path : "images/noimg.webp"}" alt="" class="movie-list-item-img" style=" box-shadow: 12px 7px 7px rgb(16, 16, 16);">
                                                <span class="movie-list-item-title">${name}</span><span class="${getColor(vote_average)}">${(Math.floor(vote_average * 10)) / 10}</span>
                                                <button class="movie-list-item-button">WATCH</button>
                                                <button class="know-more" id=${id}>Know More</button>
                                                <span class="watchLaterdesc">Add to Watch Later</span>
                                                <button class="watchLater" id=2${movie.id} style="background-color:white"><i class="fa-solid fa-check watchL"></i></button>
                                                `

        }
        else {
            // document.getElementById(`2${movie.id}`).innerHTML = `<i class="fa-solid fa-check watchL"></i>`
            // document.getElementById(`2${movie.id}`).style.backgroundColor='white'
            movieEl.innerHTML = `
                                <img src="${(backdrop_path) ? IMAGE_URL + backdrop_path : "images/noimg.webp"}" alt="" class="movie-list-item-img" style=" box-shadow: 12px 7px 7px rgb(16, 16, 16);">
                                                    <span class="movie-list-item-title">${name}</span><span class="${getColor(vote_average)}">${(Math.floor(vote_average * 10)) / 10}</span>
                                                    <button class="movie-list-item-button">WATCH</button>
                                                    <button class="know-more" id=${id}>Know More</button>
                                                    <span class="watchLaterdesc">Add to Watch Later</span>
                                                    <button class="watchLater" id=2${movie.id}><i class="fa-solid fa-plus watchL"></i></button>
                                                    `
            // document.querySelector(".watchLaterdesc").style.display="block"
            // watchLaterLsTV.add(data.results[0].title)
        }

        main[1].appendChild(movieEl)

        document.getElementById(id).addEventListener('click', () => {
            console.log(id)
            openNavTV(movie)
        })

        document.getElementById(`2${id}`).addEventListener('click', () => {
            console.log(name);
            // watchLaterLsTV.add(title)
            // sessionStorage.setItem("WatchLater",(watchLaterLsTV))  
            getTVwl('https://api.themoviedb.org/3/search/tv?' + '&query=' + name + '&' + API_KEY)


        }
        )
    })


}


getMovies3(TV_Series_URL + '&page=13')
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
        const { name, poster_path, backdrop_path, vote_average, overview, id } = movie
        const movieEl = document.createElement('div')
        movieEl.classList.add('movie-list-item')


        if (watchLaterLsTV.has(name)) {
            // console.log(title)
            // console.log(data.results[0].id)
            movieEl.innerHTML = `
                            <img src="${(backdrop_path) ? IMAGE_URL + backdrop_path : poster_path ? IMAGE_URL + poster_path : "images/noimg.webp"}" alt="" class="movie-list-item-img" style=" box-shadow: 12px 7px 7px rgb(16, 16, 16);">
                                                <span class="movie-list-item-title">${name}</span><span class="${getColor(vote_average)}">${(Math.floor(vote_average * 10)) / 10}</span>
                                                <button class="movie-list-item-button">WATCH</button>
                                                <button class="know-more" id=${id}>Know More</button>
                                                <span class="watchLaterdesc">Add to Watch Later</span>
                                                <button class="watchLater" id=2${movie.id} style="background-color:pink"><i class="fa-solid fa-check watchL"></i></button>
                                                `

        }
        else {
            // document.getElementById(`2${movie.id}`).innerHTML = `<i class="fa-solid fa-check watchL"></i>`
            // document.getElementById(`2${movie.id}`).style.backgroundColor='white'
            movieEl.innerHTML = `
                                <img src="${(backdrop_path) ? IMAGE_URL + backdrop_path : poster_path ? IMAGE_URL + poster_path : "images/noimg.webp"}" alt="" class="movie-list-item-img" style=" box-shadow: 12px 7px 7px rgb(16, 16, 16);">
                                                    <span class="movie-list-item-title">${name}</span><span class="${getColor(vote_average)}">${(Math.floor(vote_average * 10)) / 10}</span>
                                                    <button class="movie-list-item-button">WATCH</button>
                                                    <button class="know-more" id=${id}>Know More</button>
                                                    <span class="watchLaterdesc">Add to Watch Later</span>
                                                    <button class="watchLater" id=2${movie.id}><i class="fa-solid fa-plus watchL"></i></button>
                                                    `
            // document.querySelector(".watchLaterdesc").style.display="block"
            // watchLaterLsTV.add(data.results[0].title)
        }

        main[2].appendChild(movieEl)

        document.getElementById(id).addEventListener('click', () => {
            console.log(id)
            openNavTV(movie)
        })

        document.getElementById(`2${id}`).addEventListener('click', () => {
            console.log(name);
            // watchLaterLsTV.add(title)
            // sessionStorage.setItem("WatchLater",(watchLaterLsTV))  
            getTVwl('https://api.themoviedb.org/3/search/tv?' + '&query=' + name + '&' + API_KEY)


        }
        )
    })


}



getMovies2(TV_Series_URL + '&page=2')
function getMovies2(url) {
    fetch(url).then(res => res.json()).then(data => {
        //  console.log(data.results);
        showTV2(data.results);
    })
}

function showTV2(data) {

    main[3].innerHTML = ''


    data.forEach(movie => {
        const { name, poster_path, backdrop_path, vote_average, overview, id } = movie
        const movieEl = document.createElement('div')
        movieEl.classList.add('movie-list-item')


        if (watchLaterLsTV.has(name)) {
            // console.log(title)
            // console.log(data.results[0].id)
            movieEl.innerHTML = `
                            <img src="${(backdrop_path) ? IMAGE_URL + backdrop_path : poster_path ? IMAGE_URL + poster_path : "images/noimg.webp"}" alt="" class="movie-list-item-img" style=" box-shadow: 12px 7px 7px rgb(16, 16, 16);">
                                                <span class="movie-list-item-title">${name}</span><span class="${getColor(vote_average)}">${(Math.floor(vote_average * 10)) / 10}</span>
                                                <button class="movie-list-item-button">WATCH</button>
                                                <button class="know-more" id=${id}>Know More</button>
                                                
                                                <button class="watchLater" id=2${movie.id} style="background-color:pink"><i class="fa-solid fa-check watchL"></i></button>
                                                `

        }
        else {
            // document.getElementById(`2${movie.id}`).innerHTML = `<i class="fa-solid fa-check watchL"></i>`
            // document.getElementById(`2${movie.id}`).style.backgroundColor='white'
            movieEl.innerHTML = `
                                <img src="${(backdrop_path) ? IMAGE_URL + backdrop_path : poster_path ? IMAGE_URL + poster_path : "images/noimg.webp"}" alt="" class="movie-list-item-img" style=" box-shadow: 12px 7px 7px rgb(16, 16, 16);">
                                                    <span class="movie-list-item-title">${name}</span><span class="${getColor(vote_average)}">${(Math.floor(vote_average * 10)) / 10}</span>
                                                    <button class="movie-list-item-button">WATCH</button>
                                                    <button class="know-more" id=${id}>Know More</button>
                                                    
                                                    <button class="watchLater" id=2${movie.id}><i class="fa-solid fa-plus watchL"></i></button>
                                                    `
            // document.querySelector(".watchLaterdesc").style.display="block"
            // watchLaterLsTV.add(data.results[0].title)
        }

        main[3].appendChild(movieEl)

        document.getElementById(id).addEventListener('click', () => {
            console.log(id)
            openNavTV(movie)
        })

        document.getElementById(`2${id}`).addEventListener('click', () => {
            console.log(name);
            // watchLaterLsTV.add(title)
            // sessionStorage.setItem("WatchLater",(watchLaterLsTV))  
            getTVwl('https://api.themoviedb.org/3/search/tv?' + '&query=' + name + '&' + API_KEY)


        }
        )
    })


}




getMovies4(BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY + '&with_genres=99');
function getMovies4(url) {
    fetch(url).then(res => res.json()).then(data => {
        //  console.log(data.results);
        showMovies4(data.results);
    })
}

function showMovies4(data) {

    main[4].innerHTML = ''


    data.forEach(movie => {
        const { title, poster_path, backdrop_path, vote_average, overview, id } = movie
        const movieEl = document.createElement('div')
        movieEl.classList.add('movie-list-item')


        if (watchLaterLsTV.has(title)) {
            // console.log(title)
            // console.log(data.results[0].id)
            movieEl.innerHTML = `
                            <img src="${(backdrop_path) ? IMAGE_URL + backdrop_path : poster_path ? IMAGE_URL + poster_path : "images/noimg.webp"}" alt="" class="movie-list-item-img" style=" box-shadow: 12px 7px 7px rgb(16, 16, 16);">
                                                <span class="movie-list-item-title">${title}</span><span class="${getColor(vote_average)}">${(Math.floor(vote_average * 10)) / 10}</span>
                                                <button class="movie-list-item-button">WATCH</button>
                                                <button class="know-more" id=${id}>Know More</button>
                                                
                                                <button class="watchLater" id=2${movie.id} style="background-color:pink"><i class="fa-solid fa-check watchL"></i></button>
                                                `

        }
        else {
            // document.getElementById(`2${movie.id}`).innerHTML = `<i class="fa-solid fa-check watchL"></i>`
            // document.getElementById(`2${movie.id}`).style.backgroundColor='white'
            movieEl.innerHTML = `
                                <img src="${(backdrop_path) ? IMAGE_URL + backdrop_path : poster_path ? IMAGE_URL + poster_path : "images/noimg.webp"}" alt="" class="movie-list-item-img" style=" box-shadow: 12px 7px 7px rgb(16, 16, 16);">
                                                    <span class="movie-list-item-title">${title}</span><span class="${getColor(vote_average)}">${(Math.floor(vote_average * 10)) / 10}</span>
                                                    <button class="movie-list-item-button">WATCH</button>
                                                    <button class="know-more" id=${id}>Know More</button>
                                                    
                                                    <button class="watchLater" id=2${movie.id}><i class="fa-solid fa-plus watchL"></i></button>
                                                    `
            // document.querySelector(".watchLaterdesc").style.display="block"
            // watchLaterLsTV.add(data.results[0].title)
        }

        main[4].appendChild(movieEl)

        document.getElementById(id).addEventListener('click', () => {
            console.log(id)
            openNavTV(movie)
        })

        document.getElementById(`2${id}`).addEventListener('click', () => {
            console.log(name);
            // watchLaterLsTV.add(title)
            // sessionStorage.setItem("WatchLater",(watchLaterLsTV))  
            getTVwl('https://api.themoviedb.org/3/search/tv?' + '&query=' + name + '&' + API_KEY)


        }
        )
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

// console.log(main)
let load = document.querySelector(".load-more")
let btn_top = document.querySelector(".btn-top")
load.addEventListener('click', () => {
    load.style.display = 'none'
    btn_top.style.display = 'none'
    // document.querySelector(".load-more-2").style.display='block'
    main[5].style.display = 'block'



    getMovies5(BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY + '&page=25');
    function getMovies5(url) {
        fetch(url).then(res => res.json()).then(data => {
            //  console.log(data.results);
            showMovies5(data.results);
        })
    }

    function showMovies5(data) {

        main[5].innerHTML = ''


        data.forEach(movie => {
            const { name, poster_path, backdrop_path, vote_average, overview, id } = movie
            const movieEl = document.createElement('div')
            movieEl.classList.add('movie-list-item')


            if (watchLaterLsTV.has(name)) {
                // console.log(title)
                // console.log(data.results[0].id)
                movieEl.innerHTML = `
                            <img src="${(backdrop_path) ? IMAGE_URL + backdrop_path : poster_path ? IMAGE_URL + poster_path : "images/noimg.webp"}" alt="" class="movie-list-item-img" style=" box-shadow: 12px 7px 7px rgb(16, 16, 16);">
                                                <span class="movie-list-item-title">${name}</span><span class="${getColor(vote_average)}">${(Math.floor(vote_average * 10)) / 10}</span>
                                                <button class="movie-list-item-button">WATCH</button>
                                                <button class="know-more" id=${id}>Know More</button>
                                                
                                                <button class="watchLater" id=2${movie.id} style="background-color:pink"><i class="fa-solid fa-check watchL"></i></button>
                                                `

            }
            else {
                // document.getElementById(`2${movie.id}`).innerHTML = `<i class="fa-solid fa-check watchL"></i>`
                // document.getElementById(`2${movie.id}`).style.backgroundColor='white'
                movieEl.innerHTML = `
                                <img src="${(backdrop_path) ? IMAGE_URL + backdrop_path : poster_path ? IMAGE_URL + poster_path : "images/noimg.webp"}" alt="" class="movie-list-item-img" style=" box-shadow: 12px 7px 7px rgb(16, 16, 16);">
                                                    <span class="movie-list-item-title">${name}</span><span class="${getColor(vote_average)}">${(Math.floor(vote_average * 10)) / 10}</span>
                                                    <button class="movie-list-item-button">WATCH</button>
                                                    <button class="know-more" id=${id}>Know More</button>
                                                    
                                                    <button class="watchLater" id=2${movie.id}><i class="fa-solid fa-plus watchL"></i></button>
                                                    `
                // document.querySelector(".watchLaterdesc").style.display="block"
                // watchLaterLsTV.add(data.results[0].title)
            }

            main[5].appendChild(movieEl)

            document.getElementById(id).addEventListener('click', () => {
                console.log(id)
                openNav(movie)
            })

            document.getElementById(`2${id}`).addEventListener('click', () => {
                // console.log(name);
                // watchLaterLsTV.add(title)
                // sessionStorage.setItem("WatchLater",(watchLaterLsTV))  
                getMoviesWL(searchURL + '&query=' + title)


            }
            )
        })


    }
})


form.addEventListener('submit', (e) => {
    e.preventDefault()

    // document.querySelector('.toph').style.display = 'none'
    // document.querySelector('.top-slide').style.display = 'none'
    // document.getElementById('greet').style.display = 'none'
    const searchTerm = search.value


    document.querySelector('.titletop').innerHTML = 'Search Results for "' + searchTerm + '"';


    if (searchTerm) {
        getMovies(searchURL + '&query=' + searchTerm)
        // console.log(getMovies(searchURL+'&query='+searchTerm))
    }
    document.querySelector('.title2').innerHTML = 'Some other related Results:';
}
)




const trans1 = 'https://api.themoviedb.org/3/movie/'
const trans2 = '/translations?&' + API_KEY


const similar1 = 'https://api.themoviedb.org/3/movie/'
const similar2 = '/similar?&api_key=aff98581fbcc8eff4609f1ab795c9a8f'
const genresOv = 'https://api.themoviedb.org/3/movie/'
const genresOv2 = '?language=en-US&' + API_KEY

const cast1 = 'https://api.themoviedb.org/3/movie/'
const cast2 = '/credits?&' + API_KEY

const ss1 = 'https://api.themoviedb.org/3/movie/'
const ss2 = '/images?&api_key=aff98581fbcc8eff4609f1ab795c9a8f'

function openNav(movie) {


    let id = movie.id



    fetch((genresOv + id + genresOv2)).then(res => res.json()).then(data => {
        fetch((cast1 + id + cast2)).then(res => res.json()).then(cast => {
            fetch((trans1 + id + trans2)).then(res => res.json()).then(transl => {
                fetch((ss1 + id + ss2)).then(res => res.json()).then(ss => {
                    // console.log(cast.cast)


                    let screenshots = []
                    ss.backdrops.forEach(ssI => {
                        screenshots.push(ssI.file_path)
                    })
                    let casting = []
                    let castingImg = []
                    cast.cast.forEach(c => {
                        console.log(c)
                        casting.push(c.name)
                        castingImg.push(c.profile_path)
                    })
                    let transLang = []
                    console.log(transl)
                    transl.translations.forEach(tr => {
                        transLang.push(tr.english_name)
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
                        document.getElementById("overlay-content").innerHTML = `<div class="origin-country" style="color:orange">Country of Origin: ${movie.origin_country}</div><h2 style="color:white; padding-bottom:10px">${movie.title}</h2><img src="${IMAGE_URL + movie.poster_path}" style="width:20vw;box-shadow: 12px 7px 7px black;"><h4 style="color: rgb(178, 212, 109); padding-top:20px ">Released on : ${movie.release_date}</h4><div style="font-size:17px;z-index:999; color: white; padding:35px 80px">${movie.overview}</div><div style="font-size:20px; color:black;background-color:yellowgreen;margin:0 60px;">${genreOv.join("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;")}</div><br><br><div style="color: gray; text-align:start; padding-left:80px ">Budget for the Film : &#36;${data.budget}</div><button class="watchlater-btn" id=1${id}  style="padding:10px; border-radius:8px; display:none">ADD TO WATCH LATER</button><div style="color:white; margin: 40px 70px; background-color: rgb(30, 30, 30); padding:16px 10px; border-radius:8px">Languages available : <br> ${transLang.join(' , ')}</div>`

                    else if (movie.origin_country)
                        document.getElementById("overlay-content").innerHTML = `<div class="origin-country" style="color:orange">Country of Origin: ${movie.origin_country}</div><h2 style="color:white; padding-bottom:10px">${movie.title}</h2><img src="${IMAGE_URL + movie.poster_path}" style="width:20vw;box-shadow: 12px 7px 7px black;"><div style="font-size:17px;z-index:999; color: white; padding:35px 80px">${movie.overview}</div><div style="font-size:20px; color:black;background-color:yellowgreen;margin:0 60px;">${genreOv.join("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;")}</div><br><br><div style="color: gray; text-align:start; padding-left:80px ">Budget for the Film : &#36;${data.budget}</div><button class="watchlater-btn" style="padding:10px; id=1${id} border-radius:8px; display:none">ADD TO WATCH LATER</button><div style="color:white; margin: 40px 70px; background-color: rgb(30, 30, 30); padding:16px 10px; border-radius:8px">Languages available : <br> ${transLang.join(' , ')}</div>`

                    else if (movie.release_date)
                        document.getElementById("overlay-content").innerHTML = `<h2 style="color:white; padding-bottom:10px">${movie.title}</h2><img src="${IMAGE_URL + movie.poster_path}" style="width:20vw ;box-shadow: 12px 7px 7px black;"><h4 style="color: rgb(178, 212, 109); padding-top:20px ">Released on : ${movie.release_date}</h4><div style="font-size:17px;z-index:999; color: white; padding:35px 80px">${movie.overview}</div><div style="font-size:20px; color:gray;background-color:yellowgreen; color:black; margin:0 60px; border-radius:6px">${genreOv.join("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;")}</div><br><br><div style="color: gray; text-align:start; padding-left:80px ">Budget for the Film : &#36;${data.budget}</div><button class="watchlater-btn" id="wLtr" style="padding:10px;display:none; border-radius:8px; display:none">ADD TO WATCH LATER</button><div style="color:white; margin: 40px 70px; background-color: rgb(30, 30, 30); padding:16px 10px; border-radius:8px">Languages available :<br> ${transLang.join(' , ')}</div><div style="color:white">RATE HERE :<br> <span><i class="fa-solid fa-star"  id="a" style="color: white; font-size:30px"></i> </span><span><i class="fa-solid fa-star"  id="b" style="color: white;font-size:30px"></i> </span><span><i class="fa-solid fa-star" id="c" style="color: white;font-size:30px"></i> </span><span><i class="fa-solid fa-star"  id="d"style="color: white;font-size:30px"></i> </span><span><i class="fa-solid fa-star"  id="e" style="color: white;font-size:30px"></i></span><br><div id="review" style="color:white"></div><br>`


                    else
                        document.getElementById("overlay-content").innerHTML = `<h2 style="color:white; padding-bottom:10px">${movie.title}</h2><img src="${IMAGE_URL + movie.poster_path}" style="width:20vw;box-shadow: 12px 7px 7px black;""><div style="font-size:17px;z-index:999; color: white; padding:35px 80px">${movie.overview}</div><div style="font-size:20px; color:black;background-color:yellowgreen; margin:0 60px;">${genreOv.join("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;")}</div><br><br><div style="color: gray; text-align:start; padding-left:80px ">Budget for the Film : &#36;${data.budget}</div><button class="watchlater-btn" id=1${id} style="padding:10px; border-radius:8px; display:none">ADD TO WATCH LATER</button><div style="color:white; margin: 40px 70px; background-color: rgb(30, 30, 30); padding:16px 10px; border-radius:8px">Languages available : <br> ${transLang.join(' , ')}</div>`

                    // WATCH LATER
                    // console.log(document.getElementById(`wLtr`))
                    document.getElementById(`wLtr`).addEventListener('click', () => {
                        console.log("hi")
                        document.getElementById(`wLtr`).style.backgroundColor = 'red'
                    })

                    // console.log(castingImg)

                    let rat;
                    if (sessionStorage.getItem("rating")) {

                        rat = sessionStorage.getItem("rating")
                        if (rat == "1") {
                            document.getElementById(`a`).style.color = 'red'
                            document.getElementById(`b`).style.color = 'white'
                            document.getElementById(`c`).style.color = 'white'
                            document.getElementById(`d`).style.color = 'white'
                            document.getElementById(`e`).style.color = 'white'
                            document.getElementById(`a`).style.cursor = 'pointer'
                            document.getElementById('review').innerText = 'I hate it'

                        }
                        if (rat == "2") {
                            document.getElementById(`a`).style.color = 'orange'
                            document.getElementById(`b`).style.color = 'orange'
                            document.getElementById(`c`).style.color = 'white'
                            document.getElementById(`d`).style.color = 'white'
                            document.getElementById(`e`).style.color = 'white'
                            document.getElementById(`a`).style.cursor = 'pointer'
                            document.getElementById('review').innerText = "It's Okayish !"

                        }
                        if (rat == "3") {
                            document.getElementById(`a`).style.color = 'yellow'
                            document.getElementById(`b`).style.color = 'yellow'
                            document.getElementById(`c`).style.color = 'yellow'
                            document.getElementById(`d`).style.color = 'white'
                            document.getElementById(`e`).style.color = 'white'
                            document.getElementById(`a`).style.cursor = 'pointer'
                            document.getElementById('review').innerText = 'I like it !'

                        }
                        if (rat == "4") {
                            document.getElementById(`a`).style.color = 'yellowgreen'
                            document.getElementById(`b`).style.color = 'yellowgreen'
                            document.getElementById(`c`).style.color = 'yellowgreen'
                            document.getElementById(`d`).style.color = 'yellowgreen'
                            document.getElementById(`e`).style.color = 'white'
                            document.getElementById(`a`).style.cursor = 'pointer'
                            document.getElementById('review').innerText = 'I love it !'

                        }
                        if (rat == "5") {
                            document.getElementById(`a`).style.color = 'green'
                            document.getElementById(`b`).style.color = 'green'
                            document.getElementById(`c`).style.color = 'green'
                            document.getElementById(`d`).style.color = 'green'
                            document.getElementById(`e`).style.color = 'green'
                            document.getElementById(`a`).style.cursor = 'pointer'
                            document.getElementById('review').innerText = 'Absolutely Loved It !'

                        }
                    }



                    // console.log(screenshots)
                    if (screenshots.length !== 0) {
                        var div = document.createElement("div");
                        // div.style.width = "100px";
                        div.style.height = "150px";
                        div.style.display = "flex";
                        if (screenshots.length < 15)
                            div.style.justifyContent = 'center';
                        div.style.overflow = "scroll";
                        document.getElementById("overlay-content").innerHTML += '<p style="color:white; font-size:22px">SOME SCREENSHOTS : </p>'
                        document.getElementById("overlay-content").appendChild(div)

                        for (let i = 0; i <= screenshots.length; i++) {
                            if (castingImg[i])
                                div.innerHTML += `<div style="padding:10px; color:white; width:180px"><img style="width:150px" height="120px" src="${IMAGE_URL + screenshots[i]}"></div>`;


                        }
                    }
                    document.getElementById("overlay-content").innerHTML += `<br><br>`

                    if (casting.length !== 0) {
                        var div = document.createElement("div");
                        // div.style.width = "100px";
                        div.style.height = "250px";
                        div.style.display = "flex";
                        if (casting.length < 15)
                            div.style.justifyContent = 'center';
                        div.style.overflow = "scroll";
                        document.getElementById("overlay-content").innerHTML += '<p style="color:white; font-size:22px">CAST</p>'
                        document.getElementById("overlay-content").appendChild(div)

                        for (let i = 0; i <= casting.length; i++) {
                            if (castingImg[i])
                                div.innerHTML += `<div style="padding:10px; color:white; width:110px"><img style="width:100px" src="${IMAGE_URL + castingImg[i]}">${casting[i]}</div>`;

                        }
                    }


                    fetch(BASE_URL + "/movie/" + id + '/videos?' + API_KEY).then(res => res.json()).then((videoData) => {
                        if (videoData) {
                            document.getElementById("overlay-content").innerHTML += `<br><br><br>`
                            document.getElementById("myNav").style.width = "100%";




                            document.getElementById(`a`).addEventListener('click', () => {
                                if (document.getElementById(`a`).style.color == 'red') {
                                    document.getElementById(`a`).style.color = 'white'
                                    document.getElementById(`b`).style.color = 'white'
                                    document.getElementById(`c`).style.color = 'white'
                                    document.getElementById(`d`).style.color = 'white'
                                    document.getElementById(`e`).style.color = 'white'
                                    sessionStorage.setItem("rating", "0");
                                    document.getElementById(`a`).style.cursor = 'pointer'
                                    document.getElementById('review').innerText = ''


                                }
                                else {
                                    document.getElementById(`a`).style.color = 'red'
                                    document.getElementById(`b`).style.color = 'white'
                                    document.getElementById(`c`).style.color = 'white'
                                    document.getElementById(`d`).style.color = 'white'
                                    document.getElementById(`e`).style.color = 'white'
                                    document.getElementById(`a`).style.cursor = 'pointer'
                                    sessionStorage.setItem("rating", "1");
                                    document.getElementById('review').innerText = 'I hate it'

                                }
                            })
                            // document.getElementById(`a`).addEventListener('mouseout', () => {
                            //     document.getElementById(`a`).style.color = 'white'
                            // })
                            document.getElementById(`b`).addEventListener('click', () => {

                                if (document.getElementById(`b`).style.color == 'orange') {
                                    document.getElementById(`a`).style.color = 'white'
                                    document.getElementById(`b`).style.color = 'white'
                                    document.getElementById(`c`).style.color = 'white'
                                    document.getElementById(`d`).style.color = 'white'
                                    document.getElementById(`e`).style.color = 'white'
                                    document.getElementById(`a`).style.cursor = 'pointer'
                                    sessionStorage.setItem("rating", "0");
                                    document.getElementById('review').innerText = ''


                                }
                                else {
                                    document.getElementById(`a`).style.color = 'orange'
                                    document.getElementById(`a`).style.cursor = 'pointer'
                                    document.getElementById(`b`).style.color = 'orange'
                                    document.getElementById(`b`).style.cursor = 'pointer'
                                    document.getElementById(`c`).style.color = 'white'
                                    document.getElementById(`d`).style.color = 'white'
                                    document.getElementById(`e`).style.color = 'white'
                                    sessionStorage.setItem("rating", "2");
                                    document.getElementById('review').innerText = "It's Okayish"
                                }
                            })
                            // document.getElementById(`b`).addEventListener('mouseout', () => {
                            //     document.getElementById(`a`).style.color = 'white'
                            //     document.getElementById(`b`).style.color = 'white'
                            // })
                            document.getElementById(`c`).addEventListener('click', () => {


                                if (document.getElementById(`c`).style.color == 'yellow') {
                                    document.getElementById(`a`).style.color = 'white'
                                    document.getElementById(`b`).style.color = 'white'
                                    document.getElementById(`c`).style.color = 'white'
                                    document.getElementById(`d`).style.color = 'white'
                                    document.getElementById(`e`).style.color = 'white'
                                    document.getElementById(`a`).style.cursor = 'pointer'
                                    sessionStorage.setItem("rating", "0");
                                    document.getElementById('review').innerText = ''

                                }
                                else {
                                    document.getElementById(`a`).style.color = 'yellow'
                                    document.getElementById(`b`).style.color = 'yellow'
                                    document.getElementById(`c`).style.color = 'yellow'
                                    document.getElementById(`a`).style.cursor = 'pointer'
                                    document.getElementById(`b`).style.cursor = 'pointer'
                                    document.getElementById(`c`).style.cursor = 'pointer'
                                    document.getElementById(`d`).style.color = 'white'
                                    document.getElementById(`e`).style.color = 'white'
                                    sessionStorage.setItem("rating", "3");
                                    document.getElementById('review').innerText = 'I like it !'
                                }
                            })
                            // document.getElementById(`c`).addEventListener('mouseout', () => {
                            //     document.getElementById(`a`).style.color = 'white'
                            //     document.getElementById(`b`).style.color = 'white'
                            //     document.getElementById(`c`).style.color = 'white'
                            // })
                            document.getElementById(`d`).addEventListener('click', () => {

                                if (document.getElementById(`d`).style.color == 'yellowgreen') {
                                    document.getElementById(`a`).style.color = 'white'
                                    document.getElementById(`b`).style.color = 'white'
                                    document.getElementById(`c`).style.color = 'white'
                                    document.getElementById(`d`).style.color = 'white'
                                    document.getElementById(`e`).style.color = 'white'
                                    document.getElementById(`a`).style.cursor = 'pointer'
                                    sessionStorage.setItem("rating", "0");
                                    document.getElementById('review').innerText = ''

                                }
                                else {
                                    document.getElementById(`a`).style.color = 'yellowgreen'
                                    document.getElementById(`b`).style.color = 'yellowgreen'
                                    document.getElementById(`c`).style.color = 'yellowgreen'
                                    document.getElementById(`d`).style.color = 'yellowgreen'
                                    document.getElementById(`a`).style.cursor = 'pointer'
                                    document.getElementById(`b`).style.cursor = 'pointer'
                                    document.getElementById(`c`).style.cursor = 'pointer'
                                    document.getElementById(`d`).style.cursor = 'pointer'
                                    document.getElementById(`e`).style.color = 'white'
                                    sessionStorage.setItem("rating", "4");
                                    document.getElementById('review').innerText = 'I love It !'
                                }
                            })
                            // document.getElementById(`d`).addEventListener('mouseout', () => {
                            //     document.getElementById(`a`).style.color = 'white'
                            //     document.getElementById(`b`).style.color = 'white'
                            //     document.getElementById(`c`).style.color = 'white'
                            //     document.getElementById(`d`).style.color = 'white'
                            // })
                            document.getElementById(`e`).addEventListener('click', () => {


                                if (document.getElementById(`e`).style.color == 'green') {
                                    document.getElementById(`a`).style.color = 'white'
                                    document.getElementById(`b`).style.color = 'white'
                                    document.getElementById(`c`).style.color = 'white'
                                    document.getElementById(`d`).style.color = 'white'
                                    document.getElementById(`e`).style.color = 'white'
                                    document.getElementById(`a`).style.cursor = 'pointer'
                                    sessionStorage.setItem("rating", "0");
                                    document.getElementById('review').innerText = ''

                                }
                                else {
                                    document.getElementById(`a`).style.color = 'green'
                                    document.getElementById(`b`).style.color = 'green'
                                    document.getElementById(`c`).style.color = 'green'
                                    document.getElementById(`d`).style.color = 'green'
                                    document.getElementById(`e`).style.color = 'green'
                                    document.getElementById(`a`).style.cursor = 'pointer'
                                    document.getElementById(`b`).style.cursor = 'pointer'
                                    document.getElementById(`c`).style.cursor = 'pointer'
                                    document.getElementById(`d`).style.cursor = 'pointer'
                                    document.getElementById(`e`).style.cursor = 'pointer'
                                    sessionStorage.setItem("rating", "5");
                                    document.getElementById('review').innerText = 'Absolutely Loved It !'
                                }
                            })

                            // document.getElementById(`e`).addEventListener('mouseout', () => {
                            //     document.getElementById(`a`).style.color = 'white'
                            //     document.getElementById(`b`).style.color = 'white'
                            //     document.getElementById(`c`).style.color = 'white'
                            //     document.getElementById(`d`).style.color = 'white'
                            //     document.getElementById(`e`).style.color = 'white'
                            // })



                            document.getElementById(`e1`).addEventListener('mouseout', () => {
                                document.getElementById(`a`).style.color = 'white'
                                document.getElementById(`b`).style.color = 'white'
                                document.getElementById(`c`).style.color = 'white'
                                document.getElementById(`d`).style.color = 'white'
                                document.getElementById(`e`).style.color = 'white'
                            })


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
            })

        })
    }
    )
}

