var degToRad = Math.PI/180.0;
var updatePeriod = 50;

function Scene() {
    
    CGFscene.call(this);
};

Scene.prototype = Object.create(CGFscene.prototype);
Scene.prototype.constructor = Scene;

//Init

Scene.prototype.init = function (application) {
    
    CGFscene.prototype.init.call(this, application);

    this.setGlobalAmbientLight(0.5, 0.5, 0.5, 1.0);
    this.initCameras();
    this.initLights();
    this.initMaterials();
    this.initPicking();

    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

    this.gl.clearDepth(100.0);
    this.gl.enable(this.gl.DEPTH_TEST);
	this.gl.enable(this.gl.CULL_FACE);
    this.gl.depthFunc(this.gl.LEQUAL);

    this.enableTextures(true);

    //Shaders
    this.myShader = new CGFshader(this.gl, dir_shaders+"myshader.vert", dir_shaders+"myshader.frag");
    this.myShader.setUniformsValues({normScale: 0.05});
    this.myShader.setUniformsValues({uSampler2: 1});

    this.textShader=new CGFshader(this.gl, dir_shaders+"font.vert", dir_shaders+"font.frag");
    this.textShader.setUniformsValues({'dims': [10, 6]});

	this.axis = new CGFaxis(this);

    this.setUpdatePeriod(updatePeriod);

    //skins
    this.skin=1;

    //models

    //undo
    var state = [
    '##########',
    '# B B B B#',
    '#B B B B #',
    '# B B B B#',
    '#        #',
    '#        #',
    '#W W W W #',
    '# W W W W#',
    '#W W W W #',
    '##########',
    'VALID',
    'w'];

    this.states = [];
    this.states.push(state);

    //film
    this.film_playing = false;
    this.film_delay = 2;
    this.counter = 0;

    //pieces
    this.pieces = [];
    //B
    this.pieces.push(new Piece(this, 5, 100, 2, 1, 'B'));
    this.pieces.push(new Piece(this, 5, 100, 4, 1, 'B'));
    this.pieces.push(new Piece(this, 5, 100, 6, 1, 'B'));
    this.pieces.push(new Piece(this, 5, 100, 8, 1, 'B'));
    this.pieces.push(new Piece(this, 5, 100, 1, 2, 'B'));
    this.pieces.push(new Piece(this, 5, 100, 3, 2, 'B'));
    this.pieces.push(new Piece(this, 5, 100, 5, 2, 'B'));
    this.pieces.push(new Piece(this, 5, 100, 7, 2, 'B'));
    this.pieces.push(new Piece(this, 5, 100, 2, 3, 'B'));
    this.pieces.push(new Piece(this, 5, 100, 4, 3, 'B'));
    this.pieces.push(new Piece(this, 5, 100, 6, 3, 'B'));
    this.pieces.push(new Piece(this, 5, 100, 8, 3, 'B'));
    //W
    //B
    this.pieces.push(new Piece(this, 5, 100, 1, 8, 'W'));
    this.pieces.push(new Piece(this, 5, 100, 3, 8, 'W'));
    this.pieces.push(new Piece(this, 5, 100, 5, 8, 'W'));
    this.pieces.push(new Piece(this, 5, 100, 7, 8, 'W'));
    this.pieces.push(new Piece(this, 5, 100, 2, 7, 'W'));
    this.pieces.push(new Piece(this, 5, 100, 4, 7, 'W'));
    this.pieces.push(new Piece(this, 5, 100, 6, 7, 'W'));
    this.pieces.push(new Piece(this, 5, 100, 8, 7, 'W'));
    this.pieces.push(new Piece(this, 5, 100, 1, 6, 'W'));
    this.pieces.push(new Piece(this, 5, 100, 3, 6, 'W'));
    this.pieces.push(new Piece(this, 5, 100, 5, 6, 'W'));
    this.pieces.push(new Piece(this, 5, 100, 7, 6, 'W'));

    this.board = new Board(this,this.matWOODBRIGHT,this.matWHITE,this.matBLACK);

    this.scoreboard = new Scoreboard(this,this.matWOODBRIGHT,this.fontRED);

    this.timer = new Timer(this,this.matWOODBRIGHT,this.fontRED);

    this.boxSide = new MyRectangle(this,-50.1,50.1,50.1,-50.1);
    this.boxSide.updateTex(100.2,100.2);

    //Table and Benches
    this.table = new Table(this, this.matWOODBRIGHT);
    this.bench = new Bench(this, this.matWOODBRIGHT);
    //Floor
    this.floor = new MyRectangle(this, -50, 50, 50, -50);
    this.floor.updateTex(5, 5);

    this.player = 'w';

    var controlpoints = [   // U = 0
                        [ // V = 0..2;
                            [-0.45, -0.2, 0, 1],
                            [-0.5, 0, 0, 1],
                            [-0.45, 0.2, 0, 1]
                            
                        ],
                        // U = 1
                        [ // V = 0..2
                            [0, -0.25, 0, 1],
                            [0, 0, 0, 1],
                            [0, 0.25, 0, 1]
                        ],
                        // U = 2
                        [ // V = 0..2
                            [0.45, -0.2, 0, 1],
                            [0.5, 0, 0, 1],
                            [0.45, 0.2, 0, 1]
                        ]
    ];
    this.button_WH = new MyPatch(this, 2, 20, 2, 20, controlpoints);
    this.button_BL = new MyPatch(this, 2, 20, 2, 20, controlpoints);
    this.button_TOP_WH = new MyPatch(this, 2, 20, 2, 20, controlpoints);
    this.button_TOP_BL = new MyPatch(this, 2, 20, 2, 20, controlpoints);
    this.button_Timer = new MyPatch(this, 2, 20, 2, 20, controlpoints);
    this.button_Score = new MyPatch(this, 2, 20, 2, 20, controlpoints);
    this.button_Undo = new MyPatch(this, 2, 20, 2, 20, controlpoints);
    this.button_Film = new MyPatch(this, 2, 20, 2, 20, controlpoints);
    this.button_Skins = new MyPatch(this, 2, 20, 2, 20, controlpoints);
};


Scene.prototype.initLights = function () {

    this.lights[0].setPosition(0, 25, 10, 1);
    this.lights[0].setAmbient(0, 0, 0, 1);
    this.lights[0].setDiffuse(0.6, 0.6, 0.6, 1);
    this.lights[0].setSpecular(1, 1, 1, 1);
    this.lights[0].enable();
    this.lights[0].ena=true;
    this.lights[0].setVisible(true);
    this.lights[0].update();

    this.lights[1].setPosition(0, 25, -10, 1);
    this.lights[1].setAmbient(0, 0, 0, 1);
    this.lights[1].setDiffuse(0.6, 0.6, 0.6, 1);
    this.lights[1].setSpecular(1, 1, 1, 1);
    this.lights[1].enable();
    this.lights[1].ena=true;
    this.lights[1].setVisible(true);
    this.lights[1].update();
};

Scene.prototype.updateLights = function() {
    
    for (var i = 0; i < this.lights.length; i++) {
        if(this.lights[i].ena) this.lights[i].enable();
        else this.lights[i].disable();
    };

    for (i = 0; i < this.lights.length; i++)
        this.lights[i].update();
};

Scene.prototype.initCameras = function () {
    
    this.camera = new CGFcamera(0.4, 0.01, 500, vec3.fromValues(25, 10, 0), vec3.fromValues(0, 0, 0));
    this.cameraDestination = [25,10,0];
    this.cameraTransition = false;
    this.camTransTime = 1000;
};

Scene.prototype.initMaterials = function () {

    this.defaultApp = new CGFappearance(this);
    this.defaultApp.setAmbient(0.9, 0.9, 0.9, 1);
    this.defaultApp.setDiffuse(0.7, 0.7, 0.7, 1);
    this.defaultApp.setSpecular(0.0, 0.0, 0.0, 1);  
    this.defaultApp.setShininess(120);

    this.matSILVER = new CGFappearance(this);
    this.matSILVER.setAmbient(0.2, 0.2, 0.2, 1.0);
    this.matSILVER.setDiffuse(0.2, 0.2, 0.2, 1.0);
    this.matSILVER.setSpecular(0.8, 0.8, 0.8, 1.0);
    this.matSILVER.setShininess(10.0);

    this.matGOLD = new CGFappearance(this);
    this.matGOLD.setAmbient(0.5, 0.42, 0.05, 1.0);
    this.matGOLD.setDiffuse(0.5, 0.42, 0.05, 1.0);
    this.matGOLD.setSpecular(0.8, 0.2, 0.2, 1.0);
    this.matGOLD.setShininess(2.0);

    this.matBLACK = new CGFappearance(this);
    this.matBLACK.setAmbient(0.07, 0.07, 0.07, 1.0);
    this.matBLACK.setDiffuse(0.07, 0.07, 0.07, 1.0);
    this.matBLACK.setSpecular(0.02, 0.02, 0.02, 1.0);
    this.matBLACK.setShininess(2.0);

    this.matWHITE = new CGFappearance(this);
    this.matWHITE.setAmbient(0.99, 0.99, 0.99, 1.0);
    this.matWHITE.setDiffuse(0.99, 0.99, 0.99, 1.0);
    this.matWHITE.setSpecular(0.2, 0.2, 0.2, 1.0);
    this.matWHITE.setShininess(2.0);

    this.matWOODBRIGHT = new CGFappearance(this);
    this.matWOODBRIGHT.setAmbient(0.5, 0.5, 0.5, 1.0);
    this.matWOODBRIGHT.setDiffuse(0.5, 0.5, 0.5, 1.0);
    this.matWOODBRIGHT.setSpecular(0.2, 0.2, 0.2, 1.0);
    this.matWOODBRIGHT.setShininess(2.0);
    this.matWOODBRIGHT.setTexture(new CGFtexture(this, dir_resources+"wood.jpg"));

    this.matWOOD=this.matWOODBRIGHT;

    this.matWOODDARK = new CGFappearance(this);
    this.matWOODDARK.setAmbient(0.16, 0.04, 0.02, 1);
    this.matWOODDARK.setDiffuse(0.16, 0.04, 0.02, 1);
    this.matWOODDARK.setSpecular(0.1, 0.02, 0.02, 1);
    this.matWOODDARK.setShininess(2.0);
    this.matWOODDARK.setTexture(new CGFtexture(this, dir_resources+"wood.jpg"));

    // FONT TEXTURES

    this.fontRED = new CGFtexture(this, dir_resources+"red-led-font.jpg");
    this.fontYELLOW = new CGFtexture(this, dir_resources+"yellow-led-font.jpg");
    this.fontWHITE = new CGFtexture(this, dir_resources+"white-led-font.jpg");

    //SKYBOX TEXTURES

    this.sky1 = {
        back: new CGFtexture(this, dir_resources+"sky1/sky1_back.bmp"),
        bottom: new CGFtexture(this, dir_resources+"sky1/sky1_bottom.bmp"),
        front : new CGFtexture(this, dir_resources+"sky1/sky1_front.bmp"),
        left : new CGFtexture(this, dir_resources+"sky1/sky1_left.bmp"),
        right : new CGFtexture(this, dir_resources+"sky1/sky1_right.bmp"),
        top : new CGFtexture(this, dir_resources+"sky1/sky1_top.bmp")
    };

    this.sky2 = {
        back: new CGFtexture(this, dir_resources+"sky2/sky2_back.bmp"),
        bottom: new CGFtexture(this, dir_resources+"sky2/sky2_bottom.bmp"),
        front : new CGFtexture(this, dir_resources+"sky2/sky2_front.bmp"),
        left : new CGFtexture(this, dir_resources+"sky2/sky2_left.bmp"),
        right : new CGFtexture(this, dir_resources+"sky2/sky2_right.bmp"),
        top : new CGFtexture(this, dir_resources+"sky2/sky2_top.bmp")
    };

    this.sky=this.sky1;

    //BUTTON TEXTURES

    this.tex_cam_WH = new CGFtexture(this, dir_resources+"button_cam_WH.png");
    this.tex_cam_BL = new CGFtexture(this, dir_resources+"button_cam_BL.png");
    this.tex_cam_TOP_WH = new CGFtexture(this, dir_resources+"button_cam_TOP_WH.png");
    this.tex_cam_TOP_BL = new CGFtexture(this, dir_resources+"button_cam_TOP_BL.png");
    this.tex_cam_Timer = new CGFtexture(this, dir_resources+"button_cam_Timer.png");
    this.tex_cam_Score = new CGFtexture(this, dir_resources+"button_cam_Score.png");
    this.tex_film = new CGFtexture(this, dir_resources+"button_film.png");
    this.tex_undo = new CGFtexture(this, dir_resources+"button_undo.png");
    this.tex_skins = new CGFtexture(this, dir_resources+"button_skins.png");
};

Scene.prototype.initPicking = function () {
    
    this.setPickEnabled(true);
    this.pickedCell = null;
    this.pickedPiece = null;
    this.pieceTransition = false;
    this.pieceTransTime = 200;
    this.pieceFinalHeight = 1;
};

//Display

Scene.prototype.display = function () {
    this.logPicking();
    this.clearPickRegistration();

	// ---- BEGIN Background, camera and axis setup
    	
	// Clear image and depth buffer everytime we update the scene
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

	// Initialize Model-View matrix as identity (no transformation
	this.updateProjectionMatrix();
    this.loadIdentity();

    this.displayInterface();
    
	// Apply transformations corresponding to the camera position relative to the origin
	this.applyViewMatrix();
	
    //this.axis.display();

	// ---- END Background, camera and axis setup

    this.displaySkybox();

    this.updateLights();

    this.board.display();
    this.pushMatrix();
        this.translate(0,1,-8);
        this.scoreboard.display();
    this.popMatrix();

    this.pushMatrix();
        this.translate(0,1,8);
        this.rotate(180*degToRad,0,1,0);
        this.timer.display();
    this.popMatrix();

    this.displayPieces();
    this.table.display();
    this.matWOOD.apply();

    this.pushMatrix();
        this.translate(-15, -10, 0);
        this.bench.display();
    this.popMatrix();
    
    this.pushMatrix();
        this.translate(15, -10, 0);
        this.bench.display();
    this.popMatrix();

    this.pushMatrix();
        this.translate(0, -15, 0);
        this.rotate(-90*degToRad, 1, 0, 0);
        this.floor.display();
    this.popMatrix();
};

Scene.prototype.displayInterface = function () {

    this.pushMatrix();
        this.translate(-3.5,-1.7,-10);
        this.registerForPick(96, this.button_Timer);
        this.defaultApp.setTexture(this.tex_cam_Timer);
        this.defaultApp.apply();
        this.button_Timer.display();
        this.defaultApp.setTexture(null);
    this.popMatrix();

    this.pushMatrix();
        this.translate(3.5,-1.7,-10);
        this.registerForPick(97, this.button_Score);
        this.defaultApp.setTexture(this.tex_cam_Score);
        this.defaultApp.apply();
        this.button_Score.display();
        this.defaultApp.setTexture(null);
    this.popMatrix();

    this.pushMatrix();
        this.translate(-1.8,-1.7,-10);
        this.registerForPick(94, this.button_TOP_WH);
        this.defaultApp.setTexture(this.tex_cam_TOP_WH);
        this.defaultApp.apply();
        this.button_TOP_WH.display();
        this.defaultApp.setTexture(null);
    this.popMatrix();

    this.pushMatrix();
        this.translate(-0.6,-1.7,-10);
        this.registerForPick(92, this.button_WH);
        this.defaultApp.setTexture(this.tex_cam_WH);
        this.defaultApp.apply();
        this.button_WH.display();
        this.defaultApp.setTexture(null);
    this.popMatrix();

    this.pushMatrix();
        this.translate(0.6,-1.7,-10);
        this.registerForPick(93, this.button_BL);
        this.defaultApp.setTexture(this.tex_cam_BL);
        this.defaultApp.apply();
        this.button_BL.display();
        this.defaultApp.setTexture(null);
    this.popMatrix();

    this.pushMatrix();
        this.translate(1.8,-1.7,-10);
        this.registerForPick(95, this.button_TOP_BL);
        this.defaultApp.setTexture(this.tex_cam_TOP_BL);
        this.defaultApp.apply();
        this.button_TOP_BL.display();
        this.defaultApp.setTexture(null);
    this.popMatrix();

        this.pushMatrix();
        this.translate(-1.2,1.7,-10);
        this.registerForPick(90, this.button_Undo);
        this.defaultApp.setTexture(this.tex_undo);
        this.defaultApp.apply();
        this.button_Undo.display();
        this.defaultApp.setTexture(null);
    this.popMatrix();

    this.pushMatrix();
        this.translate(0,1.7,-10);
        this.registerForPick(89, this.button_Skins);
        this.defaultApp.setTexture(this.tex_skins);
        this.defaultApp.apply();
        this.button_Skins.display();
        this.defaultApp.setTexture(null);
    this.popMatrix();

    this.pushMatrix();
        this.translate(1.2,1.7,-10);
        this.registerForPick(91, this.button_Film);
        this.defaultApp.setTexture(this.tex_film);
        this.defaultApp.apply();
        this.button_Film.display();
        this.defaultApp.setTexture(null);
    this.popMatrix();

};

Scene.prototype.displaySkybox = function () {

    this.pushMatrix(); // BACK (WHITE)
        this.defaultApp.setTexture(this.sky.back);
        this.defaultApp.apply();
        this.translate(50,-10,0);
        this.rotate(-90*degToRad,0,1,0);
        this.boxSide.display();
    this.popMatrix();

    this.pushMatrix(); // RIGHT (SCORE)
        this.defaultApp.setTexture(this.sky.right);
        this.defaultApp.apply();
        this.rotate(90*degToRad,0,1,0);
        this.translate(50,-10,0);
        this.rotate(-90*degToRad,0,1,0);
        this.boxSide.display();
    this.popMatrix();

    this.pushMatrix(); // FRONT (BLACK)
        this.defaultApp.setTexture(this.sky.front);
        this.defaultApp.apply();
        this.rotate(180*degToRad,0,1,0);
        this.translate(50,-10,0);
        this.rotate(-90*degToRad,0,1,0);
        this.boxSide.display();
    this.popMatrix();

    this.pushMatrix(); // LEFT (TIMER)
        this.defaultApp.setTexture(this.sky.left);
        this.defaultApp.apply();
        this.rotate(-90*degToRad,0,1,0);
        this.translate(50,-10,0);
        this.rotate(-90*degToRad,0,1,0);
        this.boxSide.display();
    this.popMatrix();

    this.pushMatrix(); // TOP
        this.defaultApp.setTexture(this.sky.top);
        this.defaultApp.apply();
        this.translate(0,-10,0);
        this.rotate(-90*degToRad,0,0,1);
        this.translate(-50,0,0);
        this.rotate(90*degToRad,0,1,0);
        this.boxSide.display();
    this.popMatrix();

    this.pushMatrix(); // BOTTOM
        this.defaultApp.setTexture(this.sky.bottom);
        this.defaultApp.apply();
        this.translate(0,-10,0);
        this.rotate(90*degToRad,0,0,1);
        this.translate(-50,0,0);
        this.rotate(90*degToRad,0,1,0);
        this.boxSide.display();
    this.popMatrix();
};

Scene.prototype.buildState = function () {
    var res = [
    ['#','#','#','#','#','#','#','#','#','#'],
    ['#',' ',' ',' ',' ',' ',' ',' ',' ','#'],
    ['#',' ',' ',' ',' ',' ',' ',' ',' ','#'],
    ['#',' ',' ',' ',' ',' ',' ',' ',' ','#'],
    ['#',' ',' ',' ',' ',' ',' ',' ',' ','#'],
    ['#',' ',' ',' ',' ',' ',' ',' ',' ','#'],
    ['#',' ',' ',' ',' ',' ',' ',' ',' ','#'],
    ['#',' ',' ',' ',' ',' ',' ',' ',' ','#'],
    ['#',' ',' ',' ',' ',' ',' ',' ',' ','#'],
    ['#','#','#','#','#','#','#','#','#','#']
    ];

    for(var i=0;i<this.pieces.length;i++) {
        res[this.pieces[i].posY][this.pieces[i].posX] = this.pieces[i].chr;
    }
    return res;
};

Scene.prototype.readState = function (state) {

    this.pieces = [];
    for (var i = 0; i < state.length - 1; i++) {
        for (var j = 0; j < state[i].length; j++) {
            if(state[i].charAt(j)=='W' || state[i].charAt(j)=='B' || state[i].charAt(j)=='w' || state[i].charAt(j)=='b')
            {
                this.pieces.push(new Piece(this, 5, 100, j, i, state[i].charAt(j)));
            }
        };
    };
    if(this.pickedPiece) {
        this.pickedPiece.height=0;
        this.pickedPiece=null;
    }    
    if(state[10]=="INVALID")
    {
        console.log("invalid move!");
        return false;
    }
    else if(state[10]=="VALID")
    {
        console.log("valid move!");
        if(this.player!=state[11])
        {
            this.player=state[11];
            if(!this.film_playing) {
                if(this.player=='w') this.cameraWhite();
                else this.cameraBlack();
            }

            var score = this.getScore();
            this.scoreboard.setCounters(score.w,score.b);
        }
        return true;
    }
};

Scene.prototype.displayPieces = function () {
    
    this.pushMatrix();
        for (var i = 0; i < this.pieces.length; i++) {
            if(this.pieces[i].chr=='B' || this.pieces[i].chr=='b')
            {
                if(this.skin==1)
                    this.matBLACK.apply();
                else
                    this.matSILVER.apply();
            }
            else if(this.pieces[i].chr=='W' || this.pieces[i].chr=='w')
            {
                if(this.skin==1)
                    this.matWHITE.apply();
                else
                    this.matGOLD.apply();
            }

            this.registerForPick(65+i, this.pieces[i]);
            this.pushMatrix();
                if(this.pieces[i]===this.pickedPiece) this.translate(0,this.pickedPiece.height,0);
                this.translate(this.pieces[i].posY*1.30-(1.30*9)/2,0,(1.30*9)/2-this.pieces[i].posX*1.30);
                this.pieces[i].display();
            this.popMatrix();
            if(this.pieces[i].chr=='b' || this.pieces[i].chr=='w')
            {
                this.pushMatrix();
                    if(this.pieces[i]===this.pickedPiece) this.translate(0,this.pickedPiece.height,0);
                    this.translate(this.pieces[i].posY*1.30-(1.30*9)/2,0.5,(1.30*9)/2-this.pieces[i].posX*1.30);
                    this.pieces[i].display();
                this.popMatrix();
            }
        }
    this.popMatrix();
};

Scene.prototype.update = function (currTime) {

    if(!this.timer.timeBeg) this.timer.timeBeg = currTime;
    this.timer.updateTime(currTime);

    if(this.film_playing)
    {
        var numStates = this.states.length;
        var duration = this.film_delay*1000*numStates;

        //film playing logic
        if(!this.filmPlayingBeg) //BEGINNING
        {
            this.filmPlayingBeg = currTime;
            this.timer.timeBeg=currTime-this.timer.timeBeg;
            this.readState(this.states[0]);
            this.timer.setPaused(true);
        }
        else
        {
            var time_since_start = currTime - this.filmPlayingBeg;
            if(time_since_start >= duration) //END
            {
                this.counter = 0;
                this.film_playing = false;
                this.filmPlayingBeg = null;
                this.timer.timeBeg=currTime-this.timer.timeBeg;

                if(this.player=='w') this.cameraWhite();
                else this.cameraBlack();
                this.timer.setPaused(false);
            }
            else
            {
                var currState = Math.floor(time_since_start/(this.film_delay*1000));

                //readState from current state
                if(currState > this.counter)
                {
                    this.counter = currState;
                    this.readState(this.states[this.counter]);
                }
            }
        }
    }
    if(this.cameraTransition) {
        if(!this.camTransBeg) this.camTransBeg = currTime;  //BEGINNING
        else
        {
            var time_since_start = currTime - this.camTransBeg;
            if(time_since_start>=this.camTransTime) { //END
                this.camera.setPosition(this.cameraDestination);
                this.camTransBeg=null;
                this.cameraTransition=false;
            }
            else {
                var time_perc = time_since_start / this.camTransTime;
                var new_pos = [this.cameraOrigin[0]+(this.transitionVec[0]*time_perc),
                this.cameraOrigin[1]+(this.transitionVec[1]*time_perc),
                this.cameraOrigin[2]+(this.transitionVec[2]*time_perc)];
                this.camera.setPosition(new_pos);
            }
        }
    }
    if(this.pieceTransition) {
        if(!this.pieceTransBeg) this.pieceTransBeg = currTime;  //BEGINNING
        else
        {
            var time_since_start = currTime-this.pieceTransBeg;
            if(time_since_start >= this.pieceTransTime) { //END
                this.pickedPiece.height = this.pieceFinalHeight;
                this.pieceTransBeg = null;
                this.pieceTransition = false;
            }
            else {
                var time_perc = time_since_start/this.pieceTransTime;
                this.pickedPiece.height = this.pieceFinalHeight*time_perc;
            }
        }
    }
};

//Cameras

Scene.prototype.cameraTopWhite = function() {

    if(!this.cameraTransition) {
        this.cameraOrigin=[this.camera.position[0], this.camera.position[1], this.camera.position[2]];
        this.cameraDestination = [0.01,35,0];
        if(!arraysEqual(this.cameraDestination, this.cameraOrigin)) this.calcTransition();
    }
};

Scene.prototype.cameraTopBlack = function() {

    if(!this.cameraTransition) {
        this.cameraOrigin=[this.camera.position[0], this.camera.position[1], this.camera.position[2]];
        this.cameraDestination = [-0.01,35,0];
        if(!arraysEqual(this.cameraDestination, this.cameraOrigin)) this.calcTransition();
    }
};

Scene.prototype.cameraWhite = function() {

    if(!this.cameraTransition) {
        this.cameraOrigin=[this.camera.position[0], this.camera.position[1], this.camera.position[2]];
        this.cameraDestination = [25,10,0];
        if(!arraysEqual(this.cameraDestination, this.cameraOrigin)) this.calcTransition();
    }
};

Scene.prototype.cameraBlack = function() {

    if(!this.cameraTransition) {
        this.cameraOrigin=[this.camera.position[0], this.camera.position[1], this.camera.position[2]];
        this.cameraDestination = [-25,10,0];
        if(!arraysEqual(this.cameraDestination, this.cameraOrigin)) this.calcTransition();
    }
};

Scene.prototype.cameraScore = function() {

    if(!this.cameraTransition) {
        this.cameraOrigin=[this.camera.position[0], this.camera.position[1], this.camera.position[2]];
        this.cameraDestination = [0,10,20];
        if(!arraysEqual(this.cameraDestination, this.cameraOrigin)) this.calcTransition();
    }
};

Scene.prototype.cameraTimer = function() {

    if(!this.cameraTransition) {
        this.cameraOrigin=[this.camera.position[0], this.camera.position[1], this.camera.position[2]];
        this.cameraDestination = [0,10,-20];
        if(!arraysEqual(this.cameraDestination, this.cameraOrigin)) this.calcTransition();
    }
};

Scene.prototype.freeCam = function() {
    this.interface.setActiveCamera(this.camera);
};

Scene.prototype.calcTransition = function() {
    this.transitionVec = [this.cameraDestination[0]-this.cameraOrigin[0],
            this.cameraDestination[1]-this.cameraOrigin[1],
            this.cameraDestination[2]-this.cameraOrigin[2]];

    this.cameraTransition = true;
};

//Undo
Scene.prototype.undo = function() {
    // Deletes state from states stack
    if(this.states.length > 1)
    {
        this.states.pop();
    }

    var state = this.states[this.states.length-1];
    this.readState(state);
};

//Film
Scene.prototype.start_film = function() {

    if(this.states.length>1) {
        this.film_playing = true;
        if(this.player=='w') this.cameraTopWhite();
        else this.cameraTopBlack();
    }
};

//Picking

Scene.prototype.logPicking = function () {
    if (this.pickMode == false) {
        if (this.pickResults != null && this.pickResults.length > 0) {
            for (var i=0; i< this.pickResults.length; i++) {
                var obj = this.pickResults[i][0];
                if (obj)
                {
                    var customId = this.pickResults[i][1];              
                    console.log("Picked object: " + obj + ", with pick id " + customId);
                    if (obj instanceof Piece && obj.chr.toLowerCase() == this.player) //Pieces
                    {
                        console.log("\tPiece at [" + obj.posX + "," + obj.posY + "] picked");
                        if(this.pickedPiece) this.pickedPiece.height=0;
                        this.pickedPiece=obj;
                        this.pieceTransition=true;
                        this.pieceTransBeg=null;
                    }
                    if(this.pickedPiece && obj instanceof MyRectangle) //Cells
                    {
                        console.log("\tCell [" + ((customId-1)%8+1) + "," + (Math.floor((customId-1)/8)+1) + "] picked"); //
                        this.pickedCell=obj;
                        this.sendRequest([this.pickedPiece.posX, this.pickedPiece.posY], [((customId-1)%8+1), (Math.floor((customId-1)/8)+1)]);
                    }
                    if(obj instanceof MyPatch && customId > 88)
                    {
                        switch(customId)
                        {
                            case 89: //alt_skin
                                console.log("\tButton 'Change Skins' picked");
                                this.alt_skin();
                            break;
                            case 90: //undo
                                console.log("\tButton 'Undo Move' picked");
                                this.undo();
                            break;
                            case 91: //film
                                console.log("\tButton 'Start Film' picked");
                                this.start_film();
                            break;
                            case 92:
                                console.log("\tButton 'Camera WH' picked");
                                this.cameraWhite();
                            break;
                            case 93:
                                console.log("\tButton 'Camera BL' picked");
                                this.cameraBlack();
                            break;
                            case 94:
                                console.log("\tButton 'Camera TOP WH' picked");
                                this.cameraTopWhite();
                            break;
                            case 95:
                                console.log("\tButton 'Camera TOP BL' picked");
                                this.cameraTopBlack();
                            break;
                            case 96:
                                console.log("\tButton 'Camera Timer' picked");
                                this.cameraTimer();
                            break;
                            case 97:
                                console.log("\tButton 'Camera Score' picked");
                                this.cameraScore();
                            break;
                        }
                    }
                }
            }
            this.pickResults.splice(0,this.pickResults.length);
        }       
    }
};

//Skins

Scene.prototype.alt_skin = function () {
    if(this.skin==1)
    {
        this.skin=2;
        this.board.setMatWOOD(this.matWOODDARK);
        
        this.scoreboard.setMatWOOD(this.matWOODDARK);
        this.scoreboard.setFont(this.fontWHITE);

        this.timer.setMatWOOD(this.matWOODDARK);
        this.timer.setFont(this.fontWHITE);

        this.sky=this.sky2;

        this.table.setAppearance(this.matWOODDARK);
        this.bench.setAppearance(this.matWOODDARK);
        this.matWOOD=this.matWOODDARK;
    }
    else
    {
        this.skin=1;
        this.board.setMatWOOD(this.matWOODBRIGHT);

        this.scoreboard.setMatWOOD(this.matWOODBRIGHT);
        this.scoreboard.setFont(this.fontRED);

        this.timer.setMatWOOD(this.matWOODBRIGHT);
        this.timer.setFont(this.fontRED);

        this.sky=this.sky1;

        this.table.setAppearance(this.matWOODBRIGHT);
        this.bench.setAppearance(this.matWOODBRIGHT);
        this.matWOOD=this.matWOODBRIGHT;
    }
};

//Requests

Scene.prototype.sendRequest = function (pos, des_pos) {
    var request = new XMLHttpRequest();
    request.scene=this;
    request.open('POST', 'http://localhost:8001/', true);

    request.onload = this.handleReply;
    request.onerror = function(){console.log("Error waiting for response");};

    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    var str = this.buildState();
    var body = "";
    for (var i = 0; i < str.length; i++) {
        for (var j = 0; j < str[i].length; j++) {
            body+=str[i][j];
        };
        body+='\n';
    };
    body+= pos[0] + " " + pos[1] + "\n";
    body+= des_pos[0] + " " + des_pos[1] + "\n";

    request.send(body);
};

Scene.prototype.handleReply = function (data) {
    
    var state = data.target.response.split("\n");
    if(this.scene.readState(state))
    {
        this.scene.states.push(state);
    }
};

//Score

Scene.prototype.getScore = function (chr) {

    var ctr_w=0;
    var ctr_b=0;

    for (var i = 0; i < this.pieces.length; i++) {
        if(this.pieces[i].chr=='w' || this.pieces[i].chr=='W') ctr_w++;
        else if(this.pieces[i].chr=='b' || this.pieces[i].chr=='B') ctr_b++;
    };
    return {w:12-ctr_b,b:12-ctr_w};
};

//Utils

function arraysEqual(a, b) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length != b.length) return false;

  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
};