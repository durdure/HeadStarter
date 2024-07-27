let words = document.querySelectorAll(".word");
words.forEach((word) => {
    let letters = word.textContent.split('');
    word.textContent = '';
    letters.forEach((letter) => {
        let span = document.createElement('span');
        span.textContent = letter;
        span.className = 'letter';
        word.append(span);
    });
});

let currentTextIndex = 0;
let maxTextIndex = words.length - 1;
words[currentTextIndex].style.opacity = 1;

let changeText = () => {
    let currentWord = words[currentTextIndex];
    let nextTextIndex = currentTextIndex === maxTextIndex ? 0 : currentTextIndex + 1;
    let nextWord = words[nextTextIndex];

    Array.from(currentWord.children).forEach((letter, i) => {
        setTimeout(() => {
            letter.className = 'letter out';
        }, i * 80);
    });

    nextWord.style.opacity = 1;
    Array.from(nextWord.children).forEach((letter, i) => {
        letter.className = 'letter behind';
        setTimeout(() => {
            letter.className = 'letter in';
        }, 340 + i * 80);
    });

    setTimeout(() => {
        currentWord.style.opacity = 0;
        currentTextIndex = nextTextIndex;
    }, 340 + nextWord.children.length * 80);
};

changeText();
setInterval(changeText, 4000);


// circle skill

const circles = document.querySelectorAll('.circle');
circles.forEach(elem=>{
    var dots = elem.getAttribute('data-dots');
    var marked = elem.getAttribute('data-percent');
    var percent = Math.floor((dots * marked) / 100);
    var points = "";
    var rotate = 0;
})


let menuLi = document.querySelectorAll('header ul li a');
let section = document.querySelectorAll('section');



function activeMenu() {
    let len = section.length;
    while(--len && window.scrollY + 100 < section[len].offsetTop) {}
    menuLi.forEach(sec => sec.classList.remove('active'));
    menuLi[len].classList.add('active');
}


activeMenu();
window.addEventListener('scroll', activeMenu);


const header = document.querySelector('header');
window.addEventListener("scroll", function() {
    header.classList.toggle('sticky', window.scrollY > 50);
});

let menuIcon = document.querySelector('#menu-icon');
let navlist  = document.querySelector('.navlist');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navlist.classList.toggle("open")
}

window.onscroll = () => {
   menuIcon.classList.remove("bx-x");
   menuIcon.classList.replace("bx-x", "bx-menu");
}