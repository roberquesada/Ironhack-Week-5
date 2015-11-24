var pharses = [
  'I like pie',
  'Add some of your own pharses here.',
  'Make sure to folow all about the last pharse with a comma.',
];

var randomNumber;

var listContainer = $('#ListPharses');

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function changePharse() {
  var pharsesLength = pharses.length;
  randomNumber = getRandomInt(0, pharsesLength);
  $('#pharse').text(pharses[randomNumber]);
  highlightPharse(randomNumber + 1);
}

function sendForm() {
  var value = $('#form-text').val();
  if (value === '') {
    return false;
  }

  pharses.push(value);
  createList();
  $('#form-text').val('');
  highlightPharse(randomNumber + 1);
}

function prevInput() {
  var value = $('#form-text').val();

  if (listContainer.find('li').hasClass('temp')) {
    listContainer.find('li.temp').remove();
    listContainer.append($('<li class="temp">' + value + '</li>'));
  } else {
    listContainer.append($('<li class="temp">' + value + '</li>'));
  }
}

function createList() {
  listContainer.empty();
  pharses.forEach(function(element, index) {
    listContainer.append($('<li data-index="' + index + '">' + element + '</li>'));
  });
}

function showHideList() {
  listContainer.fadeToggle();
}

function removePharse() {
  var number = $(this).data('index');
  console.log(number);
  pharses.splice(number, 1);
  createList();
}

function highlightPharse(number) {
  listContainer.find('li').removeClass('hightlight');
  listContainer.find('li:nth-child(' + number + ')').addClass('hightlight');
}

function init() {
  changePharse();
  createList();
  highlightPharse(randomNumber + 1);
}

init();

$(document).on('click', '#button-pharse', changePharse);
$(document).on('input', '#form', prevInput);
$(document).on('submit', '#form', sendForm);
$(document).on('click', '#ToogleList', showHideList);
$(document).on('click', '#ListPharses li', removePharse);
