import AFRAME from "aframe";

AFRAME.registerComponent('pause-icon', {
    schema: {
      size: { type: 'number', default: 1 },
      color: { type: 'color', default: '#ffffff' }
    },
  
    init: function () {
      var size = this.data.size;
      var color = this.data.color;
  
      var icon = document.createElement('a-entity');
      icon.setAttribute('geometry', {
        primitive: 'box',
        width: size / 4,
        height: size,
        depth: size / 4
      });
      icon.setAttribute('material', { color: color });
      icon.setAttribute('position', { x: -size / 4, y: 0, z: 0 });
  
      var icon2 = document.createElement('a-entity');
      icon2.setAttribute('geometry', {
        primitive: 'box',
        width: size / 4,
        height: size,
        depth: size / 4
      });
      icon2.setAttribute('material', { color: color });
      icon2.setAttribute('position', { x: size / 4, y: 0, z: 0 });
  
      this.el.appendChild(icon);
      this.el.appendChild(icon2);
    }
  });
  