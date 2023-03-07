import AFRAME from "aframe";

AFRAME.registerComponent('play-icon', {
  schema: {
    size: { type: 'number', default: 1 },
    color: { type: 'color', default: '#ffffff' }
  },

  init: function () {
    var size = this.data.size;
    var color = this.data.color;

    var icon = document.createElement('a-entity');
    icon.setAttribute('geometry', {
      primitive: 'cylinder',
      height: size / 10,
      radius: size / 6,
      segmentsRadial: 3
    });
    icon.setAttribute('material', { color: color });
    icon.setAttribute('rotation', { x: 0, y: 90, z: 90 });
    icon.setAttribute('position', { x: 0, y: 0, z: 0 });



    this.el.appendChild(icon);
  }
});
