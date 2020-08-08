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

            const create_radio_el = function(name, isChecked) {
                let input = document.createElement('input')
            	input.type = 'radio'
            	input.name = 'timeline'
            	input.id = name
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
                let li = create_radio_el(name, isChecked);
                timeline_ul.appendChild(li);
            }

            timeline.appendChild(timeline_ul);
            body.appendChild(timeline);
        }

        const update_timeline = function() {
          //wip
        }

        const timeline_emitter = function() {
            const timeline = document.getElementById('timeline')
            const timeline_ul = timeline.querySelector('UL')
            const inputs = timeline_ul.querySelectorAll('input')

            for(let i = 0; i < inputs.length; i++) {
                let input = inputs[i]
                input.addEventListener('change', function() {
                    let timeline_event_data = timeline_data[i]
                    const event = new CustomEvent('timeline_change', {
                        detail: { timeline_event_data }
                    });
                    timeline.dispatchEvent(event)
                })
            }
        }
        create_timeline();
        timeline_emitter();
    })
}

exports.timeline = timeline
