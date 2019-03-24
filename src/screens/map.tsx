import React, { Component, ReactNode } from 'react'
import MapGL, { Marker, Popup, ViewState } from 'react-map-gl'
import { ReactComponent as WaterMarker } from '../icons/water-marker.svg'
import { ReactComponent as NatureMarker } from '../icons/nature-marker.svg'
import { ReactComponent as EnergyMarker } from '../icons/energy-marker.svg'
import { ReactComponent as HousingMarker } from '../icons/housing-marker.svg'
import { ReactComponent as EducationMarker } from '../icons/education-marker.svg'
import { FundData } from './review-proposal'
import { createStyles, Theme, withStyles, Button } from '@material-ui/core'

// const markersData = [
//     {
//         lat: 31.733306,
//         lng: 3.739854,
//         cat: 'energy',
//         title: 'Largest solar array in the world',
//         description:
//             'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.',
//         imageSrc:
//             'https://tr1.cbsistatic.com/hub/i/2014/09/11/fb66c2f1-b7d8-42f0-930f-007f8cac7ed6/armysolarwhitemissile.jpg'
//     }, // algeria
//     {
//         lat: 23.971697,
//         lng: 27.395936,
//         cat: 'energy',
//         title: 'Largest solar array in the world',
//         description:
//             'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.',
//         imageSrc:
//             'https://tr1.cbsistatic.com/hub/i/2014/09/11/fb66c2f1-b7d8-42f0-930f-007f8cac7ed6/armysolarwhitemissile.jpg'
//     }, // egypt
//     {
//         lat: -18.227157,
//         lng: -61.684531,
//         cat: 'nature',
//         title: 'Sustainable Cocoa Plantation',
//         description:
//             'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.',
//         imageSrc: 'https://blog.globalforestwatch.org/wp-content/uploads/2015/05/clearing2.jpg'
//     }, // bolivia,
//     {
//         lat: 63.042921,
//         lng: 59.44672,
//         cat: 'nature',
//         title: 'Sustainable Cocoa Plantation',
//         imageSrc: 'https://blog.globalforestwatch.org/wp-content/uploads/2015/05/clearing2.jpg',
//         description:
//             'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.'
//     }, // russia
//     {
//         lat: 2.843055,
//         lng: 20.498876,
//         cat: 'housing',
//         title: 'Sustainable Housing',
//         imageSrc: 'https://architype.co.uk/img/projects/archihaus/archihaus-s1.jpg?152',
//         description:
//             'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.'
//     }, // congo
//     {
//         lat: -5.265894,
//         lng: 36.884309,
//         cat: 'housing',
//         title: 'Sustainable Housing',
//         imageSrc: 'https://architype.co.uk/img/projects/archihaus/archihaus-s1.jpg?152',
//         description:
//             'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.'
//     }, // tanzania
//     {
//         lat: -20.536532,
//         lng: 29.140223,
//         cat: 'poverty',
//         title: 'Sustainable Economy Development',
//         imageSrc: 'https://www.climateadvisers.com/wp-content/uploads/2014/02/C-Sq-Sustain.jpg',
//         description:
//             'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.'
//     }, // zimbabwe
//     {
//         lat: 45.148351,
//         lng: 104.385375,
//         cat: 'poverty',
//         title: 'Sustainable Economy Development',
//         imageSrc: 'https://www.climateadvisers.com/wp-content/uploads/2014/02/C-Sq-Sustain.jpg',
//         description:
//             'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.'
//     } // mongolia
// ]

const styles = (theme: Theme) =>
    createStyles({
        marker: {
            width: 30,
            height: 30
        },
        popupContent: {
            width: 300,
            '& img': {
                width: '100%'
            }
        }
    })

interface State {
    popupInfo: FundData
    viewport: ViewState
}

const dummyMarkerData = {
    lng: 0,
    lat: 0,
    location: '',
    insights: [],
    category: undefined,
    name: '',
    imgSrc: ''
}

interface Props {
    data: FundData[]
}

export class Map extends Component<Props, State> {
    state = {
        popupInfo: dummyMarkerData,
        viewport: {
            latitude: 5.273,
            longitude: 5.273,
            zoom: 1.72,
            bearing: 0,
            pitch: 0
        }
    }

    componentDidMount = () => {
        window.addEventListener('keydown', this.handleEsc)
    }

    componentWillUnmount = () => {
        window.removeEventListener('keydown', this.handleEsc)
    }

    handleEsc = (e: KeyboardEvent) => {
        if (e.keyCode === 27) {
            this.setState({ popupInfo: dummyMarkerData })
        }
    }

    onViewportChange = (viewport: ViewState) => {
        this.setState({ viewport })
    }

    renderMarker = (m: FundData): ReactNode => {
        // @ts-ignore
        const { classes } = this.props
        let component
        switch (m.category) {
            case 'nature':
                component = <NatureMarker className={classes.marker} />
                break
            case 'energy':
                component = <EnergyMarker className={classes.marker} />
                break
            case 'housing':
                component = <HousingMarker className={classes.marker} />
                break
            case 'water':
                component = <WaterMarker className={classes.marker} />
                break
            default:
                component = <EducationMarker className={classes.marker} />
                break
        }

        return (
            <Marker key={`marker-${m.lat}`} longitude={m.lng} latitude={m.lat}>
                <div onClick={() => this.setState({ popupInfo: m })}>{component}</div>
            </Marker>
        )
    }

    renderPopup() {
        // @ts-ignore
        const { classes } = this.props
        const { popupInfo } = this.state

        return (
            popupInfo.lat && (
                <Popup
                    tipSize={5}
                    offsetLeft={15}
                    anchor="bottom"
                    longitude={popupInfo.lng}
                    latitude={popupInfo.lat}
                    closeOnClick={false}
                    onClose={() => this.setState({ popupInfo: dummyMarkerData })}
                >
                    <div className={classes.popupContent}>
                        <h4>{popupInfo.name}</h4>
                        <p>{popupInfo.location}</p>
                        <img src={popupInfo.imgSrc} />
                        <Button>Learn more</Button>
                    </div>
                </Popup>
            )
        )
    }

    render() {
        // @ts-ignore
        const { data, classes } = this.props
        const { viewport } = this.state
        return (
            <MapGL
                {...viewport}
                width="100%"
                height="100%"
                onViewportChange={this.onViewportChange}
                // mapStyle="mapbox://styles/rpmonteiro/cjtmrm0qt23161fphb8e53k6u" // light
                mapStyle="mapbox://styles/rpmonteiro/cjtlehdg40zee1fnk2fqkufiu" // dark
                mapboxApiAccessToken="pk.eyJ1IjoicnBtb250ZWlybyIsImEiOiJjanRsYXh0NjIxZXhuNDVvNjRwNjgwa2NiIn0.Vtal2McNDWYuODg7C4el6g"
            >
                {data.map(this.renderMarker)}
                {this.renderPopup()}
            </MapGL>
        )
    }
}
export default withStyles(styles)(Map)
