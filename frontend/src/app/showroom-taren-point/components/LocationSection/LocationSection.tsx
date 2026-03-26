"use client";

import LocationMap from "./LocationMap";
import "./LocationSection.css";

export default function LocationSection() {
  const address = "Unit 2/175 Taren Point Rd, Caringbah NSW 2229";
  const encodedAddress = encodeURIComponent(address);

  const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`;

  return (
    <section className="location-section">
      <div className="location-container">

        {/* LEFT — MAP */}
        <div className="map-wrapper">
          <LocationMap />

          <a
            className="directions-btn"
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Get directions
          </a>
        </div>

        {/* RIGHT — TEXT */}
        <div className="location-text">
          <h2 className="location-title">
            Inhaus Living Taren Point
            <span className="location-underline" />
          </h2>

          <p className="location-subtitle">
            Walk in anytime or plan your visit ahead. Our space is located at Unit 2/175 Taren Point Rd, Caringbah , with easy parking and access.
          </p>

          <h3 className="hours-title">Opening Hours</h3>

          <ul className="hours-list">
            <li className="hours__hours"><span>Monday</span>9AM – 5:00PM</li>
            <li className="hours__hours"><span>Tuesday</span>9AM – 5:00PM</li>
            <li className="hours__hours"><span>Wednesday</span>9AM – 5:00PM</li>
            <li className="hours__hours"><span>Thursday</span>9AM – 5:00PM</li>
            <li className="hours__hours"><span>Friday</span>9AM – 5:00PM</li>
            <li className="hours__hours"><span>Saturday</span>9AM – 4:30PM</li>
            <li className="hours__hours"><span>Sunday</span>10AM – 4PM</li>
          </ul>

          <p className="address">{address}</p>
        </div>
      </div>
    </section>
  );
}