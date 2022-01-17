'use strict';

//Make navbar transparent when it is on the top
const navbar = document.querySelector('#navbar');
const navbarHeight = navbar.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
  if (window.scrollY > navbarHeight) {
    navbar.classList.add('navbar--dark');
  } else {
    navbar.classList.remove('navbar--dark');
  }
});

// Handle scrolling when tapping on the navbar menu
const navbarMenu = document.querySelector('.navbar__menu');
navbarMenu.addEventListener('click', (event) => {
  const target = event.target;
  const link = target.dataset.link;
  if (link == null) {
    return;
  }
  console.log(event.target.dataset.link);
  const scrollTo = document.querySelector(link);
  scrollTo.scrollIntoView({ behavior: 'smooth' });
});

// const home = document.querySelector('#home');
// const about = document.querySelector('#about');
// const skills = document.querySelector('#skills');
// const work = document.querySelector('#work');
// const testimonials = document.querySelector('#testimonials');
// const contact = document.querySelector('#contact');

// const topHome = home.offsetTop;
// const topAbout = about.offsetTop;
// const topSkills = skills.offsetTop;
// const topWork = work.offsetTop;
// const topTestimonials = testimonials.offsetTop;
// const topContact = contact.offsetTop;

// function autoscroll() {
//   window.scroll({
//     top: topContact,
//     left: 0,
//     behavior: 'smooth',
//   });
// }
