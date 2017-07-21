$(document).ready( function() {

// NYT API
// Built by LucyBot. www.lucybot.com
var url = 'https://api.nytimes.com/svc/topstories/v2/home.json';
url += '?' + $.param({
  'api-key': 'b36c31140be944319d86b784759c34bd'
});
$.ajax({
  url: url,
  method: 'GET',
}).done(function(result) {
  console.log(result);
}).fail(function(err) {
  throw err;
});


// SECTION SCRIPTS
// variables
var $listOfSections = ['Section...', 'Home', 'Opinion', 'World', 'National', 'Politics', 'Upshot', 'NY Region', 'Business', 'Technology', 'Science', 'Health', 'Sports', 'Arts', 'Books', 'Movies', 'Theatre', 'Sunday Review', 'Fashion', 'Time Magazine', 'Food', 'Magazine', 'Real Estate', 'Automobiles', 'Obituaries', 'Insider'];


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