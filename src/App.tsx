import React from 'react'
import styled from 'styled-components'
import MapChart from './components/MapChart'

const MapContainer = styled.div`
  padding: 64px;
`

function App() {
  return (
    <div>
      <div>
        <MapContainer>
          <MapChart />
        </MapContainer>
      </div>
    </div>
  )
}

export default App
