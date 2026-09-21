/* Additional navigation level and vocabulary categories. */
const categoryData = {
  "Days of the Week": [
    ["Monday", "Dé Luain"], ["Tuesday", "Dé Máirt"], ["Wednesday", "Dé Céadaoin"],
    ["Thursday", "Déardaoin"], ["Friday", "Dé hAoine"], ["Saturday", "Dé Sathairn"], ["Sunday", "Dé Domhnaigh"]
  ],
  "Months of the Year": [
    ["January", "Eanáir"], ["February", "Feabhra"], ["March", "Márta"], ["April", "Aibreán"],
    ["May", "Bealtaine"], ["June", "Meitheamh"], ["July", "Iúil"], ["August", "Lúnasa"],
    ["September", "Meán Fómhair"], ["October", "Deireadh Fómhair"], ["November", "Samhain"], ["December", "Nollaig"]
  ],
  "Family Members": [
    ["Mother", "Máthair"], ["Father", "Athair"], ["Parents", "Tuismitheoirí"],
    ["Brother", "Deartháir"], ["Sister", "Deirfiúr"], ["Son", "Mac"], ["Daughter", "Iníon"],
    ["Grandmother", "Mamó"], ["Grandfather", "Daideo"], ["Aunt", "Aintín"], ["Uncle", "Uncail"]
  ]
};

const categories = [
  { name: "Irregular Verbs", description: "English to Irish verbs and tenses", action: () => renderVerbList() },
  { name: "Days of the Week", description: "Laethanta na Seachtaine", action: () => showVocabulary("Days of the Week") },
  { name: "Months of the Year", description: "Míonna na Bliana", action: () => showVocabulary("Months of the Year") },
  { name: "Family Members", description: "Baill an Teaghlaigh", action: () => showVocabulary("Family Members") }
];

function setPageTitle(title) {
  document.getElementById("pageTitle").textContent = title;
}

function renderCategories() {
  currentVerb = null;
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

// Keep the existing irregular-verb experience as the first category.
const existingRenderVerbList = renderVerbList;
renderVerbList = function () {
  document.getElementById("topControls").style.display = "flex";
  setPageTitle("Irregular Verbs");
  existingRenderVerbList();
  const container = document.getElementById("mainContainer");
  const backBtn = document.createElement("button");
  backBtn.className = "back-btn";
  backBtn.textContent = "Back to Categories";
  backBtn.onclick = renderCategories;
  container.insertBefore(backBtn, container.firstChild);
};

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

  categoryData[categoryName].forEach(([english, irish]) => {
    const card = document.createElement("div");
    card.className = "vocabulary-card";
    let revealed = false;
    card.onclick = () => {
      revealed = !revealed;
      card.innerHTML = revealed
        ? `<strong>${english}</strong><br><br><span class="irish">${irish}</span>`
        : `<strong>${english}</strong><br><br><span>Tap to reveal Irish</span>`;
    };
    card.innerHTML = `<strong>${english}</strong><br><br><span>Tap to reveal Irish</span>`;
    container.appendChild(card);
  });
}

// app.js renders the verb list during its own initialisation; replace that view
// with the new top-level category page once both scripts have loaded.
renderCategories();
