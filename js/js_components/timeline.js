(function() {
    document.addEventListener("DOMContentLoaded", function() {
        const init = function() {
            const timeline = document.createElement('DIV');
            const body = document.getElementsByTagName("BODY")[0];
            timeline.id = "timeline"
            body.appendChild(timeline);
        }
        init();
    });
})()
