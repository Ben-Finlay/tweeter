/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  $('#tweet-text').on('input', function () {
    this.style.height = 'auto';
      
    this.style.height = 
            (this.scrollHeight) + 'px';
});


});