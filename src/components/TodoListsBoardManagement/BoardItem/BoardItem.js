import { useState } from 'react';
import './BoardItem.scss';

function BoardItem({ name, id, index }) {
    const [showButton, setShowButton] = useState(false);

    return (
        <div className='d-flex flex-row justify-content-sb flex-fill align-items-center m-10'>
            <div onMouseEnter={() => setShowButton(true)} onMouseLeave={() => setShowButton(false)} className={showButton ? 'board__content__list__item d-flex flex-fill showButton' : 'board__content__list__item d-flex flex-fill'}>
                <div className='board__content__list__item__title'>
                    {name}
                </div>
                {showButton &&
                    <div className='board__content__list__item__button'>
                        <i className="fa-regular fa-pen-to-square"></i>
                        <i className="fa-solid fa-trash"></i>
                    </div>
                }
            </div>
            <div className='board__content__list__item__enter ml-15 h100 d-flex align-items-center'>
                Accéder
            </div>
        </div>
    )
}

export default BoardItem;