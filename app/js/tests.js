/* global test:true, equal:true, throws:true, ms:true */
"use strict";

test("shouldDoSearch", function () {
  equal(ms.shouldDoSearch(''), false);
  equal(ms.shouldDoSearch('a'), false);
  equal(ms.shouldDoSearch('aa'), false);
  equal(ms.shouldDoSearch('aaa'), true);
  throws(function () {
    ms.shouldDoSearch(false);
  });
});

test("buildApiUrl", function () {
  equal(ms.buildApiUrl('batma'),
    'http://api.themoviedb.org/3/search/movie?query=batma' +
    '&api_key=470fd2ec8853e25d2f8d86f685d2270e&search_type=ngram');
  equal(ms.buildApiUrl('batmé'),
    'http://api.themoviedb.org/3/search/movie?query=batm%C3%A9' +
    '&api_key=470fd2ec8853e25d2f8d86f685d2270e&search_type=ngram');
});

test("getMovieListItemHtml", function () {
  var m = {
    poster_path: "xxx.png",
    id: "220",
    title: "Lord of the Rings",
    vote_average: 7.8
  };
  equal(ms.getMovieListItemHtml(m),
    "<li><a href=\"\" data-id=\"220\">" +
    "<img src=\"http://d3gtl9l2a4fn1j.cloudfront.net/t/p/w185xxx.png\"/>" +
    "<h3>Lord of the Rings</h3><p>7.8/10</p></a></li>"
  );
});
