import '../styles/reset.scss';
import '../styles/mixins.scss'
import '../styles/style.scss';
import 'swiper/swiper.min.css';
import Swiper, { Navigation } from 'swiper';
Swiper.use(Navigation)

const checkboxes = {
    requirements: ["minimum", "recomended"],
    versions: ["standart", "limited"]
}
let isPlay = false;
const classes = {
    opened: 'opened',
    hidden: 'hidden',
    active: 'active'
}

const values = [    
    {
        price: 19.99,
        title: 'Standart Edition'
    },
    {
        price: 18.99,
        title: 'Standart Edition'
    },
    {
        price: 29.99,
        title: 'Deluxe Edition'
    }
]

const checkbox     = document.querySelectorAll('.checkbox');
const header       = document.querySelector('.header');
const menuLink     = document.querySelectorAll('.menu-link');
const menuButton   = document.querySelector('.header-menu__button');
const video        = document.getElementById('video');
const videoButton  = document.querySelector('.video-btn');
const faqItem      = document.querySelectorAll('.faq-item');
const section      = document.querySelectorAll('.section');
const buyButton    = document.querySelectorAll('.buy-button');
const modal        = document.querySelector('.modal');
const modalSubTitle   = document.querySelector('.modal-subtitle');
const modalPrice   = document.querySelector('.modal-total__price');
const modalClose   = document.querySelector('.modal-close')


const toggleMenu = () =>
{
    header.classList.toggle(classes.opened)
}

const scrollToSection = (event) =>
{
    event.preventDefault();
    const href = event.currentTarget.getAttribute('href');

    if(!href && !href.startWidth('#')) return

    const section = href.slice(1);
    const top = document.getElementById(section)?.offsetTop || 0;
    window.scrollTo({top, behavior: 'smooth'})
}

const formatValue = (value) => value < 10 ? `0${value}` : value;

const getTimerValues = (diff) => {
    return {
        seconds: (diff / 1000) % 60,
        minut: (diff / (1000 * 60)) % 60,
        hour: (diff / (1000 * 3600)) % 24,
        days: (diff / (1000 * 3600 * 24)) % 30
    }
}

const setTimerValues = (values) => {
    Object.entries(values).forEach(([key, value]) => {
        const timerValue = document.getElementById(key);
        timerValue.innerText = formatValue(Math.floor(value));  
    }) 
}

const startTimer = (date) => {
    const id = setInterval(() => {
        const diff = new Date(date).getTime() - new Date().getTime();
        if(diff < 0){
            clearInterval(id);
            return
        }
        setTimerValues(getTimerValues(diff))
    }, 1000)
}

const handleVideo = ({target}) => {
    const info = target.parentElement;
    isPlay = !isPlay;
    info.classList.toggle(classes.hidden, isPlay);
    target.innerText = isPlay ? 'Pause' : 'Play';
    isPlay ? video.play() : video.pause()
}

const handleChackbox = ({currentTarget: {checked, name}}) => {
    const {active} = classes;

    const value = checkboxes[name][Number(checked)];
    const list = document.getElementById(value);
    const tabs = document.querySelectorAll(`[data-${name}]`);
    const siblings = list.parentElement.children;
    console.log(siblings)
    for(const item of siblings) item.classList.remove(active);
    for(const tab of tabs){
        tab.classList.remove(active);
        tab.dataset[name] === value && tab.classList.add(active)
    }
    list.classList.add(active);
    console.log(value)
}

const initSwiper = () => {
    new Swiper(".swiper", {
        loop: true,
        slidesPerView: 3,
        spaceBetween: 30,
        initialSlide: 2,
        navigation:{
            nextEl: '.swiper-item__next',
            prevEl: '.swiper-item__prev'
        }
    })
}

const handleFaqItem = ({currentTarget: target}) => {
    target.classList.toggle(classes.opened)
    const isOpened = target.classList.contains(classes.opened);
    const height = target.querySelector('p').clientHeight;
    const contant = target.querySelector('.faq-item__content');
    contant.style.height = `${isOpened ? height : 0}px`
}

initSwiper()

const handleScroll = () => {
    const {scrollY: y, innerHeight: h} = window;
    section.forEach((section) => {
        if(y > section.offsetTop - h / 1.5) section.classList.remove(classes.hidden)
    })
}

const handleBuyButton = ({currentTarget: target}) => {
    const { value } = target.dataset;
    if(!value) return;
    const {price, title} = values[value];
    modalSubTitle.innerText = title;
    modalPrice.innerText = `${price}`;
    modal.classList.add(classes.opened)
}

const closeModal = () => modal.classList.remove(classes.opened)

window.addEventListener('scroll', handleScroll)

startTimer("February 28, 2023 23:59:59")
menuButton.addEventListener('click', toggleMenu);
videoButton.addEventListener('click', handleVideo);
menuLink.forEach((link) => link.addEventListener('click', scrollToSection));
checkbox.forEach((box) => box.addEventListener('click', handleChackbox));
faqItem.forEach((item) => item.addEventListener('click', handleFaqItem));
buyButton.forEach((btn) => btn.addEventListener('click', handleBuyButton));
modalClose.addEventListener('click', closeModal)