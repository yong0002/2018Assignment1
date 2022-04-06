"use strict";
function mousePosEvents() {
    const pos = document.getElementById("pos");
    document.addEventListener("mousemove", e => {
        const p = e.clientX + ', ' + e.clientY;
        pos.innerHTML = p;
        if (e.clientX > 400) {
            pos.classList.add('highlight');
        }
        else {
            pos.classList.remove('highlight');
        }
    });
}
function mousePosObservable() {
    const pos = document.getElementById("pos"), o = Observable
        .fromEvent(document, "mousemove")
        .map(({ clientX, clientY }) => ({ x: clientX, y: clientY }));
    o.map(({ x, y }) => `${x},${y}`)
        .subscribe(s => pos.innerHTML = s);
    o.filter(({ x }) => x > 400)
        .subscribe(_ => pos.classList.add('highlight'));
    o.filter(({ x }) => x <= 400)
        .subscribe(_ => pos.classList.remove('highlight'));
}
function animatedRectTimer() {
    const svg = document.getElementById("animatedRect");
    let rect = new Elem(svg, 'rect')
        .attr('x', 100).attr('y', 70)
        .attr('width', 120).attr('height', 80)
        .attr('fill', '#95B3D7');
    const animate = setInterval(() => rect.attr('x', 1 + Number(rect.attr('x'))), 10);
    const timer = setInterval(() => {
        clearInterval(animate);
        clearInterval(timer);
    }, 1000);
}
function animatedRect() {
    const svg = document.getElementById("animatedRect");
    let rect = new Elem(svg, 'rect')
        .attr('x', 100).attr('y', 70)
        .attr('width', 120).attr('height', 80)
        .attr('fill', '#95B3D7');
    Observable.interval(10)
        .takeUntil(Observable.interval(1000))
        .subscribe(() => rect.attr('x', 1 + Number(rect.attr('x'))));
}
function dragRectEvents() {
    const svg = document.getElementById("dragRect"), { left, top } = svg.getBoundingClientRect();
    const rect = new Elem(svg, 'rect')
        .attr('x', 100).attr('y', 70)
        .attr('width', 120).attr('height', 80)
        .attr('fill', '#95B3D7');
    rect.elem.addEventListener('mousedown', ((e) => {
        const xOffset = Number(rect.attr('x')) - e.clientX, yOffset = Number(rect.attr('y')) - e.clientY, moveListener = (e) => {
            rect
                .attr('x', e.clientX + xOffset)
                .attr('y', e.clientY + yOffset);
        }, done = () => {
            svg.removeEventListener('mousemove', moveListener);
        };
        svg.addEventListener('mousemove', moveListener);
        svg.addEventListener('mouseup', done);
        svg.addEventListener('mouseout', done);
    }));
}
function dragRectObservable() {
    const svg = document.getElementById("dragRect"), mousemove = Observable.fromEvent(svg, 'mousemove'), mouseup = Observable.fromEvent(svg, 'mouseup'), rect = new Elem(svg, 'rect')
        .attr('x', 100).attr('y', 70)
        .attr('width', 120).attr('height', 80)
        .attr('fill', '#95B3D7');
    rect.observe('mousemove')
        .map(({ clientX, clientY }) => ({ xOffset: Number(rect.attr('x')) - clientX,
        yOffset: Number(rect.attr('y')) - clientY }))
        .flatMap(({ xOffset, yOffset }) => mousemove
        .takeUntil(mouseup)
        .map(({ clientX, clientY }) => ({ x: clientX + xOffset, y: clientY + yOffset })))
        .subscribe(({ x, y }) => rect.attr('x', x)
        .attr('y', y));
}
function drawRectsObservable() {
    const svg = document.getElementById("drawRects"), mousemove = Observable.fromEvent(svg, 'mousemove'), mouseup = Observable.fromEvent(svg, 'mouseup'), mousedown = Observable.fromEvent(svg, 'mousedown');
    mousedown.map(e => ({ e, svgRect: svg.getBoundingClientRect() }))
        .map(({ e, svgRect }) => ({ svgRect, x0: e.clientX - svgRect.left, y0: e.clientY - svgRect.top }))
        .map(({ svgRect, x0, y0 }) => ({
        rect: new Elem(svg, 'rect')
            .attr('x', x0)
            .attr('y', y0)
            .attr('width', 5)
            .attr('height', '5')
            .attr('fill', '95B3D7'), svgRect, x0, y0
    }))
        .flatMap(({ rect, svgRect, x0, y0 }) => mousemove
        .takeUntil(mouseup)
        .map(e => ({ x0, y0, svgRect, x1: e.clientX - svgRect.left, y1: e.clientY - svgRect.top, rect })))
        .subscribe(({ x0, x1, y0, y1, rect }) => rect.attr('x', Math.min(x0, x1))
        .attr('y', Math.min(y0, y1))
        .attr('width', Math.abs(x0 - x1))
        .attr('height', Math.abs(y0 - y1)));
}
function drawAndDragRectsObservable() {
    const svg = document.getElementById("drawAndDragRects"), mousemove = Observable.fromEvent(svg, 'mousemove'), mouseup = Observable.fromEvent(svg, 'mouseup'), mousedown = Observable.fromEvent(svg, 'mousedown');
    mousedown.map(e => ({ e, svgRect: svg.getBoundingClientRect() }))
        .map(({ e, svgRect }) => ({ svgRect, x0: e.clientX - svgRect.left, y0: e.clientY - svgRect.top }))
        .map(({ svgRect, x0, y0 }) => ({
        rect: new Elem(svg, 'rect')
            .attr('x', x0)
            .attr('y', y0)
            .attr('width', 5)
            .attr('height', '5')
            .attr('fill', '95B4D7'), svgRect, x0, y0
    }))
        .flatMap(({ rect, svgRect, x0, y0 }) => mousemove
        .takeUntil(mouseup)
        .map(e => {
        return rect
            .attr('x', Math.min(x0, (e.clientX - svgRect.left)))
            .attr('y', Math.min(y0, (e.clientY - svgRect.top)))
            .attr('width', Math.abs(x0 - (e.clientX - svgRect.left)))
            .attr('height', Math.abs(y0 - (e.clientY - svgRect.top)));
    }))
        .map(e => e.observe("mousedown")
        .map(function (event1) {
        event1.stopPropagation();
        return event1;
    })
        .map(({ clientX, clientY }) => ({ xOffset: Number(e.attr('x')) - clientX,
        yOffset: Number(e.attr('y')) - clientY }))
        .flatMap(({ xOffset, yOffset }) => mousemove
        .takeUntil(mouseup)
        .map(({ clientX, clientY }) => ({ x: clientX + xOffset, y: clientY + yOffset })))
        .subscribe(({ x, y }) => e.attr('x', x)
        .attr('y', y))).subscribe(s => s);
}
if (typeof window != 'undefined')
    window.onload = () => {
        mousePosEvents();
        animatedRectTimer();
        dragRectEvents();
        dragRectObservable();
        drawRectsObservable();
        drawAndDragRectsObservable();
    };
//# sourceMappingURL=basicexamples.js.map