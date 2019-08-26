import $ from 'jquery';
import anime from 'animejs';

import template from './template.html';
import './style.css';

import {AUDIO_PEACEFUL} from 'resource';

export default function Scene1(){

  const id = 'scene1';
  const end$ = $.Deferred();

  function start(){

    // add template
    $('#scene1').html(template);

    const init$ = $.Deferred();
    const stream1$ = act1(init$);
    const stream2$ = act2(stream1$);
    const stream3$ = act3(stream2$);

    stream3$.done( () => {
      console.log('scene 1 end');
      end$.resolve();
    });

    init$.resolve();

  }

  function act1(stream$){
    const done$ = $.Deferred();
    
    stream$.done( () => {

      AUDIO_PEACEFUL.play();

      anime({
        targets: '#scene1',
        delay: 5000,
        opacity: 1
      }).finished.then(done$.resolve);
    })

    return done$;
  }

  function act2(stream$){
    const done$ = $.Deferred();
    stream$.done( () => {

      const timeline = anime.timeline({autoplay: false});
      const narration = document.querySelectorAll('#scene1 .narration p');

      anime({
        targets: '#scene1 .background',
        opacity: 0.7
      });


      timeline
        .add({
          targets: narration[0],
          opacity: 1,
        })
        .add({
          targets: narration[1],
          delay: 5000,
          marginTop: 20,
          opacity: 1
        })
        .add({
          targets: narration[2],
          delay: 5000,
          marginTop: 20,
          opacity: 1
        })
        .add({
          targets: narration[3],
          delay: 5000,
          marginTop: 20,
          opacity: 1
        })
        .finished.then(done$.resolve);

      timeline.play();

    })

    return done$;
  }

  function act3(stream$){
    const done$ = $.Deferred();
    stream$.done( () => {
      $(AUDIO_PEACEFUL).animate({volume:0}, 3000, () => {
        AUDIO_PEACEFUL.pause();
        AUDIO_PEACEFUL.currentTime = 0;
        AUDIO_PEACEFUL.volume = 1;

        anime({
          targets: '#scene1',
          opacity: 0,

        }).finished.then( done$.resolve );
      });
    })

    return done$;
  }

  return {
    id,
    start,
    end$
  }

}