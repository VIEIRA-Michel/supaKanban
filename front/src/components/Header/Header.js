import { useRecoilValue } from 'recoil';
import { todosState } from '../../recoil';
import logo from '../../assets/pictures/logo-supakanban.svg';
import { Link, useLocation } from 'react-router-dom';

function Header() {
    const todos = useRecoilValue(todosState);
    let location = useLocation();
    return (
        <header className='h-[50px] bg-white flex flex-row justify-between items-center'>
            <div className='w-[50px] pt-[5px]'>
                <img src={logo} alt="" />
            </div>
            <div className='flex justify-between'>
                {todos && todos.map((element, index) =>
                    <Link key={index} to={`/${element.id}`} className={location.pathname === `/${element.id}` ? 'text-secondary no-underline mr-[10px] py-[5px] px-[10px] rounded-[5px] font-bold hover:bg-[#dbdbdb] hover:transition-all' : 'text-secondary no-underline mr-[10px] py-[5px] px-[10px] rounded-[5px] font-medium hover:bg-[#dbdbdb] hover:transition-all'}>{element.name}</Link>
                )}
            </div>
            {/* <div className='header__board'>
                <Link to="/board"><span>Gérer les tableaux</span><i className="fa-solid fa-gears"></i></Link>
            </div> */}
            <div className='header__board flex flex-row'>
                <Link to="/auth" className='text-secondary bg-white border border-[#272350] font-[Dosis] py-[5px] px-2.5 rounded-[15px] cursor-pointer mr-[10px] no-underline text-sm flex justify-between items-center hover:bg-secondary hover:text-white hover:transition-all'><span>S'identifier</span></Link>
            </div>
        </header>
    )
}

export default Header;