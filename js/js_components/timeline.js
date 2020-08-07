const {loadJSON} = require('../js_components/utils.js')

(function() {

    const timeline_data = function() {
        loadJSON('../../assets/data/timeline.js', function(response) {
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
})()
