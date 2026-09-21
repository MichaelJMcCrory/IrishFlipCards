const categoryData = {
  "Days of the Week": [
    ["Monday", "Dé Luain", "day loo-in"], ["Tuesday", "Dé Máirt", "day mawrt"], ["Wednesday", "Dé Céadaoin", "day kay-duh-ween"],
    ["Thursday", "Déardaoin", "dayr-doon"], ["Friday", "Dé hAoine", "day aw-nyuh"], ["Saturday", "Dé Sathairn", "day sah-hurn"], ["Sunday", "Dé Domhnaigh", "day dohn-nee"]
  ],
  "Months of the Year": [
    ["January", "Eanáir", "eh-nawr"], ["February", "Feabhra", "fah-vrah"], ["March", "Márta", "mawr-tah"], ["April", "Aibreán", "ab-rahn"],
    ["May", "Bealtaine", "bal-tin-yeh"], ["June", "Meitheamh", "meh-hahv"], ["July", "Iúil", "ee-ool"], ["August", "Lúnasa", "loo-nah-sah"],
    ["September", "Meán Fómhair", "mayn ohv-ur"], ["October", "Deireadh Fómhair", "dair-uh foh-ur"], ["November", "Samhain", "sah-win"], ["December", "Nollaig", "nol-ig"]
  ],
  "Family Members": [
    ["Mother", "Máthair", "maw-hir"], ["Father", "Athair", "ah-hir"], ["Parents", "Tuismitheoirí", "tish-mih-kor-ee"],
    ["Brother", "Deartháir", "dahr-hawr"], ["Sister", "Deirfiúr", "der-fyoor"], ["Son", "Mac", "mok"], ["Daughter", "Iníon", "in-ee-un"],
    ["Grandmother", "Mamó", "mah-moh"], ["Grandfather", "Daideo", "dah-deh-oh"], ["Aunt", "Aintín", "an-cheen"], ["Uncle", "Uncail", "unk-uhl"]
  ]
};

const categories = [
  { name: "Days of the Week", description: "Laethanta na Seachtaine", action: () => showVocabulary("Days of the Week") },
  { name: "Months of the Year", description: "Míonna na Bliana", action: () => showVocabulary("Months of the Year") },
  { name: "Family Members", description: "Baill an Teaghlaigh", action: () => showVocabulary("Family Members") }
];

function setPageTitle(title) { document.getElementById("pageTitle").textContent = title; }

function renderCategories() {
  document.getElementById("topControls").style.display = "none";
  setPageTitle("Irish Flip Cards");
  const container = document.getElementById("mainContainer");
  container.innerHTML = "";
  categories.forEach(category => {
    const card = document.createElement("div");
    card.className = "category-card";
    card.innerHTML = `${category.name}<small>${category.description}</small>`;
    card.onclick = category.action;
    container.appendChild(card);
  });
}

function showVocabulary(categoryName) {
  document.getElementById("topControls").style.display = "none";
  setPageTitle(categoryName);
  const container = document.getElementById("mainContainer");
  container.innerHTML = "";

  const backBtn = document.createElement("button");
  backBtn.className = "back-btn";
  backBtn.textContent = "Back to Categories";
  backBtn.onclick = renderCategories;
  container.appendChild(backBtn);

  categoryData[categoryName].forEach(([english, irish, phonetic]) => {
    const card = document.createElement("div");
    card.className = "vocabulary-card";
    let revealed = false;
    const renderCard = () => {
      card.innerHTML = revealed
        ? `<strong>${english}</strong><br><br><span class="irish">${irish}</span><br><em>${phonetic}</em>`
        : `<strong>${english}</strong><br><br><span>Tap to reveal Irish</span>`;
    };
    card.onclick = () => { revealed = !revealed; renderCard(); };
    renderCard();
    container.appendChild(card);
  });
}

function toggleDarkMode() { document.body.classList.toggle("dark"); }
renderCategories();
