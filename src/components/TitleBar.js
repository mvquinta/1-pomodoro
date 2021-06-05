import React from 'react'
import { IoLogoGithub, IoLogoTwitter, IoLogoLinkedin} from 'react-icons/io'
import { motion } from 'framer-motion'

const socialBtnVariants = {
    initial: {
        fontSize: '1.75rem',
    },
    hover: {
        fontSize: '1.9rem',
        originX: 0,
        color: 'rgb(64,64,64)'
    },
    tap: {
        scale: 0.9,
    }
}

export default function TitleBar() {
    
    return(
        <div className='top-div-info-bar'>
            <div className='info-name'>Miguel Quinta | mvqdev@gmail.com</div>
            <h1 className='h1-title'>1+Pomodoro</h1>
            <div className='social-media'>                
                <motion.a 
                href='https://pt.linkedin.com/in/miguel-vinga-da-quinta-73489620' 
                target='_blank'
                variants={socialBtnVariants}
                initial='initial'
                whileHover='hover'
                whileTap='tap'><IoLogoLinkedin /></motion.a>
                <motion.a 
                href='https://github.com/mvquinta' 
                target='_blank'                
                variants={socialBtnVariants}
                initial='initial'
                whileHover='hover'
                whileTap='tap'><IoLogoGithub /></motion.a>
                <motion.a 
                href='https://twitter.com/mvqdev1' 
                target='_blank'
                variants={socialBtnVariants}
                initial='initial'
                whileHover='hover'
                whileTap='tap'
                ><IoLogoTwitter /></motion.a>
            </div>
      </div>
    )
}