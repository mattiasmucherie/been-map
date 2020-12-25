export const getIpCountry = async () => {
  try {
    const ipJSON = await fetch(
      'https://cors-anywhere.herokuapp.com/https://api.ipify.org?format=json',
    )
    const ip = await ipJSON.json()
    const countryIPJSON = await fetch(
      `https://cors-anywhere.herokuapp.com/http://api.ipstack.com/${ip.ip}?access_key=${process.env.REACT_APP_IPSTACK_API_KEY}`,
    )
    const countryIp: { country_name: string } = await countryIPJSON.json()
    if (countryIp.country_name) {
      return countryIp.country_name
    }
  } catch (err) {
    console.error('Problem fetching my IP', err)
    return null
  }
}
