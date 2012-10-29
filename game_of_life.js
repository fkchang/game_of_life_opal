(function() {
  var __opal = Opal, self = __opal.top, __scope = __opal, nil = __opal.nil, __breaker = __opal.breaker, __slice = __opal.slice, __klass = __opal.klass, __range = __opal.range;
  var game = nil, do_it = nil;
  (function(__base, __super){
    // line 1, (file), class Grid
    function Grid() {};
    Grid = __klass(__base, __super, "Grid", Grid);
    var Grid_prototype = Grid.prototype, __scope = Grid._scope;
    Grid_prototype.x = Grid_prototype.y = nil;

    // line 2, (file), Grid#x
    Grid_prototype.$x = function() {
      
      return this.x
    }, 
    // line 2, (file), Grid#y
    Grid_prototype.$y = function() {
      
      return this.y
    };

    // line 3, (file), Grid#initialize
    Grid_prototype.$initialize = function(x, y) {
      var __a;
      return __a = [x, y], this.x = __a[0], this.y = __a[1];
    };

  })(self, null);
  (function(__base, __super){
    // line 8, (file), class Cell
    function Cell() {};
    Cell = __klass(__base, __super, "Cell", Cell);
    var Cell_prototype = Cell.prototype, __scope = Cell._scope;
    Cell_prototype.w = Cell_prototype.h = nil;

    // line 9, (file), Cell#w
    Cell_prototype.$w = function() {
      
      return this.w
    }, 
    // line 9, (file), Cell#h
    Cell_prototype.$h = function() {
      
      return this.h
    };

    // line 10, (file), Cell#initialize
    Cell_prototype.$initialize = function(w, h) {
      var __a;
      return __a = [w, h], this.w = __a[0], this.h = __a[1];
    };

  })(self, null);
  (function(__base, __super){
    // line 15, (file), class GameOfLife
    function GameOfLife() {};
    GameOfLife = __klass(__base, __super, "GameOfLife", GameOfLife);
    var GameOfLife_prototype = GameOfLife.prototype, __scope = GameOfLife._scope;
    GameOfLife_prototype.grid = GameOfLife_prototype.genc = GameOfLife_prototype.genn = GameOfLife_prototype.gen = GameOfLife_prototype.genlog = GameOfLife_prototype.history = GameOfLife_prototype.canvas = GameOfLife_prototype.cell = nil;

    // line 16, (file), GameOfLife#alert
    GameOfLife_prototype.$alert = function(value) {
      
      return alert(value);
    };

    // line 20, (file), GameOfLife#initialize
    GameOfLife_prototype.$initialize = function(canvas, seed) {
      var __a, __b;
      this.canvas = nil;
      this.gen = 0;
      this.genc = [];
      this.genn = [];
      this.genlog = [];
      this.history = 5;
      this.seedweight = 0.2;
      this.grid = __scope.Grid.$new(50, 50);
      this.cell = __scope.Cell.$new(10, 10);
      this.canvas = canvas;
      if ((__a = !seed) !== false && __a !== nil) {
        return this.genc = (__b = __range(0, this.grid.$x(), false).$to_a(), __b.$map._p = (__a = function(x) {

          var __a, __b;
          if (this.grid == null) this.grid = nil;

          if (x == null) x = nil;

          return (__b = __range(0, this.grid.$y(), false).$to_a(), __b.$map._p = (__a = function(y) {

            
            if (this.seedweight == null) this.seedweight = nil;

            if (y == null) y = nil;

            if (this.seedweight['$>'](Math.random())) {
              return 1
              } else {
              return 0
            }
          }, __a._s = this, __a), __b.$map())
        }, __a._s = this, __a), __b.$map())
        } else {
        this.genc = seed;
        return this.genn = this.genc;
      };
    };

    // line 53, (file), GameOfLife#_countNeighbours
    GameOfLife_prototype.$_countNeighbours = function(x, y) {
      var xp = nil, xm = nil, yp = nil, ym = nil, sum = nil, __a, __b, __c, __d, __e, __f, __g, __h, __i, __j, __k, __l, __m, __n;
      xp = (function() { if ((__a = x, __b = 1, typeof(__a) === 'number' ? __a + __b : __a['$+'](__b))['$>']((__a = this.grid.$x(), __b = 1, typeof(__a) === 'number' ? __a - __b : __a['$-'](__b)))) {
        return 0
        } else {
        return (__a = x, __b = 1, typeof(__a) === 'number' ? __a + __b : __a['$+'](__b))
      }; return nil; }).call(this);
      xm = (function() { if ((__a = x, __b = 1, typeof(__a) === 'number' ? __a - __b : __a['$-'](__b))['$<'](0)) {
        return (__a = this.grid.$x(), __b = 1, typeof(__a) === 'number' ? __a - __b : __a['$-'](__b))
        } else {
        return (__a = x, __b = 1, typeof(__a) === 'number' ? __a - __b : __a['$-'](__b))
      }; return nil; }).call(this);
      yp = (function() { if ((__a = y, __b = 1, typeof(__a) === 'number' ? __a + __b : __a['$+'](__b))['$>']((__a = this.grid.$y(), __b = 1, typeof(__a) === 'number' ? __a - __b : __a['$-'](__b)))) {
        return 0
        } else {
        return (__a = y, __b = 1, typeof(__a) === 'number' ? __a + __b : __a['$+'](__b))
      }; return nil; }).call(this);
      ym = (function() { if ((__a = y, __b = 1, typeof(__a) === 'number' ? __a - __b : __a['$-'](__b))['$<'](0)) {
        return (__a = this.grid.$y(), __b = 1, typeof(__a) === 'number' ? __a - __b : __a['$-'](__b))
        } else {
        return (__a = y, __b = 1, typeof(__a) === 'number' ? __a - __b : __a['$-'](__b))
      }; return nil; }).call(this);
      sum = (__a = (__c = (__e = (__g = (__i = (__k = (__m = this.genc['$[]'](xm)['$[]'](ym), __n = this.genc['$[]'](x)['$[]'](ym), typeof(__m) === 'number' ? __m + __n : __m['$+'](__n)), __l = this.genc['$[]'](xp)['$[]'](ym), typeof(__k) === 'number' ? __k + __l : __k['$+'](__l)), __j = this.genc['$[]'](xm)['$[]'](y), typeof(__i) === 'number' ? __i + __j : __i['$+'](__j)), __h = this.genc['$[]'](xp)['$[]'](y), typeof(__g) === 'number' ? __g + __h : __g['$+'](__h)), __f = this.genc['$[]'](xm)['$[]'](yp), typeof(__e) === 'number' ? __e + __f : __e['$+'](__f)), __d = this.genc['$[]'](x)['$[]'](yp), typeof(__c) === 'number' ? __c + __d : __c['$+'](__d)), __b = this.genc['$[]'](xp)['$[]'](yp), typeof(__a) === 'number' ? __a + __b : __a['$+'](__b));
      return sum;
    };

    // line 64, (file), GameOfLife#_getState
    GameOfLife_prototype.$_getState = function(x, y) {
      var cell = nil, pop = nil, __a, __b, __c;
      cell = this.genc['$[]'](x)['$[]'](y);
      pop = this.$_countNeighbours(x, y);
      if ((__a = ((__b = cell['$=='](1)) ? pop['$<'](2) : __b)) !== false && __a !== nil) {
        return 0
      };
      if ((__a = ((__b = cell['$=='](1)) ? ((__c = (2)['$=='](pop)), __c !== false && __c !== nil ? __c : pop['$=='](3)) : __b)) !== false && __a !== nil) {
        return 1
      };
      if ((__a = ((__b = cell['$=='](1)) ? pop['$>'](3) : __b)) !== false && __a !== nil) {
        return 0
      };
      if ((__a = ((__b = cell['$=='](0)) ? pop['$=='](3) : __b)) !== false && __a !== nil) {
        return 1
      };
      return 0;
    };

    // line 76, (file), GameOfLife#runGeneration
    GameOfLife_prototype.$runGeneration = function() {
      var __a, __b;
      this.genn = (__b = __range(0, this.grid.$x(), false).$to_a(), __b.$map._p = (__a = function(x) {

        var __a, __b;
        if (this.grid == null) this.grid = nil;

        if (x == null) x = nil;

        return (__b = __range(0, this.grid.$y(), false).$to_a(), __b.$map._p = (__a = function(y) {

          
          if (y == null) y = nil;

          return this.$_getState(x, y)
        }, __a._s = this, __a), __b.$map())
      }, __a._s = this, __a), __b.$map());
      this.$_rotateGenerations();
      this.genc = this.genn;
      return this.gen = this.gen['$+'](1);
    };

    // line 87, (file), GameOfLife#_rotateGenerations
    GameOfLife_prototype.$_rotateGenerations = function() {
      var genn = nil;
      if (this.genlog.$length()['$>'](this.history)) {
        this.genlog.$pop()
      };
      genn = this.genn;
      return this.genlog.$unshift(JSON.stringify(genn));
    };

    // line 93, (file), GameOfLife#checkStable
    GameOfLife_prototype.$checkStable = function() {
      var genc = nil, json_genc = nil, __a, __b;
      genc = this.genc;
      json_genc = JSON.stringify(genc);
      (__b = this.genlog, __b.$each._p = (__a = function(key, gen) {

        var __a, __b;
        if (key == null) key = nil;
if (gen == null) gen = nil;

        if ((__a = ((__b = gen['$=='](json_genc)) ? key['$>'](0) : __b)) !== false && __a !== nil) {
          return true
          } else {
          return nil
        }
      }, __a._s = this, __a), __b.$each());
      return false;
    };

    // line 102, (file), GameOfLife#_sizeCanvas
    GameOfLife_prototype.$_sizeCanvas = function() {
      var canvas = nil, width = nil, height = nil, __a, __b;
      canvas = this.canvas;
      width = (__a = this.grid.$x(), __b = this.cell.$w(), typeof(__a) === 'number' ? __a * __b : __a['$*'](__b));
      height = (__a = this.grid.$y(), __b = this.cell.$h(), typeof(__a) === 'number' ? __a * __b : __a['$*'](__b));
      canvas.canvas.width = width;
      canvas.canvas.height = height ;
      return true;
    };

    // line 114, (file), GameOfLife#render
    GameOfLife_prototype.$render = function() {
      var canvas = nil, genc = nil, cell = nil, __a, __b;
      this.$_sizeCanvas();
      canvas = this.canvas;
      genc = this.genc;
      cell = this.cell;
      (__b = __range(0, this.grid.$x(), false).$to_a(), __b.$each._p = (__a = function(x) {

        var __a, __b;
        if (this.grid == null) this.grid = nil;

        if (x == null) x = nil;

        return (__b = __range(0, this.grid.$y(), false).$to_a(), __b.$each._p = (__a = function(y) {

          
          if (y == null) y = nil;

          canvas.fillStyle = genc[x][y] ? "black" : "white";
          return canvas.fillRect(x * cell.w, y * cell.h, cell.w, cell.h);
        }, __a._s = this, __a), __b.$each())
      }, __a._s = this, __a), __b.$each());
      return true;
    };

  })(self, null);
  (function(__base, __super){
    // line 135, (file), class Interval
    function Interval() {};
    Interval = __klass(__base, __super, "Interval", Interval);
    var Interval_prototype = Interval.prototype, __scope = Interval._scope, TMP_1;
    Interval_prototype.interval = nil;

    // line 136, (file), Interval#initialize
    Interval_prototype.$initialize = TMP_1 = function(time) {
      var __context, block;
      block = TMP_1._p || nil, __context = block._s, TMP_1._p = null;
      if (time == null) {
        time = 0
      }
      return this.interval = setInterval(function(){block.$call()}, time);
    };

    // line 140, (file), Interval#stop
    Interval_prototype.$stop = function() {
      var interval = nil;
      interval = this.interval;
      return clearInterval(interval);
    };

  })(self, null);
  (function(__base, __super){
    // line 146, (file), class DoIt
    function DoIt() {};
    DoIt = __klass(__base, __super, "DoIt", DoIt);
    var DoIt_prototype = DoIt.prototype, __scope = DoIt._scope, TMP_2;
    DoIt_prototype.times = DoIt_prototype.interval = nil;

    // line 148, (file), DoIt#initialize
    DoIt_prototype.$initialize = TMP_2 = function(time) {
      var myself = nil, __a, __b, __context, block;
      block = TMP_2._p || nil, __context = block._s, TMP_2._p = null;
      
      this.times = 0;
      myself = this;
      return this.interval = (__b = __scope.Interval, __b.$new._p = (__a = function() {

        
        
        return myself.$work()
      }, __a._s = this, __a), __b.$new(2000));
    };

    // line 156, (file), DoIt#work
    DoIt_prototype.$work = function() {
      
      this.times = this.times['$+'](1);
      this.$alert(this.times);
      if (this.times['$=='](5)) {
        return this.interval.$stop()
        } else {
        return nil
      };
    };

  })(self, null);
  (function(__base, __super){
    // line 163, (file), class RunIt
    function RunIt() {};
    RunIt = __klass(__base, __super, "RunIt", RunIt);
    var RunIt_prototype = RunIt.prototype, __scope = RunIt._scope;
    RunIt_prototype.game = RunIt_prototype.interval = nil;

    // line 164, (file), RunIt#initialize
    RunIt_prototype.$initialize = function(game, interval) {
      var myself = nil, __a, __b;
      this.game = game;
      myself = this;
      return this.interval = (__b = __scope.Interval, __b.$new._p = (__a = function() {

        
        
        return myself.$work()
      }, __a._s = this, __a), __b.$new(interval));
    };

    // line 172, (file), RunIt#work
    RunIt_prototype.$work = function() {
      var game = nil, __a;
      game = this.game;
      game.$runGeneration();
      game.$render();
      document.getElementById('info').innerHTML = "Generation: " + game.gen;
      if ((__a = game.$checkStable()) !== false && __a !== nil) {
        return this.interval.$stop()
        } else {
        return nil
      };
    };

  })(self, null);
  game = __scope.GameOfLife.$new(document.getElementById('board').getContext("2d"));
  do_it = __scope.RunIt.$new(game, 10);
  return game.$render();
})();
