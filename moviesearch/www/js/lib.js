"use strict";

var ms = {};

ms.shouldDoSearch = function (q) {
  if (typeof q === "string") {
    return q.length >= 3;
  } else {
    throw new Error("Query must be a string");
  }
};

ms.buildApiUrl = function (q) {
  var url = 'http://api.themoviedb.org/3/',
    mode = 'search/movie',
    movieName = '?query=' + encodeURI(q),
    key = '&api_key=470fd2ec8853e25d2f8d86f685d2270e',
    type = '&search_type=ngram';

  return url + mode + movieName + key + type;
};

ms.getMovieListItemHtml = function (movie) {
  var html = '';
  var img = movie.poster_path ?
    '<img src="http://d3gtl9l2a4fn1j.cloudfront.net/t/p/w185' +
      movie.poster_path + '"/>' :
    '<div style="float:left; width: 100px;">&nbsp;</div>';
  html += '<li><a href="" data-id="' + movie.id + '">' + img + '<h3>' +
          movie.title + '</h3><p>' + movie.vote_average + '/10</p></a></li>';
  return html;
};

ms.getMovieDetailHtml = function (movie) {
  var html = '';
  if (movie.poster_path) {
    html += '<li><img src="http://d3gtl9l2a4fn1j.cloudfront.net/t/p/w185' +
            movie.poster_path + '"></li>';
  }
  html += '<li>Title: ' + movie.original_title + '</li>';
  html += '<li>Release date: ' + movie.release_date + '</li>';
  html += '<li>Popularity: ' + movie.popularity + '</li>';
  html += '<li>Average rating: ' + movie.vote_average + '</li>';
  return html;
};
