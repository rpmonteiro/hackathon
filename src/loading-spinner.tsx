import React, { FunctionComponent, memo } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import { withStyles, createStyles, Typography } from '@material-ui/core'

interface LoadingSpinnerProps {}

const styles = () =>
    createStyles({
        container: {
            position: 'fixed',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column'
        }
    })

// @ts-ignore
const LoadingSpinnerBase: FunctionComponent<LoadingSpinnerProps> = memo(({ classes }) => {
    return (
        <div className={classes.container}>
            <CircularProgress size={50} />
            <Typography style={{ marginTop: 24 }} variant="h4">
                Creating microsite...
            </Typography>
        </div>
    )
})

export const LoadingSpinner = withStyles(styles)(LoadingSpinnerBase)
