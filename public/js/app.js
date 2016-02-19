var weatherData = null;
$(document).ready(function(){
  var baseUrl = 'https://api.forecast.io/forecast/';
  var name = 'Kevin Conklin'
 // $('#get-weather').on('click', getWeather);
  $('#get-weather').on('click', showInfo);

  function buildUrl(lat, lon){
    return baseUrl + apiKey+'/'+lat+','+lon;
  }

  function getWeather(){
    var lat = $('#latitude').val();
    var lon = $('#longitude').val();
    var options = {
      url: buildUrl(lat, lon),
      dataType: 'jsonp',
      success: successHandler,
      error: errorHandler
    };

    $.ajax(options);
}


  function successHandler(data){
    weatherData = data;
    $('#output').text(JSON.stringify(data));
    console.log(data);
  }

  function errorHandler(err){
    console.log(err);
}

  function showInfo(){
    var lat = $('#latitude').val();
    var lon = $('#longitude').val();
    var ajaxOptions = {
       url: buildUrl(lat,lon),
       dataType: 'jsonp',
       success: showInfoSuccess,
       error: errorHandler
    };

    $.ajax(ajaxOptions);
}
    function showInfoSuccess(hammer){
      console.log(hammer);
      var source = $('#info').html();
      var template = Handlebars.compile(source);
      var data = {
          latitude: hammer.latitude,
          longitude: hammer.longitude,
          icon: hammer.currently.icon || 'clear-night',
          summary: hammer.currently.summary,
          time: hammer.currently.time
      };
      var html = template(data);
      $('#test-output').html(html);
    }
});
