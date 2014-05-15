/* global $:true, document:true, ms:true, alert:true */
"use strict";

var doMovieQuery = function (q, cb) {
  if (ms.shouldDoSearch(q)) {
    $.mobile.loading('show');
    $.ajax({
      url: ms.buildApiUrl(q),
      dataType: "jsonp",
      async: true,
      success: cb,
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
    doMovieQuery($(this).val(), showSearchResult);
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
    if (row.id.toString() === movieInfo.id.toString()) {
      $('#movie-data').append(ms.getMovieDetailHtml(row));
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
      $('#movie-list').append(ms.getMovieListItemHtml(row));
    });
    $('#movie-list').listview('refresh');
  }
  $.mobile.loading('hide');
};
