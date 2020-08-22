(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const MULTISCENARIO_DATA = [
    {overview:
     [{has_dom_el: '#el',
       next_story_node: "dont_cas_me",
       next_templates_paths: {background: "./assets/scenes/scene1/objects/man.template",
                              foreground: "./assets/scenes/scene1/objects/man.template"}},
      {has_dom_el: '#el2',
       next_story_node: "dont_cas_me",
       next_templates_paths: {background: "./assets/scenes/scene1/objects/man.template",
                              foreground: "./assets/scenes/scene1/objects/man.template"}}]
    },

    {introduction:
     [{has_dom_el: null,
       next_story_node: "dont_cas_me",
       next_templates_paths: {background: "./assets/scenes/scene1/objects/man.template",
                              foreground: "./assets/scenes/scene1/objects/man.template"}},
      {has_dom_el: null,
       next_story_node: "dont_cas_me",
       next_templates_paths: {background: "./assets/scenes/scene1/objects/man.template",
                              foreground: "./assets/scenes/scene1/objects/man.template"}}]
    },

    {dont_cas_me:
     [{has_dom_el: null,
       next_story_node: "introduction",
       next_templates_paths: {background: "./assets/scenes/scene1/objects/man3.template",
                              foreground: "./assets/scenes/scene1/objects/man3.template"}},
      {has_dom_el: null,
       next_story_node: "introduction",
       next_templates_paths: {background: "./assets/scenes/scene1/objects/man3.template",
                              foreground: "./assets/scenes/scene1/objects/man3.template"}}
    ]}
]

exports.MULTISCENARIO_DATA = MULTISCENARIO_DATA

},{}],2:[function(require,module,exports){
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

},{"../js_components/utils.js":12}],3:[function(require,module,exports){
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

},{"../js_components/utils.js":12}],4:[function(require,module,exports){

const register_keyframe_event_emitter = function() {
    AFRAME.registerComponent('keyboard-event-emitter', {
        init: function () {
            const self = this.el;

            window.addEventListener("keydown", function (event) {
                if (event.defaultPrevented) {
                    return; // Do nothing if the event was already processed
                }
                const key = event.key || event.keyCode;

                let event_to_emit;
                switch (key) {
                case "Down": event_to_emit = "key_down" // IE/EDGE
                case "ArrowDown": event_to_emit = "key_down"
                    break;
                case "Up": event_to_emit = "key_up"
                case "ArrowUp": event_to_emit = "key_up"
                    break;
                case "Left": event_to_emit = "key_left"
                case "ArrowLeft": event_to_emit = "key_left"
                    break;
                case "Right": event_to_emit = "key_right"
                case "ArrowRight": event_to_emit = "key_right"
                    break;
                    // case "Enter":
                    //     break;
                    // case "Esc": // IE/Edge specific value
                    // case "Escape":
                    //     break;
                default:
                    return; // Quit when this doesn't handle the key event.
                }
                // Cancel the default action to avoid it being handled twice
                event.preventDefault();

                //console.log("emitting key event: " + event_to_emit);

                self.emit(event_to_emit,null,false);
            }, true);
        }
    });
}

exports.register_keyframe_event_emitter = register_keyframe_event_emitter

},{}],5:[function(require,module,exports){
const PCDLoader = require("../libs/PCDLoader.js");

const register_pcd_model = function() {

    AFRAME.registerComponent('pcd-model', {
        schema: {
            pcd: {type: 'asset'},
            point_size: {type: 'number', default: 1.0}
        },

        init: function () {
            this.loadPCD();
        },

        loadPCD: function () {
            let pcd = this.data.pcd
            let point_size = this.data.point_size
            let el = this.el;

            let loader = new PCDLoader();
            loader.load(pcd,
                        function (mesh) {
                            mesh.material.size = point_size
                            el.setObject3D('mesh', mesh)

                        },
	                    function ( xhr ) {
		                    console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
	                    },
	                    function ( error ) {
		                    console.log( "Error while loading PCD: " + error );
	                    }
                       )
        }
    });

    AFRAME.registerComponent('mouse-track', {
        init: function() {
            console.log("tracking clicks")
            this.el.addEventListener('click', function (evt) {
                console.log(evt.detail.intersection.point);
            });
        }
    })

}

exports.register_pcd_model = register_pcd_model

},{"../libs/PCDLoader.js":13}],6:[function(require,module,exports){
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

},{"../js_components/utils.js":12}],7:[function(require,module,exports){
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

},{"../js_components/utils.js":12}],8:[function(require,module,exports){
const {loadJSON} = require('../js_components/utils.js')

const register_template_switcher = function() {
  AFRAME.registerComponent('template-switcher', {
    schema: {
      parseAudio: {type: 'boolean', default: false},
      fromJson: {type: 'string'}
    },

    // emitts: 'template_set'
    init: function () {
      this.index = 0;
      this.manage_templates_();

      if(this.data.parseAudio) {
        this.manage_audio();
      }
    },

    set_template: function(path) {
      this.el.setAttribute('template', 'src', path);
      // wait 100 ms before emitting the 'set' event
      setTimeout(
        function() { this.el.emit('template_set', null, false) }.bind(this)
        ,100)
    },

    manage_templates: function() {
      // cycle between templates on key press

      const keyboard_emitter = document.getElementById("keyboard-emitter");
      if (!keyboard_emitter) throw new Error("keyboard emitter wasn't found in the DOM, add <a-entity id='keyboard-emitter' keyboard-event-emitter></a-entity> to DOM")

      var paths = [];

      if(this.data.fromJson) {
        loadJSON(this.data.fromJson, function(response) {
          templates = JSON.parse(response);
          for (let i = 0; i < templates.length; i++) {
            let template = templates[i]
            let path = template["template_path"]
            paths.push(path)
          }
        })
      } else {
        throw new Error("no templates paths provided for this template switcher")
      }

      const increase_index = function() {
        this.index += 1
        if(this.index === this.data.templates.length) this.index = 0;
        let path = paths[this.index]
        this.set_template(path);
      }
      const decrease_index = function() {
        if(this.index > 0) this.index -= 1;
        let path = paths[this.index]
        this.set_template(path);
      }
      keyboard_emitter.addEventListener('key_right', increase_index.bind(this), false);
      keyboard_emitter.addEventListener('key_left', decrease_index.bind(this), false);
    },

    manage_templates_: function() {
      // cycle between templates on key press

      // from timeline
      const timeline = document.getElementById("timeline");
      if(!timeline) throw new Error("div#timeline is missing from DOM, create one manually at the top of the document")

      const process_event = function(self, event) {
        let data = event.detail.data
        let path = data["template_path"]
        this.set_template(path);
      }

      timeline.addEventListener("timeline_change",
                                process_event.bind(this, event))
      // let templates;

      // if(this.data.fromJson) {
      //   loadJSON(this.data.fromJson, function(response) {
      //     templates = JSON.parse(response);
      //     for (let i = 0; i < templates.length; i++) {
      //       let template = templates[i]
      //       let path = template["template_path"]
      //       paths.push(path)
      //     }
      //   });
      // } else {
      //   throw new Error("no templates paths provided for this template switcher")
      // }

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
}
exports.register_template_switcher = register_template_switcher

},{"../js_components/utils.js":12}],9:[function(require,module,exports){
const register_a_data = function() {
  AFRAME.registerPrimitive('a-data', {
    // Defaults the ocean to be parallel to the ground.
    defaultComponents: {
      data: {data: null,
             kind: null}
    },
    mappings: {
      data: 'data.data',
      kind: 'data.kind'
    }
  });
}

exports.register_a_data = register_a_data

},{}],10:[function(require,module,exports){
const {loadJSON} = require('../js_components/utils.js')

const timeline_json_path = '../../assets/data/timeline.json'

const timeline = function() {
    const get_json_data = function() {
        var json_data;
        loadJSON(timeline_json_path, function(response) {
            json_data = JSON.parse(response);
        });
        const names = json_data.map(datum => datum["name"])
        return json_data
    }

    const timeline_data = get_json_data()
    const timeline_names = timeline_data.map(datum => datum["name"])

    document.addEventListener("DOMContentLoaded", function() {
        const create_timeline = function() {
            const timeline = document.createElement('DIV');
                  timeline.id = "timeline"
            const timeline_ul = document.createElement('UL')
            const body = document.getElementsByTagName("BODY")[0];

            const create_radio_el = function(index, name, isChecked) {
                let input = document.createElement('input')
            	input.type = 'radio'
            	input.name = 'timeline'
            	input.id = name
                input.index = index
                if(isChecked) input.checked = true

                let label = document.createElement('label')
            	label.htmlFor = name
            	label.textContent = name

                let li = document.createElement('li')
            	li.appendChild(input);
            	li.appendChild(label);

                return li;
            }

            for(let i = 0; i < timeline_names.length; i++) {
                let name = timeline_names[i]
                // make the first radio button checked
                let isChecked = false;
                if(i === 0) isChecked = true
                let li = create_radio_el(i, name, isChecked);
                timeline_ul.appendChild(li);
            }

            timeline.appendChild(timeline_ul);
            body.appendChild(timeline);
        }

        const update_timeline = function() {
          //wip
        }

        const dispatch_timeline_event = function(timeline_el, index) {
            let data = timeline_data[index]
            const event = new CustomEvent('timeline_change', {
                detail: { data }
            });
            timeline_el.dispatchEvent(event)
        }


        const timeline_onkey_emitter = function() {
            const timeline = document.getElementById('timeline')
            const timeline_ul = timeline.querySelector('UL')
            const inputs = timeline_ul.getElementsByTagName('input')

            const keyboard_emitter = document.getElementById("keyboard-emitter");
            if (!keyboard_emitter) throw new Error("keyboard emitter wasn't found in the DOM, add <a-entity id='keyboard-emitter' keyboard-event-emitter></a-entity> to DOM")

            // next timeline element on click
            keyboard_emitter.addEventListener("key_right", function(event) {
                const inputs_arr = Array.from(inputs)
                const active_el = inputs_arr.filter(input => input.checked == true)[0]
                const active_index = active_el.index

                const next_index = active_index + 1;

                if(next_index < inputs.length) {
                    // uncheck current radio
                    active_el.checked = false
                    //check the next radio
                    const next_el = inputs.item(next_index)
                    	  next_el.checked = true

                    dispatch_timeline_event(timeline, next_index);
                } else {
                    console.warn("the end of the timeline was reached")
                    return;
                }
            })


            // previous timeline element on click
            keyboard_emitter.addEventListener("key_left", function(event) {
                const inputs_arr = Array.from(inputs)
                const active_el = inputs_arr.filter(input => input.checked == true)[0]
                const active_index = active_el.index

                const previous_index = active_index - 1;

                if(previous_index > -1) {
                    // uncheck current radio
                    active_el.checked = false
                    //check the next radio
                    const previous_el = inputs.item(previous_index)
                    	  previous_el.checked = true

                    dispatch_timeline_event(timeline, previous_index);
                } else {
                    console.warn("the start of the timeline was reached")
                    return;
                }
            })



        }

        const timeline_onclick_emitter = function() {
            const timeline = document.getElementById('timeline')
            const timeline_ul = timeline.querySelector('UL')
            const inputs = timeline_ul.querySelectorAll('input')

            for(let i = 0; i < inputs.length; i++) {
                let input = inputs[i]
                input.addEventListener('change', function() {
                    dispatch_timeline_event(timeline, i)
                })
            }
        }
        create_timeline();
        timeline_onkey_emitter();
        timeline_onclick_emitter();
    })
}

exports.timeline = timeline

},{"../js_components/utils.js":12}],11:[function(require,module,exports){
// utils
const {addHashToString} = require('./utils.js')

// vars
const {MULTISCENARIO_DATA} = require('../../assets/data/multiscenario_data.js')
const INITIAL_NODE_ID = "dont_cas_me"

const ui = function() {
    this.ui_data = MULTISCENARIO_DATA

    this.init = function() {
        window.addEventListener('DOMContentLoaded', function() {
            this.create_ui();
            this.manage_ui();
            this.show_node(INITIAL_NODE_ID);
        })
    }

    this.manage_ui = function() {
        const ui = document.getElementById("story-ui")
        ui.addEventListener("advance_story", function(e) {
            const next_node_id = e.detail.next_story_node
            this.show_node(next_node_id);
        }.bind(this))
    }

    this.create_ui = function() {
        const body = document.getElementsByTagName('BODY')[0]
        const ui = document.createElement('nav')
        const ul = document.createElement('ul')
        ui.id = "story-ui"

        for(i = 0; i < this.ui_data.length; i++) {

            const node = this.ui_data[i]
            const node_key = Object.keys(node)[0]
            const node_data = node[node_key]
            const has_dom_el = node_data.has_dom_el

            if(!has_dom_el) {
                // generate list element for interaction control
                const li = document.createElement('li')

                for(u = 0; u < node_data.length; u++) {
                    // create button element for each timeline event
                    const button = document.createElement('button');
                    button.type ="button"
                    button.innerHTML = u + 1;

                    const next_node = node_data[u]
                    // the button dispatches event on click
                    button.addEventListener("click", function() {
                        const event = new CustomEvent("advance_story", {
                            detail: {
                                next_story_node: next_node.next_story_node,
                                next_templates_paths: next_node.next_templates_paths
                            }
                        });
                        ui.dispatchEvent(event);
                    })

                    li.id = node_key
                    li.setAttribute("active",false)
                    li.appendChild(button);
                }
                ul.appendChild(li)
            } else {
               // add interaction to an already existing DOM element

            }
        }

        ui.appendChild(ul);
        body.appendChild(ui);
    }

    this.show_node = function(nodeId) {
        const ui = document.getElementById("story-ui")
        const current_node = ui.querySelector("li[active=true]");

        // hide current node
        if(current_node) current_node.setAttribute("active", false)

        // show the next
        const id = addHashToString(nodeId)
        const next_node = ui.querySelector(id);
        if(!next_node) throw new Error("nav node with id: " + nodeID + " wasnt found in story-ui")
        next_node.setAttribute("active", true)
    }

    this.init();
}


exports.ui = ui

},{"../../assets/data/multiscenario_data.js":1,"./utils.js":12}],12:[function(require,module,exports){
const loadJSON = function(path, callback) {

    var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
    xobj.open('GET', path, false); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
          }
    };
    xobj.send(null); 
}

const cleanDOMId = function(id) {
      if (id.includes('#')) {
          return id.replace('#', '');
      } else {
          return id;
      }
}

const addHashToString = function(string) {
      if (string.includes('#')) {
          return string
      } else {
          return '#' + string;
      }
}

exports.loadJSON = loadJSON
exports.cleanDOMId = cleanDOMId
exports.addHashToString = addHashToString

},{}],13:[function(require,module,exports){
/**
 * @author Filipe Caixeta / http://filipecaixeta.com.br
 * @author Mugen87 / https://github.com/Mugen87
 *
 * Description: A THREE loader for PCD ascii and binary files.
 */

// import {
// 	BufferGeometry,
// 	FileLoader,
// 	Float32BufferAttribute,
// 	Loader,
// 	LoaderUtils,
// 	Points,
// 	PointsMaterial
// } from "./three.module.js";



var PCDLoader = function ( manager ) {

	THREE.Loader.call( this, manager );

	this.littleEndian = true;

};


PCDLoader.prototype = Object.assign( Object.create( THREE.Loader.prototype ), {

	constructor: PCDLoader,

	load: function ( url, onLoad, onProgress, onError ) {

		var scope = this;

		var loader = new THREE.FileLoader( scope.manager );
		loader.setPath( scope.path );
		loader.setResponseType( 'arraybuffer' );
		loader.load( url, function ( data ) {

			try {

				onLoad( scope.parse( data, url ) );

			} catch ( e ) {

				if ( onError ) {

					onError( e );

				} else {

					console.error( e );

				}

				scope.manager.itemError( url );

			}

		}, onProgress, onError );

	},

	parse: function ( data, url ) {

		// from https://gitlab.com/taketwo/three-pcd-loader/blob/master/decompress-lzf.js

		function decompressLZF( inData, outLength ) {

			var inLength = inData.length;
			var outData = new Uint8Array( outLength );
			var inPtr = 0;
			var outPtr = 0;
			var ctrl;
			var len;
			var ref;
			do {

				ctrl = inData[ inPtr ++ ];
				if ( ctrl < ( 1 << 5 ) ) {

					ctrl ++;
					if ( outPtr + ctrl > outLength ) throw new Error( 'Output buffer is not large enough' );
					if ( inPtr + ctrl > inLength ) throw new Error( 'Invalid compressed data' );
					do {

						outData[ outPtr ++ ] = inData[ inPtr ++ ];

					} while ( -- ctrl );

				} else {

					len = ctrl >> 5;
					ref = outPtr - ( ( ctrl & 0x1f ) << 8 ) - 1;
					if ( inPtr >= inLength ) throw new Error( 'Invalid compressed data' );
					if ( len === 7 ) {

						len += inData[ inPtr ++ ];
						if ( inPtr >= inLength ) throw new Error( 'Invalid compressed data' );

					}

					ref -= inData[ inPtr ++ ];
					if ( outPtr + len + 2 > outLength ) throw new Error( 'Output buffer is not large enough' );
					if ( ref < 0 ) throw new Error( 'Invalid compressed data' );
					if ( ref >= outPtr ) throw new Error( 'Invalid compressed data' );
					do {

						outData[ outPtr ++ ] = outData[ ref ++ ];

					} while ( -- len + 2 );

				}

			} while ( inPtr < inLength );

			return outData;

		}

		function parseHeader( data ) {

			var PCDheader = {};
			var result1 = data.search( /[\r\n]DATA\s(\S*)\s/i );
			var result2 = /[\r\n]DATA\s(\S*)\s/i.exec( data.substr( result1 - 1 ) );

			PCDheader.data = result2[ 1 ];
			PCDheader.headerLen = result2[ 0 ].length + result1;
			PCDheader.str = data.substr( 0, PCDheader.headerLen );

			// remove comments

			PCDheader.str = PCDheader.str.replace( /\#.*/gi, '' );

			// parse

			PCDheader.version = /VERSION (.*)/i.exec( PCDheader.str );
			PCDheader.fields = /FIELDS (.*)/i.exec( PCDheader.str );
			PCDheader.size = /SIZE (.*)/i.exec( PCDheader.str );
			PCDheader.type = /TYPE (.*)/i.exec( PCDheader.str );
			PCDheader.count = /COUNT (.*)/i.exec( PCDheader.str );
			PCDheader.width = /WIDTH (.*)/i.exec( PCDheader.str );
			PCDheader.height = /HEIGHT (.*)/i.exec( PCDheader.str );
			PCDheader.viewpoint = /VIEWPOINT (.*)/i.exec( PCDheader.str );
			PCDheader.points = /POINTS (.*)/i.exec( PCDheader.str );

			// evaluate

			if ( PCDheader.version !== null )
				PCDheader.version = parseFloat( PCDheader.version[ 1 ] );

			if ( PCDheader.fields !== null )
				PCDheader.fields = PCDheader.fields[ 1 ].split( ' ' );

			if ( PCDheader.type !== null )
				PCDheader.type = PCDheader.type[ 1 ].split( ' ' );

			if ( PCDheader.width !== null )
				PCDheader.width = parseInt( PCDheader.width[ 1 ] );

			if ( PCDheader.height !== null )
				PCDheader.height = parseInt( PCDheader.height[ 1 ] );

			if ( PCDheader.viewpoint !== null )
				PCDheader.viewpoint = PCDheader.viewpoint[ 1 ];

			if ( PCDheader.points !== null )
				PCDheader.points = parseInt( PCDheader.points[ 1 ], 10 );

			if ( PCDheader.points === null )
				PCDheader.points = PCDheader.width * PCDheader.height;

			if ( PCDheader.size !== null ) {

				PCDheader.size = PCDheader.size[ 1 ].split( ' ' ).map( function ( x ) {

					return parseInt( x, 10 );

				} );

			}

			if ( PCDheader.count !== null ) {

				PCDheader.count = PCDheader.count[ 1 ].split( ' ' ).map( function ( x ) {

					return parseInt( x, 10 );

				} );

			} else {

				PCDheader.count = [];

				for ( var i = 0, l = PCDheader.fields.length; i < l; i ++ ) {

					PCDheader.count.push( 1 );

				}

			}

			PCDheader.offset = {};

			var sizeSum = 0;

			for ( var i = 0, l = PCDheader.fields.length; i < l; i ++ ) {

				if ( PCDheader.data === 'ascii' ) {

					PCDheader.offset[ PCDheader.fields[ i ] ] = i;

				} else {

					PCDheader.offset[ PCDheader.fields[ i ] ] = sizeSum;
					sizeSum += PCDheader.size[ i ] * PCDheader.count[ i ];

				}

			}

			// for binary only

			PCDheader.rowSize = sizeSum;

			return PCDheader;

		}

		var textData = THREE.LoaderUtils.decodeText( new Uint8Array( data ) );

		// parse header (always ascii format)

		var PCDheader = parseHeader( textData );

		// parse data

		var position = [];
		var normal = [];
		var color = [];

		// ascii

		if ( PCDheader.data === 'ascii' ) {

			var offset = PCDheader.offset;
			var pcdData = textData.substr( PCDheader.headerLen );
			var lines = pcdData.split( '\n' );

			for ( var i = 0, l = lines.length; i < l; i ++ ) {

				if ( lines[ i ] === '' ) continue;

				var line = lines[ i ].split( ' ' );

				if ( offset.x !== undefined ) {

					position.push( parseFloat( line[ offset.x ] ) );
					position.push( parseFloat( line[ offset.y ] ) );
					position.push( parseFloat( line[ offset.z ] ) );

				}

				if ( offset.rgb !== undefined ) {

					var rgb = parseFloat( line[ offset.rgb ] );
					var r = ( rgb >> 16 ) & 0x0000ff;
					var g = ( rgb >> 8 ) & 0x0000ff;
					var b = ( rgb >> 0 ) & 0x0000ff;
					color.push( r / 255, g / 255, b / 255 );

				}

				if ( offset.normal_x !== undefined ) {

					normal.push( parseFloat( line[ offset.normal_x ] ) );
					normal.push( parseFloat( line[ offset.normal_y ] ) );
					normal.push( parseFloat( line[ offset.normal_z ] ) );

				}

			}

		}

		// binary-compressed

		// normally data in PCD files are organized as array of structures: XYZRGBXYZRGB
		// binary compressed PCD files organize their data as structure of arrays: XXYYZZRGBRGB
		// that requires a totally different parsing approach compared to non-compressed data

		if ( PCDheader.data === 'binary_compressed' ) {

			var sizes = new THREE.Uint32Array( data.slice( PCDheader.headerLen, PCDheader.headerLen + 8 ) );
			var compressedSize = sizes[ 0 ];
			var decompressedSize = sizes[ 1 ];
			var decompressed = decompressLZF( new Uint8Array( data, PCDheader.headerLen + 8, compressedSize ), decompressedSize );
			var dataview = new DataView( decompressed.buffer );

			var offset = PCDheader.offset;

			for ( var i = 0; i < PCDheader.points; i ++ ) {

				if ( offset.x !== undefined ) {

					position.push( dataview.getFloat32( ( PCDheader.points * offset.x ) + PCDheader.size[ 0 ] * i, this.littleEndian ) );
					position.push( dataview.getFloat32( ( PCDheader.points * offset.y ) + PCDheader.size[ 1 ] * i, this.littleEndian ) );
					position.push( dataview.getFloat32( ( PCDheader.points * offset.z ) + PCDheader.size[ 2 ] * i, this.littleEndian ) );

				}

				if ( offset.rgb !== undefined ) {

					color.push( dataview.getUint8( ( PCDheader.points * offset.rgb ) + PCDheader.size[ 3 ] * i + 0 ) / 255.0 );
					color.push( dataview.getUint8( ( PCDheader.points * offset.rgb ) + PCDheader.size[ 3 ] * i + 1 ) / 255.0 );
					color.push( dataview.getUint8( ( PCDheader.points * offset.rgb ) + PCDheader.size[ 3 ] * i + 2 ) / 255.0 );

				}

				if ( offset.normal_x !== undefined ) {

					normal.push( dataview.getFloat32( ( PCDheader.points * offset.normal_x ) + PCDheader.size[ 4 ] * i, this.littleEndian ) );
					normal.push( dataview.getFloat32( ( PCDheader.points * offset.normal_y ) + PCDheader.size[ 5 ] * i, this.littleEndian ) );
					normal.push( dataview.getFloat32( ( PCDheader.points * offset.normal_z ) + PCDheader.size[ 6 ] * i, this.littleEndian ) );

				}

			}

		}

		// binary

		if ( PCDheader.data === 'binary' ) {

			var dataview = new DataView( data, PCDheader.headerLen );
			var offset = PCDheader.offset;

			for ( var i = 0, row = 0; i < PCDheader.points; i ++, row += PCDheader.rowSize ) {

				if ( offset.x !== undefined ) {

					position.push( dataview.getFloat32( row + offset.x, this.littleEndian ) );
					position.push( dataview.getFloat32( row + offset.y, this.littleEndian ) );
					position.push( dataview.getFloat32( row + offset.z, this.littleEndian ) );

				}

				if ( offset.rgb !== undefined ) {

					color.push( dataview.getUint8( row + offset.rgb + 2 ) / 255.0 );
					color.push( dataview.getUint8( row + offset.rgb + 1 ) / 255.0 );
					color.push( dataview.getUint8( row + offset.rgb + 0 ) / 255.0 );

				}

				if ( offset.normal_x !== undefined ) {

					normal.push( dataview.getFloat32( row + offset.normal_x, this.littleEndian ) );
					normal.push( dataview.getFloat32( row + offset.normal_y, this.littleEndian ) );
					normal.push( dataview.getFloat32( row + offset.normal_z, this.littleEndian ) );

				}

			}

		}

		// build geometry

		var geometry = new THREE.BufferGeometry();

		if ( position.length > 0 ) geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( position, 3 ) );
		if ( normal.length > 0 ) geometry.setAttribute( 'normal', new THREE.Float32BufferAttribute( normal, 3 ) );
		if ( color.length > 0 ) geometry.setAttribute( 'color', new THREE.Float32BufferAttribute( color, 3 ) );

		geometry.computeBoundingSphere();

		// build material

		var material = new THREE.PointsMaterial( { size: 1.0 } );

		if ( color.length > 0 ) {

			material.vertexColors = true;

		} else {

			material.color.setHex( 0xa8a8a8);

		}

		// build point cloud

		var mesh = new THREE.Points( geometry, material );
		var name = url.split( '' ).reverse().join( '' );
		name = /([^\/]*)/.exec( name );
		name = name[ 1 ].split( '' ).reverse().join( '' );
		mesh.name = name;

		return mesh;
	}


} )

module.exports = PCDLoader;

},{}],14:[function(require,module,exports){
// aframe components
const {register_pcd_model} = require("./a_components/pcd_model.js");
const {register_template_switcher} = require("./a_components/template_switcher.js");
const {register_keyframe_event_emitter} = require("./a_components/keyboard_event_emitter.js");
const {register_animation_timeline_controller} = require("./a_components/animation_timeline_controller.js");
const {register_camera_controller} = require("./a_components/camera_controller.js");
const {register_scene_drape} = require("./a_components/scene_drape.js");
const {register_template_changer} = require("./a_components/template_changer.js");

//aframe  primitives
const {register_a_data} = require("./a_primitives/a_data.js")
// js components
const {ui} = require("./js_components/ui.js");
const {timeline} = require("./js_components/timeline.js");

(function () {
    //DOM
        
    //aframe components
    register_pcd_model();
    register_template_switcher();
    register_keyframe_event_emitter();
    register_camera_controller();
    register_template_changer();

    //aframe primitives
    register_a_data();

    //DOM
    ui();

})()

},{"./a_components/animation_timeline_controller.js":2,"./a_components/camera_controller.js":3,"./a_components/keyboard_event_emitter.js":4,"./a_components/pcd_model.js":5,"./a_components/scene_drape.js":6,"./a_components/template_changer.js":7,"./a_components/template_switcher.js":8,"./a_primitives/a_data.js":9,"./js_components/timeline.js":10,"./js_components/ui.js":11}]},{},[14]);
