import {makeProject} from '@motion-canvas/core';

import audio from "../audio/ggx2actune.mp3";

import opening from './scenes/videoShort/opening?scene';

export default makeProject({
  scenes: [opening],
  audio: audio,
});
