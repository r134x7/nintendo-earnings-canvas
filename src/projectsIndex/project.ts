import {makeProject} from '@motion-canvas/core';

import opening from '../scenes/episode1/opening?scene';
import firstSVG from '../scenes/episode1/firstSVG?scene';
import secondScene from '../scenes/episode1/secondScene?scene';
import thirdScene from '../scenes/episode1/thirdScene?scene';
import fourthScene from '../scenes/episode1/fourthScene?scene';
import fifthScene from '../scenes/episode1/fifthScene?scene';

export default makeProject({
  scenes: [opening, firstSVG, secondScene, thirdScene, fourthScene, fifthScene],
});
