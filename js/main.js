// aframe components
const {register_pcd_model} = require("./a_components/pcd_model.js");
const {register_template_switcher} = require("./a_components/template_switcher.js");
const {register_keyframe_event_emitter} = require("./a_components/keyboard_event_emitter.js");
const {register_animation_timeline_controller} = require("./a_components/animation_timeline_controller.js");
const {register_camera_controller} = require("./a_components/camera_controller.js");

//aframe  primitives
const {register_a_data} = require("./a_primitives/a_data.js")
// js components
const {timeline} = require("./js_components/timeline.js");

(function () {
    //aframe components
    register_pcd_model();
    register_template_switcher();
    register_keyframe_event_emitter();
    register_camera_controller();

    //aframe primitives
    register_a_data();

    //DOM
    timeline();
})()
