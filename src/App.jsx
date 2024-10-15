import React from 'react';
import Die from './Die';
import { nanoid } from 'nanoid';
import Confetti from 'react-confetti';

export default function App() {
    const [dice, setDice] = React.useState(allNewDice());
    const [tenzies, setTenzies] = React.useState(false);

    function allNewDice() {
        const newDice = [];
        for (let i = 0; i < 10; i++) {
            newDice.push({
                value: Math.ceil(Math.random() * 6),
                isHeld: false,
                id: nanoid(),
            });
        }
        return newDice;
    }

    function rollDice() {
        if (tenzies) {
            setDice(allNewDice());
            setTenzies(false);
        } else {
            setDice((dice) =>
                dice.map((die) =>
                    !die.isHeld
                        ? { ...die, value: Math.ceil(Math.random() * 6) }
                        : die
                )
            );
        }
    }

    function holdDice(id) {
        setDice((dice) =>
            dice.map((die) =>
                die.id == id ? { ...die, isHeld: !die.isHeld } : die
            )
        );
    }

    const diceElements = dice.map((die) => (
        <Die
            key={die.id}
            id={die.id}
            value={die.value}
            isHeld={die.isHeld}
            hold={holdDice}
        />
    ));

    React.useEffect(() => {
        if (dice[0].isHeld === true) {
            let dieTargetValue = dice[0].value;
            for (let i = 1; i < dice.length; i++) {
                if (dice[i].isHeld !== true || dice[i].value !== dieTargetValue)
                    return;
            }
            setTenzies(true);
            console.log('You won!');
        }
    }, [dice]);

    return (
        <main>
            {tenzies && <Confetti />}
            <h1 className='title'>Tenzies</h1>
            <p className='instructions'>
                Roll until all dice are the same. Click each die to freeze it at
                its current value between rolls.
            </p>
            <div className='dice-container'>{diceElements}</div>
            <button className='roll-dice' onClick={rollDice}>
                {tenzies ? `New Game` : `Roll`}
            </button>
        </main>
    );
}
