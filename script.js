const phoneNumber = "8615253131891";
const adminPassword = "brolyss5";
let adminLoggedIn = false;

/* Loader */
window.addEventListener("load",function(){
    document.getElementById("loader").style.display="none";
});

/* Flip Card */
function flipCard(card) {
    card.classList.toggle("flip");

    createSparkle(card);
    createSparkle(card);

    document.body.style.animation = "screenFlash 0.4s ease";
    setTimeout(() => {
        document.body.style.animation = "";
    }, 400);
}

/* Sound */
function playPokedexSound(){
    const audioCtx = new (window.AudioContext||window.webkitAudioContext)();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    oscillator.type="square";
    oscillator.frequency.setValueAtTime(600,audioCtx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(1200,audioCtx.currentTime+0.15);

    gainNode.gain.setValueAtTime(0.2,audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001,audioCtx.currentTime+0.2);

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    oscillator.start();
    oscillator.stop(audioCtx.currentTime+0.2);
}

/* WhatsApp */
function buyProduct(event,productName){
    event.stopPropagation();
    let message=encodeURIComponent("Hi PokeDoc! I want to buy: "+productName);
    window.open("https://wa.me/"+8615253131891+"?text="+message,"_blank");
}

/* Dark Mode */
document.getElementById("darkToggle").addEventListener("click",function(){
    document.body.classList.toggle("dark");
});

/* Admin */
function toggleAdmin(){
    const panel=document.getElementById("adminPanel");

    if(adminLoggedIn){
        panel.style.display=panel.style.display==="none"?"block":"none";
        return;
    }

    let pass=prompt("Enter Admin Password:");

    if(pass===adminPassword){
        adminLoggedIn=true;
        panel.style.display="block";
    }else{
        alert("Incorrect password");
    }
}

function updatePrices(){
    document.getElementById("display1").innerText=
        document.getElementById("price1").value+" each";

    document.getElementById("display2").innerText=
        document.getElementById("price2").value+" each";

    document.getElementById("display3").innerText=
        document.getElementById("price3").value+" each";

    document.getElementById("display4").innerText=
        document.getElementById("price4").value+" each";
}

/* ===== CLASSIC BATTLE INTRO ===== */

window.addEventListener("load", function () {

    const intro = document.getElementById("battleIntro");
    const textBox = document.getElementById("battleText");
    const blastoise = document.getElementById("introBlastoise");
    const flash = document.querySelector(".flash");

    const messages = [
        "A wild customer appeared!",
        "Go! Blastoise!",
        "PokéDoc is ready for battle!"
    ];

    let i = 0;

    function showMessage(){
        if(i < messages.length){
            textBox.innerText = messages[i];
            textBox.style.opacity = 1;

            setTimeout(()=>{
                textBox.style.opacity = 0;
                i++;
                setTimeout(showMessage,600);
            },1500);
        } else {
            startBattle();
        }
    }

    function startBattle(){
        flash.style.opacity = 1;

        setTimeout(()=>{
            flash.style.opacity = 0;

            blastoise.style.opacity = 1;
            blastoise.style.transition = "all 1s ease";
            blastoise.style.bottom = "0px";

            setTimeout(()=>{
                intro.style.opacity = 0;
                intro.style.transition = "opacity 1s ease";
                setTimeout(()=>{
                    intro.remove();
                },1000);
            },1500);

        },400);
    }

    setTimeout(showMessage,800);
});

/* ===== SHINY SPARKLE SYSTEM ===== */

function createSparkle(card){
    const layer = card.querySelector(".shiny-layer");
    if(!layer) return;

    const sparkle = document.createElement("div");
    sparkle.classList.add("sparkle");

    sparkle.style.top = Math.random()*100 + "%";
    sparkle.style.left = Math.random()*100 + "%";

    layer.appendChild(sparkle);

    setTimeout(()=>{
        sparkle.remove();
    },1000);
}

/* Random sparkle every few seconds */
setInterval(()=>{
    document.querySelectorAll(".card").forEach(card=>{
        if(Math.random() > 0.6){
            createSparkle(card);
        }
    });
},2000);