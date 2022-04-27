/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

//converts tweet object into HTML formatted tweet to be displayed on page.
const createTweetElement = function(tweetData) {
  let $tweet = (`
    <article class="tweet">
    <header>
      <span class="user">
        <img src="${tweetData.user.avatars}">
        <p class="user">${tweetData.user.name}</p>
      </span>
      <span class="handle">${tweetData.user.handle}</span>
    </header>
    <p class="tweet-content">
      ${tweetData.content.text}
    </p>
    <footer>
      <time>${tweetData.created_at}</time>
      <div class="icons">
        <i class="fa-solid fa-flag"></i>
        <i class="fa-solid fa-retweet"></i>
        <i class="fa-solid fa-heart"></i>
      </div>           
    </footer>
  </article>
  `);
  // console.log("function tweet:",$tweet);
  return $tweet;

};

const renderTweets = function(tweetArr) {

  for (let tweet of tweetArr) {
    const currTweet = createTweetElement(tweet);
    $("#tweet-container").prepend(currTweet);   
  }
};

//Ex. Data
// const tweetEx = [
//   {
//     "user": {
//       "name": "Newton",
//       "avatars": "https://i.imgur.com/73hZDYK.png",
//       "handle": "@SirIsaac"
//     },
//     "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//     "created_at": 1650904803134
//   },
//   {
//     "user": {
//       "name": "Marco",
//       "avatars": "https://i.imgur.com/ilT4JDe.png",
//       "handle": "@Polo"
//     },
//     "content": {
//       "text": "Where am I?"
//     },
//     "created_at": 1650904803134
//   },

//   {
//     "user": {
//       "name": "Descartes",
//       "avatars": "https://i.imgur.com/nlhLi3I.png",
//       "handle": "@rd"
//     },
//     "content": {
//       "text": "Je pense , donc je suis"
//     },
//     "created_at": 1650991203134
//   }

// ];

const buttonTrigger = function (e) {
  e.preventDefault();
  const formData = $(this).serialize();

  $.ajax({
    method: "POST",
    data: formData,
    url: "/tweets",
  })
    .then(function(tweet) {
      getTweets();
    })   
};

const getTweets = function() {
  $.ajax("/tweets", {method: 'GET'})
  .then((tweets) => {
    renderTweets(tweets);
  })
}


$(document).ready(function() {

  // auto-expands the textarea for multi-line tweets.
  $('#tweet-text').on('input', function() {
    this.style.height = 'auto';
      
    this.style.height =
            (this.scrollHeight) + 'px';
  });

  $("form").submit(buttonTrigger);
  // renderTweets();

});
