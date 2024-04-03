export const calculateStats = (expected, typed, time) => {

    // Calculates the accuracy
    let corrects = 0
    typed.forEach((char, i) => {
        if (char === expected[i]) {
            corrects += 1
        }
    });
    const accuracy = corrects / typed.length;

    // Calculates the words per minute
    expected = expected.join("").split(" ")
    typed = typed.join("").split(" ")
    corrects = 0
    typed.forEach((word, i) => {
        if (word === expected[i]) {
            corrects += word.length + 1
        }
    })
    const wpm = (corrects / 5 ) * (60 / time)
    
    return { accuracy, wpm }
}