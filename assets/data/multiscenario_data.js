const MULTISCENARIO_DATA = [
    {node_meta: {kind: 'map', mapId: '#nav_grid'},
     overview:
     [{map_cell_id: "#story1",
       next_story_node: "introduction",
       next_templates_paths: {background: "./assets/scenes/scene1/objects/man.template",
                              foreground: "./assets/scenes/scene1/objects/man.template"}},
      {map_cell_id: "#story2",
       next_story_node: "introduction",
       next_templates_paths: {background: "./assets/scenes/scene1/objects/man.template",
                              foreground: "./assets/scenes/scene1/objects/man.template"}}]
    },
    {node_meta: {kind: 'story'},
     introduction:
     [{next_story_node: "dont_cas_me",
       next_templates_paths: {background: "./assets/scenes/scene1/objects/man.template",
                              foreground: "./assets/scenes/scene1/objects/man.template"}},
      {next_story_node: "dont_cas_me",
       next_templates_paths: {background: "./assets/scenes/scene1/objects/man.template",
                              foreground: "./assets/scenes/scene1/objects/man.template"}}]
    },

    {node_meta: {kind: 'story'},
     dont_cas_me:
     [{next_story_node: "introduction",
       next_templates_paths: {background: "./assets/scenes/scene1/objects/man3.template",
                              foreground: "./assets/scenes/scene1/objects/man3.template"}},
      {next_story_node: "introduction",
       next_templates_paths: {background: "./assets/scenes/scene1/objects/man3.template",
                              foreground: "./assets/scenes/scene1/objects/man3.template"}}
    ]}
]

exports.MULTISCENARIO_DATA = MULTISCENARIO_DATA
