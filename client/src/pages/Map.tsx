import { useEffect, useState } from 'react';
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  Autocomplete,
} from '@react-google-maps/api';
import { TailSpin } from 'react-loader-spinner';

interface Position {
  lat: number;
  lng: number;
}

function Map() {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [places, setPlaces] = useState<google.maps.places.PlaceResult[]>([]);
  const [position, setPosition] = useState<Position | null>(null);
  const [autocomplete, setAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null);

  /// isLoaded loads the google maps api
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string,
    libraries: ['places'],
  });

  // Width and height of the map
  const containerStyle = {
    width: 1024,
    height: 600,
  };

  // Get the user's current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation?.getCurrentPosition((position) => {
        setPosition({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    }
  }, []);

  // Get the nearby pet stores
  useEffect(() => {
    if (map && isLoaded) {
      const placesService = new window.google.maps.places.PlacesService(map);
      const request = {
        location: position,
        radius: 30000,
        keyword: 'pet store',
      } as google.maps.places.PlaceSearchRequest;

      placesService.nearbySearch(request, (results: any, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          setPlaces(results);
        }
      });
    }
  }, [map, isLoaded, position]);
  // Load the map
  const onLoad = (map: google.maps.Map) => {
    setMap(map);
  };

  // Unload the map
  const onUnmount = () => {
    setMap(null);
  };

  // Search for a location
  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      const place = autocomplete?.getPlace();
      if (place?.geometry?.location) {
        setMap((current) => {
          (current as google.maps.Map).panTo(
            place.geometry?.location as google.maps.LatLng
          );
          (current as google.maps.Map).setZoom(15);
          return current;
        });
      } else {
        console.log('No geometry found');
      }
    } else {
      console.log('Autocomplete is not loaded yet!');
    }
  };

  const onAutocompleteLoad = (autocomplete: any) => {
    setAutocomplete(autocomplete);
  };

  return (
    <div>
      {isLoaded ? (
        <>
          <div className="flex justify-center ">
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={
                position ? { lat: position.lat, lng: position.lng } : undefined
              }
              zoom={15}
              onLoad={onLoad}
              onUnmount={onUnmount}
            >
              {places.map((place) => (
                <Marker
                  key={place.place_id}
                  position={place.geometry?.location as google.maps.LatLng}
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
                className="w-full border rounded-md px-3 py-2 mt-4 mx-auto bg-white text-black placeholder-black"
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
