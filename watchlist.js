// import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
// import { getDatabase, get, set, ref, child } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
// import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const API_KEY = 'api_key=aff98581fbcc8eff4609f1ab795c9a8f'
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;
const searchURL = BASE_URL + '/search/movie?' + API_KEY;
const IMAGE_URL = 'https://image.tmdb.org/t/p/w500'
const TV_Series_URL = BASE_URL + '/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc&' + API_KEY;
// // https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=aff98581fbcc8eff4609f1ab795c9a8f
// // https://api.themoviedb.org/3/genre/movie/list?api_key=aff98581fbcc8eff4609f1ab795c9a8f

// /*
// const genres = [{ "id": 28, "name": "Action" }, { "id": 12, "name": "Adventure" }, { "id": 16, "name": "Animation" }, { "id": 35, "name": "Comedy" }, { "id": 80, "name": "Crime" }, { "id": 99, "name": "Documentary" }, { "id": 18, "name": "Drama" }, { "id": 10751, "name": "Family" }, { "id": 14, "name": "Fantasy" }, { "id": 36, "name": "History" }, { "id": 27, "name": "Horror" }, { "id": 10402, "name": "Music" }, { "id": 9648, "name": "Mystery" }, { "id": 10749, "name": "Romance" }, { "id": 878, "name": "Science Fiction" }, { "id": 10770, "name": "TV Movie" }, { "id": 53, "name": "Thriller" }, { "id": 10752, "name": "War" }, { "id": 37, "name": "Western" }]





// const main = document.querySelectorAll(".movie-list")

// const form = document.getElementById('form')
// const search = document.querySelector('.srch')
// const tagsEl = document.querySelector('.tags')


// getMovies(API_URL+'&page=171')
// function getMovies(url) {
//     fetch(url).then(res => res.json()).then(data => {
//         //  console.log(data.results);
//         if (data.results.length !== 0) {
//             // main[0].style.display='block'
//             showMovies(data.results);

//             if(data.results.length>5)
//                 document.querySelector(".arrow").style.display = 'block'
//             else
//                 document.querySelector(".arrow").style.display = 'none'

//         }
//         else {
//             document.querySelector(".titletop").style.display = 'block'
//             document.querySelector(".arrow").style.display = 'none'
//             document.querySelector(".titletop").innerHTML = `<h1 class="nores">Psssshhh.... No results found! Closest results found : </h1><br><br>`

//         }
//     })
// }



// function showMovies(data) {

//     main[0].innerHTML = ''

//     data.forEach(movie => {
//         const { title, poster_path, vote_average, id} = movie
//         const movieEl = document.createElement('div')
//         movieEl.classList.add('movie-list-item')
//         movieEl.innerHTML = `
//         <img src="${(poster_path)?IMAGE_URL + poster_path : "images/noimg.webp"}" alt="" class="movie-list-item-img" style=" box-shadow: 12px 7px 7px rgb(16, 16, 16);">
//                             <span class="movie-list-item-title">${title}</span><span class="${getColor(vote_average)}">${vote_average}</span>
//                             <button class="movie-list-item-button">WATCH</button>
//                             <button class="know-more" id=${id}>Know More</button>
//                             `
//         main[0].appendChild(movieEl)

//         document.getElementById(id).addEventListener('click',()=>{
//             console.log(id)
//             openNav(movie)
//         })
//     })


// }



// // Open when someone clicks on the span element 
// function openNav(movie) {
//     let id = movie.id
//     // console.log(movie)
//     if(movie.origin_country && movie.release_date)
//         document.getElementById("overlay-content").innerHTML = `<div class="origin-country">Country of Origin: ${movie.origin_country}</div><h1 style="color: gray">OVERVIEW</h1><h4 style="color: rgb(178, 212, 109); opacity:">Released on : ${movie.release_date}</h4><div style="font-size:17px; color: gray; padding:35px 80px">${movie.overview}</div>`

//     else if(movie.origin_country)
//         document.getElementById("overlay-content").innerHTML = `<div class="origin-country">Country of Origin: ${movie.origin_country}</div><h1 style="color: gray">OVERVIEW</h1><div style="font-size:17px; color: gray; padding:35px 80px">${movie.overview}</div>`

//     else if(movie.release_date)
//         document.getElementById("overlay-content").innerHTML = `<h1 style="color: gray">OVERVIEW</h1><h4 style="color: rgb(178, 212, 109);">Released on : ${movie.release_date}</h4><div style="font-size:17px; color: gray; padding:35px 80px">${movie.overview}</div>`

//     else
//         document.getElementById("overlay-content").innerHTML = `<h1 style="color: gray">OVERVIEW</h1><div style="font-size:17px; color: gray; padding:25px">${movie.overview}</div>`

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

//   // Close when someone clicks on the "x" symbol inside the overlay 
//   function closeNav() {

//     document.getElementById("myNav").style.width = "0%";
//   }




// getTV(API_URL+'&page=5')
// function getTV(url) {
//     fetch(url).then(res => res.json()).then(data => {
//         // console.log(data.results);
//         showTV(data.results);
//     })
// }

// function showTV(data) {

//     main[1].innerHTML = ''

//     data.forEach(movie => {
//         const { title, poster_path, vote_average, overview, id} = movie
//         const movieEl = document.createElement('div')
//         movieEl.classList.add('movie-list-item')
//         movieEl.innerHTML = `
//         <img src="${IMAGE_URL + poster_path}" alt="" class="movie-list-item-img" style=" box-shadow: 12px 7px 7px rgb(16, 16, 16);" >
//                             <span class="movie-list-item-title">${title}</span><span class="${getColor(vote_average)}">${vote_average}</span>
//                             <button class="movie-list-item-button">WATCH</button>
//                             <button class="know-more" id=${id}>Know More</button>
//                             `
//                             main[1].appendChild(movieEl)

//         document.getElementById(id).addEventListener('click',()=>{
//             console.log(id)
//             openNav(movie)
//         })
//     })


// }

// getMovies3(API_URL+'&page=13')
// function getMovies3(url) {
//     fetch(url).then(res => res.json()).then(data => {
//         //  console.log(data.results);
//         showMovies3(data.results);
//     })
// }

// function showMovies3(data) {

//     main[2].innerHTML = ''

//     // for (let i = 9; i < 20; i++) {
//         data.forEach(movie => {
//         const { title, poster_path, vote_average, overview, id} = movie
//         const movieEl = document.createElement('div')
//         movieEl.classList.add('movie-list-item')
//         movieEl.innerHTML = `
//         <img src="${IMAGE_URL + poster_path}" alt="" class="movie-list-item-img" style=" box-shadow: 12px 7px 7px rgb(16, 16, 16);">
//                             <span class="movie-list-item-title">${title} </span><span class="${getColor(vote_average)}">${vote_average}</span>
//                             <p class="movie-list-item-desc">${overview}</p>
//                             <button class="movie-list-item-button">WATCH</button>
//                             <button class="know-more" id=${id}>Know More</button>
//                             `
//         main[2].appendChild(movieEl)
//         // console.log(document.getElementById(id));
//         // console.log(document.getElementById(id))
//         document.getElementById(id).addEventListener('click',()=>{
//             openNav(movie)
//         })

//     })


// }



// getMovies2(API_URL+'&page=2')
// function getMovies2(url) {
//     fetch(url).then(res => res.json()).then(data => {
//         //  console.log(data.results);
//         showTV2(data.results);
//     })
// }

// function showTV2(data) {

//     main[3].innerHTML = ''


//         data.forEach(movie => {
//         const { title, poster_path, vote_average, overview, id} = movie
//         const movieEl = document.createElement('div')
//         movieEl.classList.add('movie-list-item')
//         movieEl.innerHTML = `
//         <img src="${IMAGE_URL + poster_path}" alt="images/nopic.jpeg" class="movie-list-item-img" style=" box-shadow: 12px 7px 7px rgb(16, 16, 16);">
//                             <span class="movie-list-item-title">${title}</span> <span class="${getColor(vote_average)}">${vote_average}</span>
//                             <p class="movie-list-item-desc">${overview}</p>
//                             <button class="movie-list-item-button">WATCH</button>
//                             <button class="know-more" id=${id}>Know More</button>
//                             `
//         main[3].appendChild(movieEl)

//         document.getElementById(id).addEventListener('click',()=>{
//             console.log(id)
//             openNav(movie)
//         })
//         // })
//     })


// }




// getMovies4(API_URL+'&with_genres=10749');
// function getMovies4(url) {
//     fetch(url).then(res => res.json()).then(data => {
//         //  console.log(data.results);
//         showMovies4(data.results);
//     })
// }

// function showMovies4(data) {

//     main[4].innerHTML = ''


//     data.forEach(movie => {
//         const { title, poster_path, vote_average, overview, id} = movie
//         const movieEl = document.createElement('div')
//         movieEl.classList.add('movie-list-item')
//         movieEl.innerHTML = `
//         <img src="${IMAGE_URL + poster_path}" alt="" class="movie-list-item-img" style=" box-shadow: 12px 7px 7px rgb(16, 16, 16);">
//                             <span class="movie-list-item-title">${title} </span><span class="${getColor(vote_average)}">${vote_average}</span>
//                             <p class="movie-list-item-desc">${overview}</p>
//                             <button class="movie-list-item-button">WATCH</button>
//                             <button class="know-more" id=${id}>Know More</button>
//                             `
//         main[4].appendChild(movieEl)
//         // console.log(document.getElementById(id));
//         document.getElementById(id).addEventListener('click',()=>{
//             // console.log(document.getElementById(id))
//             openNav(movie)
//         })

//     })
// }


// */

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
// /*
// // console.log(main)
// let load=document.querySelector(".load-more")
// let btn_top=document.querySelector(".btn-top")
// load.addEventListener('click',()=>{
//     load.style.display='none'
//     btn_top.style.display='none'
//     // document.querySelector(".load-more-2").style.display='block'
//     main[5].style.display='block'



//     getMovies5(BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY+'&page=25');
//     function getMovies5(url) {
//         fetch(url).then(res => res.json()).then(data => {
//             //  console.log(data.results);
//             showMovies5(data.results);
//         })
//     }

//     function showMovies5(data) {

//         main[5].innerHTML = ''


//         data.forEach(movie => {
//             const { title, poster_path, vote_average, overview, id} = movie
//             const movieEl = document.createElement('div')
//             movieEl.classList.add('movie-list-item')
//             movieEl.innerHTML = `
//             <img src="${IMAGE_URL + poster_path}" alt="" class="movie-list-item-img" style=" box-shadow: 12px 7px 7px rgb(16, 16, 16);">
//                                 <span class="movie-list-item-title">${title} </span><span class="${getColor(vote_average)}">${vote_average}</span>
//                                 <p class="movie-list-item-desc">${overview}</p>
//                                 <button class="movie-list-item-button">WATCH</button>
//                                 <button class="know-more" id=${id}>Know More</button>
//                                 `
//             main[5].appendChild(movieEl)
//             // console.log(document.getElementById(id));
//             document.getElementById(id).addEventListener('click',()=>{
//                 console.log(document.getElementById(id))
//                 openNav(movie)
//             })

//         })
//     }

// })

// form.addEventListener('submit', (e) => {
//     e.preventDefault()

//     // document.querySelector('.toph').style.display = 'none'
//     // document.querySelector('.top-slide').style.display = 'none'
//     // document.getElementById('greet').style.display = 'none'
//     const searchTerm = search.value


//     document.querySelector('.titletop').innerHTML = 'Search Results for "' + searchTerm + '"';



//     if (searchTerm) {
//         getMovies(searchURL + '&query=' + searchTerm)
//         // console.log(getMovies(searchURL+'&query='+searchTerm))
//     }
//     document.querySelector('.title2').innerHTML = 'Some other related Results:';
// })


// */






// // import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
// // import { getDatabase, get, ref, child } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
// // import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";




// // const firebaseConfig = {
// //     apiKey: "AIzaSyDDk08AeWmX9bD-M2TolwaxsCFXJ8iAz_o",
// //     authDomain: "onestop-9cf30.firebaseapp.com",
// //     projectId: "onestop-9cf30",
// //     storageBucket: "onestop-9cf30.appspot.com",
// //     messagingSenderId: "122554524092",
// //     appId: "1:122554524092:web:51d369e706c59815510bb9"
// // };

// // // Initialize Firebase
// // const app = initializeApp(firebaseConfig);
// // const db = getDatabase();
// // const auth = getAuth(app);
// // const dbref = ref(db);


// // let UserCreds = JSON.parse(sessionStorage.getItem("user-creds"))
// // let UserInfo = JSON.parse(sessionStorage.getItem("user-info"))
// // console.log(UserCreds)
// // console.log(UserInfo)

// // // let watchLat = []


// // // document.getElementById(`2${movie.id}`).addEventListener('click',()=>{
// // //     console.log(movie.id)
// // // })


// // get(child(dbref, 'UsersAuthList/' + UserCreds.uid)).then((snapshot) => {
// //     if (snapshot.exists) {
// //         console.log(snapshot.val())
// //         sessionStorage.setItem("user-info", JSON.stringify({
// //             name: snapshot.val().name,
// //             creationTime: snapshot.val().crtTime,
// //             phnNo: snapshot.val().phnNo,
// //             watchLater: snapshot.val().watchLater

// //         }))
// //         console.log(snapshot.val().watchLater)



// //     }
// // })



// // console.log(typeof(sessionStorage.getItem("WatchLater")))




// const firebaseConfig = {
//     apiKey: "AIzaSyDDk08AeWmX9bD-M2TolwaxsCFXJ8iAz_o",
//     authDomain: "onestop-9cf30.firebaseapp.com",
//     projectId: "onestop-9cf30",
//     storageBucket: "onestop-9cf30.appspot.com",
//     messagingSenderId: "122554524092",
//     appId: "1:122554524092:web:51d369e706c59815510bb9"
// };




// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const db = getDatabase();
// const auth = getAuth(app);
// const dbref = ref(db);




const g = sessionStorage.getItem("watchLater")
console.log(g);
// g2.split(',').forEach(mov=>{
//     if(!g.split(',').includes(mov))
//         g.push(mov)
// })
// console.log(g)
// console.log(typeof(g))

if(g.length==0){
    const movieEl = document.createElement('div')
    movieEl.innerText = 'NO MOVIES RIGHT NOW'
    document.querySelector(".main-container").appendChild(movieEl)
}
// else{


const g1 = g.split(',')
console.log(g1);
sessionStorage.setItem("watchLater", g)
let x ="";

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
        else {
            getTV('https://api.themoviedb.org/3/search/tv?' + '&query=' + x + '&' + API_KEY)

            function getTV(url) {
                fetch(url).then(res => res.json()).then(data => {
                    // console.log(data.results);
                    showTV(data.results[0]);
                })
            }
        }
    })
}




function showTV(movie) {

    // main[3].innerHTML = ''

    // for (let i = 9; i < 20; i++) {
    // data.forEach(movie => {
    const { name, poster_path,backdrop_path, vote_average, overview, id } = movie
    const movieEl = document.createElement('div')
    movieEl.classList.add('movie-list-item')
    movieEl.style.height = '230px'
    movieEl.style.margin = '20px'
    cont.style.display = 'flex'
    cont.style.flexWrap = 'wrap'


    movieEl.innerHTML = `
        <img src="${IMAGE_URL + backdrop_path}" alt="images/nopic.jpeg" class="movie-list-item-img" style=" box-shadow: 12px 7px 7px rgb(16, 16, 16);">
                            <span class="movie-list-item-title">${name}</span> <span class="${getColor(vote_average)}" style="overflow:hidden">${vote_average}</span>
                            <button class="movie-list-item-button">WATCH</button>
                            <button class="know-more" id=${id}>Know More</button>
                            `
    cont.appendChild(movieEl)

    document.getElementById(id).addEventListener('click', () => {
        console.log(id)
        openNavTV(movie)
    })

}



let cont = document.querySelector(".main-container")

function showMovies(movie) {
    console.log(movie)
    // data.forEach(movie => {
    const { title, poster_path,backdrop_path, vote_average, id } = movie
    const movieEl = document.createElement('div')
    movieEl.classList.add('movie-list-item')
    movieEl.style.height = '230px'
    movieEl.style.margin = '20px'
    cont.style.display = 'flex'
    cont.style.flexWrap = 'wrap'
    

    movieEl.innerHTML = `
        <img src="${(backdrop_path) ? IMAGE_URL + backdrop_path : "images/noimg.webp"}" alt="" class="movie-list-item-img" style=" box-shadow: 12px 7px 7px rgb(16, 16, 16);">
                            <span class="movie-list-item-title">${title}</span><span class="${getColor(vote_average)}" style="overflow:hidden">${vote_average}</span>
                            <button class="movie-list-item-button">WATCH</button>
                            <button class="know-more" id=${id}>Know More</button>
                            <span class="watchLaterdesc">Add to Watch Later</span>
                            <button class="watchLater" id=2${movie.id}><i class="fa-solid fa-plus watchL"></i></button>
                            `
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
    // document.getElementById(`2${id}`).addEventListener('click', () => {
    //     console.log(title);
    //     getMoviesWL(searchURL + '&query=' + title)


    // }
    // )




}


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
        document.getElementById(`2${data.results[0].id}`).style.backgroundColor='pink'
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
        fetch((cast1+id+cast2)).then(res=>res.json()).then(cast=>{
            fetch((trans1+id+trans2)).then(res=>res.json()).then(transl=>{
            // console.log(cast.cast)
            let casting = []
            let castingImg = []
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
            document.getElementById("overlay-content").innerHTML = `<div class="origin-country" style="color:orange">Country of Origin: ${movie.origin_country}</div><h2 style="color:white; padding-bottom:10px">${movie.title}</h2><img src="${IMAGE_URL + movie.poster_path}" style="width:20vw;box-shadow: 12px 7px 7px black;"><h4 style="color: rgb(178, 212, 109); padding-top:20px ">Released on : ${movie.release_date}</h4><div style="font-size:17px;z-index:999; color: white; padding:35px 80px">${movie.overview}</div><div style="font-size:20px; color:black;background-color:yellowgreen;margin:0 60px;">${genreOv.join("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;")}</div><br><br><div style="color: gray; text-align:start; padding-left:80px ">Budget for the Film : &#36;${data.budget}</div><button class="watchlater-btn" id=1${id}  style="padding:10px; border-radius:8px">ADD TO WATCH LATER</button><div style="color:white; margin: 40px 70px; background-color: rgb(30, 30, 30); padding:16px 10px; border-radius:8px">Languages available : <br> ${transLang.join(' , ')}</div>`

        else if (movie.origin_country)
            document.getElementById("overlay-content").innerHTML = `<div class="origin-country" style="color:orange">Country of Origin: ${movie.origin_country}</div><h2 style="color:white; padding-bottom:10px">${movie.title}</h2><img src="${IMAGE_URL + movie.poster_path}" style="width:20vw;box-shadow: 12px 7px 7px black;"><div style="font-size:17px;z-index:999; color: white; padding:35px 80px">${movie.overview}</div><div style="font-size:20px; color:black;background-color:yellowgreen;margin:0 60px;">${genreOv.join("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;")}</div><br><br><div style="color: gray; text-align:start; padding-left:80px ">Budget for the Film : &#36;${data.budget}</div><button class="watchlater-btn" style="padding:10px; id=1${id} border-radius:8px">ADD TO WATCH LATER</button><div style="color:white; margin: 40px 70px; background-color: rgb(30, 30, 30); padding:16px 10px; border-radius:8px">Languages available : <br> ${transLang.join(' , ')}</div>`

        else if (movie.release_date)
            document.getElementById("overlay-content").innerHTML = `<h2 style="color:white; padding-bottom:10px">${movie.title}</h2><img src="${IMAGE_URL + movie.poster_path}" style="width:20vw;box-shadow: 12px 7px 7px black;"><h4 style="color: rgb(178, 212, 109); padding-top:20px ">Released on : ${movie.release_date}</h4><div style="font-size:17px;z-index:999; color: white; padding:35px 80px">${movie.overview}</div><div style="font-size:20px; color:gray;background-color:yellowgreen; color:black; margin:0 60px; border-radius:6px">${genreOv.join("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;")}</div><br><br><div style="color: gray; text-align:start; padding-left:80px ">Budget for the Film : &#36;${data.budget}</div><button class="watchlater-btn" id=1${id} style="padding:10px; border-radius:8px">ADD TO WATCH LATER</button><div style="color:white; margin: 40px 70px; background-color: rgb(30, 30, 30); padding:16px 10px; border-radius:8px">Languages available :<br> ${transLang.join(' , ')}</div>`


        else
            document.getElementById("overlay-content").innerHTML = `<h2 style="color:white; padding-bottom:10px">${movie.title}</h2><img src="${IMAGE_URL + movie.poster_path}" style="width:20vw;box-shadow: 12px 7px 7px black;""><div style="font-size:17px;z-index:999; color: white; padding:35px 80px">${movie.overview}</div><div style="font-size:20px; color:black;background-color:yellowgreen; margin:0 60px;">${genreOv.join("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;")}</div><br><br><div style="color: gray; text-align:start; padding-left:80px ">Budget for the Film : &#36;${data.budget}</div><button class="watchlater-btn" id=1${id} style="padding:10px; border-radius:8px">ADD TO WATCH LATER</button><div style="color:white; margin: 40px 70px; background-color: rgb(30, 30, 30); padding:16px 10px; border-radius:8px">Languages available : <br> ${transLang.join(' , ')}</div>`

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
        if(casting.length<15)
            div.style.justifyContent='center';
        div.style.overflow = "scroll";
        document.getElementById("overlay-content").innerHTML+='<p style="color:white; font-size:22px">CAST</p>'
        document.getElementById("overlay-content").appendChild(div)
        
        for(let i=0; i<=casting.length; i++){
            if(castingImg[i])
                div.innerHTML+=`<div style="padding:10px; color:white; width:110px"><img style="width:100px" src="${IMAGE_URL + castingImg[i]}">${casting[i]}</div>`;
            
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



    fetch((genresOvTV+id+genresOvTV2)).then(res => res.json()).then(data => {
      fetch((cast1TV+id+cast2TV)).then(res=>res.json()).then(cast=>{
          fetch((trans1TV+id+trans2TV)).then(res=>res.json()).then(transl=>{
        console.log(data);
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
          document.getElementById("overlay-content").innerHTML = `<div class="origin-country" style="color:orange">Country of Origin: ${movie.origin_country}</div><h2 style="color:white; padding-bottom:10px">${movie.name}</h2><img src="${IMAGE_URL + movie.poster_path}" style="width:20vw"><h4 style="color: rgb(178, 212, 109); ">Released on : ${movie.release_date}</h4><div style="font-size:17px;z-index:999; color: gray; padding:35px 80px">${movie.overview}</div><div style="font-size:20px; color:black;background-color:yellowgreen;margin:0 60px; border-radius:6px  ">${genreOv.join("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;")}</div><div style="color:white; margin: 40px 70px; background-color: rgb(30, 30, 30); padding:16px 10px; border-radius:8px">Languages available : <br> ${transLang.join(' , ')}</div>`

      else if (movie.origin_country)
          document.getElementById("overlay-content").innerHTML = `<div class="origin-country" style="color:orange">Country of Origin: ${movie.origin_country}</div><h2 style="color:white; padding-bottom:10px">${movie.name}</h2><img src="${IMAGE_URL + movie.poster_path}" style="width:20vw"><div style="font-size:17px;z-index:999; color: gray; padding:35px 80px">${movie.overview}</div><div style="font-size:20px; color:black;background-color:yellowgreen; margin:0 60px; border-radius:6px ">${genreOv.join("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;")}</div><div style="color:white; margin: 40px 70px; background-color: rgb(30, 30, 30); padding:16px 10px; border-radius:8px">Languages available : <br> ${transLang.join(' , ')}</div>`

      else if (movie.release_date)
          document.getElementById("overlay-content").innerHTML = `<h2 style="color:white; padding-bottom:10px">${movie.name}</h2><img src="${IMAGE_URL + movie.poster_path}" style="width:20vw"><h4 style="color: rgb(178, 212, 109); ">Released on : ${movie.release_date}</h4><div style="font-size:17px;z-index:999; color: gray; padding:35px 80px">${movie.overview}</div><div style="font-size:20px; color:black;background-color:yellowgreen; margin:0 60px; border-radius:6px ">${genreOv.join("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;")}</div><div style="color:white; margin: 40px 70px; background-color: rgb(30, 30, 30); padding:16px 10px; border-radius:8px">Languages available : <br> ${transLang.join(' , ')}</div>`

      else
          document.getElementById("overlay-content").innerHTML = `<h2 style="color:white; padding-bottom:10px">${movie.name}</h2><img src="${IMAGE_URL + movie.poster_path}" style="width:20vw"><div style="font-size:17px;z-index:999; color: gray; padding:35px 80px">${movie.overview}</div><div style="font-size:20px; color:black;background-color:yellowgreen; margin:0 60px; border-radius:6px ">${genreOv.join("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;")}</div><div style="color:white; margin: 40px 70px; background-color: rgb(30, 30, 30); padding:16px 10px; border-radius:8px">Languages available : <br> ${transLang.join(' , ')}</div>`

          if(castingImg){
          var div = document.createElement("div");
          // div.style.width = "100px";
          div.style.height = "250px";
          div.style.display = "flex";
          div.style.justifyContent='center';
          div.style.overflow = "scroll";
          document.getElementById("overlay-content").innerHTML+='<p style="color:white; font-size:22px">CAST</p>'
          document.getElementById("overlay-content").appendChild(div)
         
        
          for(let i=0; i<=casting.length; i++){
              if(castingImg[i])
              div.innerHTML+=`<div style="padding:10px;width:110px; color:white"><img style="width:100px" src="${IMAGE_URL + castingImg[i]}">${casting[i]}</div>`;
              
          }
        }

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
})
})
}







/* Close when someone clicks on the "x" symbol inside the overlay */
function closeNav() {
    document.getElementById("myNav").style.width = "0%";
}








