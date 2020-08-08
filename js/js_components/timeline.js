const {loadJSON} = require('../js_components/utils.js')

const timeline_json_path = '../../assets/data/timeline.json'

const create_timeline = function() {
    var timeline_data;
    loadJSON(timeline_json_path, function(response) {
        timeline_data = JSON.parse(response);
    });
    const timeline_names = timeline_data.map(datum => datum["name"])


    document.addEventListener("DOMContentLoaded", function() {
        const create_radio_el = function(name) {
            let input = document.createElement('input')
            	input.type = 'radio'
            	input.name = 'timeline'
            	input.id = name

            let label = document.createElement('label')
            	label.htmlFor = name
            	label.textContent = name

            let li = document.createElement('li')
            	li.appendChild(input);
            	li.appendChild(label);

            return li;
        }

        const init = function() {
            const timeline = document.createElement('DIV');
                  timeline.id = "timeline"
            const timeline_ul = document.createElement('UL')

            const body = document.getElementsByTagName("BODY")[0];

            for(let i = 0; i < timeline_names.length; i++) {
                let name = timeline_names[i]
                let li = create_radio_el(name);
                timeline_ul.appendChild(li);
            }
            timeline.appendChild(timeline_ul);
            body.appendChild(timeline);
        }
        init();
    })
}

exports.create_timeline = create_timeline
