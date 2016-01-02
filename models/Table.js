var degToRad = Math.PI/180.0;

/**
 * Table
 * @constructor
 */
function Table(scene, app) {

 	CGFobject.call(this, scene);

 	this.app = app;

 	// Table's parts from other primitives
 	this.table_feet = new MyCylinder(scene, 10, 2, 2, 10, 100);
 	this.table_top_bottom = new MyRectangle(scene, -9, 9, 9, -9);
 	this.table_top_bottom.updateTex(1, 1);

 	this.table_sides = new MyRectangle(scene, -9, 1, 9, -1);
 	this.table_sides.updateTex(1, 1);

 	this.table_bottom = new MyCylinder(scene, 2, 2, 3, 10, 100);
 	this.table_base = new MyCylinder(scene, 0.5, 3, 3, 10, 100);
 	this.table_circle = new MyCircle(scene, 3, 100);

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

	//Table feet
	this.scene.pushMatrix();
		this.scene.translate(0, -13, 0);
		this.scene.rotate(-90*degToRad, 1, 0, 0);
		this.app.apply();
		this.table_feet.display();
	this.scene.popMatrix();

	//Table bottom
	this.scene.pushMatrix();
		this.scene.translate(0, -13, 0);
		this.scene.rotate(90*degToRad, 1, 0, 0);
		this.app.apply();
		this.table_bottom.display();
	this.scene.popMatrix();

	//Table base
	this.scene.pushMatrix();
		this.scene.translate(0, -15, 0);
		this.scene.rotate(90*degToRad, 1, 0, 0);
		this.app.apply();
		this.table_base.display();
	this.scene.popMatrix();

	//Table base circle
	this.scene.pushMatrix();
		this.scene.translate(0, -15.5, 0);
		this.scene.rotate(90*degToRad, 1, 0, 0);
		this.app.apply();
		this.table_circle.display();
	this.scene.popMatrix();

};



















