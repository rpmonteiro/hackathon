import React, { Component, Fragment } from 'react'
import {
    withStyles,
    createStyles,
    Theme,
    Card,
    CardHeader,
    CardContent,
    Typography,
    Avatar,
    IconButton,
    ListItem,
    MuiThemeProvider,
    Grid
} from '@material-ui/core'
import Chart from 'react-apexcharts'
import dataSeries from './data-series'
import Map from './map'
import { blue, orange } from '@material-ui/core/colors'
import TimeIcon from '@material-ui/icons/AccessTime'
import WarningIcon from '@material-ui/icons/Warning'
import MoneyIcon from '@material-ui/icons/AttachMoney'
import moment from 'moment'

interface Props {}

export interface FundData {
    category?: 'nature' | 'energy' | 'water' | 'education' | 'housing'
    name: string
    location: string
    insights: string[]
    imgSrc: string
    lat: number
    lng: number
}

export const dummyFunds: FundData[] = [
    {
        category: 'nature',
        name: 'Responsability Fair Agriculture Fund',
        location: 'Ujku Village, Namibia',
        insights: [
            '2.9 million smallholders impacted',
            'Post-harvest food waste reduced to 0.5% from an average of 10% in India'
        ],
        imgSrc:
            'https://res.cloudinary.com/devex/image/fetch/c_scale,f_auto,q_auto,w_720/https://lh3.googleusercontent.com/KH1c82Pc0hbF7wQnBSspYS9YBGSVrcWSP2mqmDQvOzjvwOIONea-QNrIiknBfujujuLA_4qnZsx4x1n3Rc1q5gFC0suuFWRvrGdzNIWX-ERND175Wsk8_iWMxOoxhY_RGqAeT1Il',
        lat: 15.426964,
        lng: 79.4477
    },
    {
        category: 'housing',
        name: 'Responsability Micro and SME Finance Fund',
        location: 'Ujku Village, Namibia',
        insights: [
            'Provides financial inclusion for 2 million female clients',
            '10,046 stable, formal jobs created'
        ],
        imgSrc: 'https://www.globalgiving.org/pfil/2349/ph_2349_49273.jpg',
        lat: 1.0610657,
        lng: 31.952985
    },
    {
        category: 'energy',
        name: 'Global Climate Partnership Fund',
        location: 'Ujku Village, Namibia',
        insights: [
            '174 MW of clean energy capacity installed',
            'Access to electricity for over 12,000 households',
            'Reduced CO2 emissions by 2,909 tons'
        ],
        imgSrc:
            'https://www.opic.gov/sites/default/files/blog/wp-content/uploads/2015/04/GigaWatt-Solar-Rwanda_4.jpg',
        lat: -26.3822933,
        lng: 28.555071
    },
    {
        category: 'education',
        name: 'Empowerment through Education Fund',
        location: 'Ujku Village, Namibia',
        insights: ["Provides elementary school to 150'000 children in underserved communities"],
        imgSrc:
            'https://res.cloudinary.com/devex/image/fetch/c_scale,f_auto,q_auto,w_720/https://lh3.googleusercontent.com/KH1c82Pc0hbF7wQnBSspYS9YBGSVrcWSP2mqmDQvOzjvwOIONea-QNrIiknBfujujuLA_4qnZsx4x1n3Rc1q5gFC0suuFWRvrGdzNIWX-ERND175Wsk8_iWMxOoxhY_RGqAeT1Il',
        lat: -1.9646631,
        lng: 30.0644358
    },
    {
        category: 'water',
        name: 'Sustainable Water Fund',
        location: 'Ujku Village, Namibia',
        insights: [
            'USD 78 million invested in water infrastructure',
            '2.5 million households impacted'
        ],
        imgSrc: 'https://balipedia.com/uploads/news/1443454954-12810529643_9152860331_k.jpg',
        lat: 8.351174,
        lng: 115.154626
    }
]

export const donutChartData = {
    options: {
        responsive: [
            {
                breakpoint: 480,
                options: {
                    chart: {
                        width: 200
                    },
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        ],
        labels: dummyFunds.map((f) => f.name)
    },
    series: [44, 55, 41, 17, 15]
}

var ts1 = 1388534400000
var ts2 = 1388620800000

var dataSet = [[], []]

for (var i = 0; i < 18; i++) {
    ts1 = ts1 + 86400000
    var innerArr = [ts1, dataSeries[2][i].value * 5]
    // @ts-ignore
    dataSet[0].push(innerArr)
}
for (var i = 0; i < 18; i++) {
    ts2 = ts2 + 86400000
    // @ts-ignore
    var innerArr = [ts2, dataSeries[1][i].value * 2]
    // @ts-ignore
    dataSet[1].push(innerArr)
}

export const lineChartData = {
    options: {
        chart: {
            stacked: false,
            zoom: {
                enabled: false
            }
        },
        stroke: {
            show: true,
            curve: 'smooth',
            lineCap: 'butt',
            colors: undefined,
            width: 2,
            dashArray: 0
        },
        plotOptions: {
            line: {
                curve: 'smooth'
            }
        },
        dataLabels: {
            enabled: false
        },

        markers: {
            size: 0,
            style: 'full'
        },
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                inverseColors: false,
                opacityFrom: 0.8,
                opacityTo: 0.1,
                stops: [60, 100, 100, 100]
            }
        },
        yaxis: {
            labels: {
                style: {
                    color: '#8e8da4'
                },
                offsetX: 0,
                // @ts-ignore
                formatter: function(val) {
                    return (val / 10000000).toFixed(2)
                }
            },
            axisBorder: {
                show: false
            },
            axisTicks: {
                show: false
            }
        },
        xaxis: {
            type: 'datetime',
            tickAmount: 8,
            min: new Date('01/02/2014').getTime(),
            max: new Date('01/20/2014').getTime()
        },
        title: {
            text: 'Index performance vs fund portfolio',
            align: 'left',
            offsetX: 14
        },
        tooltip: {
            shared: true
        },
        legend: {
            position: 'top',
            horizontalAlign: 'right',
            offsetX: -10
        }
    },
    series: [
        {
            name: 'Index',
            data: dataSet[0]
        },
        {
            name: 'Portfolio',
            data: dataSet[1]
        }
    ]
}

const styles = (theme: Theme) =>
    createStyles({
        root: {
            paddingTop: 24,
            marginBottom: '150px'
        },
        mapContainer: {
            height: 600,
            marginLeft: -100,
            width: '100vw'
        },
        avatar: {
            backgroundColor: blue[500]
        },
        row: {
            display: 'flex'
        },
        boldText: {
            fontWeight: 600
        },
        insight: {
            '& + &': {
                marginTop: 10
            }
        },
        icon: {
            height: 110,
            width: 110
        },
        column: {
            display: 'flex',
            flexDirection: 'column'
        },
        iconsGrid: {
            marginTop: 30,
            display: 'flex',
            flex: 1,
            justifyContent: 'space-between',
            margin: '0 24px'
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
            }
        }
    })

console.log(lineChartData.series)
class ReviewProposal extends Component<Props> {
    render() {
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
        return (
            <div className={classes.root}>
                <div className={classes.row}>
                    <div className={classes.column}>
                        <Card style={{ marginRight: 24, marginBottom: 16 }}>
                            <CardHeader title="Numbers" />
                            <CardContent>
                                <Grid container>
                                    <Grid item xs={4}>
                                        <Typography className={classes.numbersPreview}>
                                            {<MoneyIcon />}
                                            {amount < 1000000
                                                ? `CHF ${amount / 1000}k`
                                                : `CHF ${amount / 1000000}M`}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Typography className={classes.numbersPreview}>
                                            {<WarningIcon style={{ color: orange[500] }} />}
                                            {risk > 3
                                                ? risk > 8
                                                    ? ' High risk'
                                                    : ' Medium risk'
                                                : ' Low risk'}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Typography className={classes.numbersPreview}>
                                            {<TimeIcon style={{ color: blue[500] }} />}
                                            {horizon} years
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                        <Chart
                            style={{ minHeigth: 300 }}
                            options={donutChartData.options}
                            series={donutChartData.series}
                            type="pie"
                            width="650px"
                            height="300px"
                        />
                        <div className={classes.iconsGrid}>
                            <img className={classes.icon} src={require(`../icons/cat-${3}.png`)} />
                            <img className={classes.icon} src={require(`../icons/cat-${7}.png`)} />
                            <img className={classes.icon} src={require(`../icons/cat-${6}.png`)} />
                            <img className={classes.icon} src={require(`../icons/cat-${10}.png`)} />
                            <img className={classes.icon} src={require(`../icons/cat-${17}.png`)} />
                        </div>
                    </div>
                    <div>
                        <Card>
                            <CardHeader
                                title="Impact Summary"
                                subheader="Collected on March 8, 2019"
                            />
                            <CardContent>
                                {dummyFunds.map((f) => (
                                    <Fragment key={f.name}>
                                        <Typography className={classes.fundTitle}>
                                            {f.name}
                                        </Typography>
                                        {f.insights.map((i) => (
                                            <Typography
                                                className={classes.insight}
                                                key={`${f}-${i}`}
                                            >
                                                &bull; {i}
                                            </Typography>
                                        ))}
                                    </Fragment>
                                ))}
                                <Typography style={{ marginTop: 16 }} variant="subheading">
                                    Estimated positive impact on
                                    {<span className={classes.boldText}> 435,000 </span>}
                                    people
                                </Typography>
                            </CardContent>
                        </Card>
                    </div>
                </div>
                <div style={{ marginTop: 24 }}>
                    <Chart
                        options={lineChartData.options}
                        series={lineChartData.series}
                        type="line"
                        height="380px"
                    />
                </div>
                {/* <div className={classes.mapContainer}>
                    <Map data={dummyFunds} />
                </div> */}
            </div>
        )
    }
}

export default withStyles(styles)(ReviewProposal)
