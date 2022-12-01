import { useRecoilValue } from 'recoil';
import { todosState } from '../../recoil';
import './Header.scss';
import logo from '../../assets/pictures/logo-supakanban.svg';
import { Link, useLocation } from 'react-router-dom';

function Header() {
    const todos = useRecoilValue(todosState);
    let location = useLocation();
    return (
        <header className='header'>
            <div className='header__logo'>
                <img src={logo} alt="" />
            </div>
            <div className='header__kanbanList'>
                {todos && todos.map((element, index) =>
                    <Link key={index} to={`/${element.id}`} className={location.pathname === `/${element.id}` ? 'active' : ''}>{element.name}</Link>
                )}
            </div>
            <ul className='header__board'>
                <Link to="/board"><span>Gérer les tableaux</span><i className="fa-solid fa-gears"></i></Link>
            </ul>
        </header>
    )
}

export default Header;