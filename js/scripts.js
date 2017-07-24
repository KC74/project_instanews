$(document).ready(function() {
// HEADER SCRIPTS
// variables
var $siteHeader = $('.site-header'),
    $mainContent = $('content-container'),
    $stories  = $('#stories'),
    $contentLoader = $('#content-loader');

// find non empty elements
// function isEmpty( el ){
//     return !$.trim(el.html())
// }

// Header transition
$('.sections').change(function(event) {
  event.preventDefault();
  // check to see if default
  if ($('select option[value]:selected').val() === 'section...') {
    // hide loader
    $($contentLoader).hide()
    // clear previous content
    $($stories).html('');
    // remove header movement
    $siteHeader.removeClass('header-transition--up');
    // reset header position
    $siteHeader.addClass('header-transition--reset');

  } else {
    $( 'select option:selected' ).each(function() {
      // clear previous content
      $($stories).html('');
      // reset the position
      $siteHeader.removeClass('header-transition--reset')
      // move header up
      $siteHeader.addClass('header-transition--up');

      // NYT API
      // Built by LucyBot. www.lucybot.com
      var $section = $('option[value]:selected').val().replace(' ', ''),
          url = '';     
          url += 'https://api.nytimes.com/svc/topstories/v2/',
          url += $section,
          url += '.json';

      url += '?' + $.param({
      'api-key': 'b36c31140be944319d86b784759c34bd'
      });
      $.ajax({
        url: url,
        method: 'GET',
      })
      .done(function(result) {
        console.log(result);
        var $contentString = '';
        var $contentObject = result.results;

        // toggle loader class in content area
        $($contentLoader).show();
        $($stories).hide();
        $.each($contentObject, function(key, value) {
          // var $storyUrl = $contentObject.short_url;
              // $listStoryItem_HTML = '<li class="story-item">',
              // $storyLink_HTML = '<a href="' + $storyUrl + ' target="_blank">';
          var $imageUrl = $contentObject[key].multimedia[4].url;

          // create new list item
          $contentString += '<li class="story-item">',
          // create anchor and open in new tab
          $contentString += '<a href="' + $contentObject[key].short_url + ' "target="_blank">',
          // create story container
          $contentString += '<div class="story-container"',
          // insert background image
          $contentString += 'style="background-image: url(' + $imageUrl + ');">',
          // create abstract container
          $contentString += '<div class="story-abstract">',
          // insert <p> abstract </p>
          $contentString += '<p>' + $contentObject[key].abstract + '</p>';
          // close off div div a li
          $contentString += '</div></div></a></li>'

          // $contentString += 'style="background: url("' + $contentObject[key].multimedia[4].url + '") no-repeat cover;>',
        });
        // append stories
        $($stories).append($contentString);

        // hide content loader and show stories
        $($contentLoader).hide(1000);
        $($stories).show(1000);
      })
        .fail(function(err) {
        throw err;
      }); // EOF API function
    })
  }
});   

// SECTION SCRIPTS
// variables
var $listOfSections = ['section...', 'home', 'opinion', 'world', 'national', 'politics', 'upshot', 'ny region', 'business', 'technology', 'science', 'health', 'sports', 'arts', 'books', 'movies', 'theatre', 'sunday review', 'fashion', 'time magazine', 'food', 'magazine', 'real estate', 'automobiles', 'obituaries', 'insider'];


// Function to populate list of sections
function makeListOfSections() {
    var optionsString = '';
    // Add a list of sections
    for (var i = 0 ; i < $listOfSections.length ; i++) {
        optionsString += '<option value="';
        optionsString += $listOfSections[i];
        optionsString += '">';
        optionsString += $listOfSections[i];
        optionsString += '</option>';
    }
    $('#sections').append(optionsString);
}


// FOOTER SCRIPTS
// variables


// MAIN 
makeListOfSections();

}) // EOF doc.ready