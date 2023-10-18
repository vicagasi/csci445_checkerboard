var gl;
var checkerPoints = [];
var w;
var h;
var rowMax = 4;
var _8 = 0.25

window.onload = function init()
{
    var canvas = document.getElementById( "gl-canvas" );
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    w = canvas.width;
    h = canvas.height;

    var vertices = [
        vec2(-1, 1),
        vec2(-0.75, 1),
        vec2(-1, 0.75),
        vec2(-0.75, 0.75)
    ];

    // makeRow(vertices, 0)
    makeGrid(vertices)

    //  Configure WebGL
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );
    
    //  Load shaders and initialize attribute buffers
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );
    
    checkerPoints.forEach(e => {
         // Load the data into the GPU
        var bufferId = gl.createBuffer();
        gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
        gl.bufferData( gl.ARRAY_BUFFER, flatten(e), gl.STATIC_DRAW);

        // Associate out shader variables with our data buffer
        var vPosition = gl.getAttribLocation( program, "vPosition" );
        gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
        gl.enableVertexAttribArray( vPosition );

        render(e);
    });
};

function translateY(vector, translateAmountY){
    var x = vector[0],
        y = vector[1]

    return [x, y - translateAmountY]
}

function translateX(vector, translateAmountX){
    var x = vector[0],
        y = vector[1]

    return [x + translateAmountX, y]
}

function makeRow(v, i){
    var wCounter = 0;
    if(i % 2 == 0){
        wCounter = _8;
    }

    for(let x = 0; x < rowMax; x++){
        s = [
            translateX(v[0], wCounter),
            translateX(v[1], wCounter),
            translateX(v[2], wCounter),
            translateX(v[3], wCounter)
        ]
        checkerPoints.push(s);
        wCounter = wCounter + _8 + _8;
        console.log(x);
    }
}

function makeGrid(v){
    var hCounter = 0;
    for(i = 0; i < rowMax * 2; i++){
        s = [
            translateY(v[0], hCounter),
            translateY(v[1], hCounter),
            translateY(v[2], hCounter),
            translateY(v[3], hCounter)
        ]
        makeRow(s, i)
        hCounter = hCounter + _8;
        console.log
    }
}

function render(e) {
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, e.length);
}

function clear(){
    gl.clear( gl.COLOR_BUFFER_BIT );
}