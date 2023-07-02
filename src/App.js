import React, { useState } from 'react'

function App() {
  const [inputs, setInputs] = useState([['']])
  const [result, setResult] = useState('')

  const calc = () => {
    const data = inputs
    var s = '';
    var m = '';

    var positionsByRows = []
    var stop = false

    var l = (y) => {
      y--

      if (y < 0) {
        stop = true
        return
      }

      if (data[y][positionsByRows[y] + 1] != undefined) {
        positionsByRows[y]++

        for (var i = y + 1; i < data.length; i++) {
          positionsByRows[i] = 0
        }

        return
      }

      l(y)
    }

    var f = (y) => {
      if (positionsByRows[y] == undefined) {
        positionsByRows[y] = 0
      }

      s += data[y][positionsByRows[y]]

      if (y == data.length - 1) // on last row
      {
        if (data[y][positionsByRows[y] + 1] != undefined) // is something to the right
        {
          positionsByRows[y]++
        }
        else {
          positionsByRows[y] = 0
          l(y)
        }

        y = 0

        m += '<br>' + s;
        s = ''
      }
      else {
        y++
      }

      if (!stop) {
        f(y)
      }
    }

    f(0)

    setResult(m)

    navigator.clipboard.writeText(m.replace(/<br\s*[\/]?>/gi, "\n"))
  }

  return (
    <div>
      {inputs.map((row, r) =>
        <div style={{ display: 'block' }}>
          {row.map((col, c) =>
            <div style={{display:'inline'}}>
              <input value={col} onChange={e => {
                inputs[r][c] = e.target.value
                setInputs([...inputs])
              }} />
              <button className="removeCol" onClick={() => {
                inputs[r].splice(c, 1)
                setInputs([...inputs])
              }}>- col</button>
            </div>
          )}
          <button onClick={() => {
            inputs[r] = [...inputs[r], '']
            setInputs([...inputs])
          }}>+ col</button>
        </div>
      )}
      <button onClick={() => { setInputs([...inputs, [['']]]) }}>+ row</button>
      <br />
      <br />
      <button onClick={() => calc()}>Calc</button>
      <div dangerouslySetInnerHTML={{ __html: result }}></div>
    </div>
  )
}

export default App