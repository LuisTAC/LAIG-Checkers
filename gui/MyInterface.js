/**
 * MyInterface
 * @constructor
 */
function MyInterface() {
	//call CGFinterface constructor 
	CGFinterface.call(this);
};

MyInterface.prototype = Object.create(CGFinterface.prototype);
MyInterface.prototype.constructor = MyInterface;

/**
 * init
 * @param {CGFapplication} application
 */
MyInterface.prototype.init = function(application) {
	// call CGFinterface init
	CGFinterface.prototype.init.call(this, application);
	
	// init GUI. For more information on the methods, check:
	//  http://workshop.chromeexperiments.com/examples/gui
	this.gui = new dat.GUI();
	this.gui.add(this.scene,"freeCam").name("Free Camera");
	dat.GUI.toggleHide()

	return true;
};

/**
 * processKeyDown
 * @param event {Event}
 */
MyInterface.prototype.processKeyDown = function(event) {
	//CGFinterface.prototype.processKeyDown.call(this,event);

	var num = event.keyCode - 49;
	if(num<0 || num>7) num = event.keyCode - 97;
	if(num<0 || num>7) return;
	
	this.scene.lights[num].ena = !(this.scene.lights[num].ena);
	//this.scene.lights[num].setVisible(this.scene.lights[num].ena);
	console.log("LIGHT["+num+"] ("+this.scene.graph.lights[num].id+") toggled")

};

