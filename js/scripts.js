$(document).ready(function() {

// SELECTRIC SCRIPTS
// SELECTRIC
$('select').selectric();


// HEADER SCRIPTS
// Header transition
$('.sections').change(function(event) {
  event.preventDefault();
  // variables
  var $siteHeader = $('.site-header'),
      $stories  = $('#stories'),
      $contentLoader = $('#content-loader'),
      $MAX_NUM_OF_STORIES = 12; 
      
  // check to see if default is selected
  if ($('select option[value]:selected').val() === 'section...') {
    // hide loader
    $($contentLoader).hide();
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
        dataType: 'json'
      })
      .done(function(result) {
        var $contentString = '', // string builder
            $contentObject = result.results, // api object
            $limit = 0; // counter for story counting limit

        // toggle loader class in content area
        $($contentLoader).show();
        $($stories).hide();

        // go through the object's stories
        for (var i = 0; i < $contentObject.length ; i++) {
          var $storyUrl = $contentObject[i].short_url, // url 
              $lastImg = $contentObject[i].multimedia.length - 1, // largest img
              $storyAbstract = $contentObject[i].abstract, // abstract
              $imageUrl = ''; // image url

          // only append items that have images and make sure it is not undefined
          if ($contentObject[i].multimedia.length > 0) {     
            // set image url
            $imageUrl = $contentObject[i].multimedia[$lastImg].url; // bg
            // create new list item
            $contentString += '<li class="story-item">',
            // create anchor and open in new tab
            $contentString += '<a href="' + $storyUrl + ' "target="_blank">',
            // create story container
            $contentString += '<div class="story-container"',
            // insert background image
            $contentString += 'style="background-image: url(' + $imageUrl + ');">',
            // create abstract container
            $contentString += '<div class="story-abstract">',
            // insert <p> abstract </p>
            $contentString += '<p>' + $storyAbstract + '</p>';
            // close off div div a li
            $contentString += '</div></div></a></li>';
            // increment limit
            $limit++;
          }
          // check to see if we have max number of items
          if ($limit === $MAX_NUM_OF_STORIES) {
            // end for loop if so
            i = $contentObject.length;
          }
        }
        // append stories
        $($stories).append($contentString);

        // clear content string
        $contentString = '';

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
// Function to populate list of sections
function makeListOfSections() {
  // variables
  var $listOfSections = ['section...', 'home', 'opinion', 'world', 'national', 'politics', 'upshot', 'ny region', 'business', 'technology', 'science', 'health', 'sports', 'arts', 'books', 'movies', 'theatre', 'sunday review', 'fashion', 'time magazine', 'food', 'magazine', 'real estate', 'automobiles', 'obituaries', 'insider'],
      $optionsString = '';
  // Add a list of sections
  for (var i = 0 ; i < $listOfSections.length ; i++) {
      $optionsString += '<option value="';
      $optionsString += $listOfSections[i];
      $optionsString += '">';
      $optionsString += $listOfSections[i];
      $optionsString += '</option>';
  }
  $('#sections').append($optionsString);
  $('select').selectric('refresh');
}


// FOOTER SCRIPTS
// variables


// MAIN[] 
makeListOfSections();

}) // EOF doc.ready