import { Theme, createMuiTheme } from '@material-ui/core'
import { indigo, pink, red, lightBlue, common, blueGrey, blue } from '@material-ui/core/colors'

export const customTheme = createMuiTheme({
    typography: {
        // Use the system font instead of the default Roboto font.
        fontFamily: [
            'Tajawal',
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"'
        ].join(',')
    },
    palette: {
        primary: blue,
        secondary: pink,
        error: red,
        // Used by `getContrastText()` to maximize the contrast between the background and
        // the text.
        contrastThreshold: 3,
        // Used to shift a color's luminance by approximately
        // two indexes within its tonal palette.
        // E.g., shift from Red 500 to Red 300 or Red 700.
        tonalOffset: 0.2
    }
})
