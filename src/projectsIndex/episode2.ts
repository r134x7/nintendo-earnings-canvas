import {makeProject} from '@motion-canvas/core';

import opening from '../scenes/episode2/opening?scene';
import act1 from '../scenes/episode2/act1?scene';
import act2 from '../scenes/episode2/act2?scene';
import act3 from '../scenes/episode2/act3?scene';
import final from '../scenes/episode2/final?scene';
import capcom2f from "../../audio/capcom2f.wav";

export default makeProject({
  scenes: [opening, act1, act2, final],
  audio: capcom2f,
});
