(function () {
  "use strict";

  var WHATSAPP_NUMBER = "5562996211942"; // +55 62 99621-1942, international format, digits only

  /* ----------------------------------------------------------
     Footer year
  ---------------------------------------------------------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ----------------------------------------------------------
     Scroll progress bar
  ---------------------------------------------------------- */
  var progressFill = document.getElementById("progressFill");
  function updateProgress() {
    var scrollTop = window.scrollY || document.documentElement.scrollTop;
    var docHeight = document.documentElement.scrollHeight - window.innerHeight;
    var pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    if (progressFill) progressFill.style.width = pct + "%";
  }
  window.addEventListener("scroll", updateProgress, { passive: true });
  updateProgress();

  /* ----------------------------------------------------------
     Gait divider: draw-in on scroll into view
  ---------------------------------------------------------- */
  var gaitDividers = document.querySelectorAll(".gait-divider");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.35 }
    );
    gaitDividers.forEach(function (el) { io.observe(el); });
  } else {
    gaitDividers.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ----------------------------------------------------------
     Mobile nav toggle
  ---------------------------------------------------------- */
  var navToggle = document.getElementById("navToggle");
  var mainNav = document.querySelector(".main-nav");
  if (navToggle && mainNav) {
    navToggle.addEventListener("click", function () {
      var isOpen = mainNav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
    mainNav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        mainNav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ----------------------------------------------------------
     Booking: populate available dates (next 30 days, skip Sundays)
     and time slots (every 30 min, 08:00–17:30), fully static/client-side.
  ---------------------------------------------------------- */
  var dateSelect = document.getElementById("prefDate");
  var timeSelect = document.getElementById("prefTime");

  var WEEKDAY_LABELS = ["dom", "seg", "ter", "qua", "qui", "sex", "sáb"];
  var MONTH_LABELS = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];

  function buildDateOptions() {
    if (!dateSelect) return;
    var today = new Date();
    var added = 0;
    var offset = 1; // start from tomorrow

    while (added < 20) {
      var d = new Date(today);
      d.setDate(today.getDate() + offset);
      offset++;

      if (d.getDay() === 0) continue; // skip Sundays

      var opt = document.createElement("option");
      var iso = d.toISOString().slice(0, 10);
      opt.value = iso;
      opt.textContent =
        WEEKDAY_LABELS[d.getDay()] + ", " + d.getDate() + " " + MONTH_LABELS[d.getMonth()];
      dateSelect.appendChild(opt);
      added++;
    }
  }

  function buildTimeOptions() {
    if (!timeSelect) return;
    var start = 8 * 60; // 08:00 in minutes
    var end = 17 * 60 + 30; // last slot 17:30
    for (var m = start; m <= end; m += 30) {
      var h = Math.floor(m / 60);
      var min = m % 60;
      var label = (h < 10 ? "0" + h : h) + ":" + (min === 0 ? "00" : min);
      var opt = document.createElement("option");
      opt.value = label;
      opt.textContent = label;
      timeSelect.appendChild(opt);
    }
  }

  buildDateOptions();
  buildTimeOptions();

  /* ----------------------------------------------------------
     Booking: form submit -> compose WhatsApp message
  ---------------------------------------------------------- */
  var form = document.getElementById("agendaForm");
  var status = document.getElementById("formStatus");

  function formatDateLabel(iso) {
    var parts = iso.split("-");
    var d = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
    return WEEKDAY_LABELS[d.getDay()] + ", " + d.getDate() + " de " + MONTH_LABELS[d.getMonth()];
  }

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      status.classList.remove("is-error");

      var data = new FormData(form);
      var tutorName = (data.get("tutorName") || "").toString().trim();
      var tutorPhone = (data.get("tutorPhone") || "").toString().trim();
      var petName = (data.get("petName") || "").toString().trim();
      var service = (data.get("service") || "").toString().trim();
      var prefDate = (data.get("prefDate") || "").toString().trim();
      var prefTime = (data.get("prefTime") || "").toString().trim();
      var message = (data.get("message") || "").toString().trim();

      if (!tutorName || !tutorPhone || !petName || !service || !prefDate || !prefTime) {
        status.textContent = "Preencha os campos obrigatórios antes de enviar.";
        status.classList.add("is-error");
        return;
      }

      var lines = [
        "Olá! Gostaria de agendar uma consulta na Movere.",
        "",
        "Tutor: " + tutorName,
        "Telefone: " + tutorPhone,
        "Pet: " + petName,
        "Serviço: " + service,
        "Preferência de data: " + formatDateLabel(prefDate),
        "Preferência de horário: " + prefTime
      ];

      if (message) {
        lines.push("", "Sobre o caso: " + message);
      }

      var text = encodeURIComponent(lines.join("\n"));
      var url = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + text;

      status.textContent = "Abrindo o WhatsApp com sua solicitação preenchida...";
      window.open(url, "_blank", "noopener");

      form.reset();
      buildTimeOptionsResetGuard();
    });
  }

  // After form.reset(), the dynamically added <option> elements remain
  // (they belong to the select, not the form's default state), so nothing
  // further is required — this guard exists only for clarity/no-op safety.
  function buildTimeOptionsResetGuard() {}
})();
