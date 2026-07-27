const phoneNumber = "8615253131891";

window.addEventListener("load", function () {
    const loader = document.getElementById("loader");
    if (loader) loader.style.display = "none";
});

function createSparkle(card) {
    const layer = card.querySelector(".shiny-layer");
    if (!layer) return;

    const sparkle = document.createElement("div");
    sparkle.classList.add("sparkle");
    sparkle.style.top = Math.random() * 100 + "%";
    sparkle.style.left = Math.random() * 100 + "%";

    layer.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 1000);
}

function flashScreen() {
    document.body.classList.add("screen-flash");
    setTimeout(() => document.body.classList.remove("screen-flash"), 400);
}

function flipCard(card) {
    card.classList.toggle("flip");
    createSparkle(card);
    createSparkle(card);
    flashScreen();
}
window.flipCard = flipCard;

function buyProduct(event, productName) {
    event.stopPropagation();
    const message = encodeURIComponent("Hi PokeDoc! I want to buy: " + productName);
    window.open("https://wa.me/" + phoneNumber + "?text=" + message, "_blank");
}
window.buyProduct = buyProduct;

const darkToggle = document.getElementById("darkToggle");
if (darkToggle) {
    darkToggle.addEventListener("click", function () {
        document.body.classList.toggle("dark");
    });
}

window.addEventListener("load", function () {
    const intro = document.getElementById("battleIntro");
    const textBox = document.getElementById("battleText");
    const blastoise = document.getElementById("introBlastoise");
    const flash = document.querySelector(".flash");

    if (!intro || !textBox || !blastoise || !flash) return;

    const messages = [
        "A wild customer appeared!",
        "Go! Blastoise!",
        "PokéDoc is ready for battle!"
    ];

    let i = 0;

    function showMessage() {
        if (i < messages.length) {
            textBox.innerText = messages[i];
            textBox.style.opacity = 1;

            setTimeout(() => {
                textBox.style.opacity = 0;
                i++;
                setTimeout(showMessage, 600);
            }, 1500);
        } else {
            startBattle();
        }
    }

    function startBattle() {
        flash.style.opacity = 1;

        setTimeout(() => {
            flash.style.opacity = 0;
            blastoise.style.opacity = 1;
            blastoise.style.transition = "all 1s ease";
            blastoise.style.bottom = "0px";

            setTimeout(() => {
                intro.style.transition = "opacity 1s ease";
                intro.style.opacity = 0;
                setTimeout(() => intro.remove(), 1000);
            }, 1500);
        }, 400);
    }

    setTimeout(showMessage, 800);
});

setInterval(() => {
    document.querySelectorAll(".card").forEach(card => {
        if (Math.random() > 0.6) {
            createSparkle(card);
        }
    });
}, 2000);