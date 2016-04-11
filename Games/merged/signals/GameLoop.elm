module GameLoop where

import Graphics.Element exposing (..)
import Graphics.Collage exposing (..)
import Color exposing (..)

import Keyboard
import Mouse
import Window
import Time

type Action = NoOp | Tick | MouseClicked | MouseMoved

-- MODEL

type alias Model = Action

initialModel : Model
initialModel =
  NoOp

-- UPDATE

update : Action -> Model -> Model
update action model =
  model


-- VIEW

view : Model -> Element
view model =
  show model


-- SIGNALS

tick : Signal Action
tick =
  Signal.map (always Tick) (Time.every (Time.second * 3))

mouseClicked : Signal Action
mouseClicked =
  Signal.map (always MouseClicked) Mouse.clicks

mouseMoved : Signal Action
mouseMoved =
  Signal.map (always MouseMoved) Mouse.position

input : Signal Action
input =
  Signal.mergeMany
    [ mouseMoved
    , mouseClicked
    , tick
    ]

-- MAIN

delta : Signal Time.Time
delta =
  Signal.map Time.inSeconds (Time.fps 30)

main : Signal Element
main =
  -- Signal.map show input
  Signal.map view (Signal.sampleOn delta input)
  --Signal.map show (Signal.sampleOn Mouse.clicks delta)
