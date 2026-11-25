// Shared by every page of every site and prototype. Include it once per page, before </body>, with a path
// relative to the page, e.g. <script src="../../frame.js"></script>.
// Inside the main page (index.html) it tells the frame which page is open, so the address bar, the page list
// and back/forward follow links inside the site. Opened on its own, it does nothing.
(function () {
  if (window.parent === window) return;
  try {
    window.parent.postMessage({ designFrame: { page: location.pathname.split("/").pop() || "index.html", title: document.title } }, "*");
  } catch (e) {}
})();
