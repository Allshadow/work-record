(function ($) {
  $.bulletScreen = {
    timers: [],
    //暴露接口给外面调用
    // val 弹幕元素值
    // container 弹幕容器
    send: function (val, container) {
      var odiv = $('<div class="barrage-bullet"></div>');
      odiv.text(val);
      this.add(odiv, container);
    },

    add: function (odiv, container) {
      odiv.css({
        position: "absolute",
        fontsize: "20px",
        whiteSpace: "nowrap",
      });
      var r = Math.floor(Math.random() * 256);
      var g = Math.floor(Math.random() * 256);
      var b = Math.floor(Math.random() * 256);
      odiv.css({
        color: "rgb(" + r + "," + g + "," + b + ")",
        top: Math.floor(Math.random() * container.height() - 24) + "px",
        width: odiv.width(),
        right: 0,
      });
      container[0].append(odiv[0]);
      this.move(odiv, container);
    },

    move: function (odiv, container) {
      var i = 0;
      var timer = setInterval(function () {
        odiv.css({
          right: (i += 1) + "px",
        });
        if (odiv.offset().left + odiv.width() < container.offset().left) {
          odiv.remove();
          clearInterval(timer);
        }
      }, 30);
    },
    // 清除弹幕墙
    clear: function (container) {
      var len = this.timers.length;
      for (var i = 0; i < len; i++) {
        clearInterval(this.timers[i]);
      }
      container.find(".barrage-bullet").remove();
    },
  };
})(jQuery);
