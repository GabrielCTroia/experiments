import Graphics.Element exposing (..)
import Mouse
import Window
import Keyboard
import Time
import Char

area : (Int, Int) -> Int
area (w, h) =
  w * h

mouseArea : Signal Int
mouseArea =
  (Signal.map area Mouse.position)

pressedChar : Signal Char
pressedChar =
  Signal.map Char.fromCode Keyboard.presses

pressedDigit : Signal Bool
pressedDigit =
  Signal.map Char.isDigit pressedChar

main : Signal Element
main =
  -- Signal.map show mouseArea
  -- Signal.map show pressedDigit
  Signal.map show pressedDigit
