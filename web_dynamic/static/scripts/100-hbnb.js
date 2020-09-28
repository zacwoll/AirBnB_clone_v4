$(document).ready(function () {
  const amenities = {};
  const states = {};
  const cities = {};
  $('input[type="checkbox"].amen-checkbox').click(function () {
    $(this).each(function () {
      if (this.checked) {
        amenities[$(this).data('id')] = $(this).data('name');
      } else {
        delete amenities[$(this).data('id')];
      }
    });
    $('.amenities h4').html(Object.values(amenities).join(', ') || '&nbsp;');
  });

  $('input[type="checkbox"].state-checkbox').click(function () {
    $(this).each(function () {
      if (this.checked) {
        states[$(this).data('id')] = $(this).data('name');
      } else {
        delete states[$(this).data('id')];
      }
    });
    const locations = Object.values(states).concat(Object.values(cities));
	$('.locations h4').html(locations.join(', ') || '&nbsp;');
  });

  $('input[type="checkbox"].city-checkbox').click(function () {
    $(this).each(function () {
      if (this.checked) {
        cities[$(this).data('id')] = $(this).data('name');
      } else {
        delete cities[$(this).data('id')];
      }
    });
    const locations = Object.values(states).concat(Object.values(cities));
	$('.locations h4').html(locations.join(', ') || '&nbsp;');
  });


  $('button').click(() => {
	  const data = {
		amenities: Object.keys(amenities),
		states: Object.keys(states),
		cities: Object.keys(cities)
	  };
		$('.places').empty();
		$.ajax({
			type: 'POST',
			url: 'http://localhost:5001/api/v1/places_search/',
			contentType: 'application/json',
			dataType: 'json',
			data: JSON.stringify(data),
			success: function (data) {
				for (const place of data) {
					const template = 
			`<article>
					<div class="title_box">
						<h2>${place.name}</h2>
						<div class="price_by_night">
						${place.price_by_night}
						</div>
					</div>
					<div class="information">
						<div class="max_guest"><i class="fa fa-users fa-3x" aria-hidden="true"></i>
				<br />
						${place.max_guest} Guests
						</div>
						<div class="number_rooms"><i class="fa fa-bed fa-3x" aria-hidden="true"></i>
				<br />
						${place.number_rooms} Bedrooms
						</div>
						<div class="number_bathrooms"><i class="fa fa-bath fa-3x" aria-hidden="true"></i>
				<br />
						${place.number_bathrooms} Bathroom
						</div>
					</div>
					<div class="description">
						${place.description}
					</div>
				</article> <!-- End 1 place <article> -->`;
						$('section.places').append(template);
				}//endfor
			}//end success
		});//endAjax
	});//('button').click
});//onDOMload

$.get('http://localhost:5001/api/v1/status/')
  .done(function (data, status) {
    if (data.status === 'OK') {
      $('#api_status').addClass('available');
    }
  })
  .fail(function () {
    $('#api_status').removeClass('available');
  });


$.ajax({
	type: 'POST',
	url: 'http://localhost:5001/api/v1/places_search/',
	contentType: 'application/json',
	dataType: 'json',
	data: '{}',
	success: function (data) {
		for (const place of data) {
			const template = 
	`<article>
      <div class="title_box">
        <h2>${place.name}</h2>
        <div class="price_by_night">
    		${place.price_by_night}
        </div>
      </div>
      <div class="information">
        <div class="max_guest"><i class="fa fa-users fa-3x" aria-hidden="true"></i>
    <br />
    		${place.max_guest} Guests
        </div>
        <div class="number_rooms"><i class="fa fa-bed fa-3x" aria-hidden="true"></i>
    <br />
    		${place.number_rooms} Bedrooms
        </div>
        <div class="number_bathrooms"><i class="fa fa-bath fa-3x" aria-hidden="true"></i>
    <br />
    		${place.number_bathrooms} Bathroom
        </div>
      </div>
      <div class="description">
        ${place.description}
      </div>
    </article> <!-- End 1 place <article> -->`;
        $('section.places').append(template);
		}
	}
});
