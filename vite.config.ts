import {defineConfig} from 'vite';
import motionCanvas from '@motion-canvas/vite-plugin';
import ffmpeg from '@motion-canvas/ffmpeg';

export default defineConfig({
  plugins: [
    motionCanvas({
      project: [
        "./src/projectsIndex/project.ts",
        "./src/projectsIndex/videoShort.ts",
        "./src/projectsIndex/episode2.ts",
      ]
    }),
    ffmpeg(),
  ],
});
