const arrows = document.querySelectorAll(".arrow");
// console.log(arrows)
const movieLs = document.querySelectorAll(".movie-list")
// console.log(movieLs)

arrows.forEach((arrow, i) => {
    const itemNumber = movieLs[i].querySelectorAll("img").length;
    let click = 0;
    arrow.addEventListener("click", () => {
        click++;
        if (itemNumber - (4 + click) >= 0) {

            movieLs[i].style.transform = `translateX(${movieLs[i].computedStyleMap().get("transform")[0].x.value - 300}px)`;
        }
        else {
            movieLs[i].style.transform = "translateX(0)";
            click = 0;
        }
    })
})

const btn = document.querySelector('.btn-top')
// console.log(btn)
btn.addEventListener('click', () => {
    document.documentElement.scrollTop=0;
})