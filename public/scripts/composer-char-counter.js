


$(document).ready(function() {

  //Vanilla JS

  // const input = document.querySelector('textarea');
  // const log = document.getElementById('counter');

  // input.addEventListener('input', updateValue);

  // function updateValue(e) {
  //   log.textContent = e.target.value;
  //   let count = log.textContent.length;
  //   let char = 140;
  //   char = 140 - count;
  //   document.getElementById('counter').innerHTML = char;
  //   if (char < 0) {
  //     document.getElementById('counter').style.color = "red";
    
  //   } else {
  //     document.getElementById('counter').style.color = "black";

  //   }
  // }

  //jQuery

  const log = $('#counter');
  $('#tweet-text').on('input', (e) => {
    const count = e.target.value.length;
    let char = 140;
    char = 140 - count;
    $(log).text(char);
    if (char < 0) {
      $(log).css('color', 'red');
    } else {
      $(log).css('color', 'black');
    }
  });
  
});


