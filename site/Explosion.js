import { IcosahedronGeometry, TextureLoader, Mesh, MeshBasicMaterial } from '../libs/three137/three.module.js';
import { Tween } from '../libs/Toon3D.js';

class Explosion {

  constructor(parent, obstacles) {
    const geometry = new IcosahedronGeometry(20, 1);
    this.obstacles = obstacles;

    const texture = new TextureLoader().load(`${game.assetsPath}plane/explosion.png`);

    const material = new MeshBasicMaterial({
      map: texture,
      transparent: true,
      opacity: 1
    });

    this.ball = new Mesh(geometry, material);
    let scale = 0.5;
    if (parent.name === 'candle') {
      scale = 2.5;
    } else if (parent.name === 'spider' || parent.name === 'spiderweb') {
      scale = 4;
    }  else if (parent.name === 'bomb' || parent.name === 'car') {
      scale = 0.09;
    } else {
      scale = 0.9;
    }
    this.ball.scale.set(scale, scale, scale);
    parent.add(this.ball);

    this.tweens = [];
 
      this.tweens.push(new Tween(this.ball.scale, 'x', 100.3, 105.5, this.onComplete.bind(this), 'outQuad'));

    this.active = true;
    this.startTime = performance.now();
  }

  onComplete() {
    this.ball.parent.remove(this.ball);
    this.tweens = [];
    this.active = false;
    this.ball.geometry.dispose();
    this.ball.material.dispose();
    if (this.obstacles) this.obstacles.removeExplosion(this);
  }

  update(time) {
    if (!this.active) return;

    const elapsedTime = (performance.now() - this.startTime) / 1000;

    if (this.tweens.length < 2 && elapsedTime > 1) {
      this.tweens.push(new Tween(this.ball.material, 'opacity', 0, 0.5));
    }

    this.tweens.forEach(tween => {
      tween.update(time);
    });

    this.ball.scale.y = this.ball.scale.z = this.ball.scale.x;
  }
}

export { Explosion };
