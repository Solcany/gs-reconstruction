AFRAME.registerComponent('scene-switcher', {
    schema: {
        scenes: {type: 'array', default: []}
    },

  init: function () {
      this.index = 0;
     
      const self = this.el;
      self.addEventListener('key_up', function() {
          console.log("key up!");
      })
  }//,

  // tick: function (time) {
  //   // Swap every second.
  //   var self = this;
  //   if (time - this.time < 2000) { return; }
  //   this.time = time;

  //   // Set template.
  //   this.maskEl.emit('fade');
  //   setTimeout(function () {
  //     self.el.setAttribute('template', 'src', self.data[self.index++]);
  //     self.maskEl.emit('fade');
  //     if (self.index === self.data.length) { self.index = 0; }
  //   }, 200);
  // }
});
