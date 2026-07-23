import React from 'react' 
import './AppDownload.css' 
import { assets } from '../../assets/frontend_assets/assets'

const AppDownload = () => {
  return (
    <div className='download-information-content' id='mobile-app'>
        <h2>For Better Experience Download <br /><span>Tomato App</span></h2> 
        <div className="download-links">
            <img src={assets.play_store} alt="Google play" />
            <img src={assets.app_store} alt="App store"/>
        </div>
    </div>
  )
}

export default AppDownload