import React, { Component } from 'react'
import cn from 'classnames'
import './dsg-picker.scss'
import { Typography, createStyles, withStyles, Theme } from '@material-ui/core'
import Slider from '@material-ui/lab/Slider'

interface State {
    selectedIdx: number[]
    horizon?: number
    amount?: number
    risk?: number
}

const styles = (theme: Theme) =>
    createStyles({
        container: {
            marginBottom: theme.spacing.unit * 2
        },
        root: {
            width: 300
        },
        slider: {
            padding: '22px 0px'
        },
        sliderLabel: {
            fontWeight: 500
        },
        iconsGrid: {
            margin: `${theme.spacing.unit * 3}px ${-theme.spacing.unit}px`,
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center'
        },
        sliderAmount: {
            fontWeight: 500
        },
        rangesRow: {
            display: 'flex',
            flexDirection: 'row'
        },
        icon: {
            width: 100,
            height: 100
        },
        iconContainer: {
            cursor: 'pointer',
            margin: theme.spacing.unit,
            filter: 'grayscale(100%)',
            transform: 'all 200ms ease-out',
            '&:hover': {
                filter: 'grayScale(50%)'
            }
        },
        iconContainerSelected: {
            filter: 'grayscale(0%) brightness(120%)',
            '&:hover': {
                filter: 'grayscale(0%) brightness(120%)'
            }
        },
        rangeContainer: {
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            '& + &': {
                marginLeft: theme.spacing.unit * 4
            }
        }
    })

class DSGPicker extends Component<{}, State> {
    state = {
        selectedIdx: [] as number[],
        horizon: 5,
        amount: 100000,
        risk: 5
    }

    toggleIdx = (idx: number) => {
        const currIdx = this.state.selectedIdx.indexOf(idx)
        const newSelectedIdx = [...this.state.selectedIdx]

        if (currIdx > -1) {
            newSelectedIdx.splice(currIdx, 1)
        } else {
            newSelectedIdx.push(idx)
        }
        this.setState({ selectedIdx: newSelectedIdx })
    }

    onRangeChange = (key: 'horizon' | 'amount' | 'risk', val: number) => {
        // @ts-ignore
        this.setState({ [key]: val }, () => {
            // @ts-ignore
            window.rangeValues = this.state
        })
    }

    render() {
        // @ts-ignore
        const { classes } = this.props
        const { selectedIdx, horizon, amount, risk } = this.state
        let icons = []
        for (let i = 0; i < 17; i++) {
            const element = 17
            icons.push(
                <div
                    key={i}
                    className={cn(classes.iconContainer, {
                        [classes.iconContainerSelected]: selectedIdx.includes(i)
                    })}
                    onClick={() => this.toggleIdx(i)}
                >
                    <img className={classes.icon} src={require(`../icons/cat-${i + 1}.png`)} />
                </div>
            )
        }
        return (
            <div className={classes.container}>
                <div className={classes.iconsGrid}>{icons}</div>
                <div className={classes.rangesRow}>
                    <div className={classes.rangeContainer}>
                        <Typography className={classes.sliderLabel}>Risk level</Typography>
                        <Slider
                            min={1}
                            max={10}
                            step={1}
                            classes={{ container: classes.slider }}
                            value={risk}
                            onChange={(_, val) => this.onRangeChange('risk', val)}
                        />
                        <Typography className={classes.sliderAmount}>
                            ({risk})
                            {risk > 3 ? (risk > 8 ? ' High risk' : ' Medium risk') : ' Low risk'}
                        </Typography>
                    </div>
                    <div className={classes.rangeContainer}>
                        <Typography className={classes.sliderLabel}>Amount</Typography>
                        <Slider
                            min={100000}
                            classes={{ container: classes.slider }}
                            value={amount}
                            step={100000}
                            max={5000000}
                            onChange={(_, val) => this.onRangeChange('amount', val)}
                        />
                        <Typography className={classes.sliderAmount}>
                            {amount < 1000000
                                ? `CHF ${amount / 1000}k`
                                : `CHF ${amount / 1000000}M`}
                        </Typography>
                    </div>
                    <div className={classes.rangeContainer}>
                        <Typography className={classes.sliderLabel}>Investment horizon</Typography>
                        <Slider
                            min={3}
                            max={20}
                            step={1}
                            classes={{ container: classes.slider }}
                            value={horizon}
                            onChange={(_, val) => this.onRangeChange('horizon', val)}
                        />
                        <Typography className={classes.sliderAmount}>{horizon} years</Typography>
                    </div>
                </div>
            </div>
        )
    }
}
export default withStyles(styles)(DSGPicker)
