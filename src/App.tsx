import React, { useState } from 'react'

import {
  ComposableMap,
  Geographies,
  Geography,
  Graticule,
  Sphere,
} from 'react-simple-maps'
import { Geo } from './types/geoTypes'

const geoUrl =
  'https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json'

function App() {
  const [countryHover, setCountryHover] = useState('')
  const [countriesBeen, setCountriesBeen] = useState<string[]>([])
  return (
    <div className="App">
      <div>
        <div>You are hovering over {countryHover}</div>
        <div>You have selected: {countriesBeen.sort()}</div>
        <ComposableMap data-tip="" projection="geoEqualEarth">
          <Sphere
            stroke="#DDD"
            id="sphere"
            fill="transparent"
            strokeWidth={0.5}
          />
          <Graticule stroke="#DDD" />
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo: Geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={countriesBeen.includes(geo.properties.NAME_LONG)?"#ff8552":"#297373"}
                  onMouseEnter={() => setCountryHover(geo.properties.NAME_LONG)}
                  onMouseLeave={() => setCountryHover('')}
                  onMouseDown={() => setCountriesBeen([...countriesBeen, geo.properties.NAME_LONG])}
                  style={{
                    default: {
                      outline: 0
                    },
                    hover: {
                      fill: "#ff8552",
                      outline: 0
                    },
                    pressed: {
                      fill: "#ff7033",
                      outline: 0
                    }
                  }}
                />
              ))
            }
          </Geographies>
        </ComposableMap>
      </div>
    </div>
  )
}

export default App
