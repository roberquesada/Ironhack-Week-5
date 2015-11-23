var pharses = [
  'I like pie',
  'Add some of your own pharses here.',
  'Make sure to folow all about the last pharse with a comma.'
];

function getRandomInt(min, max) {
  return Math.round(Math.random() * (max - min)) + min;
}

function changePharse() {
  var randomNumber = getRandomInt(0,2);
  $('#pharse').text(pharses[randomNumber]);
}

function init(){
  changePharse();
}

init();

$(document).on('click', '#button-pharse', changePharse);
