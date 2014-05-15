/* global $:true, alert:true, document:true */
"use strict";

var doMovieQuery = function (q) {
  if (q.length >= 3) {
    $.mobile.loading('show');
    var url = 'http://api.themoviedb.org/3/',
      mode = 'search/movie?query=',
      movieName = '&query=' + encodeURI(q),
      key = '&api_key=470fd2ec8853e25d2f8d86f685d2270e',
      type = '&search_type=ngram';

    $.ajax({
      url: url + mode + key + movieName + type,
      dataType: "jsonp",
      async: true,
      success: showSearchResult,
      error: function () {
        alert('Network error has occurred please try again!');
      }
    });
  } else {
    emptyMovieList();
  }
};

var emptyMovieList = function () {
  $('#movie-list').empty();
  $('#movie-list').append('<li>No results, please search</li>');
  $('#movie-list').listview('refresh');
};

$(document).on('pageinit', '#home', function () {
  emptyMovieList();
});

$(function () {
  $('#search').keyup(function () {
    doMovieQuery($(this).val());
  });
  $('#search').change(function () {
    if ($(this).val() === "") {
      emptyMovieList();
    }
  });
});

$(document).on('pagebeforeshow', '#headline', function () {
  $('#movie-data').empty();
  $.each(movieInfo.result, function (i, row) {
    console.log(row);
    if (row.id.toString() === movieInfo.id.toString()) {
      console.log(row.id);
      $('#movie-data').append('<li><img src="http://d3gtl9l2a4fn1j.cloudfront.net/t/p/w185' + row.poster_path + '"></li>');
      $('#movie-data').append('<li>Title: ' + row.original_title + '</li>');
      $('#movie-data').append('<li>Release date: ' + row.release_date + '</li>');
      $('#movie-data').append('<li>Popularity: ' + row.popularity + '</li>');
      $('#movie-data').append('<li>Average rating: ' + row.vote_average + '</li>');
      $('#movie-data').listview('refresh');
    }
  });
});

$(document).on('vclick', '#movie-list li a', function () {
  movieInfo.id = $(this).attr('data-id');
  $.mobile.changePage("#headline", {transition: "slide", changeHash: false});
});

var movieInfo = {
  id: null,
  result: null
};

var showSearchResult = function (result) {
  movieInfo.result = result.results;
  if (result.results.length < 1) {
    emptyMovieList();
  } else {
    $('#movie-list').empty();
    $.each(result.results, function (i, row) {
      var img = row.poster_path ? '<img src="http://d3gtl9l2a4fn1j.cloudfront.net/t/p/w185' + row.poster_path + '"/>' : '<div style="float:left; width: 100px;">&nbsp;</div>';
      $('#movie-list').append('<li><a href="" data-id="' + row.id + '">' + img + '<h3>' + row.title + '</h3><p>' + row.vote_average + '/10</p></a></li>');
    });
    $('#movie-list').listview('refresh');
  }
  $.mobile.loading('hide');
};
