const PCDLoader = require("../libs/PCDLoader.js");


AFRAME.registerComponent('pcd-model', {
    schema: {
        pcd: {type: 'asset'},
        point_size: {type: 'number', default: 1.0}
    },

    init: function () {
        this.loadPCD();
    },

    loadPCD: function () {
        let pcd = this.data.pcd
        let point_size = this.data.point_size
        let el = this.el;

        let loader = new PCDLoader();
        loader.load(pcd,
                    function (mesh) {
                        mesh.material.size = point_size
                        el.setObject3D('mesh', mesh)

                    },
	                function ( xhr ) {
		                console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
	                },
	                function ( error ) {
		                console.log( "Error while loading PCD: " + error );
	                }
                   )
    }
});

AFRAME.registerComponent('mouse-track', {
    init: function() {
        console.log("tracking clicks")
        this.el.addEventListener('click', function (evt) {
            console.log(evt.detail.intersection.point);
        });
    }
})
