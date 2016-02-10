/**
 * Created by jean-michel.legrand on 09/02/2016.
 */


/** http://api.flickr.com/services/rest/?
 * &method=flickr.people.getPublicPhotos
 * &api_key=983c56b3652c1b44c58ddce47cef6449
 * &user_id=138726948@N08
 * &format=json
 * &per_page=5
 */


/**
 * Reference
 * http://o04151985.kylerush.net/blog/flickr-api/
 * http://kylerush.net/blog/tutorial-flickr-api-javascript-jquery-ajax-json-build-detailed-photo-wall/
 */


// https://api.flickr.com/services/rest/?&method=flickr.people.getPublicPhotos&api_key=983c56b3652c1b44c58ddce47cef6449&user_id=138726948@N08&format=json&per_page=5


var flickrCall = function () {
  //var url = 'https://api.flickr.com/services/rest/?&method=flickr.people.getPublicPhotos&api_key=' + apiKey + '&user_id=' + userId + '&format=json&jsoncallback=?';

  var MAX_NUMBER = 10;
  var apiKey = 'b3bdddc89ecc48e025bfad40ac785142';
  var userId = '138726948@N08';
  var tagsInput = 'Roland Garros';
  var tagmode = 'and';
  var lat = 48.86342;
  var long = 2.26189;
  var radius = 2;

  var tags = _.words(tagsInput);
  var url = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=' + apiKey + '&tags=' + tags + '&tag_mode=' + tagmode + '&lat=' + lat + '&lon=' + long + '&radius=' + radius + '&radius_units=km&format=json&nojsoncallback=1';
  console.log(url);

  //var url = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=b3bdddc89ecc48e025bfad40ac785142&tags=Roland+Garros&tag_mode=and&lat=48.86342&lon=2.26189&radius=2&radius_units=km&format=json&nojsoncallback=1';

  $.getJSON(url)
    .success(function (data) {
      //loop through the results with the following function
      var filteredData = _.filter(data.photos.photo, function (photo) {
        // check if title is different from ""
        if (!_.isEmpty(photo.title)) {
          // tranform string into array
          var words = _.words(photo.title);
          return _.isEqual((_.filter(tags, function (tag) {
            return (_.findIndex(words, function (word) {
              return word === tag
            }) === -1) ? false : true;
          })), tags);
        }
      });
      console.log('number of pics found for', tagsInput, filteredData.length);
      var photoSelected = _.slice(filteredData, filteredData.length - MAX_NUMBER)[_.random(0, MAX_NUMBER - 1)];
      console.log('photo selected for', tagsInput, photoSelected);
    })
    .fail(function (e) {
      console.log('nooooo...%o', e)
    });
  console.log('sent');
};

flickrCall();

/*
 var elementsATrouver = ["Roland", "Garros"];
 var inputs = [["Serena", "Garros", "Roland", "2015"], ["Serena", "Wiliams"], ["Roland", "Garros", "2005"]];

 var goodCandidate  = _.isEqual((_.filter(elementsATrouver, function(elementATrouver) {
 var found = false;
 var res = _.findIndex(inputs, function(element) {
 return element === elementATrouver
 });
 found = (res === -1) ? false : true;
 return found;
 })), elementsATrouver);

 if (goodCandidate) {
 console.log("element found!!")
 }
 */