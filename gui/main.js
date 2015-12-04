//From https://github.com/EvanHahn/ScriptInclude
include=function(){function f(){var a=this.readyState;(!a||/ded|te/.test(a))&&(c--,!c&&e&&d())}var a=arguments,b=document,c=a.length,d=a[c-1],e=d.call;e&&c--;for(var g,h=0;c>h;h++)g=b.createElement("script"),g.src=arguments[h],g.async=!0,g.onload=g.onerror=g.onreadystatechange=f,(b.head||b.getElementsByTagName("head")[0]).appendChild(g)};
serialInclude=function(a){var b=console,c=serialInclude.l;if(a.length>0)c.splice(0,0,a);else b.log("Done!");if(c.length>0){if(c[0].length>1){var d=c[0].splice(0,1);b.log("Loading "+d+"...");include(d,function(){serialInclude([]);});}else{var e=c[0][0];c.splice(0,1);e.call();};}else b.log("Finished.");};serialInclude.l=new Array();

dir_lib='../lib/';
dir_gui='../gui/';
dir_connection='../connection/';
dir_logic='../logic/';
dir_models='../models/';
dir_primitives='../primitives/';
dir_resources='../resources/';
dir_shaders='../shaders/';

files_lib=[dir_lib+'CGF.js'];
files_gui=[dir_gui+'Scene.js'];
files_connection=[];
files_logic=[];
files_models=[dir_models+'Piece.js', dir_models+'Board.js'];
files_primitives=[dir_primitives+'MyRectangle.js', dir_primitives+'MyCylinder.js', dir_primitives+'MyTriangle.js', dir_primitives+'MySemiSphere.js', dir_primitives+'MySphere.js', dir_primitives+'MyPatch.js', dir_primitives+'MyPlane.js', dir_primitives+'MyTerrain.js', dir_primitives+'MyCircle.js'];
files_resources=[];
files_shaders=[];

files_res=files_lib.concat(files_gui);
files_res=files_res.concat(files_connection);
files_res=files_res.concat(files_logic);
files_res=files_res.concat(files_models);
files_res=files_res.concat(files_primitives);
files_res=files_res.concat(files_resources);
files_res=files_res.concat(files_shaders);

serialInclude(files_res.concat([
main=function()
{
    // Standard application, scene and interface setup
    var app = new CGFapplication(document.body);
    var myScene = new Scene();
    myInterface = new CGFinterface();

    app.init();

    app.setScene(myScene);
    app.setInterface(myInterface);

    myInterface.setActiveCamera(myScene.camera);
    
    // start
    app.run();
}

]));