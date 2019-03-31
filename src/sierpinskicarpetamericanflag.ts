import { FillStyle } from './utility';
const oldgloryred = "#BF0A30";
const oldgloryblue = "#002868";
const white = "#FFFFFF";


function sierpinskicarpetamericanflag(ctx: CanvasRenderingContext2D, length: number, depth: number){
    const goldenRatio = 1.61803398875;
    
    //draw stripes
    const stripeHeight = length / 13;
    // for(let i = 0; i < 13; i++){
        // ctx.fillStyle = i % 2 == 0 ? "#BF0A30" : "#FFFFFF";
        // ctx.fillRect(0, stripeHeight * i, length, stripeHeight);
    // }

    //draw blue field
    // const blueH = length / 2;
    //  const blueW = blueH * goldenRatio;
    ctx.fillStyle = oldgloryblue;
    ctx.fillRect(0, 0, length, length);
    // ctx.fillRect(0, 0, blueW, blueH);

    function sierpinski(x: number, y: number, length: number, depth: number){
        if(length < 5){
            console.log(depth);
            return;
        }
        if(depth == 0){
            return;
        }

        for(let i = 0; i < 3; i++){
            for(let j = 0; j < 3; j++){
                let l = length / 3;
                if(i == 1 && j == 1){
                    ctx.fillStyle = depth % 2 == 0 ? oldgloryred : white;
                    ctx.fillRect(x + l, y + l, l, l); 
                } else {
                    sierpinski(x + i * l, y + j * l, l, depth - 1);
                }
            }
        }
    }

    sierpinski(0, 0, length, depth);
};

export default sierpinskicarpetamericanflag;