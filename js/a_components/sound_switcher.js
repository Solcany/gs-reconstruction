AFRAME.registerComponent('sound-switcher', {
    schema: {
        sounds: {type: 'array'}
    },

  // emitts: 'sound_set'

  init: function () {
    this.index = 0;
    this.manage_audio();
  },

  set_sound: function() {
    this.el.setAttribute('src', this.data.sounds[this.index]);
    this.el.emit('sound_set', null, false)
  },

  manage_audio: function() {
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


  manage_audio: function() {
    // play any audio present in the templates

    const play_audio = function() {

      // get the html content of the currently loaded aframe template
      let template_content = this.el.components.template.el

      // get sound files from the template
      let template_audio = template_content.getElementsByTagName('a-sound');

      console.log(template_audio[0]);

      if(template_audio.length > 0) {
        template_audio[0].components.sound.playSound();
        setTimeout(function(){
          template_audio[0].disconnect();
        },500)
      }
    }

    this.el.addEventListener('template_set', play_audio.bind(this), false);
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
