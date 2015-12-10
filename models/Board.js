/**
 * Board
 * @constructor
 */
function Board(scene, matWOOD, matWHITE, matBLACK) {
 	CGFobject.call(this,scene);
	
 	this.scene=scene;
 	this.matWOOD=matWOOD;
 	this.matWHITE=matWHITE;
 	this.matBLACK=matBLACK;

	this.side = new MyRectangle(scene,-5.65,0.5,5.65,-0.5)

	this.rectangle = new MyRectangle(scene,-5.15,5.15,5.15,-5.15);
	this.bottom = new MyRectangle(scene,-5.65,5.65,5.65,-5.65);
	
	var controlpoints = [	// U = 0
						[ // V = 0..2;
							 [-0.25, 0.0, -0.5, 1],
							 [0.15,  0.25, -0.5, 1],
							 [0.25,  0.0, -0.5, 1]
							
						],
						// U = 1
						[ // V = 0..2
							 [-0.25, 0.0, 0.5, 1],
							 [0.15, 0.25, 0.5, 1],
							 [0.25, 0.0, 0.5, 1]
						]
	];
    this.border = new MyPatch(scene, 1, 20, 2, 20, controlpoints);
	
	var controlpoints2 = [	// U = 0
						[ // V = 0..2;
							 [-0.25, 0.0, -0.25, 1],
							 [0.15,  0.25, -0.25, 1],
							 [0.25,  0.0, -0.25, 1]
						],
						// U = 1
						[ // V = 0..2;
							 [-0.25, 0.25, 0.15, 1],
							 [0.15, 0.25, 0.15, 1],
							 [0.25, 0.0, 0.15, 1]
						],
						// U = 2
						[ // V = 0..2;
							 [-0.25, 0.0, 0.25, 1],
							 [0.15, 0.0, 0.25, 1],
							 [0.25, 0.0, 0.25, 1]
						]
	];
    this.corner = new MyPatch(scene, 2, 20, 2, 20, controlpoints2);

};

Board.prototype = Object.create(CGFobject.prototype);
Board.prototype.constructor = Board;

Board.prototype.display = function() {

 	this.scene.pushMatrix();
 		this.scene.translate(0,-0.5,5.65);
 		this.matWOOD.apply();
 		this.side.display();
 	this.scene.popMatrix();

 	this.scene.pushMatrix();
 		this.scene.rotate(90*degToRad,0,1,0);
 		this.scene.translate(0,-0.5,5.65);
 		this.matWOOD.apply();
 		this.side.display();
 	this.scene.popMatrix();

 	this.scene.pushMatrix();
 		this.scene.rotate(180*degToRad,0,1,0);
 		this.scene.translate(0,-0.5,5.65);
 		this.matWOOD.apply();
 		this.side.display();
 	this.scene.popMatrix();

 	this.scene.pushMatrix();
 		this.scene.rotate(-90*degToRad,0,1,0);
 		this.scene.translate(0,-0.5,5.65);
 		this.matWOOD.apply();
 		this.side.display();
 	this.scene.popMatrix();

 	this.scene.pushMatrix();
 		this.scene.rotate(-90*degToRad,1,0,0);
 		this.scene.matGOLD.apply();
 		this.rectangle.display();
 	this.scene.popMatrix();
 	
 	this.scene.pushMatrix();
 		this.scene.translate(0,-1,0);
 		this.scene.rotate(90*degToRad,1,0,0);
 		this.scene.matWOOD.apply();
 		this.bottom.display();
 	this.scene.popMatrix();

 	this.scene.pushMatrix();
 		this.scene.translate(5.4,0,0);
 		this.scene.scale(1,1,10.3);
 		this.scene.matWOOD.apply();
 		this.border.display();
 	this.scene.popMatrix();

 	this.scene.pushMatrix();
 		this.scene.rotate(90*degToRad,0,1,0);
 		this.scene.translate(5.4,0,0);
 		this.scene.scale(1,1,10.3);
 		this.scene.matWOOD.apply();
 		this.border.display();
 	this.scene.popMatrix();

 	this.scene.pushMatrix();
 		this.scene.rotate(180*degToRad,0,1,0);
 		this.scene.translate(5.4,0,0);
 		this.scene.scale(1,1,10.3);
 		this.scene.matWOOD.apply();
 		this.border.display();
 	this.scene.popMatrix();

 	this.scene.pushMatrix();
 		this.scene.rotate(-90*degToRad,0,1,0);
 		this.scene.translate(5.4,0,0);
 		this.scene.scale(1,1,10.3);
 		this.scene.matWOOD.apply();
 		this.border.display();
 	this.scene.popMatrix();

 	this.scene.pushMatrix();
 		this.scene.translate(5.4,0,5.4);
 		this.scene.matWOOD.apply();
 		this.corner.display();
 	this.scene.popMatrix();

 	this.scene.pushMatrix();
 		this.scene.rotate(90*degToRad,0,1,0);
 		this.scene.translate(5.4,0,5.4);
 		this.scene.matWOOD.apply();
 		this.corner.display();
 	this.scene.popMatrix();

 	this.scene.pushMatrix();
 		this.scene.rotate(180*degToRad,0,1,0);
 		this.scene.translate(5.4,0,5.4);
 		this.scene.matWOOD.apply();
 		this.corner.display();
 	this.scene.popMatrix();

 	this.scene.pushMatrix();
 		this.scene.rotate(-90*degToRad,0,1,0);
 		this.scene.translate(5.4,0,5.4);
 		this.scene.matWOOD.apply();
 		this.corner.display();
 	this.scene.popMatrix();
};