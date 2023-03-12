import { useEffect, useState } from 'react';
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  Autocomplete,
} from '@react-google-maps/api';
import { TailSpin } from 'react-loader-spinner';

const containerStyle = {
  width: '1024px',
  height: '600px',
};

function Map() {
  const [map, setMap] = useState(null);
  const [places, setPlaces] = useState([]);
  const [position, setPosition] = useState(null);
  const [autocomplete, setAutocomplete] = useState(null);
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: ['places'],
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setPosition({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    }
  }, []);

  useEffect(() => {
    if (map && isLoaded) {
      const placesService = new window.google.maps.places.PlacesService(map);
      const request = {
        location: map.getCenter(),
        radius: 5000,
        keyword: 'pet store',
      };

      placesService.nearbySearch(request, (results, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          setPlaces(results);
        }
      });
    }
  }, [map, isLoaded]);

  const onLoad = (map) => {
    setMap(map);
  };

  const onUnmount = () => {
    setMap(null);
  };

  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      if (place.geometry) {
        setMap((current) => {
          current.panTo(place.geometry.location);
          current.setZoom(15);
          return current;
        });
      } else {
        console.log('No geometry found');
      }
    } else {
      console.log('Autocomplete is not loaded yet!');
    }
  };

  const onAutocompleteLoad = (autocomplete) => {
    setAutocomplete(autocomplete);
  };

  return (
    <div className="">
      {isLoaded ? (
        <>
          <div className="flex justify-center ">
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={{ lat: position?.lat, lng: position?.lng }}
              zoom={15}
              onLoad={onLoad}
              onUnmount={onUnmount}
            >
              {places.map((place) => (
                <Marker
                  key={place.place_id}
                  position={place.geometry.location}
                />
              ))}
            </GoogleMap>
          </div>
          <Autocomplete
            onLoad={onAutocompleteLoad}
            onPlaceChanged={onPlaceChanged}
          >
            <div className="w-6/12 mx-auto ">
              <input
                type="text"
                placeholder="Enter a location"
                className="w-full border rounded-md px-3 py-2 mt-4 mx-auto bg-white placeholder-black"
              />
            </div>
          </Autocomplete>
        </>
      ) : (
        <div className="mt-40 flex justify-center">
          <TailSpin color="#00BFFF" height={100} width={100} />
        </div>
      )}
    </div>
  );
}

export default Map;
