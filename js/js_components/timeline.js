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

            const create_radio_el = function(index, name, isChecked) {
                let input = document.createElement('input')
            	input.type = 'radio'
            	input.name = 'timeline'
            	input.id = name
                input.index = index
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
                let li = create_radio_el(i, name, isChecked);
                timeline_ul.appendChild(li);
            }

            timeline.appendChild(timeline_ul);
            body.appendChild(timeline);
        }

        const update_timeline = function() {
          //wip
        }

        const dispatch_timeline_event = function(timeline_el, index) {
            let data = timeline_data[index]
            const event = new CustomEvent('timeline_change', {
                detail: { data }
            });
            timeline_el.dispatchEvent(event)
        }


        const timeline_onkey_emitter = function() {
            const timeline = document.getElementById('timeline')
            const timeline_ul = timeline.querySelector('UL')
            const inputs = timeline_ul.getElementsByTagName('input')

            const keyboard_emitter = document.getElementById("keyboard-emitter");
            if (!keyboard_emitter) throw new Error("keyboard emitter wasn't found in the DOM, add <a-entity id='keyboard-emitter' keyboard-event-emitter></a-entity> to DOM")

            // next timeline element on click
            keyboard_emitter.addEventListener("key_right", function(event) {
                const inputs_arr = Array.from(inputs)
                const active_el = inputs_arr.filter(input => input.checked == true)[0]
                const active_index = active_el.index

                const next_index = active_index + 1;

                if(next_index < inputs.length) {
                    // uncheck current radio
                    active_el.checked = false
                    //check the next radio
                    const next_el = inputs.item(next_index)
                    	  next_el.checked = true

                    dispatch_timeline_event(timeline, next_index);
                } else {
                    console.warn("the end of the timeline was reached")
                    return;
                }
            })

            // previous timeline element on click
            keyboard_emitter.addEventListener("key_left", function(event) {
                const inputs_arr = Array.from(inputs)
                const active_el = inputs_arr.filter(input => input.checked == true)[0]
                const active_index = active_el.index

                const previous_index = active_index - 1;

                if(previous_index > -1) {
                    // uncheck current radio
                    active_el.checked = false
                    //check the next radio
                    const previous_el = inputs.item(previous_index)
                    	  previous_el.checked = true

                    dispatch_timeline_event(timeline, previous_index);
                } else {
                    console.warn("the start of the timeline was reached")
                    return;
                }
            })



        }

        const timeline_onclick_emitter = function() {
            const timeline = document.getElementById('timeline')
            const timeline_ul = timeline.querySelector('UL')
            const inputs = timeline_ul.querySelectorAll('input')

            for(let i = 0; i < inputs.length; i++) {
                let input = inputs[i]
                input.addEventListener('change', function() {
                    dispatch_timeline_event(timeline, i)
                })
            }
        }
        create_timeline();
        timeline_onkey_emitter();
        timeline_onclick_emitter();
    })
}

exports.timeline = timeline
