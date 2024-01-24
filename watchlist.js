

const API_KEY = 'api_key=aff98581fbcc8eff4609f1ab795c9a8f'
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;
const searchURL = BASE_URL + '/search/movie?' + API_KEY;
const IMAGE_URL = 'https://image.tmdb.org/t/p/w500'
const TV_Series_URL = BASE_URL + '/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc&' + API_KEY;


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


let s = []
let sTV = []
let watchLaterLs = new Set()
let watchLaterLsTV = new Set()
if (sessionStorage.getItem("watchLater")) {
    console.log(sessionStorage.getItem("watchLater"))
    s = sessionStorage.getItem("watchLater").split(',')
    s.forEach(s1 => {
        watchLaterLs.add(s1)
    })
}
if (sessionStorage.getItem("watchLaterTV")) {
    console.log(sessionStorage.getItem("watchLaterTV"))
    sTV = sessionStorage.getItem("watchLaterTV").split(',')
    sTV.forEach(s1 => {
        watchLaterLsTV.add(s1)
    })
}




const g = sessionStorage.getItem("watchLater")
const gTV = sessionStorage.getItem("watchLaterTV")

console.log(g)
console.log(gTV)


if (!g && !gTV) {
    const movieEl = document.createElement('div')
    movieEl.style.fontFamily = 'Roboto'
    movieEl.style.backgroundColor='yellowgreen'
    movieEl.style.border='2px solid black'
    movieEl.style.padding='40px 20px'
    movieEl.style.borderRadius='8px'
    movieEl.innerHTML+='<i class="fa-solid fa-circle-exclamation" style="font-size:150px"></i><br><br>'
    movieEl.innerHTML += 'NO MOVIES RIGHT NOW! ADD MOVIES TO WATCH LATER LIST TO SEE THEM HERE'
    movieEl.style.width = '60vw'
    movieEl.style.fontSize = '30px'
    movieEl.style.margin = 'auto'
    movieEl.style.textAlign = 'center'
    // movieEl.style.width = '60vw'

    document.querySelector(".main-container").appendChild(movieEl)
}

if (gTV) {
    const g1TV = gTV.split(',')
    sessionStorage.setItem("watchLaterTV", gTV)
    let x = "";

    
    g1TV.forEach(movie => {
        const searchTerm = movie
        x = searchTerm
        // console.log(searchTerm)


        // document.querySelector('.titletop').innerHTML = 'Search Results for "' + searchTerm + '"';


        if (searchTerm) {
            getTV('https://api.themoviedb.org/3/search/tv?' + '&query=' + searchTerm + '&' + API_KEY)
            // console.log(getMovies(searchURL+'&query='+searchTerm))
        }
    })


}
if (g) {
    const g1 = g.split(',')
    sessionStorage.setItem("watchLater", g)
    let x = "";

    
    g1.forEach(movie => {
        const searchTerm = movie
        x = searchTerm
        // console.log(searchTerm)


        // document.querySelector('.titletop').innerHTML = 'Search Results for "' + searchTerm + '"';


        if (searchTerm) {
            getMovies(searchURL + '&query=' + searchTerm)
            // console.log(getMovies(searchURL+'&query='+searchTerm))
        }
    })


}





    function getMovies(url) {
        fetch(url).then(res => res.json()).then(data => {
            //  console.log(data.results);
            if (data.results.length !== 0) {
                // main[0].style.display='block'
                // console.log(data.results[0])
                showMovies(data.results[0]);

                //     if (data.results.length > 5)
                //         document.querySelector(".arrow").style.display = 'block'
                //     else
                //         document.querySelector(".arrow").style.display = 'none'

                // }
                // else {
                //     document.querySelector(".titletop").style.display = 'block'
                //     document.querySelector(".arrow").style.display = 'none'
                //     document.querySelector(".titletop").innerHTML = `<h1 class="nores">Psssshhh.... No results found! Closest results found : </h1><br><br>`

                // }
            }

        })
    }
    function getTV(url) {
        fetch(url).then(res => res.json()).then(data => {
            // console.log(data.results);
            showTV(data.results[0]);
        })
    }


    // console.log(watchLaterLs)

    function showTV(movie) {

        // main[3].innerHTML = ''

        // for (let i = 9; i < 20; i++) {
        // data.forEach(movie => {
        const { name, poster_path, backdrop_path, vote_average, overview, id } = movie
        const movieEl = document.createElement('div')
        movieEl.classList.add('movie-list-item')
        movieEl.style.height = '230px'
        movieEl.style.margin = '20px'
        cont.style.display = 'flex'
        cont.style.flexWrap = 'wrap'


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
                        <button class="watchLater" id=2${movie.id} style="background-color:yellowgreen"><i class="fa-solid fa-plus watchL"></i></button>
                        `
            // document.querySelector(".watchLaterdesc").style.display="block"
            // watchLaterLs.add(data.results[0].title)
        }
        cont.appendChild(movieEl)

        document.getElementById(id).addEventListener('click', () => {
            console.log(id)
            openNavTV(movie)
        })


        document.getElementById(`2${id}`).addEventListener('click', () => {
            console.log(name);
            getTVwl('https://api.themoviedb.org/3/search/tv?' + '&query=' + name + '&' + API_KEY)


        }
        )



    }






    let cont = document.querySelector(".main-container")

    function showMovies(movie) {
        console.log(movie)
        // data.forEach(movie => {
        const { title, poster_path, backdrop_path, vote_average, id } = movie
        const movieEl = document.createElement('div')
        movieEl.classList.add('movie-list-item')
        movieEl.style.height = '230px'
        movieEl.style.margin = '20px'
        cont.style.display = 'flex'
        cont.style.flexWrap = 'wrap'


        if (watchLaterLs.has(title)) {
            // console.log(title)
            // console.log(data.results[0].id)
            movieEl.innerHTML = `
    <img src="${(backdrop_path) ? IMAGE_URL + backdrop_path : poster_path ? IMAGE_URL + poster_path : "images/noimg.webp"}" alt="" class="movie-list-item-img" style=" box-shadow: 12px 7px 7px rgb(16, 16, 16);">
                        <span class="movie-list-item-title">${title}</span><span class="${getColor(vote_average)}">${(Math.floor(vote_average * 10)) / 10}</span>
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
                        <span class="movie-list-item-title">${title}</span><span class="${getColor(vote_average)}">${(Math.floor(vote_average * 10)) / 10}</span>
                        <button class="movie-list-item-button">WATCH</button>
                        <button class="know-more" id=${id}>Know More</button>
                        <span class="watchLaterdesc">Add to Watch Later</span>
                        <button class="watchLater" id=2${movie.id} style="background-color:yellowgreen"><i class="fa-solid fa-plus watchL"></i></button>
                        `
            // document.querySelector(".watchLaterdesc").style.display="block"
            // watchLaterLs.add(data.results[0].title)
        }
        cont.appendChild(movieEl)
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
        window.location = 'watchlist.html'
    }





    function getMoviesWL(url) {
        fetch(url).then(res => res.json()).then(data => {

            // console.log(data.results);
            if (watchLaterLs.has(data.results[0].title)) {
                // console.log(data.results[0].id)    
                document.getElementById(`2${data.results[0].id}`).innerHTML = `<i class="fa-solid fa-plus watchL"></i>`
                document.getElementById(`2${data.results[0].id}`).style.backgroundColor = 'yellowgreen'
                watchLaterLs.delete(data.results[0].title)

            }
            else {
                document.getElementById(`2${data.results[0].id}`).innerHTML = `<i class="fa-solid fa-check watchL"></i>`
                document.getElementById(`2${data.results[0].id}`).style.backgroundColor = 'pink'
                // document.querySelector(".watchLaterdesc").style.display="block"
                watchLaterLs.add(data.results[0].title)
            }
            const c = Array.from(watchLaterLs).join(',')
            sessionStorage.setItem("watchLater", (c))
            console.log(c)
            window.location = 'watchlist.html'
            // console.log(document.querySelector(".watchListNav"))



        }

        )
    }



    // https://api.themoviedb.org/3/movie/{movie_id}/translations
    const trans1 = 'https://api.themoviedb.org/3/movie/'
    const trans2 = '/translations?&' + API_KEY


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
            fetch((cast1 + id + cast2)).then(res => res.json()).then(cast => {
                fetch((trans1 + id + trans2)).then(res => res.json()).then(transl => {
                    // console.log(cast.cast)
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
                        document.getElementById("overlay-content").innerHTML = `<h2 style="color:white; padding-bottom:10px">${movie.title}</h2><img src="${IMAGE_URL + movie.poster_path}" style="width:20vw;box-shadow: 12px 7px 7px black;"><h4 style="color: rgb(178, 212, 109); padding-top:20px ">Released on : ${movie.release_date}</h4><div style="font-size:17px;z-index:999; color: white; padding:35px 80px">${movie.overview}</div><div style="font-size:20px; color:gray;background-color:yellowgreen; color:black; margin:0 60px; border-radius:6px">${genreOv.join("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;")}</div><br><br><div style="color: gray; text-align:start; padding-left:80px ">Budget for the Film : &#36;${data.budget}</div><button class="watchlater-btn" id=1${id} style="padding:10px; border-radius:8px; display:none">ADD TO WATCH LATER</button><div style="color:white; margin: 40px 70px; background-color: rgb(30, 30, 30); padding:16px 10px; border-radius:8px">Languages available :<br> ${transLang.join(' , ')}</div>`


                    else
                        document.getElementById("overlay-content").innerHTML = `<h2 style="color:white; padding-bottom:10px">${movie.title}</h2><img src="${IMAGE_URL + movie.poster_path}" style="width:20vw;box-shadow: 12px 7px 7px black;""><div style="font-size:17px;z-index:999; color: white; padding:35px 80px">${movie.overview}</div><div style="font-size:20px; color:black;background-color:yellowgreen; margin:0 60px;">${genreOv.join("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;")}</div><br><br><div style="color: gray; text-align:start; padding-left:80px ">Budget for the Film : &#36;${data.budget}</div><button class="watchlater-btn" id=1${id} style="padding:10px; border-radius:8px; display:none">ADD TO WATCH LATER</button><div style="color:white; margin: 40px 70px; background-color: rgb(30, 30, 30); padding:16px 10px; border-radius:8px">Languages available : <br> ${transLang.join(' , ')}</div>`

                    // WATCH LATER
                    let watchLat = document.getElementById(`1${movie.id}`)// BUTTON CAUGHT
                    console.log(watchLat)

                    watchLat.addEventListener('click', () => {
                        watchLat.style.display = 'none'
                    })
                    console.log(castingImg)


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

            })
        }
        )
    }



    const genresOvTV = 'https://api.themoviedb.org/3/tv/'
    const genresOvTV2 = '?language=en-US&' + API_KEY



    const trans1TV = 'https://api.themoviedb.org/3/tv/'
    const trans2TV = '/translations?&' + API_KEY



    const cast1TV = 'https://api.themoviedb.org/3/tv/'
    const cast2TV = '/credits?&' + API_KEY
    function openNavTV(movie) {
        let id = movie.id



        fetch((genresOvTV + id + genresOvTV2)).then(res => res.json()).then(data => {
            fetch((cast1TV + id + cast2TV)).then(res => res.json()).then(cast => {
                fetch((trans1TV + id + trans2TV)).then(res => res.json()).then(transl => {
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
                        document.getElementById("overlay-content").innerHTML = `<div class="origin-country" style="color:orange">Country of Origin: ${movie.origin_country}</div><h2 style="color:white; padding-bottom:10px">${movie.name}</h2><img src="${IMAGE_URL + movie.poster_path}" style="width:20vw"><div style="font-size:17px;z-index:999; color: gray; padding:35px 80px">${movie.overview}</div><div style="font-size:20px; color:black;background-color:yellowgreen; margin:0 60px; border-radius:6px ">${genreOv.join("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;")}</div><div style="color:white; margin: 40px 70px; background-color: rgb(30, 30, 30); padding:16px 10px; border-radius:8px">Languages available : <br> ${transLang.join(' , ')}</div>`

                    else if (movie.release_date)
                        document.getElementById("overlay-content").innerHTML = `<h2 style="color:white; padding-bottom:10px">${movie.name}</h2><img src="${IMAGE_URL + movie.poster_path}" style="width:20vw"><h4 style="color: rgb(178, 212, 109); ">Released on : ${movie.release_date}</h4><div style="font-size:17px;z-index:999; color: gray; padding:35px 80px">${movie.overview}</div><div style="font-size:20px; color:black;background-color:yellowgreen; margin:0 60px; border-radius:6px ">${genreOv.join("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;")}</div><div style="color:white; margin: 40px 70px; background-color: rgb(30, 30, 30); padding:16px 10px; border-radius:8px">Languages available : <br> ${transLang.join(' , ')}</div>`

                    else
                        document.getElementById("overlay-content").innerHTML = `<h2 style="color:white; padding-bottom:10px">${movie.name}</h2><img src="${IMAGE_URL + movie.poster_path}" style="width:20vw"><div style="font-size:17px;z-index:999; color: gray; padding:35px 80px">${movie.overview}</div><div style="font-size:20px; color:black;background-color:yellowgreen; margin:0 60px; border-radius:6px ">${genreOv.join("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;")}</div><div style="color:white; margin: 40px 70px; background-color: rgb(30, 30, 30); padding:16px 10px; border-radius:8px">Languages available : <br> ${transLang.join(' , ')}</div>`

                    if (castingImg) {
                        var div = document.createElement("div");
                        // div.style.width = "100px";
                        div.style.height = "250px";
                        div.style.display = "flex";
                        div.style.justifyContent = 'center';
                        div.style.overflow = "scroll";
                        document.getElementById("overlay-content").innerHTML += '<p style="color:white; font-size:22px">CAST</p>'
                        document.getElementById("overlay-content").appendChild(div)


                        for (let i = 0; i <= casting.length; i++) {
                            if (castingImg[i])
                                div.innerHTML += `<div style="padding:10px;width:110px; color:white"><img style="width:100px" src="${IMAGE_URL + castingImg[i]}">${casting[i]}</div>`;

                        }
                    }

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
    }








/* Close when someone clicks on the "x" symbol inside the overlay */
function closeNav() {
    document.getElementById("myNav").style.width = "0%";
}








