import $ from 'jquery';
import anime from 'animejs';

import template from './template.html';
import  './style.css';

import {
  AUDIO_INCOMING, AUDIO_MONSTER_GROWL, AUDIO_EXPLOSION_1,
  AUDIO_EXPLOSION_2
} from 'resource';

export default function Scene2(){

  const id = 'scene2';
  const end$ = $.Deferred();

  function start(){

    // add template
    $('#scene2').html(template);

    const init$ = $.Deferred();
    const stream1$ = act1(init$);
    const stream2$ = act2(stream1$);
    const stream3$ = act3(stream2$);
    const stream4$ = act4(stream3$);

    stream4$.done( () => {
      console.log('scene 2 end');
      end$.resolve();
    });

    init$.resolve();

  }

  function act1(stream$){
    const done$ = $.Deferred();
    stream$.done( () => {

      AUDIO_INCOMING.play();

      $('#scene2 .background img').css({top: -50, left:-50, width:1200});

      anime({
        targets: '#scene2',
        opacity: 1,
        duration: 3000,
        delay: 5000
      }).finished.then(done$.resolve);

    });
    return done$;
  }


  function act2(stream$){
    const done$ = $.Deferred();
    stream$.done( () => {
      anime({
        targets: '#scene2 .background img',
        top: -50,
        left: -50,
        width: 1000,
        duration: 10000,
        easing: 'linear'
      }).finished.then(done$.resolve);
    });
    return done$;
  }

  function act3(stream$){
    const done$ = $.Deferred();
    stream$.done( () => {
      AUDIO_MONSTER_GROWL.play();
      anime.timeline()
        .add({
          targets: '#scene2 .fireball-1',
          left: 200,
          top: 10,
          width: 800,
          height: 800,
          duration: 4000,
          delay: 2000,
          easing: 'easeInExpo',
          begin: (anim) => {
            AUDIO_EXPLOSION_1.play();
          }
        })
        .finished.then(done$.resolve);
    });
    return done$;
  }

  function act4(stream$){
    const done$ = $.Deferred();
    stream$.done( () => {
      anime.timeline()
        .add({
          targets: '#scene2 .fireball-1',
          width: 3000,
          height: 3000,
          left: -1000,
          top: -1000,
          opacity: 0,
          begin: (anim) => AUDIO_EXPLOSION_2.play()
        })
        .add({
          targets: '#scene2 .background img',
          left: -150,
          top: -1200,
          width: 3000,
          duration: 4000,
          opacity: 0,
          easing: 'easeInExpo',
        })
        .finished.then( () =>{
          $(AUDIO_INCOMING).animate({volume:0}, 1000, () => {
            AUDIO_INCOMING.pause();
            AUDIO_INCOMING.currentTime = 0;
            AUDIO_INCOMING.volume = 1;
            done$.resolve();          
          });
        });
    });
    return done$;
  }

  AUDIO_MONSTER_GROWL.addEventListener("ended", function(){
    AUDIO_MONSTER_GROWL.currentTime = 0;
  });

  AUDIO_INCOMING.addEventListener("ended", function(){
    AUDIO_INCOMING.currentTime = 0;
  });

  AUDIO_EXPLOSION_1.addEventListener("ended", function(){
    AUDIO_EXPLOSION_1.currentTime = 0;
  });

  AUDIO_EXPLOSION_2.addEventListener("ended", function(){
    AUDIO_EXPLOSION_2.currentTime = 0;
  });


  return {
    id,
    start,
    end$
  }



}