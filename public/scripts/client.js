/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const input = document.querySelector('textarea');
const log = document.getElementById('counter');

input.addEventListener('input', updateValue);
function updateValue(e) {
  log.textContent= e.target.value
  count = log.textContent.length;
  char = 140;
  char = 140 - count;
  console.log(char)
  document.getElementById('counter').innerHTML = char;
}
