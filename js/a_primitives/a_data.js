const register_a_data = function() {
  AFRAME.registerPrimitive('a-data', {
    // Defaults the ocean to be parallel to the ground.
    defaultComponents: {
      data: {data: null,
             kind: null,
             replayable: false}
    },
    mappings: {
      data: 'data.data',
      kind: 'data.kind',
      replayable: 'data.replayable'
    }
  });
}

exports.register_a_data = register_a_data
