/* ===== Edit your work here =====
   Add a YouTube video ID (the part after v= in the link) to show a real video.
   Optionally add "link" (e.g. an Instagram reel URL) if it isn't on YouTube. */
const WORK = [
  { title: "Shreyansh Goyal", note: "YouTube and Instagram edits for a creator with 100,000+ YouTube subscribers.", color: "#3FB8AF", youtube: "" },
  { title: "Ockypocky", note: "Video content for an English-learning company.", color: "#F2B84B", youtube: "" },
  { title: "Talksonground", note: "Video content for a client channel.", color: "#F2B84B", youtube: "" },
  { title: "Hai Baat Zara Si", note: "Edits for Prerna Kumar’s content.", color: "#3FB8AF", youtube: "" },
  { title: "Kidzz Toons", note: "Independent animation project, managed from concept to delivery.", color: "#E8708A", youtube: "" }
];

/* ===== Reels: add or rename here. Each Google Drive file must be shared as "Anyone with the link" ===== */
const REELS = [
  { title: "Reel 1", id: "1B4PRrna5WDJBC6q9PrcMTQsHrAksfNyf" },
  { title: "Reel 2", id: "1KJLljAnw7LwN8DYAIZ8KVOqT4zdg3IYc" },
  { title: "Reel 3", id: "1mHYzUv5YS6Q1BEBqQZz69hK58uKP4eqj" },
  { title: "Reel 4", id: "1gxqARfd9dSUfk0F_YWLv1LvcJxH7yCMG" }
];
const reelGrid = document.getElementById("reelGrid");
REELS.forEach((r, i) => {
  const b = document.createElement("button");
  b.type = "button";
  b.className = "reel";
  b.style.setProperty("--d", (0.1 + i * 0.15) + "s");
  b.setAttribute("aria-label", "Play " + r.title);
  b.innerHTML = '<img loading="lazy" alt="" src="https://drive.google.com/thumbnail?id=' + r.id + '&sz=w600">' +
    '<span class="p">&#9654;</span><span class="t"></span>';
  b.querySelector(".t").textContent = r.title;
  b.querySelector("img").onerror = e => e.target.remove();
  b.onclick = () => {
    b.classList.add("on");
    b.innerHTML = '<iframe src="https://drive.google.com/file/d/' + r.id + '/preview" title="' + r.title +
      '" allow="autoplay; fullscreen" allowfullscreen></iframe>';
  };
  reelGrid.appendChild(b);
});
/* Reels rise up one by one when the section scrolls into view */
if ("IntersectionObserver" in window) {
  new IntersectionObserver((en, ob) => { if (en[0].isIntersecting) { reelGrid.classList.add("in"); ob.disconnect(); } }, { threshold: 0.2 }).observe(reelGrid);
} else reelGrid.classList.add("in");

/* ===== Software strip. Optional: add official logo files in assets/logos/ and set "logo" ===== */
const TOOLS = [
  { name: "Adobe After Effects", abbr: "Ae", bg: "#00005B", fg: "#D291FF", logo: "assets/logos/ae.png" },
  { name: "Adobe Premiere Pro", abbr: "Pr", bg: "#00005B", fg: "#9999FF", logo: "assets/logos/pr.png" },
  { name: "Filmora", abbr: "Fm", bg: "#0B2E33", fg: "#2EE6C5", logo: "assets/logos/filmora.png" },
  { name: "VN Video Editor", abbr: "VN", bg: "#F4F4F4", fg: "#111111", logo: "assets/logos/vn.png" },
  { name: "DaVinci Resolve", abbr: "Dr", bg: "#1B1B1F", fg: "#F2B84B", logo: "assets/logos/resolve.png" }
];
const orbit = document.getElementById("orbit"), orbitName = document.getElementById("orbitName");
const badges = TOOLS.map((t, i) => {
  const badge = document.createElement("span");
  badge.className = "badge";
  badge.setAttribute("role", "img");
  badge.setAttribute("aria-label", t.name);
  badge.style.setProperty("--a", (i * 360 / TOOLS.length) + "deg");
  badge.style.background = t.bg;
  badge.style.color = t.fg;
  badge.textContent = t.abbr;
  const img = new Image();
  img.alt = "";
  img.onload = () => { badge.textContent = ""; badge.style.background = "transparent"; badge.style.boxShadow = "none"; badge.appendChild(img); };
  img.src = t.logo;
  orbit.appendChild(badge);
  return badge;
});
/* Show the tools one by one around the circle, hold, then replay */
function playOrbit(i) {
  if (i < TOOLS.length) {
    badges[i].classList.add("on");
    orbitName.textContent = TOOLS[i].name;
    setTimeout(() => playOrbit(i + 1), 1000);
  } else {
    setTimeout(() => {
      badges.forEach(b => b.classList.remove("on"));
      orbitName.textContent = "";
      setTimeout(() => playOrbit(0), 700);
    }, 3000);
  }
}
if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
  badges.forEach(b => b.classList.add("on"));
} else {
  playOrbit(0);
}

const grid = document.getElementById("workGrid");
WORK.forEach(w => {
  const card = document.createElement("article");
  card.className = "card";
  const media = document.createElement(w.youtube || w.link ? "button" : "div");
  media.className = "media" + (w.youtube || w.link ? " play" : "");
  media.style.background = w.color;
  if (w.youtube) {
    media.type = "button";
    media.setAttribute("aria-label", "Play " + w.title);
    media.innerHTML = '<img loading="lazy" alt="" src="https://img.youtube.com/vi/' + w.youtube + '/hqdefault.jpg">';
    media.onclick = () => {
      media.outerHTML = '<div class="media"><iframe src="https://www.youtube-nocookie.com/embed/' + w.youtube +
        '?autoplay=1" title="' + w.title + '" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe></div>';
    };
  } else if (w.link) {
    media.onclick = () => window.open(w.link, "_blank", "noopener");
    media.textContent = w.title;
  } else {
    media.textContent = w.title;
  }
  card.appendChild(media);
  card.insertAdjacentHTML("beforeend", "<div class='body'><h3></h3><p></p></div>");
  card.querySelector("h3").textContent = w.title;
  card.querySelector("p").textContent = w.note;
  grid.appendChild(card);
});

/* Timeline playhead follows page scroll */
const head = document.getElementById("playhead"), tc = document.getElementById("timecode");
const tl = head.parentElement;
function moveHead() {
  const max = document.documentElement.scrollHeight - innerHeight;
  const p = max > 0 ? scrollY / max : 0;
  const laneLeft = parseFloat(getComputedStyle(head).left);
  const w = tl.clientWidth - laneLeft - 16;
  head.style.transform = "translateX(" + (p * w) + "px)";
  const s = Math.round(p * 60);
  tc.textContent = "00:" + String(s).padStart(2, "0");
}
addEventListener("scroll", moveHead, { passive: true });
addEventListener("resize", moveHead);
moveHead();

document.getElementById("year").textContent = new Date().getFullYear();

/* ===== Client brief form: opens WhatsApp with the details filled in ===== */
const WHATSAPP_NUMBER = "919313816021"; /* country code + number, no + or spaces */
(function () {
  const f = document.getElementById("briefForm"), type = document.getElementById("pType"),
    wrap = document.getElementById("otherWrap"), other = document.getElementById("pOther"),
    err = document.getElementById("formErr");
  type.addEventListener("change", () => {
    const isOther = type.value === "Other";
    wrap.hidden = !isOther;
    other.required = isOther;
    if (isOther) other.focus();
  });
  f.addEventListener("submit", e => {
    e.preventDefault();
    const v = id => document.getElementById(id).value.trim();
    const isOther = type.value === "Other";
    let msg = "";
    if (!v("cName")) msg = "Enter your name.";
    else if (!v("pName")) msg = "Enter the project name.";
    else if (!type.value) msg = "Choose a project type.";
    else if (isOther && !v("pOther")) msg = "Tell me which type of video it is.";
    else if (!v("pBudget")) msg = "Enter your budget for this video.";
    err.hidden = !msg;
    err.textContent = msg;
    if (msg) return;
    const text = "Hi Sanket, I found you through your portfolio.\n\n" +
      "Name: " + v("cName") + "\n" +
      "Project name: " + v("pName") + "\n" +
      "Project type: " + (isOther ? "Other – " + v("pOther") : type.value) + "\n" +
      "Budget: ₹" + v("pBudget").replace(/^₹\s*/, "");
    window.open("https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(text), "_blank", "noopener");
  });
})();
