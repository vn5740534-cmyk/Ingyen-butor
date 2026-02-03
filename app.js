const translations = {
  hu: {
    subtitle: "Prémium kereső ingyenes bútorokra",
    heroTitle: "Találd meg a legjobb ingyenes bútorokat gyorsan",
    heroText: "Város + távolság szűrő, valós idejű demó megjelenítés, elegáns kártyás lista.",
    badge1: "HU/DE/EN",
    badge2: "Profi dizájn",
    badge3: "Gyors szűrés",
    statTitle: "Aktív találatok",
    statSub: "Legközelebbi",
    city: "Város",
    distance: "Max távolság (km)",
    keyword: "Kulcsszó",
    search: "Keresés",
    results: "Találatok",
    freeOnly: "Csak ingyenes",
    officialOnly: "Engedélyezett forrás",
    noticeTitle: "Adatforrás",
    noticeText: "Ez a demó statikus adatokkal fut. Éles adatforrás kizárólag hivatalosan engedélyezett módon integrálható."
  },
  de: {
    subtitle: "Premium-Suche für kostenlose Möbel",
    heroTitle: "Finde die besten kostenlosen Möbel im Handumdrehen",
    heroText: "Stadt + Distanz-Filter, Live-Demo-Ansicht, elegante Kartenliste.",
    badge1: "HU/DE/EN",
    badge2: "Profi-Design",
    badge3: "Schnelle Filter",
    statTitle: "Aktive Treffer",
    statSub: "Nächstes Angebot",
    city: "Stadt",
    distance: "Max. Entfernung (km)",
    keyword: "Stichwort",
    search: "Suchen",
    results: "Treffer",
    freeOnly: "Nur kostenlos",
    officialOnly: "Offizielle Quelle",
    noticeTitle: "Datenquelle",
    noticeText: "Diese Demo läuft mit statischen Daten. Live-Daten nur über offiziell erlaubte Quellen."
  },
  en: {
    subtitle: "Premium finder for free furniture",
    heroTitle: "Find the best free furniture fast",
    heroText: "City + distance filter, live demo view, elegant card list.",
    badge1: "HU/DE/EN",
    badge2: "Pro design",
    badge3: "Fast filtering",
    statTitle: "Active results",
    statSub: "Closest listing",
    city: "City",
    distance: "Max distance (km)",
    keyword: "Keyword",
    search: "Search",
    results: "Results",
    freeOnly: "Free only",
    officialOnly: "Official source",
    noticeTitle: "Data source",
    noticeText: "This demo uses static data. Live data can be integrated only via officially allowed sources."
  }
};

const listings = [
  {
    title: "Elegáns kanapé szett",
    city: "Berlin",
    distance: 4,
    description: "Kiváló állapotú, modern szövet kanapé. Azonnal vihető.",
    image: "https://images.unsplash.com/photo-1501045661006-fcebe0257c3f?q=80&w=800&auto=format&fit=crop",
    time: "Ma · 14:20"
  },
  {
    title: "Fa étkezőasztal 6 székkel",
    city: "Berlin",
    distance: 7,
    description: "Stabil, klasszikus fa asztal, kisebb karcokkal.",
    image: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=800&auto=format&fit=crop",
    time: "Ma · 10:12"
  },
  {
    title: "Minimalista polcrendszer",
    city: "Potsdam",
    distance: 22,
    description: "Fehér polc, moduláris elemekkel. Könnyen szállítható.",
    image: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=800&auto=format&fit=crop",
    time: "Tegnap · 19:40"
  },
  {
    title: "Ágykeret + matrac",
    city: "Berlin",
    distance: 12,
    description: "Queen size ágykeret, tiszta matraccal, azonnali elvitel.",
    image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=800&auto=format&fit=crop",
    time: "Ma · 08:02"
  }
];

const cardContainer = document.getElementById("cards");
const resultCount = document.getElementById("resultCount");
const closestResult = document.getElementById("closestResult");
const activeFilters = document.getElementById("activeFilters");
const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const distanceInput = document.getElementById("distanceInput");
const keywordInput = document.getElementById("keywordInput");

const renderCards = (data) => {
  cardContainer.innerHTML = "";
  data.forEach((item) => {
    const card = document.createElement("article");
    card.className = "card";
    card.innerHTML = `
      <img src="${item.image}" alt="${item.title}" />
      <div class="card-body">
        <div class="card-title">${item.title}</div>
        <div class="card-meta">${item.city} · ${item.distance} km · ${item.time}</div>
        <div class="card-desc">${item.description}</div>
      </div>
    `;
    cardContainer.appendChild(card);
  });

  resultCount.textContent = data.length;
  const closest = data.reduce((min, item) => (item.distance < min.distance ? item : min), data[0]);
  closestResult.textContent = closest ? `${closest.distance} km` : "-";
};

const applyFilters = () => {
  const city = cityInput.value.trim().toLowerCase();
  const maxDist = Number(distanceInput.value || 0);
  const keyword = keywordInput.value.trim().toLowerCase();

  const filtered = listings.filter((item) => {
    const cityMatch = !city || item.city.toLowerCase().includes(city);
    const distMatch = !maxDist || item.distance <= maxDist;
    const keywordMatch = !keyword || item.title.toLowerCase().includes(keyword) || item.description.toLowerCase().includes(keyword);
    return cityMatch && distMatch && keywordMatch;
  });

  activeFilters.textContent = `${cityInput.value || "Berlin"} · ${maxDist || 25} km`;
  renderCards(filtered);
};

const updateLanguage = (lang) => {
  const dict = translations[lang];
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (dict[key]) {
      el.textContent = dict[key];
    }
  });
  document.documentElement.lang = lang;
};

document.querySelectorAll(".lang-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".lang-btn").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    updateLanguage(btn.dataset.lang);
  });
});

searchBtn.addEventListener("click", applyFilters);

renderCards(listings);
updateLanguage("hu");
