/**
 * MyCylinder
 * @constructor
 */

function MyCylinder(scene, height, bottom_r, top_r, stacks, slices) {
 	CGFobject.call(this,scene);
	
	this.height = height;
	this.bottom_r = bottom_r;
	this.top_r = top_r;
	this.stacks = stacks;
	this.slices = slices;

 	this.initBuffers();
};

MyCylinder.prototype = Object.create(CGFobject.prototype);
MyCylinder.prototype.constructor = MyCylinder;

MyCylinder.prototype.initBuffers = function() {

	var angle = (360/this.slices) * degToRad;

 	this.vertices = [];
 	this.normals = [];
 	this.indices = [];

 	var radius_diff = this.top_r - this.bottom_r;
 	var patch_height = radius_diff/this.stacks;

 	var radius = parseFloat(this.bottom_r);

 	for (var j=0; j<=this.stacks; j++) {
	 	for (var i=0; i<this.slices; i++) {
	 		this.vertices.push(radius*Math.cos(i*angle), radius*Math.sin(i*angle), (this.height*j/this.stacks));
	 		this.normals.push(radius*Math.cos(i*angle), radius*Math.sin(i*angle), 0);
	 	};
	 	radius+=patch_height;
 	};

 	for (var j=0; j<this.stacks; j++) {
	 	for (var i=0; i<this.slices; i++) {
	 		if(i==this.slices-1)
	 		{
	 			this.indices.push(j*this.slices+i, j*this.slices, (j+1)*this.slices+i);
	 			this.indices.push(j*this.slices, (j+1)*this.slices, (j+1)*this.slices+i);
	 		}
	 		else
	 		{
	 			this.indices.push(j*this.slices+i, j*this.slices+i+1, (j+1)*this.slices+i);
	 			this.indices.push(j*this.slices+i+1, (j+1)*this.slices+i+1, (j+1)*this.slices+i);
	 		}
	 	};
 	};


 	var patchS=1/this.slices;
 	var patchT=1/this.stacks;

 	this.texCoords = [];

 	for (var j=0; j<this.stacks; j++) {
	 	for (var i=0; i<this.slices; i++) {
	 		this.texCoords.push(i*patchS,j*patchT);

	 		this.texCoords.push(i*patchS,(j+1)*patchT);
	 	};
 	};


 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
};

MyCylinder.prototype.updateTex=function(S,T)
{};