import $ from 'jquery';
import anime from 'animejs';

import template from './template.html';
import './style.css';

import {AUDIO_BEEP} from 'resource';

export default function Intro(){

  const id = 'intro';
  const end$ = $.Deferred();

  function start(){
    $('#intro').html(template).show().css('opacity', 0);

    anime({
      targets: '#intro',
      opacity: 1,
      backgroundColor: '#FFF'
    });

    $('#intro .button.fs').on('click', () => {
      document.body.webkitRequestFullScreen && document.body.webkitRequestFullScreen();
      document.body.mozRequestFullScreen && document.body.mozRequestFullScreen();
    });


    $('#intro .button.start').on('click', () => {

      AUDIO_BEEP.play();

      const timeline = anime.timeline({autoplay: false});

      timeline
        .add({
          targets: '#intro h1',
          fontSize: 200
        })
        .add({
          targets: '#intro',
          opacity: 0
        });

      timeline.finished.then( () => {
        end$.resolve();
      });

      timeline.play();

    });
  }



  return {
    id,
    start,
    end$
  }



}