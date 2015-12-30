var degToRad = Math.PI/180.0;
/**
 * Bench
 * @constructor
*/
function Bench(scene, app) {
	CGFobject.call(this, scene);

	this.app = app;

	this.bench_cone = new MyCylinder(scene, 10, 0, 3, 10, 100);
	this.bench_top = new MyCircle(scene, 3, 100);
};

Bench.prototype = Object.create(CGFobject.prototype);
Bench.prototype.constructor = Bench;

Bench.prototype.setAppearance = function(app) {
	this.app = app;
};

Bench.prototype.display = function() {
	//First scene bench
	this.scene.pushMatrix();
		this.scene.rotate(-90*degToRad, 1, 0, 0);
		this.app.apply();
		this.bench_cone.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		this.scene.translate(0, 10, 0);
		this.scene.rotate(-90*degToRad, 1, 0, 0);
		this.app.apply();
		this.bench_top.display();
	this.scene.popMatrix();

};