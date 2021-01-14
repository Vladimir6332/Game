import React from 'react';
import Slider from '@material-ui/core/Slider';
import { makeStyles } from '@material-ui/core/styles';
import volumeMute from '../../../assets/images/sound/volume-mute.svg';
import volumeHight from '../../../assets/images/sound/volume-hight.svg';

const useStyles = makeStyles({
  root: {
    height: '20rem',
    color: 'firebrick',
  },
});

interface PropsSoundControl {
  onChange(newVolume: number): void;
  defaultVolume: number;
}

const SoundControl: React.FC<PropsSoundControl> = ({
  onChange,
  defaultVolume,
}: PropsSoundControl) => {
  const classes = useStyles();
  const handleChange = (
    event: React.SyntheticEvent<EventTarget>,
    newValue: number
  ): void => {
    onChange(newValue);
  };
  return (
    <div className={`sound-control ${classes.root}`}>
      <svg className="sound-control__icon">
        <use xlinkHref={`${volumeHight}#Capa_1`} />
      </svg>
      <Slider
        orientation="vertical"
        className="sound-control__volume"
        step={1}
        defaultValue={defaultVolume}
        valueLabelDisplay="auto"
        onChange={handleChange}
      />
      <svg className="sound-control__icon">
        <use xlinkHref={`${volumeMute}#Capa_1`} />
      </svg>
    </div>
  );
};

export default SoundControl;
