const input = document.querySelector("input");
const button = document.querySelector("#BuscarChamp");
const aboutChampion = document.querySelector("#aboutChamp");
const champContainer = document.querySelector("#champ-container");
const consejoChamps = document.querySelector("#tips");
const allyTips = document.querySelector("#allyTips");
const enemyTips = document.querySelector("#enemyTips");
const loreChamp = document.querySelector(".lore-champ");
const champ = document.querySelector("#champ");
const spellImgs = document.querySelector("#spells");
const passive = document.querySelector("#passive");

button.addEventListener("click", (e) => {
  e.preventDefault();
  obtenerChamp(input.value);
  clearResults();
});

function obtenerChamp(champion) {
  fetch(
    `http://ddragon.leagueoflegends.com/cdn/13.12.1/data/en_US/champion/${champion}.json`
  )
    .then((res) => res.json())
    .then((data) => {
      championLoL(data);
      tipsChamp(data);
      LoreChamp(data);
      champSpells(data);
    });
}
// Función para borrar los resultados anteriores
function clearResults() {
  champ.innerHTML = ""; // Limpia el contenido del champ
  allyTips.innerHTML = ""; // Limpia los consejos de aliados
  enemyTips.innerHTML = ""; // Limpia los consejos de enemigos
  loreChamp.innerHTML = ""; // Limpia la lore del champ
}

obtenerChamp();

function championLoL(champion) {
  // Agrega Imagen del cham buscado
  const img = document.createElement("img");
  champImg = input.value;

  img.src = `http://ddragon.leagueoflegends.com/cdn/13.13.1/img/champion/${champImg}.png`;

  // Pone el nombre del champ buscado
  const champName = document.createElement("h3");
  champName.textContent = champImg;

  // Crea un div y mete el nombre y la imagen dentro
  champ.appendChild(champName);
  champ.appendChild(img);

  console.log(champion);
}

function LoreChamp(data) {
  const lore = data.data[input.value].lore;
  loreChamp.innerHTML = lore;
}

function tipsChamp(data) {
  champtip = input.value;
  // Codigo mejorado por CHATGPT
  const allyTip = data.data[input.value].allytips;

  const allyTipTitle = document.createElement("h2");
  allyTipTitle.textContent = `Tips to play against ${input.value}`;
  allyTips.appendChild(allyTipTitle);

  for (const tip of allyTip) {
    const p = document.createElement("p");
    p.textContent = tip;
    allyTips.appendChild(p);
  }

  // Primera forma hecha por mi
  const enemyTip = data.data[input.value].enemytips;
  const enemyTipsValue = enemyTip.length;

  const enemyTipTitle = document.createElement("h2");
  enemyTipTitle.textContent = `Tips to play with ${input.value}`;
  enemyTips.appendChild(enemyTipTitle);

  for (let i = 0; i < enemyTipsValue; i++) {
    const p = document.createElement("p");
    p.textContent = enemyTip[i];
    enemyTips.appendChild(p);
  }
}

function champSpells(data) {
  const spellsArray = data.data[input.value].spells;

  for (const spell of spellsArray) {
    const fullValue = spell.image.full;
    const img = document.createElement("img");
    img.src = `https://ddragon.leagueoflegends.com/cdn/13.16.1/img/spell/${fullValue}`;
    spellImgs.appendChild(img);
    console.log(fullValue);
  }
  // const pasiveLocation = data.data[input.value].passive[0]; 
  const passiveImg = data.data[input.value].passive.image.full
  const passiveUrl = `http://ddragon.leagueoflegends.com/cdn/13.16.1/img/passive/${passiveImg}`

  const img = document.createElement("img");
  img.src = passiveUrl
  passive.appendChild(img);

  console.log(data.data[input.value].spells);
}
