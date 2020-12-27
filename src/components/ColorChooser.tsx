import React from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'

const Container = styled.div`
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const DescriptionText = styled.span`
  padding-right: 12px;
  user-select: none;
`
const Input = styled.input`
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
  background: #e6e6e6;
  box-shadow: inset 5px 5px 10px #c4c4c4, inset -5px -5px 10px #ffffff;
  border: none;
  padding: 16px;
  font-size: 16px;
  max-width: 64px;
  &:focus{
    outline: none;
  }
`
interface ColorPreviewProps {
  currentColor: string
}
const ColorPreview = styled.span<ColorPreviewProps>`
  background: ${(props) => props.currentColor};
  width: 24px;
  height: 24px;
  border-radius: 8px;
  margin-left: 8px;
`
const ColorContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  //cursor: pointer;
`
const HashText = styled.span`
  padding: 13px;
  box-shadow:  5px 5px 10px #c4c4c4,  -5px -5px 10px #ffffff;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
  user-select: none;
`

interface ColorChooserProps {
  description: string
  action: (newColor: string) => { payload: string; type: string }
  currentColor: string
}
const ColorChooser: React.FC<ColorChooserProps> = ({ description, action, currentColor }) => {
  const dispatch = useDispatch()

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (/^([0-9A-F]{6})$/i.test(event.target.value)) {
      dispatch(action(`#${event.target.value}`))
    }
  }
  return (
    <>
      <Container>
        <DescriptionText>{description}</DescriptionText>
        <ColorContainer>
          <HashText>#</HashText>
          <Input placeholder={currentColor.substring(1)} onChange={onChange} />
          <ColorPreview currentColor={currentColor} />
        </ColorContainer>
      </Container>
    </>
  )
}
export default ColorChooser
