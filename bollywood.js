const API_KEY = 'api_key=aff98581fbcc8eff4609f1ab795c9a8f'
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY+'&with_original_language=hi';
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



function showMovies(data) {

    main[0].innerHTML = ''

    data.forEach(movie => {
        const { title, poster_path, vote_average, id} = movie
        const movieEl = document.createElement('div')
        movieEl.classList.add('movie-list-item')
        movieEl.innerHTML = `
        <img src="${(poster_path)?IMAGE_URL + poster_path : "images/noimg.webp"}" alt="" class="movie-list-item-img" style=" box-shadow: 12px 7px 7px rgb(16, 16, 16);">
                            <span class="movie-list-item-title">${title}</span><span class="${getColor(vote_average)}">${vote_average}</span>
                            <button class="movie-list-item-button">WATCH</button>
                            <button class="know-more" id=${id}>Know More</button>
                            <span class="watchLaterdesc">Add to Watch Later</span>
                            <button class="watchLater"><i class="fa-solid fa-plus watchL"></i></i></button>
                            `
        main[0].appendChild(movieEl)

        document.getElementById(id).addEventListener('click',()=>{
            console.log(id)
            openNav(movie)
            // window.location.href = 'info.html'
        })
    })


}


let movieImg = document.querySelectorAll(".movie-list-item-button")
            console.log(movieImg)
            movieImg.forEach(mI => {
                console.log(mI)
                mI.addEventListener('click', () => {
                    window.location.href = 'info.html'
                }
                )
            })




/* Open when someone clicks on the span element */
// function openNav(movie) {
//     let id = movie.id
//     // console.log(movie)
//     if(movie.origin_country && movie.release_date)
//         document.getElementById("overlay-content").innerHTML = `<div class="origin-country">Country of Origin: ${movie.origin_country}</div><h1 style="color: gray">OVERVIEW</h1><h4 style="color: rgb(178, 212, 109);padding-top:20px">Released on : ${movie.release_date}</h4><div style="font-size:17px; color: gray;z-index:999 ;padding:35px 80px">${movie.overview}</div>`
    
//     else if(movie.origin_country)
//         document.getElementById("overlay-content").innerHTML = `<div class="origin-country">Country of Origin: ${movie.origin_country}</div><h1 style="color: gray">OVERVIEW</h1><div style="font-size:17px;z-index:999; color: gray; padding:35px 80px">${movie.overview}</div>`

//     else if(movie.release_date)
//         document.getElementById("overlay-content").innerHTML = `<h1 style="color: gray">OVERVIEW</h1><h4 style="color: rgb(178, 212, 109); opacity:padding-top:20px">Released on : ${movie.release_date}</h4><div style="font-size:17px;z-index:999; color: gray; padding:35px 80px">${movie.overview}</div>`
    
//     else
//         document.getElementById("overlay-content").innerHTML = `<h1 style="color: gray">OVERVIEW</h1><div style="font-size:17px; color: gray; padding:25px;z-index:999">${movie.overview}</div>`
    
//     fetch(BASE_URL+"/movie/"+id+'/videos?'+API_KEY).then(res=>res.json()).then((videoData)=>{
//         if(videoData){
//             document.getElementById("overlay-content").innerHTML += `<br><br><br>`
//             document.getElementById("myNav").style.width = "100%";
//             if(videoData.results.length>0){
//                 var emb=[]
//                 videoData.results.forEach(vid=>{
//                     let {name,key,site} = vid

//                     if(site=='YouTube')
//                         emb.push(`<iframe width="560" height="315" src="https://www.youtube.com/embed/${key}" title="${name}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`);


//                 })

//                 document.getElementById("overlay-content").innerHTML+=emb.join('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;')
//             }
//             else{
//                 document.getElementById("overlay-content").innerHTML += ``;
//             }
//             // console.log(videoData)
//         }
//     })
//   }
  






  const genresOv = 'https://api.themoviedb.org/3/movie/'
  const genresOv2 = '?language=en-US&'+API_KEY+'&original_language=hi'
  
  /* Open when someone clicks on the span element */
  function openNav(movie) {
      let id = movie.id
  
  
  
      fetch((genresOv+id+genresOv2)).then(res => res.json()).then(data => {
          // console.log(data.budget);
          // showTV(data.results);
          // console.log(data.genres)
          let genreOv = []
          data.genres.forEach(gen=>{
              genreOv.push(gen.name)
          })
          console.log(genreOv)
          
  
      // console.log(movie)
      if(movie.origin_country && movie.release_date)
      document.getElementById("overlay-content").innerHTML = `<div class="origin-country">Country of Origin: ${movie.origin_country}</div><h2 style="color:white; padding-bottom:10px">${movie.title}</h2><img src="${IMAGE_URL + movie.poster_path}" style="width:20vw"><h4 style="color: rgb(178, 212, 109); padding-top:20px">Released on : ${movie.release_date}</h4><div style="font-size:17px;z-index:999; color: gray; padding:35px 80px">${movie.overview}</div><div style="font-size:20px; color:gray">${genreOv.join("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;")}</div><br><br><div style="color: gray; text-align:start; padding-left:80px ">Budget for the Film : &#36;${data.budget}</div>`
      
      else if(movie.origin_country)
      document.getElementById("overlay-content").innerHTML = `<div class="origin-country">Country of Origin: ${movie.origin_country}</div><h2 style="color:white; padding-bottom:10px">${movie.title}</h2><img src="${IMAGE_URL + movie.poster_path}" style="width:20vw"><div style="font-size:17px;z-index:999; color: gray; padding:35px 80px">${movie.overview}</div><div style="font-size:20px; color:gray">${genreOv.join("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;")}</div><br><br><div style="color: gray; text-align:start; padding-left:80px ">Budget for the Film : &#36;${data.budget}</div>`
  
      else if(movie.release_date)
          document.getElementById("overlay-content").innerHTML = `<h2 style="color:white; padding-bottom:10px">${movie.title}</h2><img src="${IMAGE_URL + movie.poster_path}" style="width:20vw"><h4 style="color: rgb(178, 212, 109); padding-top:20px">Released on : ${movie.release_date}</h4><div style="font-size:17px;z-index:999; color: gray; padding:35px 80px">${movie.overview}</div><div style="font-size:20px; color:gray">${genreOv.join("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;")}</div><br><br><div style="color: gray; text-align:start; padding-left:80px ">Budget for the Film : &#36;${data.budget}</div>`
      
      else
      document.getElementById("overlay-content").innerHTML = `<h2 style="color:white; padding-bottom:10px">${movie.title}</h2><img src="${IMAGE_URL + movie.poster_path}" style="width:20vw"><div style="font-size:17px;z-index:999; color: gray; padding:35px 80px">${movie.overview}</div><div style="font-size:20px; color:gray">${genreOv.join("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;")}</div><br><br>̀<div style="color: gray; text-align:start; padding-left:80px ">Budget for the Film : &#36;${data.budget}</div>`
      
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
  })
  }
    
  
  const genresOvTV = 'https://api.themoviedb.org/3/tv/'
  const genresOvTV2 = '?language=en-US&'+API_KEY
  
  function openNavTV(movie) {
      let id = movie.id
  
  
  
      fetch((genresOvTV+id+genresOvTV2)).then(res => res.json()).then(data => {
          console.log(data);
          // showTV(data.results);
          // console.log(data.genres)
          let genreOv = []
          data.genres.forEach(gen=>{
              genreOv.push(gen.name)
          })
          console.log(genreOv)
          
  
      // console.log(movie)
      if(movie.origin_country && movie.release_date)
      document.getElementById("overlay-content").innerHTML = `<div class="origin-country">Country of Origin: ${movie.origin_country}</div><h2 style="color:white; padding-bottom:10px">${movie.name}</h2><img src="${IMAGE_URL + movie.poster_path}" style="width:20vw"><h4 style="color: rgb(178, 212, 109); padding-top:20px">Released on : ${movie.release_date}</h4><div style="font-size:17px;z-index:999; color: gray; padding:35px 80px">${movie.overview}</div><div style="font-size:20px; color:gray">${genreOv.join("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;")}</div>`
      
      else if(movie.origin_country)
      document.getElementById("overlay-content").innerHTML = `<div class="origin-country">Country of Origin: ${movie.origin_country}</div><h2 style="color:white; padding-bottom:10px">${movie.name}</h2><img src="${IMAGE_URL + movie.poster_path}" style="width:20vw"><div style="font-size:17px;z-index:999; color: gray; padding:35px 80px">${movie.overview}</div><div style="font-size:20px; color:gray">${genreOv.join("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;")}</div>`
  
      else if(movie.release_date)
          document.getElementById("overlay-content").innerHTML = `<h2 style="color:white; padding-bottom:10px">${movie.name}</h2><img src="${IMAGE_URL + movie.poster_path}" style="width:20vw"><h4 style="color: rgb(178, 212, 109); padding-top:20px">Released on : ${movie.release_date}</h4><div style="font-size:17px;z-index:999; color: gray; padding:35px 80px">${movie.overview}</div><div style="font-size:20px; color:gray">${genreOv.join("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;")}</div>`
      
      else
      document.getElementById("overlay-content").innerHTML = `<h2 style="color:white; padding-bottom:10px">${movie.name}</h2><img src="${IMAGE_URL + movie.poster_path}" style="width:20vw"><div style="font-size:17px;z-index:999; color: gray; padding:35px 80px">${movie.overview}</div><div style="font-size:20px; color:gray">${genreOv.join("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;")}</div>`
      
      fetch(BASE_URL+"/tv/"+id+'/videos?'+API_KEY).then(res=>res.json()).then((videoData)=>{
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
  })
  }
  
















  /* Close when someone clicks on the "x" symbol inside the overlay */
  function closeNav() {

    document.getElementById("myNav").style.width = "0%";
  }












getTV(TV_Series_URL+'&with_original_language=hi')
function getTV(url) {
    fetch(url).then(res => res.json()).then(data => {
        // console.log(data.results);
        showTV(data.results);
    })
}

function showTV(data) {

    main[1].innerHTML = ''

    data.forEach(movie => {
        const { name, poster_path, vote_average, overview, id} = movie
        const movieEl = document.createElement('div')
        movieEl.classList.add('movie-list-item')
        movieEl.innerHTML = `
        <img src="${IMAGE_URL + poster_path}" alt="" class="movie-list-item-img" style=" box-shadow: 12px 7px 7px rgb(16, 16, 16);" >
                            <span class="movie-list-item-title">${name}</span><span class="${getColor(vote_average)}">${vote_average}</span>
                            <button class="movie-list-item-button">WATCH</button>
                            <button class="know-more" id=${id}>Know More</button>
                            `
                            main[1].appendChild(movieEl)
                            
        document.getElementById(id).addEventListener('click',()=>{
            console.log(id)
            openNavTV(movie)
        })
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

    main[2].innerHTML = ''

    for (let i = 9; i < 20; i++) {
        // data.forEach(movie => {
        const { title, poster_path, vote_average, overview, id} = data[i]
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
        document.getElementById(id).addEventListener('click',()=>{
            openNav(data[i])
        })
        
    }


}



getTV2(TV_Series_URL+'&with_original_language=hi')
function getTV2(url) {
    fetch(url).then(res => res.json()).then(data => {
        //  console.log(data.results);
        showTV2(data.results);
    })
}

function showTV2(data) {

    main[3].innerHTML = ''

    for (let i = 9; i < 20; i++) {
        // data.forEach(movie => {
        const { name, poster_path, vote_average, overview, id} = data[i]
        const movieEl = document.createElement('div')
        movieEl.classList.add('movie-list-item')
        movieEl.innerHTML = `
        <img src="${IMAGE_URL + poster_path}" alt="images/nopic.jpeg" class="movie-list-item-img" style=" box-shadow: 12px 7px 7px rgb(16, 16, 16);">
                            <span class="movie-list-item-title">${name}</span> <span class="${getColor(vote_average)}">${vote_average}</span>
                            <button class="movie-list-item-button">WATCH</button>
                            <button class="know-more" id=${id}>Know More</button>
                            `
        main[3].appendChild(movieEl)

        document.getElementById(id).addEventListener('click',()=>{
            console.log(id)
            openNavTV(data[i])
        })
        // })
    }


}




getMovies4(BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY+'&with_genres=27'+'&with_original_language=hi');
function getMovies4(url) {
    fetch(url).then(res => res.json()).then(data => {
        //  console.log(data.results);
        showMovies4(data.results);
    })
}

function showMovies4(data) {

    main[4].innerHTML = ''

    
    data.forEach(movie => {
        const { title, poster_path, vote_average, overview, id} = movie
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
        document.getElementById(id).addEventListener('click',()=>{
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


    document.querySelector('.titletop').innerHTML = 'Search Results for "' + searchTerm + '"';


    if (searchTerm) {
        getMovies(searchURL + '&query=' + searchTerm)
        // console.log(getMovies(searchURL+'&query='+searchTerm))
    }
    document.querySelector('.title2').innerHTML = 'Some other related Results:';
})


