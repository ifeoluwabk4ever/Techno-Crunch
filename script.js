topButton = document.querySelector('#topBtn');
dropLine = document.querySelector('.drop-line');
header = document.querySelector('header')
headerGear = document.querySelector('header');
let slides = document.querySelectorAll('.slide'),
    prevBtn = document.querySelector('.prev'),
    nextBtn = document.querySelector('.next'),
    indicators = document.querySelector('.indicators'),
    index = 0;

    window.onscroll = function() {
        scrollFunction();
    };
    function scrollFunction() {
        if (document.documentElement.scrollTop > 300) {
            topButton.style.display = "block";
            header.style.position = 'fixed'
            header.style.boxShadow = '4px 3px 2px #ccc'
        }else {
            topButton.style.display = "none";
            header.style.position = 'initial'

        };
    };

    dropLine.addEventListener('click', () => {
        document.querySelector('.dropdown').classList.toggle('pop-out');
    });
    dropdown = document.querySelector('.dropdown');
    dropdown.addEventListener('click', () => {
        dropdown.classList.toggle('pop-out');
    });

    function topFunction() {
        document.documentElement.scrollTop = 0;
    }
    document.querySelector('#copyright')
        .appendChild(document.createTextNode(new Date().getFullYear()));

    prevBtn.addEventListener('click', () => {
        prevSlide();
        updateCircleIndicator();
        resetTimer();
    });

    nextBtn.addEventListener('click', () => {
        nextSlide();
        updateCircleIndicator();
        resetTimer();
    });

    const changeSlide = () =>{
        for (let i=0; i< slides.length; i++) {
            slides[i].classList.remove('slideActive');
        };
        slides[index].classList.add('slideActive');
    };
    
    const nextSlide = () =>{
        if (index === slides.length - 1) {
            index = 0;
        } else {
            index++;
        };
        changeSlide();
    };
    const prevSlide = () => {
        if (index === 0) {
            index = slides.length - 1;
        } else {
            index--;
        };
        changeSlide();
    };

    const circleIndicator = () => {
        for ( let i = 0; i < slides.length; i++) {
            const div = document.createElement('div');
                div.innerHTML = i + 1;
                div.setAttribute('onclick','indicateSlide(this)');
                div.id = i;
                if (i === 0) {
                    div.className = 'indicatorActive';
                };
                indicators.appendChild(div);
        };
    };circleIndicator();

    const updateCircleIndicator = () => {
        for (let i = 0; i<indicators.children.length; i++) {
            indicators.children[i].classList.remove('indicatorActive');
        };
        indicators.children[index].classList.add('indicatorActive')
    };

    const indicateSlide = (e) => {
        index = e.id;
        changeSlide();
        updateCircleIndicator();
        resetTimer();
    };

    const autoPlay = () => {
        nextSlide();
        updateCircleIndicator();
    };

    const resetTimer = () => {
        clearInterval(timer);
        timer = setInterval(autoPlay, 10000);
    }

    let timer = setInterval(autoPlay,10000);
    
    async function getComments() {
        try {
            let promise = await fetch('https://jsonplaceholder.typicode.com/comments');
            let response = await promise.json();
            let data = response;

            var random = data[Math.floor(Math.random() * data.length)];

            output = `
                <ul class="list-group mb-3">
                    <li class="list-group-item">${random.body}</li>
                    <li class="list-group-item list-name">${random.name}</li>
                </ul>
            `;


            document.querySelector('.output').innerHTML = output;
        } catch (err) {
            console.log(err)
        }
    }
    setInterval(() => {
        getComments();
    }, 10000);