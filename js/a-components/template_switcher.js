AFRAME.registerComponent('template-switcher', {
    schema: {
        templates: {type: 'array'}
    },

  init: function () {
    this.index = 0;
    this.manage_templates();
  },

  manage_templates: function() {
    const keyboard_emitter = document.getElementById("keyboard-emitter");

    const increase_index = function() {
      this.index += 1
      if(this.index === this.data.templates.length) this.index = 0;
      this.set_template();
    }

    const decrease_index = function() {
      if(this.index > 0) this.index -= 1;
      this.set_template();
    }

    keyboard_emitter.addEventListener('key_right', increase_index.bind(this), false);
    keyboard_emitter.addEventListener('key_left', decrease_index.bind(this), false);
  },

  set_template: function() {
    console.log(this.data.templates[this.index]);
    this.el.setAttribute('template', 'src', this.data.templates[this.index]);
  }



  

  //,

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
