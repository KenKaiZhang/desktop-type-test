import { useEffect, useMemo, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faRedo } from "@fortawesome/free-solid-svg-icons"
import { calculateStats } from "../../util/calculateStats"
import ConfigBar from "../ConfigBar"
import Results from "../Results"
import wordsList from "../../resources/wordslist.json"
import themes from "../../resources/themes.json"
import styles from "./TypeTest.module.scss"

const TypeTest = () => {
    const [typed, setTyped] = useState([]);
    const [theme, setTheme] = useState(themes.default)
    const [duration, setDuration] = useState(15);
    const [time, setTime] = useState(15);
    const [stats, setStats] = useState(null);
    const [start, setStart] = useState(false);
    const [reset, setReset] = useState(false);
    const [mounted, setMounted] = useState(false)

    // Words for the type test
    const test = useMemo(() => (
        !reset ? 
        Array.from({ length: 100}, () => (
            Math.floor(Math.random() * (wordsList.length))
        )).map(i => wordsList[i])
        : []
    ), [reset])

    // Flattens the test
    const flattenTest = useMemo(() => (
        test.join("").split("")
    ), [test])

    // Matrix of index that match character in test -> flattenTest
    const testToFlattenIndex = useMemo(() => {
        let index = 0
        return test.reduce((acc, word) => {
            const wordIndicies = Array.from({ length: word.length}, (_, j) => index + j)
            index += word.length
            acc.push(wordIndicies)
            return acc
        }, [])
    }, [test])

    // Indicates the indexes that will cause a scroll
    const breakpointIndexes = useMemo(() => {
        if (!mounted) return []
        const chars = document.querySelectorAll(`.${styles.test} p`);
        return Array.from(chars).reduce((acc, char, index) => {
            const { top } = char.getBoundingClientRect();
            if (index > 0) {
                const { top: prevTop } = chars[index - 1].getBoundingClientRect()
                if (prevTop < top) {
                    acc.push(index - 1);
                }
            }
            return acc;
        }, []).slice(1)
    }, [mounted])

    // Indicate component is mounted
    useEffect(() => {
        setMounted(true)
    }, [])

    useEffect(() => {
        document.querySelector("html").style.setProperty("--primary-color", theme.primary)
        document.querySelector("html").style.setProperty("--secondary-color", theme.secondary)
    }, [theme])

    // Set the timer to when the desired duration is changed
    useEffect(() => {
        setTime(duration)
    }, [duration])

    // Timer that counts down from time -> 0
    useEffect(() => {
        const timer = setInterval(() => {
            if (start && time > 0) {
                setTime(prevTime => prevTime - 1);
            } else if (start && time <= 1 ) {
                clearInterval(timer)
                setStart(false)
                setTime(duration)
                setStats(calculateStats(flattenTest, typed, duration))
            }
        }, 1000)
        return () => clearInterval(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [time, start])
    
    // Scroll text upwards when middle line is fully typed
    useEffect(() => {
        const breakNumber = breakpointIndexes.indexOf(typed.length - 1);
        if (breakNumber === -1) return
        const words = document.querySelector(`.${styles.words}`);
        words.style.transform = `translateY(-${(breakNumber + 1) * 35}px)`
    }, [breakpointIndexes, typed])
    
    // All keyboard inputs and their triggers
    useEffect(() => {
        const handleKeyDown = (event) => {
            const keyPressed = event.key;

            if (keyPressed === "Tab") {
                setReset(true)
            } else {
                if (/^[a-zA-Z ]$/.test(keyPressed)) {
                    if (!start) setStart(true)
                    setTyped(prevTyped => [...prevTyped, keyPressed])
                } else if (typed.length && keyPressed === "Backspace") {
                    setTyped(prevTyped => prevTyped.slice(0, -1))
                } else if (reset && keyPressed === "Enter") {
                    setTyped([])
                    setStart(false)
                    setStats(null)
                    setTime(duration)
                }
                setReset(false)
            }
        }
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown)
    }, [typed, reset, setReset, start, duration])

    return (
        <div className={styles.typetest}>
            {stats && <Results stats={stats} />}
            <ConfigBar time={time} setTime={setDuration} theme={theme} setTheme={setTheme}/>
            <div className={styles.test}>
                <div className={styles.words}>
                    {   
                        test.map((word, i) => (
                            <div key={i} className={styles.word}>
                                {
                                    word.split("").map((char, j) => {
                                        const index = testToFlattenIndex[i][j];
                                        const isCorrect = flattenTest[index] === typed[index]
                                        const beSpace = flattenTest[index] === " " && !isCorrect
                                        const styling = {
                                            caret: index === typed.length ? styles.caret : "",
                                            status: index >= typed.length ? "" : isCorrect ? styles.right : styles.wrong
                                        }

                                        return (
                                            <p key={index} id={index} className={`${styling.caret} ${styling.status}`}>
                                                {beSpace ? typed[index] : char}
                                            </p>
                                        )
                                    })
                                }
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className={`${styles.reset} ${reset && styles.resethover}`} onClick={() => setTyped([])}>
                <FontAwesomeIcon icon={faRedo} />
                <div className={styles.backdrop} />
            </div>
        </div>
    )
}

export default TypeTest
