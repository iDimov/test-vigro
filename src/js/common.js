jQuery(function($) {
  $(".beer").on("click", ".beer-dialog__close", function() {
    console.log("ds");
    $("#beer-dialog").fadeOut();
  });
});
