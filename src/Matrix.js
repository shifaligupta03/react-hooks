import React, { useState } from 'react';
import MATRIX_FRAMES from './data/matrix';
import { useDynamicTransition } from './hooks';

const minDelay = 500;
const minIncrement = 1;

function Matrix(){
    
    const [delay, setDelay] = useState(500);
    const [increment, setIncrement] = useState(5);
    const index = useDynamicTransition({delay, increment, length:MATRIX_FRAMES.length});
    // console.log('delay', delay, 'increment', increment, 'index', index);
    // console.log({delay, increment, index});
    
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