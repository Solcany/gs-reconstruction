AFRAME.registerComponent('keyboard-event-emitter', {
    init: function () {
        const self = this.el;

        window.addEventListener("keydown", function (event) {
            if (event.defaultPrevented) {
                return; // Do nothing if the event was already processed
            }
            const key = event.key || event.keyCode;

            let event_to_emit;
            switch (key) {
            case "Down": event_to_emit = "key_down" // IE/EDGE
            case "ArrowDown": event_to_emit = "key_down"
                break;
            case "Up": event_to_emit = "key_up"
            case "ArrowUp": event_to_emit = "key_up"
                break;
            case "Left": event_to_emit = "key_left"
            case "ArrowLeft": event_to_emit = "key_left"
                break;
            case "Right": event_to_emit = "key_right"
            case "ArrowRight": event_to_emit = "key_right"
                break;
            // case "Enter":
            //     break;
            // case "Esc": // IE/Edge specific value
            // case "Escape":
            //     break;
            default:
                return; // Quit when this doesn't handle the key event.
            }
            // Cancel the default action to avoid it being handled twice
            event.preventDefault();

            //console.log("emitting key event: " + event_to_emit);

            self.emit(event_to_emit,null,false);
        }, true);
  }
});
