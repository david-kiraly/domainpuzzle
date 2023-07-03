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

  const reset = () => {
    setInputs([['']])
    setResult('')
  }

  return (
    <div>
      {inputs.map((row, r) =>
        <div key={r} className={`row`}>
          {row.map((col, c) =>
            <div className={`col`} key={c}>
              <input value={col} onChange={e => {
                inputs[r][c] = e.target.value
                setInputs([...inputs])
              }} />
              <button className="removeCol" onClick={() => {
                inputs[r].splice(c, 1)
                setInputs([...inputs])
              }}>-C</button>
            </div>
          )}
          <button onClick={() => {
            inputs[r] = [...inputs[r], '']
            setInputs([...inputs])
          }}>+C</button>
          <button onClick={() => {
            inputs.splice(r, 1)
            setInputs([...inputs])
          }}>-R</button>
          <button onClick={() => {
            setInputs([...inputs.slice(0, r), [['']], ...inputs.slice(r)])
          }}>+Rb</button>
          <button onClick={() => {
            setInputs([...inputs.slice(0, r + 1), [['']], ...inputs.slice(r + 1)])
          }}>+Ra</button>
        </div>
      )}
      <button className={`actionBtn`} onClick={() => calc()}>Go</button>
      <button className={`actionBtn resetBtn`} onClick={() => reset()}>Reset</button>
      <div className={`result`} dangerouslySetInnerHTML={{ __html: result }}></div>
    </div>
  )
}

export default App