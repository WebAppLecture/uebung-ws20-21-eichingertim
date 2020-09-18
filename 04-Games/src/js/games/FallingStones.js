import { GameTemplate } from "./GameTemplate.js"
import { Paddle } from "./Pong.js"
import {Ball, GameObject} from "../GameObject.js"

let instance;

export class FallingStones extends GameTemplate {

    start() {
        instance = this;
        this.gameOver = false;
        this.player = new Paddle(210 - 60/2, 440, 60, 60, 10);
        this.bullets = [];
        this.stones = [];
        this.currentFrame = 0;
    }

    bindControls() {
        this.inputBinding = {
            "left": this.player.left.bind(this.player), 
            "right": this.player.right.bind(this.player),
            "up": this.createBullet.bind(this),
        };
    }

    createBullet() {
        let bullet = new Ball(this.player.x, this.player.y, 20, 30, "#6bd26b", 0, -8);
        this.bullets.push(bullet);
    }

    update(ctx) {
        this.player.update(ctx);
        this.bullets.forEach(bullet => {
            bullet.update(ctx);
        });
        this.handleBulletOutOField();
        this.createAndHandleStones(ctx);
    }

    createAndHandleStones(ctx) {
        this.stones.forEach(stone => {
            stone.update(ctx);
        });
        for( let i = 0; i < this.stones.length; i++){ 
            if ( this.stones[i].y > 500) { 
                this.stones.splice(i, 1); 
            }
        }

        if (this.currentFrame > 100) {
            this.currentFrame = 0;
            this.createStones(ctx);
        } else {
            this.currentFrame++;
        }
    }

    createStones() {
        let stone = new Ball(Math.floor(Math.random() * Math.floor(420-60)), 0, 60, 90, "#6bd26b", 0, 5);
        instance.stones.push(stone);
    }

    handleBulletOutOField() {
        let newBulletArray = [];
        let newStonesArray = [];
        for( let i = 0; i < this.bullets.length; i++){ 
            if (this.bullets[i].y > 10) { 
                newBulletArray.push(this.bullets[i]);
            } else {
                for (let j = 0; j < this.stones.length; j++) {
                    if (!GameObject.rectangleCollision(this.bullets[i]), this.stones[j]) {
                        newStonesArray.push(this.stones[j]);
                    }
                }
            }
        }
        this.stones = newStonesArray;
        this.bullets = newBulletArray;
    }

    draw(ctx) {
        this.player.draw(ctx);
        this.bullets.forEach(bullet => {
            bullet.draw(ctx);
        });
        this.stones.forEach(stone => {
            stone.draw(ctx);
        });
    }



    static get NAME() {
        return "Falling Stones";
    }

}
