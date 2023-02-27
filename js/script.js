const header = document.querySelector(".section-header");
const mainNavigation = document.getElementById("header-main-navigation");
const menuLinks = document.querySelectorAll(".nav-list__item-link[data-goto]");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        console.log("intersected", entry.target.className);

        document.querySelectorAll(".nav-list__item-link").forEach((link) => {
          if (entry.target.className.includes(link.getAttribute("data-goto").replace(".", ""))) {
            link.classList.add("nav-list__item-link--active");
          } else {
            link.classList.remove("nav-list__item-link--active");
          }
        });
      }
    });
  },
  {
    threshold: 0.7,
  }
);

const onMenuLinkClick = (e) => {
  e.preventDefault();
  const menuLink = e.target;
  if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
    const gotoBlock = document.querySelector(menuLink.dataset.goto);
    const gotoBlockDistance = gotoBlock.getBoundingClientRect().top + window.scrollY - document.querySelector(".section-header").offsetHeight;
    window.scrollTo({
      top: gotoBlockDistance,
      behavior: "smooth",
    });

    resetNav();
  }
};

if (menuLinks.length) {
  menuLinks.forEach((menuLink) => {
    menuLink.addEventListener("click", onMenuLinkClick);
  });
}

document.querySelector(".faq-accordion").addEventListener("click", (event) => {
  if (event.target.closest(".faq-accordion__item")) {
    event.target.closest(".faq-accordion__item").classList.toggle("faq-accordion__item--active");
  }
});

document.querySelector(".btn-burger").addEventListener("click", () => {
  header.classList.toggle("section-header--active-nav");

  if (header.classList.contains("section-header--active-nav")) {
    hideScroll();
  } else {
    showScroll();
  }
});

document.querySelectorAll("section").forEach((section) => {
  observer.observe(section);
});

const getScrollBarWidth = () => {
  const outer = document.createElement("div");
  outer.style.position = "absolute";
  outer.style.top = "-9999px";
  outer.style.width = "50px";
  outer.style.height = "50px";
  outer.style.overflow = "scroll";
  outer.style.visibility = "hidden";

  document.body.appendChild(outer);
  const scrollWidth = outer.offsetWidth - outer.clientWidth;
  document.body.removeChild(outer);

  return scrollWidth;
};

const hideScroll = () => {
  const scrolWidth = getScrollBarWidth();
  mainNavigation.style.paddingRight = scrolWidth + "px";
  document.body.style.paddingRight = scrolWidth + "px";
  document.body.style.overflow = "hidden";
  document.querySelector(".btn-burger").classList.add("btn-burger--active");
};

const showScroll = () => {
  mainNavigation.style.paddingRight = "";
  document.body.style.paddingRight = "";
  document.body.style.overflow = "visible";
  document.querySelector(".btn-burger").classList.remove("btn-burger--active");
};

const resetNav = () => {
  showScroll();
  header.classList.remove("section-header--active-nav");
};

window.addEventListener("resize", resetNav);

new Swiper(".section-hero-image-swiper", {
  pagination: {
    el: ".section-hero-image .dots",
    clickable: true,
  },
});

new Swiper(".slider-wrapper-swiper", {
  loop: true,
  pagination: {
    el: ".section-blog .dots ",
    clickable: true,
  },
  navigation: {
    nextEl: ".blog-arrow--right",
    prevEl: ".blog-arrow--left",
  },
});

new Swiper(".quotes-swiper-container", {
  slidesPerView: "auto",
  spaceBetween: 50,
  loop: true,
  pagination: {
    el: ".section-quotes .dots",
    clickable: true,
  },
});
