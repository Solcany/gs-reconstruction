const {loadJSON} = require('../js_components/utils.js')

const timeline_json_path = '../../assets/data/timeline.js'

const create_timeline = function() {
    const timeline_data = function() {
        loadJSON(timeline_json_path, function(response) {
           return JSON.parse(response);
        })
    };

    document.addEventListener("DOMContentLoaded", function() {
        const init = function() {
            const timeline = document.createElement('DIV');
            timeline.id = "timeline"
            const body = document.getElementsByTagName("BODY")[0];
            body.appendChild(timeline);
            console.log(timeline_data);
        }
        init();
    })
}

exports.create_timeline = create_timeline
