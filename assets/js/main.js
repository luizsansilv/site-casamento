//Menu
document.addEventListener("DOMContentLoaded", () => {

    // Detecta o base path automaticamente para funcionar local e no GitHub Pages
    
    const isGitHubPages = window.location.hostname.includes("github.io");
    const isInPageFolder = window.location.pathname.includes("/pages/");

    const basePath = isGitHubPages ? "/site-casamento/" : isInPageFolder 
    ? "../" : "./";

    // MENU
    fetch(`${basePath}components/menu.html`)
        .then(res => {
            if (!res.ok) throw new Error("Erro ao carregar menu");
            return res.text();
        })
        .then(data => {
            document.getElementById("menu-container").innerHTML = data;

             // Corrige os links com o basePath correto
            document.querySelectorAll("#menu [data-path]").forEach(link => {
                link.setAttribute("href", basePath + link.getAttribute ("data-path"));
                });

            const toggle = document.getElementById("menu-toggle");
            const menu = document.getElementById("menu");

            if (toggle && menu) {
                toggle.addEventListener("click", () => {
                    menu.classList.toggle("active");
                });

                document.querySelectorAll("#menu a").forEach(link => {
                    link.addEventListener("click", () => {
                        menu.classList.remove("active");
                    });
                });
            }
        })
        .catch(err => console.error("Menu:", err));

    // FOOTER
    fetch(`${basePath}components/footer.html`)
        .then(res => {
            if (!res.ok) throw new Error("Erro ao carregar footer");
            return res.text();
        })
        .then(data => {
            document.getElementById("footer-container").innerHTML = data;
        })
        .catch(err => console.error("Footer:", err));

        

        fetch(`${basePath}components/countdown.html`)
            .then(res => res.text())
            .then(data => {
            document.getElementById("countdown-container").innerHTML = data;
            iniciarContagem(); // inicia só depois que o HTML foi injetado
  });

   

});

 function iniciarContagem() {
        const WEDDING = new Date("2028-03-20 16:00:00");

        function pad(n) { return String(Math.floor(n)).padStart(2, '0'); }

        function tick() {
            const diff = WEDDING - new Date();
            if (diff <= 0) {
                document.querySelector('.cr-grid').innerHTML = '<p>Hoje é o grande dia!</p>';
                return;
            }
                document.getElementById('cr-dias').textContent  = pad(diff / 86400000);
                document.getElementById('cr-horas').textContent = pad((diff % 86400000) / 3600000);
                document.getElementById('cr-min').textContent   = pad((diff % 3600000) / 60000);
                document.getElementById('cr-seg').textContent   = pad((diff % 60000) / 1000);
            }

            tick();
            setInterval(tick, 1000);
        }
