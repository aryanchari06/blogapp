import React from 'react'
import LogoImg from '../../src/assets/logo.png'

function Logo({width = "100px"}) {
  return (
    <div><img src={LogoImg} alt="Logo.png" width={width} /></div>
  )
}

export default Logo