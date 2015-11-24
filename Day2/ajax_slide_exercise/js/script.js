var response = $('#response');

function getAjax() {
  $.ajax({
    url: 'https://ironhack-characters.herokuapp.com/characters',
    method: 'GET',
    dataType: 'JSON',
    success: function(data) {
      response.empty();
      data.reverse().forEach(function(element) {
        response.append(
          '<ul><li>Name: ' + element.name +
          '</li><li>Occupation: ' + element.occupation +
          '</li><li>Weapon: ' + element.weapon +
          '</li></ul>'
        );
      });
    }
  });
}

function setAjax(event) {
  event.preventDefault();
  var data = {
    name: $('#name').val(),
    occupation: $('#occupation').val(),
    weapon: $('#weapon').val()
  };

  $.ajax({
    url: 'https://ironhack-characters.herokuapp.com/characters',
    data: data,
    method: 'POST',
    error: function(xhr, ajaxOptions, thrownError) {
      alert(xhr.status);
      alert(thrownError);
    },
    complete: function() {
      getAjax();
    }
  });
}

getAjax();
setInterval(getAjax,2000);

$('#createNew').on('submit', setAjax);
