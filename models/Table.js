/**
 * Table
 * @constructor
 */
function Table(scene, app) {

 	CGFobject.call(this, scene);

 	this.app = app;

 	// Table's parts from other primitives
 	this.table_top_bottom = new MyRectangle(scene, -9, 9, 9, -9);
 	this.table_top_bottom.updateTex(1, 1);

 	this.table_sides = new MyRectangle(scene, -9, 1, 9, -1);
 	this.table_sides.updateTex(1, 1);

 	var controlpoints = [	// U = 0
						[ // V = 0..2;
							 [-4, -5.75, 2, 1],
							 [-2, 0, 0, 1],
							 [-2, 5.75, 0, 1]
							
						],
						// U = 1
						[ // V = 0..2
							 [0, -5.75, 2, 1],
							 [0, 0, -2, 1],
							 [0, 5.75, 0, 1]
						],
						// U = 2
						[ // V = 0..2
							 [4, -5.75, 2, 1],
							 [2, 0, 0, 1],
							 [2, 5.75, 0, 1]
						]
	];
    this.leg = new MyPatch(scene, 2, 20, 2, 20, controlpoints);

    this.base_bottom = new MyRectangle(scene, -4, 4, 4, -4);
 	this.base_bottom.updateTex(1, 1);

 	this.base_side = new MyRectangle(scene, -4, 0.25, 4, -0.25);
 	this.base_side.updateTex(1, 1);

 };

Table.prototype = Object.create(CGFobject.prototype);
Table.prototype.constructor = Table;

Table.prototype.setAppearance = function(app) {
	this.app = app; 
};

Table.prototype.display = function() {
	// Table's leg and top drawing
	//Table top
	this.scene.pushMatrix();
		this.scene.translate(0, -1, 0);
		this.scene.rotate(-90*degToRad, 1, 0, 0);
		this.app.apply();
		this.table_top_bottom.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		this.scene.translate(0, -3, 0);
		this.scene.rotate(-270*degToRad, 1, 0, 0);
		this.app.apply();
		this.table_top_bottom.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		this.scene.translate(0, -2 ,9);
		this.app.apply();
		this.table_sides.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		this.scene.translate(0, -2, -9);
		this.scene.rotate(180*degToRad, 0, 1, 0);
		this.app.apply();
		this.table_sides.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		this.scene.translate(9, -2, 0);
		this.scene.rotate(90*degToRad, 0, 1, 0);
		this.app.apply();
		this.table_sides.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		this.scene.translate(-9, -2, 0);
		this.scene.rotate(-90*degToRad, 0, 1, 0);
		this.app.apply();
		this.table_sides.display();
	this.scene.popMatrix();

	//leg

	this.scene.pushMatrix();
		this.scene.translate(0,-8.75,2);
		this.leg.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		this.scene.rotate(90*degToRad,0,1,0);
		this.scene.translate(0,-8.75,2);
		this.leg.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		this.scene.rotate(180*degToRad,0,1,0);
		this.scene.translate(0,-8.75,2);
		this.leg.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		this.scene.rotate(-90*degToRad,0,1,0);
		this.scene.translate(0,-8.75,2);
		this.leg.display();
	this.scene.popMatrix();

	//leg base

	this.scene.pushMatrix();
		this.scene.translate(0, -15, 0);
		this.scene.rotate(-270*degToRad, 1, 0, 0);
		this.app.apply();
		this.base_bottom.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		this.scene.translate(0, -14.75 ,4);
		this.app.apply();
		this.base_side.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		this.scene.translate(0, -14.75, -4);
		this.scene.rotate(180*degToRad, 0, 1, 0);
		this.app.apply();
		this.base_side.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		this.scene.translate(4, -14.75, 0);
		this.scene.rotate(90*degToRad, 0, 1, 0);
		this.app.apply();
		this.base_side.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		this.scene.translate(-4, -14.75, 0);
		this.scene.rotate(-90*degToRad, 0, 1, 0);
		this.app.apply();
		this.base_side.display();
	this.scene.popMatrix();
};



















