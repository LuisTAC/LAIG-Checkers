/**
 * Timer
 * @constructor
 */
function Timer(scene, matWOOD, fontText) {
 	CGFobject.call(this,scene);
	
 	this.scene=scene;
 	this.matWOOD=matWOOD;

	this.sideTB = new MyRectangle(scene,-3,0.5,3,-0.5);
	this.sideTB.updateTex(1,1);
	this.sideLR = new MyRectangle(scene,-1.75,0.5,1.75,-0.5);
	this.sideLR.updateTex(1,1);
	this.borderTB = new MyRectangle(scene,-3,0.5,3,-0.5);
	this.borderTB.updateTex(1,1);
	this.borderLR = new MyRectangle(scene,-0.75,0.25,0.75,-0.25);
	this.borderLR.updateTex(1,1);
	this.bottom = new MyRectangle(scene,-3,1.75,3,-1.75);
	this.bottom.updateTex(1,1);

	this.plane = new MyPlane(scene,5);

	this.appearance = scene.defaultApp;
	this.fontText = fontText;

	this.minutes=0;
	this.seconds=0;
	this.timeBeg=null;
	this.paused=false;
};

Timer.prototype = Object.create(CGFobject.prototype);
Timer.prototype.constructor = Timer;

Timer.prototype.display = function () {

	this.scene.pushMatrix();

		this.scene.rotate(90*degToRad,1,0,0);

 		this.scene.pushMatrix(); //BOTTOM
 			this.scene.translate(0,-0.5,2);
 			this.matWOOD.apply();
 			this.sideTB.display();
 		this.scene.popMatrix();

 		this.scene.pushMatrix(); //LEFT
 			this.scene.translate(0,0,0.25);
 			this.scene.rotate(90*degToRad,0,1,0);
 			this.scene.translate(0,-0.5,3);
 			this.matWOOD.apply();
 			this.sideLR.display();
 		this.scene.popMatrix();

 		this.scene.pushMatrix(); //TOP
 			this.scene.rotate(180*degToRad,0,1,0);
 			this.scene.translate(0,-0.5,1.5);
 			this.matWOOD.apply();
 			this.sideTB.display();
 		this.scene.popMatrix();

 		this.scene.pushMatrix(); //RIGHT
 			this.scene.translate(0,0,0.25);
 			this.scene.rotate(-90*degToRad,0,1,0);
 			this.scene.translate(0,-0.5,3);
 			this.matWOOD.apply();
 			this.sideLR.display();
 		this.scene.popMatrix();

 		this.scene.pushMatrix(); //BACK
 			this.scene.translate(0,-1,0.25);
 			this.scene.rotate(90*degToRad,1,0,0);
 			this.matWOOD.apply();
 			this.bottom.display();
 		this.scene.popMatrix();

 		//INSIDE

 		this.scene.pushMatrix(); //TOP
 			this.scene.translate(0,-0.5,-0.5);
 			this.scene.scale(0.8325,1,1);
 			this.matWOOD.apply();
 			this.sideTB.display();
 		this.scene.popMatrix();

 		this.scene.pushMatrix(); //RIGHT
 			this.scene.rotate(90*degToRad,0,1,0);
 			this.scene.translate(-0.25,-0.5,-2.5);
 			this.scene.scale(0.43,1,1);
 			this.matWOOD.apply();
 			this.sideLR.display();
 		this.scene.popMatrix();

 		this.scene.pushMatrix(); //BOTTOM
 			this.scene.rotate(180*degToRad,0,1,0);
 			this.scene.translate(0,-0.5,-1);
 			this.scene.scale(0.8325,1,1);
 			this.matWOOD.apply();
 			this.sideTB.display();
 		this.scene.popMatrix();

 		this.scene.pushMatrix(); //LEFT
 			this.scene.rotate(-90*degToRad,0,1,0);
 			this.scene.translate(0.25,-0.5,-2.5);
 			this.scene.scale(0.43,1,1);	
 			this.matWOOD.apply();
 			this.sideLR.display();
 		this.scene.popMatrix();

 		//BORDERS

		this.scene.pushMatrix(); //BOTTOM
 			this.scene.translate(0,0,1.5);
 			this.scene.rotate(-90*degToRad,1,0,0);
 			this.matWOOD.apply();
 			this.borderTB.display();
 		this.scene.popMatrix();

 		this.scene.pushMatrix(); //RIGHT
 			this.scene.translate(0,0,0.25);
 			this.scene.rotate(90*degToRad,0,1,0);
 			this.scene.translate(0,0,2.75);
 			this.scene.rotate(-90*degToRad,1,0,0);
 			this.matWOOD.apply();
 			this.borderLR.display();
 		this.scene.popMatrix();

 		this.scene.pushMatrix(); //TOP
 			this.scene.rotate(180*degToRad,0,1,0);
 			this.scene.translate(0,0,1);
 			this.scene.rotate(-90*degToRad,1,0,0);
 			this.matWOOD.apply();
 			this.borderTB.display();
 		this.scene.popMatrix();

 		this.scene.pushMatrix(); //LEFT
 			this.scene.translate(0,0,0.25);
 			this.scene.rotate(-90*degToRad,0,1,0);
 			this.scene.translate(0,0,2.75);
 			this.scene.rotate(-90*degToRad,1,0,0);
 			this.matWOOD.apply();
 			this.borderLR.display();
 		this.scene.popMatrix();

 		//TEXT
 		this.appearance.setTexture(this.fontText);
 		if(this.paused) this.displayPaused();
 		else this.displayTime();

 	this.scene.popMatrix();
};

Timer.prototype.displayTime = function () {
	
	this.scene.pushMatrix();
		this.scene.setActiveShaderSimple(this.scene.textShader);
		this.appearance.apply();

		var decM = Math.floor(this.minutes/10);
		var uniM = this.minutes%10;

		var decS = Math.floor(this.seconds/10);
		var uniS = this.seconds%10;

		this.scene.translate(0,-0.2,0.25);

		this.scene.activeShader.setUniformsValues({'charCoords': [decM,5]});
		this.scene.pushMatrix();
			this.scene.translate(-2,0,0);
			this.scene.rotate(-90*degToRad,0,1,0);
			this.scene.scale(0.75,1,0.5);
			this.plane.display();
		this.scene.popMatrix();

		this.scene.activeShader.setUniformsValues({'charCoords': [uniM,5]});
		this.scene.pushMatrix();
			this.scene.translate(-1,0,0);
			this.scene.rotate(-90*degToRad,0,1,0);
			this.scene.scale(0.75,1,0.5);
			this.plane.display();
		this.scene.popMatrix();

		this.scene.activeShader.setUniformsValues({'charCoords': [5,3]});
		this.scene.pushMatrix();
			this.scene.rotate(-90*degToRad,0,1,0);
			this.scene.scale(0.75,1,0.5);
			this.plane.display();
		this.scene.popMatrix();

		this.scene.activeShader.setUniformsValues({'charCoords': [decS,5]});
		this.scene.pushMatrix();
			this.scene.translate(1,0,0);
			this.scene.rotate(-90*degToRad,0,1,0);
			this.scene.scale(0.75,1,0.5);
			this.plane.display();
		this.scene.popMatrix();

		this.scene.activeShader.setUniformsValues({'charCoords': [uniS,5]});
		this.scene.pushMatrix();
			this.scene.translate(2,0,0);
			this.scene.rotate(-90*degToRad,0,1,0);
			this.scene.scale(0.75,1,0.5);
			this.plane.display();
		this.scene.popMatrix();

		this.scene.setActiveShaderSimple(this.scene.defaultShader);
	this.scene.popMatrix();
};

Timer.prototype.displayPaused = function () {
	
	this.scene.pushMatrix();
		this.scene.setActiveShaderSimple(this.scene.textShader);
		this.appearance.apply();

		this.scene.translate(0,-0.2,0.25);

		this.scene.activeShader.setUniformsValues({'charCoords': [5,1]});
		this.scene.pushMatrix();
			this.scene.translate(-2,0,0);
			this.scene.rotate(-90*degToRad,0,1,0);
			this.scene.scale(0.75,1,0.5);
			this.plane.display();
		this.scene.popMatrix();

		this.scene.activeShader.setUniformsValues({'charCoords': [0,0]});
		this.scene.pushMatrix();
			this.scene.translate(-1,0,0);
			this.scene.rotate(-90*degToRad,0,1,0);
			this.scene.scale(0.75,1,0.5);
			this.plane.display();
		this.scene.popMatrix();

		this.scene.activeShader.setUniformsValues({'charCoords': [0,2]});
		this.scene.pushMatrix();
			this.scene.rotate(-90*degToRad,0,1,0);
			this.scene.scale(0.75,1,0.5);
			this.plane.display();
		this.scene.popMatrix();

		this.scene.activeShader.setUniformsValues({'charCoords': [8,1]});
		this.scene.pushMatrix();
			this.scene.translate(1,0,0);
			this.scene.rotate(-90*degToRad,0,1,0);
			this.scene.scale(0.75,1,0.5);
			this.plane.display();
		this.scene.popMatrix();

		this.scene.activeShader.setUniformsValues({'charCoords': [4,0]});
		this.scene.pushMatrix();
			this.scene.translate(2,0,0);
			this.scene.rotate(-90*degToRad,0,1,0);
			this.scene.scale(0.75,1,0.5);
			this.plane.display();
		this.scene.popMatrix();

		this.scene.setActiveShaderSimple(this.scene.defaultShader);
	this.scene.popMatrix();
};

Timer.prototype.setMatWOOD = function (mat) {

	this.matWOOD = mat;
};

Timer.prototype.setFont = function (font) {

	this.fontText = font;
	this.appearance.setTexture(font);
};

Timer.prototype.updateTime = function (currTime) {

	var time_since_start = currTime - this.timeBeg;
	var total_seconds = Math.floor(time_since_start/1000);
	this.minutes=Math.floor(total_seconds/60);
	this.seconds=Math.floor(total_seconds%60);
};

Timer.prototype.setPaused = function (bool) {

	this.paused=bool;
};