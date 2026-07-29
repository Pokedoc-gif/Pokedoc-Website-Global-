const phoneNumber = "8615253131891";

const products = [
  { id: 1, category: "storage", name: "PSA UV Protective Case", subtitle: "Multiple Colours available", price: "R350 each", adminPrice: "R350", image: "https://uploads.onecompiler.io/44e4cjszf/44e49nb36/psa%20case.png" },
  { id: 2, category: "storage", name: "Pokemon Eevee GX Premium Eeveelutions Binder", subtitle: "480 slots", price: "R950 each", adminPrice: "R950", image: "https://moxiecardshop.com/cdn/shop/files/binders_0f2c28fc-e58f-40e7-9bb0-365d0fe30f8e.jpg?v=1711568122&width=1445" },
  { id: 3, category: "storage", name: "Pokemon Eevee GX Premium Umbreon Binder", subtitle: "480 slots", price: "R1500 each", adminPrice: "R1500", image: "https://i.ebayimg.com/images/g/OZsAAOSw7FRl9PvO/s-l1200.jpg" },
  { id: 4, category: "storage", name: "Graded Slab Binder", subtitle: "60 slots", price: "R1000 each", adminPrice: "R1000", image: "https://down-vn.img.susercontent.com/file/vn-11134207-7ras8-mct325v76zcrf6" },
  { id: 5, category: "accessories", name: "Pokemon Eevee GX Premium Eeveelutions Card Sleeves", subtitle: "64 Card Sleeves per pack", price: "R60 each", adminPrice: "R60", image: "https://i.ebayimg.com/images/g/RUIAAOSwboBmyJhT/s-l960.jpg" },
  { id: 6, category: "accessories", name: "Card Sleeves", subtitle: "100 Card Sleeves per pack", price: "R80 each", adminPrice: "R80", image: "https://songeniales.com/cdn/shop/files/22414.jpg?v=1776261226" },
  { id: 7, category: "accessories", name: "Pokemon Eeveelutions Card Frame Case CSGC (Promo card included)", subtitle: "Complete Set Discount R2100", price: "R600 each", adminPrice: "R600", image: "https://uploads.onecompiler.io/44e4cjszf/44peumstd/Pokemon%20Eeveelutions%20Card%20Frame%20Case%20CSGC%20(Promo%20card%20included).png" },
  { id: 8, category: "accessories", name: "Umbreon Display Card Frame", subtitle: "Frame only. Does not include cards<br>Out of Stock (Restock Pending)", price: "R150 each", adminPrice: "R150", image: "https://www.image2url.com/r2/default/images/1779091184907-f5aa4037-f6fc-41b2-bd53-e1a320f273c4.png" },
  { id: 9, category: "accessories", name: "Mew Display Card Frame", subtitle: "Frame only. Does not include cards<br>Out of Stock (Restock Pending)", price: "R150 each", adminPrice: "R150", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7VlZjnoBGYDVJEae_hZ3vPmwjadPXImpUDWiQ4Jbaiw&s" },
  { id: 10, category: "accessories", name: "Pokemon Accessories Metal Tin", subtitle: "Multiple Options available", price: "R60 each", adminPrice: "R60", image: "https://uploads.onecompiler.io/44e4cjszf/44e49nb36/Tins.png" },
  { id: 11, category: "accessories", name: "Limited Edition Pokemon Center Lapel Pin", subtitle: "Multiple Options available", price: "R150 each", adminPrice: "R150", image: "https://uploads.onecompiler.io/44e4cjszf/1785121428643/Limited%20Edition%20Pokemon%20Center%20Lapel%20Pin.jpg" },
  { id: 12, category: "games", name: "Pokemon Uno Card Game", subtitle: "Limited Stock available", price: "R100 each", adminPrice: "R100", image: "https://uploads.onecompiler.io/44e4cjszf/1785121301867/Pokemon%20Uno%20Card%20Game%20.png" },
  { id: 13, category: "games", name: "Pokemon Monopoly Board Game", subtitle: "Kanto and Johto available", price: "R550 each", adminPrice: "R550", image: "https://uploads.onecompiler.io/44e4cjszf/44peumstd/Pokemon%20Monopoly%20Board%20Game%20.png" },
  { id: 14, category: "boxes", name: "Marnie Trainer Collection Gift Tin", subtitle: "Out of Stock (Restock Pending)", price: "R2500 each", adminPrice: "R2500", image: "https://pg-cdn-a2.datacaciques.com/00/Mzc3MTUw/25/09/18/7r7z91sw87rr1vbg/8c53754adc5160a5.png" },
  { id: 15, category: "boxes", name: "151 Collection Figure Blind Box", subtitle: "Out of Stock (Restock Pending)", price: "R700 each", adminPrice: "R700", image: "https://i.ebayimg.com/images/g/mEUAAeSwxahp3Elj/s-l1200.jpg" },
  { id: 16, category: "boxes", name: "151 Puzzle Refrigerator Magnet Set", subtitle: "Out of Stock (Restock Pending)", price: "R500 each", adminPrice: "R500", image: "https://www.image2url.com/r2/default/images/1779091891978-fc0adbdd-e246-48f2-93b9-79b2f9083371.webp" },
  { id: 17, category: "boxes", name: "Pokemon 151 Starters Promo Frame", subtitle: "Limited stock available", price: "R500 each", adminPrice: "R500", image: "https://spoilsandloot.com/cdn/shop/files/SimplifiedChinesePokemonCollect151FirstPartnerDisplaySet-1.webp?v=1755290660" },
  { id: 18, category: "boxes", name: "Pokemon 30th Anniversary First Partner Illustration Collection", subtitle: "Limited stock available", price: "R500 each", adminPrice: "R500", image: "https://card-collective.com/cdn/shop/files/card-collective-pokemon-tcg-first-partner-illustration-vol1-pack.jpg?v=1771327019&width=1206" },
  { id: 19, category: "boxes", name: "Pokemon Mega Dream Booster Box M2a", subtitle: "Limited stock available", price: "R2500 each", adminPrice: "R2500", image: "https://fandom.tokyo/cdn/shop/files/BOX_61bf7856-745e-4ce4-a252-60f89a3325cc.jpg?v=1770361559&width=416" },
  { id: 20, category: "boxes", name: "151 Pikachu Exclusive Booster Box", subtitle: "Out of Stock (Restock Pending)", price: "R1500 each", adminPrice: "R1500", image: "https://nostalgiatcg.com/cdn/shop/files/Pokemon-151C-Booster-Box_977x841_77b000d3-d9d7-4da2-858d-fb25560f88e8.webp?v=1740693807" },
  { id: 21, category: "boxes", name: "151 Psyduck Exclusive Booster Box", subtitle: "Out of Stock (Restock Pending)", price: "R1500 each", adminPrice: "R1500", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZgUr11QQpEQSvdtf4g30wwpItKfmydAqgwyJqspjuRpkaA3JiypuU5Xc&s=10" },
  { id: 22, category: "boxes", name: "151 Gengar Exclusive Booster Box", subtitle: "Out of Stock (Restock Pending)", price: "R1500 each", adminPrice: "R1500", image: "https://cdn11.bigcommerce.com/s-pmynegjr7m/images/stencil/1280x1280/products/285916/1663939/collect_slim__57633.1769622711.jpg?c=1" },
  { id: 23, category: "boxes", name: "151 Double Pikachu Exclusive Booster Box", subtitle: "Out of Stock (Restock Pending)", price: "R1500 each", adminPrice: "R1500", image: "https://uploads.onecompiler.io/44e4cjszf/44p5qq6wr/151%20Pikachu%20Exclusive%20Booster%20Box.webp" },
  { id: 24, category: "boxes", name: "Ponyta 151 Booster Box CBB4C", subtitle: "Limited stock available", price: "R900 each", adminPrice: "R900", image: "https://cdn.corenexis.com/f/uhI2g1TTXSQ.webp" },
  { id: 25, category: "boxes", name: "Dragon Boat Festival Box", subtitle: "Limited stock available", price: "R800 each", adminPrice: "R800", image: "https://cdn.corenexis.com/f/Tdfi7b0p5wS.webp" },
  { id: 26, category: "cards", name: "2007 POKEMON JAPANESE DIAMOND & PEARL MOONLIT PURSUIT #164 UMBREON MOONLIT PURSUIT-1ST ED", subtitle: "NM-MT 8", price: "R1000 each", adminPrice: "R1000", image: "https://d1htnxwo4o0jhw.cloudfront.net/cert/147724107/small/iO2IpQtgYk2kQxwip8plzw.jpg" },
  { id: 27, category: "cards", name: "2001 POKEMON JAPANESE VS #070 BLAINE'S TYPHLOSION 1ST EDITION", subtitle: "NM-MT 8", price: "R2750 each", adminPrice: "R2750", image: "https://d1htnxwo4o0jhw.cloudfront.net/cert/149166092/small/XSr_Bs8Npk6FQDOXI97KHA.jpg" },
  { id: 28, category: "cards", name: "2021 POKEMON JAPANESE SWORD & SHIELD VMAX CLIMAX #244 FA/UMBREON V VMAX CLIMAX", subtitle: "MINT 9", price: "R1100 each", adminPrice: "R1000", image: "https://d1htnxwo4o0jhw.cloudfront.net/cert/143968867/small/xlnA3X4teU6khdSz-alW1Q.jpg" },
  { id: 29, category: "cards", name: "2006 POKEMON JAPANESE MIRACLE CRYSTAL #041 JIRACHI EX-HOLO MIRACLE CRYSTAL-1ST ED.", subtitle: "MINT 9", price: "R8150 each", adminPrice: "R8150", image: "https://d1htnxwo4o0jhw.cloudfront.net/cert/153643137/small/d3UuVOSpUUSdZVEBdUmZRg.jpg" },
  { id: 30, category: "cards", name: "2022 POKEMON GO JAPANESE #055 RADIANT EEVEE", subtitle: "MINT 9", price: "R550 each", adminPrice: "R550", image: "https://d1htnxwo4o0jhw.cloudfront.net/cert/136202182/small/w02LpO-VwU-XjeV8lfyhIw.jpg" },
  { id: 31, category: "cards", name: "2022 POKEMON JAPANESE SWORD & SHIELD VSTAR UNIVERSE #218 FA/RAIKOU V VSTAR UNIVERSE", subtitle: "MINT 9", price: "R750 each", adminPrice: "R750", image: "https://d1htnxwo4o0jhw.cloudfront.net/cert/150438104/small/eQ6UCjkrmkG4HzqXUGRJAA.jpg" },
  { id: 32, category: "cards", name: "2022 POKEMON JAPANESE SWORD & SHIELD PARADIGM TRIGGER #123 FA/LUGIA VSTAR PARADIGM TRIGGER-UR", subtitle: "MINT 9", price: "R900 each", adminPrice: "R900", image: "https://d1htnxwo4o0jhw.cloudfront.net/cert/143526558/small/iSFEGCzeKk2Asbwen6HfqQ.jpg" },
  { id: 33, category: "cards", name: "2023 POKEMON JAPANESE SV1V-VIOLET ex #089 BOMBIRDIER ART RARE", subtitle: "MINT 9", price: "R300 each", adminPrice: "R300", image: "https://d1htnxwo4o0jhw.cloudfront.net/cert/144232393/small/QnBRddh1xkOWaM2WqkvlPg.jpg" },
  { id: 34, category: "cards", name: "2009 POKEMON JAPANESE HEARTGOLD COLLECTION #022 TOTODILE-REV.FOIL HEARTGOLD COLL-1ST ED.", subtitle: "MINT 9", price: "R1200 each", adminPrice: "R1200", image: "https://d1htnxwo4o0jhw.cloudfront.net/cert/161268367/small/mfStrfO-jkmnzdmIDG3B3Q.jpg" },
  { id: 35, category: "cards", name: "2022 POKEMON JAPANESE SWORD & SHIELD VSTAR UNIVERSE #210 FA/LEAFEON VSTAR VSTAR UNIVERSE", subtitle: "MINT 9", price: "R1100 each", adminPrice: "R1100", image: "https://d1htnxwo4o0jhw.cloudfront.net/cert/146490361/small/5Cm7mxDscEmWhcPjlAveWg.jpg" },
  { id: 36, category: "cards", name: "2021 POKEMON JAPANESE SWORD & SHIELD VMAX CLIMAX #244 FA/UMBREON V VMAX CLIMAX", subtitle: "GEM MT 10", price: "R3000 each", adminPrice: "R3000", image: "https://d1htnxwo4o0jhw.cloudfront.net/cert/141400680/small/lfaMECsKLEuOT5PG2lwCAA.jpg" },
  { id: 37, category: "cards", name: "2022 POKEMON JAPANESE SWORD & SHIELD DARK PHANTASMA #072 FA/PARASECT DARK PHANTASMA", subtitle: "GEM MT 10", price: "R350 each", adminPrice: "R350", image: "https://d1htnxwo4o0jhw.cloudfront.net/cert/136384107/small/2BGp1GZgdUSMXdo0VMvWYA.jpg" },
  { id: 38, category: "cards", name: "2001 POKEMON JAPANESE EXPEDITION #030 TAUROS EXPEDITION-1ST EDITION", subtitle: "GEM MT 10", price: "R4600 each", adminPrice: "R4600", image: "https://d1htnxwo4o0jhw.cloudfront.net/cert/165648357/small/yAnI-u5tWE-hnyyHby2Bgg.jpg" },
  { id: 39, category: "cards", name: "2026 POKEMON JAPANESE NINJA SPINNER #115 MEGA FLOETTE EX", subtitle: "PRISTINE 10", price: "R2700 each", adminPrice: "R2700", image: "https://ccg-imaging-cgc-tradingcards-production.s3.amazonaws.com/17803004-214a-4fec-9844-b32a2281dc71/TN_CAR6170640-069_OBV.jpg" },
];

let activeCategory = "all";

function escapeAttr(value) {
  return String(value).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&#39;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

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

function renderProducts(category = "all") {
  const grid = document.getElementById("productGrid");
  if (!grid) return;

  const filtered = category === "all" ? products : products.filter(product => product.category === category);

  grid.innerHTML = filtered.map(product => `
    <div class="card" onclick="flipCard(this)">
      <div class="card-inner">
        <div class="card-front">
          <h3>${escapeAttr(product.name)}</h3>
          <img src="${escapeAttr(product.image)}" alt="${escapeAttr(product.name)}">
        </div>
        <div class="card-back">
          <h3>${escapeAttr(product.name)}</h3>
          <p>${product.subtitle}</p>
          <p class="price" id="display${product.id}">${product.price}</p>
          <button type="button" onclick="buyProduct(event,'${escapeAttr(product.name)}')">Buy via WhatsApp</button>
        </div>
      </div>
      <div class="shiny-layer"></div>
    </div>
  `).join("");
}

function renderAdminInputs() {
  const container = document.getElementById("priceInputs");
  if (!container) return;

  container.innerHTML = products.map(product => `
    <label>${escapeAttr(product.name)} Price:</label>
    <input type="text" id="price${product.id}" value="${escapeAttr(product.adminPrice)}">
    <br><br>
  `).join("");
}

function setActiveTab(category) {
  activeCategory = category;
  document.querySelectorAll(".category-tab").forEach(tab => {
    tab.classList.toggle("active", tab.dataset.category === category);
  });
  renderProducts(category);
  loadPrices();
}

const darkToggle = document.getElementById("darkToggle");
if (darkToggle) {
  darkToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
  });
}

const tabs = document.getElementById("categoryTabs");
if (tabs) {
  tabs.addEventListener("click", (event) => {
    const btn = event.target.closest(".category-tab");
    if (!btn) return;
    setActiveTab(btn.dataset.category);
  });
}

window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  if (loader) loader.style.display = "none";

  renderProducts(activeCategory);
  renderAdminInputs();

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
    if (Math.random() > 0.6) createSparkle(card);
  });
}, 2000);