var degToRad = Math.PI/180.0;
var updatePeriod = 50;

function Scene() {
    CGFscene.call(this);
};

Scene.prototype = Object.create(CGFscene.prototype);
Scene.prototype.constructor = Scene;

Scene.prototype.init = function (application) {
    
    CGFscene.prototype.init.call(this, application);

    this.setGlobalAmbientLight(0.25, 0.25, 0.25, 1.0);
    this.initCameras();
    this.initLights();
    this.initMaterials();

    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

    this.gl.clearDepth(100.0);
    this.gl.enable(this.gl.DEPTH_TEST);
	this.gl.enable(this.gl.CULL_FACE);
    this.gl.depthFunc(this.gl.LEQUAL);

    this.enableTextures(true);

    //Shaders
    this.myShader = new CGFshader(this.gl, dir_shaders+"myshader.vert", dir_shaders+"myshader.frag");
    this.myShader.setUniformsValues({normScale: 0.05});
    this.myShader.setUniformsValues({uSampler2: 1});

	this.axis = new CGFaxis(this);

    this.setUpdatePeriod(updatePeriod);
};

Scene.prototype.initLights = function () {

    this.lights[0].setPosition(0, 2, 0, 1);
    this.lights[0].setAmbient(0, 0, 0, 1);
    this.lights[0].setDiffuse(1, 1, 1, 1);
    this.lights[0].setSpecular(1, 1, 1, 1);
    this.lights[0].enable();
    this.lights[0].ena=true;
    this.lights[0].setVisible(true);
    this.lights[0].update();

    this.lights[1].setPosition(2, 2, 2, 1);
    this.lights[1].setAmbient(0, 0, 0, 1);
    this.lights[1].setDiffuse(1, 1, 1, 1);
    this.lights[1].setSpecular(1, 1, 1, 1);
    this.lights[1].enable();
    this.lights[1].ena=true;
    this.lights[1].setVisible(true);
    this.lights[1].update();
};

Scene.prototype.updateLights = function() {
    
    for (var i = 0; i < this.lights.length; i++) {
        if(this.lights[i].ena) this.lights[i].enable();
        else this.lights[i].disable();
    };

    for (i = 0; i < this.lights.length; i++)
        this.lights[i].update();
};

Scene.prototype.initCameras = function () {
    
    this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(15, 15, 15), vec3.fromValues(0, 0, 0));
};

Scene.prototype.initMaterials = function () {

    this.matSILVER = new CGFappearance(this);
    this.matSILVER.setAmbient(0.4, 0.4, 0.4, 1.0);
    this.matSILVER.setDiffuse(0.4, 0.4, 0.4, 1.0);
    this.matSILVER.setSpecular(0.3, 0.3, 0.3, 1.0);
    this.matSILVER.setShininess(10.0);

    this.matGOLD = new CGFappearance(this);
    this.matGOLD.setAmbient(0.5, 0.42, 0.05, 1.0);
    this.matGOLD.setDiffuse(0.5, 0.42, 0.05, 1.0);
    this.matGOLD.setSpecular(0.3, 0.3, 0.3, 1.0);
    this.matGOLD.setShininess(10.0);

    this.matBLACK = new CGFappearance(this);
    this.matBLACK.setAmbient(0.01, 0.01, 0.01, 1.0);
    this.matBLACK.setDiffuse(0.01, 0.01, 0.01, 1.0);
    this.matBLACK.setSpecular(0.2, 0.2, 0.2, 1.0);
    this.matBLACK.setShininess(5.0);

    this.matWHITE = new CGFappearance(this);
    this.matWHITE.setAmbient(0.99, 0.99, 0.99, 1.0);
    this.matWHITE.setDiffuse(0.99, 0.99, 0.99, 1.0);
    this.matWHITE.setSpecular(0.8, 0.8, 0.8, 1.0);
    this.matWHITE.setShininess(10.0);
};

Scene.prototype.display = function () {
	// ---- BEGIN Background, camera and axis setup
    	
	// Clear image and depth buffer everytime we update the scene
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

	// Initialize Model-View matrix as identity (no transformation
	this.updateProjectionMatrix();
    this.loadIdentity();

	// Apply transformations corresponding to the camera position relative to the origin
	this.applyViewMatrix();
	
    this.axis.display();

	// ---- END Background, camera and axis setup

    this.updateLights();

    this.matSILVER.apply();
};

Scene.prototype.update = function(currTime) {

    /**/
};