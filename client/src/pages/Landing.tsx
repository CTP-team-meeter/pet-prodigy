import { useEffect, useState } from 'react';
import './Landing.css';
import Button from '../components/Button';
import FadeInChildren from '../components/FadeInChildren';
import { NavLink } from 'react-router-dom';

const Landing = () => {
  return (
    <div id="landing">
      <section className="bg-primary" id="landing-first-section">
        <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-y-16 gap-x-8 px-4 lg:max-w-screen-xl lg:grid-cols-5 lg:px-8 xl:gap-x-16 xl:px-12">
          <div className="text-left relative z-10 md:text-center lg:text-left col-span-2">
            <FadeInChildren>
              <h1 style={{ fontSize: '2.25rem', marginBottom: '10px' }}>
                Find the pet best fit for you
              </h1>
              <p>
                Discover the perfect pet breed for you. Our website offers
                personalized recommendations based on your lifestyle and
                preferences.
              </p>
            </FadeInChildren>
          </div>
          {/* The div will be replaced to an image */}
          <div className="bg-slate-100 relative h-96 row-span-2 lg:static col-span-3">
            <img
              className="w-full h-96 object-cover border-white border-2 rounded-lg shadow-lg"
              src="/landing.png"
              alt="pet"
            />
          </div>
          <NavLink to="/breedselector">
            <Button
              className="text-primary mx-auto"
              title={'Check it out now!'}
            />
          </NavLink>
        </div>
      </section>
    </div>
  );
};

export default Landing;
