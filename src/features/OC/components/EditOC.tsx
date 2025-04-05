import { OC } from '@/types';
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
} from '@mui/material';
import Slider, { Settings } from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useEffect, useRef, useState } from 'react';
import DeletePost from './DeleteOC';
import UpdateOC from './UpdateOC';

interface EditOCProps {
  ocs: OC[];
  fetchOCs: () => Promise<void>;
}

export default function EditOC(props: EditOCProps) {
  const { ocs, fetchOCs } = props;
  const [slideIndex, setSlideIndex] = useState<number>(0);
  const [oc, setOC] = useState<OC>(ocs[0]);
  let sliderRef = useRef<Slider | null>(null);

  const settings: Settings = {
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    beforeChange: (_, next) => setSlideIndex(next),
  };

  useEffect(() => {
    setOC(ocs[slideIndex]);
  }, [slideIndex]);

  useEffect(() => {
    setSlideIndex(0);
  }, [ocs]);

  return (
    <Stack alignItems="center" spacing={1}>
      <Box width="90%">
        <Slider ref={sliderRef} {...settings}>
          {ocs.map((post) => (
            <Box key={post.name} sx={{ height: 360, width: 360, objectFit: 'contain' }}>
              <img
                src={post.headerImg}
                alt={post.name}
                style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: 10 }}
              />
            </Box>
          ))}
        </Slider>
      </Box>
      <Box width="50%">
        <FormControl fullWidth>
          <InputLabel id="oc-label">OC</InputLabel>
          <Select
            labelId="oc-label"
            id="oc-select"
            value={slideIndex}
            label="OC"
            onChange={(event: SelectChangeEvent<number>) => {
              const index = event.target.value as number;
              if (sliderRef.current) {
                (sliderRef.current as unknown as { slickGoTo: (index: number) => void }).slickGoTo(
                  index
                );
              }
            }}
          >
            {ocs.map((p: OC, index) => (
              <MenuItem value={index}>{p.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box
        width="50%"
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
        gap={1}
      >
        {oc !== undefined && <UpdateOC oc={oc} onUpdate={fetchOCs} />}
        {oc !== undefined && <DeletePost oc={oc} onDelete={fetchOCs} />}
      </Box>
    </Stack>
  );
}
