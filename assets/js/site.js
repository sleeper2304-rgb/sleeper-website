import { getProjectContent, siteMeta, teamMembers, works } from "./data.js";

const body = document.body;
const depth = Number(body.dataset.depth || 0);
const page = body.dataset.page || "home";
const prefix = depth > 0 ? "../".repeat(depth) : "./";
const searchParams = new URLSearchParams(window.location.search);
const skipLoader = searchParams.has("skipLoader");
const previewSection = searchParams.get("preview");
const forcedScrollY = searchParams.has("scrollY") ? Number(searchParams.get("scrollY")) : Number.NaN;
const forceHomeOpen = searchParams.get("homeOpen") === "1";
const forcedVisionIndex = searchParams.has("visionIndex") ? Number(searchParams.get("visionIndex")) : Number.NaN;
const forceMenuOpen = searchParams.get("menu") === "1";
const isCompactViewport = window.innerWidth < 768;

const routes = {
  home: `${prefix}`,
  works: `${prefix}works/`,
  studio: `${prefix}studio/`,
  process: `${prefix}process/`,
  contact: `${prefix}contact/`,
  project: (slug) => `${prefix}project/?slug=${slug}`
};

const termMeta = {
  all: { label: "Tất cả dự án" },
  commercial: { label: "Công trình dịch vụ" },
  hospitality: { label: "Nhà hàng - Dịch vụ" },
  "multi-residential": { label: "Căn hộ" },
  residential: { label: "Nhà ở" },
  retail: { label: "Cửa hàng" }
};

const homeSpotlightSlugs = ["nha-mai-ngoi-ha-tinh", "nha-hang-khach-san-hoianna", "nancy-studio-da-nang"];
const homeCollageLayout = [
  { slug: "villa-dong-ha", modifier: "home-collage__item--a" },
  { slug: "bamboo-restaurant", modifier: "home-collage__item--b" },
  { slug: "shop-tran-phu", modifier: "home-collage__item--c" },
  { slug: "can-ho-313-dong-da", modifier: "home-collage__item--d" },
  { slug: "villa-hoi-an", modifier: "home-collage__item--e" },
  { slug: "van-phong-vsm", modifier: "home-collage__item--f" },
  { slug: "tiem-vang-gia-bao", modifier: "home-collage__item--g" }
];

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
let enhancedMotionReady = false;
let lenisInstance = null;
const splitInstances = [];
let menuMotionReady = false;
let homeVisionActiveIndex = -1;
let homeIntroOpened = false;
let wordmarkFitFrame = 0;
let wordmarkFitBound = false;
let homeVisionResizeBound = false;
let homeVisionMobileBound = false;
let homeVisionSnapTimer = 0;

function loadScript(src) {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve();
      return;
    }

    const script = document.createElement("script");
    script.src = src;
    script.async = false;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Unable to load script: ${src}`));
    document.head.append(script);
  });
}

function createWordmarkMarkup(label, split = false) {
  const escapeHtml = (value) => String(value).replace(/[&<>"]/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;"
  }[char] || char));
  const chars = Array.from(String(label)).map((char) => {
    if (char === " ") {
      return `<span class="wordmark-char wordmark-char--space" aria-hidden="true"></span>`;
    }

    return `<span class="wordmark-char">${escapeHtml(char)}</span>`;
  }).join("");
  const markup = `<span class="wordmark-text wordmark-text--chars">${chars}</span>`;

  if (split) {
    return `
      <span class="wordmark-shell wordmark-shell--split" aria-hidden="true">
        <span class="wordmark-layer wordmark-layer--top">
          ${markup}
        </span>
        <span class="wordmark-layer wordmark-layer--bottom">
          ${markup}
        </span>
      </span>
    `;
  }

  return `<span class="wordmark-shell" aria-hidden="true">${markup}</span>`;
}

function fitWordmarks() {
  document.querySelectorAll(".wordmark-shell").forEach((shell) => {
    const firstText = shell.querySelector(".wordmark-text");
    if (!firstText) return;

    shell.style.setProperty("--wordmark-fit", "1");

    const shellWidth = shell.clientWidth;
    const shellHeight = shell.clientHeight;
    if (!shellWidth || !shellHeight) return;

    const computed = window.getComputedStyle(firstText);
    const leftInset = Math.max(0, Number.parseFloat(computed.left) || 0);
    const rightInset = Math.max(0, Number.parseFloat(computed.right) || 0);
    const topInset = Math.max(0, Number.parseFloat(computed.top) || 0);
    const bottomInset = Math.max(0, Number.parseFloat(computed.bottom) || 0);
    const naturalWidth = firstText.scrollWidth || firstText.getBoundingClientRect().width;
    const naturalHeight = firstText.scrollHeight || firstText.getBoundingClientRect().height;

    if (!naturalWidth || !naturalHeight) return;

    const availableWidth = Math.max(shellWidth - leftInset - rightInset - 2, 1);
    const availableHeight = Math.max(shellHeight - topInset - bottomInset - 2, 1);
    const fit = Math.min(1, availableWidth / naturalWidth, availableHeight / naturalHeight);

    shell.style.setProperty("--wordmark-fit", fit.toFixed(4));
  });
}

function scheduleFitWordmarks() {
  if (wordmarkFitFrame) {
    window.cancelAnimationFrame(wordmarkFitFrame);
  }

  wordmarkFitFrame = window.requestAnimationFrame(() => {
    wordmarkFitFrame = 0;
    fitWordmarks();
  });
}

async function ensureMotionLibraries() {
  if (prefersReducedMotion) return false;
  if (window.gsap && window.ScrollTrigger && window.Lenis && window.SplitType) return true;

  try {
    await loadScript(`${prefix}assets/vendor/gsap.min.js`);
    await loadScript(`${prefix}assets/vendor/ScrollTrigger.min.js`);
    await loadScript(`${prefix}assets/vendor/lenis.min.js`);
    await loadScript(`${prefix}assets/vendor/split-type.min.js`);
    return Boolean(window.gsap && window.ScrollTrigger && window.Lenis && window.SplitType);
  } catch (error) {
    console.warn("Enhanced motion libraries could not be loaded.", error);
    return false;
  }
}

function initHeaderState() {
  const header = document.querySelector(".site-header");
  if (!header) return;

  const syncState = () => {
    if (header.classList.contains("site-header--home")) {
      const cover = document.querySelector(".home-cover");
      const reveal = body.dataset.homeIntroOpened === "true" || forceHomeOpen;
      const coverBottom = cover ? cover.getBoundingClientRect().bottom : 0;
      const solid = coverBottom <= 72;

      if (!reveal) {
        header.classList.remove("is-revealed", "is-solid", "is-light");
        return;
      }

      header.classList.toggle("is-revealed", reveal);
      header.classList.toggle("is-solid", reveal && solid);
      header.classList.toggle("is-light", reveal && !solid);
      return;
    }

    header.classList.toggle("is-condensed", window.scrollY > 24);
  };

  syncState();
  window.addEventListener("scroll", syncState, { passive: true });
}

function smoothScrollToTop(force = false) {
  if (lenisInstance) {
    lenisInstance.scrollTo(0, { duration: force ? 0.01 : 1.1, force });
    return;
  }

  window.scrollTo({ top: 0, behavior: force ? "auto" : "smooth" });
}

function splitText(target, types = "lines") {
  if (!target || !window.SplitType) return null;

  if (target.__splitType && target.dataset.splitTypes === types) {
    return target.__splitType;
  }

  if (target.__splitType?.revert) {
    target.__splitType.revert();
  }

  const instance = new window.SplitType(target, {
    types,
    tagName: "span"
  });

  target.__splitType = instance;
  target.dataset.splitTypes = types;
  splitInstances.push(instance);
  return instance;
}

function registerMotionEffects() {
  if (!window.gsap || window.gsap.effects?.revealTitle) return;

  const gsap = window.gsap;
  gsap.registerEffect({
    name: "revealTitle",
    defaults: { ease: "expo.out", duration: 1.2, stagger: 0.1 },
    extendTimeline: true,
    effect: (targets, config) => gsap.timeline({ defaults: config }).to(targets, { yPercent: 0 })
  });
  gsap.registerEffect({
    name: "revealContent",
    defaults: { ease: "expo.out", duration: 1.2, stagger: 0.08 },
    extendTimeline: true,
    effect: (targets, config) => gsap.timeline({ defaults: config }).to(targets, { yPercent: 0 })
  });
}

function revealLines(target, options = {}) {
  if (!enhancedMotionReady || !window.gsap || !window.ScrollTrigger || !window.SplitType || !target) return null;
  if (target.dataset.linesBound === "true") return target.__splitType || null;

  const split = splitText(target, "lines");
  if (!split?.lines?.length) return split;

  target.dataset.linesBound = "true";
  const effectName = options.effect || "revealTitle";
  window.gsap.set(split.lines, { yPercent: 100, autoAlpha: 1 });

  const timeline = window.gsap.timeline({ paused: true });
  timeline[effectName](split.lines, {
    duration: options.duration ?? (effectName === "revealTitle" ? 1.2 : 1.15),
    stagger: options.stagger ?? (effectName === "revealTitle" ? 0.1 : 0.08),
    ease: options.ease ?? "expo.out"
  });

  window.ScrollTrigger.create({
    trigger: options.trigger || target,
    start: options.start || "top 90%",
    once: options.once !== false,
    animation: timeline
  });

  return split;
}

function shouldSkipSplitAnimation(target) {
  if (!target) return false;

  return Boolean(
    isCompactViewport
    || prefersReducedMotion
    || 
    target.hasAttribute("data-no-split")
    || target.closest(".page-hero__grid--studio")
    || target.closest(".page-hero__grid--process")
    || target.closest(".quote-block--studio")
  );
}

function revealChars(target, options = {}) {
  if (!enhancedMotionReady || !window.gsap || !window.ScrollTrigger || !window.SplitType || !target) return null;
  if (target.dataset.charsBound === "true") return target.__splitType || null;

  const split = splitText(target, "chars");
  if (!split?.chars?.length) return split;

  target.dataset.charsBound = "true";
  const fromVars = options.from || { yPercent: 120 };
  const toVars = {
    yPercent: 0,
    xPercent: 0,
    duration: options.duration ?? 1,
    stagger: options.stagger ?? 0.03,
    ease: options.ease ?? "expo.out"
  };

  window.gsap.set(split.chars, fromVars);
  const tween = window.gsap.to(split.chars, { ...toVars, paused: true });
  window.ScrollTrigger.create({
    trigger: options.trigger || target,
    start: options.start || "top 90%",
    once: options.once !== false,
    animation: tween
  });

  return split;
}

function animateCoverFrame(frame, options = {}) {
  if (!enhancedMotionReady || !window.gsap || !frame || frame.dataset.coverBound === "true") return;

  frame.dataset.coverBound = "true";
  const image = frame.querySelector("img");
  const isMobile = window.innerWidth < 768;
  const fromClip = isMobile
    ? (options.mobileClip || "inset(90% 35% 0% 35%)")
    : (options.desktopClip || "inset(50% 35% 0% 35%)");

  window.gsap.set(frame, { clipPath: fromClip });
  if (image) {
    window.gsap.set(image, { scale: options.scaleFrom ?? 0.95 });
  }

  const timeline = window.gsap.timeline({
    delay: options.delay ?? 0.15,
    defaults: {
      ease: options.ease || "power4.inOut",
      duration: options.duration || 1.35
    }
  });

  timeline.to(frame, { clipPath: "inset(0% 0% 0% 0%)" }, 0);
  if (image) {
    timeline.to(image, { scale: 1 }, 0);
  }
}

function animateWorkGrid(scope = document) {
  if (!enhancedMotionReady || !window.gsap || !window.ScrollTrigger) return;

  const gsap = window.gsap;
  const ScrollTrigger = window.ScrollTrigger;

  scope.querySelectorAll(".work-card").forEach((card, index) => {
    if (card.dataset.motionBound === "true") return;
    card.dataset.motionBound = "true";

    gsap.fromTo(card, {
      autoAlpha: 0,
      y: 28
    }, {
      autoAlpha: 1,
      y: 0,
      duration: 0.85,
      ease: "power3.out",
      delay: (index % 2) * 0.05,
      scrollTrigger: {
        trigger: card,
        start: "top 88%",
        once: true
      }
    });
  });

  ScrollTrigger.refresh();
}

function animateWorkRows(scope = document) {
  if (!enhancedMotionReady || !window.gsap || !window.ScrollTrigger) return;

  const gsap = window.gsap;
  const ScrollTrigger = window.ScrollTrigger;

  scope.querySelectorAll(".work-row").forEach((row, index) => {
    if (row.dataset.motionBound === "true") return;
    row.dataset.motionBound = "true";

    gsap.fromTo(row, {
      autoAlpha: 0,
      y: 18
    }, {
      autoAlpha: 1,
      y: 0,
      duration: 0.65,
      ease: "power2.out",
      delay: Math.min(index * 0.02, 0.18),
      scrollTrigger: {
        trigger: row,
        start: "top 92%",
        once: true
      }
    });
  });

  ScrollTrigger.refresh();
}

function renderWordmarks() {
  document.querySelectorAll("[data-wordmark]").forEach((node) => {
    if (node.dataset.wordmarkRendered === "true") return;
    node.innerHTML = createWordmarkMarkup(
      node.dataset.wordmark || siteMeta.studioName,
      node.dataset.wordmarkSplit === "true"
    );
    node.dataset.wordmarkRendered = "true";
  });

  scheduleFitWordmarks();

  if (wordmarkFitBound) return;
  wordmarkFitBound = true;

  window.addEventListener("resize", scheduleFitWordmarks, { passive: true });
  window.addEventListener("load", scheduleFitWordmarks, { once: true });

  if (document.fonts?.ready) {
    document.fonts.ready.then(() => {
      scheduleFitWordmarks();
    }).catch(() => {});
  }
}

function getWorkBySlug(slug) {
  return works.find((item) => item.slug === slug) || works[0];
}

function hideLoader(immediate = false) {
  const loader = document.querySelector(".site-loader");
  if (!loader) return;

  if (immediate) {
    loader.classList.add("is-hidden");
    body.classList.remove("is-loading");
    return;
  }

  loader.classList.add("is-hidden");
  body.classList.remove("is-loading");
}

function scrollToInitialHash(delay = 0) {
  const targetId = previewSection || window.location.hash.replace("#", "");
  const syncScrollState = () => {
    window.dispatchEvent(new Event("scroll"));
    window.dispatchEvent(new Event("resize"));
    window.ScrollTrigger?.refresh?.();
    window.ScrollTrigger?.update?.();
  };

  window.setTimeout(() => {
    if (Number.isFinite(forcedScrollY)) {
      if (lenisInstance) {
        lenisInstance.scrollTo(forcedScrollY, { duration: 0.01, force: true, immediate: true });
        syncScrollState();
        return;
      }

      window.scrollTo(0, forcedScrollY);
      syncScrollState();
      return;
    }

    if (!targetId) return;

    const target = document.getElementById(targetId);
    if (!target) return;

    if (lenisInstance) {
      lenisInstance.scrollTo(target, { duration: 0.01, force: true, immediate: true });
      syncScrollState();
      return;
    }

    window.scrollTo(0, target.getBoundingClientRect().top + window.pageYOffset);
    syncScrollState();
  }, delay);
}

function setHomeWidget(section, force = false) {
  const widget = document.querySelector("[data-home-widget]");
  const titleNode = document.querySelector("[data-home-widget-title]");
  if (!widget || !titleNode || !section) return;

  const nextTitle = section.dataset.widgetTitle || "Khám phá";
  const nextUrl = section.dataset.widgetUrl || routes.home;
  const nextKey = `${nextTitle}|${nextUrl}`;

  if (!force && widget.dataset.current === nextKey) return;

  widget.dataset.current = nextKey;
  widget.href = nextUrl;
  widget.hidden = false;

  if (!enhancedMotionReady || !window.gsap) {
    titleNode.textContent = nextTitle;
    return;
  }

  const gsap = window.gsap;
  gsap.killTweensOf([widget, titleNode]);

  if (!widget.dataset.isShown) {
    widget.dataset.isShown = "true";
    titleNode.textContent = nextTitle;
    gsap.fromTo(widget, {
      autoAlpha: 0,
      yPercent: 180,
      scale: 0.88
    }, {
      autoAlpha: 1,
      yPercent: 0,
      scale: 1,
      duration: 1,
      ease: "expo.out"
    });
    return;
  }

  gsap.to(titleNode, {
    autoAlpha: 0,
    yPercent: -100,
    duration: 0.18,
    ease: "power2.out",
    onComplete: () => {
      titleNode.textContent = nextTitle;
      gsap.fromTo(titleNode, {
        autoAlpha: 0,
        yPercent: 100
      }, {
        autoAlpha: 1,
        yPercent: 0,
        duration: 0.45,
        ease: "expo.out"
      });
    }
  });
}

function initHomeWidget() {
  const widget = document.querySelector("[data-home-widget]");
  const sections = Array.from(document.querySelectorAll("[data-widget]"));
  if (!widget || !sections.length) return;

  if (enhancedMotionReady && window.ScrollTrigger) {
    sections.forEach((section, index) => {
      window.ScrollTrigger.create({
        trigger: section,
        start: "top 65%",
        end: "bottom 45%",
        onEnter: () => setHomeWidget(section),
        onEnterBack: () => setHomeWidget(section),
        onLeaveBack: () => {
          if (index === 0) {
            widget.hidden = true;
            delete widget.dataset.isShown;
            delete widget.dataset.current;
          }
        }
      });
    });

    return;
  }

  const observer = new IntersectionObserver((entries) => {
    const active = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (active?.target) {
      setHomeWidget(active.target);
    }
  }, {
    threshold: [0.25, 0.5, 0.75]
  });

  sections.forEach((section) => observer.observe(section));
}

function setHomeVisionIndex(index) {
  const titles = document.querySelectorAll("[data-home-vision-title]");
  const bodies = document.querySelectorAll("[data-home-vision-body]");
  const titlesWrap = document.querySelector(".home-vision__titles");

  if (!titles.length || !bodies.length) return;

  const isSameIndex = homeVisionActiveIndex === index;
  homeVisionActiveIndex = index;

  titles.forEach((title, titleIndex) => {
    title.classList.toggle("is-active", titleIndex === index);
  });

  bodies.forEach((bodyNode, bodyIndex) => {
    bodyNode.classList.toggle("is-active", bodyIndex === index);
  });

  if (!titlesWrap) return;

  const activeTitle = titles[index];
  if (!activeTitle) return;

  if (window.innerWidth < 768) {
    titlesWrap.style.transform = "translate3d(0px, 0, 0)";
    return;
  }

  const wrapWidth = titlesWrap.clientWidth;
  const contentWidth = titlesWrap.scrollWidth;
  if (!wrapWidth || !contentWidth) return;

  let targetX = 0;

  if (contentWidth > wrapWidth) {
    const titleCenter = activeTitle.offsetLeft + (activeTitle.offsetWidth / 2);
    const minX = wrapWidth - contentWidth;
    targetX = (wrapWidth / 2) - titleCenter;
    targetX = Math.max(minX, Math.min(0, targetX));
  }

  if (enhancedMotionReady && window.gsap && window.innerWidth >= 768) {
    window.gsap.to(titlesWrap, {
      x: targetX,
      duration: isSameIndex ? 0.35 : 0.6,
      ease: "power3.out",
      overwrite: "auto"
    });
    return;
  }

  titlesWrap.style.transform = `translate3d(${targetX}px, 0, 0)`;
}

function initHomeVision() {
  const section = document.querySelector(".home-vision");
  const image = section?.querySelector(".home-vision__image img");
  const cards = siteMeta.visionCards.length;
  if (!section || !cards) return;

  setHomeVisionIndex(0);

  if (Number.isFinite(forcedVisionIndex)) {
    setHomeVisionIndex(Math.max(0, Math.min(cards - 1, forcedVisionIndex)));
    return;
  }

  if (!homeVisionResizeBound) {
    homeVisionResizeBound = true;
    window.addEventListener("resize", () => {
      if (page !== "home" || homeVisionActiveIndex < 0) return;
      window.requestAnimationFrame(() => {
        setHomeVisionIndex(homeVisionActiveIndex);
      });
    }, { passive: true });
  }

  if (window.innerWidth < 768) {
    if (!homeVisionMobileBound) {
      homeVisionMobileBound = true;

      const syncMobileVision = () => {
        if (window.innerWidth >= 768) return;

        const viewportHeight = window.innerHeight || document.documentElement.clientHeight || 1;
        const sectionTop = section.offsetTop;
        const maxScroll = Math.max(section.offsetHeight - viewportHeight, 1);
        const localScroll = Math.max(0, Math.min(maxScroll, window.scrollY - sectionTop));
        const stepScroll = cards > 1 ? (maxScroll / (cards - 1)) : maxScroll;
        const nextIndex = Math.max(0, Math.min(cards - 1, Math.round(localScroll / Math.max(stepScroll, 1))));
        const inSectionRange = window.scrollY >= sectionTop - (viewportHeight * 0.2)
          && window.scrollY <= sectionTop + maxScroll + (viewportHeight * 0.2);

        setHomeVisionIndex(nextIndex);

        window.clearTimeout(homeVisionSnapTimer);
        if (!inSectionRange) return;

        homeVisionSnapTimer = window.setTimeout(() => {
          const targetY = sectionTop + (nextIndex * stepScroll);
          if (Math.abs(window.scrollY - targetY) <= 12) return;
          window.scrollTo({ top: targetY, behavior: "smooth" });
        }, 120);
      };

      window.addEventListener("scroll", syncMobileVision, { passive: true });
      window.addEventListener("resize", syncMobileVision, { passive: true });
      window.setTimeout(syncMobileVision, 60);
    }

    return;
  }

  if (!enhancedMotionReady || !window.ScrollTrigger || !window.gsap) return;

  const gsap = window.gsap;
  const getIndexFromProgress = (progress) => {
    return Math.min(cards - 1, Math.floor(progress * cards));
  };

  window.ScrollTrigger.create({
    trigger: section,
    start: "top top",
    end: "bottom bottom",
    scrub: true,
    onUpdate: (self) => {
      setHomeVisionIndex(getIndexFromProgress(Math.min(self.progress, 0.999)));
    }
  });

  if (image) {
    gsap.fromTo(image, {
      scale: 1.08,
      y: -30
    }, {
      scale: 1,
      y: 30,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });
  }
}

function initHomeSpotlightMotion() {
  if (!enhancedMotionReady || !window.gsap || !window.ScrollTrigger) return;

  const gsap = window.gsap;

  document.querySelectorAll(".home-spotlight").forEach((item) => {
    const title = item.querySelector(".home-spotlight__title");
    const image = item.querySelector(".home-spotlight__image img");
    const lead = item.querySelector(".home-spotlight__lead img");
    const brackets = item.querySelectorAll(".home-spotlight__bracket");

    if (title) {
      gsap.fromTo(title, {
        autoAlpha: 0,
        y: 80,
        letterSpacing: "-0.08em"
      }, {
        autoAlpha: 1,
        y: 0,
        letterSpacing: "-0.055em",
        duration: 1.1,
        ease: "expo.out",
        scrollTrigger: {
          trigger: item,
          start: "top 82%",
          once: true
        }
      });
    }

    if (brackets.length) {
      gsap.fromTo(brackets, {
        autoAlpha: 0,
        x: (index) => (index === 0 ? -48 : 48)
      }, {
        autoAlpha: 1,
        x: 0,
        duration: 1,
        ease: "expo.out",
        stagger: 0.04,
        scrollTrigger: {
          trigger: item,
          start: "top 82%",
          once: true
        }
      });
    }

    if (image) {
      gsap.fromTo(image, {
        scale: 1.18,
        y: -26
      }, {
        scale: 1,
        y: 26,
        ease: "none",
        scrollTrigger: {
          trigger: item,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });
    }

    if (lead) {
      gsap.fromTo(lead, {
        scale: 1.12,
        y: -18
      }, {
        scale: 1,
        y: 18,
        ease: "none",
        scrollTrigger: {
          trigger: item,
          start: "top bottom",
          end: "top 25%",
          scrub: true
        }
      });
    }
  });
}

function initHomeCollageMotion() {
  if (!enhancedMotionReady || !window.gsap || !window.ScrollTrigger) return;

  const gsap = window.gsap;
  document.querySelectorAll(".home-collage__item").forEach((item, index) => {
    const image = item.querySelector("img");
    gsap.fromTo(item, {
      autoAlpha: 0,
      y: 50
    }, {
      autoAlpha: 1,
      y: 0,
      duration: 0.9,
      ease: "power3.out",
      delay: index * 0.04,
      scrollTrigger: {
        trigger: item,
        start: "top 88%",
        once: true
      }
    });

    if (image) {
      gsap.fromTo(image, {
        scale: 1.12,
        y: -20
      }, {
        scale: 1,
        y: 20,
        ease: "none",
        scrollTrigger: {
          trigger: item,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });
    }
  });
}

function initHomeLoaderMotion() {
  const loader = document.querySelector("[data-site-loader]");
  const counter = document.querySelector("[data-loader-count]");
  const panel = document.querySelector(".site-loader__panel");
  const meta = Array.from(document.querySelectorAll(".site-loader__meta span"));
  const brand = document.querySelector("[data-loader-brand]");
  const coverBand = document.querySelector("[data-home-cover-band]");
  const wordmark = document.querySelector("[data-home-wordmark]");
  const coverImage = document.querySelector("[data-home-cover-image]");
  const coverImageNode = coverImage?.querySelector("img");
  const coverOverlay = document.querySelector("[data-home-cover-overlay]");
  const topbar = document.querySelector("[data-home-topbar]");
  const topbarItems = Array.from(topbar?.querySelectorAll(
    ".home-topbar__brand, .home-topbar__nav a, .home-topbar__meta, .home-topbar__contact, .home-topbar__menu"
  ) || []);
  const darkCanvas = document.querySelector(".home-cover__canvas--dark");
  const lightCanvas = document.querySelector(".home-cover__canvas--light");
  const fixedHeader = document.querySelector("[data-home-fixed-header]");
  const headerItems = Array.from(fixedHeader?.querySelectorAll(
    ".site-header__brand, .site-header__nav a, .site-header__meta, .site-header__contact"
  ) || []);
  const hasInitialTarget = Boolean(previewSection || window.location.hash || Number.isFinite(forcedScrollY));
  const shouldAwaitFirstScroll = false;

  const setIntroState = (opened) => {
    homeIntroOpened = opened;
    body.dataset.homeIntroOpened = opened ? "true" : "false";
    body.classList.toggle("home-intro-locked", shouldAwaitFirstScroll && !opened);
    window.dispatchEvent(new Event("scroll"));
  };

  const finalizeIntro = () => {
    body.classList.remove("home-intro-locked");
    lenisInstance?.start();
    if (hasInitialTarget) {
      scrollToInitialHash(40);
    }
    window.dispatchEvent(new Event("scroll"));
  };

  const cleanupTriggers = (() => {
    let wheelHandler = null;
    let touchHandler = null;
    let keyHandler = null;

    return {
      bind(callback) {
        if (!shouldAwaitFirstScroll || homeIntroOpened) return;

        const trigger = (event) => {
          if (event?.type === "keydown") {
            const key = event.code || event.key;
            const isValid = ["ArrowDown", "PageDown", "Space", "Enter", " "].includes(key);
            if (!isValid) return;
          }

          if (event?.cancelable) {
            event.preventDefault();
          }

          this.clear();
          callback();
        };

        wheelHandler = trigger;
        touchHandler = trigger;
        keyHandler = trigger;

        window.addEventListener("wheel", wheelHandler, { passive: false, once: true });
        window.addEventListener("touchmove", touchHandler, { passive: false, once: true });
        window.addEventListener("keydown", keyHandler);
      },
      clear() {
        if (wheelHandler) {
          window.removeEventListener("wheel", wheelHandler);
          wheelHandler = null;
        }
        if (touchHandler) {
          window.removeEventListener("touchmove", touchHandler);
          touchHandler = null;
        }
        if (keyHandler) {
          window.removeEventListener("keydown", keyHandler);
          keyHandler = null;
        }
      }
    };
  })();

  const openIntro = (immediate = false) => {
    if (homeIntroOpened) return;

    setIntroState(true);
    fixedHeader?.classList.add("is-revealed", "is-light");
    fixedHeader?.classList.remove("is-solid");

    if (!window.gsap || immediate || !coverImage || !coverImageNode || !coverBand || !wordmark) {
      if (window.gsap) {
        window.gsap.set(coverBand, { yPercent: -102 });
        window.gsap.set(wordmark, { yPercent: -120, autoAlpha: 0 });
        window.gsap.set(topbarItems, { yPercent: -120, autoAlpha: 0 });
        window.gsap.set(darkCanvas, { autoAlpha: 0, y: 28 });
        window.gsap.set(coverImage, {
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          xPercent: 0
        });
        window.gsap.set(coverImageNode, { scale: 1 });
        window.gsap.set(coverOverlay, { autoAlpha: 1 });
        window.gsap.set(lightCanvas, { autoAlpha: 1, y: 0 });
        window.gsap.set(headerItems, { yPercent: 0, autoAlpha: 1 });
      }

      finalizeIntro();
      return;
    }

    const gsap = window.gsap;
    const timeline = gsap.timeline({
      defaults: { ease: "power2.inOut" },
      onComplete: finalizeIntro
    });

    timeline
      .to(coverBand, {
        yPercent: -102,
        duration: 1.34
      }, 0)
      .to(wordmark, {
        yPercent: -120,
        autoAlpha: 0,
        duration: 1.24,
        ease: "power2.out"
      }, 0.02)
      .to(topbarItems, {
        yPercent: -120,
        autoAlpha: 0,
        duration: 0.98,
        stagger: 0.03,
        ease: "power2.out"
      }, 0.08)
      .to(darkCanvas, {
        autoAlpha: 0,
        y: 22,
        duration: 1.02,
        ease: "power2.out"
      }, 0.16)
      .to(coverImage, {
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        xPercent: 0,
        duration: 1.46,
        ease: "power2.inOut"
      }, 0.12)
      .to(coverImageNode, {
        scale: 1,
        duration: 1.46,
        ease: "power2.inOut"
      }, 0.12)
      .to(coverOverlay, {
        autoAlpha: 1,
        duration: 1.04,
        ease: "power2.out"
      }, 0.32)
      .to(lightCanvas, {
        autoAlpha: 1,
        y: 0,
        duration: 1.14,
        ease: "power2.out"
      }, 0.42)
      .fromTo(headerItems, {
        yPercent: 110,
        autoAlpha: 0
      }, {
        yPercent: 0,
        autoAlpha: 1,
        duration: 1.06,
        stagger: 0.03,
        ease: "power2.out"
      }, 0.52);
  };

  if (isCompactViewport) {
    hideLoader(true);
    openIntro(true);
    return;
  }

  if (!window.gsap) {
    hideLoader(true);
    setIntroState(true);
    finalizeIntro();
    return;
  }

  const gsap = window.gsap;
  const hasSeenLoader = window.sessionStorage.getItem("sleeper-loader-seen") === "true";
  const state = { value: 0 };
  const counterDuration = hasSeenLoader ? 2.45 : 3.2;
  const revealAt = hasSeenLoader ? 1.62 : 2.1;
  const panelDuration = hasSeenLoader ? 0.84 : 1.02;
  const loaderFadeAt = revealAt + 0.48;
  const imageScaleStart = window.innerWidth < 1024 ? 0.9 : 0.82;

  setIntroState(false);
  gsap.set(meta, { yPercent: 120, autoAlpha: 1 });
  gsap.set(brand, { autoAlpha: 1, yPercent: 18 });
  gsap.set(panel, { yPercent: 100, autoAlpha: 1 });
  gsap.set(topbarItems, { yPercent: 110, autoAlpha: 0 });
  gsap.set(headerItems, { yPercent: 110, autoAlpha: 0 });
  gsap.set(darkCanvas, { autoAlpha: 1, y: 0 });
  gsap.set(lightCanvas, { autoAlpha: 0, y: 24 });
  gsap.set(coverOverlay, { autoAlpha: 0 });
  gsap.set(coverImage, { xPercent: -50 });
  gsap.set(coverImageNode, { scale: imageScaleStart });

  if (skipLoader) {
    hideLoader(true);
    gsap.set(topbarItems, { yPercent: 0, autoAlpha: 1 });
    if (shouldAwaitFirstScroll) {
      lenisInstance?.stop();
      cleanupTriggers.bind(() => openIntro(false));
      return;
    }

    openIntro(true);
    return;
  }

  if (!loader) {
    openIntro(true);
    return;
  }

  const loaderTimeline = gsap.timeline({
    defaults: { ease: "power2.out" },
    onComplete: () => {
      window.sessionStorage.setItem("sleeper-loader-seen", "true");
      hideLoader(true);

      if (shouldAwaitFirstScroll) {
        lenisInstance?.stop();
        cleanupTriggers.bind(() => openIntro(false));
        return;
      }

      openIntro(forceHomeOpen || hasInitialTarget);
    }
  });

  loaderTimeline
    .to(meta, {
      yPercent: 0,
      duration: hasSeenLoader ? 1.02 : 1.26,
      stagger: 0.06
    }, 0)
    .to(brand, {
      yPercent: 0,
      duration: hasSeenLoader ? 1.82 : 2.18,
      ease: "expo.out"
    }, 0.08)
    .to(state, {
      value: 100,
      duration: counterDuration,
      ease: "power2.inOut",
      onUpdate: () => {
        if (counter) {
          counter.textContent = `${Math.round(state.value)}%`;
        }
      }
    }, 0.08)
    .to(panel, {
      yPercent: 0,
      duration: panelDuration
    }, revealAt)
    .to(brand, {
      yPercent: -6,
      autoAlpha: 0.96,
      duration: 0.94,
      ease: "power2.out"
    }, revealAt - 0.02)
    .to(loader, {
      autoAlpha: 0,
      duration: 0.54,
      ease: "power2.out"
    }, loaderFadeAt)
    .to(topbarItems, {
      yPercent: 0,
      autoAlpha: 1,
      duration: 1.2,
      stagger: 0.04,
      ease: "power2.out"
    }, loaderFadeAt + 0.04);
}

function initEnhancedMotion() {
  if (enhancedMotionReady || !window.gsap || !window.ScrollTrigger) return;

  const gsap = window.gsap;
  const ScrollTrigger = window.ScrollTrigger;
  const Lenis = window.Lenis;

  enhancedMotionReady = true;
  body.classList.add("has-motion");
  gsap.registerPlugin(ScrollTrigger);
  registerMotionEffects();
  gsap.defaults({ ease: "none" });

  if (Lenis && !lenisInstance && !isCompactViewport) {
    lenisInstance = new Lenis({
      duration: 1.1,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1,
      easing: (t) => 1 - ((1 - t) ** 5),
      eventsTarget: document.body
    });

    lenisInstance.on("scroll", ScrollTrigger.update);

    const raf = (time) => {
      lenisInstance?.raf(time);
      window.requestAnimationFrame(raf);
    };

    window.requestAnimationFrame(raf);
    document.documentElement.classList.add("is-smooth-scroll");
  }

  if (page === "home" && !skipLoader) {
    lenisInstance?.stop();
  }

  if (isCompactViewport) {
    body.classList.add("has-compact-motion");

    document.querySelectorAll(".reveal").forEach((item) => {
      item.classList.add("is-visible");
      item.style.opacity = "1";
      item.style.transform = "none";
    });

    if (page === "home") {
      initHomeWidget();
      initHomeVision();
      initHomeLoaderMotion();
      if (skipLoader && (previewSection || window.location.hash || Number.isFinite(forcedScrollY))) {
        window.setTimeout(() => {
          scrollToInitialHash(40);
        }, 120);
      }
    }

    return;
  }

  document.querySelectorAll(".reveal").forEach((item, index) => {
    if (item.dataset.motionBound === "true") return;
    item.dataset.motionBound = "true";

    gsap.fromTo(item, {
      autoAlpha: 0,
      y: 42
    }, {
      autoAlpha: 1,
      y: 0,
      duration: 0.95,
      ease: "power3.out",
      delay: (index % 3) * 0.03,
      scrollTrigger: {
        trigger: item,
        start: "top 90%",
        once: true
      }
    });
  });

  document.querySelectorAll('[data-animate="title"]').forEach((item) => {
    if (shouldSkipSplitAnimation(item)) return;

    revealLines(item, {
      effect: "revealTitle",
      start: item.closest(".page-hero, .page-intro") ? "top 92%" : "top 90%"
    });
  });

  document.querySelectorAll('[data-animate="content"]').forEach((item) => {
    if (shouldSkipSplitAnimation(item)) return;

    revealLines(item, {
      effect: "revealContent",
      stagger: 0.06
    });
  });

  const homeBand = document.querySelector(".hero-band--home");
  if (homeBand) {
    const wordmark = homeBand.querySelector(".hero-band__wordmark");
    if (wordmark) {
      gsap.fromTo(wordmark, {
        xPercent: 0
      }, {
        xPercent: -14,
        ease: "none",
        scrollTrigger: {
          trigger: homeBand,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });
    }
  }

  const homeHeroFrame = document.querySelector(".image-frame--hero");
  if (homeHeroFrame) {
    animateCoverFrame(homeHeroFrame, {
      mobileClip: "inset(90% 35% 0% 35%)",
      desktopClip: "inset(55% 35% 0% 35%)"
    });
  }

  [".image-frame--studio", ".image-frame--process", ".image-frame--project"].forEach((selector) => {
    const frame = document.querySelector(selector);
    if (frame) {
      animateCoverFrame(frame, {
        mobileClip: "inset(90% 35% 0% 35%)",
        desktopClip: "inset(50% 35% 0% 35%)"
      });
    }
  });

  const heroTagline = document.querySelector(".home-hero__tagline");
  if (heroTagline) {
    gsap.fromTo(heroTagline, {
      yPercent: 0
    }, {
      yPercent: -12,
      ease: "none",
      scrollTrigger: {
        trigger: ".home-hero",
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });
  }

  const heroScroll = document.querySelector(".home-hero__scroll");
  if (heroScroll) {
    gsap.fromTo(heroScroll, {
      autoAlpha: 1,
      y: 0
    }, {
      autoAlpha: 0.1,
      y: 64,
      ease: "none",
      scrollTrigger: {
        trigger: ".home-hero",
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });
  }

  document.querySelectorAll(".image-frame").forEach((frame) => {
    if (
      frame.matches("[data-home-cover-image]") ||
      frame.closest(".home-spotlight") ||
      frame.closest(".home-collage__item") ||
      frame.closest(".home-vision")
    ) {
      return;
    }

    const image = frame.querySelector("img");
    if (!image || image.dataset.parallaxBound === "true") return;
    image.dataset.parallaxBound = "true";

    const force = window.innerWidth < 1200 ? 0.08 : 0.14;
    gsap.fromTo(image, {
      scale: 1.06,
      y: -frame.getBoundingClientRect().height * force
    }, {
      scale: 1.01,
      y: frame.getBoundingClientRect().height * force,
      ease: "none",
      scrollTrigger: {
        trigger: frame,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });
  });

  if (page === "home") {
    initHomeWidget();
    initHomeSpotlightMotion();
    initHomeCollageMotion();
    initHomeVision();
    initHomeLoaderMotion();
  }

  if (page === "works") {
    const worksTitle = document.querySelector("[data-works-title]");
    const worksCount = document.querySelector("[data-works-count]");
    const filterItems = document.querySelectorAll(".filters-list__item");
    const firstCards = document.querySelectorAll(".work-card__media");

    if (worksTitle) {
      revealLines(worksTitle, { effect: "revealTitle", start: "top 92%" });
    }
    if (worksCount) {
      revealChars(worksCount, {
        from: { yPercent: 110 },
        stagger: 0.06,
        start: "top 92%"
      });
    }
    if (filterItems.length) {
      gsap.set(filterItems, { yPercent: 100 });
      const filtersTween = gsap.to(filterItems, {
        yPercent: 0,
        ease: "expo.out",
        duration: 1.15,
        stagger: 0.06,
        paused: true
      });
      ScrollTrigger.create({
        trigger: ".works-shell",
        start: "top 88%",
        once: true,
        animation: filtersTween
      });
    }
    firstCards.forEach((media, index) => {
      if (index > 1 || media.dataset.coverBound === "true") return;
      media.dataset.coverBound = "true";
      gsap.set(media, {
        clipPath: window.innerWidth < 768
          ? "inset(90% 35% 0% 35%)"
          : index === 0
            ? "inset(25rem 0% 0% 50%)"
            : "inset(25rem 50% 0% 0%)"
      });
      gsap.to(media, {
        clipPath: "inset(0% 0% 0% 0%)",
        ease: "power4.inOut",
        duration: 1.35,
        delay: 0.2
      });
    });
  }

  document.querySelectorAll(".section").forEach((section) => {
    const eyebrow = section.querySelector(".section__eyebrow");
    if (!eyebrow || eyebrow.dataset.scrubBound === "true") return;
    eyebrow.dataset.scrubBound = "true";

    gsap.fromTo(eyebrow, {
      y: 0
    }, {
      y: -36,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });
  });

  const teamLayout = document.querySelector(".team-layout");
  if (teamLayout) {
    const teamItems = teamLayout.querySelectorAll(".team-list__item");
    if (teamItems.length) {
      gsap.from(teamItems, {
        autoAlpha: 0,
        y: 24,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.05,
        scrollTrigger: {
          trigger: teamLayout,
          start: "top 80%",
          once: true
        }
      });
    }

    const previewImage = teamLayout.querySelector(".team-preview__image img");
    if (previewImage) {
      gsap.fromTo(previewImage, {
        scale: 1.08
      }, {
        scale: 1.01,
        ease: "none",
        scrollTrigger: {
          trigger: teamLayout,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });
    }
  }

  if (page === "studio" && window.innerWidth < 960) {
    const teamButtons = document.querySelectorAll(".team-list__item");
    teamButtons.forEach((button) => {
      if (button.dataset.scrollBound === "true") return;
      button.dataset.scrollBound = "true";
      ScrollTrigger.create({
        trigger: button,
        start: "top 60%",
        end: "bottom 60%",
        onEnter: () => button.click(),
        onEnterBack: () => button.click()
      });
    });
  }

  if (page === "process") {
    document.querySelectorAll(".initiative-card").forEach((card, index) => {
      card.style.setProperty("--stack-index", String(index));
      card.style.zIndex = String(10 + index);
    });
  }

  document.querySelectorAll(".initiative-card").forEach((card, index) => {
    if (card.dataset.motionBound === "true") return;
    card.dataset.motionBound = "true";

    gsap.fromTo(card, {
      autoAlpha: 0,
      y: 42
    }, {
      autoAlpha: 1,
      y: 0,
      duration: 0.95,
      ease: "power3.out",
      delay: index * 0.05,
      scrollTrigger: {
        trigger: card,
        start: "top 88%",
        once: true
      }
    });
  });

  const quote = document.querySelector(".quote-block blockquote");
  if (quote && !shouldSkipSplitAnimation(quote)) {
    revealLines(quote, {
      effect: "revealTitle",
      start: "top 88%",
      stagger: 0.08
    });
  }

  const footerWordmark = document.querySelector(".site-footer__wordmark");
  if (footerWordmark) {
    gsap.fromTo(footerWordmark, {
      xPercent: -2
    }, {
      xPercent: 6,
      ease: "none",
      scrollTrigger: {
        trigger: footerWordmark,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });
  }

  animateWorkGrid(document);
  animateWorkRows(document);
  ScrollTrigger.refresh();
}

function renderHeader() {
  const mount = document.querySelector("[data-header]");
  if (!mount) return;

  const nav = [
    { key: "works", label: page === "home" ? "Dự án," : "Dự án" },
    { key: "process", label: page === "home" ? "Quy trình," : "Quy trình" },
    { key: "studio", label: "Studio" }
  ];

  if (page === "home") {
    mount.innerHTML = `
      <header class="site-header site-header--home" data-home-fixed-header>
        <div class="grid-w site-header__grid">
          <a class="site-header__brand site-header__brand--mark" href="${routes.home}" data-wordmark="${siteMeta.studioName}"></a>

          <nav class="site-header__nav" aria-label="Điều hướng chính">
            ${nav.map((item) => `<a href="${routes[item.key]}">${item.label}</a>`).join("")}
          </nav>

          <div class="site-header__meta">
            <span class="site-clock subtle" data-clock></span>
            <span>${siteMeta.locationLabel}</span>
          </div>

          <a class="site-header__contact" href="${routes.contact}">Liên hệ</a>

          <button class="site-header__menu-button" type="button" data-menu-open aria-expanded="false">Menu</button>
        </div>
      </header>
    `;
    return;
  }

  mount.innerHTML = `
    <header class="site-header">
      <div class="grid-w site-header__grid">
        <a class="site-header__brand site-header__brand--mark" href="${routes.home}" data-wordmark="${siteMeta.studioName}"></a>

        <nav class="site-header__nav" aria-label="Điều hướng chính">
          ${nav.map((item) => `<a href="${routes[item.key]}" class="${page === item.key ? "is-active" : ""}">${item.label}</a>`).join("")}
        </nav>

        <div class="site-header__meta">
          <span class="site-clock subtle" data-clock></span>
          <span>${siteMeta.locationLabel}</span>
        </div>

        <a class="site-header__contact" href="${routes.contact}">Liên hệ</a>

        <button class="site-header__menu-button" type="button" data-menu-open aria-expanded="false">Menu</button>
      </div>

      <div class="mobile-menu" data-mobile-menu hidden>
        <div class="mobile-menu__inner">
          <div class="mobile-menu__top">
            <a class="site-header__brand site-header__brand--mark" href="${routes.home}" data-wordmark="${siteMeta.studioName}"></a>
            <button class="site-header__menu-button" type="button" data-menu-close>Đóng</button>
          </div>
          <nav class="mobile-menu__nav" aria-label="Điều hướng trên điện thoại">
            <a href="${routes.home}">Trang chủ</a>
            <a href="${routes.works}">Dự án</a>
            <a href="${routes.process}">Quy trình</a>
            <a href="${routes.studio}">Studio</a>
            <a href="${routes.contact}">Liên hệ</a>
          </nav>
          <div class="mobile-menu__meta">
            <a href="mailto:${siteMeta.email}">${siteMeta.email}</a>
            <a href="tel:${siteMeta.phone.replace(/\s+/g, "")}">${siteMeta.phone}</a>
          </div>
        </div>
      </div>
    </header>
  `;
}

function renderFooter() {
  const mount = document.querySelector("[data-footer]");
  if (!mount) return;

    mount.innerHTML = `
      <footer id="site-footer" class="site-footer">
        <div class="site-footer__upper">
        <div class="grid-w site-footer__grid">
          <div class="site-footer__cta">
            <span class="subtle">Trao đổi cùng Sleeper về công trình của bạn</span>
            <a class="link-underline" href="${routes.contact}">Liên hệ ngay</a>
          </div>

          <div class="site-footer__newsletter">
            <span>Nhận thông tin mới từ Sleeper</span>
            <form class="newsletter-form" data-newsletter-form>
              <input type="email" name="email" placeholder="Email của bạn" aria-label="Email của bạn" required>
              <button type="submit" aria-label="Gửi">Gửi</button>
            </form>
            <div class="newsletter-form__success" data-newsletter-success hidden>Cảm ơn bạn đã đăng ký!</div>
          </div>

          <nav class="site-footer__nav">
            <a href="${routes.home}">Trang chủ</a>
            <a href="${routes.works}">Dự án</a>
            <a href="${routes.studio}">Studio</a>
            <a href="${routes.process}">Quy trình</a>
            <a href="${routes.contact}">Liên hệ</a>
          </nav>

          <div class="site-footer__contact">
            <div><span class="subtle">L</span><div>${siteMeta.address.join("<br>")}</div></div>
            <div><span class="subtle">P</span><a href="tel:${siteMeta.phone.replace(/\s+/g, "")}">${siteMeta.phone}</a></div>
            <div><span class="subtle">C</span><a href="mailto:${siteMeta.email}">${siteMeta.email}</a></div>
          </div>

          <div class="site-footer__socials">
            ${siteMeta.socials.length
              ? siteMeta.socials.map((item) => `<a href="${item.href}" target="_blank" rel="noopener">${item.label}</a>`).join("")
              : '<span class="subtle">Đà Nẵng &amp; miền Trung</span>'}
          </div>
        </div>
      </div>

      <div class="site-footer__lower">
        <div class="site-footer__wordmark" data-wordmark="${siteMeta.studioName}"></div>
        <div class="grid-w site-footer__bottom">
          <span class="subtle">Bản quyền thuộc về &copy; ${siteMeta.studioName} 2026</span>
          <button class="back-to-top" type="button" data-back-to-top>Lên đầu trang</button>
        </div>
      </div>
    </footer>
  `;
}

function initLoader() {
  const loader = document.querySelector(".site-loader");
  if (!loader) return;

  if (isCompactViewport) {
    hideLoader(true);
    return;
  }

  if (skipLoader) {
    hideLoader(true);
    return;
  }

  body.classList.add("is-loading");

  if (page === "home") {
    return;
  }

  window.setTimeout(() => hideLoader(true), 650);
}

function initClock() {
  const nodes = document.querySelectorAll("[data-clock]");
  if (!nodes.length) return;

  const formatTime = () => {
    const formatter = new Intl.DateTimeFormat("en-AU", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZone: siteMeta.timezone
    });
    const formatted = formatter.format(new Date()).replace(" am", "AM").replace(" pm", "PM");
    nodes.forEach((node) => {
      node.textContent = formatted;
    });
  };

  formatTime();
  window.setInterval(formatTime, 30000);
}

function initMenu() {
  const openButtons = Array.from(document.querySelectorAll("[data-menu-open]"));
  const closeButtons = Array.from(document.querySelectorAll("[data-menu-close]"));
  const menu = document.querySelector("[data-mobile-menu]");
  if (!openButtons.length || !closeButtons.length || !menu) return;

  const revealMenu = () => {
    menu.hidden = false;
    menu.removeAttribute("hidden");
    menu.setAttribute("aria-hidden", "false");
    menu.style.display = "block";
  };

  const concealMenu = () => {
    menu.hidden = true;
    menu.setAttribute("hidden", "");
    menu.setAttribute("aria-hidden", "true");
    menu.style.removeProperty("display");
  };

  const closeMenu = () => {
    menu.classList.remove("is-open");
    document.documentElement.classList.remove("menu-open");
    body.classList.remove("menu-open");
    openButtons.forEach((button) => button.setAttribute("aria-expanded", "false"));
    window.setTimeout(() => {
      concealMenu();
    }, 300);
  };

  const openMenu = () => {
    revealMenu();
    menu.classList.add("is-open");
    document.documentElement.classList.add("menu-open");
    body.classList.add("menu-open");
    openButtons.forEach((button) => button.setAttribute("aria-expanded", "true"));
  };

  openButtons.forEach((open) => {
    open.addEventListener("click", openMenu);
  });

  closeButtons.forEach((close) => {
    close.addEventListener("click", closeMenu);
  });

  menu.querySelectorAll("a[href]").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menu.classList.contains("is-open")) {
      closeMenu();
    }
  });

  if (forceMenuOpen) {
    window.setTimeout(openMenu, 120);
  }
}

function initNewsletter() {
  document.querySelectorAll("[data-newsletter-form]").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const success = form.parentElement?.querySelector("[data-newsletter-success]");
      form.reset();
      if (success) {
        success.hidden = false;
        window.setTimeout(() => {
          success.hidden = true;
        }, 2500);
      }
    });
  });
}

function initBackToTop() {
  document.querySelectorAll("[data-back-to-top]").forEach((button) => {
    button.addEventListener("click", () => {
      smoothScrollToTop();
    });
  });
}

function initPageTransitions() {
  const overlay = document.querySelector(".page-transition");
  if (!overlay) return;

  if (isCompactViewport) {
    overlay.classList.remove("is-active");
    overlay.style.display = "none";
    return;
  }

  document.addEventListener("click", (event) => {
    const anchor = event.target.closest("a[href]");
    if (!anchor) return;

    const href = anchor.getAttribute("href");
    if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) return;
    if (anchor.target === "_blank") return;

    const url = new URL(anchor.href, window.location.href);
    if (url.origin !== window.location.origin) return;

    event.preventDefault();
    overlay.classList.add("is-active");
    window.setTimeout(() => {
      window.location.href = url.href;
    }, 340);
  });

  window.addEventListener("pageshow", () => {
    overlay.classList.remove("is-active");
  });
}

function initReveal() {
  const items = document.querySelectorAll(".reveal");
  if (!items.length) return;

  items.forEach((item) => {
    if (item.getBoundingClientRect().top < window.innerHeight * 0.95) {
      item.classList.add("is-visible");
    }
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.01 });

  items.forEach((item) => observer.observe(item));
}

function createWorkCard(work) {
  return `
    <article class="work-card" style="--ratio:${work.ratio}">
      <a class="work-card__link" href="${routes.project(work.slug)}">
        <div class="work-card__media">
          <img src="${work.image}" alt="${work.title}" loading="lazy">
        </div>
        <div class="work-card__meta">
          <div class="work-card__title">${work.title}</div>
          <div class="work-card__detail">${work.typology}</div>
          <div class="work-card__detail">${work.year}</div>
        </div>
      </a>
    </article>
  `;
}

function createHomeSpotlight(work, index) {
  const leadImage = index > 0
    ? `
      <figure class="home-spotlight__lead image-frame">
        <img src="${work.image}" alt="${work.title}" loading="lazy">
      </figure>
    `
    : '<div class="home-spotlight__lead home-spotlight__lead--empty" aria-hidden="true"></div>';

  return `
    <article class="home-spotlight" data-widget data-widget-title="${work.title}" data-widget-url="${routes.project(work.slug)}">
      ${leadImage}
      <a class="home-spotlight__link" href="${routes.project(work.slug)}">
        <div class="home-spotlight__title-row">
          <span class="home-spotlight__rail home-spotlight__rail--left" aria-hidden="true"></span>
          <span class="home-spotlight__rail home-spotlight__rail--right" aria-hidden="true"></span>
          <span class="home-spotlight__bracket home-spotlight__bracket--left">[</span>
          <h3 class="home-spotlight__title">${work.title}</h3>
          <span class="home-spotlight__bracket home-spotlight__bracket--right">]</span>
        </div>

        <div class="grid-w home-spotlight__image-grid">
          <div class="home-spotlight__image-col">
            <figure class="home-spotlight__image image-frame" style="--ratio:${work.ratio}">
              <img src="${work.image}" alt="${work.title}" loading="lazy">
            </figure>
            <div class="home-spotlight__meta">
              <span>${work.typology}</span>
              <span>${work.year}</span>
            </div>
          </div>
        </div>
      </a>
    </article>
  `;
}

function renderHomeSpotlights() {
  const mount = document.querySelector("[data-home-spotlights]");
  if (!mount) return;

  const selectedWorks = homeSpotlightSlugs.map((slug) => getWorkBySlug(slug));
  mount.innerHTML = selectedWorks.map(createHomeSpotlight).join("");
}

function renderHomeCollage() {
  const mount = document.querySelector("[data-home-collage]");
  if (!mount) return;

  mount.innerHTML = homeCollageLayout.map((item) => {
    const work = getWorkBySlug(item.slug);
    return `
      <a class="home-collage__item ${item.modifier}" href="${routes.project(work.slug)}" aria-label="${work.title}">
        <figure class="image-frame">
          <img src="${work.image}" alt="${work.title}" loading="lazy">
        </figure>
      </a>
    `;
  }).join("");
}

function renderHomeVision() {
  const titlesMount = document.querySelector("[data-home-vision-titles]");
  const contentMount = document.querySelector("[data-home-vision-content]");
  if (!titlesMount || !contentMount) return;

  titlesMount.innerHTML = siteMeta.visionCards.map((card, index) => `
    <h3 class="home-vision__title ${index === 0 ? "is-active" : ""}" data-home-vision-title>${card.title}</h3>
  `).join("");

  contentMount.innerHTML = siteMeta.visionCards.map((card, index) => `
    <div class="home-vision__body ${index === 0 ? "is-active" : ""}" data-home-vision-body>
      <p>${card.text}</p>
    </div>
  `).join("");
}

function renderServices() {
  const mount = document.querySelector("[data-services]");
  if (!mount) return;
  mount.innerHTML = siteMeta.services.map((service) => `<div class="method-strip__item">${service}</div>`).join("");
}

function applyPreviewSection() {
  if (page !== "home" || !previewSection) return;

  const sections = Array.from(document.querySelectorAll(".home-main > section"));
  let matched = false;

  sections.forEach((section) => {
    const shouldShow = section.id === previewSection;
    section.hidden = !shouldShow;
    matched ||= shouldShow;
  });

  if (!matched) return;

  body.classList.add("is-preview-section");
  document.querySelector(".home-widget-wrap")?.setAttribute("hidden", "");
  document.querySelector("[data-footer]")?.setAttribute("hidden", "");
  window.scrollTo(0, 0);
}

function renderVisionCards(selector, cards, dark = false) {
  const mount = document.querySelector(selector);
  if (!mount) return;
  mount.innerHTML = cards.map((card, index) => `
    <article class="vision-card ${dark ? "vision-card--dark" : ""}">
      <span class="subtle">0${index + 1}</span>
      <h3>${card.title}</h3>
      <p>${card.text}</p>
    </article>
  `).join("");
}

function buildTermCounts() {
  const counts = works.reduce((acc, work) => {
    work.terms.forEach((term) => {
      acc[term] = (acc[term] || 0) + 1;
    });
    return acc;
  }, {});

  counts.all = works.length;
  return counts;
}

function renderWorksPage() {
  const filtersList = document.querySelector("[data-filters-list]");
  const grid = document.querySelector("[data-works-grid]");
  const list = document.querySelector("[data-works-list]");
  const listShell = document.querySelector("[data-works-list-shell]");
  const worksMain = document.querySelector(".works-main");
  const activeFilterLabel = document.querySelector("[data-active-filter]");
  const filtersPanel = document.querySelector("[data-filters-panel]");
  const filtersToggle = document.querySelector("[data-filters-toggle]");
  const filtersClose = document.querySelector("[data-filters-close]");
  const title = document.querySelector("[data-works-title]");
  const count = document.querySelector("[data-works-count]");
  const viewToggle = document.querySelector("[data-view-toggle]");
  const previewImage = document.querySelector("[data-works-preview-image]");

  if (!filtersList || !grid || !list || !listShell || !worksMain || !activeFilterLabel || !title || !count || !viewToggle || !previewImage) return;

  const counts = buildTermCounts();
  const order = ["all", "commercial", "hospitality", "multi-residential", "residential", "retail"];
  let activeTerm = "all";
  const requestedView = searchParams.get("view");
  let activeView = requestedView === "list" || requestedView === "grid"
    ? requestedView
    : (window.localStorage.getItem("works-view") || "grid");
  let isTransitioning = false;

  function filteredWorks() {
    if (activeTerm === "all") return works;
    return works.filter((work) => work.terms.includes(activeTerm));
  }

  function renderFilters() {
    filtersList.innerHTML = order.map((term) => `
      <button type="button" class="filters-list__item ${activeTerm === term ? "is-active" : ""}" data-term="${term}">
        <span>${termMeta[term].label}</span>
        <sup>(${String(counts[term] || 0).padStart(2, "0")})</sup>
      </button>
    `).join("");

    filtersList.querySelectorAll("[data-term]").forEach((button) => {
      const term = button.getAttribute("data-term");
      button.addEventListener("mouseenter", () => {
        if (!term || term === "all" || activeView !== "list" || activeTerm !== "all") return;
        applyListDim(term);
      });
      button.addEventListener("mouseleave", () => applyListDim());
    });
  }

  function renderGrid() {
    grid.innerHTML = filteredWorks().map(createWorkCard).join("");
    if (enhancedMotionReady) {
      window.requestAnimationFrame(() => animateWorkGrid(grid));
    }
  }

  function renderList() {
    const updatePreview = (preview, titleText) => {
      if (!preview) return;

      if (enhancedMotionReady && window.gsap) {
        window.gsap.to(previewImage, {
          autoAlpha: 0,
          duration: 0.12,
          onComplete: () => {
            previewImage.src = preview;
            previewImage.alt = titleText || "";
            window.gsap.to(previewImage, {
              autoAlpha: 1,
              duration: 0.28,
              ease: "power2.out"
            });
          }
        });
        return;
      }

      previewImage.src = preview;
      previewImage.alt = titleText || "";
    };

    list.innerHTML = `
      <div class="works-list__head" aria-hidden="true">
        <span>Dự án</span>
        <span>Nhóm</span>
        <span>Loại hình</span>
        <span>Khu vực</span>
        <span class="work-row__year">Năm</span>
      </div>
      ${filteredWorks().map((work) => `
      <a class="work-row" href="${routes.project(work.slug)}" data-preview="${work.image}" data-title="${work.title}" data-terms="${work.terms.join(",")}">
        <span class="work-row__title work-row__cell" data-label="Dự án">${work.title}</span>
        <span class="work-row__cell" data-label="Nhóm">${work.segment}</span>
        <span class="work-row__cell" data-label="Loại hình">${work.typology}</span>
        <span class="work-row__cell" data-label="Khu vực">${work.location}</span>
        <span class="work-row__cell work-row__year" data-label="Năm">${work.year}</span>
      </a>
    `).join("")}`;

    list.querySelectorAll(".work-row").forEach((row, index) => {
      const preview = row.getAttribute("data-preview");

      if (index === 0 && preview) {
        updatePreview(preview, row.getAttribute("data-title"));
      }

      row.addEventListener("mouseenter", () => {
        updatePreview(preview, row.getAttribute("data-title"));
      });
    });

    if (enhancedMotionReady) {
      window.requestAnimationFrame(() => animateWorkRows(list));
    }

    applyListDim();
  }

  function applyListDim(term = "") {
    list.querySelectorAll(".work-row").forEach((row) => {
      const terms = (row.getAttribute("data-terms") || "").split(",");
      row.classList.toggle("is-dimmed", Boolean(term) && !terms.includes(term));
    });
  }

  function renderMeta() {
    const label = termMeta[activeTerm].label;
    activeFilterLabel.textContent = label;
    title.textContent = activeTerm === "all" ? "Dự án" : label;
    count.textContent = `(${filteredWorks().length})`;
  }

  function renderView() {
    const isGrid = activeView === "grid";
    worksMain.dataset.viewMode = activeView;
    grid.hidden = !isGrid;
    listShell.hidden = isGrid;
    grid.style.display = isGrid ? "" : "none";
    listShell.style.display = isGrid ? "none" : "grid";

    viewToggle.querySelectorAll("[data-view]").forEach((button) => {
      button.classList.toggle("is-active", button.getAttribute("data-view") === activeView);
    });
  }

  function sync(animate = false) {
    if (animate && enhancedMotionReady && window.gsap && !isTransitioning) {
      const outgoing = activeView === "grid"
        ? Array.from(grid.querySelectorAll(".work-card"))
        : Array.from(list.querySelectorAll(".work-row"));
      const offset = window.innerHeight - (document.querySelector(".works-shell")?.getBoundingClientRect().top || 0) + 10;

      isTransitioning = true;
      const timeline = window.gsap.timeline({
        onComplete: () => {
          renderFilters();
          renderMeta();
          renderGrid();
          renderList();
          renderView();
          isTransitioning = false;
          window.ScrollTrigger?.refresh();
        }
      });

      if (activeView === "grid" && outgoing.length) {
        timeline.to(outgoing, {
          y: offset,
          autoAlpha: 0.92,
          stagger: -0.03,
          duration: 1.1,
          ease: "power4.inOut"
        });
      } else if (outgoing.length) {
        timeline.to(outgoing, {
          y: 32,
          autoAlpha: 0,
          stagger: -0.02,
          duration: 0.25,
          ease: "power2.out"
        });
      } else {
        timeline.call(() => {});
      }

      return;
    }

    renderFilters();
    renderMeta();
    renderGrid();
    renderList();
    renderView();
  }

  function switchView(nextView) {
    if (nextView === activeView || isTransitioning) return;

    const previousView = activeView;
    activeView = nextView;
    window.localStorage.setItem("works-view", activeView);

    viewToggle.querySelectorAll("[data-view]").forEach((button) => {
      button.classList.toggle("is-active", button.getAttribute("data-view") === activeView);
    });

    if (!enhancedMotionReady || !window.gsap) {
      renderView();
      smoothScrollToTop(true);
      return;
    }

    const outgoing = previousView === "grid" ? grid : listShell;
    const incoming = nextView === "grid" ? grid : listShell;

    isTransitioning = true;
    incoming.hidden = false;

    window.gsap.timeline({
      onComplete: () => {
        window.gsap.set([grid, listShell], { clearProps: "display,opacity" });
        renderView();
        if (nextView === "grid") {
          animateWorkGrid(grid);
        } else {
          animateWorkRows(list);
        }
        smoothScrollToTop(true);
        isTransitioning = false;
        window.ScrollTrigger?.refresh();
      }
    })
      .to(outgoing, {
        autoAlpha: 0,
        duration: 0.3,
        ease: "power2.out"
      })
      .set(outgoing, { display: "none" })
      .set(incoming, { display: "grid", autoAlpha: 0 })
      .to(incoming, {
        autoAlpha: 1,
        duration: 0.35,
        ease: "power2.out"
      });
  }

  filtersList.addEventListener("click", (event) => {
    const button = event.target.closest("[data-term]");
    if (!button) return;

    activeTerm = button.getAttribute("data-term") || "all";
    sync(true);

    if (window.innerWidth < 960) {
      filtersPanel?.classList.remove("is-open");
    }
  });

  viewToggle.addEventListener("click", (event) => {
    const button = event.target.closest("[data-view]");
    if (!button) return;

    switchView(button.getAttribute("data-view") || "grid");
  });

  filtersToggle?.addEventListener("click", () => filtersPanel?.classList.add("is-open"));
  filtersClose?.addEventListener("click", () => filtersPanel?.classList.remove("is-open"));

  sync();
}

function renderTeamPage() {
  const list = document.querySelector("[data-team-list]");
  const image = document.querySelector("[data-team-image]");
  const role = document.querySelector("[data-team-role]");

  if (!list || !image || !role) return;

  let activeName = teamMembers[0].name;

  function setActive(member) {
    activeName = member.name;
    role.textContent = member.role;

    if (enhancedMotionReady && window.gsap) {
      window.gsap.to(image, {
        autoAlpha: 0,
        duration: 0.14,
        onComplete: () => {
          image.src = member.image;
          image.alt = member.name;
          window.gsap.to(image, {
            autoAlpha: 1,
            duration: 0.3,
            ease: "power2.out"
          });
        }
      });
    } else {
      image.src = member.image;
      image.alt = member.name;
    }

    list.querySelectorAll("[data-team-name]").forEach((button) => {
      button.classList.toggle("is-active", button.getAttribute("data-team-name") === activeName);
    });
  }

  list.innerHTML = teamMembers.map((member) => `
    <button class="team-list__item ${member.name === activeName ? "is-active" : ""}" type="button" data-team-name="${member.name}">
      ${member.name}
    </button>
  `).join("");

  list.querySelectorAll("[data-team-name]").forEach((button, index) => {
    const member = teamMembers[index];
    button.addEventListener("mouseenter", () => {
      if (window.innerWidth >= 960) {
        setActive(member);
      }
    });
    button.addEventListener("click", () => setActive(member));
  });

  renderVisionCards("[data-values-cards]", siteMeta.values, true);
  renderVisionCards("[data-vision-cards]", siteMeta.visionCards);

  const awardsMount = document.querySelector("[data-awards-list]");
  if (awardsMount) {
    awardsMount.innerHTML = siteMeta.awards.map((item) => `
      <article class="award-row">
        <span class="award-row__year">${item.year}</span>
        <span>${item.project}</span>
        <span>${item.award}</span>
        <span>${item.result}</span>
      </article>
    `).join("");
  }

  const jobsMount = document.querySelector("[data-jobs-list]");
  if (jobsMount) {
    jobsMount.innerHTML = siteMeta.jobs.map((item) => `
      <a class="job-card" href="${item.href}">
        <div>
          <h3>${item.title}</h3>
          <div class="job-card__meta">${item.meta.join(" / ")}</div>
        </div>
        <span class="job-card__icon">+</span>
      </a>
    `).join("");
  }

  setActive(teamMembers[0]);
}

function renderProcessPage() {
  const initiativesMount = document.querySelector("[data-initiatives-list]");
  const accreditationsMount = document.querySelector("[data-accreditations-list]");

  if (initiativesMount) {
    initiativesMount.innerHTML = siteMeta.initiatives.map((item, index) => `
      <article class="initiative-card" style="--card-index:${index}">
        <div class="initiative-card__media">
          <img src="${item.image}" alt="${item.title}" loading="lazy">
        </div>
        <div class="initiative-card__copy">
          <h3>${item.title}</h3>
          ${item.text.map((paragraph) => `<p>${paragraph}</p>`).join("")}
        </div>
      </article>
    `).join("");
  }

  if (accreditationsMount) {
    accreditationsMount.innerHTML = siteMeta.accreditations.map((item) => `
      <article class="accreditation-item">
        <h3>${item.title}</h3>
        <p>${item.detail}</p>
      </article>
    `).join("");
  }
}

function renderProjectPage() {
  const mount = document.querySelector("[data-project-page]");
  if (!mount) return;

  const params = new URLSearchParams(window.location.search);
  const slug = params.get("slug") || works[0]?.slug;
  const work = works.find((item) => item.slug === slug) || works[0];
  const project = getProjectContent(work);
  const galleryImages = project.gallery.slice(1).filter(Boolean);

  document.title = `${work.title} - Sleeper`;

  mount.innerHTML = `
    <section class="page-intro reveal">
      <div class="grid-w project-header">
        <div class="project-header__actions">
          <a class="subtle" href="${routes.works}">[ Quay lại danh sách dự án ]</a>
        </div>
        <h1 class="display display--xl" data-animate="title">${work.title}</h1>
        <div class="project-meta-bar">
          <span><strong>Khách hàng</strong> ${project.client}</span>
          <span><strong>Loại hình</strong> ${work.typology}</span>
          <span><strong>Năm</strong> ${work.year}</span>
          <span><strong>Trạng thái</strong> ${project.status}</span>
        </div>
      </div>
    </section>

    <section class="project-hero reveal">
      <div class="grid-w">
        <figure class="image-frame image-frame--project">
          <img src="${project.gallery[0]}" alt="${work.title}" loading="eager">
        </figure>
      </div>
    </section>

    <section class="section reveal">
      <div class="grid-w section__grid">
        <div class="section__eyebrow">
          <span class="section__index">01</span>
          <span class="section__label">Thông tin dự án</span>
        </div>
        <div class="section__content section__content--wide project-details">
          <div class="project-details__summary">
            <p data-animate="content">${project.summary}</p>
          </div>
          <div class="project-details__table">
            <div><span>Khu vực</span><strong>${project.country}</strong></div>
            <div><span>Hạng mục</span><strong>${project.discipline}</strong></div>
            <div><span>Phạm vi</span><strong>${project.awards}</strong></div>
          </div>
        </div>
      </div>
    </section>

    <section class="quote-block reveal">
      <div class="grid-w">
        <blockquote class="display display--quote">${project.quote}</blockquote>
      </div>
    </section>

    ${project.sections.map((section) => `
      <section class="section reveal">
        <div class="grid-w section__grid">
          <div class="section__eyebrow">
            <span class="section__index">${section.index}</span>
            <span class="section__label">${section.title}</span>
          </div>
          <div class="section__content section__content--wide narrative-block">
            <figure class="image-frame image-frame--narrative">
              <img src="${section.image}" alt="${section.title}" loading="lazy">
            </figure>
            <p class="lead lead--narrow" data-animate="content">${section.text}</p>
          </div>
        </div>
      </section>
    `).join("")}

    ${galleryImages.length ? `
      <section class="section reveal project-gallery-section">
        <div class="grid-w">
          <div class="project-gallery">
            ${galleryImages.map((image) => `
              <figure class="image-frame image-frame--gallery">
                <img src="${image}" alt="${work.title}" loading="lazy">
              </figure>
            `).join("")}
          </div>
        </div>
      </section>
    ` : ""}
  `;
}

function bootPage() {
  renderHomeSpotlights();
  renderHomeCollage();
  renderHomeVision();
  renderServices();
  applyPreviewSection();
  renderVisionCards("[data-vision-cards]", siteMeta.visionCards);
  renderWorksPage();
  renderTeamPage();
  renderProcessPage();
  renderProjectPage();
}

async function bootstrap() {
  renderHeader();
  renderFooter();
  renderWordmarks();
  initLoader();
  initClock();
  initMenu();
  initNewsletter();
  initBackToTop();
  initPageTransitions();
  initHeaderState();
  bootPage();

  const motionLibrariesReady = await ensureMotionLibraries();
  if (motionLibrariesReady) {
    initEnhancedMotion();
  } else {
    if (page === "home") {
      initHomeWidget();
      initHomeVision();
      if (skipLoader) {
        scrollToInitialHash(40);
      } else {
        window.setTimeout(() => {
          hideLoader(true);
          scrollToInitialHash(80);
        }, 900);
      }
    }
    initReveal();
  }
}

bootstrap();
