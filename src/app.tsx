import React, { Component } from 'react'
import SearchIcon from '@material-ui/icons/Search'
import MailIcon from '@material-ui/icons/Mail'
import NotificationsIcon from '@material-ui/icons/Notifications'
import DSGPicker from './screens/dsg-picker'
import ReviewProposal from './screens/review-proposal'
import { fade } from '@material-ui/core/styles/colorManipulator'
import cn from 'classnames'

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
import { LoadingSpinner } from './loading-spinner'
import { Proposal } from './screens/proposal'

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
            textAlign: 'right'
        },
        goRightUp: {
            marginTop: -140
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
    showLoadingSpinner: boolean
    activeStep: number
    completed: {
        [key: number]: boolean
    }
}

class App extends Component<{}, State> {
    state = {
        showLoadingSpinner: false,
        activeStep: 0,
        completed: {}
    }

    handleNext = () => {
        console.log('handle next')
        this.setState(
            {
                showLoadingSpinner: this.state.activeStep === 1,
                activeStep: this.state.activeStep + 1
            },
            () => {
                if (this.state.showLoadingSpinner) {
                    window.setTimeout(() => {
                        this.setState({ showLoadingSpinner: false })
                    }, 2000)
                }
            }
        )
    }

    render() {
        // @ts-ignore
        const { classes } = this.props
        const { activeStep, showLoadingSpinner } = this.state
        console.log({ activeStep, showLoadingSpinner })
        return (
            <MuiThemeProvider theme={customTheme}>
                <div className={classes.layout}>
                    {activeStep < 2 && (
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
                    )}

                    {showLoadingSpinner && <LoadingSpinner />}
                    {activeStep === 0 && <DSGPicker />}
                    {activeStep === 1 && <ReviewProposal />}
                    {!showLoadingSpinner && activeStep === 2 && <Proposal />}

                    {activeStep !== 2 && (
                        <footer className={classes.footer}>
                            <div />
                            <div
                                className={cn(classes.goRight, {
                                    [classes.goRightUp]: activeStep !== 0
                                })}
                            >
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
                                        onClick={this.handleNext}
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
