import {makeProject} from '@motion-canvas/core';

import example from './scenes/example?scene';
import pieChart from './scenes/pieChart?scene';

export default makeProject({
  scenes: [example, pieChart],
});
