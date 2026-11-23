    (() => {
      "use strict";

      const toggle = document.querySelector(".menu-toggle");
      const navigation = document.getElementById("menu-utama");
      const mobileViewport = window.matchMedia("(max-width: 860px)");

      // Mengatur status menu dan atribut aksesibilitas.
      function setMenu(isOpen) {
        toggle.setAttribute("aria-expanded", String(isOpen));
        toggle.setAttribute(
          "aria-label",
          isOpen ? "Tutup menu navigasi" : "Buka menu navigasi"
        );

        navigation.classList.toggle("is-open", isOpen);
      }

      // Aktifkan perilaku menu mobile hanya jika JavaScript tersedia.
      document.documentElement.classList.add("js-enabled");

      toggle.addEventListener("click", () => {
        const isOpen = toggle.getAttribute("aria-expanded") === "true";
        setMenu(!isOpen);
      });

      // Tutup menu setelah pengguna memilih tujuan.
      navigation.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => setMenu(false));
      });

      // Escape menutup menu dan mengembalikan fokus ke tombol.
      document.addEventListener("keydown", (event) => {
        if (
          event.key === "Escape" &&
          toggle.getAttribute("aria-expanded") === "true"
        ) {
          setMenu(false);
          toggle.focus();
        }
      });

      // Tutup menu ketika pengguna mengeklik di luar navbar.
      document.addEventListener("click", (event) => {
        if (!event.target.closest(".navbar")) {
          setMenu(false);
        }
      });

      // Saat berubah ke desktop, bersihkan status menu mobile.
      mobileViewport.addEventListener("change", () => setMenu(false));

      // Tutup menu jika fokus keyboard telah meninggalkan navbar.
      document.querySelector(".navbar").addEventListener("focusout", () => {
        window.setTimeout(() => {
          if (!document.activeElement.closest(".navbar")) {
            setMenu(false);
          }
        }, 0);
      });

      // Foto yang belum tersedia diganti latar placeholder.
      document.querySelectorAll(".person-photo img, .news-image img")
        .forEach((image) => {
          const showFallback = () => {
            image.hidden = true;
          };

          image.addEventListener("error", showFallback);

          if (image.complete && image.naturalWidth === 0) {
            showFallback();
          }
        });

      // Tahun hak cipta mengikuti tahun pada perangkat.
      document.getElementById("copyright-year").textContent =
        String(new Date().getFullYear());
    })();