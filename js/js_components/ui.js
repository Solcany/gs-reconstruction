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
