const {cleanDOMId} = require('../js_components/utils.js')

// timeline controller component needs to be applied to the same DOM el as animation-timeline component
const register_animation_timeline_controller = function() {
  AFRAME.registerComponent('animation-timeline-controller', {
    schema: {
      triggerEmitterId: {type: 'string'},
      triggerNext: {type: 'string'},
      triggerPrev: {type: 'string'}
    },

    init: function () {
      const trigger_id = cleanDOMId(this.data.triggerEmitterId);
      this.trigger_emitter = document.getElementById(trigger_id);
      if(!this.trigger_emitter) throw new Error("Trigger emitter: " + trigger_id + " wasn't found in the DOM, check the ID or add the trigger emitter")
      if(!this.el.components['animation-timeline']) throw new Error ("This element needs animation-timeline component for animation-timeline-controller to work properly, add it in the DOM")

      const init_animation = function() {
        this.el.emit('timeline-start');
        this.el.components['animation-timeline'].animationIsPlaying = false;
      }
      const resume = function() {
        this.el.components['animation-timeline'].animationIsPlaying = true;
      }
      const resume_reverse = function() {
        console.log(this.el.components['animation-timeline'].timeline.direction)
        this.el.components['animation-timeline'].timeline.direction = "reverse"

        //this.el.components.['animation-timeline'].direction = "reverse";

        //console.log(this.el.components.['animation-timeline'].direction)
       this.el.components['animation-timeline'].animationIsPlaying = true;
      }

      const pause = function() {
        // !!! bad workaround for animation-timeline buggy pauseEvents feature
        this.el.components['animation-timeline'].animationIsPlaying = false
        // should be using this (if it worked ^^):
        // this.el.emit('timeline-pause');
      }

      // !!! workaround: must wait for DOM to load,
      // doesn't work with eventListener(DOMContentLoaded), no clue why
      setTimeout(init_animation.bind(this), 3);

      this.trigger_emitter.addEventListener("key_up", resume.bind(this), false);
      this.trigger_emitter.addEventListener("key_down", resume_reverse.bind(this), false);
      this.el.addEventListener("animationcomplete", pause.bind(this), false);

    }
  })
}

exports.register_animation_timeline_controller = register_animation_timeline_controller
