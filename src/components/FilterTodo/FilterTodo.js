import { useRecoilState } from "recoil";
import { filterState } from '../../recoil';
function FilterTodo() {

    const [filter, setFilter] = useRecoilState(filterState);
    return <select onChange={(e) => { setFilter(e.target.value) }} value={filter}>
        <option value="all">Tous</option>
        <option value="done">Terminé</option>
        <option value="ongoing">En cours</option>
    </select>
}

export default FilterTodo;