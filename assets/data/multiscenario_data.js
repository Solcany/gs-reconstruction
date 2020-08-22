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
