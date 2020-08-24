//const {debounce} = require('./utils.js')
const {GRID_DATA} = require('../../assets/data/grid_data.js')
const GRID_COLUMNS_AMOUNT = 10


const init_nav_grid = function() {
    const get_screen_dimensions = function() {
        const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
        const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
        return [vw, vh]
    }

    const get_scren_aspect_ratio = function() {
        const dimensions = get_screen_dimensions();
        const vw = dimensions[0];
        const vh = dimensions[1];
        return vh / vw;
    }

    const set_grid_dimensions = function(grid_el) {
        const screen_aspect_ratio = get_scren_aspect_ratio();
        const cells_per_col = GRID_COLUMNS_AMOUNT;
        const cells_per_row = Math.round(cells_per_col * screen_aspect_ratio)

        // set amount of cells per row and coll
        grid_el.style.gridTemplateRows = "repeat(" + cells_per_row + ", 1fr)"
        grid_el.style.gridTemplateColumns = "repeat(" + cells_per_col + ", 1fr)"
    }

    const populate_grid = function(grid_el) {
        const screen_aspect_ratio = get_scren_aspect_ratio();
        const cells_per_col = GRID_COLUMNS_AMOUNT;
        const cells_per_row = Math.round(cells_per_col * screen_aspect_ratio)

        // populate the grid
        const cells_amount = cells_per_row * cells_per_col;

        for(let i = 0; i < cells_amount; i++) {
            // check if the grid cell has data available

            let cell_data = null;
            for (let u = 0; u < GRID_DATA.length; u++) {
                let cell_index = GRID_DATA[u]["index"]

                if(cell_index > cells_amount) {
                    throw new Error("index of this active cell is outside of the dimensions of the grid.")
                }

                if(cell_index === i) {
                    cell_data = GRID_DATA[u]
                    break;
                }
            }
            // create new empty cell
            const cell = document.createElement('SPAN');
            cell.classList.add('grid_cell')

            if(cell_data) {
                cell.classList.add('active')
                cell.id = cell_data["label"]

                const cell_label = document.createElement('span');
                cell_label.innerHTML = cell_data["label"];

                cell.appendChild(cell_label);

                // make the cell clickable
                cell.addEventListener("click", function() {
                    const event = new CustomEvent(cell_data["event"]);
                    cell.dispatchEvent(event)
                })
            }

            grid_el.appendChild(cell);
        }
    }

    const init = function() {
        const body = document.getElementsByTagName('BODY')[0]
        const grid_el = document.createElement('DIV')
      	grid_el.id = "nav_grid"
        set_grid_dimensions(grid_el);
        populate_grid(grid_el);
        grid_el.setAttribute('active', true)
        body.append(grid_el)
        // WIP: make grid responsive
       // window.addEventListener('resize', debounce(set_grid_dimensions.bind(this, grid_el), 25))
    }

    window.addEventListener('DOMContentLoaded', function() {
        init();
        manage_nav_grid();
    })
}

const manage_nav_grid = function() {
    const grid_el = document.getElementById("nav_grid")
    const grid_cell = grid_el.children[0];

    grid_cell.addEventListener("click", function() {

    })
}


exports.init_nav_grid = init_nav_grid;
