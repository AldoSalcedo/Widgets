import React, { useState } from 'react'; //* UseState is a Hook that gives us acces to a state inside of a function component

const Accordion = ({ items }) => {
    const [activeIndex, setActiveIndex] = useState(null); //* this initialize a new piece of state, activeIndex is the piece of state we want to keep track of, referebnces a value that is going to change over time
    //* setActiveIndex is a function we call to update our piece of state, whenever we call useState it takes in one argument that si the default value for our piece of state just to initialize

    const onTitleClick = (index) => {
        setActiveIndex(index);
    };

    const renderedItems = items.map((item, index) => {
        const active = index === activeIndex ? 'active' : '';

        return (
            <React.Fragment key={item.title}>
                <div className={`title ${active}`} onClick={() => onTitleClick(index)}>
                    <i className="dropdown icon"></i>
                    {item.title}
                </div>
                <div className={`content ${active}`}>
                    <p>{item.content}</p>
                </div>
            </React.Fragment>
        )
    });
    return <div className="ui styled accordion">
        {renderedItems}
    </div>
};

export default Accordion;