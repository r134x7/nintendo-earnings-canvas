import {makeProject} from '@motion-canvas/core';

import example from './scenes/example?scene';
import pieChart from './scenes/pieChart?scene';
import rectangle from './scenes/rectangle?scene';

export default makeProject({
  scenes: [example, pieChart, rectangle],
});
