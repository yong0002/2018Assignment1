"use strict";
function pong() {
    function Paddle1() {
        const svg = document.getElementById("canvas"), svgRect = svg.getBoundingClientRect();
        const rect = new Elem(svg, 'rect')
            .attr('x', 20).attr('y', 300)
            .attr('width', 10).attr('height', 70)
            .attr('fill', 'blue');
        Observable.fromEvent(svg, "mousemove")
            .map(({ clientY }) => ({ y: clientY }))
            .filter(({ y }) => ((Number(y) + Number(rect.attr('height')) - svgRect.top <= 600) && Number(y) - svgRect.top >= 0))
            .subscribe(({ y }) => rect.attr('y', Number(y) - Number(rect.attr('height')) / 2 - svgRect.top));
        return rect;
    }
    function Paddle2() {
        const svg = document.getElementById("canvas"), rect1 = new Elem(svg, 'rect')
            .attr('x', 560).attr('y', 300)
            .attr('width', 10).attr('height', 70)
            .attr('fill', 'red');
        return rect1;
    }
    function balltoAIlvl1(ballvelocityx, computerspeed1) {
        const svg = document.getElementById("canvas");
        const divider = new Elem(svg, 'rect')
            .attr('x', 300).attr('y', 0)
            .attr('width', 5).attr('height', 600)
            .attr('fill', 'grey');
        ;
        const circle = new Elem(svg, 'circle')
            .attr('cx', 300)
            .attr('cy', 310)
            .attr('r', 5)
            .attr('fill', 'white');
        let scoreplayer = new Elem(svg, 'text')
            .attr('x', 150)
            .attr('y', 100)
            .attr('font-family', 'Courier New')
            .attr('fill', 'blue')
            .attr('font-size', 30);
        let scoreAI = new Elem(svg, 'text')
            .attr('x', 440)
            .attr('y', 100)
            .attr('font-family', 'Courier New')
            .attr('fill', 'red')
            .attr('font-size', 30);
        let playerboard = new Elem(svg, 'text')
            .attr('x', 50)
            .attr('y', 50)
            .attr('font-family', 'Courier New')
            .attr('fill', 'blue')
            .attr('font-size', 30);
        let AIboard = new Elem(svg, 'text')
            .attr('x', 370)
            .attr('y', 50)
            .attr('font-family', 'Courier New')
            .attr('fill', 'red')
            .attr('font-size', 30);
        let playerwin = new Elem(svg, 'text')
            .attr('x', 70)
            .attr('y', 300)
            .attr('font-family', 'Courier New')
            .attr('fill', 'blue')
            .attr('font-size', 30);
        let aiwin = new Elem(svg, 'text')
            .attr('x', 400)
            .attr('y', 300)
            .attr('font-family', 'Courier New')
            .attr('fill', 'red')
            .attr('font-size', 30);
        let refreshboard1 = new Elem(svg, 'text')
            .attr('x', 315)
            .attr('y', 320)
            .attr('font-family', 'Courier New')
            .attr('fill', 'pink')
            .attr('font-size', 15);
        let refreshboard2 = new Elem(svg, 'text')
            .attr('x', 15)
            .attr('y', 320)
            .attr('font-family', 'Courier New')
            .attr('fill', 'pink')
            .attr('font-size', 15);
        AIboard.elem.textContent = "AI score";
        playerboard.elem.textContent = "Player score";
        scoreplayer.elem.textContent = "0";
        scoreAI.elem.textContent = "0";
        let playerscore = 0;
        let AIscore = 0;
        let rect1 = Paddle1();
        let rect2 = Paddle2();
        let ballvelocityy = Math.random() * 2 - 1;
        let computerspeed = 2;
        let ballmove = Observable.interval(1);
        ballmove.filter(({}) => Number(circle.attr('cx')) > 600 || Number(circle.attr('cx')) < 0)
            .subscribe(() => {
            circle.attr('cx', 300);
            circle.attr('cy', 310);
        });
        ballmove
            .subscribe(({}) => {
            circle.attr('cy', (Number(circle.attr('cy')) + ballvelocityy));
            circle.attr('cx', (Number(circle.attr('cx')) + ballvelocityx));
        });
        ballmove
            .filter(({}) => ((Number(circle.attr('cx'))) - (Number(circle.attr('r'))) > 0 && (Number(circle.attr('cx'))) - (Number(circle.attr('r'))) < 600) && (ballvelocityx < 0))
            .filter(() => (Number(circle.attr('cx'))) > (Number(rect1.attr('x'))) + Number(rect1.attr('width')))
            .filter(() => (Number(circle.attr('cx')) - Number(circle.attr('r'))) < (Number(rect1.attr('x'))) + Number(rect1.attr('width')))
            .filter(() => (Number(circle.attr('cy')) + Number(circle.attr('r'))) > (Number(rect1.attr('y'))))
            .filter(() => (Number(circle.attr('cy')) + Number(circle.attr('r'))) < (Number(rect1.attr('y'))) + Number(rect1.attr('height')))
            .subscribe(({}) => {
            circle.attr("fill", 'blue');
            ballvelocityx = -ballvelocityx;
            ballvelocityy = Math.random() * 2 - 1;
        });
        ballmove
            .filter(({}) => ballvelocityx > 0)
            .filter(() => (Number(circle.attr('cx'))) < (Number(rect2.attr('x'))))
            .filter(() => (Number(circle.attr('cx')) + Number(circle.attr('r'))) > (Number(rect2.attr('x'))))
            .filter(() => (Number(circle.attr('cy')) + Number(circle.attr('r'))) > (Number(rect2.attr('y'))))
            .filter(() => (Number(circle.attr('cy')) + Number(circle.attr('r'))) < (Number(rect2.attr('y')) + Number(rect2.attr('height'))))
            .subscribe(({}) => {
            circle.attr("fill", 'red');
            ballvelocityx = -ballvelocityx;
            ballvelocityy = Math.random() * 2 - 1;
        });
        ballmove.
            filter(({}) => (Number(rect2.attr('y'))) + (Number(rect2.attr('height')) / 2) > Number(circle.attr('cy')))
            .filter(({}) => (Number(rect2.attr('y')) > 0 && Number(rect2.attr('y')) < 600))
            .subscribe(({}) => {
            rect2.attr('y', Number(rect2.attr('y')) - computerspeed1);
        });
        ballmove
            .filter(({}) => (Number(rect2.attr('y'))) + (Number(rect2.attr('height')) / 2) < Number(circle.attr('cy')))
            .subscribe(({}) => {
            rect2.attr('y', Number(rect2.attr('y')) + computerspeed1);
        });
        ballmove
            .filter(({}) => (Number(circle.attr('cy'))) + (Number(circle.attr('r')) / 2) > 0)
            .filter(({}) => (Number(circle.attr('cy'))) + (Number(circle.attr('r')) / 2) > 600)
            .subscribe(({}) => {
            ballvelocityy = -ballvelocityy;
        });
        ballmove
            .filter(({}) => (Number(circle.attr('cy'))) - (Number(circle.attr('r')) / 2) < 0)
            .filter(({}) => (Number(circle.attr('cy'))) - (Number(circle.attr('r')) / 2) < 600)
            .subscribe(({}) => {
            ballvelocityy = -ballvelocityy;
        });
        ballmove
            .filter(() => AIscore <= 11)
            .filter(({}) => (Number(circle.attr('cx'))) + (Number(circle.attr('r')) / 2) > 600)
            .subscribe(({}) => {
            scoreplayer.elem.textContent = String(Math.round(AIscore = AIscore + 1 / 5));
        });
        ballmove
            .filter(() => playerscore <= 11)
            .filter(({}) => (Number(circle.attr('cx'))) - (Number(circle.attr('r')) / 2) < 1 || (Number(circle.attr('cx'))) + (Number(circle.attr('r')) / 2) > 600 && (ballvelocityx < 0))
            .subscribe(({}) => {
            scoreAI.elem.textContent = String(Math.round(playerscore = playerscore + 1 / 5));
        });
        ballmove
            .filter(({}) => (Number(scoreAI.elem.textContent) === 11))
            .subscribe(({}) => {
            computerspeed = 0;
            computerspeed1 = 0;
            aiwin.elem.textContent = "AI win";
            ballvelocityx = 0;
            ballvelocityy = 0;
            rect1.elem.remove();
            rect2.elem.remove();
            circle.elem.remove();
            refreshboard1.elem.textContent = "The page will refresh in 5 secs";
            setTimeout("location.reload(true);", 5000);
        });
        ballmove.filter(({}) => (Number(scoreplayer.elem.textContent) === 11))
            .subscribe(({}) => {
            computerspeed = 0;
            computerspeed1 = 0;
            playerwin.elem.textContent = "Player win";
            rect1.elem.remove();
            rect2.elem.remove();
            circle.elem.remove();
            ballvelocityx = 0;
            ballvelocityy = 0;
            refreshboard2.elem.textContent = "The page will refresh in 5 secs";
            setTimeout("location.reload(true);", 5000);
            return ballvelocityx;
        });
    }
    function balltoAIlvlGodlike(ballvelocityx, computerspeed1) {
        const svg = document.getElementById("canvas");
        const circle = new Elem(svg, 'circle')
            .attr('cx', 300)
            .attr('cy', 310)
            .attr('r', 5)
            .attr('fill', 'white');
        let scoreplayer = new Elem(svg, 'text')
            .attr('x', 150)
            .attr('y', 100)
            .attr('font-family', 'Courier New')
            .attr('fill', 'blue')
            .attr('font-size', 30);
        let scoreAI = new Elem(svg, 'text')
            .attr('x', 440)
            .attr('y', 100)
            .attr('font-family', 'Courier New')
            .attr('fill', 'red')
            .attr('font-size', 30);
        let playerboard = new Elem(svg, 'text')
            .attr('x', 50)
            .attr('y', 50)
            .attr('font-family', 'Courier New')
            .attr('fill', 'blue')
            .attr('font-size', 30);
        let AIboard = new Elem(svg, 'text')
            .attr('x', 370)
            .attr('y', 50)
            .attr('font-family', 'Courier New')
            .attr('fill', 'red')
            .attr('font-size', 30);
        let playerwin = new Elem(svg, 'text')
            .attr('x', 200)
            .attr('y', 300)
            .attr('font-family', 'Courier New')
            .attr('fill', 'blue')
            .attr('font-size', 30);
        let aiwin = new Elem(svg, 'text')
            .attr('x', 230)
            .attr('y', 300)
            .attr('font-family', 'Courier New')
            .attr('fill', 'red')
            .attr('font-size', 30);
        let tiebreaker = new Elem(svg, 'text')
            .attr('x', 200)
            .attr('y', 300)
            .attr('font-family', 'Courier New')
            .attr('fill', 'red')
            .attr('font-size', 30);
        let refreshboard = new Elem(svg, 'text')
            .attr('x', 170)
            .attr('y', 330)
            .attr('font-family', 'Courier New')
            .attr('fill', 'pink')
            .attr('font-size', 15);
        AIboard.elem.textContent = "AI score";
        playerboard.elem.textContent = "Player score";
        scoreplayer.elem.textContent = "0";
        scoreAI.elem.textContent = "0";
        let playerscore = 0;
        let AIscore = 0;
        let rect1 = Paddle1();
        let rect2 = Paddle2();
        let ballvelocityy = 3;
        let computerspeed = 2;
        let timer = new Elem(svg, 'text')
            .attr('x', 290)
            .attr('y', 120)
            .attr('font-family', 'Courier New')
            .attr('fill', 'pink')
            .attr('font-size', 30);
        let watch1 = Math.round(Math.random() * 100 - 1);
        let observewatch = Observable.interval(1000)
            .filter(() => watch1 >= 0)
            .map(() => watch1 = watch1 - 1)
            .subscribe(() => timer.elem.textContent = String(watch1));
        let ballmove = Observable.interval(5);
        ballmove.filter(({}) => Number(circle.attr('cx')) > 600 || Number(circle.attr('cx')) < 0)
            .subscribe(() => {
            circle.attr('cx', 300);
            circle.attr('cy', 310);
        });
        ballmove
            .subscribe(({}) => {
            circle.attr('cy', (Number(circle.attr('cy')) + ballvelocityy));
            circle.attr('cx', (Number(circle.attr('cx')) + ballvelocityx));
        });
        ballmove
            .filter(({}) => ((Number(circle.attr('cx'))) - (Number(circle.attr('r'))) > 0 && (Number(circle.attr('cx'))) - (Number(circle.attr('r'))) < 600) && (ballvelocityx < 0))
            .filter(() => (Number(circle.attr('cx'))) > (Number(rect1.attr('x'))) + Number(rect1.attr('width')))
            .filter(() => (Number(circle.attr('cx')) - Number(circle.attr('r'))) < (Number(rect1.attr('x'))) + Number(rect1.attr('width')))
            .filter(() => (Number(circle.attr('cy')) + Number(circle.attr('r'))) > (Number(rect1.attr('y'))))
            .filter(() => (Number(circle.attr('cy')) + Number(circle.attr('r'))) < (Number(rect1.attr('y'))) + Number(rect1.attr('height')))
            .subscribe(({}) => {
            circle.attr("fill", 'blue');
            ballvelocityx = -ballvelocityx;
            ballvelocityy = Math.random() * 4 - 2;
        });
        ballmove
            .filter(({}) => ballvelocityx > 0)
            .filter(() => (Number(circle.attr('cx'))) < (Number(rect2.attr('x'))))
            .filter(() => (Number(circle.attr('cx')) + Number(circle.attr('r'))) > (Number(rect2.attr('x'))))
            .filter(() => (Number(circle.attr('cy')) + Number(circle.attr('r'))) > (Number(rect2.attr('y'))))
            .filter(() => (Number(circle.attr('cy')) + Number(circle.attr('r'))) < (Number(rect2.attr('y')) + Number(rect2.attr('height'))))
            .subscribe(({}) => {
            circle.attr("fill", 'red');
            ballvelocityx = -ballvelocityx;
            ballvelocityy = Math.random() * 4 - 2;
        });
        ballmove.
            filter(({}) => (Number(rect2.attr('y'))) + (Number(rect2.attr('height')) / 2) > Number(circle.attr('cy')))
            .filter(({}) => (Number(rect2.attr('y')) > 0 && Number(rect2.attr('y')) < 600))
            .subscribe(({}) => {
            rect2.attr('y', Number(rect2.attr('y')) - computerspeed1);
        });
        ballmove
            .filter(({}) => (Number(rect2.attr('y'))) + (Number(rect2.attr('height')) / 2) < Number(circle.attr('cy')))
            .subscribe(({}) => {
            rect2.attr('y', Number(rect2.attr('y')) + computerspeed1);
        });
        ballmove
            .filter(({}) => (Number(circle.attr('cy'))) + (Number(circle.attr('r')) / 2) > 0)
            .filter(({}) => (Number(circle.attr('cy'))) + (Number(circle.attr('r')) / 2) > 600)
            .subscribe(({}) => {
            ballvelocityx = Math.random() * 4 - 2;
            ballvelocityy = -ballvelocityy;
        });
        ballmove
            .filter(({}) => (Number(circle.attr('cy'))) - (Number(circle.attr('r')) / 2) < 0)
            .filter(({}) => (Number(circle.attr('cy'))) - (Number(circle.attr('r')) / 2) < 600)
            .subscribe(({}) => {
            ballvelocityx = Math.random() * 4 - 2;
            ballvelocityy = -ballvelocityy;
        });
        ballmove
            .filter(({}) => (Number(circle.attr('cx'))) + (Number(circle.attr('r')) / 2) > 600)
            .subscribe(({}) => {
            scoreplayer.elem.textContent = String(Math.round(AIscore = AIscore + 1 / 5));
        });
        ballmove
            .filter(({}) => (Number(circle.attr('cx'))) - (Number(circle.attr('r')) / 2) < 1 || (Number(circle.attr('cx'))) + (Number(circle.attr('r')) / 2) > 600 && (ballvelocityx < 0))
            .subscribe(({}) => {
            scoreAI.elem.textContent = String(Math.round(playerscore = playerscore + 1 / 5));
        });
        ballmove
            .filter(({}) => Number(scoreAI.elem.textContent) >= 0)
            .filter(({}) => watch1 < 0)
            .filter(({}) => ((Number(scoreAI.elem.textContent) > Number(scoreplayer.elem.textContent))))
            .subscribe(({}) => {
            timer.elem.remove();
            computerspeed = 0;
            computerspeed1 = 0;
            aiwin.elem.textContent = "AI WIN!";
            ballvelocityx = 0;
            ballvelocityy = 0;
            rect1.elem.remove();
            rect2.elem.remove();
            circle.elem.remove();
            refreshboard.elem.textContent = "The page will fresh in 5 secs";
            setTimeout("location.reload(true);", 5000);
            clearTimeout();
        });
        ballmove.filter(({}) => (Number(scoreplayer.elem.textContent) > Number(scoreAI.elem.textContent)))
            .filter(({}) => watch1 < 0)
            .filter(({}) => Number(scoreplayer.elem.textContent) >= 0)
            .subscribe(({}) => {
            timer.elem.remove();
            computerspeed = 0;
            computerspeed1 = 0;
            playerwin.elem.textContent = "PLAYER WIN!";
            setTimeout("location.reload(true);", 5000);
            rect1.elem.remove();
            rect2.elem.remove();
            circle.elem.remove();
            refreshboard.elem.textContent = "The page will fresh in 5 secs";
            ballvelocityx = 0;
            ballvelocityy = 0;
            clearTimeout();
        });
        ballmove
            .filter(({}) => Number(scoreplayer.elem.textContent) >= 0 && Number(scoreAI.elem.textContent) >= 0)
            .filter(({}) => watch1 < 0)
            .filter(({}) => (Number(scoreplayer.elem.textContent) === Number(scoreAI.elem.textContent)))
            .subscribe(({}) => {
            timer.elem.remove();
            computerspeed = 0;
            computerspeed1 = 0;
            tiebreaker.elem.textContent = "TIE BREAKER!";
            setTimeout("location.reload(true);", 5000);
            rect1.elem.remove();
            rect2.elem.remove();
            circle.elem.remove();
            refreshboard.elem.textContent = "The page will fresh in 5 secs";
            ballvelocityx = 0;
            ballvelocityy = 0;
            clearTimeout();
            return ballvelocityx;
        });
    }
    const svg1 = document.getElementById('BalltoAI');
    Observable.fromEvent(svg1, "click")
        .subscribe(() => {
        balltoAIlvl1(1, 0.75);
    });
    const svg2 = document.getElementById('BalltoAI2');
    Observable.fromEvent(svg2, "click")
        .subscribe(() => {
        balltoAIlvl1(2, 0.7);
    });
    const svg3 = document.getElementById('BalltoAI3');
    Observable.fromEvent(svg3, "click")
        .subscribe(() => {
        balltoAIlvl1(3, 0.7);
    });
    const svg4 = document.getElementById('BalltoAI4');
    Observable.fromEvent(svg4, "click")
        .subscribe(() => {
        balltoAIlvlGodlike(3, 1.5);
    });
}
if (typeof window != 'undefined')
    window.onload = () => {
        pong();
    };
//# sourceMappingURL=pong.js.map