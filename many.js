const API_KEY = 'api_key=aff98581fbcc8eff4609f1ab795c9a8f'
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;
const searchURL = BASE_URL + '/search/movie?' + API_KEY;
const IMAGE_URL = 'https://image.tmdb.org/t/p/w500'
// const TV_Series_URL = BASE_URL + '/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc&' + API_KEY;
// https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=aff98581fbcc8eff4609f1ab795c9a8f
// https://api.themoviedb.org/3/genre/movie/list?api_key=aff98581fbcc8eff4609f1ab795c9a8f


const genres = [{ "id": 28, "name": "Action" }, { "id": 12, "name": "Adventure" }, { "id": 16, "name": "Animation" }, { "id": 35, "name": "Comedy" }, { "id": 80, "name": "Crime" }, { "id": 99, "name": "Documentary" }, { "id": 18, "name": "Drama" }, { "id": 10751, "name": "Family" }, { "id": 14, "name": "Fantasy" }, { "id": 36, "name": "History" }, { "id": 27, "name": "Horror" }, { "id": 10402, "name": "Music" }, { "id": 9648, "name": "Mystery" }, { "id": 10749, "name": "Romance" }, { "id": 878, "name": "Science Fiction" }, { "id": 10770, "name": "TV Movie" }, { "id": 53, "name": "Thriller" }, { "id": 10752, "name": "War" }, { "id": 37, "name": "Western" }]





const main = document.querySelectorAll(".movie-list")

const form = document.getElementById('form')
const search = document.querySelector('.srch')
const tagsEl = document.querySelector('.tags')


getMovies(API_URL+'&page=171')
function getMovies(url) {
    fetch(url).then(res => res.json()).then(data => {
        //  console.log(data.results);
        if (data.results.length !== 0) {
            // main[0].style.display='block'
            showMovies(data.results);

            if(data.results.length>5)
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






let s = []
let watchLaterLs = new Set()
if (sessionStorage.getItem("watchLater")) {
    console.log(sessionStorage.getItem("watchLater"))
    s = sessionStorage.getItem("watchLater").split(',')
    s.forEach(s1 => {
        watchLaterLs.add(s1)
    })
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
            document.getElementById(`2${data.results[0].id}`).style.backgroundColor = 'white'
            // document.querySelector(".watchLaterdesc").style.display="block"
            watchLaterLs.add(data.results[0].title)
        }
        const c = Array.from(watchLaterLs).join(',')
        sessionStorage.setItem("watchLater", (c))
        console.log(c)
        // console.log(document.querySelector(".watchListNav"))



    }

    )
}





console.log(watchLaterLs)


function showMovies(data) {

    main[0].innerHTML = ''

    data.forEach(movie => {
        const { title, poster_path, backdrop_path, vote_average, id } = movie
        const movieEl = document.createElement('div')
        movieEl.classList.add('movie-list-item')







        // movieEl.innerHTML = `
        // <img src="${(poster_path) ? IMAGE_URL + poster_path : "images/noimg.webp"}" alt="" class="movie-list-item-img" style=" box-shadow: 12px 7px 7px rgb(16, 16, 16);">
        //                     <span class="movie-list-item-title">${title}</span><span class="${getColor(vote_average)}">${(Math.floor(vote_average*10))/10}</span>
        //                     <button class="movie-list-item-button">WATCH</button>
        //                     <button class="know-more" id=${id}>Know More</button>
        //                     <span class="watchLaterdesc">Add to Watch Later</span>
        //                     <button class="watchLater" id=2${movie.id}><i class="fa-solid fa-plus watchL"></i></button>
        // `
        // watchLaterLs.forEach(w=>{
        //     console.log(w)
        // })
        // console.log((watchLaterLs))

        // console.log(document.getElementById(`2${movie.id}`))
        // console.log(title)
        if (watchLaterLs.has(title)) {
            // console.log(title)
            // console.log(data.results[0].id)
            movieEl.innerHTML = `
        <img src="${(backdrop_path) ? IMAGE_URL + backdrop_path : poster_path ? IMAGE_URL + poster_path : "images/noimg.webp"}" alt="" class="movie-list-item-img" style=" box-shadow: 12px 7px 7px rgb(16, 16, 16);">
                            <span class="movie-list-item-title">${title}</span><span class="${getColor(vote_average)}">${(Math.floor(vote_average*10))/10}</span>
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
                            <span class="movie-list-item-title">${title}</span><span class="${getColor(vote_average)}">${(Math.floor(vote_average*10))/10}</span>
                            <button class="movie-list-item-button">WATCH</button>
                            <button class="know-more" id=${id}>Know More</button>
                            <span class="watchLaterdesc">Add to Watch Later</span>
                            <button class="watchLater" id=2${movie.id} style="background-color:yellowgreen"><i class="fa-solid fa-plus watchL"></i></button>
                            `
            // document.querySelector(".watchLaterdesc").style.display="block"
            // watchLaterLs.add(data.results[0].title)
        }
        main[0].appendChild(movieEl)
        // console.log(movie.id)

        document.getElementById(id).addEventListener('click', () => {
            // console.log(id)
            openNav(movie)
            // window.location.href = 'info.html'
        })

        // document.querySelector(".descWL").addEventListener('click',()=>{
        //     

        //     })
        document.getElementById(`2${id}`).addEventListener('click', () => {
            console.log(title);

            // watchLaterLs.add(title)
            // sessionStorage.setItem("WatchLater",(watchLaterLs))  
            getMoviesWL(searchURL + '&query=' + title)


        }
        )




    })
}





const genresOv = 'https://api.themoviedb.org/3/movie/'
const genresOv2 = '?language=en-US&' + API_KEY
const cast1 = 'https://api.themoviedb.org/3/movie/'
        const cast2 = '/credits?&' + API_KEY

 const trans1 = 'https://api.themoviedb.org/3/movie/'
    const trans2 = '/translations?&' + API_KEY 
      
    
    
    //   const genresOv = 'https://api.themoviedb.org/3/movie/'
    //   const genresOv2 = '?language=en-US&'+API_KEY+'&original_language=hi'
    //   const cast1 = 'https://api.themoviedb.org/3/movie/'
    // const cast2 = '/credits?&' + API_KEY
      
      /* Open when someone clicks on the span element */
      function openNav(movie) {
          let id = movie.id
      
      
      
          fetch((genresOv+id+genresOv2)).then(res => res.json()).then(data => {
            fetch((cast1+id+cast2)).then(res=>res.json()).then(cast=>{
                fetch((trans1+id+trans2)).then(res=>res.json()).then(transl=>{
              // console.log(data.budget);
              // showTV(data.results);
              // console.log(data.genres)
              let genreOv = []
              data.genres.forEach(gen=>{
                  genreOv.push(gen.name)
              })
              console.log(genreOv)
              let castingImg =[]
              let casting = []
              cast.cast.forEach(c=>{
                console.log(c)
                casting.push(c.name)
                castingImg.push(c.profile_path)
            })
            let transLang = []
            console.log(transl)
            transl.translations.forEach(tr=>{
                transLang.push(tr.english_name)
            })
              
      
          // console.log(movie)
          if (movie.origin_country && movie.release_date)
                document.getElementById("overlay-content").innerHTML = `<div class="origin-country" style="color:orange">Country of Origin: ${movie.origin_country}</div><h2 style="color:white; padding-bottom:10px">${movie.title}</h2><img src="${IMAGE_URL + movie.poster_path}" style="width:20vw"><h4 style="color: rgb(178, 212, 109); padding-top:20px ">Released on : ${movie.release_date}</h4><div style="font-size:17px;z-index:999; color: white; padding:35px 80px">${movie.overview}</div><div style="font-size:20px; color:black;background-color:yellowgreen; margin:0 60px; border-radius:6px  ">${genreOv.join("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;")}</div><br><br><div style="color: gray; text-align:start; padding-left:80px ">Budget for the Film : &#36;${data.budget}</div>`
    
            else if (movie.origin_country)
                document.getElementById("overlay-content").innerHTML = `<div class="origin-country" style="color:orange">Country of Origin: ${movie.origin_country}</div><h2 style="color:white; padding-bottom:10px">${movie.title}</h2><img src="${IMAGE_URL + movie.poster_path}" style="width:20vw"><div style="font-size:17px;z-index:999; color: white; padding:35px 80px">${movie.overview}</div><div style="font-size:20px; color:black;background-color:yellowgreen; margin:0 60px; border-radius:6px ">${genreOv.join("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;")}</div><br><br><div style="color: gray; text-align:start; padding-left:80px ">Budget for the Film : &#36;${data.budget}</div>`
    
            else if (movie.release_date)
                document.getElementById("overlay-content").innerHTML = `<h2 style="color:white; padding-bottom:10px">${movie.title}</h2><img src="${IMAGE_URL + movie.poster_path}" style="width:20vw"><h4 style="color: rgb(178, 212, 109); padding-top:20px ">Released on : ${movie.release_date}</h4><div style="font-size:17px;z-index:999; color: white; padding:35px 80px">${movie.overview}</div><div style="font-size:20px; color:gray;background-color:yellowgreen; color:black; margin:0 60px; border-radius:6px">${genreOv.join("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;")}</div><br><br><div style="color: gray; text-align:start; padding-left:80px ">Budget for the Film : &#36;${data.budget}</div>`
    
            else
                document.getElementById("overlay-content").innerHTML = `<h2 style="color:white; padding-bottom:10px">${movie.title}</h2><img src="${IMAGE_URL + movie.poster_path}" style="width:20vw"><div style="font-size:17px;z-index:999; color: white; padding:35px 80px">${movie.overview}</div><div style="font-size:20px; color:black;background-color:yellowgreen;margin:0 60px; border-radius:6px  ">${genreOv.join("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;")}</div><br><br>̀<div style="color: gray; text-align:start; padding-left:80px ">Budget for the Film : &#36;${data.budget}</div>`
    
    
    
                var div = document.createElement("div");
                // div.style.width = "100px";
                div.style.height = "250px";
                div.style.display = "flex";
                div.style.overflow = "scroll";
                if(casting.length<15)
                    div.style.justifyContent='center';
                document.getElementById("overlay-content").innerHTML+='<p style="color:white; font-size:22px">CAST</p>'
                document.getElementById("overlay-content").appendChild(div)
                
                for(let i=0; i<=casting.length; i++){
                    if(castingImg[i])
                    div.innerHTML+=`<div style="padding:10px; color:white; width:110px"><img style="width:100px" src="${IMAGE_URL + castingImg[i]}">${casting[i]}</div>`;
                }
    
    
    
    
                fetch(BASE_URL+"/movie/"+id+'/videos?'+API_KEY).then(res=>res.json()).then((videoData)=>{
              if(videoData){
                  document.getElementById("overlay-content").innerHTML += `<br><br><br>`
                  document.getElementById("myNav").style.width = "100%";
                  if(videoData.results.length>0){
                      var emb=[]
                      videoData.results.forEach(vid=>{
                          let {name,key,site} = vid
      
                          if(site=='YouTube')
                              emb.push(`<iframe width="560" height="315" src="https://www.youtube.com/embed/${key}" title="${name}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`);
      
      
                      })
      
                      document.getElementById("overlay-content").innerHTML+=emb.join('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;')
                  }
                  else{
                      document.getElementById("overlay-content").innerHTML += ``;
                  }
                  // console.log(videoData)
                }
            })
                
            
            }
        )}
    )})
        }
    
        
    

  
  /* Close when someone clicks on the "x" symbol inside the overlay */
  function closeNav() {

    document.getElementById("myNav").style.width = "0%";
  }




getTV(API_URL+'&page=5')
function getTV(url) {
    fetch(url).then(res => res.json()).then(data => {
        // console.log(data.results);
        showTV(data.results);
    })
}

function showTV(data) {

    main[1].innerHTML = ''

    data.forEach(movie => {
        const { title, poster_path, backdrop_path,vote_average, overview, id} = movie
        const movieEl = document.createElement('div')
        movieEl.classList.add('movie-list-item')
        if (watchLaterLs.has(title)) {
            // console.log(title)
            // console.log(data.results[0].id)
            movieEl.innerHTML = `
        <img src="${(backdrop_path) ? IMAGE_URL + backdrop_path : poster_path ? IMAGE_URL + poster_path : "images/noimg.webp"}" alt="" class="movie-list-item-img" style=" box-shadow: 12px 7px 7px rgb(16, 16, 16);">
                            <span class="movie-list-item-title">${title}</span><span class="${getColor(vote_average)}">${(Math.floor(vote_average*10))/10}</span>
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
                            <span class="movie-list-item-title">${title}</span><span class="${getColor(vote_average)}">${(Math.floor(vote_average*10))/10}</span>
                            <button class="movie-list-item-button">WATCH</button>
                            <button class="know-more" id=${id}>Know More</button>
                            <span class="watchLaterdesc">Add to Watch Later</span>
                            <button class="watchLater" id=2${movie.id} style="background-color:yellowgreen"><i class="fa-solid fa-plus watchL"></i></button>
                            `
            // document.querySelector(".watchLaterdesc").style.display="block"
            // watchLaterLs.add(data.results[0].title)
        }
        main[1].appendChild(movieEl)
        // console.log(movie.id)

        document.getElementById(id).addEventListener('click', () => {
            // console.log(id)
            openNav(movie)
            // window.location.href = 'info.html'
        })

        // document.querySelector(".descWL").addEventListener('click',()=>{
        //     

        //     })
        document.getElementById(`2${id}`).addEventListener('click', () => {
            console.log(title);

            // watchLaterLs.add(title)
            // sessionStorage.setItem("WatchLater",(watchLaterLs))  
            getMoviesWL(searchURL + '&query=' + title)


        }
        )




    })
}



getMovies3(API_URL+'&page=13')
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
        const { title, poster_path,backdrop_path, vote_average, overview, id} = movie
        const movieEl = document.createElement('div')
        movieEl.classList.add('movie-list-item')
        if (watchLaterLs.has(title)) {
            // console.log(title)
            // console.log(data.results[0].id)
            movieEl.innerHTML = `
        <img src="${(backdrop_path) ? IMAGE_URL + backdrop_path : poster_path ? IMAGE_URL + poster_path : "images/noimg.webp"}" alt="" class="movie-list-item-img" style=" box-shadow: 12px 7px 7px rgb(16, 16, 16);">
                            <span class="movie-list-item-title">${title}</span><span class="${getColor(vote_average)}">${(Math.floor(vote_average*10))/10}</span>
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
                            <span class="movie-list-item-title">${title}</span><span class="${getColor(vote_average)}">${(Math.floor(vote_average*10))/10}</span>
                            <button class="movie-list-item-button">WATCH</button>
                            <button class="know-more" id=${id}>Know More</button>
                            <span class="watchLaterdesc">Add to Watch Later</span>
                            <button class="watchLater" id=2${movie.id} style="background-color:yellowgreen"><i class="fa-solid fa-plus watchL"></i></button>
                            `
            // document.querySelector(".watchLaterdesc").style.display="block"
            // watchLaterLs.add(data.results[0].title)
        }
        main[2].appendChild(movieEl)
        // console.log(movie.id)

        document.getElementById(id).addEventListener('click', () => {
            // console.log(id)
            openNav(movie)
            // window.location.href = 'info.html'
        })

        // document.querySelector(".descWL").addEventListener('click',()=>{
        //     

        //     })
        document.getElementById(`2${id}`).addEventListener('click', () => {
            console.log(title);

            // watchLaterLs.add(title)
            // sessionStorage.setItem("WatchLater",(watchLaterLs))  
            getMoviesWL(searchURL + '&query=' + title)


        }
        )




    })
}





getMovies2(API_URL+'&page=2')
function getMovies2(url) {
    fetch(url).then(res => res.json()).then(data => {
        //  console.log(data.results);
        showTV2(data.results);
    })
}

function showTV2(data) {

    main[3].innerHTML = ''

    
        data.forEach(movie => {
        const { title, poster_path, vote_average,backdrop_path, overview, id} = movie
        const movieEl = document.createElement('div')
        movieEl.classList.add('movie-list-item')
        if (watchLaterLs.has(title)) {
            // console.log(title)
            // console.log(data.results[0].id)
            movieEl.innerHTML = `
        <img src="${(backdrop_path) ? IMAGE_URL + backdrop_path : poster_path ? IMAGE_URL + poster_path : "images/noimg.webp"}" alt="" class="movie-list-item-img" style=" box-shadow: 12px 7px 7px rgb(16, 16, 16);">
                            <span class="movie-list-item-title">${title}</span><span class="${getColor(vote_average)}">${(Math.floor(vote_average*10))/10}</span>
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
                            <span class="movie-list-item-title">${title}</span><span class="${getColor(vote_average)}">${(Math.floor(vote_average*10))/10}</span>
                            <button class="movie-list-item-button">WATCH</button>
                            <button class="know-more" id=${id}>Know More</button>
                            <span class="watchLaterdesc">Add to Watch Later</span>
                            <button class="watchLater" id=2${movie.id} style="background-color:yellowgreen"><i class="fa-solid fa-plus watchL"></i></button>
                            `
            // document.querySelector(".watchLaterdesc").style.display="block"
            // watchLaterLs.add(data.results[0].title)
        }
        main[3].appendChild(movieEl)
        // console.log(movie.id)

        document.getElementById(id).addEventListener('click', () => {
            // console.log(id)
            openNav(movie)
            // window.location.href = 'info.html'
        })

        // document.querySelector(".descWL").addEventListener('click',()=>{
        //     

        //     })
        document.getElementById(`2${id}`).addEventListener('click', () => {
            console.log(title);

            // watchLaterLs.add(title)
            // sessionStorage.setItem("WatchLater",(watchLaterLs))  
            getMoviesWL(searchURL + '&query=' + title)


        }
        )




    })
}






getMovies4(API_URL+'&with_genres=10749');
function getMovies4(url) {
    fetch(url).then(res => res.json()).then(data => {
        //  console.log(data.results);
        showMovies4(data.results);
    })
}

function showMovies4(data) {

    main[4].innerHTML = ''

    
    data.forEach(movie => {
        const { title, poster_path, backdrop_path,vote_average, overview, id} = movie
        const movieEl = document.createElement('div')
        movieEl.classList.add('movie-list-item')
        if (watchLaterLs.has(title)) {
            // console.log(title)
            // console.log(data.results[0].id)
            movieEl.innerHTML = `
        <img src="${(backdrop_path) ? IMAGE_URL + backdrop_path : poster_path ? IMAGE_URL + poster_path : "images/noimg.webp"}" alt="" class="movie-list-item-img" style=" box-shadow: 12px 7px 7px rgb(16, 16, 16);">
                            <span class="movie-list-item-title">${title}</span><span class="${getColor(vote_average)}">${(Math.floor(vote_average*10))/10}</span>
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
                            <span class="movie-list-item-title">${title}</span><span class="${getColor(vote_average)}">${(Math.floor(vote_average*10))/10}</span>
                            <button class="movie-list-item-button">WATCH</button>
                            <button class="know-more" id=${id}>Know More</button>
                            <span class="watchLaterdesc">Add to Watch Later</span>
                            <button class="watchLater" id=2${movie.id} style="background-color:yellowgreen"><i class="fa-solid fa-plus watchL"></i></button>
                            `
            // document.querySelector(".watchLaterdesc").style.display="block"
            // watchLaterLs.add(data.results[0].title)
        }
        main[4].appendChild(movieEl)
        // console.log(movie.id)

        document.getElementById(id).addEventListener('click', () => {
            // console.log(id)
            openNav(movie)
            // window.location.href = 'info.html'
        })

        // document.querySelector(".descWL").addEventListener('click',()=>{
        //     

        //     })
        document.getElementById(`2${id}`).addEventListener('click', () => {
            console.log(title);

            // watchLaterLs.add(title)
            // sessionStorage.setItem("WatchLater",(watchLaterLs))  
            getMoviesWL(searchURL + '&query=' + title)


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
let load=document.querySelector(".load-more")
let btn_top=document.querySelector(".btn-top")
load.addEventListener('click',()=>{
    load.style.display='none'
    btn_top.style.display='none'
    // document.querySelector(".load-more-2").style.display='block'
    main[5].style.display='block'
    
    

    getMovies5(BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY+'&page=25');
    function getMovies5(url) {
        fetch(url).then(res => res.json()).then(data => {
            //  console.log(data.results);
            showMovies5(data.results);
        })
    }

    function showMovies5(data) {

        main[5].innerHTML = ''

        
        data.forEach(movie => {
            const { title, poster_path,backdrop_path, vote_average, overview, id} = movie
            const movieEl = document.createElement('div')
            movieEl.classList.add('movie-list-item')
            movieEl.innerHTML = `
            <img src="${IMAGE_URL + backdrop_path}" alt="" class="movie-list-item-img" style=" box-shadow: 12px 7px 7px rgb(16, 16, 16);">
                                <span class="movie-list-item-title">${title} </span><span class="${getColor(vote_average)}">${(Math.floor(vote_average*10))/10}</span>
                                <p class="movie-list-item-desc">${overview}</p>
                                <button class="movie-list-item-button">WATCH</button>
                                <button class="know-more" id=${id}>Know More</button>
                                `
            main[5].appendChild(movieEl)
            // console.log(document.getElementById(id));
            document.getElementById(id).addEventListener('click',()=>{
                console.log(document.getElementById(id))
                openNav(movie)
            })
            
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
})
