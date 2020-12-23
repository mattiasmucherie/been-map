import React, { useState } from 'react'
import {
  ComposableMap,
  Geographies,
  Geography,
  Graticule,
  Sphere,
} from 'react-simple-maps'
import { Geo } from '../types/geoTypes'

const geoUrl =
  'https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json'

function removeItemAll(arr: string[], value: string) {
  let i = 0
  while (i < arr.length) {
    if (arr[i] === value) {
      arr.splice(i, 1)
    } else {
      ++i
    }
  }
  return arr
}

const MapChart = () => {
  const [countryHover, setCountryHover] = useState('')
  const [countriesBeen, setCountriesBeen] = useState<string[]>([])

  const selectCountry = (c: string) => {
    if (!countriesBeen.includes(c)) {
      setCountriesBeen((prevState) => [...prevState, c].sort())
    } else {
      const index = countriesBeen.indexOf(c)
      if (index > -1) {
        setCountriesBeen((prevState) => removeItemAll(prevState, c))
      }
    }
  }
  return (
    <ComposableMap
      data-tip=""
      projection="geoEqualEarth"
      projectionConfig={{
        scale: 205,
        rotate: [-10, 0, 0],
      }}
      width={980}
      height={551}
      style={{
        width: '100%',
        height: 'auto',
      }}
    >
      <Sphere stroke="#DDD" id="sphere" fill="transparent" strokeWidth={0.5} />
      <Graticule stroke="#DDD" />
      <Geographies geography={geoUrl}>
        {({ geographies }) =>
          geographies.map((geo: Geo) => (
            <Geography
              key={geo.rsmKey}
              geography={geo}
              fill={
                countriesBeen.includes(geo.properties.NAME_LONG)
                  ? '#ff8552'
                  : '#297373'
              }
              onMouseEnter={() => setCountryHover(geo.properties.NAME_LONG)}
              onMouseLeave={() => setCountryHover('')}
              onMouseDown={() => selectCountry(geo.properties.NAME_LONG)}
              style={{
                default: {
                  outline: 0,
                },
                hover: {
                  fill: '#ffa078',
                  outline: 0,
                },
                pressed: {
                  fill: '#ff7033',
                  outline: 0,
                },
              }}
            />
          ))
        }
      </Geographies>
    </ComposableMap>
  )
}

export default MapChart
