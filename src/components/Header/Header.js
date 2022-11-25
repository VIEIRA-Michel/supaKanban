import { useState } from 'react';
import './Header.scss';
import logo from '../../assets/pictures/logo-supakanban.svg';
function Header() {

    const [isConnected, setIsConnected] = useState(false);
    const user = 'Michel';
    return (
        <header className='header'>
            <div className='header__logo'>
                <img src={logo} alt="" />
            </div>
            {isConnected ? <div className='header__details'>
                <div className='header__details__message'>
                    Salut, <span> {user} </span>!
                </div>
                <div className='header__details__button'>
                    <button onClick={() => setIsConnected(false)}>Deconnexion</button>
                </div>
            </div> :
                <form action="" className='header__auth'>
                    <div className='header__auth__user'>
                        <label htmlFor="user">Nom d'utilisateur</label>
                        <input type="text" name="user" id="user" />
                    </div>
                    <div className='header__auth__password'>
                        <label htmlFor="password">Mot de passe</label>
                        <input type="password" name="password" id="password" />
                    </div>
                    <div className='header__auth__button'>
                        <input onClick={() => setIsConnected(true)} type="submit" />
                    </div>
                </form>}
        </header>
    )
}

export default Header;