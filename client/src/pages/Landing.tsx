import './Landing.css';
import Button from '../components/Button';
import FadeInChildren from '../components/FadeInChildren';

const Landing = () => {
  return (
    <div id="landing">
      <section
        className="bg-primary grid place-content-center"
        id="landing-first-section"
      >
        <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-y-16 gap-x-8 px-4 lg:max-w-screen-xl lg:grid-cols-5 lg:px-8 xl:gap-x-16 xl:px-12">
          <div className="text-left relative z-10 md:text-center lg:text-left col-span-2">
            <FadeInChildren>
              <h1 className="my-5">Find the pet best fit for you</h1>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </FadeInChildren>
          </div>
          {/* The div will be replaced to an image */}
          <div className="bg-slate-100 relative h-96 row-span-2 lg:static xl:pl-10 col-span-3"></div>
          <FadeInChildren>
            <Button title={'Start free trial'} />
          </FadeInChildren>
        </div>
      </section>
      <section className="bg-secondary" id="landing-second-section">
        Landing
      </section>
      <section className="bg-primary" id="landing-third-section">
        Landing
      </section>
    </div>
  );
};

export default Landing;
