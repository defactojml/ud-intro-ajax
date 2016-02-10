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


//var  apiKey = b3bdddc89ecc48e025bfad40ac785142;
var userId = '138726948@N08';

var flickrCall = function () {
  //var url = 'https://api.flickr.com/services/rest/?&method=flickr.people.getPublicPhotos&api_key=' + apiKey + '&user_id=' + userId + '&format=json&jsoncallback=?';


  var tags = 'Roland';
  var tagmode = 'and';
  var lat = 48.86342;
  var long = 2.26189;
  var radius = 1;

  //var url = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=' + apiKey + '&tags=' + tags + '&tag_mode=' + tagmode + '&lat=' + lat + '&lon=' + long + '&radius=' + radius + '&radius_units=km&format=json&nojsoncallback=1';

  var url = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=b3bdddc89ecc48e025bfad40ac785142&tags=Roland+Garros&tag_mode=and&lat=48.86342&lon=2.26189&radius=2&radius_units=km&format=json&nojsoncallback=1';

  $.getJSON(url)
    .success(function (data) {
      console.log('yessss');
      console.log(data);

      //loop through the results with the following function
      $.each(data.photos.photo, function (i, item) {

        // take the first one and store the value


        //build the url of the photo in order to link to it
        var photoURL = 'http://farm' + item.farm + '.static.flickr.com/' + item.server + '/' + item.id + '_' + item.secret + '_m.jpg';
      })
    })
    .fail(function (e) {
      console.log('nooooo...%o', e)
    });
  console.log('sent');
};

flickrCall();
