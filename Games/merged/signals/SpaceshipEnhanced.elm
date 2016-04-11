module Spaceship where

import Graphics.Element exposing (..)
import Graphics.Collage exposing (..)
import Color exposing (..)

import Keyboard
import Mouse
import Window
import Time exposing (..)


-- MODEL

type alias Ship =
  { position : Int
  , powerLevel : Int
  , isFiring : Bool
  }

type alias Bullet =
  { position: {x: Int, y: Int}
  , size: Float
  }

type alias Model =
  { ship: Ship
  , bullet: Bullet
  }

initialBullet : Bullet
initialBullet =
  { size = 5
  , position = {x = 0, y = 100}
  }

initialShip : Ship
initialShip =
  { position = 0
  , powerLevel = 10
  , isFiring = False
  }

initialState : Model
initialState =
  { ship = initialShip
  , bullet = initialBullet
  }

-- UPDATE

type Action = NoOp | Left | Right | Fire Bool | Tick


update : Action -> Model -> Model
update action state =
  { state |
    ship = updateShip action state.ship state
  , bullet = updateBullet action state.bullet state
  }

updateShip : Action -> Ship -> Model -> Ship
updateShip action ship state =
  case action of
    NoOp ->
      ship
    Left ->
      { ship | position = ship.position - 1}
    Right ->
      { ship | position = ship.position + 1 }
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
        if ship.powerLevel < 10 then
          ship.powerLevel + 1
        else
          ship.powerLevel
      in
        { ship | powerLevel = nextPowerLevel }

updateBullet : Action -> Bullet -> Model -> Bullet
updateBullet action bullet state =
  case action of
    Fire firing ->
      bullet
    Left ->
      let
        position = bullet.position
      in
        { bullet | position = { position | x = state.ship.position } }
    Right ->
      let
        position = bullet.position
      in
        { bullet | position = { position | x = state.ship.position } }
    Tick ->
      bullet
    _ -> bullet

-- VIEW

view : (Int, Int) -> Model -> Element
view (w, h) state =
  let
    (w', h') = (toFloat w, toFloat h)
  in
    collage w h
      [ drawGame w' h'
      , drawShip h' state.ship
      , drawBullet state.bullet
      , toForm (show state)
      ]

drawGame : Float -> Float -> Form
drawGame w h =
  rect w h
    |> filled grey

drawShip : Float -> Ship -> Form
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

drawBullet : Bullet -> Form
drawBullet bullet =
  circle bullet.size
    |> filled black
    |> move ((toFloat bullet.position.x), (toFloat bullet.position.y))

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


-- delta : Signal
-- delta =
--   Signal.map inSeconds (fps 30)

input : Signal Action
input =
  Signal.mergeMany
    [ direction
    , fire
    , ticker
    ]

-- input =
--   Signal.sampleOn
--     delta
--     Signal.mergeMany
--       [ direction
--       , fire
--       , ticker
--       ]

model : Signal Model
model =
  Signal.foldp update initialState input

main : Signal Element
main =
  Signal.map2 view Window.dimensions model


-- main : Signal Element
-- main =
--   Signal.map show Keyboard.presses
