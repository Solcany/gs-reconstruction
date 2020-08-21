const {SCENARIO1_DATA} = require('../../assets/data/scenario1_data.js')

const ui = function() {
    this.ui_data = SCENARIO1_DATA;

    this.init = function() {
        window.addEventListener('DOMContentLoaded', function() {
            this.create_ui();
            this.listen();
        })
    }

    this.listen = function() {
        const ui = document.getElementById("story-ui")
        ui.addEventListener("advance_story", function(e) {
            console.log(e)
        })
    }

    this.create_ui = function() {
        const body = document.getElementsByTagName('BODY')[0]
        const ui = document.createElement('nav')
        const ul = document.createElement('ul')
        ui.id = "story-ui"

        for(i = 0; i < this.ui_data.length; i++) {
            const li = document.createElement('li')

            const node = this.ui_data[i]
            const node_key = Object.keys(node)[0]
            const node_data = node[node_key]

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
                            next_aframe_template_path: next_node.next_aframe_template_path
                        }
                    });
                    ui.dispatchEvent(event);
                })

                li.appendChild(button);
            }

            ul.appendChild(li);
        }

        ui.appendChild(ul);
        body.appendChild(ui);

    }

    this.init();
}


exports.ui = ui
