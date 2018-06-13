function Joystick(opt) {
  if (!opt.zone) return;
  var disabledColor = opt && opt.disabledColor || true;

  this.options = {
    mode: opt && opt.mode || 'static',
    size: opt && opt.size || 300,
    color: disabledColor ? 'ddd' : (opt && opt.color || '#eee'),
    position: opt && opt.position || {
      left: '50%',
      top: '50%'
    },
    zone: opt && opt.zone
  };

  this.distance = 0;
  this.angle = null;
  this.time = null;
}

Joystick.prototype.init = function() {
  var manager = nipplejs.create(this.options);
  this.manager = manager;
  this._on();
  return this;
}

Joystick.prototype._on = function() {
  var me = this;
  this.manager
    .on('start', function (evt, data) {
      me.time = setInterval(() => {
        me.onStart && me.onStart(me.distance,me.angle);
      }, 100);
    })
    .on('move', function (evt, data) {
      if (data.direction) {
        me.angle = data.direction.angle;
        me.distance = data.distance;
      }
    })
    .on('end', function (evt, data) {
      clearInterval(me.time);
      me.onEnd && me.onEnd();
    });
}