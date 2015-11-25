(function($) {

  //VARS
  var modal = $('.modal-body');

  //Functions

  function msToTime(s) {
    var ms = s % 1000;
    s = (s - ms) / 1000;
    var secs = s % 60;
    s = (s - secs) / 60;
    var mins = s % 60;
    var hrs = (s - mins) / 60;

    return mins + ':' + secs;
  }

  function getArtist(event) {
    event.preventDefault();
    var artist = $('#artistTextField').val();

    $.ajax({
      url: 'https://api.spotify.com/v1/search?type=artist&query=' + artist,
      success: function(response) {
        var artists = response.artists.items;
        var artistContainer = $('.Artists');
        artistContainer.empty();
        artists.forEach(function(artist) {
          artistContainer.append(
          '<article class="col-lg-4 Artists-item" data-id="' + artist.id + '">',
            '<h1>' + artist.name + '</h1>',
            '<img class="Artists-itemImage" width="300" height="300" src="' +
            artist.images[0].url + '"/>',
            '</article>');
        });
      }
    });
  }
  //
  function getArtistAlbums() {
    var id = $(this).data('id');
    modal.append('<div id="ArtistAlbums"><h1>Albums</h1></div>');
    $.ajax({
      url: 'https://api.spotify.com/v1/artists/' + id + '/albums',
      beforeSend: function() {
        modal.empty();
        $('.modal').modal('show');
        getRelatedArtists(id);
      },
      success: function(data) {
        var albums = data.items;

        albums.forEach(function(album) {
          $(document).find('#ArtistAlbums').prepend(
          '<article class="col-lg-4 Album-item" data-id="' + album.id + '">' +
            '<h4>' + album.name + '</h4>' +
            '<img class="Album-itemImage" width="150" height="150" src="' +
            album.images[0].url + '"/>' + '</article>');
        });
      }
    });
  }

  function getAlbumTracksList() {
    var id = $(this).data('id');
    var modal = $('.modal-body');
    $.ajax({
      url: 'https://api.spotify.com/v1/albums/' + id + '/tracks',
      method: 'GET',
      beforeSend: function() {
        modal.empty();
      },
      success: function(data) {
        var tracks = data.items;
        tracks.forEach(function(track) {
          modal.append(
          '<article class="col-sm-12">',
            '<div class="Track-item">',
              '<div class="Track-itemNumber">',
                track.track_number,
              '</div>',
              '<div class="Track-itemName">',
                track.name,
              '</div>',
              '<div class="Track-itemTime">',
                msToTime(track.duration_ms),
              '</div>',
            '</div>',
          '</article>');
        });
      }
    });
  }

  function getRelatedArtists(id) {
    modal.append('<div id="related"><h1>Artist related</h1></div>');
    var relatedArtists = $.ajax({
      url: 'https://api.spotify.com/v1/artists/' + id + '/related-artists',
      method: 'GET',
      success: function(data) {
        data.artists.forEach(function(artist) {
          $(document).find('#related').append(
          '<article class="col-lg-4 Album-item" data-id="' + artist.id + '">' +
            '<h4>' + artist.name + '</h4>' +
            '<img class="Album-itemImage" width="150" height="150" src="' +
            artist.images[0].url + '"/>' + '</article>');
        });
      }
    });
    return relatedArtists;
  }

  //Events

  $(document).on('submit', '#artistForm', getArtist);
  $(document).on('click', '.Artists-item', getArtistAlbums);
  $(document).on('click', '.Album-item', getAlbumTracksList);
})(jQuery);
