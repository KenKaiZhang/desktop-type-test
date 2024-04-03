import { useState } from "react"
import themes from "../../resources/themes.json" 
import styles from "./Themes.module.scss"

const ThemeOption = ({name, color, primary, secondary, onClick}) => (
    <div className={styles.option} onClick={onClick}>
        <p style={{color: color}}>{name}</p>
        <div className={styles.primary} style={{background: primary}}/>
        <div className={styles.secondary} style={{background: secondary}}/>
        <div className={styles.backdrop} />
    </div>
)

const Themes = ({theme, setTheme}) => {
    const [open, setOpen] = useState(false)
    const { primary: color } = theme;
    return (
        <div className={styles.themepicker}>
            <div className={styles.option} onClick={() => setOpen(!open)}>
                <div className={styles.primary} />
                <div className={styles.secondary} />
                <div className={styles.backdrop} />
            </div>
            <div className={`${styles.options} ${open && styles.open}`}>
                {
                    Object.keys(themes).map((theme) => {
                        const { name, primary, secondary } = themes[theme];
                        return (
                            <div key={name}>
                                <ThemeOption name={name} color={color} primary={primary} secondary={secondary} onClick={() => setTheme(themes[theme])}/>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}   

export default Themes