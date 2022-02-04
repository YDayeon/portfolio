'use strict';
// Home greeting word moving
const homeTitle = document.querySelector('.home__title');

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
  navbarMenu.classList.remove('open');
  scrollIntoView(link);
});

// Navbar toggle button for small screen
const navbarToggleBtn = document.querySelector('.navbar__toggle-btn');
navbarToggleBtn.addEventListener('click', () => {
  navbarMenu.classList.toggle('open');
});

// Handle click on "contact me" button on home
const contactme = document.querySelector('.home__contact');
contactme.addEventListener('click', (event) => {
  scrollIntoView('#contact');
});

// Mouse Hover name to change the text
// Mouse Hover name : Emily
const kName = document.querySelector('#kName');
const eName = document.querySelector('.eName');
kName.addEventListener('mouseover', () => {
  kName.style.display = 'none';
  eName.classList.add('show');
});
eName.addEventListener('mouseout', () => {
  kName.style.display = 'inline-block';
  eName.classList.remove('show');
});

// Make home slowly fade to transparent as the window scroll down
const home = document.querySelector('.home__container');
const homeHeight = home.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
  home.style.opacity = 1 - window.scrollY / homeHeight;
});

// Show "arrow-up" button when scrolling down
const arrowUp = document.querySelector('.arrow-up');
document.addEventListener('scroll', () => {
  if (window.scrollY > homeHeight) {
    arrowUp.style.visibility = 'visible';
  } else {
    arrowUp.style.visibility = 'hidden';
  }
});

// Handle click on the "arrow-up" button
arrowUp.addEventListener('click', () => {
  scrollIntoView('#home');
});

// Projects
// const workBtnContainer = document.querySelector('.work__categories');
// const projectContainer = document.querySelector('.work__projects');
// const projects = document.querySelectorAll('.project');
// workBtnContainer.addEventListener('click', (e) => {
//   const filter = e.target.dataset.filter || e.target.parentNode.dataset.filter;
//   if (filter == null) {
//     return;
//   }

//   // Remove selection from the previous item and select the new one
//   const active = document.querySelector('.category__btn.selected');
//   active.classList.remove('selected');
//   const target =
//     e.target.nodeName === 'BUTTON' ? e.target : e.target.parentNode;
//   target.classList.add('selected');

//   projectContainer.classList.add('anim-out');
//   setTimeout(() => {
//     projects.forEach((project) => {
//       if (filter === '*' || filter === project.dataset.type) {
//         project.classList.remove('invisible');
//       } else {
//         project.classList.add('invisible');
//       }
//     });
//     projectContainer.classList.remove('anim-out');
//   }, 250);
// });

// 1. 모든 section 요소들과 메뉴 아이템들을 가지고 온다
// 2. IntersectionObserver를 이용해서 모든 section들을 관찰한다.
// 3. 보여지는 section에 해당하는 메뉴 아이템을 활성화 시킨다.
// the current position of section
const sectionIds = ['#home', '#about', '#skills', '#work', '#contact'];
const sections = sectionIds.map((id) => document.querySelector(id));
const navItems = sectionIds.map((id) =>
  document.querySelector(`[data-link="${id}"]`)
);

// function getIndexOfSection() {
//   const section = document
//     .elementFromPoint(window.innerWidth / 2, window.innerHeight * (2 / 3))
//     .closest('.section');
//   const idx = sectionIds.indexOf(`#${section.id}`);
//   return idx;
// }

let selectedNavIndex = 0;
let selectedNavItem = navItems[0];
function selectNavItem(selected) {
  selectedNavItem.classList.remove('selected');
  selectedNavItem = selected;
  selectedNavItem.classList.add('selected');
}

function scrollIntoView(selector) {
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView({ behavior: 'smooth' });
  selectNavItem(navItems[sectionIds.indexOf(selector)]);
}

const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.3,
};

const observerCallback = (entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting && entry.intersectionRatio > 0) {
      const index = sectionIds.indexOf(`#${entry.target.id}`);
      // 스크롤링이 아래로 되어서 페이지가 올라옴
      if (entry.boundingClientRect.y < 0) {
        selectedNavIndex = index + 1;
      } else {
        selectedNavIndex = index - 1;
      }
    }
  });
};

const observer = new IntersectionObserver(observerCallback, observerOptions);
sections.forEach((section) => observer.observe(section));
const skillValue = document.querySelectorAll('.skill__value');
window.addEventListener('wheel', () => {
  if (window.scrollY === 0) {
    selectedNavIndex = 0;
  } else if (
    Math.round(window.scrollY + window.innerHeight) ===
    document.body.clientHeight
  ) {
    selectedNavIndex = navItems.length - 1;
  }
  if (selectedNavIndex === 2) {
    skillValue.forEach((v) => (v.style.width = v.dataset.width));
  } else {
    skillValue.forEach((v) => (v.style.width = 0));
  }
  selectNavItem(navItems[selectedNavIndex]);
});

// F5
// window.addEventListener('load', () => {
//   selectNavItem(navItems[selectedNavIndex]);
// });
