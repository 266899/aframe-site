(function () {

  /**
   * Wraps `querySelector` à la jQuery's `$`.
   *
   * @param {String|Element} sel CSS selector to match an element.
   * @param {Element=} parent Parent from which to query.
   * @returns {Element} Element matched by selector.
   */
  var $ = function (sel, parent) {
    var el = sel;
    if (sel && typeof sel === 'string') {
      el = (parent || document).querySelector(sel);
    }
    return el;
  };

  /**
   * Wraps `querySelectorAll` à la jQuery's `$`.
   *
   * @param {String|Element} sel CSS selector to match elements.
   * @param {Element=} parent Parent from which to query.
   * @returns {Array} Array of elements matched by selector.
   */
  var $$ = function (sel, parent) {
    if (Array.isArray(sel)) { return sel; }
    var els = sel;
    if (sel && typeof sel === 'string') {
      els = (parent || document).querySelectorAll(sel);
    }
    return toArray(els);
  };

  /**
   * Turns an array-like object into an array.
   *
   * @param {String|Element} obj CSS selector to match elements.
   * @param {Array|NamedNodeMap|NodeList|HTMLCollection} arr An array-like object.
   * @returns {Array} Array of elements matched by selector.
   */
  var toArray = function (obj) {
    if (Array.isArray(obj)) { return obj; }
    if (typeof obj === 'object' && typeof obj.length === 'number') {
      return Array.prototype.slice.call(obj);
    }
    return [obj];
  };

  var body = document.body;

  // To customise the base URL for the <iframe>'d examples, do this in the Console:
  //
  //   localStorage.examples_base_url = 'http://localhost:9000/examples/'
  //
  // To revert back to normal:
  //
  //   delete localStorage.examples_base_url
  //
  // And be sure to refresh the page :)
  var customExamplesBaseUrl;
  try {
    customExamplesBaseUrl = window.localStorage.examples_base_url;
  } catch (e) {
  }
  var isOnline = navigator.onLine;
  if (!isOnline) {
    console.warn('You appear to be offline. ' +
      'You can point the examples at your local server though:\n' +
      "localStorage.examples_base_url = 'http://localhost:9000/examples/'");
  }
  if (customExamplesBaseUrl) {
    // When you're on the airplane and Gogo Inflight Internet or Bongo Wireless
    // have got you down, you can load the examples from your local `aframe`
    // dev server, for example.
    $$('iframe.example__iframe').forEach(function (iframe) {
      var iframeData = iframe.dataset;
      if (iframeData.path.indexOf('//') !== -1) { return; }  // Ignore external URLs.
      iframe.setAttribute('src', customExamplesBaseUrl + iframeData.path);
    });
  }

  if (body.dataset.pageType === 'examples') {
    var navLinks = $$('.examples__list .nav-link');

    body.addEventListener('keyup', function (e) {
      // TODO: Check `activeElement`.
      var left = e.keyCode === 37;
      var right = e.keyCode === 39;
      if (!left && !right) { return; }

      var currentIdx = -1;
      navLinks.forEach(function (navLink, idx) {
        if (navLink.classList.contains('current')) {
          currentIdx = idx;
        }
      });
      var currentLink = navLinks[currentIdx];
      if (!currentLink) { return; }
      currentLink.classList.remove('current');

      var nextIndex;
      if (left) {
        nextIndex = currentIdx - 1;
      }
      if (right) {
        nextIndex = currentIdx + 1;
      }

      if (nextIndex <= 0) {
        nextIndex = navLinks.length;
      }
      if (nextIndex > navLinks.length) {
        nextIndex = 0;
      }

      var nextLink = navLinks[nextIndex];
      if (nextLink) {
        nextLink.click();
      }
    });
  }

  // Docs.

  var anchorHeadingsSelector = 'h2[id], h3[id], h4[id], h5[id], h6[id]';

  $('.content').addEventListener('click', function (e) {
    var el = e.target;
    if (el.matches && el.matches(anchorHeadingsSelector)) {
      window.location.hash = '#' + el.id;
    }
  });

})();
