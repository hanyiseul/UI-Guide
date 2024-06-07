// Connect Sass
require("../scss/index.scss");

// SVG Sprites
function requireAll(r) {
  r.keys().forEach(r);
}
requireAll(require.context("../images/sprites", true, /\.svg$/));

// Loading
window.addEventListener("load", () => {
  document.body.classList.remove("before-load");

  document.querySelector(".loading").addEventListener("transitionend", e => {
    document.body.removeChild(e.currentTarget);
  });
});

// jQuery
window.jQuery = window.$ = require("jquery");

//
// UI Scripts
//
var UIScripts = (function () {
  // Header Fixed - ScrollLeft
  /*
  function fixedElements() {
    if ($(".header, .sidebar").length) {
      var fixedScrollLeft = $(".header, .sidebar");

      fixedScrollLeft.css("left", $(document).scrollLeft() * -1);
    }
  }
  */

  // DOMContentLoaded
  window.addEventListener("DOMContentLoaded", function () {
    // fixedElements();
  });

  // Scroll
  window.addEventListener("scroll", function () {
    // fixedElements();
  });
})();