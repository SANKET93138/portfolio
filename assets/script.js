/* ===== My Video Projects: add or edit reels here. Each Google Drive file must be shared as "Anyone with the link".
   tag = small label on the card (2+ different tags create filter buttons). desc = one-line description.
   id = Google Drive file id.  yt = YouTube video id (use it instead of id; add vertical: true for a Short).
   youtube = full YouTube link for the "Watch on YouTube" button. duration = for example "1:30".
   published, client, software ["A","B"], categories ["A","B"] = shown in the Details window. Empty ones are hidden. ===== */
const REELS = [
  { title: "Reel 1", tag: "Reel", desc: "", id: "1B4PRrna5WDJBC6q9PrcMTQsHrAksfNyf", youtube: "", duration: "",
    published: "", client: "", software: [], categories: [] },
  { title: "Reel 2", tag: "Reel", desc: "", id: "1KJLljAnw7LwN8DYAIZ8KVOqT4zdg3IYc", youtube: "", duration: "",
    published: "", client: "", software: [], categories: [] },
  { title: "Reel 3", tag: "Reel", desc: "", id: "1mHYzUv5YS6Q1BEBqQZz69hK58uKP4eqj", youtube: "", duration: "",
    published: "", client: "", software: [], categories: [] },
  { title: "Reel 4", tag: "Reel", desc: "", id: "1gxqARfd9dSUfk0F_YWLv1LvcJxH7yCMG", youtube: "", duration: "",
    published: "", client: "", software: [], categories: [] },
  { title: "Will Kejriwal Win Again? In-Depth Analysis of Delhi’s 2025 Election", tag: "Educational", desc: "", yt: "3Rdd6gd7Nmo",
    youtube: "https://www.youtube.com/watch?v=3Rdd6gd7Nmo", duration: "", published: "January 8, 2025", client: "Talksonground",
    software: ["Adobe Premiere Pro", "Canva"], categories: ["Educational video"] }
];
(function () {
  const grid = document.getElementById("reelGrid");
  const thumbOf = r => r.yt ? "https://img.youtube.com/vi/" + r.yt + "/maxresdefault.jpg" : "https://drive.google.com/thumbnail?id=" + r.id + "&sz=w600";
  const fixImg = (im, r) => { im.onerror = () => { if (r.yt && im.src.includes("maxresdefault")) im.src = "https://img.youtube.com/vi/" + r.yt + "/hqdefault.jpg"; else im.remove(); }; };
  const svg = d => '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + d + '</svg>';
  const ICON = {
    clock: svg('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'),
    cal: svg('<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/>'),
    user: svg('<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/>'),
    ext: svg('<path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>')
  };
  const mk = (tag, cls, text) => { const e = document.createElement(tag); if (cls) e.className = cls; if (text) e.textContent = text; return e; };
  function chips(list) { const d = mk("div", "dchips"); list.forEach(t => d.appendChild(mk("span", "", t))); return d; }
  function section(title, node) { const s = mk("div", "dsec"); s.append(mk("h4", "", title), node); return s; }
  function row(icon, label, value) { const d = mk("div", "drow"); d.innerHTML = icon + "<span></span>"; d.querySelector("span").textContent = label + ": " + value; return d; }
  /* Builds the video page (player on top, details underneath) for REELS[i] */
  window.renderProject = function (i) {
    const r = REELS[i], player = document.getElementById("pvPlayer"), info = document.getElementById("pvInfo");
    const vertical = !r.yt || r.vertical;
    player.className = "pv-player" + (vertical ? " v" : "");
    player.innerHTML = r.yt
      ? '<iframe src="https://www.youtube.com/embed/' + r.yt + '?rel=0" title="' + r.title + '" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>'
      : '<iframe src="https://drive.google.com/file/d/' + r.id + '/preview" title="' + r.title + '" allow="autoplay; fullscreen" allowfullscreen></iframe>';
    info.innerHTML = "";
    const top = mk("div", "dtop");
    if (r.duration) { const d = mk("span", "dur"); d.innerHTML = ICON.clock + "<span></span>"; d.querySelector("span").textContent = r.duration; top.appendChild(d); }
    info.append(top, mk("h2", "pvtitle", r.title));
    if (r.desc) info.appendChild(mk("p", "dd", r.desc));
    const grid = mk("div", "dgrid"), box = mk("div");
    if (r.published) box.appendChild(row(ICON.cal, "Published", r.published));
    if (r.client) box.appendChild(row(ICON.user, "Client", r.client));
    if (box.children.length) grid.appendChild(section("Project Details", box));
    if (r.software && r.software.length) grid.appendChild(section("Software Used", chips(r.software)));
    if (grid.children.length) info.appendChild(grid);
    if (r.categories && r.categories.length) info.appendChild(section("Categories", chips(r.categories)));
    if (info.children.length < 3) info.appendChild(mk("p", "dnone", "Details for this video will be added soon."));
    if (r.youtube) {
      const a = mk("a", "ytbtn"); a.href = r.youtube; a.target = "_blank"; a.rel = "noopener";
      a.innerHTML = ICON.ext + "<span>Watch on YouTube</span>"; info.appendChild(a);
    }
  };
  const cards = REELS.map((r, i) => {
    const go = () => { location.hash = "video-" + i; };
    const c = document.createElement("article");
    c.className = "pcard";
    c.style.setProperty("--d", (0.1 + i * 0.15) + "s");
    const th = thumbOf(r);
    c.innerHTML = '<button type="button" class="thumb"><img class="bg" alt="" src="' + th + '"><img class="fg" alt="" src="' + th + '"><span class="p">&#9654;</span></button>' +
      '<div class="pbody"><span class="chip"></span><h3></h3><p></p><div class="pfoot"><span class="who"><i>SP</i>Sanket Parmar</span><button type="button" class="pill">Details</button></div></div>';
    if (r.duration) { const bd = document.createElement("span"); bd.className = "dbadge"; bd.textContent = r.duration; c.querySelector(".thumb").appendChild(bd); }
    c.querySelector(".chip").textContent = r.tag;
    c.querySelector("h3").textContent = r.title;
    const p = c.querySelector(".pbody p"); if (r.desc) p.textContent = r.desc; else p.remove();
    c.querySelector(".thumb").setAttribute("aria-label", "Watch " + r.title);
    c.querySelectorAll("img").forEach(im => fixImg(im, r));
    c.querySelector(".thumb").onclick = go; c.querySelector(".pill").onclick = go;
    grid.appendChild(c);
    return c;
  });
  const tags = [...new Set(REELS.map(r => r.tag))];
  if (tags.length > 1) {
    const box = document.getElementById("pills");
    ["All"].concat(tags).forEach((t, k) => {
      const b = document.createElement("button");
      b.type = "button"; b.textContent = t; if (!k) b.className = "on";
      b.onclick = () => { box.querySelectorAll("button").forEach(x => x.classList.toggle("on", x === b)); cards.forEach((c, i) => c.hidden = k && REELS[i].tag !== t); };
      box.appendChild(b);
    });
  }
  if ("IntersectionObserver" in window) {
    new IntersectionObserver((en, ob) => { if (en[0].isIntersecting) { grid.classList.add("in"); ob.disconnect(); } }, { threshold: 0.15 }).observe(grid);
  } else grid.classList.add("in");
})();

/* ===== Software strip. Optional: add official logo files in assets/logos/ and set "logo" ===== */
const TOOLS = [
  { name: "Adobe After Effects", abbr: "Ae", bg: "#00005B", fg: "#D291FF", logo: "assets/logos/ae.png" },
  { name: "Adobe Premiere Pro", abbr: "Pr", bg: "#00005B", fg: "#9999FF", logo: "assets/logos/pr.png" },
  { name: "Filmora", abbr: "Fm", bg: "#0B2E33", fg: "#2EE6C5", logo: "assets/logos/filmora.png" },
  { name: "VN Video Editor", abbr: "VN", bg: "#F4F4F4", fg: "#111111", logo: "assets/logos/vn.png" },
  { name: "DaVinci Resolve", abbr: "Dr", bg: "#1B1B1F", fg: "#F2B84B", logo: "assets/logos/resolve.png" }
];
const TDESC = { Ae: "Motion graphics and animation", Pr: "Video editing and post-production", Fm: "Quick, polished edits", VN: "Editing for short-form videos", Dr: "Video editing, color and finishing" };
const toolGrid = document.getElementById("toolGrid");
TOOLS.forEach((t, i) => {
  const c = document.createElement("div");
  c.className = "tcard stg";
  c.style.setProperty("--d", (i * 0.1) + "s");
  const b = document.createElement("span");
  b.className = "tb"; b.style.background = t.bg; b.style.color = t.fg; b.textContent = t.abbr;
  const img = new Image(); img.alt = "";
  img.onload = () => { b.textContent = ""; b.style.background = "transparent"; b.style.boxShadow = "none"; b.appendChild(img); };
  img.src = t.logo;
  const txt = document.createElement("div");
  txt.innerHTML = "<b></b><span></span>";
  txt.querySelector("b").textContent = t.name;
  txt.querySelector("span").textContent = TDESC[t.abbr] || "";
  c.append(b, txt);
  toolGrid.appendChild(c);
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

/* Sections fade up as they scroll into view */
(function () {
  const els = document.querySelectorAll("main > section:not(.hero):not(#projects):not(#projectView)");
  els.forEach(el => el.classList.add("rv"));
  if (!("IntersectionObserver" in window)) { els.forEach(el => el.classList.add("in")); return; }
  const io = new IntersectionObserver(en => en.forEach(x => { if (x.isIntersecting) { x.target.classList.add("in"); io.unobserve(x.target); } }), { threshold: 0.12 });
  els.forEach(el => io.observe(el));
})();

/* Hero: blue glow circle and bright grid follow the cursor */
(function () {
  const w = document.getElementById("heroWrap");
  if (!w) return;
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  let tx = w.clientWidth / 2, ty = 260, x = tx, y = ty;
  w.addEventListener("pointermove", e => { const r = w.getBoundingClientRect(); tx = e.clientX - r.left; ty = e.clientY - r.top; });
  (function tick() {
    x += (tx - x) * (reduce ? 1 : 0.15); y += (ty - y) * (reduce ? 1 : 0.15);
    w.style.setProperty("--mx", x + "px"); w.style.setProperty("--my", y + "px");
    requestAnimationFrame(tick);
  })();
})();

/* ===== Pages: Home, About, Skills, Contact (one file, switched by the # in the address) ===== */
(function () {
  const PAGES = ["home", "about", "skills", "contact"];
  function route() {
    const h = decodeURIComponent(location.hash.slice(1)) || "home";
    const el = document.getElementById(h);
    const m = /^video-(\d+)$/.exec(h);
    let page = PAGES.includes(h) ? h : (el && el.closest("[data-page]") ? el.closest("[data-page]").dataset.page : "home");
    if (m && REELS[+m[1]]) { window.renderProject(+m[1]); page = "project"; }
    if (page !== "project") document.getElementById("pvPlayer").innerHTML = "";
    document.body.dataset.now = page;
    document.querySelectorAll("[data-page]").forEach(n => { n.hidden = n.dataset.page !== page; });
    document.querySelectorAll(".nav nav a").forEach(a => a.classList.toggle("active", a.getAttribute("href") === "#" + (page === "project" ? "home" : page)));
    if (!PAGES.includes(h) && el) el.scrollIntoView(); else window.scrollTo({ top: 0, behavior: "instant" });
  }
  addEventListener("hashchange", route);
  route();
})();

/* Nav becomes a floating pill when you scroll down, and goes back to normal at the top */
(function () {
  const nav = document.querySelector(".nav");
  const set = () => nav.classList.toggle("float", scrollY > 40);
  addEventListener("scroll", set, { passive: true });
  set();
})();
