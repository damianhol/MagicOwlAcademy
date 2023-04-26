import { Group, Vector3 } from '../libs/three137/three.module.js';
import { GLTFLoader } from '../libs/three137/GLTFLoader.js';
import { Explosion } from './Explosion.js';

class Obstacles{
    constructor(game){
        this.assetsPath = game.assetsPath;
        this.loadingBar = game.loadingBar;
		this.game = game;
		this.scene = game.scene;

		this.starLoaded = false;
		this.bombLoaded = false;
		this.ghostLoaded = false;
		this.pinkPotionLoaded = false;
		this.carLoaded = false;
		this.cloudLoaded = false;
		this.stairsLoaded = false;
		this.spiderwebLoaded = false;

        this.loadStar();
		this.loadBomb();
		this.loadGhost();
		this.loadPinkPotion();
		this.loadCar();
		this.loadCloud();
		this.loadCandle();
		this.loadStairs();
		this.loadSpider();
		this.loadSpiderweb();
		this.loadClock();

		this.tmpPos = new Vector3();
        this.explosions = [];
		this.obstacleRespawns = 0;
    }
	// First we load models, then we create init methods that crate patterns from each obstacle type(initStars, initBombs....), then we initialize() them based on this.game.sky (different skynbox = different obstacles). We manipulate this file from Game.js (incScore());
    loadStar(){
    	const loader = new GLTFLoader( ).setPath(`${this.assetsPath}game/`);
        this.ready = false;
        
		
		loader.load(
			'letter.glb',
			gltf => {

                this.star = gltf.scene.children[0];

                this.star.name = 'star';

				 if (this.bombLoaded && this.ghostLoaded && this.pinkPotionLoaded && this.carLoaded && this.carLoaded) {
                    this.initialize();
                }
                this.starLoaded = true;

			},
			xhr => {

                this.loadingBar.update('star', xhr.loaded, xhr.total );
			
			},
			err => {

				console.error( err );

			}
		);
	}	

    loadBomb(){
		const loader = new GLTFLoader( ).setPath(`${this.assetsPath}game/`);
	
		loader.load(
			'bomb1.glb',
			gltf => {

                this.bomb = gltf.scene.children[0];
				this.bomb.name = 'bomb';
	
				if (this.starLoaded && this.ghostLoaded && this.pinkPotionLoaded && this.carLoaded && this.cloudLoaded) {
					this.initialize();
				}
				this.bombLoaded = true;
	
			},
			xhr => {
	
				this.loadingBar.update('bomb', xhr.loaded, xhr.total );
				
			},
			err => {
	
				console.error( err );
	
			}
		);
	}

	loadSpider(){
		const loader = new GLTFLoader( ).setPath(`${this.assetsPath}game/`);
	
		loader.load(
			'spider.glb',
			gltf => {

                this.spider = gltf.scene.children[0];
				this.spider.name = 'spider';
	
				if (this.starLoaded && this.ghostLoaded && this.pinkPotionLoaded && this.carLoaded && this.cloudLoaded) {
					this.initialize();
				}
				this.spiderLoaded = true;
	
			},
			xhr => {
	
				this.loadingBar.update('spider', xhr.loaded, xhr.total );
				
			},
			err => {
	
				console.error( err );
	
			}
		);
	}
	

	loadGhost(){
    	const loader = new GLTFLoader( ).setPath(`${this.assetsPath}game/`);
        
		loader.load(
			'ghost.glb',
			gltf => {

                this.ghost = gltf.scene.children[0];
				this.ghost.name = 'ghost';
		this.ghost.userData.type = 'ghost';
                if (this.starLoaded && this.bombLoaded && this.carLoaded && this.pinkPotionLoaded && this.cloudLoaded) {
                    this.initialize();
                }
                this.ghostLoaded = true;

			},
			xhr => {

				this.loadingBar.update('ghost', xhr.loaded, xhr.total );
				
			},
			err => {

				console.error( err );

			}
		);
	}

	loadClock(){
    	const loader = new GLTFLoader( ).setPath(`${this.assetsPath}game/`);
        
		loader.load(
			'clock.glb',
			gltf => {

                this.clock = gltf.scene.children[0];
				this.clock.name = 'clock';
		this.clock.userData.type = 'clock';
                if (this.starLoaded && this.bombLoaded && this.carLoaded && this.pinkPotionLoaded && this.cloudLoaded) {
                    this.initialize();
                }
                this.clockLoaded = true;

			},
			xhr => {

				this.loadingBar.update('clock', xhr.loaded, xhr.total );
				
			},
			err => {

				console.error( err );

			}
		);
	}

	loadPinkPotion(){
    	const loader = new GLTFLoader( ).setPath(`${this.assetsPath}game/`);
        
		
		loader.load(
			'pinkpotion.glb',
			gltf => {

                this.pinkPotion = gltf.scene.children[0];
				this.pinkPotion.name = 'pinkpotion';

                if (this.starLoaded && this.ghostLoaded && this.bombLoaded && this.carLoaded && this.cloudLoaded) {
                    this.initialize();
                }
                this.pinkPotionLoaded = true;

			},
			xhr => {

				this.loadingBar.update('pinkpotion', xhr.loaded, xhr.total );
				
			},
			err => {

				console.error( err );

			}
		);
	}

	loadCandle(){
    	const loader = new GLTFLoader( ).setPath(`${this.assetsPath}game/`);
        
		
		loader.load(
			'candle.glb',
			gltf => {

                this.candle = gltf.scene.children[0];
				this.candle.name = 'candle';

                if (this.starLoaded && this.ghostLoaded && this.bombLoaded && this.carLoaded && this.cloudLoaded) {
                    this.initialize();
                }
                this.CandleLoaded = true;

			},
			xhr => {

				this.loadingBar.update('candle', xhr.loaded, xhr.total );
				
			},
			err => {

				console.error( err );

			}
		);
	}


	loadCar(modelName = 'car'){
		const loader = new GLTFLoader( ).setPath(`${this.assetsPath}game/`);
	
		
		loader.load(
			modelName + '.glb',
			gltf => {
	
				this.car = gltf.scene.children[0];
				this.car.name = 'car';
	
				if (this.starLoaded && this.ghostLoaded && this.bombLoaded && this.pinkPotionLoaded && this.cloudLoaded) {
					this.initialize();
				}
				this.carLoaded = true;
	
			},
			xhr => {
	
				this.loadingBar.update(modelName, xhr.loaded, xhr.total );
				
			},
			err => {
	
				console.error( err );
	
			}
		);
	}
	

	loadStairs(){
		const loader = new GLTFLoader( ).setPath(`${this.assetsPath}game/`);
	
		
		loader.load(
			'stairs.glb',
			gltf => {
	
				this.stairs = gltf.scene.children[0];
				this.stairs.name = 'stairs';
				this.stairs.scale.set(0.7,0.7,0.7);
	
				if (this.starLoaded && this.ghostLoaded && this.bombLoaded && this.pinkPotionLoaded && this.cloudLoaded) {
					this.initialize();
				}
				this.stairsLoaded = true;
	
			},
			xhr => {
	
				this.loadingBar.update('stairs', xhr.loaded, xhr.total );
				
			},
			err => {
	
				console.error( err );
	
			}
		);
	}

	loadSpiderweb(){
		const loader = new GLTFLoader( ).setPath(`${this.assetsPath}game/`);
	
		
		loader.load(
			'spiderweb.glb',
			gltf => {
	
				this.spiderweb = gltf.scene.children[0];
				this.spiderweb.name = 'spiderweb';
	
				if (this.starLoaded && this.ghostLoaded && this.bombLoaded && this.pinkPotionLoaded && this.cloudLoaded) {
					this.initialize();
				}
				this.spiderwebLoaded = true;
	
			},
			xhr => {
	
				this.loadingBar.update('spiderweb', xhr.loaded, xhr.total );
				
			},
			err => {
	
				console.error( err );
	
			}
		);
	}

	loadCloud(){
    	const loader = new GLTFLoader( ).setPath(`${this.assetsPath}game/`);
        
		
		loader.load(
			'cloud.glb',
			gltf => {

                this.cloud = gltf.scene.children[0];
				this.cloud.name = 'cloud';

                if (this.starLoaded && this.ghostLoaded && this.bombLoaded && this.carLoaded) {
                    this.initialize();
                }
                this.cloudLoaded = true;

			},
			xhr => {

				this.loadingBar.update('cloud', xhr.loaded, xhr.total );
				
			},
			err => {

				console.error( err );

			}
		);
	}
	
	initStars(obstacle) {
		for (let i = 0; i < 6; i++) {
			const starClone = this.star.clone();
			starClone.name = 'star'
			if (i < 6) {
				starClone.position.y = 0;
				starClone.position.x = Math.floor(Math.random() * 3);
				starClone.position.z = Math.floor(Math.random() * 8) + (i * 5);
				
			} 
			obstacle.add(starClone);
		}
	}

	initCars(obstacle) {
		this.car.position.z = 95
		this.car.position.y = Math.floor(Math.random() * 8) * - 2;
		this.car.position.x = Math.floor(Math.random() * 9);
		obstacle.add(this.car);
	}

	initStairs(obstacle) {
		this.stairs.position.z = 85
		this.stairs.position.y = Math.floor(Math.random() * 8) * - 2;
		this.stairs.position.x = Math.floor(Math.random() * 9);
		obstacle.add(this.stairs);
	}

	initSpiderwebs(obstacle) {
		this.spiderweb.position.z = 95
		this.spiderweb.position.y = Math.floor(Math.random() * 8) * - 2;
		this.spiderweb.position.x = Math.floor(Math.random() * 9);
		obstacle.add(this.spiderweb);
	}


	initSpiders(obstacle) {
		for (let i = 0; i < 26; i++) {
			const spiderClone = this.spider.clone();
	
			if (i < 6) {
				spiderClone.position.y = 8;
				spiderClone.position.x = -5 + (i * 5);
				spiderClone.position.z = 10 + (i * 5);
				//Wall of spiders
			} else if (i >= 6 && i < 12) {
				spiderClone.position.y = 0; 
				spiderClone.position.x = -5 + ((i - 6) * 5);
				spiderClone.position.z = 70
			} else if ( i >=12 && i < 18) {
				spiderClone.position.y = -6 
				spiderClone.position.x = -5 + ((i - 12) * 5);
				spiderClone.position.z = - 20 
			} else if ( i >= 18 && i < 24) {
				spiderClone.position.y = -12; 
				spiderClone.position.x = -10 + ((i - 18) * 5);
				spiderClone.position.z = -70
			}
			// Moving boms
			 else if (i >= 24 && i < 25) {
				spiderClone.position.y = 0;
				spiderClone.position.x =  Math.floor(Math.random() * 6);
				spiderClone.position.z = -100;

			 } else if ( i >=25 && i < 26) {
				spiderClone.position.y = 10;
				spiderClone.position.x = Math.floor(Math.random() * 6);
				spiderClone.position.z = -50;

			 }

	
			obstacle.add(spiderClone);
		}
	}

	initBombs(obstacle) {
		for (let i = 0; i < 26; i++) {
			const bombClone = this.bomb.clone();
	
			if (i < 6) {
				bombClone.position.y = 8;
				bombClone.position.x = -5 + (i * 5);
				bombClone.position.z = 10 + (i * 5);
				//Wall of bombs
			} else if (i >= 6 && i < 12) {
				bombClone.position.y = 0; 
				bombClone.position.x = -5 + ((i - 6) * 5);
				bombClone.position.z = 70
			} else if ( i >=12 && i < 18) {
				bombClone.position.y = -6 
				bombClone.position.x = -5 + ((i - 12) * 5);
				bombClone.position.z = - 20 
			} else if ( i >= 18 && i < 24) {
				bombClone.position.y = -12; 
				bombClone.position.x = -10 + ((i - 18) * 5);
				bombClone.position.z = -70
			}
			// Moving boms
			 else if (i >= 24 && i < 25) {
				bombClone.position.y = 0;
				bombClone.position.x =  Math.floor(Math.random() * 6);
				bombClone.position.z = -100;
				bombClone.name = 'animatebomb'
			 } else if ( i >=25 && i < 26) {
				bombClone.position.y = 10;
				bombClone.position.x = Math.floor(Math.random() * 6);
				bombClone.position.z = -50;
				bombClone.name = 'animatebomb1'
			 }

	
			obstacle.add(bombClone);
		}
	}

	initPinkPotion(obstacle) {
		for (let i = 0; i < 2; i++) {
			const pinkPotionClone = this.pinkPotion.clone();
			pinkPotionClone.name = 'pinkpotion';
	
			if (i < 1) {
				pinkPotionClone.position.y = 10;
				pinkPotionClone.position.x = -15;
				pinkPotionClone.position.z = -24;
				
			}  else if (i <= 1) {
				pinkPotionClone.position.y = 10;
				pinkPotionClone.position.x = 15;
				pinkPotionClone.position.z = -20;
			}
			obstacle.add(pinkPotionClone);
	}
	}
	

	initGhosts(obstacle) {
		this.ghost.position.y = -2
		this.ghost.position.z = 10;
		this.ghost.rotation.y = Math.PI / 2 *2;
		obstacle.add(this.ghost);
	}

	initClock(obstacle) {
		if (this.clock) {
			this.clock.position.y = Math.floor(Math.random() * 10);
			this.clock.position.z = -30;
			this.clock.position.x = -14;
			// this.clock.rotation.y = Math.PI / 2 *2;
			obstacle.add(this.clock);
		}
		
	}

	initCandles(obstacle) {
		for (let i = 0; i < 18; i++) {
			const candleClone = this.candle.clone();
	
			if (i < 4) {
				candleClone.position.y = 8;
				candleClone.position.x = -5 + (i * 5);
				candleClone.position.z = 10 + (i * 5);
				//Wall of candles
			} else if (i >= 4 && i < 8) {
				candleClone.position.y = 0; 
				candleClone.position.x = -5 + ((i - 6) * 5);
				candleClone.position.z = 70
			} else if ( i >=8 && i < 12) {
				candleClone.position.y = -6 
				candleClone.position.x = -5 + ((i - 12) * 5);
				candleClone.position.z = - 20 
			} else if ( i >= 12 && i < 16) {
				candleClone.position.y = -12; 
				candleClone.position.x = -10 + ((i - 18) * 5);
				candleClone.position.z = -70
			}
			// Moving boms
			 else if (i >= 16 && i < 17) {
				candleClone.position.y = 0;
				candleClone.position.x =  Math.floor(Math.random() * 6);
				candleClone.position.z = -100;
			 } else if ( i >=17 && i < 18) {
				candleClone.position.y = 10;
				candleClone.position.x = Math.floor(Math.random() * 6);
				candleClone.position.z = -50;
			 }

	
			obstacle.add(candleClone);
		}
	}
	initialize() {
		
		this.obstacles = [];
	
		this.obstacleRespawns++;

		const obstacle = new Group();
		
		obstacle.removable = true;
		if (this.game.sky === 'clouds') { 
		this.initStars(obstacle);
		this.initPinkPotion(obstacle);
		this.initCars(obstacle);
		//this.initBombs(obstacle);
		this.initGhosts(obstacle);
		this.initClock(obstacle);
		} 
		else if (this.game.sky === 'castle') {
		this.initStars(obstacle);
		this.initPinkPotion(obstacle);
		this.initCandles(obstacle);
		this.initGhosts(obstacle);
		this.initStairs(obstacle);
		this.initClock(obstacle);
		}

		
		else if (this.game.sky === 'forest') {
		this.initStars(obstacle);
		this.initSpiders(obstacle);
		this.initSpiderwebs(obstacle);
		this.initPinkPotion(obstacle);
		this.initClock(obstacle);
		}
		else if (this.game.sky === 'galaxy') {
			this.initBombs(obstacle);
			this.initGhosts(obstacle);
			this.initCars(obstacle);
			this.initStars(obstacle);
			this.initClock(obstacle);
		}


		
		const setRandomStarPosition = (star) => {
			const possibleXValues = [-15, 0, 15, 10, -10];
			const starX = possibleXValues[Math.floor(Math.random() * 5)];
			star.position.x = starX;
		}
	
		// Create 15 stars with random x positions and add them to the obstacle
		for (let i = 0; i < 15; i++) {
			const newStar = this.star.clone();
			setRandomStarPosition(newStar);
			obstacle.add(newStar);
		}
		


		
		if (this.cloud) {
			this.cloud.position.z = -60;
			this.cloud.position.y = 0;
			this.cloud.position.x = -120;
			obstacle.add(this.cloud);
			const cloudClone = this.cloud.clone();
			cloudClone.name = 'cloud';
			cloudClone.position.z = 10;
			cloudClone.position.x = 100;
			obstacle.add(cloudClone);
		}
		
		// Add a flag to check if it's the first iteration (move it to the side)
		this.firstIteration = true;
	
		// // let rotate = true;
		//add three more rows of obstacles
		for (let i = 0; i < 3; i++) {
			const obstacle1 = obstacle.clone();
		  
			// Find all the children with the name 'star'
			const starClones = obstacle1.children.filter(child => child.name === 'star');
		  
			// Apply setRandomStarPosition to each child
			starClones.forEach((child) => {
			  setRandomStarPosition(child);
			});
		  
			obstacle1.position.x = (i + 1) * 500;
			this.scene.add(obstacle1);
			this.obstacles.push(obstacle1);
		  }



			this.obstacleRespawns++;

			// Only call reset() if it's not the first iteration
			if (!this.firstIteration) {
			this.reset();
			}

			this.ready = true;

			// Update the firstIteration flag
			this.firstIteration = false;

			//this.disposeGroup(obstacle);

	}

	disposeGroup(group) {
		group.traverse((child) => {
		  if (child.geometry) {
			child.geometry.dispose();
		  }
	  
		  if (child.material) {
			if (Array.isArray(child.material)) {
			  child.material.forEach((material) => material.dispose());
			} else {
			  child.material.dispose();
			}
		  }
	  
		  if (child.texture) {
			child.texture.dispose();
		  }
		});
		this.game.scene.remove(group);
	  }
	  
	
	removeObstacles() {
		for (let i = 0; i < this.obstacles.length; i++) {
			this.scene.remove(this.obstacles[i]);
			this.obstacles[i].visible = false;
			//this.disposeGroup(this.obstacles[i]);
		}
		this.obstacles = [];
		this.obstacleRespawns = 0;
		
	}

    removeExplosion( explosion ){
        const index = this.explosions.indexOf( explosion );
        if (index != -1) this.explosions.indexOf(index, 1);
    }

    reset(){
        this.obstacleSpawn = { pos: 20, offset: 5 };
        this.obstacles.forEach( obstacle => this.respawnObstacle(obstacle) );
        let count;
        while( this.explosions.length>0 && count<100){
            this.explosions[0].onComplete();
            count++;
        }
    }

    respawnObstacle(obstacle) {
		this.obstacleSpawn.pos += 140;
		const offset = (Math.random() * 2 - 1) * this.obstacleSpawn.offset;
		this.obstacleSpawn.offset += 0.2;
		obstacle.position.set(0, offset, this.obstacleSpawn.pos);
		//obstacle.children[0].rotation.y = Math.random() * Math.PI * 2;
		obstacle.userData.hit = false;
	
		 
        this.obstacleRespawns++;
		
	}
	

	update(pos, time) {
		let collisionObstacle;
		const elapsedTime = Date.now() / 1000; // Convert to seconds
	
		this.obstacles.forEach(obstacle => {
			// obstacle.children[0].rotateX(0.01);
			const relativePosZ = obstacle.position.z - pos.z;
	
			if (Math.abs(relativePosZ) < 2 && !obstacle.userData.hit) {
				collisionObstacle = obstacle;
			}

			// Move the ghost from left to right in a loop
			
			const ghost = obstacle.children.find(child => child.name === 'ghost');
			if (ghost) {
				ghost.position.x = 10 * Math.sin(elapsedTime * 2);
			}
			

			// // Move the star from left to right in a loop
			obstacle.children.forEach(child => {
				if (child.name === 'star') {
				  child.rotation.y = 2 * Math.sin(elapsedTime);
				}
			  });

			  // // Move the clock from left to right in a loop
			obstacle.children.forEach(child => {
				if (child.name === 'clock') {
				  child.rotation.z = 1.5 * Math.sin(elapsedTime);
				  child.position.y = 10 * Math.sin(elapsedTime * 1.1);
				}
			  });
			
			

			const pinkPotion = obstacle.children.find((child) => {
				if (child.name === 'pinkpotion') {
					child.position.y = 10 * Math.sin(elapsedTime * 0.6);
    				child.rotation.y = 1.3 * Math.sin(elapsedTime);
				}
			})

			//animate bombs
			const animatedBomb = obstacle.children.find((child) => child.name === 'animatebomb');
			const animatedBomb1 = obstacle.children.find((child) => child.name === 'animatebomb1');
			if (animatedBomb && animatedBomb1){
				animatedBomb.position.x = 10 * Math.sin(elapsedTime * 0.9);
				animatedBomb1.position.x = 10 * Math.sin(elapsedTime);
			}
			//Animate cars
			const car = obstacle.children.find((child) => child.name === 'car');
			if (car) {
			car.position.y = 34 * Math.sin(elapsedTime * 0.9);
			car.position.x = 34 * Math.sin(elapsedTime * 0.9);
			car.rotation.set(0, 2, Math.sin(elapsedTime * 3) * 0.2, 'XYZ');
			}
			//Aniamte stairs
			const stairs = obstacle.children.find((child) => child.name === 'stairs');
			if (stairs) {
				stairs.position.y = 0
			stairs.position.x = 0
			stairs.rotation.set(0, Math.sin(elapsedTime) * 2, Math.sin(elapsedTime * 3) * 0.2, 'XYZ');
			}

			//Aniamte spiderwebs
			const spiderweb = obstacle.children.find((child) => child.name === 'spiderweb');
			if (spiderweb) {
			spiderweb.position.x = 0
			spiderweb.position.y =  10 * Math.sin(elapsedTime);
			spiderweb.rotation.set(0, Math.sin(elapsedTime) * 0.9, Math.sin(elapsedTime) * 0.2, 'XYZ');
			}

			//Check for collision with ghost
			this.checkCollision(ghost, pos, obstacle);

			//Check for collision with car
			this.checkCollision(car,pos, obstacle);
			//Check for collision with stairs
			this.checkCollision(stairs, pos, obstacle);
	
			//Check for collision with star(now it's a letter 3d model letter.glb)
			obstacle.children.forEach(child => {
				if (child.name.includes('star')) {
					this.checkCollision(child, pos, obstacle);
				}
			});


			//Check for collision with potion/heart
			
			obstacle.children.forEach(child => {
				if (child.name.includes('pinkpotion')) {
					this.checkCollision(child, pos, obstacle);
				}
			});

			//Check for collision with clock
			
			obstacle.children.forEach(child => {
				if (child.name.includes('clock')) {
					this.checkCollision(child, pos, obstacle);
				}
			});
			

			// Check for collision with bombs
			obstacle.children.forEach(child => {
				if (child.name.includes('bomb')) {
					this.checkCollision(child, pos, obstacle);
				}
			});

			
	
			if (relativePosZ < -120) {
				this.respawnObstacle(obstacle);
			}
		});
	
		if (collisionObstacle !== undefined) {
			collisionObstacle.children.some(child => {
				child.getWorldPosition(this.tmpPos);
				const dist = this.tmpPos.distanceToSquared(pos);
				if (dist < 5) {
					collisionObstacle.userData.hit = true;
					this.hit(child);
					return true;
				}
			});
		}
	
		this.explosions.forEach(explosion => {
			explosion.update(time);
		});
	}
	
	checkCollision(obj, pos, obstacle) {
		if (!obj) return;
		obstacle.children.forEach(child => {
		  
			child.getWorldPosition(this.tmpPos);
			const dist = this.tmpPos.distanceToSquared(pos);
	  
			if (dist < 5 && !child.userData.hit) {
			  child.userData.hit = true;
			  this.hit(child);
			}
		  
		});
	  }
	  
	  
	  
	  
	

	
	removeObstaclesByNames(names) {
		for (const obstacle of this.obstacles) {
			if (obstacle.name === names) {
				this.scene.remove(obstacle);
			}
		}
	}
	

	
	
	
	

	

	hit(obj) {
		if (obj.name == 'star') {
			if (obj.visible) {
				obj.visible = false;
				this.game.incScore();
			}
		} else if (obj.name == 'ghost') {
			this.explosions.push(new Explosion(obj, this));
			this.game.decLives();
		}else if (obj.name == 'pinkpotion') {
			obj.visible = false;
			this.game.incLives();
		} else if (obj.name == 'car' || obj.name === 'stairs' || obj.name === 'spiderweb') {
			this.explosions.push(new Explosion(obj, this));
			this.game.decLives();
			this.game.decLives();
			this.game.decLives();
		} else if (obj.name === 'clock') {
			obj.visible = false;
			this.game.decTime();
		} else {
			this.explosions.push(new Explosion(obj, this));
			this.game.decLives();
		}
	}
	
	
}

export { Obstacles };