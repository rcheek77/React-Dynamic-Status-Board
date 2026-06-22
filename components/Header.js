import Logo from "../images/logo.jpg"

import React from "react"

export const Header = ()=> {
    return (
        <header>
            <img src={Logo} alt = 'Logo' style={{width: 200}}></img>
            <br></br>
        </header>
    )
}