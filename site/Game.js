import * as THREE from '../libs/three137/three.module.js';
import { RGBELoader } from '../libs/three137/RGBELoader.js';
import { LoadingBar } from '../libs/LoadingBar.js';
import { Owl } from './Owl.js';
import { Obstacles } from './Obstacles.js';
import { SFX } from '../libs/SFX.js';

class Game{
	constructor(){
		const container = document.createElement( 'div' );
		document.body.appendChild( container );
        
        this.loadingBar = new LoadingBar();
        this.loadingBar.visible = false;

        this.soundOff = false;

        this.clock = new THREE.Clock();

        this.score = 0;

        this.sky = 'clouds';

		this.assetsPath = './assets/';
        
		this.camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 200 );
        this.camera.position.set( 0, 5, -8 );
        //this.camera.lookAt(0, 0, 6);

        this.cameraController = new THREE.Object3D();
        this.cameraController.add(this.camera);
        this.cameraTarget = new THREE.Vector3(0,0,6);
        
		this.scene = new THREE.Scene();
        this.scene.add(this.cameraController);
        // Add fog to the scene
        this.scene.fog = new THREE.Fog(0xAAAAAA, 0, 250);

		const ambient = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 0.4);
        ambient.position.set( 0.5, 2, 0.25 );
		this.scene.add(ambient);
			
		this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true } );
        this.renderer.setPixelRatio( window.devicePixelRatio);
		this.renderer.setSize( window.innerWidth, window.innerHeight );
        this.renderer.outputEncoding = THREE.sRGBEncoding;
		container.appendChild( this.renderer.domElement );
        this.setEnvironment();
        
        this.active = false;

        this.load();

        window.addEventListener('resize', this.resize.bind(this) );

        document.addEventListener('keydown', this.keyDown.bind(this));
        document.addEventListener('keyup', this.keyUp.bind(this));

        // document.addEventListener('touchstart', this.mouseDown.bind(this) );
        // document.addEventListener('touchend', this.mouseUp.bind(this) );
        // //document.addEventListener('mousedown', this.mouseDown.bind(this) );
        // //document.addEventListener('mouseup', this.mouseUp.bind(this) );
        
        this.spaceKey = false;

        const btn = document.getElementById('playBtn');
        btn.addEventListener('click', this.startGame.bind(this));

        this.leftArrowKey = false;
        this.rightArrowKey = false;
        
  

       // Mobile controls
        const leftBtn = document.getElementById('leftBtn');
        leftBtn.addEventListener('touchstart', () => this.leftArrowKey = true);
        leftBtn.addEventListener('touchend', () => this.leftArrowKey = false);

        const jumpBtn = document.getElementById('jumpBtn');
        jumpBtn.addEventListener('touchstart', () => this.spaceKey = true);
        jumpBtn.addEventListener('touchend', () => this.spaceKey = false);

        const rightBtn = document.getElementById('rightBtn');
        rightBtn.addEventListener('touchstart', () => this.rightArrowKey = true);
        rightBtn.addEventListener('touchend', () => this.rightArrowKey = false);

        const restartBtn = document.getElementById('restartBtn');
        restartBtn.addEventListener('click', this.restartGame.bind(this));


        this.setupCameraForStart();

	}

    loadOwl(owlName) {
        this.plane.load(owlName);
    }
    
	
   startGame() {
    this.sky = 'clouds'; // Add this line to set the sky to 'clouds' when the game starts
    this.scene.background = this.cloudsSkybox;

   

    const restartBtn = document.getElementById('restartBtn');
    const gameover = document.getElementById('gameover');
    const instructions = document.getElementById('instructions');
    const btn = document.getElementById('playBtn');
    const info = document.getElementById('info');
    const instructions2 = document.getElementById('instructions2');

    restartBtn.style.display = 'none';
    instructions2.style.display = 'none';
    info.style.display = 'block';
    gameover.style.display = 'none';
    instructions.style.display = 'none';
    btn.style.display = 'none';

    this.score = 0;
    this.bonusScore = 0;
    if (this.plane.currOwlName === 'bird1.glb') {
        this.lives = 3;
    } else if (this.plane.currOwlName === 'bird2.glb') {
        this.lives = 5;
    } else {
        this.lives = 1;
    }
    this.active = true;

    // Revert the camera's position and rotation
    this.camera.position.set(0, 5, -8);
    this.camera.rotation.z = 0;

    let elm = document.getElementById('score');
    elm.innerHTML = this.score;

    elm = document.getElementById('lives');
    elm.innerHTML = this.lives;

    this.plane.reset();
    this.obstacles.reset();

    this.active = true;

    this.sfx.play('bgmusic');

    this.sfx.setVolume('bgmusic', 0.3);
    
}



    resize(){
        this.camera.aspect = window.innerWidth / window.innerHeight;
    	this.camera.updateProjectionMatrix();
    	this.renderer.setSize( window.innerWidth, window.innerHeight ); 
    }



    keyDown(evt) {
        switch (evt.keyCode) {
            case 32:
                this.spaceKey = true;
                break;
            case 37: // left arrow key
                this.leftArrowKey = true;
                break;
            case 39: // right arrow key
                this.rightArrowKey = true;
                break;
        }
    }
    
    keyUp(evt) {

        switch (evt.keyCode) {
            case 32:
                this.spaceKey = false;
                break;
            case 37: // left arrow key
                this.leftArrowKey = false;
                break;
            case 39: // right arrow key
                this.rightArrowKey = false;
                break;
        }
    }

    touchDown(evt) {
        this.spaceKey = true;
    }

    touchUp(evt) {
        this.spaceKey = false;
    }

    touchDownLeft(evt) {
        this.leftArrowKey = true;
    }

    touchUpLeft(evt) {
        this.leftArrowKey = false;
    }

    touchDownRight(evt) {
        this.rightArrowKey = true;
    }

    touchUpRight(evt) {
        this.rightArrowKey = false;
    }

    // mouseDown(evt){
    //     this.spaceKey = true;
    // }

    // mouseUp(evt){
    //     this.spaceKey = false;
    // }

    setEnvironment(){
        const loader = new RGBELoader().setPath(this.assetsPath);
        const pmremGenerator = new THREE.PMREMGenerator( this.renderer );
        pmremGenerator.compileEquirectangularShader();
        
        const self = this;
        
        loader.load( 'hdr/venice_sunset_1k.hdr', ( texture ) => {
          const envMap = pmremGenerator.fromEquirectangular( texture ).texture;
          pmremGenerator.dispose();

          self.scene.environment = envMap;

        }, undefined, (err)=>{
            console.error( err.message );
        } );
    }
    
	load(){
        this.plane = new Owl(this);
        this.loadSkybox();
        this.loading = true;
        this.loadingBar.visible = true;


        
        this.obstacles = new Obstacles(this);

        this.loadSFX();
        
       
    }

    loadSFX() {
        this.sfx = new SFX(this.camera, this.assetsPath + "game/");
        console.log(this.soundOff);
    
        this.sfx.load("explosion");
        if (!this.soundOff) {
            this.sfx.load("bgmusic", true);
            this.sfx.load("gliss");
             this.sfx.load("gameover");
            this.sfx.load("bonus");
        }
        
    }
    

    loadSkybox() {
        this.cloudsSkybox = new THREE.CubeTextureLoader()
            .setPath(`${this.assetsPath}/game/paintedsky/clouds/`)
            .load(['px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg'], () => {
                //this work great at desktop but lags on mobile
                //this.renderer.setAnimationLoop(this.render.bind(this));
                // this should work fine on mobile 
                const animate = () => {
                    requestAnimationFrame(animate);
                    this.render();
                  };
                  animate();
                  
            });

        this.castleSkybox = new THREE.CubeTextureLoader()
            .setPath(`${this.assetsPath}/game/paintedsky/castle1/`)
            .load(['px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg']);
            
        this.galaxySkybox = new THREE.CubeTextureLoader()
            .setPath(`${this.assetsPath}/game/paintedsky/galaxy/`)
            .load(['px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg']);

        this.forestSkybox = new THREE.CubeTextureLoader()
            .setPath(`${this.assetsPath}/game/paintedsky/forest/`)
            .load(['px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg']);

        this.scene.background = this.cloudsSkybox;
    }

    switchSkybox() {
        if (this.score === 400 && this.scene.background === this.cloudsSkybox) {
            this.scene.background = this.castleSkybox;
            this.sky = 'castle';
            this.plane.resetSlowdownEffect();
        } else if (this.score === 800 && this.scene.background === this.castleSkybox) {
            
            this.scene.background = this.forestSkybox;
            this.sky = 'forest';
            this.plane.resetSlowdownEffect();

        } else if (this.score === 1200 && this.scene.background === this.forestSkybox) {
            
            this.scene.background = this.galaxySkybox;
            this.sky = 'galaxy';
            this.plane.resetSlowdownEffect();

        }  else {
            this.scene.background = this.cloudsSkybox;
            this.sky = 'clouds';
            this.plane.resetSlowdownEffect();
        }

        const castleInfo = document.getElementById('castle');
        castleInfo.style.display = 'block';

        setTimeout(() => {
            castleInfo.style.display = 'none';
        }, 1900);



    }
    
    gameOver() {
        this.active = false;
        this.score = 0;
        this.lives = 0;
    
        const gameover = document.getElementById('gameover');
        const restartBtn = document.getElementById('restartBtn');
        
        const info = document.getElementById('info');
        info.style.display = 'none';
    
        gameover.style.display = 'block';
        restartBtn.style.display = 'block';
    
        this.plane.visible = false;
    
        this.sfx.stopAll();
        this.sfx.play('gameover');
        this.sfx.setVolume('gameover', 0.3);

    }

    restartGame() {
        this.promptPlaneSelection();
        const restartBtn = document.getElementById('restartBtn');
 
        restartBtn.style.display = 'block';
    }

    promptPlaneSelection() {
        location.reload();
    }
    

    incScore() {
        this.score += 10;
       // console.log(this.score)
        const elm = document.getElementById('score');
    
        if (this.score % 3 == 0) {
            this.bonusScore += 30;
            this.sfx.play('bonus');
            this.sfx.setVolume('bonus', 0.3);

        } else {
            this.sfx.play('gliss');
            this.sfx.setVolume('gliss', 0.3);

        }
    
        elm.innerHTML = this.score + this.bonusScore;
    
      // Check if the player has reached 8 points and update the skybox and load new models
    if (this.score === 400 ) {
        
        this.switchSkybox();
        this.obstacles.removeObstacles();

        this.obstacles.loadStar();

        // line below ensures that we obstacles are loaded correctly -> change conditional statement in initalize() in Obstacles.js to load different obstacles in a given level
        // loadStar() in Obstacles.js triggers reset()
        
    } else if (this.score === 800) {
        this.switchSkybox();
        this.obstacles.removeObstacles();

        this.obstacles.initialize();
    } else if (this.score === 1200) {
        this.switchSkybox();
        this.obstacles.removeObstacles();

        this.obstacles.initialize();
    }
    
    
    }

    decTime() {
       this.plane.decTime = true;

       const clockDialog = document.getElementById('clock-info');

       clockDialog.style.display = 'block';
       clockDialog.classList.add('blink');

       setTimeout(() => {
        clockDialog.style.display = 'none';
        clockDialog.classList.remove('blink');
       }, 800);
    }
    
    

    decLives() {
        this.lives--;
    
        const elm = document.getElementById('lives-top-icon');
        const lives = document.getElementById('lives');
    
        lives.innerHTML = this.lives;

    
        if (this.lives == 0) {
            this.gameOver();
        }
    
        // Add the blink class to the element
        elm.classList.add('blink');
    
        // Remove the blink class after 2 seconds (adjust the duration as needed)
        setTimeout(() => {
            elm.classList.remove('blink');
        }, 1001);
    
        this.sfx.play('explosion');
        this.sfx.setVolume('explosion', 0.3);
    }
    

    incLives(){
        this.lives++;

        const elm = document.getElementById('lives');

        elm.innerHTML = this.lives;

        this.sfx.play('gliss');
        this.sfx.setVolume('gliss', 0.3);

    }

    setupCameraForStart() {
        this.camera.position.set(-1, 1, 8);
        this.camera.lookAt(this.plane.position);
        this.camera.rotation.z = Math.PI;
    }
    

    updateCamera(){
        this.cameraController.position.copy( this.plane.position );
        this.cameraController.position.y = 0;
        this.cameraTarget.copy(this.plane.position);
        this.cameraTarget.z += 6;
        this.camera.lookAt( this.cameraTarget );
    }

	render() {
        if (this.loading){
            if (this.plane.ready && this.obstacles.ready){
                this.loading = false;
                this.loadingBar.visible = false;
            }else{
                return;
            }
        }
    
        const dt = this.clock.getDelta();
        const time = this.clock.getElapsedTime();
    
        this.plane.update(time);
        this.plane.updateAnimation(dt);

    
        if (this.active){
            this.obstacles.update(this.plane.position, dt);
        }
    
        this.updateCamera();
    
        this.renderer.render( this.scene, this.camera );
    }
    
}

export { Game };