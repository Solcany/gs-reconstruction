const {cleanDOMId} = require('../js_components/utils.js')

// timeline controller component needs to be applied to the same DOM el as animation-timeline component
const register_camera_controller = function() {
  AFRAME.registerComponent('camera-controller', {
    schema: {
      duration: {type: 'string'}
    },

    init: function () {
      console.log(this.el);
      //const trigger_id = cleanDOMId(this.data.triggerEmitterId);
      //this.trigger_emitter = document.getElementById(trigger_id);
      this.duration = parseFloat(this.data.duration)
      //if(!this.trigger_emitter) throw new Error("Trigger emitter: " + trigger_id + " wasn't found in the DOM, check the ID or add the trigger emitter")
      //this.trigger_emitter.addEventListener("key_up", resume.bind(this), false);
      //this.trigger_emitter.addEventListener("key_down", resume_reverse.bind(this), false);
      //this.el.addEventListener("animationcomplete", pause.bind(this), false);
    },

    tick: function (time, timeDelta) {
      var currPos = this.el.object3D.position;
      this.el.object3D.position.set(currPos.x + 1, currPos.y + 1, currPos.z + 1);
    }
  })
}

exports.register_camera_controller = register_camera_controller
