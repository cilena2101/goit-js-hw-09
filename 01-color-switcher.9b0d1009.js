!function(){var t=document.querySelector("[data-start]"),e=document.querySelector("[data-stop]"),r=document.querySelector("body");t.addEventListener("click",(function(){n=setInterval(o,1e3),t.toggleAttribute("disabled")})),e.addEventListener("click",(function(){clearInterval(n),t.removeAttribute("disabled")}));var n=null;function o(){r.style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16).padStart(6,0))}}();
//# sourceMappingURL=01-color-switcher.9b0d1009.js.map
