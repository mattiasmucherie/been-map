import React from 'react'
import {
  ComposableMap,
  Geographies,
  Geography,
  Graticule,
  Sphere,
  ZoomableGroup,
} from 'react-simple-maps'
import { Geo } from '../types/geoTypes'
import { colors, shadeColor } from '../utils/colors'
import { removeItemAll } from '../utils/countries'

const geoUrl =
  'https://raw.githubusercontent.com/mattiasmucherie/been-map/master/src/assets/world-110m.json'

interface MapChartProps {
  countriesBeen: string[]
  setCountriesBeen: React.Dispatch<React.SetStateAction<string[]>>
  setCountryHover: React.Dispatch<React.SetStateAction<string>>
}

const MapChart: React.FC<MapChartProps> = ({
  countriesBeen,
  setCountriesBeen,
  setCountryHover,
}) => {
  const selectCountry = (c: string) => {
    if (!countriesBeen.includes(c)) {
      setCountriesBeen((prevState) => {
        const sortedNewList = [...prevState, c].sort()
        localStorage.setItem('listOfCountries', sortedNewList.toLocaleString())
        return sortedNewList
      })
    } else {
      const index = countriesBeen.indexOf(c)
      if (index > -1) {
        setCountriesBeen((prevState) => {
          const cleanedList = removeItemAll(prevState, c)
          localStorage.setItem('listOfCountries', cleanedList.toLocaleString())
          return cleanedList
        })
      }
    }
  }
  return (
    <ComposableMap
      data-tip="test"
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
      <ZoomableGroup zoom={1}>
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
                fill={
                  countriesBeen.includes(geo.properties.NAME_LONG)
                    ? colors.secondary
                    : colors.primaryDark
                }
                onMouseEnter={() => setCountryHover(geo.properties.NAME_LONG)}
                onMouseLeave={() => setCountryHover('no country')}
                onClick={() => selectCountry(geo.properties.NAME_LONG)}
                style={{
                  default: {
                    outline: 0,
                  },
                  hover: {
                    fill: shadeColor(colors.secondary, 15),
                    outline: 0,
                  },
                  pressed: {
                    fill: colors.secondary,
                    outline: 0,
                  },
                }}
              />
            ))
          }
        </Geographies>
      </ZoomableGroup>
    </ComposableMap>
  )
}

export default MapChart
