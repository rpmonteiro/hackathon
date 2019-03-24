import React, { Component } from 'react'
import SearchIcon from '@material-ui/icons/Search'
import MailIcon from '@material-ui/icons/Mail'
import NotificationsIcon from '@material-ui/icons/Notifications'
import DSGPicker from './screens/dsg-picker'
import ReviewProposal from './screens/review-proposal'
import { fade } from '@material-ui/core/styles/colorManipulator'

import './app.scss'
import {
    withStyles,
    Theme,
    StepButton,
    Step,
    Typography,
    Button,
    Stepper,
    Toolbar,
    AppBar,
    createStyles,
    InputBase,
    IconButton,
    Badge,
    MuiThemeProvider
} from '@material-ui/core'
import { customTheme } from './custom-theme'

const steps = ['Configure the portflio', 'Review proposal', 'Send proposal']

const styles = (theme: Theme) =>
    createStyles({
        title: {
            fontFamily: 'Philosopher'
        },
        layout: {
            width: 'auto',
            marginLeft: theme.spacing.unit * 3,
            marginRight: theme.spacing.unit * 3,
            [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
                width: 1100,
                marginLeft: 'auto',
                marginRight: 'auto'
            }
        },
        search: {
            position: 'relative',
            borderRadius: theme.shape.borderRadius,
            backgroundColor: fade(theme.palette.common.white, 0.15),
            '&:hover': {
                backgroundColor: fade(theme.palette.common.white, 0.25)
            },
            marginRight: theme.spacing.unit * 2,
            marginLeft: 0,
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                marginLeft: theme.spacing.unit * 3,
                width: 'auto'
            }
        },
        searchIcon: {
            width: theme.spacing.unit * 9,
            height: '100%',
            position: 'absolute',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        },
        stepperContainer: {
            background: 'white',
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0
        },
        goRight: {
            marginTop: -140,
            textAlign: 'right'
        },
        root: {
            width: '90%'
        },
        extraContainer: {
            display: 'flex',
            marginLeft: 'auto',
            alignItems: 'center'
        },
        button: {
            marginRight: theme.spacing.unit
        },
        completed: {
            display: 'inline-block'
        },
        inputRoot: {
            color: 'inherit',
            width: '100%'
        },
        inputInput: {
            paddingTop: 14,
            paddingRight: theme.spacing.unit,
            paddingBottom: theme.spacing.unit,
            paddingLeft: theme.spacing.unit * 10,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('md')]: {
                width: 200
            }
        },
        instructions: {
            marginTop: theme.spacing.unit,
            marginBottom: theme.spacing.unit
        }
    })

interface State {
    activeStep: number
    completed: {
        [key: number]: boolean
    }
}

class App extends Component<{}, State> {
    state = {
        activeStep: 0,
        completed: {}
    }

    handleNext = () => {
        this.setState({
            activeStep: this.state.activeStep + 1
        })
    }

    render() {
        // @ts-ignore
        const { classes } = this.props
        const { activeStep } = this.state
        return (
            <MuiThemeProvider theme={customTheme}>
                <div className={classes.layout}>
                    <div>
                        <AppBar position="static">
                            <Toolbar>
                                <Typography
                                    className={classes.title}
                                    variant="title"
                                    color="inherit"
                                >
                                    Valser Private Investment
                                </Typography>
                                <div className={classes.extraContainer}>
                                    <div className={classes.search}>
                                        <div className={classes.searchIcon}>
                                            <SearchIcon />
                                        </div>
                                        <InputBase
                                            placeholder="Search…"
                                            classes={{
                                                root: classes.inputRoot,
                                                input: classes.inputInput
                                            }}
                                        />
                                    </div>
                                    <div className={classes.grow} />
                                    <div className={classes.sectionDesktop}>
                                        <IconButton color="inherit">
                                            <Badge badgeContent={4} color="secondary">
                                                <MailIcon />
                                            </Badge>
                                        </IconButton>
                                        <IconButton color="inherit">
                                            <Badge badgeContent={17} color="secondary">
                                                <NotificationsIcon />
                                            </Badge>
                                        </IconButton>
                                    </div>
                                </div>
                            </Toolbar>
                        </AppBar>
                    </div>

                    {activeStep === 0 && <DSGPicker />}
                    {activeStep === 1 && <ReviewProposal />}

                    {activeStep !== 2 && (
                        <footer className={classes.footer}>
                            <div />
                            <div className={classes.goRight}>
                                {activeStep < 1 ? (
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={this.handleNext}
                                        className={classes.button}
                                    >
                                        Next
                                    </Button>
                                ) : (
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => this.setState({ activeStep: 2 })}
                                        className={classes.button}
                                    >
                                        Send proposal
                                    </Button>
                                )}
                            </div>
                            <div className={classes.stepperContainer}>
                                <div className={classes.layout}>
                                    <Stepper nonLinear activeStep={activeStep}>
                                        {steps.map((label, index) => (
                                            <Step key={label}>
                                                <StepButton
                                                    // @ts-ignore
                                                    completed={this.state.completed[index]}
                                                >
                                                    {label}
                                                </StepButton>
                                            </Step>
                                        ))}
                                    </Stepper>
                                </div>
                            </div>
                        </footer>
                    )}
                </div>
            </MuiThemeProvider>
        )
    }
}

export default withStyles(styles)(App)
