var swiper = new Swiper('.swiper-container', {
    navigation: {
        nextEl: '.next',
        prevEl: '.prev',
    },
    spaceBetween: 50,
    slidesPerView: 3,
    loop: true,
    breakpoints: {
        320: {
            slidesPerView: 1
        },
        992: {
            slidesPerView: 3
        }
    }
});
AOS.init({
    duration: 1000
});

