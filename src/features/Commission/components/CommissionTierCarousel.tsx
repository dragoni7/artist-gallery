import { Box } from '@mui/material';
import { CommissionTier } from '@/types';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { mdContext } from '@/app/App';
import { useContext } from 'react';

interface CommissionTierCarouselProps {
  commissionTier: CommissionTier;
}

export default function CommissionTierCarousel(props: CommissionTierCarouselProps) {
  const isMd = useContext(mdContext);

  function addSliderSlides() {
    var slides = [];
    const count = props.commissionTier.count;

    for (var i = 1; i <= count; i++) {
      slides.push(
        <Box
          key={`${props.commissionTier.id}_${i}`}
          sx={{ height: 580, width: 580, objectFit: 'contain' }}
        >
          <img
            src={`/assets/examples/${props.commissionTier.id}_${i}.png`}
            alt={`Slide ${props.commissionTier.id}_${i}`}
            style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: 10 }}
          />
        </Box>
      );
    }

    return slides;
  }

  const settings = {
    infinite: props.commissionTier.count > 1 ? true : false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: props.commissionTier.count > 1 ? true : false,
    autoplaySpeed: 3000,
  };

  return (
    <Box
      sx={{
        width: isMd ? '70%' : '100%',
        mx: 'auto',
        mt: 2,
        border: '4px solid',
        borderColor: 'secondary.highlight',
        borderRadius: 4,
      }}
    >
      <Slider {...settings}>{addSliderSlides()}</Slider>
    </Box>
  );
}
