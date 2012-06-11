root = exports ? this

#### Class Color
#
# Stores different color values based on an initial Hexadecimal value. 
# The overall idea is to operate in a functional manner, so we don't modify 
# the state of the Color object once its initialized, we only return values.
# 
# RGB/HSL Algorithms adapted from:
# http://mjijackson.com/2008/02/rgb-to-hsl-and-rgb-to-hsv-color-model-conversion-algorithms-in-javascript
#
# @param **color** _String_
#
root.Color = class Color
  constructor: (color) ->  
    @hex = if color.charAt(0) == "#" then color else "#" + color
    @rgb = @hex2rgb(@hex) if color?
    @hsl = @rgb2hsl(@rgb) if @rgb?
    return @

  #### Convert Hexadecimal color to rgb()
  #
  # @param **color** _String_
  #
  hex2rgb : (color) ->
    color = color.substr(1) if color.charAt(0) == '#'
    rgb =
      r : parseInt(color.charAt(0) + '' + color.charAt(1), 16),
      g : parseInt(color.charAt(2) + '' + color.charAt(3), 16),
      b : parseInt(color.charAt(4) + '' + color.charAt(5), 16)

  #### Convert rgb to hsl values
  #
  # @param **rgb** _Object_
  #
  # Return and object with the HSL values converted for use in SASS
  #
  rgb2hsl : (rgb) ->
    [r, g, b] = [rgb.r, rgb.g, rgb.b]
    r /= 255
    g /= 255
    b /= 255

    max = Math.max(r, g, b)
    min = Math.min(r, g, b)

    [h, s, l] = [(max + min) / 2, (max + min) / 2, (max + min) / 2]

    if max == min 
      h = s = 0; # achromatic
    else
      d = max - min;
      s = if l > 0.5 then d / (2 - max - min) else d / (max + min)
      switch max
        when r then h = (g - b) / d + (g < b ? 6 : 0)
        when g then h = (b - r) / d + 2
        when b then h = (r - g) / d + 4
      h /= 6

    hsl = 
      h : Math.round(h * 360) 
      s : Math.round(s * 100) 
      l : Math.round(l * 100)

  #### Convert rgb to a hex number suitable for use in HTML  
  # http://stackoverflow.com/a/5623914/12799
  #
  # @param **rgb** _Object_  
  # 
  rgb2hex : (rgb) ->
    "#" + ((1 << 24) + (rgb.r << 16) + (rgb.g << 8) + rgb.b).toString(16).slice(1);

  #### Convert hue to rgb values
  #
  # convenience method for hsl2rgb
  #
  # @param **p** _Integer_  
  # @param **q** _Integer_  
  # @param **t** _Integer_  
  #
  hue2rgb : (p, q, t) ->
    t += 1 if (t < 0)
    t -= 1 if (t > 1)
    return p + (q - p) * 6 * t if (t < 1/6) 
    return q if (t < 1/2)
    return p + (q - p) * (2/3 - t) * 6 if (t < 2/3)
    p;

  #### Convert hsl to rgb values
  #
  # @param **hsl** _Object_  
  #
  hsl2rgb : (hsl) ->
    [h, s, l] = [hsl.h / 360, hsl.s / 100, hsl.l / 100] # We need to use the raw colors

    if s == 0 
      r = g = b = l; # achromatic
    else 
      q =  if l < 0.5 then l * (1 + s) else l + s - l * s
      p = 2 * l - q;
      r = @hue2rgb(p, q, h + 1/3);
      g = @hue2rgb(p, q, h);
      b = @hue2rgb(p, q, h - 1/3);
    
    rgb =
      r : Math.round(r * 255)
      g : Math.round(g * 255) 
      b : Math.round(b * 255)

  #### Convert hsl to hex number suitable for use in HTML  
  #
  # @param **hsl** _Object_  
  #   
  hsl2hex : (hsl) ->
    @rgb2hex @hsl2rgb(hsl)

  #### Modify a color
  #
  # @param **attr** _Object_ attributes you want to change
  #
  # NOT SAFE - doesn't check values for constraints!  
  # Returns a copy of the color object with new values,
  # does not set the instance vars to the new values  
  # Analogous to http://sass-lang.com/docs/yardoc/Sass/Script/Color.html#with-instance_method
  #
  mod : (attr) ->

    # Cannot modify RGB and HSL in the same attr
    if (_.intersection(_.keys(attr), ['h', 's', 'l']).length > 0) and (_.intersection(_.keys(attr), ['r', 'g', 'b']).length > 0) then return null

    # See what type of attributes we're dealing with in attr
    if _.intersection(_.keys(attr), ['r', 'g', 'b']).length > 0
      type = "rgb"
    else if _.intersection(_.keys(attr), ['h', 's', 'l']).length > 0
      type = "hsl"
    else return null

    # remove null values from attr obj
    _.each attr, (val, key, list) ->
      if val == null then delete list[key]

    # If the attr object is empty then send back unmodified object
    switch type
      when 'rgb' 
        rgb = _.pick attr, 'r', 'g', 'b'
        if _.isEmpty(rgb) == false 
          out = _.extend(_.clone(@rgb), rgb) 
        else 
          out = @rgb

      when 'hsl'
        hsl = _.pick attr, 'h', 's', 'l'
        if _.isEmpty(hsl) == false 
          out = _.extend(_.clone(@hsl), hsl) 
        else 
          out = @hsl
    out

  #### Ensure a computed value is within a threshold
  # and if not, send back the upper or lower bounds
  #
  # @param **attr** _Integer_ start value, usually Color attribute  
  # @param **amount** _Integer_ amount to change attr  
  # @param **limit** _Array_ the upper and lower bounds  
  # @param **direction** _String_ the math operator, +, -, *, etc.  
  #
  constrain : (attr, amount, limit, direction) ->
    math = [attr, direction, amount].join ' '
    val = eval math # do the math!
    test = limit[1] >= val >= limit[0]
    if test then val else
      if val < limit[0] then val = limit[0]
      if val > limit[1] then val = limit[1]
    Math.abs(val) # Make sure negative values are positive

  #### Calculate correct # of degrees for shifting hues
  #
  # @param **attr** _Integer_ start value, usually Color attribute  
  # @param **amount** _Integer_ amount to change degrees  
  #
  constrain_degrees : (attr, amount) ->
    val = attr + amount # do the math!   
    if val > 360 then val -= 360
    if val < 0 then val += 360
    Math.abs(val) # Make sure negative values are positive

  #### Getters for individual RGB & HSL values of color
  red : ->
    @rgb.r

  green : ->
    @rgb.g

  blue: ->
    @rgb.b

  hue : ->
    @hsl.h 

  saturation : ->
    @hsl.s

  lightness : ->
    @hsl.l