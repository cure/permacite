// Copyright (c) 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * Get the current URL.
 *
 * @param {function(string)} callback - called when the URL of the current tab
 *   is found.
 */
function getCurrentTabUrl(callback) {
  // Query filter to be passed to chrome.tabs.query - see
  // https://developer.chrome.com/extensions/tabs#method-query
  var queryInfo = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, function(tabs) {
    // chrome.tabs.query invokes the callback with a list of tabs that match the
    // query. When the popup is opened, there is certainly a window and at least
    // one tab, so we can safely assume that |tabs| is a non-empty array.
    // A window can only have one active tab at a time, so the array consists of
    // exactly one tab.
    var tab = tabs[0];

    // A tab is a plain object that provides information about the tab.
    // See https://developer.chrome.com/extensions/tabs#type-Tab
    var url = tab.url;

    // tab.url is only available if the "activeTab" permission is declared.
    // If you want to see the URL of other tabs (e.g. after removing active:true
    // from |queryInfo|), then the "tabs" permission is required to see their
    // "url" properties.
    console.assert(typeof url == 'string', 'tab.url should be a string');

    callback(url);
  });

  // Most methods of the Chrome extension APIs are asynchronous. This means that
  // you CANNOT do something like this:
  //
  // var url;
  // chrome.tabs.query(queryInfo, function(tabs) {
  //   url = tabs[0].url;
  // });
  // alert(url); // Shows "undefined", because chrome.tabs.query is async.
}

function renderStatus(statusText) {
  document.getElementById('status').textContent = statusText;
}

function renderWarning(warningText) {
  document.getElementById('warning').textContent = warningText;
}

document.addEventListener('DOMContentLoaded', function() {
  getCurrentTabUrl(function(url) {

    // Example:
    // https://scholar.google.com/scholar_case?case=17131021642024451854&q=776+F.3d+393&hl=en&as_sdt=40000003&as_ylo=2015
    // permalink:
    // https://scholar.google.com/scholar?q=163+US+537&hl=en&as_sdt=2&btnI=1

    var parser = document.createElement('a');
    parser.href = url;

    var q = parser.search.replace(/^.*(q=.*?)[&|$].*/,"$1");
    var hl = parser.search.replace(/^.*(hl=.*?)[&|$].*/,"$1");

    if (!parser.hostname.match(/^scholar.google.com/)) {
      renderWarning("Error - this is not a Google Scholar URL!");
      return;
    }

    // Very basic protection against non-citation searches
    if (!q.match(/^q=\d+/)) {
      renderWarning("Warning - this page does not look like the result of a reporter citation search!");
    }

    var newurl = parser.protocol + '//' + parser.hostname + '/scholar?' + q + '&' + hl + '&as_sdt=2&btnI=1'

    // Dump the URL in a div
    var urlDiv = document.querySelector('#url');
    urlDiv.innerHTML = newurl;

    // Select the div
    var range = document.createRange();
    range.selectNode(urlDiv);
    window.getSelection().addRange(range);

    try {
      // Now that we've selected the anchor text, execute the copy command
      // Minimum chrome version: 43 !
      var successful = document.execCommand('copy');
      var msg = successful ? 'successful' : 'unsuccessful';
      renderStatus('Copied url to clipboard');
    } catch(err) {
      renderStatus('Oops, unable to copy');
    }

    document.execCommand('copy');

  });
});
