/**
 * Program constructor. Create gl program and shaders. You can pass shader code to immediatly compile shaders
 *   @param {WebGLRenderingContext} gl webgl context this program belongs to
 *   @param {String} [vertex] an optional vertex shader code.
 *   @param {String} [fragment] an optional fragment shader code 
 
 
 */

class Program {
    constructor(gl, vert, frag) {
        this.gl = gl
        this.program = gl.createProgram()
        this.vShader = gl.createShader(gl.VERTEX_SHADER)
        this.fShader = gl.createShader(gl.FRAGMENT_SHADER)
        this.gl.attachShader(this.program, this.vShader);
        this.gl.attachShader(this.program, this.fShader);
        
        this.compile(vert, frag)
    }

    compile(vert, frag) {
       
     

        if( !(  this.compileShader(this.vShader, vert) &&
        this.compileShader(this.fShader, frag) ) ) {
            return false;
        }

        this.gl.linkProgram(this.program)
        
        if(!this.gl.getProgramParameter(this.program, this.gl.LINK_STATUS)) {
            return false
        }

        return true
    }

    compileShader(shader, source) {
        this.gl.shaderSource(shader, source)
        this.gl.compileShader(shader)

        if( !this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
            return false
        }

        return true
    }

    use() {
        this.gl.useProgram(this.program)
    }

    delete() {
        this.gl.deleteProgram(this.program)
    }
}

export default Program