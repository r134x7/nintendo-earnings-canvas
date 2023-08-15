import {makeProject} from '@motion-canvas/core';

import opening from '../scenes/episode2/opening?scene';
import act1 from '../scenes/episode2/act1?scene';
import act2 from '../scenes/episode2/act2?scene';
import act3 from '../scenes/episode2/act3?scene';

export default makeProject({
  scenes: [opening, act1, act2, act3],
});
