import Themes from "../Themes";
import styles from "./ConfigBar.module.scss"

const Timer = ({time, setTime, theme, setTheme}) => {

    const changeDuration = (duration, i) => {
        setTime(duration);
        const indicatorElement = document.querySelector(`.${styles.indicator}`);
        indicatorElement.style.transform = `translateX(${i * 50}px)`;
    }

    return (
        <div className={styles.timer}>
            <div className={styles.time}>
                {time}
            </div>
            <div className={styles.settings}>
                <Themes theme={theme} setTheme={setTheme}/>
                <div className={styles.duration}>
                    {
                        [15, 30, 60].map((duration, i) => (
                            <button key={duration} onClick={() => changeDuration(duration, i)} tabIndex={-1}>{duration}</button>
                        ))
                    }
                    <div className={styles.indicator} />
                    <div className={styles.backdrop} />
                </div>
            </div>
        </div>
    )

}

export default Timer;