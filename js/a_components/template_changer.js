const {cleanDOMId} = require('../js_components/utils.js')

const register_template_changer = function() {
  AFRAME.registerComponent('template-changer', {
    schema: {
      interactionEmitterId: {type: 'string'},
      interactionEvent: {type: 'string'},
      templatePathKind: {type: 'string'},
      parseAudio: {type: 'boolean', default: false},
      audioPlayersIDs: {type: 'array', default: []},
      audioKinds: {type: 'array', default: []}
   },

    // emitts: 'template_set'
    init: function () {
      const emId = cleanDOMId(this.data.interactionEmitterId)
      this.iEvent = this.data.interactionEvent
      this.iEmitter = document.getElementById(emId)
      this.templatePathKind = this.data.templatePathKind

      this.handle_interaction();

      if(this.data.parseAudio) {
        setTimeout(function() {
          this.handle_audio();
        }.bind(this), 500)
      }
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

    handle_audio: function() {
      // play any audio present in the templates.
      // audio element <a-sound> needs to be created manually in DOM
      // fires when a new template is loaded, listens to 'template_set' event
      const audioIDs = this.data.audioPlayersIDs
      const audioKinds = this.data.audioKinds

      var audioPlayers = []

      const template_html = this.el.components.template.el

     // get all a-data elements from the current aframe template
      const data_html = template_html.getElementsByTagName("a-data");
      const data = Array.from(data_html);

      for(i = 0; i < audioIDs.length; i++) {
        const id = cleanDOMId(audioIDs[i])
        const audioPlayer_el = document.getElementById(id)
        const audioPlayer = audioPlayer_el.components.sound;
        audioPlayers.push(audioPlayer)
      }

      const playAudio = function(audioPlayer, audioKind) {
        console.log("sound!");
        // get the html content of the currently loaded aframe template
        const audio = data.filter(datum => datum.getAttribute('kind') === audioKind)// === 'audio')
        if(audio.length === 0) console.warn("this template has no audio attached")
        //play attached audio (if there's any in the template)
        if(audio.length > 0) {
          console.log("there should be sound")
          // WIP: currently plays only the first audio source in the template
          const src = audio[0].getAttribute('data')
          audioPlayer.el.setAttribute('sound','src', src);
          console.log(audioPlayer);
          audioPlayer.playSound();
        } else {
          return;
        }
      }

      for(u = 0; u < audioPlayers.length; u++) {
        const audioPlayer = audioPlayers[u]
        const audioKind = audioKinds[u]

        this.el.addEventListener('template_set', function() {
          audioPlayer.stopSound();
          playAudio(audioPlayer, audioKind)}, false);
      }
    }

  });
}
exports.register_template_changer = register_template_changer
