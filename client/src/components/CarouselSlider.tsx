import Slider from 'react-slick';

function CarouselSlider(props: any) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="slider">
      <Slider {...settings}>
        {props.breeds.imageURLs?.map((image: any) => (
          <div className="w-96 h-30 mx-auto" key={image.id}>
            <img
              className="w-full h-96 object-cover rounded-lg border mx-auto"
              src={image.url}
              alt={image.id}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default CarouselSlider;
