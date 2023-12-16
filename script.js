var swiper = new Swiper(".swiper", {
    effect: "cards",
    grabCursor: true,
    initialSlide: 2,
    loop: true,
    rotate: true,
    mousewheel: {
    invert: false,
  },
});

var typed = new Typed(".auto-text",{
  strings:["Movies","Web Series","Drama"],
  typeSpeed:150 , 
  backSpeed:150,
  loop:true
})

