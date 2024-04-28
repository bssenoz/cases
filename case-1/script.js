document.getElementById("menu-toggle").addEventListener("click", function () {
    var menu = document.getElementById("menu");
    menu.classList.toggle("hidden");
});

function activeButton(button) {
    document.getElementById('button' + button).classList.add('shadow-md');
    document.getElementById('button' + button).classList.add('bg-white');
    document.getElementById('arrow' + button).classList.remove('hidden');
    disabledButtons(button)
}
function disabledButtons(button) {
    for (let i = 1; i <= 6; i++) {
        if (i !== button) {
            document.getElementById('button' + i).classList.remove('shadow-md');
            document.getElementById('button' + i).classList.remove('bg-white');
            document.getElementById('arrow' + i).classList.add('hidden');
        }
    }
}
function openCard(card) {
    document.getElementById('card' + card).classList.remove('hidden');
    document.getElementById('point' + card).classList.remove('circle-border');
    document.getElementById('point' + card).classList.add('bg-[#a3e635]');
    closeCard(card)
}

function closeCard(card) {
    for (let i = 1; i <= 4; i++) {
        if (i !== card) {
            console.log(i)
            document.getElementById('card' + i).classList.add('hidden');
            document.getElementById('point' + i).classList.add('circle-border');
            document.getElementById('point' + i).classList.remove('bg-[#a3e635]');
            console.log(document.getElementById('point' + i))
        }
    }
}


const swiper = new Swiper(".swiper", {
    loop: true,
    centeredSlides: true,
    spaceBetween: 30,
    slidesPerView: 3.5,
    breakpoints: {
        320: {
            slidesPerView: 1,
            spaceBetween: 20,
        },
        768: {
            slidesPerView: 2.2,
            spaceBetween: 20,
        },

        1025: {
            slidesPerView: 3.5,
            spaceBetween: 40,
        },
        1800: {
            slidesPerView: 4.5,
            spaceBetween: 40,
        },
        pagination: {
            el: ".swiper-pagination",
        },

        navigation: {
            nextEl: ".button-next",
            prevEl: ".button-prev",
        },

        scrollbar: {
            el: ".swiper-scrollbar",
        },
    },
});
function prevSlide() {
    swiper.slidePrev();
}

function nextSlide() {
    swiper.slideNext();
}