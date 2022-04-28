/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

//This sanitizes the inputs to prevent cross scripting.
const noXSS = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

//This converts tweet object into HTML formatted tweet to be displayed on page.
const createTweetElement = function(tweetData) {
  let locale = timeago.format(tweetData.created_at, Date());
  let $tweet = (`
    <article class="tweet">
    <header>
      <span class="user">
        <img src="${noXSS(tweetData.user.avatars)}">
        <p class="user">${noXSS(tweetData.user.name)}</p>
      </span>
      <span class="handle">${noXSS(tweetData.user.handle)}</span>
    </header>
    <p class="tweet-content">
      ${noXSS(tweetData.content.text)}
    </p>
    <footer>
      <time>${noXSS(locale)}</time>
      <div class="icons">
        <i class="fa-solid fa-flag"></i>
        <i class="fa-solid fa-retweet"></i>
        <i class="fa-solid fa-heart"></i>
      </div>           
    </footer>
  </article>
  `);
  return $tweet;

};

//This takes in a tweetArr from the server and passes them to createTweetElement for display on the page.
const renderTweets = function(tweetArr) {
  $('#tweet-container').empty();
  for (let tweet of tweetArr) {
    const currTweet = createTweetElement(tweet);
    $("#tweet-container").prepend(currTweet);
  }
};

//This handles the form submission by preventing default behaviour and using AJAX to post the tweet to /tweets without redirecting.
const buttonTrigger = function(e) {
  e.preventDefault();
  const formData = $(this).serialize();
  const textarea = $("#tweet-text").val();
  
  //Error handling for form submissions
  let $error = $("#errormsg");

  $error.slideUp(100);
 
  if (!textarea) {
    $error.text("⚠️ Please enter a tweet ").css({'color':'white', "margin-top": "10px", "padding":"8px", "font-weight":"600", "background-color":"salmon", "border-radius":"15px"});
    $error.slideDown(200);

    return $error;

  } else  if (textarea.length > 140) {
    $error.text("⚠️ Tweet is too long").css({'color':'white', "margin-top": "10px", "padding":"8px", "font-weight":"600", "background-color":"salmon", "border-radius":"15px"});
    $error.slideDown(200);

    return $error;

  }
 
  //Resets the form and counter on successful submission.
  $("#tweet-text").val('');
  $("#counter").text('140');

  //Sends the tweet text to the server, then calls getTweets to display tweets in database.
  $.ajax({
    method: "POST",
    data: formData,
    url: "/tweets",
    type: "application/json"

  })
    .then(function() {
      getTweets();
    });
   
};

//This requests the server return all the tweets in the database, and passes it to renderTweets for display on the page.
const getTweets = function() {
  $.ajax("/tweets", {method: 'GET'})
    .then((tweets) => {
      renderTweets(tweets);
    });
};

//This hides or reveals the create tweet form.
const newTweetButton = function() {
  if ($('.new-tweet').is(':visible')) {
    $(".new-tweet").slideUp();
    $("#errormsg").slideUp();
    
  } else {
    $(".new-tweet").slideDown();
    
  }
};



//Prevents functions from pre-firing until the page is fully loaded.
$(document).ready(function() {

  //This listens for the button submission of our tweets.
  $("form").submit(buttonTrigger);

  //This hides or unhides the header
  $(".writeNewTweet").on("click", function() {
    newTweetButton();
  });
 
  //This calls the server to pre-load the database tweets.
  getTweets();

  //This hides the form to enter new tweets by default.
  $('.new-tweet').hide();

  //The following handles the scroll button.
  let returnButton = document.getElementById("return");

  //When the user scrolls down 120px (height of the navbar) from the top of the webpage, reveal the button.
  window.onscroll = function() {
    scrollFunction();
  };

  //Checks whether the user has scrolled down past 120px and displays the scroll to top button.
  function scrollFunction() {
    if (document.body.scrollTop > 120 || document.documentElement.scrollTop > 120) {
      returnButton.style.display = "block";
    } else {
      returnButton.style.display = "none";
    }
  }

  // When the user clicks on the button, scroll to the top of the document
  $("#return").click(function() {
    $(window).scrollTop(0);
  });

});
