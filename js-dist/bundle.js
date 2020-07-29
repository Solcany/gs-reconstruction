(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
           
            self.emit(event_to_emit);
        }, true);
  }
});

},{}],2:[function(require,module,exports){
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

},{"../libs/PCDLoader.js":4}],3:[function(require,module,exports){
AFRAME.registerComponent('scene-switcher', {
    schema: {
        scenes: {type: 'array', default: []}
    },

  init: function () {
      this.index = 0;
     
      const self = this.el;
      self.addEventListener('key_up', function() {
          console.log("key up!");
      })
  }//,

  // tick: function (time) {
  //   // Swap every second.
  //   var self = this;
  //   if (time - this.time < 2000) { return; }
  //   this.time = time;

  //   // Set template.
  //   this.maskEl.emit('fade');
  //   setTimeout(function () {
  //     self.el.setAttribute('template', 'src', self.data[self.index++]);
  //     self.maskEl.emit('fade');
  //     if (self.index === self.data.length) { self.index = 0; }
  //   }, 200);
  // }
});

},{}],4:[function(require,module,exports){
/**
 * @author Filipe Caixeta / http://filipecaixeta.com.br
 * @author Mugen87 / https://github.com/Mugen87
 *
 * Description: A THREE loader for PCD ascii and binary files.
 */

// import {
// 	BufferGeometry,
// 	FileLoader,
// 	Float32BufferAttribute,
// 	Loader,
// 	LoaderUtils,
// 	Points,
// 	PointsMaterial
// } from "./three.module.js";



var PCDLoader = function ( manager ) {

	THREE.Loader.call( this, manager );

	this.littleEndian = true;

};


PCDLoader.prototype = Object.assign( Object.create( THREE.Loader.prototype ), {

	constructor: PCDLoader,

	load: function ( url, onLoad, onProgress, onError ) {

		var scope = this;

		var loader = new THREE.FileLoader( scope.manager );
		loader.setPath( scope.path );
		loader.setResponseType( 'arraybuffer' );
		loader.load( url, function ( data ) {

			try {

				onLoad( scope.parse( data, url ) );

			} catch ( e ) {

				if ( onError ) {

					onError( e );

				} else {

					console.error( e );

				}

				scope.manager.itemError( url );

			}

		}, onProgress, onError );

	},

	parse: function ( data, url ) {

		// from https://gitlab.com/taketwo/three-pcd-loader/blob/master/decompress-lzf.js

		function decompressLZF( inData, outLength ) {

			var inLength = inData.length;
			var outData = new Uint8Array( outLength );
			var inPtr = 0;
			var outPtr = 0;
			var ctrl;
			var len;
			var ref;
			do {

				ctrl = inData[ inPtr ++ ];
				if ( ctrl < ( 1 << 5 ) ) {

					ctrl ++;
					if ( outPtr + ctrl > outLength ) throw new Error( 'Output buffer is not large enough' );
					if ( inPtr + ctrl > inLength ) throw new Error( 'Invalid compressed data' );
					do {

						outData[ outPtr ++ ] = inData[ inPtr ++ ];

					} while ( -- ctrl );

				} else {

					len = ctrl >> 5;
					ref = outPtr - ( ( ctrl & 0x1f ) << 8 ) - 1;
					if ( inPtr >= inLength ) throw new Error( 'Invalid compressed data' );
					if ( len === 7 ) {

						len += inData[ inPtr ++ ];
						if ( inPtr >= inLength ) throw new Error( 'Invalid compressed data' );

					}

					ref -= inData[ inPtr ++ ];
					if ( outPtr + len + 2 > outLength ) throw new Error( 'Output buffer is not large enough' );
					if ( ref < 0 ) throw new Error( 'Invalid compressed data' );
					if ( ref >= outPtr ) throw new Error( 'Invalid compressed data' );
					do {

						outData[ outPtr ++ ] = outData[ ref ++ ];

					} while ( -- len + 2 );

				}

			} while ( inPtr < inLength );

			return outData;

		}

		function parseHeader( data ) {

			var PCDheader = {};
			var result1 = data.search( /[\r\n]DATA\s(\S*)\s/i );
			var result2 = /[\r\n]DATA\s(\S*)\s/i.exec( data.substr( result1 - 1 ) );

			PCDheader.data = result2[ 1 ];
			PCDheader.headerLen = result2[ 0 ].length + result1;
			PCDheader.str = data.substr( 0, PCDheader.headerLen );

			// remove comments

			PCDheader.str = PCDheader.str.replace( /\#.*/gi, '' );

			// parse

			PCDheader.version = /VERSION (.*)/i.exec( PCDheader.str );
			PCDheader.fields = /FIELDS (.*)/i.exec( PCDheader.str );
			PCDheader.size = /SIZE (.*)/i.exec( PCDheader.str );
			PCDheader.type = /TYPE (.*)/i.exec( PCDheader.str );
			PCDheader.count = /COUNT (.*)/i.exec( PCDheader.str );
			PCDheader.width = /WIDTH (.*)/i.exec( PCDheader.str );
			PCDheader.height = /HEIGHT (.*)/i.exec( PCDheader.str );
			PCDheader.viewpoint = /VIEWPOINT (.*)/i.exec( PCDheader.str );
			PCDheader.points = /POINTS (.*)/i.exec( PCDheader.str );

			// evaluate

			if ( PCDheader.version !== null )
				PCDheader.version = parseFloat( PCDheader.version[ 1 ] );

			if ( PCDheader.fields !== null )
				PCDheader.fields = PCDheader.fields[ 1 ].split( ' ' );

			if ( PCDheader.type !== null )
				PCDheader.type = PCDheader.type[ 1 ].split( ' ' );

			if ( PCDheader.width !== null )
				PCDheader.width = parseInt( PCDheader.width[ 1 ] );

			if ( PCDheader.height !== null )
				PCDheader.height = parseInt( PCDheader.height[ 1 ] );

			if ( PCDheader.viewpoint !== null )
				PCDheader.viewpoint = PCDheader.viewpoint[ 1 ];

			if ( PCDheader.points !== null )
				PCDheader.points = parseInt( PCDheader.points[ 1 ], 10 );

			if ( PCDheader.points === null )
				PCDheader.points = PCDheader.width * PCDheader.height;

			if ( PCDheader.size !== null ) {

				PCDheader.size = PCDheader.size[ 1 ].split( ' ' ).map( function ( x ) {

					return parseInt( x, 10 );

				} );

			}

			if ( PCDheader.count !== null ) {

				PCDheader.count = PCDheader.count[ 1 ].split( ' ' ).map( function ( x ) {

					return parseInt( x, 10 );

				} );

			} else {

				PCDheader.count = [];

				for ( var i = 0, l = PCDheader.fields.length; i < l; i ++ ) {

					PCDheader.count.push( 1 );

				}

			}

			PCDheader.offset = {};

			var sizeSum = 0;

			for ( var i = 0, l = PCDheader.fields.length; i < l; i ++ ) {

				if ( PCDheader.data === 'ascii' ) {

					PCDheader.offset[ PCDheader.fields[ i ] ] = i;

				} else {

					PCDheader.offset[ PCDheader.fields[ i ] ] = sizeSum;
					sizeSum += PCDheader.size[ i ] * PCDheader.count[ i ];

				}

			}

			// for binary only

			PCDheader.rowSize = sizeSum;

			return PCDheader;

		}

		var textData = THREE.LoaderUtils.decodeText( new Uint8Array( data ) );

		// parse header (always ascii format)

		var PCDheader = parseHeader( textData );

		// parse data

		var position = [];
		var normal = [];
		var color = [];

		// ascii

		if ( PCDheader.data === 'ascii' ) {

			var offset = PCDheader.offset;
			var pcdData = textData.substr( PCDheader.headerLen );
			var lines = pcdData.split( '\n' );

			for ( var i = 0, l = lines.length; i < l; i ++ ) {

				if ( lines[ i ] === '' ) continue;

				var line = lines[ i ].split( ' ' );

				if ( offset.x !== undefined ) {

					position.push( parseFloat( line[ offset.x ] ) );
					position.push( parseFloat( line[ offset.y ] ) );
					position.push( parseFloat( line[ offset.z ] ) );

				}

				if ( offset.rgb !== undefined ) {

					var rgb = parseFloat( line[ offset.rgb ] );
					var r = ( rgb >> 16 ) & 0x0000ff;
					var g = ( rgb >> 8 ) & 0x0000ff;
					var b = ( rgb >> 0 ) & 0x0000ff;
					color.push( r / 255, g / 255, b / 255 );

				}

				if ( offset.normal_x !== undefined ) {

					normal.push( parseFloat( line[ offset.normal_x ] ) );
					normal.push( parseFloat( line[ offset.normal_y ] ) );
					normal.push( parseFloat( line[ offset.normal_z ] ) );

				}

			}

		}

		// binary-compressed

		// normally data in PCD files are organized as array of structures: XYZRGBXYZRGB
		// binary compressed PCD files organize their data as structure of arrays: XXYYZZRGBRGB
		// that requires a totally different parsing approach compared to non-compressed data

		if ( PCDheader.data === 'binary_compressed' ) {

			var sizes = new THREE.Uint32Array( data.slice( PCDheader.headerLen, PCDheader.headerLen + 8 ) );
			var compressedSize = sizes[ 0 ];
			var decompressedSize = sizes[ 1 ];
			var decompressed = decompressLZF( new Uint8Array( data, PCDheader.headerLen + 8, compressedSize ), decompressedSize );
			var dataview = new DataView( decompressed.buffer );

			var offset = PCDheader.offset;

			for ( var i = 0; i < PCDheader.points; i ++ ) {

				if ( offset.x !== undefined ) {

					position.push( dataview.getFloat32( ( PCDheader.points * offset.x ) + PCDheader.size[ 0 ] * i, this.littleEndian ) );
					position.push( dataview.getFloat32( ( PCDheader.points * offset.y ) + PCDheader.size[ 1 ] * i, this.littleEndian ) );
					position.push( dataview.getFloat32( ( PCDheader.points * offset.z ) + PCDheader.size[ 2 ] * i, this.littleEndian ) );

				}

				if ( offset.rgb !== undefined ) {

					color.push( dataview.getUint8( ( PCDheader.points * offset.rgb ) + PCDheader.size[ 3 ] * i + 0 ) / 255.0 );
					color.push( dataview.getUint8( ( PCDheader.points * offset.rgb ) + PCDheader.size[ 3 ] * i + 1 ) / 255.0 );
					color.push( dataview.getUint8( ( PCDheader.points * offset.rgb ) + PCDheader.size[ 3 ] * i + 2 ) / 255.0 );

				}

				if ( offset.normal_x !== undefined ) {

					normal.push( dataview.getFloat32( ( PCDheader.points * offset.normal_x ) + PCDheader.size[ 4 ] * i, this.littleEndian ) );
					normal.push( dataview.getFloat32( ( PCDheader.points * offset.normal_y ) + PCDheader.size[ 5 ] * i, this.littleEndian ) );
					normal.push( dataview.getFloat32( ( PCDheader.points * offset.normal_z ) + PCDheader.size[ 6 ] * i, this.littleEndian ) );

				}

			}

		}

		// binary

		if ( PCDheader.data === 'binary' ) {

			var dataview = new DataView( data, PCDheader.headerLen );
			var offset = PCDheader.offset;

			for ( var i = 0, row = 0; i < PCDheader.points; i ++, row += PCDheader.rowSize ) {

				if ( offset.x !== undefined ) {

					position.push( dataview.getFloat32( row + offset.x, this.littleEndian ) );
					position.push( dataview.getFloat32( row + offset.y, this.littleEndian ) );
					position.push( dataview.getFloat32( row + offset.z, this.littleEndian ) );

				}

				if ( offset.rgb !== undefined ) {

					color.push( dataview.getUint8( row + offset.rgb + 2 ) / 255.0 );
					color.push( dataview.getUint8( row + offset.rgb + 1 ) / 255.0 );
					color.push( dataview.getUint8( row + offset.rgb + 0 ) / 255.0 );

				}

				if ( offset.normal_x !== undefined ) {

					normal.push( dataview.getFloat32( row + offset.normal_x, this.littleEndian ) );
					normal.push( dataview.getFloat32( row + offset.normal_y, this.littleEndian ) );
					normal.push( dataview.getFloat32( row + offset.normal_z, this.littleEndian ) );

				}

			}

		}

		// build geometry

		var geometry = new THREE.BufferGeometry();

		if ( position.length > 0 ) geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( position, 3 ) );
		if ( normal.length > 0 ) geometry.setAttribute( 'normal', new THREE.Float32BufferAttribute( normal, 3 ) );
		if ( color.length > 0 ) geometry.setAttribute( 'color', new THREE.Float32BufferAttribute( color, 3 ) );

		geometry.computeBoundingSphere();

		// build material

		var material = new THREE.PointsMaterial( { size: 1.0 } );

		if ( color.length > 0 ) {

			material.vertexColors = true;

		} else {

			material.color.setHex( 0xa8a8a8);

		}

		// build point cloud

		var mesh = new THREE.Points( geometry, material );
		var name = url.split( '' ).reverse().join( '' );
		name = /([^\/]*)/.exec( name );
		name = name[ 1 ].split( '' ).reverse().join( '' );
		mesh.name = name;

		return mesh;
	}


} )

module.exports = PCDLoader;

},{}],5:[function(require,module,exports){
require("./a-components/pcd_model.js");
require("./a-components/scene_switcher.js");
require("./a-components/keyboard_event_emitter.js");

},{"./a-components/keyboard_event_emitter.js":1,"./a-components/pcd_model.js":2,"./a-components/scene_switcher.js":3}]},{},[5]);
