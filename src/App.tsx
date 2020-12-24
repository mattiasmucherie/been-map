import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import MapChart from './components/MapChart'

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 64px;
  justify-content: center;
`
const SelectContainer = styled.div`
  flex: 1 1 400px;
  padding: 24px;
  margin: 48px;
  border-radius: 50px;
  background: #e6e6e6;
  box-shadow: 41px 41px 0 #656565, -41px -41px 0px #ffffff;
  max-height: 600px;
  overflow: scroll;
`
const MapContainer = styled.div`
  margin: 48px;
  flex: 2 1 800px;
  padding: 12px;
  border-radius: 50px;
  background: #e6e6e6;
  box-shadow: 41px 41px 0 #656565, -41px -41px 0px #ffffff;
`

function App() {
  const [countryHover, setCountryHover] = useState('no country')
  const [countriesBeen, setCountriesBeen] = useState<string[]>([])
  const onSaveList = () => {
    localStorage.setItem('listOfCountries', countriesBeen.toLocaleString())
  }

  useEffect(() => {
    if (!countriesBeen.length) {
      const localList = localStorage.getItem('listOfCountries')
      if (localList) {
        setCountriesBeen(localList.split(','))
      }
    }
    fetch(
      'https://cors-anywhere.herokuapp.com/https://api.ipify.org?format=json',
    )
      .then((response) => {
        return response.json()
      })
      .then((res: any) => {
        if (res.ip) {
          fetch(
            `https://cors-anywhere.herokuapp.com/http://api.ipstack.com/${res.ip}?access_key=${process.env.REACT_APP_IPSTACK_API_KEY}`,
          )
            .then((response) => {
              return response.json()
            })
            .then((res: any) => {
              if (
                res.country_name &&
                !countriesBeen.includes(res.country_name)
              ) {
                console.warn(
                  countriesBeen,
                  res.country_name,
                  countriesBeen.includes(res.country_name),
                )
                setCountriesBeen((prevState) =>
                  [...prevState, res.country_name].sort(),
                )
              }
            })
            .catch((err: any) => console.error('Problem fetching my IP', err))
        }
      })
      .catch((err: any) => console.error('Problem fetching my IP', err))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div>
      <div>
        <Container>
          <SelectContainer>
            <h1>Where have I been?</h1>
            <p> You are currently hovering over: {countryHover}</p>
            <ul>
              {countriesBeen.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
            <button onClick={onSaveList}>Save List</button>
          </SelectContainer>
          <MapContainer>
            <MapChart
              countriesBeen={countriesBeen}
              setCountriesBeen={setCountriesBeen}
              setCountryHover={setCountryHover}
            />
          </MapContainer>
        </Container>
      </div>
    </div>
  )
}

export default App
