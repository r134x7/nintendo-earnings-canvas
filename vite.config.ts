import {defineConfig} from 'vite';
import motionCanvas from '@motion-canvas/vite-plugin';
import ffmpeg from '@motion-canvas/ffmpeg';

export default defineConfig({
  plugins: [
    motionCanvas({
      project: [
        "./src/projectsIndex/project.ts",
        "./src/projectsIndex/videoshort.ts",
        "./src/projectsIndex/episode2.ts",
        "./src/projectsIndex/episode3.ts",
        "./src/projectsIndex/episode5.ts",
      ]
    }),
    ffmpeg(),
  ],
});
