const {cleanDOMId} = require('../js_components/utils.js')

const register_animation_timeline_controller = function() {
  AFRAME.registerComponent('animation-timeline-controller', {
    schema: {
      timelineId: {type: 'string'},
      triggerEmitterId: {type: 'string'},
      triggerNext: {type: 'string'},
      triggerPrev: {type: 'string'}
    },

    init: function () {
      const tl_id = cleanDOMId(this.data.timelineID);
      const trigger_id = cleanDOMId(this.data.triggerEmitterId)

      this.timeline = document.getElementById(id)
      this.trigger_emitter = document.getElementById(trigger_id);
      if(!this.timeline) throw new Error("Animation timeline: " + id + " wasn't found in the DOM, check the ID or add the animation timeline")
      if(!this.trigger_emitter) throw new Error("Trigger emitter: " + trigger_id + " wasn't found in the DOM, check the ID or add the trigger emitter")

      //this.timeline.pauseAnimation();

        this.timeline.addEventListener("animationcomplete", function() {
            console.log("some animation has ended somewhere")
        })
    }
  })
}

exports.register_animation_timeline_controller = register_animation_timeline_controller
