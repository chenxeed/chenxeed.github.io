/* Background Cloud */

//Changeable for your needs
var cloud_count = 10; //Too much cloud will result lag. Recommended below 30 clouds
var cloud_layer_count = 5; //Too much layer will result lag. Recommended below 5 layers
var cloud_speed = 180; //The speed of cloud movement when mouse move, recommended on 180

//Static variable, do not change
var world = $('#world'),
        viewport = $('#viewport'),
        worldXAngle = 0,
        worldYAngle = 0,
        d = 0,
        objects = [],
        layers = [],
        count_layer = 0;

$(window).mousemove(function(e) {
    worldXAngle = (.5 - (e.clientY / window.innerHeight)) * cloud_speed;
    worldYAngle = -(.5 - (e.clientX / window.innerWidth)) * cloud_speed;
    updateView();
    updateLayer();
});

function updateView() {
    world.css('-webkit-transform', 'translateZ( ' + d + 'px ) \
        rotateX( ' + worldXAngle + 'deg) \
        rotateY( ' + worldYAngle + 'deg)');
    world.css('-moz-transform', 'translateZ( ' + d + 'px ) \
        rotateX( ' + worldXAngle + 'deg) \
        rotateY( ' + worldYAngle + 'deg)');
}

function updateLayer() {
    for( var j = 0; j < layers.length; j++ ) {
        var layer = layers[ j ];
        layer.css('-webkit-transform','translateX( ' + $.data(layer,'x') + 'px ) \
            translateY( ' + $.data(layer,'y') + 'px ) \
            translateZ( ' + $.data(layer,'z') + 'px ) \
            rotateY( ' + (-worldYAngle) + 'deg ) \
            rotateX( ' + (-worldXAngle) + 'deg ) \
            scale( ' + $.data(layer,'s') + ' )');
        layer.css('-moz-transform','translateX( ' + $.data(layer,'x') + 'px ) \
            translateY( ' + $.data(layer,'y') + 'px ) \
            translateZ( ' + $.data(layer,'z') + 'px ) \
            rotateY( ' + (-worldYAngle) + 'deg ) \
            rotateX( ' + (-worldXAngle) + 'deg ) \
            scale( ' + $.data(layer,'s') + ' )');
    }
}

function generate() {
    objects = [];
    layers = [];
    for (var j = 0; j < cloud_count; j++) {
        objects.push(createCloud(j));
    }
}

function createCloud(count_cloud) {
    var random_x = 256-(Math.random()*512);
    var random_y = 256-(Math.random()*512);
    var random_z = 256-(Math.random()*512);
    
    var cloud_base = $(document.createElement('div'));
    cloud_base.addClass('cloud-base');
    cloud_base.css('-webkit-transform', 'translateX( ' + random_x + 'px ) \
        translateY( ' + random_y + 'px ) \
        translateZ( ' + random_z + 'px )');
    cloud_base.css('-moz-transform', 'translateX( ' + random_x + 'px ) \
        translateY( ' + random_y + 'px ) \
        translateZ( ' + random_z + 'px )');
    
    for (var j = 0; j < cloud_layer_count; j++) {
        
        var random_x = 25 - Math.floor(Math.random() * 50);
        var random_y = 25 - Math.floor(Math.random() * 50);
        var random_z = 25 - Math.floor(Math.random() * 50);
        var random_a = 25 - Math.floor(Math.random() * 360);
        var random_s = Math.random() * 1;
        var cloud_layer = $(document.createElement('div'));
        
        $.data(cloud_layer, "x", random_x);
        $.data(cloud_layer, "y", random_y);
        $.data(cloud_layer, "z", random_z);
        $.data(cloud_layer, "a", random_a);
        $.data(cloud_layer, "s", random_s);
        
        cloud_layer.addClass('cloud-layer');
        
        
        cloud_layer.css('-webkit-transform','translateX( ' + random_x + 'px ) \
            translateY( ' + random_y + 'px ) \
            translateZ( ' + random_z + 'px ) \
            scale( ' + random_s + ' )');
        cloud_layer.css('-moz-transform','translateX( ' + random_x + 'px ) \
            translateY( ' + random_y + 'px ) \
            translateZ( ' + random_z + 'px ) \
            scale( ' + random_s + ' )');
        layers[count_layer] = cloud_layer;
        count_layer++;
        cloud_base.append(cloud_layer);
    }
    

    world.append(cloud_base);

    return cloud_base;
}
generate();
/* END */

$(document).ready(function() {
    $('.hangboard').mouseover(function() {
        $(this).addClass('swing');
    });
    $('.hangboard').mouseout(function() {
        $(this).removeClass('swing');
    });
});