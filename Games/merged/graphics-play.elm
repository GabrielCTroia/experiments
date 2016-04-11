import Color exposing (..)
import Graphics.Collage exposing (..)
import Graphics.Element exposing (..)
import Time exposing (fps)
import Transform2D exposing (scaleX)

framerate = 10.0

cow = image 24 28 "http://i.neoseeker.com/cm/42/badges/BCow2.png"
chicken = image 40 40 "http://fogu.com/hm/snes/img/chicken.gif"


main = Signal.map draw (Time.fps framerate)

draw : Float -> Element
draw delta =
  let speedFactor = delta * framerate / 1000
  in
    collage 500 500
      [ ngon 4 (100 / speedFactor)
          |> filled clearGrey
          |> move (-10,0)
      , ngon 5 50
          |> filled clearGrey
          |> move (40,10 * speedFactor)
      , show speedFactor
          |> toForm
      , triangle 0
      , triangle 50
          |> move (50, 50)
      , triangle 100
          |> move (50, 50)
          |> mirror
      , triangle 150
          |> move (50, -50)
          |> mirror
      , triangle 200
          |> mirror
          |> move (-50, -50)
      , triangle 250
          |> move (-50, -50)
      ]


clearGrey : Color
clearGrey =
  rgba 111 111 111 0.6

-- mirrors from center, how to different?
mirror : Form -> Form
mirror form =
  groupTransform (scaleX -1) [form]


triangle greenness =
  ngon 3 20
    |> filled (rgba 111 greenness 111 0.6)
