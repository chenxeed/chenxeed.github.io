import $ from 'jquery';
import {AUDIO_ELECTRONIC_PING} from './resource';

export default function Timeline(wrapper){
  this.wrapper = wrapper;
  this.scenes = [];
  return this;
}

Timeline.prototype.scene = function(sceneFunc){
  const scene = sceneFunc();
  this.scenes.push(scene);
  return this;
}

Timeline.prototype.wait = function(delay){
  const end$ = $.Deferred();
  const start = () => setTimeout( end$.resolve, delay);
  this.scenes.push({start, end$});
  return this;
}

Timeline.prototype.start = function(){
  this.scenes.reduce( (prev$, {id, start, end$}) => {
    if(prev$){
      prev$.done(startScene.bind(null, start, id, this.wrapper));
    }else{
      startScene(start, id, this.wrapper);
    }
    return end$;
  }, null);
}

function startScene(start, id, wrapper){
  $(`${wrapper}`).empty();  
  if(id && !document.querySelector(`#${id}`) ){
    // refresh the scenes
    $(`<div id='${id}' class='scene' />`).appendTo(`${wrapper}`);
  }
  start();
}