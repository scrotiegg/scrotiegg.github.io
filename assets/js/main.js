document.addEventListener('DOMContentLoaded', function(){
  // ----- MENU LATERAL -----
  const tocbox = document.querySelector('.toc-box');
  var headers = document.querySelectorAll('.subject-name');

  function slugify(text) {
    return text.toLowerCase().replace(/[^\w]+/g, '-');
  }

  tocbox.innerHTML = "";
  headers.forEach((h) => {
    let headerId = 'subject-' + slugify(h.textContent);
    h.id = headerId;

    let tocItem = document.createElement("li");
    tocItem.id = "toc-id-" + headerId;

    let itemLink = document.createElement("a");
    itemLink.classList.add("content-link");
    itemLink.textContent = h.textContent;
    itemLink.href = "#" + headerId;

    tocItem.append(itemLink);

    itemLink.addEventListener('click', function(e){
      e.preventDefault();
      h.scrollIntoView({ behavior: 'smooth' });
    });

    tocbox.append(tocItem);
  });

  var contents = document.querySelectorAll('.subject, .item');

  setInterval(function(){
    var scrollPos = document.documentElement.scrollTop;
    var wh = window.innerHeight;

    Array.from(tocbox.querySelectorAll('li')).forEach(function(tocItem){
      tocItem.classList.remove('active');
    });

    var currHead;
    Array.from(headers).forEach(function(h){
      let headPos = h.getBoundingClientRect().top + window.scrollY - wh/2;
      if (scrollPos > headPos) currHead = h;
    });

    Array.from(contents).forEach(function(c){
      let contentPos = c.getBoundingClientRect().top + window.scrollY - wh;
      if (c.classList.contains("appear")) return;
      if (scrollPos < contentPos) return;
      c.classList.add('appear');
    });

    if (currHead){
      let tocLink = document.getElementById("toc-id-" + currHead.id);
      if (tocLink) tocLink.classList.add('active');
    }
  }, 200);

  // ----- BANNER ROTATIVO -----
  var images = [
    '/assets/img/banner1.png',
    '/assets/img/banner2.png',
    '/assets/img/banner3.png',
    '/assets/img/banner4.png',
    '/assets/img/banner5.png',
    '/assets/img/banner6.png',
    '/assets/img/banner7.png',
    '/assets/img/banner8.png',
    '/assets/img/banner9.png',
    '/assets/img/banner10.png',
    '/assets/img/banner11.png',
    '/assets/img/banner12.png',
    '/assets/img/banner13.png',
    '/assets/img/banner14.png',
    '/assets/img/banner15.png',
    '/assets/img/banner16.png',
    '/assets/img/banner17.png',
    '/assets/img/banner18.png',
    '/assets/img/banner19.png',
    '/assets/img/banner20.png'
  ];

  var bannerContainer = document.createElement('div');
  bannerContainer.className = "banner-carousel-inner";
  images.concat(images).forEach(function(src) {
    var img = document.createElement('img');
    img.src = src;
    img.style.height = "100px";
    img.style.width = "auto";
    img.style.marginRight = "2px";
    bannerContainer.appendChild(img);
  });

  setTimeout(function() {
    var carousel = document.getElementById('banner-carousel');
    if (!carousel) return;

    carousel.appendChild(bannerContainer);

    var imgs = bannerContainer.querySelectorAll('img');
    var totalWidth = 0;
    for (let i = 0; i < images.length; i++) {
      totalWidth += imgs[i].width + 2;
    }

    var styleSheet = document.createElement('style');
    styleSheet.innerHTML = `
      @keyframes scroll-banner {
        0% { transform: translateX(0); }
        100% { transform: translateX(-${totalWidth}px); }
      }
      .banner-carousel-inner {
        display: flex;
        align-items: center;
        animation: scroll-banner ${Math.max(12, images.length * 1.2)}s linear infinite;
      }
      .banner-carousel {
        overflow: hidden;
        width: 100%;
        margin: 0.5rem 0;
      }
    `;
    document.head.appendChild(styleSheet);
    bannerContainer.style.animation = `scroll-banner ${Math.max(12, images.length * 1.2)}s linear infinite`;
  }, 250);

  // ----- PLAYERS DE ÁUDIO (Spotify, Audius, etc) -----
  const players = document.querySelectorAll(".album-player");
  players.forEach(function (el) {
    const src = el.getAttribute("data-src");
    if (src) {
      const iframe = document.createElement("iframe");
      iframe.src = src;
      iframe.width = "100%";
      iframe.height = "auto";
      iframe.frameBorder = "0";
      iframe.allow = "encrypted-media";
      iframe.style.borderRadius = "16px";
      el.appendChild(iframe);
    }
  });

  // ----- BOTÃO DE COMPRA INJETADO -----
  const buyLink = "https://rproof.tech/token/"; // personalize aqui

  const topZone = document.querySelector(".buy-button-zone");
  const finalZone = document.querySelector(".buy-button-zone.final");

  const buyButton = document.createElement("a");
  buyButton.href = buyLink;
  buyButton.className = "buy-button";
  buyButton.target = "_blank";
  buyButton.rel = "noopener";
  buyButton.innerHTML = "💸 buy $scrotiegg";

  const buyButtonClone = buyButton.cloneNode(true);
  if (topZone) topZone.appendChild(buyButton);
  if (finalZone) finalZone.appendChild(buyButtonClone);

  // ----- TOGGLE MENU MOBILE -----
  const toggle = document.getElementById("mobile-menu-toggle");
  const sidebar = document.getElementById("sidebar");

  toggle.addEventListener("click", function () {
    toggle.classList.toggle("active");
    sidebar.classList.toggle("open");
  });

  sidebar.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      toggle.classList.remove("active");
      sidebar.classList.remove("open");
    });
  });

  window.addEventListener("resize", function () {
    if (window.innerWidth > 767) {
      toggle.classList.remove("active");
      sidebar.classList.remove("open");
    }
  });

  // ----- SUBTÍTULO ROTATIVO -----
  const subtitles = [
    "no brains, just balls",
    "born to lose",
    "feel the shame",
    "dumb by design"
  ];
  const subtitleElement = document.getElementById("scrotiegg-subtitle");
  let index = 0;
  setInterval(() => {
    index = (index + 1) % subtitles.length;
    subtitleElement.style.opacity = 0;
    setTimeout(() => {
      subtitleElement.textContent = subtitles[index];
      subtitleElement.style.opacity = 1;
    }, 300);
  }, 5000);

  // ----- MENU DE IDIOMAS COM ANIMAÇÃO SARCÁSTICA -----
  const langButton = document.querySelector(".language-dropdown button");
  const langDropdown = document.querySelector(".language-dropdown");

  langButton.addEventListener("click", function (e) {
    e.stopPropagation();
    langDropdown.classList.toggle("open");
    langButton.setAttribute("aria-expanded", langDropdown.classList.contains("open"));
  });

  document.addEventListener("click", function () {
    langDropdown.classList.remove("open");
    langButton.setAttribute("aria-expanded", false);
  });

  const languageWords = [
    "still using Duolingo?",
    "scrotie no speakee",
    "translate this, loser",
    "welcome to illiteracy",
    "language level: egg",
    "stop pretending you read",
    "parlez-vous dumb?",
    "congrats, you clicked a button",
    "your teacher gave up",
    "eggscuse me?",
    "alphabet soup survivor",
    "fluent in emoji only",
    "404: fluency not found"
  ];

  let active = false;

  langButton.addEventListener("click", () => {
    if (active) return;
    active = true;

    const original = "languages";
    const target = languageWords[Math.floor(Math.random() * languageWords.length)];

    let scramble = original.split('');
    let step = 0;
    const maxSteps = 10;

    const interval = setInterval(() => {
      scramble = scramble.map(() =>
        String.fromCharCode(97 + Math.floor(Math.random() * 26))
      );
      langButton.textContent = scramble.join('');
      step++;

      if (step === maxSteps) {
        clearInterval(interval);
        langButton.textContent = target;
        setTimeout(() => {
          langButton.textContent = original;
          active = false;
        }, 2500);
      }
    }, 80);
  });
});
