import FadeIn from '@/components/FadeIn';
import useOCs from '@/features/OC/hooks/useOCs';
import { Box, Grow, Paper, Stack, Typography } from '@mui/material';
import Slider, { Settings } from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { useSearchParams } from 'react-router-dom';
import OCPage from '@/features/OC/components/OCPage';
import { useContext } from 'react';
import { mdContext } from '../App';
import Loading from '@/components/Loading';

export const OCs = () => {
  const { ocs, loading } = useOCs();

  const [searchParams, setSearchParams] = useSearchParams();
  const isMd = useContext(mdContext);

  function updateSearchParams(key: string, value: any) {
    setSearchParams(() => {
      if (value) {
        searchParams.set(key, value);
      } else {
        searchParams.delete(key);
      }

      return searchParams;
    });
  }

  const NextArrow: React.FC<{ onClick?: () => void }> = ({ onClick }) => {
    return (
      <Box
        sx={{
          '&:hover': {
            cursor: 'pointer',
          },
        }}
      >
        {isMd ? (
          <FontAwesomeIcon
            icon={faAngleDown}
            onClick={onClick}
            size="2x"
            style={{
              color: 'white',
              zIndex: 2,
            }}
          />
        ) : (
          <FontAwesomeIcon
            icon={faAngleDown}
            onClick={onClick}
            style={{
              color: 'white',
              zIndex: 2,
            }}
          />
        )}
      </Box>
    );
  };

  const PrevArrow: React.FC<{ onClick?: () => void }> = ({ onClick }) => {
    return (
      <Box
        sx={{
          '&:hover': {
            cursor: 'pointer',
          },
        }}
      >
        {isMd ? (
          <FontAwesomeIcon
            icon={faAngleUp}
            onClick={onClick}
            size="2x"
            style={{
              color: 'white',
              zIndex: 2,
            }}
          />
        ) : (
          <FontAwesomeIcon
            icon={faAngleUp}
            onClick={onClick}
            style={{
              color: 'white',
              zIndex: 2,
            }}
          />
        )}
      </Box>
    );
  };

  const settings: Settings = {
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    vertical: true,
    verticalSwiping: true,
    swipe: true,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 500,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <Paper
      id="OCs"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        alignItems: 'center',
        textAlign: 'center',
        width: '100%',
        height: '100%',
        minHeight: isMd ? '100vh' : 'auto',
        borderRadius: 5,
        outline: '10px solid black',
      }}
    >
      <FadeIn>
        <Stack alignItems="center" justifyContent="center">
          <Typography variant={isMd ? 'h4' : 'h5'} paddingTop={2}>
            My Original Characters:
          </Typography>
          <Box
            sx={{
              p: 2,
              m: 5,
              backgroundColor: 'primary.highlight',
              borderRadius: 4,
              outline: '4px solid black',
              height: '100%',
            }}
          >
            {loading ? (
              <Loading />
            ) : searchParams.has('name') &&
              ocs.some((oc) => oc.name === searchParams.get('name')) ? (
              <OCPage oc={ocs.find((oc) => oc.name === searchParams.get('name'))} />
            ) : (
              <Box px={isMd ? 20 : 0}>
                <Slider {...settings}>
                  {ocs.map((oc) => (
                    <Grow in={true}>
                      <Box
                        key={oc.name}
                        sx={{ '&:hover': { scale: 1.02 }, border: '8px solid pink' }}
                        onClick={() => {
                          updateSearchParams('name', oc.name);
                        }}
                      >
                        <img
                          src={oc.headerImg}
                          width="100%"
                          height="auto"
                          style={{ objectFit: 'contain' }}
                        />
                      </Box>
                    </Grow>
                  ))}
                </Slider>
              </Box>
            )}
          </Box>
        </Stack>
      </FadeIn>
    </Paper>
  );
};
