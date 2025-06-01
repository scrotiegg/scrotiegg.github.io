document.addEventListener('DOMContentLoaded', function(){
    // ----- MENU LATERAL -----
    const tocbox = document.querySelector('.toc-box');
    var headers = document.querySelectorAll('.subject-name');

    function slugify(text) {
        return text.toLowerCase().replace(/[^\w]+/g, '-');
    }
    // Limpa o menu lateral antes de criar os itens (previne duplicação!)
    tocbox.innerHTML = "";
    headers.forEach((h) => {
        // Garante que cada header tem um id único
        let headerId = 'subject-' + slugify(h.textContent);
        h.id = headerId;

        let tocItem = document.createElement("li");
        tocItem.id = "toc-id-" + headerId;

        let itemLink = document.createElement("a");
        itemLink.classList.add("content-link");
        itemLink.textContent = h.textContent;
        itemLink.href = "#" + headerId; // agora tem href

        tocItem.append(itemLink);

        // Navegação suave ao clicar
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

        if (currHead != undefined){
            let tocLink = document.getElementById("toc-id-" + currHead.id);
            if (tocLink) tocLink.classList.add('active');
        }
    }, 200);

    // ----- BANNER ROTATIVO -----
    // Troque as imagens abaixo pelos caminhos certos dos seus banners
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
      '/assets/img/banner10.png'
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
      if (!carousel) return; // se não existir, não faz nada

      carousel.appendChild(bannerContainer);

      // Calcula a largura das imagens originais
      var imgs = bannerContainer.querySelectorAll('img');
      var totalWidth = 0;
      for (let i = 0; i < images.length; i++) {
        totalWidth += imgs[i].width + 2;
      }
      // Atualiza o keyframe dinamicamente para looping perfeito
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
});

document.addEventListener("DOMContentLoaded", function() {
  const toggle = document.getElementById('mobile-menu-toggle');
  const sidebar = document.getElementById('sidebar');

  toggle.addEventListener('click', function() {
    toggle.classList.toggle('active');
    sidebar.classList.toggle('open');
  });

document.addEventListener("DOMContentLoaded", function () {
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
});
