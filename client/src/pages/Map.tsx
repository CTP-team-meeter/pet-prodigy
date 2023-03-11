import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { memo, useCallback, useEffect, useState } from 'react';
import { TailSpin } from 'react-loader-spinner';

const containerStyle = {
  width: '1024px',
  height: '600px',
};

function Map() {
  const [position, setPosition] = useState(null);
  const [map, setMap] = useState(null);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position: any) => {
      setPosition(position.coords);
    });
  }, []);

  const onLoad = useCallback(
    (map: any) => {
      if (position) {
        const bounds = new window.google.maps.LatLngBounds(
          new window.google.maps.LatLng(position.latitude, position.longitude)
        );
        map.fitBounds(bounds);
      }
      setMap(map);
    },
    [position]
  );

  const onUnmount = useCallback(function callback(map: any) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <div className="flex justify-center">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={{ lat: position?.latitude, lng: position?.longitude }}
        onLoad={onLoad}
        onUnmount={onUnmount}
        zoom={18}
      ></GoogleMap>
    </div>
  ) : (
    <div className="flex justify-center items-center mt-32 h-96">
      <TailSpin width={100} height={100} color="#00BFFF" />
    </div>
  );
}

export default memo(Map);
