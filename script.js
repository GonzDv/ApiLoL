const input = document.querySelector("input");
const button = document.querySelector("#BuscarChamp");
const aboutChampion = document.querySelector("#aboutChamp");
const champContainer = document.querySelector("#champ-container");
const consejoChamps = document.querySelector("#tips");
const allyTips = document.querySelector("#allyTips");
const enemyTips = document.querySelector("#enemyTips");
const loreChamp = document.querySelector(".lore-champ");
const champ = document.querySelector("#champ");


button.addEventListener("click", (e) => {
  e.preventDefault();
  obtenerChamp(input.value);
  clearResults();
});

function obtenerChamp(champion) {
  
  fetch(`http://ddragon.leagueoflegends.com/cdn/13.12.1/data/en_US/champion/${champion}.json`)
    .then((res) => res.json())
    .then((data) => {
      championLoL(data);
      tipsChamp(data);
      LoreChamp(data);
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

  img.src = `http://ddragon.leagueoflegends.com/cdn/13.13.1/img/champion/${champImg}.png`

// Pone el nombre del champ buscado
  const champName = document.createElement("h3");
  champName.textContent = champImg

  // Crea un div y mete el nombre y la imagen dentro
  champ.appendChild(champName);
  champ.appendChild(img);
  
  console.log(champion);
}

function LoreChamp(data) {
  const lore = data.data[input.value].lore;
  loreChamp.innerHTML = lore
}

function tipsChamp(data) {
  
  champtip = input.value;
  const allyTip = data.data[input.value].allytips;
  const allyTipsValue = allyTip.length;
  
  const allyTipTitle = document.createElement("h2");
  allyTipTitle.textContent = "Ally tip"
  allyTips.appendChild(allyTipTitle);

   for(let i = 0; i < allyTipsValue; i++){
    const p = document.createElement("p")
    p.textContent = allyTip[i];
    allyTips.appendChild(p);
   }
   
  const enemyTip = data.data[input.value].enemytips;
  const enemyTipsValue = enemyTip.length;

  const enemyTipTitle = document.createElement("h2");
  enemyTipTitle.textContent = "Enemy tip"
  enemyTips.appendChild(enemyTipTitle);

   for(let i = 0; i < enemyTipsValue; i++){
    const p = document.createElement("p")
    p.textContent = enemyTip[i];
    enemyTips.appendChild(p);
   }
   
}

