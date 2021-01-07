import React, { useState } from 'react'
import styled, { css } from 'styled-components'
import { colors } from '../utils/colors'
import { CogIcon } from '../assets/CogIcon'
import { Modal } from './Modal'
import { useSelector } from 'react-redux'
import { State } from '../store/reducer'
import { selectPrimary, selectSecondary } from '../store/selectors'
import { changePrimary, changeSecondary } from '../store/actions'
import ColorChooser from './ColorChooser'

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
const sharedButton = css`
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
const ClearButton = styled.button`
  ${sharedButton}
`
const HoverCountryText = styled.span`
  display: inline;
  font-weight: bold;
`
const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`
const SettingsButton = styled.button`
  ${sharedButton}
`

interface InfoBoxProps {
  countriesBeen: string[]
  countryHover: string
  setCountriesBeen: React.Dispatch<React.SetStateAction<string[]>>
}
const InfoBox: React.FC<InfoBoxProps> = ({ countriesBeen, countryHover, setCountriesBeen }) => {
  const [showModal, setShowModal] = useState(false)
  const primary = useSelector((state: State) => selectPrimary(state))
  const secondary = useSelector((state: State) => selectSecondary(state))

  const openModal = () => {
    setShowModal((prevState) => !prevState)
  }
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
      <ButtonContainer>
        <ClearButton onClick={clearCountries}>Clear Countries</ClearButton>
        <SettingsButton onClick={openModal}>
          <CogIcon />
        </SettingsButton>
      </ButtonContainer>
      <Modal showModal={showModal} setShowModal={setShowModal}>
        <ColorChooser action={changePrimary} description="Not selected countries" currentColor={primary} />
        <ColorChooser action={changeSecondary} description="Selected countries" currentColor={secondary} />
      </Modal>
    </>
  )
}
export default InfoBox
