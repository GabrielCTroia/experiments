module Spaceship where

import Graphics.Element exposing (..)
import Graphics.Collage exposing (..)
import Color exposing (..)

import Keyboard
import Mouse
import Window
import Time


-- MODEL

type alias Model =
  { position : Int
  , powerLevel : Int
  , isFiring : Bool
  }

initialShip : Model
initialShip =
  { position = 0
  , powerLevel = 10
  , isFiring = False
  }

-- UPDATE

type Action = NoOp | Left | Right | Fire Bool | Tick


update : Action -> Model -> Model
update action ship =
  case action of
    NoOp ->
      ship
    Left ->
      {ship | position = ship.position - 1}
    Right ->
      {ship | position = ship.position + 1}
    Fire firing ->
      let
        nextPowerLevel =
          if firing then ship.powerLevel - 1 else ship.powerLevel
      in
        { ship |
            isFiring = firing
          , powerLevel = nextPowerLevel
        }
    Tick ->
      let nextPowerLevel =
        if ship.powerLevel < 10 then ship.powerLevel + 1 else ship.powerLevel
      in
        { ship |
          powerLevel = nextPowerLevel
        }
-- VIEW

view : (Int, Int) -> Model -> Element
view (w, h) ship =
  let
    (w', h') = (toFloat w, toFloat h)
  in
    collage w h
      [ drawGame w' h'
      , drawShip h' ship
      , toForm (show ship)
      ]

drawGame : Float -> Float -> Form
drawGame w h =
  rect w h
    |> filled grey


drawShip : Float -> Model -> Form
drawShip gameHeight ship =
  let
    shipColor =
      if ship.isFiring then red else blue
  in
    ngon 3 30
      |> filled shipColor
      |> rotate (degrees 90)
      |> move ((toFloat ship.position), (50 - gameHeight / 2))
      |> alpha ((toFloat ship.powerLevel) / 10)


-- SIGNALS

direction : Signal Action
direction =
  let
    x = Signal.map .x Keyboard.arrows
    -- this is awesome
    delta = Time.fps 30

    toAction n =
      if n < 0 then
        Left
      else if n > 0 then
        Right
      else
        NoOp

    actions = Signal.map toAction x
  in
    Signal.sampleOn delta actions


fire : Signal Action
fire =
  --Signal.map (\pressed -> Fire pressed) Keyboard.space
  -- this works because Fire is a curried fn, that takes a boolean
  -- the boolean is given from Keyboard.space
  Signal.map Fire Keyboard.space

ticker : Signal Action
ticker =
  --Signal.map (\_ -> Tick) (Time.every Time.second
  -- always ignores the value that comes from the signal,
  -- and because we actually don't care about that, we can use always!
  Signal.map (always Tick) (Time.every Time.second)

input : Signal Action
input =
  Signal.mergeMany
    [ direction
    , fire
    , ticker
    ]

model : Signal Model
model =
  Signal.foldp update initialShip input

main : Signal Element
main =
  Signal.map2 view Window.dimensions model


-- main : Signal Element
-- main =
--   Signal.map show Keyboard.presses
