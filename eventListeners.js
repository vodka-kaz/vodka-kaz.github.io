document.addEventListener("DOMContentLoaded",(function(){const t=document.querySelectorAll(".nav-btn"),e=document.querySelectorAll(".screen"),n="//";function o(t){e.forEach((t=>t.classList.remove("active")));const n=document.getElementById(t);n&&n.classList.add("active")}const a=window.location.pathname.startsWith(n)?window.location.pathname.substring(n.length).toLowerCase():"";["vodka","vodka-casino","casino-vodka","vodka-bet","водка-казино","казино-водка"].includes(a)&&o(a),t.forEach((t=>{t.addEventListener("click",(function(){const t=this.getAttribute("data-target");t&&(o(t),history.pushState({screen:t},"",`${n}${t}`))}))})),window.addEventListener("popstate",(function(t){t.state&&t.state.screen?o(t.state.screen):e.forEach((t=>t.classList.remove("active")))}))}));
