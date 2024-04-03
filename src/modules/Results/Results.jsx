import styles from "./Results.module.scss"

const Results = ({stats}) => {

    const { accuracy, wpm } = stats

    return (
        <div className={styles.results}>
            <div className={styles.wpm}>
                <p>WORDS PER MINUTE</p>
                <h1>{Math.round(wpm)}</h1>
            </div>
            <div className={styles.accuracy}>
                <p>ACCURACY</p>
                <h1>{`${Math.round(accuracy* 100)}%`}</h1>
            </div>
        </div>
    )
}

export default Results;