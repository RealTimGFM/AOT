"use client";

import { useEffect, useRef, useState } from "react";

let googleMapsPromise;

function loadGoogleMaps(apiKey) {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("Google Maps can only load in the browser."));
  }

  if (window.google?.maps) {
    return Promise.resolve(window.google.maps);
  }

  if (googleMapsPromise) {
    return googleMapsPromise;
  }

  googleMapsPromise = new Promise((resolve, reject) => {
    const callbackName = `__initGoogleMaps${Date.now()}`;
    const script = document.createElement("script");

    window[callbackName] = () => {
      resolve(window.google.maps);
      delete window[callbackName];
    };

    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&v=weekly&callback=${callbackName}`;
    script.async = true;
    script.defer = true;
    script.dataset.googleMaps = "true";
    script.onerror = () => {
      reject(new Error("Failed to load Google Maps."));
      delete window[callbackName];
    };

    document.head.appendChild(script);
  });

  return googleMapsPromise;
}

export default function CommunityMapPanel({ events }) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef([]);
  const infoWindowRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [status, setStatus] = useState(apiKey ? "loading" : "missing");

  function focusEvent(index, shouldPan = true) {
    const map = mapInstanceRef.current;
    const marker = markersRef.current[index];
    const infoWindow = infoWindowRef.current;
    const event = events[index];

    if (!map || !marker || !infoWindow || !event) {
      return;
    }

    setActiveIndex(index);

    if (shouldPan) {
      map.panTo(event.position);
      map.setZoom(13);
    }

    infoWindow.setContent(`
      <div class="gm-info-window">
        <div class="gm-info-day">${event.day}</div>
        <div class="gm-info-title">${event.title}</div>
        <div class="gm-info-location">${event.location}</div>
      </div>
    `);
    infoWindow.open({
      anchor: marker,
      map
    });
  }

  useEffect(() => {
    if (!apiKey || !mapRef.current) {
      return;
    }

    let isCancelled = false;

    loadGoogleMaps(apiKey)
      .then((maps) => {
        if (isCancelled || !mapRef.current) {
          return;
        }

        const map = new maps.Map(mapRef.current, {
          center: { lat: 45.505, lng: -73.569 },
          zoom: 12,
          disableDefaultUI: true,
          zoomControl: true,
          streetViewControl: false,
          fullscreenControl: false,
          mapTypeControl: false,
          clickableIcons: false,
          gestureHandling: "cooperative"
        });

        const bounds = new maps.LatLngBounds();
        const infoWindow = new maps.InfoWindow();

        const markers = events.map((event, index) => {
          const marker = new maps.Marker({
            map,
            position: event.position,
            title: `${event.title} - ${event.location}`,
            animation: maps.Animation.DROP
          });

          marker.addListener("click", () => focusEvent(index, false));
          bounds.extend(event.position);
          return marker;
        });

        map.fitBounds(bounds, 64);

        maps.event.addListenerOnce(map, "idle", () => {
          if (!isCancelled) {
            map.setZoom(12);
            focusEvent(0, false);
            setStatus("ready");
          }
        });

        mapInstanceRef.current = map;
        markersRef.current = markers;
        infoWindowRef.current = infoWindow;
      })
      .catch(() => {
        if (!isCancelled) {
          setStatus("error");
        }
      });

    return () => {
      isCancelled = true;
      markersRef.current.forEach((marker) => marker.setMap(null));
      markersRef.current = [];
    };
  }, [apiKey, events]);

  return (
    <>
      <div className="map-surface">
        <div ref={mapRef} className="map-canvas" />

        <div className="map-toolbar">
          <div className="map-chip strong">Montreal, QC</div>
          <div className="map-chip">Community activity</div>
        </div>

        {status === "loading" && <div className="map-status">Loading map...</div>}
        {status === "missing" && <div className="map-status">Add a Google Maps API key to load the map.</div>}
        {status === "error" && <div className="map-status">Google Maps could not be loaded.</div>}
      </div>

      <div className="map-sidebar">
        <div className="map-side-head">This week in Montreal</div>
        {events.map((event, index) => (
          <button
            key={`${event.day}-${event.title}`}
            type="button"
            className={`mini-event ${activeIndex === index ? "is-active" : ""}`}
            onClick={() => focusEvent(index)}
          >
            <strong>{event.day}</strong>
            <span>{event.title}</span>
            <small>{event.location}</small>
          </button>
        ))}
      </div>
    </>
  );
}
