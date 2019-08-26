import $ from 'jquery';
import {AUDIO_ELECTRONIC_PING} from './resource';

import Timeline from './timeline';

import Intro from './scene/intro';
import Scene1 from './scene/scene1';
import Scene2 from './scene/scene2';
import Scene3 from './scene/scene3';
import Scene4 from './scene/scene4';

const timeline = new Timeline('.scene-wrapper');


timeline
  .scene(Intro)
  .wait(3000)
  .scene(Scene1)
  .wait(1000)
  .scene(Scene2)
  .wait(2000)
  .scene(Scene3)
  .wait(2000)
  .scene(Scene4)
  .start();
