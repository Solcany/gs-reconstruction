const SCENARIO1_DATA = [
    {introduction:
     [{next_story_node: "dont_cas_me",
       next_aframe_template_path: "path"},
      {next_story_node: "dont_cas_me",
       next_aframe_template_path: "path2"}]
    },
   
    {dont_cas_me:
     [{next_story_node: "introduction",
       next_aframe_template_path: "path"},
      {next_story_node: "introduction",
       next_aframe_template_path: "path2"}]
    }
]

exports.SCENARIO1_DATA = SCENARIO1_DATA
