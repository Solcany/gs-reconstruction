const {cleanDOMId} = require('../js_components/utils.js')

const register_scene_drape = function() {
  AFRAME.registerComponent('scene-drape', {
    schema: {
      hidden: {type: 'boolean'},
      revealDispatcherId: {type: 'string'},
      revealEvent: {type: 'string'}
    },

    init: function () {
      const id =
      this.revealDispatcher = document.getElementById()
      console.log()
      this.el.pause();
    }

  })
}

exports.register_scene_drape = register_scene_drape
