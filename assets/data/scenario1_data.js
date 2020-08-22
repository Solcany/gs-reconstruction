const SCENARIO1_DATA = [
    {introduction:
     [{next_story_node: "dont_cas_me",
       next_aframe_template_path: "./assets/scenes/scene1/objects/man.template"},
      {next_story_node: "dont_cas_me",
       next_aframe_template_path: "./assets/scenes/scene1/objects/man2.template"}]
    },
   
    {dont_cas_me:
     [{next_story_node: "introduction",
       next_aframe_template_path: "./assets/scenes/scene1/objects/man3.template"},
      {next_story_node: "introduction",
       next_aframe_template_path: "./assets/scenes/scene1/objects/man3.template"}]
    }
]

exports.SCENARIO1_DATA = SCENARIO1_DATA
