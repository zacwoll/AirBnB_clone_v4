$(document).ready(function () {
  const amens = {};
  $('input:checkbox').click(function () {
    $(this).each(function () {
      if (this.checked) {
		  console.log(this);
      }
    });
  });
});
