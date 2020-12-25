import React from 'react'
import styled from 'styled-components'
import { colors } from '../utils/colors'

const UnorderedList = styled.ul`
  max-height: 300px;
  list-style-type: none;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  overflow: scroll;
  background: ${colors.white};
  border-top: 1px solid #c4c4c4;
  padding: 16px;
`
const ListedItems = styled.li`
  padding: 5px 5px;
  overflow: hidden;
`
const ClearButton = styled.button`
  font-family: 'Poppins', sans-serif;
  padding: 24px;
  font-size: 20px;
  border: none;
  border-radius: 24px;
  background: ${colors.white};
  box-shadow: 6px 6px 21px #c4c4c4, -6px -6px 21px #ffffff;
  cursor: pointer;
  margin: 12px;
  &:hover {
    box-shadow: inset 6px 6px 21px #c4c4c4, inset -6px -6px 21px #ffffff;
  }
`
const HoverCountryText = styled.span`
  display: inline;
  font-weight: bold;
`

interface InfoBoxProps {
  countriesBeen: string[]
  countryHover: string
  setCountriesBeen: React.Dispatch<React.SetStateAction<string[]>>
}
const InfoBox: React.FC<InfoBoxProps> = ({
  countriesBeen,
  countryHover,
  setCountriesBeen,
}) => {
  const clearCountries = () => {
    setCountriesBeen([])
    localStorage.removeItem('listOfCountries')
  }
  return (
    <>
      <h1>Where have I been?</h1>
      <div>
        Hovering: <HoverCountryText>{countryHover}</HoverCountryText>
      </div>
      {!!countriesBeen.length && (
        <UnorderedList>
          {countriesBeen.map((c) => (
            <ListedItems key={c}>{c}</ListedItems>
          ))}
        </UnorderedList>
      )}
      <ClearButton onClick={clearCountries}>Clear Countries</ClearButton>
    </>
  )
}
export default InfoBox
