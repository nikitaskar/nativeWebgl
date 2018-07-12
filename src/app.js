import Program from './Program'

class App {
    constructor(opt) {
        this.canvas = document.getElementById('canvas')
        this.gl = this.canvas.getContext('webgl')
        this.canvas.width = window.innerWidth
        this.canvas.height = window.innerHeight
        if(!this.gl) {
            console.warn('There is no WebGL in your browser')
            return
        }
        
        this.vPlane = document.getElementById('vPlane').innerHTML
        this.fPlane = document.getElementById('fPlane').innerHTML  

        this.planeProgram = new Program(this.gl, this.vPlane, this.fPlane)

        var positionAttributeLocation = this.gl.getAttribLocation(this.planeProgram.program, "position");

        // Create a buffer and put three 2d clip space points in it
        var positionBuffer = this.gl.createBuffer();
      
        // Bind it to ARRAY_BUFFER (think of it as ARRAY_BUFFER = positionBuffer)
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, positionBuffer);
      
        var positions = [
          -0.8, -0.8,
          -0.8, 0.8,
          0.8, 0.8,
          0.8,0.8,
          -0.8,-0.8,
          .8, -0.8
        ];


        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(positions), this.gl.STATIC_DRAW);
      
        // code above this line is initialization code.
        // code below this line is rendering code.
      
      
        // Tell Webthis.GL how to convert from clip space to pixels
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
      
        // Clear the canvas
        this.gl.clearColor(0, 0, 0, 0);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);
      
        // Tell it to use our program (pair of shaders)
        this.planeProgram.use()
      
        // Turn on the attribute
        this.gl.enableVertexAttribArray(positionAttributeLocation);
      
        // Bind the position buffer.
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, positionBuffer);
      
        // Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
        var size = 2;          // 2 components per iteration
        var type = this.gl.FLOAT;   // the data is 32bit floats
        var normalize = false; // don't normalize the data
        var stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
        var offset = 0;        // start at the beginning of the buffer
        this.gl.vertexAttribPointer(
            positionAttributeLocation, size, type, normalize, stride, offset)
      
        // draw
        var primitiveType = this.gl.TRIANGLES;
        var offset = 0;
        var count = 6;
        this.gl.drawArrays(primitiveType, offset, count);
      
        window.addEventListener('resize', this.resize.bind(this))
    }

    resize() {
        this.canvas.width = window.innerWidth
        this.canvas.height = window.innerHeight

        this.gl.viewport(0,0,
            window.innerWidth,
            window.innerHeight
          )
  
    }
}

export default App


// "use strict";

// function createShader(gl, type, source) {
//   var shader = gl.createShader(type);
//   gl.shaderSource(shader, source);
//   gl.compileShader(shader);
//   var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
//   if (success) {
//     return shader;
//   }

//   console.log(gl.getShaderInfoLog(shader));
//   gl.deleteShader(shader);
// }

// function createProgram(gl, vertexShader, fragmentShader) {
//   var program = gl.createProgram();
//   gl.attachShader(program, vertexShader);
//   gl.attachShader(program, fragmentShader);
//   gl.linkProgram(program);
//   var success = gl.getProgramParameter(program, gl.LINK_STATUS);
//   if (success) {
//     return program;
//   }

//   console.log(gl.getProgramInfoLog(program));
//   gl.deleteProgram(program);
// }

// function main() {
//   // Get A WebGL context
//   var canvas = document.getElementById("canvas");
//   var gl = canvas.getContext("webgl");
//   console.log(canvas, gl)
//   if (!gl) {
//     return;
//   }

//   // Get the strings for our GLSL shaders
//   var vertexShaderSource = document.getElementById("vPlane").text;
//   var fragmentShaderSource = document.getElementById("fPlane").text;

//   // create GLSL shaders, upload the GLSL source, compile the shaders
//   var vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
//   var fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

//   // Link the two shaders into a program
//   var program = createProgram(gl, vertexShader, fragmentShader);

//   // look up where the vertex data needs to go.
//   var positionAttributeLocation = gl.getAttribLocation(program, "a_position");

//   // Create a buffer and put three 2d clip space points in it
//   var positionBuffer = gl.createBuffer();

//   // Bind it to ARRAY_BUFFER (think of it as ARRAY_BUFFER = positionBuffer)
//   gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

//   var positions = [
//     0, 0,
//     0, 0.5,
//     0.7, 0,
//   ];
//   gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

//   // code above this line is initialization code.
//   // code below this line is rendering code.


//   // Tell WebGL how to convert from clip space to pixels
//   gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

//   // Clear the canvas
//   gl.clearColor(0, 0, 0, 0);
//   gl.clear(gl.COLOR_BUFFER_BIT);

//   // Tell it to use our program (pair of shaders)
//   gl.useProgram(program);

//   // Turn on the attribute
//   gl.enableVertexAttribArray(positionAttributeLocation);

//   // Bind the position buffer.
//   gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

//   // Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
//   var size = 2;          // 2 components per iteration
//   var type = gl.FLOAT;   // the data is 32bit floats
//   var normalize = false; // don't normalize the data
//   var stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
//   var offset = 0;        // start at the beginning of the buffer
//   gl.vertexAttribPointer(
//       positionAttributeLocation, size, type, normalize, stride, offset)

//   // draw
//   var primitiveType = gl.TRIANGLES;
//   var offset = 0;
//   var count = 3;
//   gl.drawArrays(primitiveType, offset, count);
// }

// main();
