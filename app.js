let favourites = new Set();
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
  "Days of the Week": [["Monday", "Dé Luain", "day loo-in"], ["Tuesday", "Dé Máirt", "day mawrt"], ["Wednesday", "Dé Céadaoin", "day kay-duh-ween"], ["Thursday", "Déardaoin", "dayr-doon"], ["Friday", "Dé hAoine", "day aw-nyuh"], ["Saturday", "Dé Sathairn", "day sah-hurn"], ["Sunday", "Dé Domhnaigh", "day dohn-nee"]],
  "Months of the Year": [["January", "Eanáir", "eh-nawr"], ["February", "Feabhra", "fah-vrah"], ["March", "Márta", "mawr-tah"], ["April", "Aibreán", "ab-rahn"], ["May", "Bealtaine", "bal-tin-yeh"], ["June", "Meitheamh", "meh-hahv"], ["July", "Iúil", "ee-ool"], ["August", "Lúnasa", "loo-nah-sah"], ["September", "Meán Fómhair", "mayn ohv-ur"], ["October", "Deireadh Fómhair", "dair-uh foh-ur"], ["November", "Samhain", "sah-win"], ["December", "Nollaig", "nol-ig"]],
  "Family Members": [["Mother", "Máthair", "maw-hir"], ["Father", "Athair", "ah-hir"], ["Parents", "Tuismitheoirí", "tish-mih-kor-ee"], ["Brother", "Deartháir", "dahr-hawr"], ["Sister", "Deirfiúr", "der-fyoor"], ["Son", "Mac", "mok"], ["Daughter", "Iníon", "in-ee-un"], ["Grandmother", "Mamó", "mah-moh"], ["Grandfather", "Daideo", "dah-deh-oh"], ["Aunt", "Aintín", "an-cheen"], ["Uncle", "Uncail", "unk-uhl"]]
};

const categories = [
  { name: "Irregular Verbs", description: "English to Irish verbs and tenses", action: () => renderVerbList() },
  { name: "Days of the Week", description: "Laethanta na Seachtaine", action: () => showVocabulary("Days of the Week") },
  { name: "Months of the Year", description: "Míonna na Bliana", action: () => showVocabulary("Months of the Year") },
  { name: "Family Members", description: "Baill an Teaghlaigh", action: () => showVocabulary("Family Members") }
];

function setPageTitle(title) { document.getElementById("pageTitle").textContent = title; }
function getTenseClass(tense) { return tense.toLowerCase(); }
function addBackButton(container, text, action) { const button = document.createElement("button"); button.className = "back-btn"; button.textContent = text; button.onclick = action; container.appendChild(button); }

function renderCategories() {
  currentVerb = null;
  document.getElementById("topControls").style.display = "none";
  setPageTitle("Irish Flip Cards");
  const container = document.getElementById("mainContainer"); container.innerHTML = "";
  categories.forEach(category => { const card = document.createElement("div"); card.className = "category-card"; card.innerHTML = `${category.name}<small>${category.description}</small>`; card.onclick = category.action; container.appendChild(card); });
}

function renderVerbList() {
  currentVerb = null;
  document.getElementById("topControls").style.display = "flex";
  setPageTitle("Irregular Verbs");
  const container = document.getElementById("mainContainer"); container.innerHTML = "";
  addBackButton(container, "Back to Categories", renderCategories);
  Object.keys(data).forEach(verb => { const card = document.createElement("div"); card.className = "verb-card"; card.textContent = verb; card.onclick = () => showVerb(verb); container.appendChild(card); });
}

function showVerb(verb) {
  currentVerb = verb;
  const container = document.getElementById("mainContainer"); container.innerHTML = "";
  addBackButton(container, "Return to Verb List", renderVerbList);
  const row = document.createElement("div"); row.className = "tense-row";
  data[verb].forEach(t => {
    const card = document.createElement("div"); card.className = "tense-card"; let revealed = false;
    const render = () => { card.innerHTML = `<span class="tense-label ${getTenseClass(t.tense)}">${t.tense}</span><br><strong>${t.englishTense}</strong><br><br>${revealed ? `<em>${t.verbRoot}</em><br><br><strong>Question:</strong> ${t.question}<br><em>${t.phonQ}</em><br><br><strong>Action:</strong> ${t.action}<br><em>${t.phonA}</em><br><br><strong>Negative:</strong> ${t.negative}<br><em>${t.phonN}</em>` : "Tap to reveal"}`; };
    card.onclick = () => { revealed = !revealed; render(); }; render(); row.appendChild(card);
  });
  container.appendChild(row);
}

function showVocabulary(categoryName) {
  document.getElementById("topControls").style.display = "none"; setPageTitle(categoryName);
  const container = document.getElementById("mainContainer"); container.innerHTML = ""; addBackButton(container, "Back to Categories", renderCategories);
  categoryData[categoryName].forEach(([english, irish, phonetic]) => { const card = document.createElement("div"); card.className = "vocabulary-card"; let revealed = false; const render = () => { card.innerHTML = revealed ? `<strong>${english}</strong><br><br><span class="irish">${irish}</span><br><em>${phonetic}</em>` : `<strong>${english}</strong><br><br><span>Tap to reveal Irish</span>`; }; card.onclick = () => { revealed = !revealed; render(); }; render(); container.appendChild(card); });
}

function shuffleVerbs() { renderVerbList(); }
function toggleDarkMode() { document.body.classList.toggle("dark"); }

document.getElementById("searchInput").addEventListener("input", event => { if (document.getElementById("topControls").style.display === "none") return; const query = event.target.value.toLowerCase(); const container = document.getElementById("mainContainer"); container.innerHTML = ""; addBackButton(container, "Back to Categories", renderCategories); Object.keys(data).filter(v => v.toLowerCase().includes(query)).forEach(v => { const card = document.createElement("div"); card.className = "verb-card"; card.textContent = v; card.onclick = () => showVerb(v); container.appendChild(card); }); });

renderCategories();
