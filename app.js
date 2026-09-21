let favourites = new Set();
let verbs = [];
let currentVerb = null;

const data = {
  "To be": [
    { tense: "Past", englishTense: "Was / Were", verbRoot: "Bí", question: "Ar raibh tú?", action: "Bhí mé", negative: "Ní raibh mé", phonQ: "ar-rev", phonA: "vee", phonN: "nee rev", slug: "be-past" },
    { tense: "Present", englishTense: "Am / Is / Are", verbRoot: "Bí", question: "An bhfuil tú?", action: "Tá mé", negative: "Níl mé", phonQ: "ah-will", phonA: "tawh", phonN: "neel", slug: "be-present" },
    { tense: "Future", englishTense: "Will be", verbRoot: "Bí", question: "An mbeidh tú?", action: "Beidh mé", negative: "Ní bheidh mé", phonQ: "bay", phonA: "bay", phonN: "nee bay", slug: "be-future" }
  ],
  "To go": [
    { tense: "Past", englishTense: "Went", verbRoot: "Téigh", question: "An ndeachaigh tú?", action: "Chuaigh mé", negative: "Ní dheachaigh mé", phonQ: "nya-kwee", phonA: "koo-ee", phonN: "nee nya-kwee", slug: "go-past" },
    { tense: "Present", englishTense: "Go / Going", verbRoot: "Téigh", question: "An dtéann tú?", action: "Téim", negative: "Ní théim", phonQ: "day-unn", phonA: "chay-im", phonN: "nee chay-im", slug: "go-present" },
    { tense: "Future", englishTense: "Will go", verbRoot: "Téigh", question: "An rachaidh tú?", action: "Rachaidh mé", negative: "Ní rachaidh mé", phonQ: "rah-hee", phonA: "rah-hee", phonN: "nee rah-hee", slug: "go-future" }
  ],
  "To see": [
    { tense: "Past", englishTense: "Saw", verbRoot: "Feic", question: "An bhfaca tú?", action: "Chonaic mé", negative: "Ní fhaca mé", phonQ: "fak-ah", phonA: "khun-ick", phonN: "nee fak-ah", slug: "see-past" },
    { tense: "Present", englishTense: "See / Seeing", verbRoot: "Feic", question: "An bhfeiceann tú?", action: "Feicim", negative: "Ní fheicim", phonQ: "fek-unn", phonA: "fek-im", phonN: "nee fek-im", slug: "see-present" },
    { tense: "Future", englishTense: "Will see", verbRoot: "Feic", question: "An bhfeicfidh tú?", action: "Feicfidh mé", negative: "Ní bhfeicfidh mé", phonQ: "fek-hee", phonA: "fek-hee", phonN: "nee fek-hee", slug: "see-future" }
  ],
  "To do": [
    { tense: "Past", englishTense: "Did", verbRoot: "Déan", question: "An ndearna tú?", action: "Rinne mé", negative: "Ní dhearna mé", phonQ: "nyar-nah", phonA: "rin-yeh", phonN: "nee nyar-nah", slug: "do-past" },
    { tense: "Present", englishTense: "Do / Doing", verbRoot: "Déan", question: "An ndéanann tú?", action: "Déanaim", negative: "Ní dhéanaim", phonQ: "day-nun", phonA: "day-nim", phonN: "nee day-nim", slug: "do-present" },
    { tense: "Future", englishTense: "Will do", verbRoot: "Déan", question: "An ndéanfaidh tú?", action: "Déanfaidh mé", negative: "Ní dhéanfaidh mé", phonQ: "day-hee", phonA: "day-hee", phonN: "nee day-hee", slug: "do-future" }
  ],
  "To say": [
    { tense: "Past", englishTense: "Said", verbRoot: "Abair", question: "An ndúirt tú?", action: "Dúirt mé", negative: "Ní dúirt mé", phonQ: "doort", phonA: "doort", phonN: "nee doort", slug: "say-past" },
    { tense: "Present", englishTense: "Say / Saying", verbRoot: "Abair", question: "An ndeir tú?", action: "Deirim", negative: "Ní deirim", phonQ: "der", phonA: "der-im", phonN: "nee der-im", slug: "say-present" },
    { tense: "Future", englishTense: "Will say", verbRoot: "Abair", question: "An ndéarfaidh tú?", action: "Déarfaidh mé", negative: "Ní ndéarfaidh mé", phonQ: "dare-hee", phonA: "dare-hee", phonN: "nee dare-hee", slug: "say-future" }
  ]
};

const categoryData = {
  "Days of the Week": [
    ["Monday", "Dé Luain"],
    ["Tuesday", "Dé Máirt"],
    ["Wednesday", "Dé Céadaoin"],
    ["Thursday", "Déardaoin"],
    ["Friday", "Dé hAoine"],
    ["Saturday", "Dé Sathairn"],
    ["Sunday", "Dé Domhnaigh"]
  ],
  "Months of the Year": [
    ["January", "Eanáir"],
    ["February", "Feabhra"],
    ["March", "Márta"],
    ["April", "Aibreán"],
    ["May", "Bealtaine"],
    ["June", "Meitheamh"],
    ["July", "Iúil"],
    ["August", "Lúnasa"],
    ["September", "Meán Fómhair"],
    ["October", "Deireadh Fómhair"],
    ["November", "Samhain"],
    ["December", "Nollaig"]
  ],
  "Family Members": [
    ["Mother", "Máthair"],
    ["Father", "Athair"],
    ["Parents", "Tuismitheoirí"],
    ["Brother", "Deartháir"],
    ["Sister", "Deirfiúr"],
    ["Son", "Mac"],
    ["Daughter", "Iníon"],
    ["Grandmother", "Mamó"],
    ["Grandfather", "Daideo"],
    ["Aunt", "Aintín"],
    ["Uncle", "Uncail"]
  ]
};

const categories = [
  {
    name: "Irregular Verbs",
    description: "English to Irish verbs and tenses",
    action: () => renderVerbList()
  },
  {
    name: "Days of the Week",
    description: "Laethanta na Seachtaine",
    action: () => showVocabulary("Days of the Week")
  },
  {
    name: "Months of the Year",
    description: "Míonna na Bliana",
    action: () => showVocabulary("Months of the Year")
  },
  {
    name: "Family Members",
    description: "Baill an Teaghlaigh",
    action: () => showVocabulary("Family Members")
  }
];

verbs = Object.keys(data);

function setPageTitle(title) {
  const titleEl = document.getElementById("pageTitle");
  if (titleEl) titleEl.textContent = title;
}

function renderCategories() {
  currentVerb = null;
  const container = document.getElementById("mainContainer");
  const controls = document.getElementById("topControls");
  controls.style.display = "none";
  setPageTitle("Irish Flip Cards");

  container.innerHTML = "";

  categories.forEach((category) => {
    const card = document.createElement("div");
    card.className = "category-card";
    card.innerHTML = `${category.name}<small>${category.description}</small>`;
    card.onclick = category.action;
    container.appendChild(card);
  });
}

function getTenseClass(tense) {
  return tense.toLowerCase();
}

function renderVerbList() {
  currentVerb = null;
  const container = document.getElementById("mainContainer");
  const controls = document.getElementById("topControls");
  controls.style.display = "flex";
  setPageTitle("Irregular Verbs");

  container.innerHTML = "";

  const backBtn = document.createElement("button");
  backBtn.className = "back-btn";
  backBtn.textContent = "Back to Categories";
  backBtn.onclick = renderCategories;
  container.appendChild(backBtn);

  verbs.forEach((v) => {
    const card = document.createElement("div");
    card.className = "verb-card";
    card.textContent = v;
    card.onclick = () => showVerb(v);
    container.appendChild(card);
  });
}

function showVerb(v) {
  currentVerb = v;
  const container = document.getElementById("mainContainer");
  container.innerHTML = "";

  const backBtn = document.createElement("button");
  backBtn.className = "back-btn";
  backBtn.textContent = "Return to Verb List";
  backBtn.onclick = renderVerbList;
  container.appendChild(backBtn);

  const row = document.createElement("div");
  row.className = "tense-row";

  data[v].forEach((t) => {
    const card = document.createElement("div");
    card.className = "tense-card";

    let revealed = false;

    function renderContent() {
      card.innerHTML = `
        <span class="tense-label ${getTenseClass(t.tense)}">${t.tense}</span><br>
        <strong>${t.englishTense}</strong><br><br>

        ${
          revealed
            ? `
              <em>${t.verbRoot}</em><br><br>

              <strong>Question:</strong> ${t.question}<br>
              <em>${t.phonQ}</em><br><br>

              <strong>Action:</strong> ${t.action}<br>
              <em>${t.phonA}</em><br><br>

              <strong>Negative:</strong> ${t.negative}<br>
              <em>${t.phonN}</em><br><br>

              <button class="audio-btn" onclick="event.stopPropagation(); playAudio('${t.slug}-audio')">🔊</button>
              <button class="fav-btn" onclick="event.stopPropagation(); toggleFavourite('${t.slug}')">
                ${favourites.has(t.slug) ? "★" : "☆"}
              </button>
              <audio id="${t.slug}-audio" src="audio/${t.slug}.mp3"></audio>
            `
            : `Tap to reveal`
        }
      `;
    }

    card.onclick = () => {
      revealed = !revealed;
      renderContent();
    };

    renderContent();
    row.appendChild(card);
  });

  container.appendChild(row);
}

function showVocabulary(categoryName) {
  const container = document.getElementById("mainContainer");
  const controls = document.getElementById("topControls");
  controls.style.display = "none";
  setPageTitle(categoryName);

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

function shuffleVerbs() {
  verbs.sort(() => Math.random() - 0.5);
  renderVerbList();
}

function toggleDarkMode() {
  document.body.classList.toggle("dark");
}

function toggleFavourite(slug) {
  if (favourites.has(slug)) favourites.delete(slug);
  else favourites.add(slug);

  if (currentVerb) showVerb(currentVerb);
  else renderVerbList();
}

function playAudio(id) {
  const audio = document.getElementById(id);
  if (audio) audio.play();
}

document.getElementById("searchInput").addEventListener("input", () => {
  const q = document.getElementById("searchInput").value.trim().toLowerCase();
  const container = document.getElementById("mainContainer");
  const controls = document.getElementById("topControls");

  if (controls.style.display === "none") {
    return;
  }

  container.innerHTML = "";

  const backBtn = document.createElement("button");
  backBtn.className = "back-btn";
  backBtn.textContent = "Back to Categories";
  backBtn.onclick = renderCategories;
  container.appendChild(backBtn);

  if (!q) {
    verbs.forEach((v) => {
      const card = document.createElement("div");
      card.className = "verb-card";
      card.textContent = v;
      card.onclick = () => showVerb(v);
      container.appendChild(card);
    });
    return;
  }

  Object.keys(data)
    .filter((v) => v.toLowerCase().includes(q))
    .forEach((v) => {
      const card = document.createElement("div");
      card.className = "verb-card";
      card.textContent = v;
      card.onclick = () => showVerb(v);
      container.appendChild(card);
    });
});

renderCategories();
