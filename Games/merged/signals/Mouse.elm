import Graphics.Element exposing (..)
import Mouse
import Window
import Keyboard
import Time
import Char

main =
  -- Signal.map show Mouse.x
  -- Signal.map show Mouse.position
  -- Signal.map show Window.dimensions
  -- Signal.map show Keyboard.arrows
  -- Signal.map show Keyboard.wasd

  -- merge of wasd and arrows
  -- Signal.merge (Signal.map show Keyboard.wasd) (Signal.map show Keyboard.arrows)
  -- Signal.map show (Time.every Time.minute)

  -- Signal.mergeMany
  --   [
  --     (Signal.map show Mouse.position)
  --   , (Signal.map show Keyboard.wasd)
  --   , (Signal.map show Keyboard.arrows)
  --   , (Signal.map show (Time.every Time.second))
  --   ]

  --Signal.map show (Keyboard.enter)

  -- not working for some reason
  --Signal.map show (Keyboard.isDown (Char.toCode 'a'))

  -- show the last key that was pressed. Since Keyboard presses returns a Signal
  -- with the codeAt I need to map a fromCode over it to display the char
  Signal.map show (Signal.map Char.fromCode Keyboard.presses)
