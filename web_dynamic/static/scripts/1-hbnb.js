$(function () {
  const amenities = {};
  $('input[type="checkbox"]').click(function () {
    $(this).each(function () {
      if (this.checked) {
	console.log(this);
	//amenities[this.id] = this;
      }
    });
  });
});
