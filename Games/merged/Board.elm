import List exposing (..)

import Color exposing (..)
import Graphics.Element exposing (..)
import Signal exposing (..)


cellSize = 40
(columns, rows) = (10, 10)

main : Element
main =
  renderGrid generateGrid


initialSeed : Signal Random.Seed
initialSeed =
  (\(time, _) -> Random.initialSeed (round time)) 

generateGrid : List (List Bool)
generateGrid =
  List.repeat rows (List.repeat columns True)

renderGrid : List (List Bool) -> Element
renderGrid grid =
  grid
    |> List.map renderRow
    |> List.map (flow right)
    |> flow down
    |> container (cellSize * columns) (cellSize * rows) topLeft

renderRow : List Bool -> List Element
renderRow row =
  List.map renderCell row

renderCell : Bool -> Element
renderCell on =
  spacer cellSize cellSize
    |> color (if on then darkGrey else grey)
