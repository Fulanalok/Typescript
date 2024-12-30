import { Card } from '../../components/Card';
import { Board } from '../../components/Board';
import { cards } from '../../data/cards';
import './styles.css'

const handleClick = (id: string) => {
    console.log(id);
};

export function App() {
    return (
        <div className='app'>
            <Board   cards={cards} />
        </div>
    );
}