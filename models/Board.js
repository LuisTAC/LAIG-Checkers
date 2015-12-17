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

	this.side = new MyRectangle(scene,-5.7,0.5,5.7,-0.5)

	this.rectangle = new MyRectangle(scene,-5.15,5.15,5.15,-5.15);
	this.bottom = new MyRectangle(scene,-5.7,5.7,5.7,-5.7);
	
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

    this.cell = new MyRectangle(scene,-0.65,0.65,0.65,-0.65);
    this.cells = [];
    for(i=0;i<64; i++) this.cells.push(new MyRectangle(scene,-0.65,0.65,0.65,-0.65));
};

Board.prototype = Object.create(CGFobject.prototype);
Board.prototype.constructor = Board;

Board.prototype.display = function () {

 	this.scene.pushMatrix();
 		this.scene.translate(0,-0.5,5.7);
 		this.matWOOD.apply();
 		this.side.display();
 	this.scene.popMatrix();

 	this.scene.pushMatrix();
 		this.scene.rotate(90*degToRad,0,1,0);
 		this.scene.translate(0,-0.5,5.7);
 		this.matWOOD.apply();
 		this.side.display();
 	this.scene.popMatrix();

 	this.scene.pushMatrix();
 		this.scene.rotate(180*degToRad,0,1,0);
 		this.scene.translate(0,-0.5,5.7);
 		this.matWOOD.apply();
 		this.side.display();
 	this.scene.popMatrix();

 	this.scene.pushMatrix();
 		this.scene.rotate(-90*degToRad,0,1,0);
 		this.scene.translate(0,-0.5,5.7);
 		this.matWOOD.apply();
 		this.side.display();
 	this.scene.popMatrix();

 	for(i=0;i<8;i++)
 	{
 		for(j=0;j<8;j++)
 		{
			this.scene.pushMatrix();
 				this.scene.translate(i*1.30-(1.30*7)/2,0,(1.30*7)/2-j*1.30);
 				this.scene.rotate(-90*degToRad,1,0,0);
 				if((i%2==0 && j%2==0) || (i%2!=0 && j%2!=0) ) this.matWHITE.apply();
 				else this.matBLACK.apply();
 				this.scene.registerForPick(i*8+j+1, this.cells[i*8+j]);
 				this.cells[i*8+j].display();
 			this.scene.popMatrix();
 		}
 	}

 	this.scene.pushMatrix();
 		this.scene.translate(0,-1,0);
 		this.scene.rotate(90*degToRad,1,0,0);
 		this.matWOOD.apply();
 		this.bottom.display();
 	this.scene.popMatrix();

 	this.scene.pushMatrix();
 		this.scene.translate(5.45,0,0);
 		this.scene.scale(1,1,10.4);
 		this.matWOOD.apply();
 		this.border.display();
 	this.scene.popMatrix();

 	this.scene.pushMatrix();
 		this.scene.rotate(90*degToRad,0,1,0);
 		this.scene.translate(5.45,0,0);
 		this.scene.scale(1,1,10.4);
 		this.matWOOD.apply();
 		this.border.display();
 	this.scene.popMatrix();

 	this.scene.pushMatrix();
 		this.scene.rotate(180*degToRad,0,1,0);
 		this.scene.translate(5.45,0,0);
 		this.scene.scale(1,1,10.4);
 		this.matWOOD.apply();
 		this.border.display();
 	this.scene.popMatrix();

 	this.scene.pushMatrix();
 		this.scene.rotate(-90*degToRad,0,1,0);
 		this.scene.translate(5.45,0,0);
 		this.scene.scale(1,1,10.4);
 		this.matWOOD.apply();
 		this.border.display();
 	this.scene.popMatrix();

 	this.scene.pushMatrix();
 		this.scene.translate(5.45,0,5.45);
 		this.matWOOD.apply();
 		this.corner.display();
 	this.scene.popMatrix();

 	this.scene.pushMatrix();
 		this.scene.rotate(90*degToRad,0,1,0);
 		this.scene.translate(5.45,0,5.45);
 		this.matWOOD.apply();
 		this.corner.display();
 	this.scene.popMatrix();

 	this.scene.pushMatrix();
 		this.scene.rotate(180*degToRad,0,1,0);
 		this.scene.translate(5.45,0,5.45);
 		this.matWOOD.apply();
 		this.corner.display();
 	this.scene.popMatrix();

 	this.scene.pushMatrix();
 		this.scene.rotate(-90*degToRad,0,1,0);
 		this.scene.translate(5.45,0,5.45);
 		this.matWOOD.apply();
 		this.corner.display();
 	this.scene.popMatrix();
 	/**/
};

Board.prototype.setMatWOOD = function (mat) {

	this.matWOOD = mat;
}