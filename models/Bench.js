/**
 * Bench
 * @constructor
*/
function Bench(scene, app) {
	CGFobject.call(this, scene);

	this.app = app;

	var controlpoints = [	// U = 0
						[ // V = 0..2;
							 [-2, -4.5, 1, 1],
							 [-0.5, 0, -0.5, 1],
							 [-3, 4.5, 2, 1]
							
						],
						// U = 1
						[ // V = 0..2
							 [0, -4.5, 1, 1],
							 [0, 0, -0.5, 1],
							 [0, 4.5, 2, 1]
						],
						// U = 2
						[ // V = 0..2
							 [2, -4.5, 1, 1],
							 [0.5, 0, -0.5, 1],
							 [3, 4.5, 2, 1]
						]
	];
    this.side = new MyPatch(scene, 2, 20, 2, 20, controlpoints);

    this.base_bottom = new MyRectangle(scene, -2, 2, 2, -2);
 	this.base_bottom.updateTex(1, 1);

 	this.base_side = new MyRectangle(scene, -2, 0.25, 2, -0.25);
 	this.base_side.updateTex(1, 1);

 	this.seat_top = new MyRectangle(scene, -2.75, 2.75, 2.75, -2.75);
 	this.seat_top.updateTex(1, 1);

 	var controlpoints2 = [	// U = 0
						[ // V = 0..2;
							 [-3, -0.25, 1, 1],
							 [-2.75, 0.15, 0.75, 1]
							
						],
						// U = 1
						[ // V = 0..2
							 [3, -0.25, 1, 1],
							 [2.75, 0.15, 0.75, 1]
						]
	];
    this.seat_side = new MyPatch(scene, 1, 20, 1, 20, controlpoints2);

};

Bench.prototype = Object.create(CGFobject.prototype);
Bench.prototype.constructor = Bench;

Bench.prototype.setAppearance = function(app) {
	this.app = app;
};

Bench.prototype.display = function() {
	//First scene bench
	
	this.scene.pushMatrix();
		this.scene.translate(0,0,1);
		this.app.apply();
		this.side.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		this.scene.rotate(90*degToRad,0,1,0);
		this.scene.translate(0,0,1);
		this.app.apply();
		this.side.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		this.scene.rotate(180*degToRad,0,1,0);
		this.scene.translate(0,0,1);
		this.app.apply();
		this.side.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		this.scene.rotate(-90*degToRad,0,1,0);
		this.scene.translate(0,0,1);
		this.app.apply();
		this.side.display();
	this.scene.popMatrix();

	//base

	this.scene.pushMatrix();
		this.scene.translate(0, -5, 0);
		this.scene.rotate(-270*degToRad, 1, 0, 0);
		this.app.apply();
		this.base_bottom.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		this.scene.translate(0, -4.75 ,2);
		this.app.apply();
		this.base_side.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		this.scene.translate(0, -4.75, -2);
		this.scene.rotate(180*degToRad, 0, 1, 0);
		this.app.apply();
		this.base_side.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		this.scene.translate(2, -4.75, 0);
		this.scene.rotate(90*degToRad, 0, 1, 0);
		this.app.apply();
		this.base_side.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		this.scene.translate(-2, -4.75, 0);
		this.scene.rotate(-90*degToRad, 0, 1, 0);
		this.app.apply();
		this.base_side.display();
	this.scene.popMatrix();

	//seat

	this.scene.pushMatrix();
		this.scene.translate(0, 4.9, 0);
		this.scene.rotate(-90*degToRad, 1, 0, 0);
		this.app.apply();
		this.seat_top.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		this.scene.translate(0, 4.75, 2);
		this.app.apply();
		this.seat_side.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		this.scene.rotate(90*degToRad,0,1,0);
		this.scene.translate(0, 4.75, 2);
		this.app.apply();
		this.seat_side.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		this.scene.rotate(180*degToRad,0,1,0);
		this.scene.translate(0, 4.75, 2);
		this.app.apply();
		this.seat_side.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		this.scene.rotate(-90*degToRad,0,1,0);
		this.scene.translate(0, 4.75, 2);
		this.app.apply();
		this.seat_side.display();
	this.scene.popMatrix();
};