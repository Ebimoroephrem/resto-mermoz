
import './AppDowload.css'
import { assets } from '../../assets/assets'

const AppDowload = () => {
  return (
    <div className='app-dow' id='app-dow' >
        <p> Téléchargez notre application <br />Rest'O Mermoz </p>
        <div className="app-platforms">
            <img src={assets.play_store} alt="" />
            <img src={assets.app_store} alt="" />
        </div>
      
    </div>
  )
}

export default AppDowload
