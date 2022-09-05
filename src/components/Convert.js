import React, { useState, useEffect } from "react";
import axios from "axios";

const Convert = ({ language, text }) => {
    const [translated, setTranslated] = useState('');
    const [debouncedText, setDebouncedText] = useState(text);

    useEffect(() => {
        const timerId = setTimeout(() => {
            setDebouncedText(text);
        }, 500);

         // cleanup function cancels timer 
        return () => {
            clearTimeout(timerId); //! 3.- this clears the previous timeout if the user cahnges Term again to quickly and sets a new timer
        };
    }, [text]);

    useEffect(() => {
        const doTranslation = async () => {
            const { data } = await axios.post('https://translation.googleapis.com/language/translate/v2', {}, //this 2nd argument means you are sending information to the body so we leave it empty because we dont want to send anything
            {
                params: {
                    q: debouncedText,
                    target: language.value,
                    key: 'AIzaSyCHUCmpR7cT_yDFHC98CZJy2LTms-IwDlM'
                }
            })

            setTranslated(data.data.translations[0].translatedText);
        };

        doTranslation();
    }, [language, debouncedText]);

    return (
        <div>
            <h1 className="ui header">{translated}</h1>
        </div>
    );
};

export default Convert;