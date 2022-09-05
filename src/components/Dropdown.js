import React, { useState, useEffect, useRef } from "react";

const Dropdown = ({ label, options, selected, onSelectedChange }) => { //*the dropdown component then return our newly selected option inside our div = <div className="text">{selected.label}</div>
    const [open, setOpen] = useState(false);
    const ref = useRef();

    useEffect(() => {
        const onBodyClick = (event) => {
            if (ref.current.contains(event.target)) {
              return;
            }
            setOpen(false);
          };

          document.body.addEventListener('click', onBodyClick, { capture: true });
       
          //*Clean up Function
          return () => {
            document.body.removeEventListener('click', onBodyClick, {
              capture: true,
            });
          };
        }, []);

    const renderedOptions = options.map((option) => {
        if (option.value === selected.value) {
            return null;
        }


        return ( //whenever we click in any items of the list, we call onSelectedChange who is the onSelected function whos gonna update our piece of state and gonna cause our component to rerender and pass down our newly selected option
            <div
            key={option.value} 
            className="item" 
            onClick={() => onSelectedChange(option)}>
                {option.label}
            </div>
        )
    });

    return (
        <div ref={ref} className="ui form">
            <div className="field">
                <label className="label">{label}</label>
                <div onClick={() => setOpen(!open)} className={`ui selection dropdown ${open ? 'visible active' : ''}`}>
                    <i className="dropdown icon"></i>
                    <div className="text">{selected.label}</div>
                    <div className={`menu ${open ? 'visible transition' : ''}`}>
                        {renderedOptions}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dropdown;