class Grid
  attr_reader :x, :y
  def initialize(x, y)
    @x, @y = x, y
  end
end

class Cell
  attr_reader :w, :h
  def initialize(w, h)
    @w, @h = w, h
  end
end

class GameOfLife
  def alert value
    `alert(value)`
  end
  
  def initialize(canvas, seed)
    @canvas =  nil     # CanvasRenderingContext2D object (We store it like this because its still possible to get the dom node out of it, which we use less)
    @gen =  0          # Generation Counter
    @genc =  []        # Current Generation
    @genn =  []        # Next Generation
    @genlog =  []      # A JSON log of the last # generations to detect stability. JSON is used because its easier to compare than an two entire arrays, and its standard.
    @history =  5      # How many generations to log (ie what size of oscillating pattern to detect)
    @seedweight =  0.2 # 0 to 1 of density of life:death for initial random seed. 1 is complete life, 0 complete death. High densities are pointless, most cells die on second generation.
    @grid = Grid.new(50, 50)          # Size of the grid, in cells
    @cell = Cell.new(10, 10)          # Size of cells, in pixels
    
    # if ! canvas.canvas? || ! canvas.nodeName == "CANVAS" # We've either been given a CanvasRenderingContext2D, which has a .canvas property, or we've been given a canvas DOM node, which will have a nodeName
    # raise "Game needs a canvas object or canvas DOM node"
    # @canvas = canvas.nodeName? ? canvas.getContext("2d") : canvas
    @canvas = canvas
    if !seed
      # generate initial seed.
      @genc = (0..@grid.x).to_a.map { |x|
        (0..@grid.y).to_a.map { |y|
          if @seedweight > `Math.random()`
            1
          else
            0
          end
        }
      }
    else
      @genc = seed
      @genn = @genc
    end
    #    end            
  end
  
  def _countNeighbours(x, y)
    xp = x + 1 > @grid.x - 1 ? 0 : x + 1
    xm = x - 1 < 0 ? @grid.x - 1 : x - 1
    yp = y + 1 > @grid.y - 1 ? 0 : y + 1
    ym = y - 1 < 0 ? @grid.y - 1 : y - 1
    # {top left} {top} {top right} {left} {right} {bottom left} {bottom} {bottom right}
    sum = @genc[xm][ym] + @genc[x][ym] + @genc[xp][ym] + @genc[xm][y] + @genc[xp][y] + @genc[xm][yp] + @genc[x][yp] + @genc[xp][yp]
    #puts "sum = #{sum}"
    sum
  end

  def _getState(x, y)
    cell = @genc[x][y]
    pop = _countNeighbours(x, y)
    # Standard rules for survival
    return 0 if cell == 1 and pop < 2 
    return 1 if cell == 1 and ((2 == pop) or (pop == 3) )
    return 0 if cell == 1  and pop > 3 
    return 1 if cell == 0 and pop == 3 
    0
  end

  # Iterate over the next array and get the new state for each cell
  def runGeneration
    @genn = (0..@grid.x).to_a.map { |x|
      (0..@grid.y).to_a.map { |y|
        _getState(x, y)
      }
    }
    _rotateGenerations()
    @genc = @genn
    @gen += 1
  end
	# Rotate the history log by popping off the old and unshifting in the new
  def _rotateGenerations
    @genlog.pop() if @genlog.length > @history
    genn = @genn
    @genlog.unshift(`JSON.stringify(genn)`)
  end
	# Check for stability in the last @history generations by matching the log against the current generation.
  def checkStable
    genc = @genc
    json_genc = `JSON.stringify(genc)`
     @genlog.each { |key, gen|
      return true if gen == json_genc and key > 0
    }
    return false
  end
  # Make sure our canvas is appropriately sized, also used for clearing a canvas pre render
  def _sizeCanvas
    # Use the attributes because using the css means the canvas
    # stretches.
    canvas = @canvas
    width = @grid.x * @cell.w
    height = @grid.y * @cell.h
    `canvas.canvas.width = #{width}`
    `canvas.canvas.height = #{height} `
    return true
  end
  # Render the current generation the the canvas element

  def render
    _sizeCanvas()
    canvas = @canvas
    genc = @genc
    cell = @cell
    (0..@grid.x).to_a.each { |x|
      (0..@grid.y).to_a.each { |y|
        `canvas.fillStyle = genc[x][y] ? "black" : "white"`
        `canvas.fillRect(x * cell.w, y * cell.h, cell.w, cell.h)`
      }
    }
    return true
  end
  
end




# var canvas = document.getElementById('board').getContext("2d")

class Interval
  def initialize(time=0, &block)
    @interval = `setInterval(function(){#{block.call}}, time)`
  end

  def stop
    interval = @interval
    `clearInterval(interval)`
  end
end

class DoIt

  def initialize(time, &block)
    @times = 0
    myself = self
    @interval = Interval.new 2000 do
      myself.work
    end
  end
  
  def work
    @times += 1
    alert @times
    @interval.stop if @times == 5
  end
end

class RunIt
  def initialize(game, interval)
    @game = game
    myself = self
    @interval = Interval.new interval do
      myself.work
    end
  end

  def work
    game = @game
    game.runGeneration()
    game.render()
    `document.getElementById('info').innerHTML = "Generation: " + game.gen`
    @interval.stop if game.checkStable() 
    
  end
end
game =  GameOfLife.new(`document.getElementById('board').getContext("2d")`)

do_it = RunIt.new game, 10
game.render()



