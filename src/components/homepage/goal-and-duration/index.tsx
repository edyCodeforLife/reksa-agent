import * as React from 'react';
import SVG from 'svg.js';
import {randomChar} from '../../../data/global/functions';
import { css } from 'aphrodite';
import {styles} from './styles';
import {globalGreenColor, globalYellowColor} from '../../../data/global/variables';

export class GoalAndDuration extends React.Component<any, any> {
    element: any = null;
    width: any = null;
    height: any = null;
    context: any = null;
    draw: any = null;
    toComplete: any = '% to Complete';
    txt: any = null;
    id: string = randomChar();
    firstCircle: any = null;

    color: any = globalGreenColor;

    constructor(props) {
        super(props);

        this.color = props.type === 'duration' ? globalYellowColor:globalGreenColor;

        this.drawCircle = this.drawCircle.bind(this);
        this.drawCircleInside = this.drawCircleInside.bind(this);
        this.drawLine = this.drawLine.bind(this);

        this.assignDimension = this.assignDimension.bind(this);
        this.drawOutline = this.drawOutline.bind(this);
        this.drawAndAnimate = this.drawAndAnimate.bind(this);
        this.drawImage = this.drawImage.bind(this);
    }

    componentDidMount() {
        setTimeout(() => {
            this.assignDimension();
            this.drawOutline();
        }, 500);
    }

    componentWillReceiveProps(nextProps: any) {
        if (nextProps && nextProps.visible) {
            setTimeout(() => {
                if (this.element) {
                    // sikat maang
                    setTimeout(() => {
                        if (this.firstCircle) {
                            this.firstCircle.animate(300).fill(this.color)
                                .after(() => {
                                    this.drawAndAnimate();
                                });
                        }
                    }, 1000)
                }
            }, 300);
        }
    }

    drawAndAnimate() {
        let y = 0;
        let percentage = this.props.type === 'duration'?67: 75;
        let lineWidth = this.width-(percentage === 50 ? 85: 60);
        let _toWidth = lineWidth * percentage/100;
        let stepPercent = parseFloat(((5/lineWidth) * 100).toFixed(2));

        if (percentage < 50) {
            this.txt.move(lineWidth + 50, 25);
            this.txt.font('anchor', 'end');
        }
        this.txt.fill('#999');

        let animationFrame = (window as any).requestAnimationFrame ||
            (window as any).mozRequestAnimationFrame ||
            (window as any).webkitRequestAnimationFrame ||
            (window as any).msRequestAnimationFrame;

        let middleDraw = false;
        let endDraw = false;

        let drawLine = null;
        let middleInside = null;
        let endInside = null;

        let percentStart = -(stepPercent*1.9);
        let animate = () => {
            let pause = false;
            if (y > this.width - 80 && !endDraw) {
                // let to redraw middle section
                endDraw = true;
                this.drawCircle(this.color, this.width - 45, true);
            }

            if (y > ((this.width - 15)/2) - 40 && !middleDraw) {
                // let to redraw middle section
                middleDraw = true;
                pause = true;
                this.drawCircle(this.color, (this.width - 15) / 2 - 15, true);
            }

            if (y < _toWidth) {
                if (!pause)
                    animationFrame(animate);
                else {
                    setTimeout(() => {
                        animationFrame(animate);
                    }, 300)
                }
            } else {
                setTimeout(() => {
                    let percentToComplete = 100 - percentage;
                    this.txt.text(percentToComplete+this.toComplete);
                });
                drawLine = this.draw.rect(_toWidth, 18);
                drawLine.move(40, 56);
                drawLine.fill(this.color);
                this.drawImage(_toWidth, percentage);
            }

            if (drawLine) {
                drawLine.remove();
            }

            drawLine = this.draw.rect(y, 18);
            drawLine.move(40, 56);
            drawLine.fill(this.color);

            if (middleDraw) {
                if (middleInside) middleInside.remove();
                middleInside = this.drawCircleInside('#fff', (this.width - 15) / 2 - 7);
            }
            if (endDraw) {
                if (endInside) endInside.remove();
                endInside = this.drawCircleInside('#fff', this.width - 37);
            }

            if (percentage !== 0){
                percentStart += stepPercent;
                if (percentStart >=0) {
                    let percentToComplete = 100 - Math.floor(percentStart);
                    this.txt.text(percentToComplete + this.toComplete);
                }
            }
            y += 5;
        };

        animate();
    }

    drawImage(xPos: any, percentage?: any) {
        if (this.draw) {
            if (this.props.type === 'duration') {
                let image = this.draw.image('/assets/logos/20_Kecambah 2.svg', 45, 50);
                let xStart = xPos;
                if (percentage > 91) {
                    xStart = xPos - 30;
                }
                if (percentage > 70) {
                    xStart = xStart - 3;
                }
                image.animate(100).move(xStart + 40, 15).after(() => {
                    let text = this.draw.text(percentage + '%');
                    text.font('family', 'Raleway');
                    text.font('size', '13px');
                    text.fill(this.color);
                    text.move(xStart + 49, 20);
                    text.animate(100).fill('#fff');
                });
            } else {
                let image = this.draw.image('/assets/logos/19_Kecambah 1.svg', 75, 85);
                let xStart = xPos - .7;
                if (percentage > 91) {
                    xStart = xPos - 10;
                }
                image.animate(100).move(xStart, -4).after(() => {
                    let text = this.draw.text(percentage + '%');
                    text.font('family', 'Raleway');
                    text.font('size', '13px');
                    text.fill(this.color);
                    text.move(xStart + 8, 18);
                    text.animate(100).fill('#fff');
                });
            }
        }
    }

    assignDimension() {
        if (this.element) {
            this.height = 100;
            this.width = this.element.parentElement.clientWidth;
            this.draw = SVG(this.id).size(this.width, this.height);
        }
    }

    drawOutline() {
        this.drawLine('#eee', this.width - 65, 40);
        this.firstCircle = this.drawCircle('#eee', 15);
        this.drawCircle('#eee', (this.width -15) / 2 - 15);
        this.drawCircle('#eee', this.width - 45);

        if (this.draw) {
            this.txt = this.draw.text('0' + this.toComplete);
            this.txt.move(10, 25);
            this.txt.font('family', 'Raleway');
            this.txt.fill('#fff');
            this.txt.font('size', '14px');
        }
    }

    drawLine(fill: any, width: any, xPos: any) {
        if (this.draw) {
            let line = this.draw.rect(width, 18);
            line.move(xPos, 56);
            line.fill(fill);
        }
    }

    drawCircleInside(fill: any, start: any) {
        if (this.draw) {
            let insideCircle = this.draw.circle(14);
            insideCircle.fill(fill);
            insideCircle.move(start, 58);
            return insideCircle;
        }
    }

    drawCircle(color: any, start: any, animate?: any) {
        if (this.draw) {
            let lastCircle = this.draw.circle(30);
            lastCircle.move(start, 50);
            lastCircle.fill(color);
            this.drawCircleInside('#fff', start + 8);
            if (animate) lastCircle.animate(300).fill(color);
            else lastCircle.fill(color);

            return lastCircle;
        }
    }

    render() {
        return (
            <div className={css(styles.insinde)} id={this.id} ref={el => { this.element = el; }} />
        )
    }
}