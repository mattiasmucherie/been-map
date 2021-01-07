import React, { useCallback, useEffect, useRef } from 'react'
import { animated, useSpring } from 'react-spring'
import styled from 'styled-components'
import { colors } from '../utils/colors'

const Background = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  right: 0;
`

const ModalWrapper = styled.div`
  margin: 8px;
  max-width: 800px;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  background: ${colors.white};
  color: #000;
  position: relative;
  z-index: 10;
  border-radius: 10px;
  padding: 24px;
  text-align: left;
`

interface ModalProps {
  showModal: boolean
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
}
export const Modal: React.FC<ModalProps> = ({ showModal, setShowModal, children }) => {
  const modalRef = useRef(null)
  const props = useSpring({
    config: {
      duration: 150,
    },
    opacity: showModal ? 1 : 0,
  })

  const closeModal = (e: any) => {
    if (modalRef.current === e.target) {
      setShowModal(false)
    }
  }
  const keyPress = useCallback(
    (e: any) => {
      if (e.key === `Escape` && showModal) {
        setShowModal(false)
      }
    },
    [setShowModal, showModal],
  )

  useEffect(() => {
    document.addEventListener('keydown', keyPress)
    return () => document.removeEventListener('keydown', keyPress)
  }, [keyPress])

  return (
    <>
      <animated.div style={props}>
        {showModal ? (
          <Background ref={modalRef} onClick={closeModal}>
            <ModalWrapper>{children}</ModalWrapper>
          </Background>
        ) : null}
      </animated.div>
    </>
  )
}
