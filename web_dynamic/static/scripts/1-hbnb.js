$(document).ready(function () {
  const amenities = {};
  $('input[type="checkbox"]').click(function () {
    $(this).each(function () {
      if (this.checked) {
	//console.log($(this).data('id'));
	amenities[$(this).data('id')] = $(this).data('name');
      } else {
	delete amenities[$(this).data('id')];
      }
      $('.amenities h4').text(Object.values(amenities).join(', '));
      //console.log(Object.values(amenities));
    });
  });
});
