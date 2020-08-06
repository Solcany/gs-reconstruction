AFRAME.registerPrimitive('a-data', {
  // Defaults the ocean to be parallel to the ground.
  defaultComponents: {
    data: {data: null,
           kind: null}
  },
  mappings: {
    data: 'data.data',
    kind: 'data.kind'
  }
});
