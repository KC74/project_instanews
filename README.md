# Project Instanews

Project Instanews is a learning project based on the original redacademy.github.io/instanews which uses the New York Times API to retrieve a list of top stories for a given section and then populates a news grid of up to 12 items.

### Project Demonstrations

Project Instanews demonstrates the following:
- CSS reset
- background property
- use of box model
- use of css properties used for altering visual display of text
    - ie. font-family, font-style, text-transform, etc...
- uses custom fonts (@font-face)
- Icon fonts
- CSS3 properties such as box-shadow and border-radius
- Use Sass as a preprocessor, with CSS properly compiled and minified
- Uses flexbox layouts rather than floats
- Responsive and optimized for three screen sizes: mobile, tablet, and desktop
- JS Usage:
    - Use Ajax to fetch data from the NYT Top Stories endpoint
    - Only display a maximum of 12 stories in the grid, and only display a story if it has a photo associated with it
    - Transition users between UI states, starting where no stories have been returned, and then subsequently transitioning where stories populate the grid (by incorporating a loading gif)

Functional requirements:
- Dynamically fetch story data and populate it in a webpage via the Top Stories API based a user’s selection from a <select> field
- Resize the header area (i.e. logo plus <select>) so that it transitions from occupying the entire screen on page load to only auto height after the <select> field is changed (you will need jQuery for this)
- Link each returned image to its URL on the NYT website

### Tech & Languages Used

Project Instanews uses the following:

* HTML
* CSS
* Javascript
* jQuery
* Gulp
* Git
* Ajax

### Plugins

Project Instanews uses the following:

| Plugin | Usage |
| ------ | ------ |
| Selectric | Section selector |