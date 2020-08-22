const {cleanDOMId} = require('../js_components/utils.js')

const register_template_changer = function() {
  AFRAME.registerComponent('template-changer', {
    schema: {
      interactionEmitterId: {type: 'string'},
      interactionEvent: {type: 'string'},
      templatePathKind: {type: 'string'},
      parseAudio: {type: 'boolean', default: false}
   },

    // emitts: 'template_set'
    init: function () {
      const emId = cleanDOMId(this.data.interactionEmitterId)
      this.iEvent = this.data.interactionEvent
      this.iEmitter = document.getElementById(emId)
      this.templatePathKind = this.data.templatePathKind

      this.handle_interaction();
    },

    handle_interaction: function() {
      this.iEmitter.addEventListener(this.iEvent, function(ev) {
        const template_path = ev.detail.next_templates_paths[this.templatePathKind]
        if(template_path) {
          this.set_template(template_path);
        } else {
          return;
        }
      }.bind(this))
    },

    set_template: function(path) {
      this.el.setAttribute('template', 'src', path);
      // wait 100 ms before emitting the 'set' event
      setTimeout(
        function() { this.el.emit('template_set', null, false) }.bind(this)
        ,100)
    },

    manage_audio: function() {
      // play any audio present in the templates.
      // audio element <a-sound> needs to be created manually in DOM
      // fires when a new template is loaded, listens to 'template_set' event

      const sound_el = document.getElementById("audio-player");
      if (!sound_el) throw new Error("a-sound element wasn't found in the DOM, add <a-sound id='audio-player' src='' positional='false'></a-sound> to DOM")

      const sound_player = sound_el.components.sound
      sound_player.stopSound();

      const play_audio = function() {
        // get the html content of the currently loaded aframe template
        const template_html = this.el.components.template.el

        // get all a-data elements from the current aframe template
        const data_html = template_html.getElementsByTagName("a-data");
        const data = Array.from(data_html);

        // get audio datai
        const audio = data.filter(datum => datum.getAttribute('kind') === 'audio')// === 'audio')
        if(audio.length === 0) console.warn("this template has no audio attached")

        //play attached audio (if there's any in the template)
        if(audio.length > 0) {
          // WIP: currently plays only the first audio source in the template
          const src = audio[0].getAttribute('data')
          sound_el.setAttribute('sound','src', src);
          sound_player.playSound();

        } else {
          return;
        }
      }

      //this.el.addEventListener('template_set', play_audio.bind(this), false);
    }

  });
}
exports.register_template_changer = register_template_changer
