function MyPatch(scene, orderU, partsU, orderV, partsV, controlpoints) {
	this.scene = scene;
	this.orderU = orderU;
	this.orderV = orderV;
	this.controlpoints = controlpoints;

    var partsU = partsU || 50;
    var partsV = partsV || 50;

	this.knots_a = [];

    for(var i = 0; i <= orderU; i++){
    	this.knots_a.push(0);
    }

    for(var i = 0; i <= orderU; i++){
    	this.knots_a.push(1);
    }

    this.knots_b = [];

    for(var i = 0; i <= orderV; i++){
    	this.knots_b.push(0);
    }

    for(var i = 0; i <= orderV; i++){
    	this.knots_b.push(1);
    }

    var surf = new CGFnurbsSurface(orderU, orderV, this.knots_a, this.knots_b, controlpoints);

    getSurfacePoint = function(u, v) {
		return surf.getPoint(u, v);
	};

	this.obj = new CGFnurbsObject(scene, getSurfacePoint, partsU, partsV);
};

MyPatch.prototype = Object.create(CGFobject.prototype);
MyPatch.prototype.constructor = MyPatch;

MyPatch.prototype.display = function () {
	
   	this.obj.display();
};

MyPatch.prototype.updateTex = function () {};