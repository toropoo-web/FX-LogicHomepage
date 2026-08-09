const GLOSSARY = {
  "UpDateStall": {
    title: "UpDateStall",
    body: "上位時間軸の値動きが、それまでの進行方向に対して失速・停滞した状態を捉えるための基準。本手法ではENTRY Signalではなく、次のTrade Scenarioを組み立て始める観測基準として使用します。",
    link: "../basis/",
    linkLabel: "基準ページへ"
  },
  "押し安値": {
    title: "押し安値",
    body: "上昇構造で、戻り高値更新後に確定する安値。切り上げ判定の核になる。",
    link: "../dow/",
    linkLabel: "Dowページへ"
  },
  "戻り高値": {
    title: "戻り高値",
    body: "押しのあとに更新される高値。次の安値切り上げ判断の前提になる。",
    link: "../dow/",
    linkLabel: "Dowページへ"
  },
  "Granville": {
    title: "Granville",
    body: "MAとの位置関係だけで機械判定せず、方向と形から組み立てる視点。",
    link: "../granville/",
    linkLabel: "Granvilleページへ"
  },
  "M15①②③": {
    title: "M15①②③",
    body: "①最初の推進 → ②押し → ③狙う推進。①を追わず②待ちで③を狙う。",
    link: "../wave/",
    linkLabel: "波動ページへ"
  },
  "安値切り上げ": {
    title: "安値切り上げ",
    body: "直近の押し安値より高い安値を形成し、上昇構造を強める動き。",
    link: "../dow/",
    linkLabel: "Dowページへ"
  },
  "Formation": {
    title: "Formation",
    body: "Double Bottomなど、値動きが示した形。見た目だけを根拠にせず、M5 Dow成立などとあわせて確認する。",
    link: "../logic/#block-06",
    linkLabel: "ロジック該当箇所へ"
  },
  "MTF": {
    title: "MTF",
    body: "Multiple Time Frame。上位〜下位の時間軸を組み合わせて現在地を読む。",
    link: "../logic/",
    linkLabel: "ロジックへ"
  },
  "H4 MA5 = H1 SMA20": {
    title: "H4 MA5 ≒ H1 SMA20",
    body: "時間軸換算で対応しやすいMA同士。同じ流れを別足で確認する目印。",
    link: "../granville/",
    linkLabel: "Granvilleページへ"
  },
  "M15 SMA20 ≒ H4 Candle": {
    title: "M15 SMA20 ≒ H4 Candle",
    body: "M15の波をH4 Candleの形として見る対応関係。見やすい方を使う。",
    link: "../wave/",
    linkLabel: "波動ページへ"
  },
  "M5 SMA20 ≒ H1 Candle": {
    title: "M5 SMA20 ≒ H1 Candle",
    body: "M5の波をH1 Candleとして見る対応関係。同じ値動きの別視点。",
    link: "../wave/",
    linkLabel: "波動ページへ"
  }
};

const NAV_ITEMS = [
  { href: "../logic/", label: "01｜ロジック（手法）公開", id: "logic" },
  { href: "../basis/", label: "02｜基準 ― H4 UpDateStall", id: "basis" },
  { href: "../dow/", label: "03｜Dow理論", id: "dow" },
  { href: "../granville/", label: "04｜Granville", id: "granville" },
  { href: "../wave/", label: "05｜波動", id: "wave" },
  { href: "../go-stop/", label: "06｜GO / STOP", id: "go-stop" },
  { href: "../fibonacci/", label: "07｜TakeProfit（利確考察）", id: "fibonacci" },
  { href: "../validation/", label: "08｜過去検証", id: "validation" },
  { href: "../trades/", label: "09｜Trade実例", id: "trades" },
  { href: "../faq/", label: "10｜FAQ / よくある質問", id: "faq" }
];

function resolveNavHref(id, isHome) {
  if (isHome) {
    if (id === "logic") return "logic/";
    return `${id}/`;
  }
  return NAV_ITEMS.find((n) => n.id === id)?.href || "../";
}

function initShell() {
  const pageId = document.body.dataset.page || "";
  const isHome = pageId === "home";
  const imgBase = isHome ? "Image/" : "../Image/";

  // Fix image paths if data-src-img used
  document.querySelectorAll("[data-img]").forEach((el) => {
    const name = el.getAttribute("data-img");
    const src = imgBase + name;
    if (el.tagName === "IMG") el.src = src;
    el.setAttribute("data-full", src);
  });

  // FAB
  const fab = document.createElement("div");
  fab.className = "fab-stack";
  fab.innerHTML = `
    <button type="button" class="fab" id="toTop" aria-label="ページトップ">↑</button>
    <button type="button" class="fab" id="openToc" aria-label="目次">☰</button>
  `;
  document.body.appendChild(fab);

  // Drawer
  const backdrop = document.createElement("div");
  backdrop.className = "drawer-backdrop";
  backdrop.id = "drawerBackdrop";
  const drawer = document.createElement("aside");
  drawer.className = "drawer";
  drawer.id = "drawer";
  drawer.innerHTML = `
    <div class="drawer-head">
      <h2>サイト目次</h2>
      <button type="button" class="drawer-close" id="closeToc" aria-label="閉じる">×</button>
    </div>
    <nav class="drawer-nav" id="drawerNav"></nav>
  `;
  document.body.appendChild(backdrop);
  document.body.appendChild(drawer);

  const nav = document.getElementById("drawerNav");
  if (isHome) {
    const homeLink = document.createElement("a");
    homeLink.href = "./";
    homeLink.textContent = "TOP｜目次";
    homeLink.className = "is-current";
    nav.appendChild(homeLink);
  } else {
    const homeLink = document.createElement("a");
    homeLink.href = "../";
    homeLink.textContent = "TOP｜目次";
    nav.appendChild(homeLink);
  }

  NAV_ITEMS.forEach((item) => {
    const a = document.createElement("a");
    a.href = isHome ? item.id + "/" : item.href;
    a.textContent = item.label;
    if (item.id === pageId) a.classList.add("is-current");
    nav.appendChild(a);
  });

  const openToc = () => {
    drawer.classList.add("is-open");
    backdrop.classList.add("is-open");
  };
  const closeToc = () => {
    drawer.classList.remove("is-open");
    backdrop.classList.remove("is-open");
  };

  document.getElementById("openToc").addEventListener("click", openToc);
  document.getElementById("closeToc").addEventListener("click", closeToc);
  backdrop.addEventListener("click", closeToc);
  document.getElementById("toTop").addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // Lightbox
  const modalBackdrop = document.createElement("div");
  modalBackdrop.className = "modal-backdrop";
  const modal = document.createElement("div");
  modal.className = "modal";
  modal.id = "imgModal";
  modal.innerHTML = `
    <div class="modal-panel">
      <button type="button" class="modal-close" id="closeModal" aria-label="閉じる">×</button>
      <img id="modalImg" alt="Chart拡大">
    </div>
  `;
  document.body.appendChild(modalBackdrop);
  document.body.appendChild(modal);

  const openModal = (src, alt) => {
    document.getElementById("modalImg").src = src;
    document.getElementById("modalImg").alt = alt || "Chart";
    modal.classList.add("is-open");
    modalBackdrop.classList.add("is-open");
  };
  const closeModal = () => {
    modal.classList.remove("is-open");
    modalBackdrop.classList.remove("is-open");
  };
  document.getElementById("closeModal").addEventListener("click", closeModal);
  modalBackdrop.addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  const openFromEl = (el) => {
    const img = el.tagName === "IMG" ? el : el.querySelector("img[data-full], img[data-img], img");
    const src =
      (img && (img.getAttribute("data-full") || img.getAttribute("src"))) ||
      el.getAttribute("data-full") ||
      el.getAttribute("src");
    const alt = (img && img.getAttribute("alt")) || el.getAttribute("alt") || "Chart";
    if (src) openModal(src, alt);
  };

  document.querySelectorAll(".chart-hit").forEach((el) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      openFromEl(el);
    });
  });

  document.querySelectorAll("[data-full]").forEach((el) => {
    if (el.closest(".chart-hit")) return;
    el.addEventListener("click", (e) => {
      e.preventDefault();
      openFromEl(el);
    });
  });

  // Glossary tip
  const tipBackdrop = document.createElement("div");
  tipBackdrop.className = "tip-backdrop";
  const tip = document.createElement("div");
  tip.className = "tip";
  tip.id = "termTip";
  tip.innerHTML = `
    <div class="tip-body">
      <button type="button" class="tip-close" id="closeTip" aria-label="閉じる" style="float:right">×</button>
      <h3 id="tipTitle"></h3>
      <p id="tipBody"></p>
      <a id="tipLink" href="#"></a>
    </div>
  `;
  document.body.appendChild(tipBackdrop);
  document.body.appendChild(tip);

  const closeTip = () => {
    tip.classList.remove("is-open");
    tipBackdrop.classList.remove("is-open");
  };
  document.getElementById("closeTip").addEventListener("click", closeTip);
  tipBackdrop.addEventListener("click", closeTip);

  document.querySelectorAll("[data-term]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const key = btn.getAttribute("data-term");
      const item = GLOSSARY[key];
      if (!item) return;
      document.getElementById("tipTitle").textContent = item.title;
      document.getElementById("tipBody").textContent = item.body;
      const link = document.getElementById("tipLink");
      if (item.link) {
        link.hidden = false;
        link.href = isHome ? item.link.replace("../", "") : item.link;
        link.textContent = item.linkLabel || "詳細へ";
      } else {
        link.hidden = true;
      }
      tip.classList.add("is-open");
      tipBackdrop.classList.add("is-open");
    });
  });

  // Tabs
  document.querySelectorAll("[data-tabs]").forEach((root) => {
    const buttons = root.querySelectorAll(".tab-btn");
    const panels = root.querySelectorAll(".tab-panel");
    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-tab");
        buttons.forEach((b) => b.classList.toggle("is-active", b === btn));
        panels.forEach((p) => {
          p.hidden = p.getAttribute("data-panel") !== id;
        });
      });
    });
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeToc();
      closeModal();
      closeTip();
    }
  });

  wireExternalCtas();
  initQuestionForm();
}

function initQuestionForm() {
  const form = document.getElementById("questionForm");
  if (!form) return;

  const status = document.getElementById("questionFormStatus");
  const endpointAttr = (form.getAttribute("data-formspree-endpoint") || "").trim();
  const endpoint = endpointAttr && endpointAttr !== "UNSET" ? endpointAttr : "";

  if (endpoint) {
    form.action = endpoint;
    form.method = "POST";
  } else {
    form.removeAttribute("action");
  }

  form.addEventListener("submit", (e) => {
    if (!form.reportValidity()) {
      e.preventDefault();
      return;
    }

    // Endpoint未設定時は実送信しない（架空URLへ投げない）
    if (!endpoint) {
      e.preventDefault();
      if (status) {
        status.hidden = false;
        status.textContent =
          "現在は送信設定の準備中です。必須項目の入力確認のみ可能です。";
      }
      return;
    }

    // Formspreeへ通常POST（Endpoint設定後は action 変更のみで接続）
    if (status) status.hidden = true;
  });
}

/** One-place URL config. Set a real URL to enable the matching CTA. */
const EXTERNAL_LINKS = {
  gogojungle: "https://www.gogojungle.co.jp/users/721448",
  newsletter: "UNSET",
  question: "UNSET"
};

function wireExternalCtas() {
  const pairs = [
    ["data-gogojungle-url", EXTERNAL_LINKS.gogojungle],
    ["data-newsletter", EXTERNAL_LINKS.newsletter],
    ["data-question-url", EXTERNAL_LINKS.question]
  ];

  pairs.forEach(([attr, url]) => {
    document.querySelectorAll(`[${attr}]`).forEach((el) => {
      el.setAttribute(attr, url);
      const pending = !url || url === "UNSET";
      if (pending) {
        el.classList.add("is-unset");
        el.setAttribute("aria-disabled", "true");
        if (el.tagName === "A") el.removeAttribute("href");
        if (!el.querySelector(".cta-pending")) {
          const hint = document.createElement("span");
          hint.className = "cta-pending";
          hint.textContent = "（準備中）";
          el.appendChild(hint);
        }
        el.addEventListener("click", (e) => e.preventDefault());
        return;
      }
      el.classList.remove("is-unset");
      el.removeAttribute("aria-disabled");
      const hint = el.querySelector(".cta-pending");
      if (hint) hint.remove();
      if (el.tagName === "A") {
        el.href = url;
        el.target = "_blank";
        el.rel = "noopener noreferrer";
      } else {
        el.addEventListener("click", () => {
          window.open(url, "_blank", "noopener,noreferrer");
        });
      }
    });
  });
}

document.addEventListener("DOMContentLoaded", initShell);
