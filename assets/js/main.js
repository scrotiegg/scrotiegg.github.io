document.addEventListener('DOMContentLoaded', function(){
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
});