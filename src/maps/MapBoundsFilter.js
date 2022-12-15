import { useMap } from "react-leaflet";
import { useMapEvent, useMapEvents } from "react-leaflet";
import { Button as RSButton } from "reactstrap";

const MapBoundsFilter = () => {

  //const map = useMap();
    //map.getBounds()
    //console.log('bounds: ', map.getBounds)

    // try a click event for button

  const getDistance = useMapEvent('click', () => {
    console.log('getDistance: ', getDistance.getBounds())
    const currentBounds = getDistance.getBounds()
    const boundsDistance = getDistance.distance(currentBounds._northEast.lng, currentBounds._southWest.lng)
    console.log("currentBounds: " + currentBounds)
    console.log("boundsDistance: " + boundsDistance)
    });


  //const currentBounds = map.getBounds();

  // const boundsDistance = map.distance(currentBounds._northEast.lng, currentBounds._southWest.lng)
  // console.log("currentBounds: " + currentBounds)
  // console.log("boundsDistance: " + boundsDistance)
  

  return(
    <RSButton
          //onClick={}
          color="info"
        >          
          Search this Area
          {/* filter farmstands to current bounds */}
          
        </RSButton>
  )
}

export default MapBoundsFilter;