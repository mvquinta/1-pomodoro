import React from 'react'
import { IoLogoGithub, IoLogoTwitter, IoLogoLinkedin} from 'react-icons/io'

export default function TitleBar() {
    
    return(
        <div className='top-div-info-bar'>
            <div className='info-name'>Miguel Quinta | mvqdev@gmail.com</div>
            <h1 className='h1-title'>1+Pomodoro</h1>
            <div className='social-media'>                
                <a href='https://pt.linkedin.com/in/miguel-vinga-da-quinta-73489620' target='_blank'><IoLogoLinkedin /></a>
                <a href='https://github.com/mvquinta' target='_blank'><IoLogoGithub /></a>
                <a href='https://twitter.com/mvqdev1' target='_blank'><IoLogoTwitter /></a>
            </div>
      </div>
    )
}