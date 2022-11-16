import { selectTodosData } from '../../recoil';
import { useRecoilValue } from 'recoil';

function TodoData() {
    const data = useRecoilValue(selectTodosData);
    return (<div className="card p-20">
        <ul>
            <li>Nombre de todos : {data.total}</li>
            <li>Nombre de todos terminées : {data.totalDone} </li>
            <li>Nombre de todos en cours : {data.totalOngoing} </li>
            <li>Pourcentage de todos terminées : {data.totalDonePourcentage} % </li>
        </ul>
    </div>)
}

export default TodoData;