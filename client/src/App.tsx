import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import MapChart from './components/MapChart'
import { getIpCountry } from './utils/http'
import InfoBox from './components/InfoBox'
import { colors } from './utils/colors'

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 1%;
`
const InfoContainer = styled.div`
  flex: 1 1 300px;
  padding: 24px;
  margin: 3%;
  border-radius: 50px;
  background: ${colors.white};
  box-shadow: 20px 20px 60px #c4c4c4, -20px -20px 60px #ffffff;
  text-align: center;
  @media (max-width: 1360px) {
    min-height: 630px;
  }
`
const MapContainer = styled.div`
  margin: 3%;
  flex: 2 1 800px;
  padding: 12px;
  border-radius: 50px;
  background: ${colors.white};
  box-shadow: 20px 20px 60px #c4c4c4, -20px -20px 60px #ffffff;
`

function App() {
  const [countryHover, setCountryHover] = useState('No country')
  const [countriesBeen, setCountriesBeen] = useState<string[]>([])
  const [currentCountry, setCurrentCountry] = useState('')

  useEffect(() => {
    if (!countriesBeen.length) {
      const localList = localStorage.getItem('listOfCountries')
      if (localList) {
        setCountriesBeen(localList.split(','))
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!currentCountry) {
      getIpCountry().then((ipCountry) => {
        if (ipCountry) {
          setCurrentCountry(ipCountry)
        }
      })
    }
  }, [currentCountry])

  useEffect(() => {
    if (currentCountry && !countriesBeen.includes(currentCountry)) {
      setCountriesBeen((prevState) => [...prevState, currentCountry].sort())
    }
  }, [countriesBeen, currentCountry])

  return (
    <Container>
      <InfoContainer>
        <InfoBox countriesBeen={countriesBeen} countryHover={countryHover} setCountriesBeen={setCountriesBeen} />
      </InfoContainer>
      <MapContainer>
        <MapChart countriesBeen={countriesBeen} setCountriesBeen={setCountriesBeen} setCountryHover={setCountryHover} />
      </MapContainer>
    </Container>
  )
}

export default App
