import { useRecoilValue } from 'recoil';
import { todosState } from '../../recoil';
import logo from '../../assets/pictures/logo-supakanban.svg';
import { Link, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context';

function Header() {
    const todos = useRecoilValue(todosState);
    let location = useLocation();
    const { user, logout } = useContext(AuthContext);
    return (
        <header className='h-[50px] bg-white flex flex-row justify-between items-center'>
            <div className='w-[50px] pt-[5px]'>
                <img src={logo} alt="" />
            </div>
            {user ? (
                <ul className='flex flex-row'>
                    <div className='flex justify-between'>
                        {todos && todos.map((element, index) =>
                            <Link key={index} to={`/${element.id}`} className={location.pathname === `/${element.id}` ? 'text-secondary no-underline mr-[10px] py-[5px] px-[10px] rounded-[5px] font-bold hover:bg-[#dbdbdb] hover:transition-all' : 'text-secondary no-underline mr-[10px] py-[5px] px-[10px] rounded-[5px] font-medium hover:bg-[#dbdbdb] hover:transition-all'}>{element.name}</Link>
                        )}
                    </div>
                    <div className='flex flex-row justify-evenly'>
                        <Link to="/board" className='mr-[10px] no-underline'><i className="fa-duotone fa-list-check text-secondary border border-[#272350] bg-white p-[10px] rounded-[10px] cursor-pointer hover:bg-secondary hover:text-white hover:transition-all"></i></Link>
                        <li onClick={() => logout()} className='mr-[10px] no-underline'><i className="fa-duotone fa-right-from-bracket text-white bg-secondary rounded-[10px] p-[10px] cursor-pointer border border-[#272350] opacity-80 hover:opacity-100 hover:text-white hover:transition-all"></i></li>
                    </div>
                </ul>
            ) : (
                <div className='flex flex-row'>
                    <Link to="/signin" className='text-secondary bg-white border border-[#272350] font-[Dosis] py-[5px] px-2.5 rounded-[15px] cursor-pointer mr-[10px] no-underline text-sm flex justify-between items-center hover:bg-secondary hover:text-white hover:transition-all'><span>S'identifier</span></Link>
                </div>
            )}
        </header>
    )
}

export default Header;