import $ from 'jquery';
import anime from 'animejs';

import template from './template.html';
import  './style.css';

import {
  AUDIO_BATTLE_1, AUDIO_SWORD_1, AUDIO_SWORD_3, AUDIO_EXPLOSION_2,
  AUDIO_LASER, AUDIO_SWORD_COLLIDE, AUDIO_SWORD_FINISH,
  AUDIO_BEAM_1, AUDIO_BEAM_2, AUDIO_BEAM_CHARGE, AUDIO_BEAM_FIGHT,
  AUDIO_MONSTER_THROW, AUDIO_MONSTER_GROWL, AUDIO_COURAGE,
  AUDIO_MONSTER_GROWL_2, AUDIO_MONSTER_GROWL_3, AUDIO_MONSTER_WALK_1
} from 'resource';

export default function Scene3(){

  const id = 'scene3';
  const end$ = $.Deferred();

  function start(){

    // add template
    $('#scene3').html(template);

    const init$ = $.Deferred();
    const stream1$ = act1(init$);
    const stream2$ = act2(stream1$);
    const stream3$ = act3(stream2$);
    const stream4$ = act4(stream3$);
    const stream5$ = act5(stream4$);
    const stream6$ = act6(stream5$);
    const stream7$ = act7(stream6$);

    stream7$.done( () => {
      console.log('scene 3 end');
      end$.resolve();
    });

    init$.resolve();

  }

  function act1(stream$){
    const done$ = $.Deferred();
    stream$.done( () => {
      AUDIO_MONSTER_WALK_1.play();

      $('#scene3 .monster-1').css('opacity',1);

      anime.timeline()
        .add({
          targets: '#scene3',
          opacity: 1,
          duration: 10000, // change back to 10000
          delay: 5000, // change back to 5000
          easing: 'linear',
          begin: (anim) => AUDIO_MONSTER_GROWL_3.play()
        })
        .add({
          targets: '#scene3 .area',
          top: 0,
          duration: 3000,
          easing: 'linear'
        })
        .finished.then(done$.resolve);

    });
    return done$;
  }


  function act2(stream$){
    const done$ = $.Deferred();
    stream$.done( () => {
      AUDIO_BATTLE_1.play();
      anime.timeline()
        .add({
          targets: '#scene3 .area',
          scale: 2,
          translateX: -200,
          elasticity: 500,
          duration: 3000,
          delay: 5000
        })
        .add({
          targets: '#scene3 .effect.slash-left',
          opacity: 1,
          top: 250,
          left: 100,
          duration: 1000,
          begin: () => AUDIO_SWORD_1.play(),
          complete: ({animatables}) => $( animatables[0].target ).css('opacity',0)
        })
        .add({
          targets: '#scene3 .effect.slash-right',
          opacity: 1,
          top: 300,
          left: 50,
          offset: '-=500',
          duration: 1000,
          begin: () => AUDIO_SWORD_3.play(),
          complete: ({animatables}) => $( animatables[0].target ).css('opacity',0)
        })
        .add({
          targets: '#scene3 .effect.slash-left',
          opacity: 1,
          top: 300,
          left: 100,
          offset: '-=500',
          duration: 1000,
          begin: () => AUDIO_SWORD_1.play(),
          complete: ({animatables}) => $( animatables[0].target ).css('opacity',0)
        })
        .add({
          targets: '#scene3 .effect.slash-right',
          opacity: 1,
          top: 300,
          left: 50,
          offset: '-=500',
          duration: 1000,
          begin: () => AUDIO_SWORD_3.play(),
          complete: ({animatables}) => $( animatables[0].target ).css('opacity',0)
        })
        .add({
          targets: '#scene3 .effect.slash-down',
          opacity: 1,
          top: 300,
          left: 50,
          offset: '-=500',
          duration: 1000,
          begin: () => AUDIO_SWORD_1.play(),
          complete: ({animatables}) => $( animatables[0].target ).css('opacity',0)
        })
        .add({
          targets: '#scene3 .monster-2',
          opacity: 1,
          duration: 1000,
          begin: () => {
            $('#scene3 .monster-1').animate({'opacity':0}, 1000);
          }
        })
        .finished.then( done$.resolve );
    });
    return done$;
  }

  function act3(stream$){
    const done$ = $.Deferred();
    stream$.done( () => {

      anime.timeline()
        .add({
          targets: '#scene3 .area',
          scale: 1,
          translateX: 0,
          elasticity: 500,
          duration: 3000,
          offset: 0
        })
        .add({
          targets: '#scene3 .fireball-1',
          width: 1500,
          height: 1500,
          left: -500,
          top: -500,
          opacity: 1,
          offset: 100,
          begin: (anim) => AUDIO_EXPLOSION_2.play(),
          complete: ({animatables}) => $( animatables[0].target ).css('opacity',0)
        }).finished.then(done$.resolve);
    });
    return done$;
  }

  function act4(stream$){
    const done$ = $.Deferred();
    stream$.done( () => {

      const timeline = anime.timeline({autoplay:false});

      for(let i=0;i<700;i+=100){
        $(`<div class="beam beam1-${i}"/>`)
          .css({top: 180, left: 380, opacity: 1})
          .appendTo('.beams');

        timeline.add({
          targets: '#scene3 .beams .beam1-'+i,
          top: 800,
          left: 700-i,
          width: 300,
          height: 300,
          duration: 300,
          easing: 'linear',
          begin: () => {
            AUDIO_LASER.currentTime = 0;
            AUDIO_LASER.play();
          },
          complete: ({animatables}) => $( animatables[0].target ).fadeOut()
        });        
      }

      for(let i=0;i<700;i+=100){
        $(`<div class="beam beam2-${i}"/>`)
          .css({top: 180, left: 380, opacity: 1})
          .appendTo('.beams');

        timeline.add({
          targets: '#scene3 .beams .beam2-'+i,
          top: 800,
          left: i,
          width: 300,
          height: 300,
          duration: 300,
          easing: 'linear',
          begin: () => {
            AUDIO_LASER.currentTime = 0;
            AUDIO_LASER.play();
          },
          complete: ({animatables}) => $( animatables[0].target ).fadeOut()
        });        
      }

      for(let i=0;i<20;i++){
        $(`<div class="beam beam3-${i}"/>`)
          .css({top: 180, left: 380, opacity: 1})
          .appendTo('.beams');

        timeline.add({
          targets: '#scene3 .beams .beam3-'+i,
          top: 800,
          left: 700,
          width: 300,
          height: 300,
          duration: 200,
          easing: 'linear',
          begin: () => {
            AUDIO_LASER.currentTime = 0;
            AUDIO_LASER.play();
            AUDIO_SWORD_COLLIDE.currentTime = 0;
            AUDIO_SWORD_COLLIDE.play();
          },
          complete: ({animatables}) => $( animatables[0].target ).fadeOut()
        });        
      }

      timeline.finished.then(done$.resolve);
      timeline.play();

    });
    return done$;
  }

  function act5(stream$){
    const done$ = $.Deferred();
    const enemy_beam = 350;
    const me_beam = 400;

    stream$.done( () => {


      $(AUDIO_BATTLE_1).animate({volume:0}, 1000, () => {
        AUDIO_BATTLE_1.pause();
        AUDIO_BATTLE_1.volume = 1;
        AUDIO_BATTLE_1.currentTime = 0;
        AUDIO_COURAGE.play();
      });

      anime.timeline()
        .add({
          targets: '#scene3 .area',
          scale: 1,
          translateX: -300,
          translateY: -100,
          elasticity: 500,
          duration: 3000,
          offset: 0
        })
        .add({
          targets: '#scene3 .monster-3',
          opacity: 1,
          duration: 1000,
          offset: 0,
          begin: () => {
            $('#scene3 .monster-2').animate({'opacity':0}, 1000);
          }
        })
        // charging
        .add({
          targets: '#scene3 .beam-wrapper.enemy',
          top: 70,
          left: 100,
          duration: 6000,
          easing: 'linear',
          offset: 5000
        })
        .add({
          targets: '#scene3 .enemy-charge',
          width: 200,
          height: 200,
          duration: 6000,
          offset: 5000,
          easing: 'linear',
          begin: () => {
            AUDIO_MONSTER_GROWL.play()
          }
        })
        .add({
          targets: '#scene3 .beam-wrapper.me',
          top: 400,
          left: 450,
          duration: 4000,
          easing: 'linear',
          offset: 7000
        })
        .add({
          targets: '#scene3 .me-charge',
          width: 300,
          height: 300,
          duration: 5000,
          offset: 7000,
          easing: 'linear',
          begin: () => {
            AUDIO_BEAM_CHARGE.play()
          }
        })
        // shoot!
        .add({
          targets: '#scene3 .enemy-charge',
          width: enemy_beam,
          height: 150,
          borderRadius: 20,
          easing: 'easeInQuad',
          offset: '-=1000',
          begin: () => {
            $('#scene3 .beam-wrapper.enemy')
              .css('transform', 'rotate(40deg) translateX(90px) translateY(-90px)');
            AUDIO_BEAM_2.play();
          }
        })
        .add({
          targets: '#scene3 .me-charge',
          width: me_beam,
          height: 150,
          borderRadius: 20,
          easing: 'easeInQuad',
          offset: '-=1000',
          begin: () => {
            $('#scene3 .beam-wrapper.me')
              .css('transform', 'rotate(219deg) translateX(-350px) translateY(-26px)')
              .css({top: 400, left: 450});
            AUDIO_BEAM_1.play();
          }
        })
        .finished.then( () =>
          done$.resolve(enemy_beam, me_beam)
        );
    });
    return done$;
  }

  function act6(stream$){
    const done$ = $.Deferred();
    stream$.done( (enemy_beam, me_beam) => {

      AUDIO_BEAM_FIGHT.loop = true;
      AUDIO_BEAM_FIGHT.play();

      let cur_enemy_beam = enemy_beam;
      let cur_me_beam = me_beam;

      $('#scene3 .button').on('click', () => {
        cur_enemy_beam-= 20;
        cur_me_beam+= 20;
        updateBeam();
      });
      
      function updateBeam(){
        $('#scene3 .enemy-charge').css('width', cur_enemy_beam);
        $('#scene3 .me-charge').css('width', cur_me_beam);
        if(cur_enemy_beam>400){
          $('#scene3 .need-help').fadeIn();
        }
      }

      const checkBeam = setInterval( () => {
        if(cur_enemy_beam<50){
          clearInterval(checkBeam);
          clearInterval(increaseEnemyBeam);
          $('#scene3 .need-help').fadeOut();
          $('#scene3 .beam-fight').fadeOut();
          AUDIO_BEAM_FIGHT.pause();
          done$.resolve();
        }
      }, 500);

      const increaseEnemyBeam = setInterval( () => {
        cur_enemy_beam+= 5;
        cur_me_beam-= 5;
        updateBeam();
      }, 500);
      
    });
    return done$;
  }

  function act7(stream$){
    const done$ = $.Deferred();

    stream$.done( () => {

      AUDIO_MONSTER_GROWL_2.play();

      anime.timeline()
        .add({
          targets: '#scene3 .area',
          scale: 2,
          translateX: -200,
          elasticity: 500,
          duration: 3000,
          delay: 5000
        })
        .add({
          targets: '#scene3 .monster-2',
          opacity: 1,
          duration: 1000,
          offset: '-=3000',
          begin: () => {
            $('#scene3 .monster-3').animate({'opacity':0}, 1000);
          }
        })
        .add({
          targets: '#scene3 .effect.slash-left',
          opacity: 1,
          top: 250,
          left: 100,
          duration: 1000,
          offset: '-=500',
          begin: () => AUDIO_SWORD_FINISH.play(),
          complete: ({animatables}) => $( animatables[0].target ).css('opacity',0)
        })
        .add({
          targets: '#scene3 .effect.slash-right',
          opacity: 1,
          top: 250,
          left: 100,
          duration: 1000,
          offset: '-=500',
          complete: ({animatables}) => $( animatables[0].target ).css('opacity',0)
        })
        .add({
          targets: '#scene3 .effect.slash-left',
          opacity: 1,
          top: 250,
          left: 100,
          duration: 1000,
          offset: '-=500',
          complete: ({animatables}) => $( animatables[0].target ).css('opacity',0)
        })
        .add({
          targets: '#scene3 .effect.slash-right',
          opacity: 1,
          top: 250,
          left: 100,
          duration: 1000,
          offset: '-=500',
          complete: ({animatables}) => $( animatables[0].target ).css('opacity',0)
        })
        .add({
          targets: '#scene3 .effect.slash-drop',
          opacity: 1,
          top: 250,
          left: 100,
          duration: 1000,
          offset: '-=500',
          complete: ({animatables}) => $( animatables[0].target ).css('opacity',0)
        }).finished.then( () => {
          $('#scene3 .overlay-white').fadeIn(5000, () => {
            $('#scene3').animate({opacity:0}, 500, done$.resolve);
          });
        });
    });

    return done$;
  }


  AUDIO_BATTLE_1.addEventListener("ended", function(){
    AUDIO_BATTLE_1.currentTime = 0;
  });

  AUDIO_COURAGE.addEventListener("ended", function(){
    AUDIO_COURAGE.currentTime = 0;
  });

  AUDIO_BEAM_1.addEventListener("ended", function(){
    AUDIO_BEAM_1.currentTime = 0;
  });

  AUDIO_BEAM_2.addEventListener("ended", function(){
    AUDIO_BEAM_2.currentTime = 0;
  });

  AUDIO_BEAM_CHARGE.addEventListener("ended", function(){
    AUDIO_BEAM_CHARGE.currentTime = 0;
  });

  AUDIO_BEAM_FIGHT.addEventListener("ended", function(){
    AUDIO_BEAM_FIGHT.currentTime = 0;
  });

  AUDIO_SWORD_1.addEventListener("ended", function(){
    AUDIO_SWORD_1.currentTime = 0;
  });

  AUDIO_SWORD_3.addEventListener("ended", function(){
    AUDIO_SWORD_3.currentTime = 0;
  });

  AUDIO_SWORD_COLLIDE.addEventListener("ended", function(){
    AUDIO_SWORD_COLLIDE.currentTime = 0;
  });

  AUDIO_SWORD_FINISH.addEventListener("ended", function(){
    AUDIO_SWORD_FINISH.currentTime = 0;
  });

  AUDIO_LASER.addEventListener("ended", function(){
    AUDIO_LASER.currentTime = 0;
  });

  AUDIO_MONSTER_WALK_1.addEventListener("ended", function(){
    AUDIO_MONSTER_WALK_1.currentTime = 0;
  });

  AUDIO_MONSTER_GROWL.addEventListener("ended", function(){
    AUDIO_MONSTER_GROWL.currentTime = 0;
  });

  AUDIO_MONSTER_GROWL_2.addEventListener("ended", function(){
    AUDIO_MONSTER_GROWL_2.currentTime = 0;
  });

  AUDIO_MONSTER_THROW.addEventListener("ended", function(){
    AUDIO_MONSTER_THROW.currentTime = 0;
  });

  AUDIO_MONSTER_GROWL_3.addEventListener("ended", function(){
    AUDIO_MONSTER_GROWL_3.currentTime = 0;
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