import $ from 'jquery';
import anime from 'animejs';

import template from './template.html';
import './style.css';

import {AUDIO_FINISH} from 'resource';

export default function Scene4(){

  const id = 'scene4';
  const end$ = $.Deferred();

  function start(){

    // add template
    $('#scene4').html(template);

    const init$ = $.Deferred();
    const stream1$ = act1(init$);
    const stream2$ = act2(stream1$);

    stream2$.done( () => {
      console.log('scene 1 end');
      end$.resolve();
    });

    init$.resolve();

  }

  function act1(stream$){
    const done$ = $.Deferred();
    
    stream$.done( () => {

      AUDIO_FINISH.play();

      anime({
        targets: '#scene4',
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
      const narration = document.querySelectorAll('#scene4 .narration p');

      anime({
        targets: '#scene4 .background',
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
        .add({
          targets: narration[4],
          delay: 5000,
          marginTop: 20,
          opacity: 1
        })
        .finished.then(done$.resolve);

      timeline.play();

    })

    return done$;
  }

  return {
    id,
    start,
    end$
  }

}