var pharses = [
  'I like pie',
  'Add some of your own pharses here.',
  'Make sure to folow all about the last pharse with a comma.'
];

var randomNumber = getRandomInt(0,2);

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

$('#pharse').text(pharses[randomNumber]);
