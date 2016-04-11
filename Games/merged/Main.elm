import Signal exposing (..)
import Graphics.Element exposing (..)
import Graphics.Collage exposing (..)
import Text exposing (..)
import Color exposing (..)
import Animation exposing (..)
import Time exposing (second)


squareSize =
  40

colors: List (Color)
colors =
  [
    red
   ,blue
   ,green
  ]

-- main : Element
main =
  world (700, 700) (squares 3)


squares count =
  foldp (square squareSize |> filled red |> move (0, 0)) [] [1..2]
  -- [
  --   square squareSize |> filled red |> move (0, 0)
  --  ,square squareSize |> filled blue |> move (squareSize, 0)
  --  ,square squareSize |> filled green |> move (squareSize * 2, 0)
  -- ]

world (w, h) =
  collage w h

diamond color size =
  square size
  |> filled color
  |> rotate (degrees 45)

-- diamond' : Float -> Form
diamond' size =
  square size
