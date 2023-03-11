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

const mapStyle = {
  height: '100%',
  width: '100%',
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
        keyword:
          'pet store, pet supply, pet shelter, pet grooming, pet hospital, pet clinic, pet boarding, pet training, pet food, pet accessories, pet store near me, pet supply near me, pet shelter near me, pet grooming near me, pet hospital near me, pet clinic near me, pet boarding near me, pet training near me, pet food near me, pet accessories near me',
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
              zoom={18}
              onLoad={onLoad}
              onUnmount={onUnmount}
              options={{
                disableDefaultUI: true,
                zoomControl: true,
              }}
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
            <div className="w-80 mx-auto mt-4">
              <input
                type="text"
                placeholder="Enter a location"
                className="w-full border rounded-md px-3 py-2 flex-1"
              />
            </div>
          </Autocomplete>
        </>
      ) : (
        <div className="mt-40">
          <TailSpin color="#00BFFF" height={100} width={100} />
        </div>
      )}
    </div>
  );
}

export default Map;
