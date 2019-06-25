import React, { useState, useEffect } from 'react';
import MATRIX_FRAMES from './data/matrix';

const minDelay = 500;
const minIncrement = 1;

function Matrix(){
    const [index, setIndex] = useState(0);
    const [delay, setDelay] = useState(500);
    const [increment, setIncrement] = useState(5);
    console.log('delay', delay, 'increment', increment);
    useEffect(()=>{
        const interval = setInterval(()=>{
            setIndex(storedIndex=>{
                    return (storedIndex+increment)%MATRIX_FRAMES.length;
                });
        }, delay);

        return ()=>{
            clearInterval(interval);
        }
    },[delay, increment]);

    const updateDelay= event=>{
        const delay = Number(event.target.value);
        setDelay(delay < minDelay ? minDelay :delay);
    }

    const updateIncrement= event=>{
        const increment = Number(event.target.value);
        setIncrement(increment < minIncrement ? minIncrement :increment);
    }
    return(
        <div className="Matrix">
            <img src={MATRIX_FRAMES[index]} 
            alt="matrix"
            />
            <div className="multiform">
            <div>
                Matrix Transition Delay (seconds)
                <input type="number" onChange={updateDelay} />
            </div>
            <div>
                Matrix Increment
                <input type="number" onChange={updateIncrement} />
            </div>
        </div>
        </div>
    )
}

export default Matrix;