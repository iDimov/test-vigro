jQuery(function($) {
  $(".beer").on("click", ".beer-dialog__close", function() {
    $("#beer-dialog").fadeOut();
  });
});
