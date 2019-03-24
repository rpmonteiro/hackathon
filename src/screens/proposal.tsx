import React, { Component, Fragment } from 'react'
import {
    withStyles,
    createStyles,
    Typography,
    Theme,
    CssBaseline,
    AppBar,
    Toolbar,
    Drawer,
    Divider,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Card,
    CardHeader,
    CardContent,
    Grid,
    CardActionArea,
    CardMedia,
    CardActions,
    Button,
    Fab,
    CircularProgress
} from '@material-ui/core'
import CheckIcon from '@material-ui/icons/Check'
import SaveIcon from '@material-ui/icons/ListAlt'
import cn from 'classnames'
import Map from './map'
import { dummyFunds, donutChartData, lineChartData } from './review-proposal'
import Chart from 'react-apexcharts'

import LearnIcon from '@material-ui/icons/School'
import MapIcon from '@material-ui/icons/Public'
import ChartsIcon from '@material-ui/icons/ShowChart'
import InsightsIcon from '@material-ui/icons/Notes'
import TimeIcon from '@material-ui/icons/AccessTime'
import WarningIcon from '@material-ui/icons/Warning'
import MoneyIcon from '@material-ui/icons/AttachMoney'
import { orange, blue, indigo, green, pink } from '@material-ui/core/colors'

interface Props {}

const drawerWidth = 240

const styles = (theme: Theme) =>
    createStyles({
        root: {
            display: 'flex'
        },
        appBar: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth
        },
        drawer: {
            width: drawerWidth,
            flexShrink: 0
        },
        insight: {
            '& + &': {
                marginTop: 10
            }
        },
        icon: {
            height: 75,
            width: 80
        },
        column: {
            display: 'flex',
            flexDirection: 'column'
        },
        card: {
            // maxWidth: 345
        },
        media: {
            height: 140
        },
        iconsGrid: {
            marginTop: 30,
            display: 'flex',
            flex: 1,
            justifyContent: 'space-between',
            margin: '0 24px'
        },
        boldText: {
            fontWeight: 600
        },
        fundTitle: {
            fontWeight: 600,
            fontSize: '13px',
            marginBottom: 8,
            '&:not(:first-child)': {
                marginTop: 16
            }
        },
        numbersPreview: {
            fontWeight: 500,
            '& svg': {
                marginBottom: '-7px',
                marginRight: '5px'
            },
            '& + &': {
                marginTop: 32
            }
        },
        drawerPaper: {
            width: drawerWidth
        },
        toolbar: theme.mixins.toolbar,
        content: {
            flexGrow: 1,
            backgroundColor: theme.palette.background.default,
            padding: theme.spacing.unit * 3,
            marginLeft: drawerWidth / 1.5
        },
        mapContainer: {
            height: 600,
            marginLeft: -100,
            width: '100vw',
            position: 'relative'
        },
        wrapper: {
            margin: theme.spacing.unit,
            position: 'relative'
        },
        buttonSuccess: {
            backgroundColor: green['A700']
            // '&:hover': {
            //     backgroundColor: green[700]
            // }
        },
        fabProgress: {
            color: green['A700'],
            position: 'absolute',
            top: -6,
            left: -6,
            zIndex: 1
        },
        buttonProgress: {
            color: green['A200'],
            position: 'absolute',
            top: '50%',
            left: '50%',
            marginTop: -12,
            marginLeft: -12
        }
    })

class ProposalBase extends Component<Props> {
    state = {
        loading: false,
        success: false
    }

    timer = undefined

    componentWillUnmount() {
        // @ts-ignore
        clearTimeout(this.timer)
    }

    handleButtonClick = () => {
        if (!this.state.loading) {
            this.setState(
                {
                    success: false,
                    loading: true
                },
                () => {
                    // @ts-ignore
                    this.timer = setTimeout(() => {
                        this.setState({
                            loading: false,
                            success: true
                        })
                    }, 3000)
                }
            )
        }
    }

    render() {
        const { loading, success } = this.state
        const {
            // @ts-ignore
            horizon = 5,
            // @ts-ignore
            amount = 250000,
            // @ts-ignore
            risk = 5
            // @ts-ignore
        } = window.rangeValues || {}
        // @ts-ignore
        const { classes } = this.props
        const buttonClassname = cn({
            [classes.buttonSuccess]: success
        })
        return (
            <div>
                <CssBaseline />
                <AppBar position="fixed" className={classes.appBar}>
                    <Toolbar>
                        <Typography variant="h6" color="inherit" noWrap>
                            John Krazinski - Your sustainable investment proposal
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer
                    className={classes.drawer}
                    variant="permanent"
                    classes={{
                        paper: classes.drawerPaper
                    }}
                    anchor="left"
                >
                    <div className={classes.toolbar} />
                    <Divider />
                    <List>
                        <ListItem button>
                            <ListItemIcon>
                                <MoneyIcon />
                            </ListItemIcon>
                            <ListItemText primary="Overview" />
                        </ListItem>
                    </List>
                    <Divider />
                    <List>
                        <ListItem button>
                            <ListItemIcon>
                                <InsightsIcon style={{ color: indigo[500] }} />
                            </ListItemIcon>
                            <ListItemText primary="The story" />
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon>
                                <ChartsIcon style={{ color: green[500] }} />
                            </ListItemIcon>
                            <ListItemText primary="Performance" />
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon>
                                <LearnIcon style={{ color: orange[500] }} />
                            </ListItemIcon>
                            <ListItemText primary="Impact summary" />
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon>
                                <MapIcon style={{ color: blue[500] }} />
                            </ListItemIcon>
                            <ListItemText primary="Global impact" />
                        </ListItem>
                    </List>
                </Drawer>
                <main className={classes.content}>
                    <div className={classes.toolbar} />

                    <Grid container xs={12}>
                        <Grid item xs={4}>
                            <Card style={{ height: '100%', marginRight: 24, marginBottom: 16 }}>
                                <CardHeader title="Numbers" />
                                <CardContent>
                                    <Typography className={classes.numbersPreview}>
                                        {<MoneyIcon />}
                                        {amount < 1000000
                                            ? `CHF ${amount / 1000}k`
                                            : `CHF ${amount / 1000000}M`}
                                    </Typography>
                                    <Typography className={classes.numbersPreview}>
                                        {<WarningIcon style={{ color: orange[500] }} />}
                                        {risk > 3
                                            ? risk > 8
                                                ? ' High risk'
                                                : ' Medium risk'
                                            : ' Low risk'}
                                    </Typography>
                                    <Typography className={classes.numbersPreview}>
                                        {<TimeIcon style={{ color: blue[500] }} />}
                                        {horizon} years
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>

                        <Grid item xs={8}>
                            <Chart
                                style={{ minHeigth: 300 }}
                                options={donutChartData.options}
                                series={donutChartData.series}
                                type="pie"
                                height="300px"
                            />
                        </Grid>
                    </Grid>

                    <div>
                        <Grid style={{ margin: '60px -12px' }} container spacing={24}>
                            <Grid item xs={6}>
                                <Card className={classes.card}>
                                    <CardActionArea>
                                        <CardMedia
                                            className={classes.media}
                                            image="https://www.howwemadeitinafrica.com/wp-content/uploads/2017/04/africa-children-learn-education-study-young.jpg"
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                Over 10,000 children graduated this year from
                                                Mhjwada primary school
                                            </Typography>
                                            <Typography component="p">
                                                Addressing 95 percent of the group's manufacturing
                                                footprint within two years while pursuing new
                                                business opportunities in renewable...
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                    <CardActions>
                                        <Button size="small" color="primary">
                                            Learn More
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>

                            <Grid item xs={6}>
                                <Card className={classes.card}>
                                    <CardActionArea>
                                        <CardMedia
                                            className={classes.media}
                                            image="https://balipedia.com/uploads/news/1443454954-12810529643_9152860331_k.jpg"
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                Pathways to a low-water consumption Europe
                                            </Typography>
                                            <Typography component="p">
                                                Analysis shows that it would be technically feasible
                                                to reduce Europe's water consumption by 80 percent
                                                of their 1990 level by 2050.
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                    <CardActions>
                                        <Button size="small" color="primary">
                                            Learn More
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>

                            <Grid item xs={6}>
                                <Card className={classes.card}>
                                    <CardActionArea>
                                        <CardMedia
                                            className={classes.media}
                                            image="https://www.opic.gov/sites/default/files/blog/wp-content/uploads/2015/04/GigaWatt-Solar-Rwanda_4.jpg"
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                Stagnating revenues prompt growth in the solar panel
                                                industry
                                            </Typography>
                                            <Typography component="p">
                                                A strategic acquisition positions the company to
                                                become a major global player.
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                    <CardActions>
                                        <Button size="small" color="primary">
                                            Learn More
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>

                            <Grid item xs={6}>
                                <Card className={classes.card}>
                                    <CardActionArea>
                                        <CardMedia
                                            className={classes.media}
                                            image="https://res.cloudinary.com/devex/image/fetch/c_scale,f_auto,q_auto,w_720/https://lh3.googleusercontent.com/KH1c82Pc0hbF7wQnBSspYS9YBGSVrcWSP2mqmDQvOzjvwOIONea-QNrIiknBfujujuLA_4qnZsx4x1n3Rc1q5gFC0suuFWRvrGdzNIWX-ERND175Wsk8_iWMxOoxhY_RGqAeT1Il"
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                Developing a green growth strategy for a diversified
                                                conglomerate
                                            </Typography>
                                            <Typography component="p">
                                                A conglomerate with worldwide operations in more
                                                than 90 different businesses, many of them in
                                                carbon-intensive sectors.
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                    <CardActions>
                                        <Button size="small" color="primary">
                                            Learn More
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        </Grid>

                        <div style={{ margin: '60px 0' }}>
                            <Chart
                                options={lineChartData.options}
                                series={lineChartData.series}
                                type="line"
                                height="380px"
                            />
                        </div>

                        <Grid container spacing={24} style={{ margin: '60px -10px' }}>
                            <Grid item xs={4}>
                                <Card className={classes.card}>
                                    <CardActionArea>
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                Responsability Fair Agriculture Fund
                                            </Typography>
                                            <Typography component="p">
                                                &bull;2.9 million smallholders impacted
                                            </Typography>
                                            <Typography style={{ marginTop: 16 }} component="p">
                                                &bull;Post-harvest food waste reduced to 0.5% from
                                                an average of 10% in India
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                    <CardActions>
                                        <img
                                            className={classes.icon}
                                            src={require(`../icons/cat-${8}.png`)}
                                        />
                                    </CardActions>
                                </Card>
                            </Grid>

                            <Grid item xs={4}>
                                <Card className={classes.card}>
                                    <CardActionArea>
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                Responsability Micro and SME Finance Fund
                                            </Typography>
                                            <Typography component="p">
                                                &bull;Provides financial inclusion for 2 million
                                                female clients
                                            </Typography>
                                            <Typography style={{ marginTop: 16 }} component="p">
                                                &bull;10,046 stable, formal jobs created
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                    <CardActions>
                                        <img
                                            className={classes.icon}
                                            src={require(`../icons/cat-${16}.png`)}
                                        />
                                        <img
                                            className={classes.icon}
                                            src={require(`../icons/cat-${5}.png`)}
                                        />
                                    </CardActions>
                                </Card>
                            </Grid>

                            <Grid item xs={4}>
                                <Card className={classes.card}>
                                    <CardActionArea>
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                Sustainable Asia Water Fund
                                            </Typography>
                                            <Typography component="p">
                                                &bull;USD 78 million invested in water
                                                infrastructure
                                            </Typography>
                                            <Typography style={{ marginTop: 16 }} component="p">
                                                &bull;2.5 million households impacted
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                    <CardActions>
                                        <img
                                            className={classes.icon}
                                            src={require(`../icons/cat-${14}.png`)}
                                        />
                                        <img
                                            className={classes.icon}
                                            src={require(`../icons/cat-${17}.png`)}
                                        />
                                    </CardActions>
                                </Card>
                            </Grid>

                            <Grid item xs={4}>
                                <Card className={classes.card}>
                                    <CardActionArea>
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                Global Climate Partnership Fund
                                            </Typography>
                                            <Typography component="p">
                                                &bull;174 MW of clean energy capacity installed
                                            </Typography>
                                            <Typography style={{ marginTop: 16 }} component="p">
                                                &bull;Access to electricity for over 12,000
                                                households
                                            </Typography>
                                            <Typography style={{ marginTop: 16 }} component="p">
                                                &bull;Reduced CO2 emissions by 2,909 tons
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                    <CardActions>
                                        <img
                                            className={classes.icon}
                                            src={require(`../icons/cat-${3}.png`)}
                                        />
                                        <img
                                            className={classes.icon}
                                            src={require(`../icons/cat-${7}.png`)}
                                        />
                                    </CardActions>
                                </Card>
                            </Grid>

                            <Grid item xs={4}>
                                <Card className={classes.card}>
                                    <CardActionArea>
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                Empowerment through Education Fund
                                            </Typography>
                                            <Typography component="p">
                                                &bull;Provides elementary school to 150'000 children
                                                in underserved communities
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                    <CardActions>
                                        <img
                                            className={classes.icon}
                                            src={require(`../icons/cat-${1}.png`)}
                                        />
                                        <img
                                            className={classes.icon}
                                            src={require(`../icons/cat-${6}.png`)}
                                        />

                                        <img
                                            className={classes.icon}
                                            src={require(`../icons/cat-${12}.png`)}
                                        />
                                    </CardActions>
                                </Card>
                            </Grid>
                        </Grid>

                        <div className={classes.mapContainer}>
                            <Map data={dummyFunds} />
                        </div>

                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '48px 0 20px'
                            }}
                        >
                            <div className={classes.wrapper}>
                                <Fab
                                    color="primary"
                                    className={buttonClassname}
                                    onClick={this.handleButtonClick}
                                >
                                    {success ? <CheckIcon /> : <SaveIcon />}
                                </Fab>
                                {loading && (
                                    <CircularProgress size={68} className={classes.fabProgress} />
                                )}
                            </div>
                            <div className={classes.wrapper}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    className={buttonClassname}
                                    disabled={loading}
                                    onClick={this.handleButtonClick}
                                >
                                    {success
                                        ? 'Thank you, Mr. Krazinski. Mark will be in touch'
                                        : 'Accept proposal'}
                                </Button>
                                {loading && (
                                    <CircularProgress
                                        size={24}
                                        className={classes.buttonProgress}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        )
    }
}

export const Proposal = withStyles(styles)(ProposalBase)
