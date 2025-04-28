import { styled, Box, Container } from '@mui/material';
import { useEffect, useRef } from 'react';
import Slider from 'react-slick';

interface SliderPreviewProps {
  images: string[];
  imageHeight?: number | string;
  gap?: number;
  imgIndex: number;
  sliderRef: React.RefObject<Slider | null>;
}

const ScrollContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  overflowX: 'auto',
  overflowY: 'hidden',
  whiteSpace: 'nowrap',
  padding: theme.spacing(1, 0),
  '&::-webkit-scrollbar': {
    display: 'none',
  },
  msOverflowStyle: 'none',
  scrollbarWidth: 'none',
  scrollBehavior: 'smooth',
}));

export default function SliderPreview({ images, imgIndex, sliderRef }: SliderPreviewProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const prevImgIndex = useRef<number>(imgIndex);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const imageElements = container.querySelectorAll('[data-image-container]');
    if (!imageElements.length) return;

    let targetIndex;
    if (prevImgIndex.current === images.length - 1 && imgIndex === 0) {
      targetIndex = 0;
    } else if (prevImgIndex.current === 0 && imgIndex === images.length - 1) {
      targetIndex = imgIndex;
    } else {
      targetIndex =
        imgIndex > prevImgIndex.current
          ? Math.min(imgIndex + 2, images.length - 1)
          : Math.max(imgIndex - 2, 0);
    }

    prevImgIndex.current = imgIndex;
    const targetImage = imageElements[targetIndex] as HTMLElement;

    if (targetImage) {
      const containerRect = container.getBoundingClientRect();
      const targetRect = targetImage.getBoundingClientRect();

      const containerLeft = containerRect.left;
      const targetLeft = targetRect.left;

      const relativePosition = targetLeft - containerLeft;
      const scrollAdjustment = relativePosition - containerRect.width / 2 + targetRect.width / 2;

      const newScrollLeft = container.scrollLeft + scrollAdjustment;

      container.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth',
      });
    }
  }, [imgIndex, images.length]);

  return (
    <Container maxWidth="md">
      <ScrollContainer ref={scrollContainerRef}>
        {images.map((image, index) => (
          <Box
            data-image-container
            data-image-index={index}
            key={`${image}_${index}_preview`}
            sx={{
              display: 'inline-block',
              flexShrink: 0,
              marginRight: (theme) => theme.spacing(1),
              '&:last-child': {
                marginRight: 0,
              },
            }}
          >
            <Box
              component="img"
              src={image}
              alt={`${image}_preview`}
              sx={{
                height: 120,
                width: 'auto',
                objectFit: 'cover',
                borderRadius: '4px',
                border: '2px solid',
                borderColor: imgIndex === index ? 'secondary.highlight' : 'transparent',
                '&:hover': {
                  cursor: 'pointer',
                },
              }}
              onClick={() => sliderRef.current?.slickGoTo(index)}
            />
          </Box>
        ))}
      </ScrollContainer>
    </Container>
  );
}
