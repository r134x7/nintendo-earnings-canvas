import {makeProject} from '@motion-canvas/core';

import act1 from '../scenes/episode5/act1?scene';
// import web3reading1a from "../../audio/web3reading1a.wav";
import web3reading2a from "../../audio/web3reading2a.wav";
// import web3reading1b from "../../audio/web3reading1b.mp3";

export default makeProject({
  scenes: [act1],
  audio: web3reading2a,
});
