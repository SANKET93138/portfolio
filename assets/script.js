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
  { title: "Reel 3", id: "1mHYzUv5YS6Q1BEBqQZz69hK58uKP4eqj" }
];
const reelGrid = document.getElementById("reelGrid");
REELS.forEach(r => {
  const b = document.createElement("button");
  b.type = "button";
  b.className = "reel";
  b.setAttribute("aria-label", "Play " + r.title);
  b.innerHTML = '<img loading="lazy" alt="" src="https://drive.google.com/thumbnail?id=' + r.id + '&sz=w600">' +
    '<span class="p">&#9654;</span><span class="t"></span>';
  b.querySelector(".t").textContent = r.title;
  b.onclick = () => {
    b.classList.add("on");
    b.innerHTML = '<iframe src="https://drive.google.com/file/d/' + r.id + '/preview" title="' + r.title +
      '" allow="autoplay; fullscreen" allowfullscreen></iframe>';
  };
  reelGrid.appendChild(b);
});

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
