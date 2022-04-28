


$(document).ready(function() {

  //Handles updating the counter below and to the right of the form
  const log = $('#counter');
  $('#tweet-text').on('input', (e) => {
    const count = e.target.value.length;
    let char = 140;
    char = 140 - count;
    $(log).text(char);
    if (char < 0) {
      $(log).css('color', 'red');
    } else {
      $(log).css('color', '#545149');
    }
  });
  
});


