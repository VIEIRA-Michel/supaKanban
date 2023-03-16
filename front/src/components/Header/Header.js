import logo from '../../assets/pictures/logo-supakanban.svg';
import { Link, useLocation } from 'react-router-dom';
import { userState } from '../../recoil';
import { useRecoilValue } from 'recoil';
import { useUserActions } from '../../actions';
function Header() {
    const useUser = useUserActions();
    const userData = useRecoilValue(userState);
    const { pathname } = useLocation();
    return (
        <header className={`h-[50px] bg-white flex flex-row justify-between items-center fixed top-0 left-0 right-0 ${pathname === "/" && !userData ? 'w-[80%] m-auto my-4' : ' shadow-[0_2px_18px_0_rgba(0,0,0,0.3)]'}  z-10`}>
            <div className={`w-[50%]`}>
                <div className='w-[50px] h-[50px]'>
                    <Link to="/">
                        <img className={`w-[50px] h-[50px]`} src={logo} alt="" />
                    </Link>
                </div>
            </div>
            {userData ? (
                <>
                    <ul className='flex flex-row'>
                        <div className='flex flex-row justify-evenly items-center'>
                            {/* <Link to="/" className='mr-[10px] flex justify-center items-center no-underline'><i className="flex justify-center items-center w-[38px] h-[38px] fa-duotone fa-home text-secondary border border-[#777591] text-white bg-tertiary rounded-[10px] cursor-pointer opacity-80 hover:opacity-100 hover:text-white hover:transition-all"></i></Link> */}
                            <p className='mr-5 text-quaternary'>Hello, <span className='text-quinary font-bold'>{userData.username}</span> !</p>
                            <li onClick={() => useUser.logout()} className='mr-[10px] no-underline flex justify-center items-center'><i className="flex justify-center items-center w-[38px] h-[38px] fa-duotone fa-right-from-bracket text-white bg-secondary rounded-[10px] cursor-pointer border border-[#272350] opacity-80 hover:opacity-100 hover:text-white hover:transition-all"></i></li>
                        </div>
                    </ul>

                </>
            ) : (
                <div className={`w-[50%] flex flex-row justify-end`}>
                    <Link to="/signin" className='px-2 h-[38px] text-white bg-primary font-[Dosis] rounded-[10px] cursor-pointer mr-[10px] no-underline flex justify-between items-center opacity-80 hover:opacity-100 hover:transition-all'><span className='mr-2'>S'identifier</span><i className="fa-duotone fa-unlock"></i></Link>
                </div>
            )}
        </header>
    )
}

export default Header;