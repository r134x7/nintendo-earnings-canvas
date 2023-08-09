import {makeProject} from '@motion-canvas/core';

import example from './scenes/example?scene';
import pieChart from './scenes/pieChart?scene';
import rectangle from './scenes/rectangle?scene';
import ellipse from './scenes/ellipse?scene';
import opening from './scenes/opening?scene';

export default makeProject({
  scenes: [opening, pieChart],
});
