$(function () {
  $(".barrage-submit .box input")
    .focus(function () {
      $(".barrage-submit .box").css("border-color", "#3385ff");
      if ($(this).val() == this.defaultValue) {
        $(this).removeAttr("placeholder");
        // $(this).val("");
      }
    })
    .blur(function () {
      $(".barrage-submit .box").css("border-color", "#000");
      if ($(this).val() == "") {
        $(this).attr("placeholder", "弹幕一下吧！！！");
        // $(this).val(this.defaultValue);
      }
    })
    .keydown(function (event) {
      if (event.keyCode == 13) {
        if ($(".barrage-submit .box input").val() != "") {
          $.bulletScreen.send(
            $(".barrage-submit .box input").val(),
            $(".barrage-case")
          );
          $(".barrage-submit .box input").val("");
        }
      }
    });

  $(".barrage-submit .btn .yes").click(function () {
    if ($(".barrage-submit .box input").val() != "") {
      $.bulletScreen.send(
        $(".barrage-submit .box input").val(),
        $(".barrage-case")
      );
      $(".barrage-submit .box input").val("");
    }
  });

  $(".barrage-submit .btn .no").click(function () {
    $.bulletScreen.clear($(".barrage-case"));
  });
});
