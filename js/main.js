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
//
const {grid} = require("./js_components/nav_grid.js");
const {ui} = require("./js_components/ui.js");
const {timeline} = require("./js_components/timeline.js");
const {init_nav_grid} = require("./js_components/nav_grid.js");
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
    init_nav_grid();
    ui();

})()
