AFRAME.registerComponent('template-switcher', {
    schema: {
        templates: {type: 'array'}
    },

  init: function () {
    this.index = 0;
    this.manage_templates();
    this.manage_audio();
  },

  set_template: function() {
    this.el.setAttribute('template', 'src', this.data.templates[this.index]);
    this.el.emit('template_set', null, false)
  },

  manage_templates: function() {
    // cycle between templates on key press
    // 
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

    try {
      if (keyboard_emitter === null || undefined) throw "keyboard emitter wasn't found in the DOM, add <a-entity id='keyboard-emitter' keyboard-event-emitter></a-entity> to DOM"
    }
    catch(err) {
      console.error(err)
    }

    keyboard_emitter.addEventListener('key_right', increase_index.bind(this), false);
    keyboard_emitter.addEventListener('key_left', decrease_index.bind(this), false);
  },

  get_template_audio: function() {
    // get
    const template_content = this.el.components.template.el
    const template_audio = template_content.querySelector[''];
    return template_content;
  },

  manage_audio: function() {
    // play any audio present in the templates

    this.el.addEventListener('template_set', function() {
      console.log("template was set!");
    })
    
    const audio = this.get_template_audio();
    console.log(this.el)

    if(audio != null || undefined) {
      console.log(audio);
    } else {
      console.log("no audio!");
    }

  }


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