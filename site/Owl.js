import { Vector3, AnimationMixer, AnimationClip } from '../libs/three137/three.module.js';
import { GLTFLoader } from '../libs/three137/GLTFLoader.js';

class Owl {
    constructor(game) {
        this.assetsPath = game.assetsPath;
        this.loadingBar = game.loadingBar;
        this.game = game;
        this.scene = game.scene;
        this.load();
        this.tmpPos = new Vector3();
        this.mixer = null;
        this.decTime = false;
        this.timer = 0;
        this.currOwlName = false;
    }

    get position() {
        if (this.plane !== undefined) this.plane.getWorldPosition(this.tmpPos);
        return this.tmpPos;
    }

    set visible(mode) {
        this.plane.visible = mode;
    }

    load(owlName) {
        if (owlName) {
            const owl = `${owlName}`; // Assumes the owl filenames are owl1.glb, owl2.glb, etc.
            const loader = new GLTFLoader().setPath(`${this.assetsPath}game/`);
           this.ready = false;
           this.currOwlName = owlName;
           
        
            loader.load(
                owl,
                gltf => {
        
                    this.scene.add(gltf.scene);
                    this.plane = gltf.scene;
                    this.velocity = new Vector3(0, 0, 0.1);
        
                    // Scale the owl
                    const scaleFactor = 1.5;
                    this.plane.scale.set(scaleFactor, scaleFactor, scaleFactor);
        
                    this.ready = true;
        
                    this.mixer = new AnimationMixer(gltf.scene);
                    console.log('Available animations:', gltf.animations.map(animation => animation.name));
        
        
                    const clipName = "birdanimation"; // Replace with the actual name of the animation
                    const clip = AnimationClip.findByName(gltf.animations, clipName);
                    
                    if (clip) {
                        const action = this.mixer.clipAction(clip);
                        if (action) {
                            //play animation 2x faster
                            action.timeScale = 1.5;
                            action.play();
                        } else {
                            console.warn(`Animation action for "${clipName}" not found.`);
                        }
                    } else {
                        console.warn(`Animation clip "${clipName}" not found.`);
                    }
                },
                // called while loading is progressing
                xhr => {
        
                    this.loadingBar.update('plane', xhr.loaded, xhr.total);
        
                },
                // called when loading has errors
                err => {
        
                    console.error(err);
        
                }
            );
        }
        }

        resetSlowdownEffect() {
            this.decTime = false;
            this.timer = 0;
            this.velocity.z = Math.min(this.velocity.z + 0.0009, 0.35);
        }
        
       
    

    updateAnimation(delta) {
        if (this.mixer) {
            this.mixer.update(delta);
        }
    }

    reset() {
        this.plane.position.set(0, 0, 0);
        this.plane.visible = true;
        this.velocity.set(0, 0, 0.06);
    }

    update(time) {

        if (this.lastTime === undefined) {
            this.lastTime = time;
        }
    
        const delta = (time - this.lastTime) / 1000;
        this.lastTime = time;

        if (this.game.active) {
            if (this.game.leftArrowKey) {
                this.velocity.x = 0.07;
            } else if (this.game.rightArrowKey) {
                this.velocity.x = -0.07;
            } else {
                this.velocity.x = 0;
            }

            if (!this.game.spaceKey) {
                if (this.position.y > -22) {
                    this.velocity.y -= 0.0007;
                } else {
                    this.velocity.y = 0;
                }
                
            } else {
                if (this.position.y < 22) {
                    this.velocity.y += 0.0009;
                } else {
                    this.velocity.y = 0;
                }

            }
            this.plane.rotation.set(0, 0, Math.sin(time * 3) * 0.2, 'XYZ');
            this.plane.translateZ(this.velocity.z);
            this.plane.translateY(this.velocity.y);
            this.plane.position.x += this.velocity.x;


            if (this.currOwlName === 'bird1.glb') {
                if (this.game.sky === 'clouds') {
                    if (this.decTime === true) {
                       
                            if (this.timer < 0.1) {
                                this.velocity.z = Math.min(1 + 0.000001, 0.25);
                                // Increase the timer based on the time delta
                                this.timer += delta * 10;
                                setTimeout(() => {
                                    this.resetSlowdownEffect();
                                }, 5000)

                            } else {
                                this.timer = 0;
                                this.decTime = false;
                            }
                        
                    } else {
                        this.velocity.z = Math.min(this.velocity.z + 0.0009, 0.35);
                    }
                } else if (this.game.sky === 'castle') {
                    if (this.decTime === true) {
                        if (this.velocity.z >= 0.3) {
                            if (this.timer < 0.02) {
                                this.velocity.z = Math.min(1 + 0.000001, 0.25);
                                this.timer += delta * 10; 
                                setTimeout(() => {
                                    this.resetSlowdownEffect();
                                }, 5000)
                            } else {
                                this.timer = 0; 
                                this.decTime = false; 
                            }
                        }
                    } else {
                        this.velocity.z = Math.min(this.velocity.z + 0.0009, 0.41);
                    }
                } else if (this.game.sky === 'forest') {
                    if (this.decTime === true) {
                        if (this.velocity.z >= 0.3) {
                            if (this.timer < 0.01) {
                                this.velocity.z = Math.min(1 + 0.000001, 0.3);
                                this.timer += delta; 
                                setTimeout(() => {
                                    this.resetSlowdownEffect();
                                }, 5000)
                            } else {
                                this.timer = 0; 
                                this.decTime = false; 
                            }
                        }
                    } else {
                        this.velocity.z = Math.min(this.velocity.z + 0.0009, 0.55);
                    }
                } else if (this.game.sky === 'galaxy') {
                    if (this.decTime === true) {
                        if (this.velocity.z >= 0.3) {
                            if (this.timer < 0.01) {
                                this.velocity.z = Math.min(1 + 0.000001, 0.3);
                                this.timer += delta; 
                                setTimeout(() => {
                                    this.resetSlowdownEffect();
                                }, 5000)
                            } else {
                                this.timer = 0; 
                                this.decTime = false; 
                            }
                        }
                    } else {
                        this.velocity.z = Math.min(this.velocity.z + 0.0009, 0.65);
                    }
                }
            } else if (this.currOwlName === 'bird2.glb') {
                if (this.game.sky === 'clouds') {
                    if (this.decTime === true) {
                        if (this.velocity.z >= 0.2) {
                            if (this.timer < 0.01) {
                                this.velocity.z = Math.min(1 + 0.000001, 0.2);
                                this.timer += delta; 
                                setTimeout(() => {
                                    this.resetSlowdownEffect();
                                }, 5000)
                            } else {
                                this.timer = 0; 
                                this.decTime = false; 
                            }
                        }
                    } else {
                        this.velocity.z = Math.min(this.velocity.z + 0.0009, 0.25);
                    }
                } else if (this.game.sky === 'castle') {
                    if (this.decTime === true) {
                        if (this.velocity.z >= 0.3) {
                            if (this.timer < 0.008) {
                                this.velocity.z = Math.min(1 + 0.000001, 0.25);
                                this.timer += delta; 
                                setTimeout(() => {
                                    this.resetSlowdownEffect();
                                }, 5000)
                               
                            } else {
                                this.timer = 0; 
                                this.decTime = false; 
                            }
                        }
                    } else {
                        this.velocity.z = Math.min(this.velocity.z + 0.0009, 0.33);
                    }
                } else if (this.game.sky === 'forest') {
                    if (this.decTime === true) {
                        if (this.velocity.z >= 0.3) {
                            if (this.timer < 0.008) {
                                this.velocity.z = Math.min(1 + 0.000001, 0.3);
                                this.timer += delta; 
                                setTimeout(() => {
                                    this.resetSlowdownEffect();
                                }, 5000)
                            } else {
                                this.timer = 0; 
                                this.decTime = false; 
                            }
                        }
                    } else {
                        this.velocity.z = Math.min(this.velocity.z + 0.0009, 0.45);
                    }
                } else if (this.game.sky === 'galaxy') {
                    if (this.decTime === true) {
                        if (this.velocity.z >= 0.3) {
                            if (this.timer < 0.008) {
                                this.velocity.z = Math.min(1 + 0.000001, 0.3);
                                this.timer += delta; 
                                setTimeout(() => {
                                    this.resetSlowdownEffect();
                                }, 5000)
                            } else {
                                this.timer = 0; 
                                this.decTime = false; 
                            }
                        }
                    } else {
                        this.velocity.z = Math.min(this.velocity.z + 0.0009, 0.55);
                    }
                }
            }
            
            


        } else {
            this.plane.rotation.set(0, 0, Math.sin(time * 3) * 0.2, 'XYZ');
            this.plane.position.y = Math.cos(time) * 1.5;
        }
    }
    

}

export {
 Owl };
