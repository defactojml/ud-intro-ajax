function loadData() {

  var $body = $('body');
  var $wikiElem = $('#wikipedia-links');
  var $nytHeaderElem = $('#nytimes-header');
  var $nytElem = $('#nytimes-articles');
  var $greeting = $('#greeting');

  // clear out old data before new request
  $wikiElem.text("");
  $nytElem.text("");

  var street = $("#street").val();
  var city = $("#city").val();
  var address = street + ',' + city;
  var url = "https://maps.googleapis.com/maps/api/streetview?size=400x600&location=" + address + "&fov=90&heading=235&pitch=10&key=AIzaSyB0oa8a6K6be8P0GGSRNtc0OMfUVj6pb4o";
  $body.append('<img class="bgimg" src="' + url + '">');

  //street view key
  //AIzaSyB0oa8a6K6be8P0GGSRNtc0OMfUVj6pb4o

  //nytimes key
  //7de128da63822c8962a80372fab5883a:9:73438305

  // load streetview

  var urlNewYorkTimes = "http://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + city + "&api-key=7de128da63822c8962a80372fab5883a:9:73438305";
  // YOUR CODE GOES HERE!
  $.getJSON(urlNewYorkTimes, function(data) {
    $nytHeaderElem.text('New York Times articles about ' + city);
    var articles = data.response.docs;
    $.each(articles, function(index, article) {
      $nytElem.append('<li class="article">' + '<a href="' + article.web_url + '">' + article.headline.main + '</a>' +
      '<p>' + article.snippet + '</p>' + "</li>");
    });
  }).error(function(e) {
    $nytHeaderElem.text('New York Times articles could not be loaded');
  });

  //var urlWikipedia = 'https://en.wikipedia.org/w/api.php?action=query&prop=revisions&rvprop=content&rvsection=0&titles=' + city;
  var urlWikipedia = 'https://en.wikjjjjjjjjjjjjjjjpedia.org/w/api.php?action=opensearch&search=' + city + '&format=json&callback=wikiCallback';

  var wikiRequetTimeout = setTimeout(function(){
    $wikiElem.text('on success : wikipedia articles could not be loaded');
  }, 8000 );

  $.ajax({
    method: "GET",
    url: urlWikipedia,
    dataType: "jsonp",
    success: function(response, status) {
      console.log('status ' + status);
      $.each(response[1], function(index, article) {
        var url = 'https://en.wikipedia.org/wiki' + article;
        $wikiElem.append('<li><a href ="' + article + '">' + article + '</a></li>');
      });
      clearTimeout(wikiRequetTimeout);
    },
    error: function(e) {
      $wikiElem.text('on error: wikipedia articles could not be loaded');
    }
  });


  return false;
};

$('#form-container').submit(loadData);

// loadData();
