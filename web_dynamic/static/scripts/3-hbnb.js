const $ = window.jQuery;

$(document).ready(function () {
  const amenities = {};
  $('input:checkbox').click(function () {
    $(this).each(function () {
      if (this.checked) {
        amenities[$(this).data('id')] = $(this).data('name');
      } else {
        delete amenities[$(this).data('id')];
      }
    });
    if (Object.values(amenities).length > 0) {
      $('.amenities h4').text(Object.values(amenities).join(', '));
    } else {
      $('.amenities h4').html('&nbsp');
    }
  });
});

$.get('http://localhost:5001/api/v1/users/')
  .done(function (data, status) {
    const users = {};
    for (const user of data) {
      users[user.id] = user;
    }
    console.log(users);
    $.ajax({
      method: 'POST',
      url: 'http://localhost:5001/api/v1/places_search/',
      data: '{}',
      contentType: 'application/json; charset=utf-8'
    })
      .done(function (data, status) {
        let user;
        let placeTemplate;
        for (const place of data) {
          user = users[place.user_id];
          placeTemplate = `
      <article>
        <div class="title_box">
          <h2>${place.name}</h2>
          <div class="price_by_night">$${place.price_by_night}</div>
        </div>
        <div class="information">
          <div class="max_guest">${place.max_guest} Guest${place.max_guest !== 1 ? 's' : ''}</div>
          <div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms !== 1 ? 's' : ''}</div>
          <div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms !== 1 ? 's' : ''}</div>
        </div>
        <div class="user">
          <b>Owner:</b> ${user.first_name} ${user.last_name}
        </div>
        <div class="description">
          ${place.description}
        </div>
      </article>
            `;
          $('.places').append(placeTemplate);
        }
      })
      .fail(function () {
        $('.places').hide();
      });
  });
