import {makeProject} from '@motion-canvas/core';

import opening from './scenes/opening?scene';
import firstSVG from './scenes/firstSVG?scene';
import secondScene from './scenes/secondScene?scene';
import thirdScene from './scenes/thirdScene?scene';
import fourthScene from './scenes/fourthScene?scene';
import fifthScene from './scenes/fifthScene?scene';

export default makeProject({
  scenes: [opening],
});
