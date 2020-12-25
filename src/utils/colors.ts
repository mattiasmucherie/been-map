export const shadeColor = (color: string, percent: number) => {
  let R = parseInt(color.substring(1, 3), 16)
  let G = parseInt(color.substring(3, 5), 16)
  let B = parseInt(color.substring(5, 7), 16)

  R = (R * (100 + percent)) / 100
  G = (G * (100 + percent)) / 100
  B = (B * (100 + percent)) / 100
  R = Math.floor(R < 255 ? R : 255)
  G = Math.floor(G < 255 ? G : 255)
  B = Math.floor(B < 255 ? B : 255)

  const RR = R.toString(16).length === 1 ? '0' + R.toString(16) : R.toString(16)
  const GG = G.toString(16).length === 1 ? '0' + G.toString(16) : G.toString(16)
  const BB = B.toString(16).length === 1 ? '0' + B.toString(16) : B.toString(16)

  return '#' + RR + GG + BB
}

const green = '#297373'
const orange = '#ff8552'
const white = '#E6E6E6'
const black = '#39393A'

export const colors = {
  primaryDark: green,
  secondary: orange,
  white: white,
  black: black,
}
