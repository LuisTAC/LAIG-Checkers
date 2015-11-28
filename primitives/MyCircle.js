/**
 * MyCircle
 * @constructor
 */

var degToRad = Math.PI / 180.0;

function MyCircle(scene, slices) {
 	CGFobject.call(this,scene);

 	this.slices=slices;

 	this.initBuffers();
};

MyCircle.prototype = Object.create(CGFobject.prototype);
MyCircle.prototype.constructor = MyCircle;

MyCircle.prototype.initBuffers = function() {
 	this.vertices = [];
 	this.indices = [];
 	this.normals = [];
 	this.texCoords = [];

 	this.vertices.push(0, 0, 0);
 	this.normals.push(0, 0, 1);

 	var angle = (360/this.slices) * degToRad;

 	for(var i=0;i<this.slices;i++) {
 		this.vertices.push(Math.cos(i*angle), Math.sin(i*angle), 0);
 		this.normals.push(0, 0, 1);
 	}

 	for(var i=0;i<this.slices-1;i++) {
 		this.indices.push(0,i+1,i+2);
 	}

 	this.indices.push(0,this.slices,1);


 	this.primitiveType = this.scene.gl.TRIANGLES;

 	this.texCoords.push(0.5, 0.5);

 	for(var i=0;i<this.slices;i++) {
 		this.texCoords.push(0.5+Math.cos(i*angle)*0.5, 1-(0.5+Math.sin(i*angle)*0.5));
 	}


 	this.initGLBuffers();
};
