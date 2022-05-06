import * as React from 'react';
import SVG from 'svg.js';
import {randomChar} from '../../../data/global/functions';

export class DonutChart extends React.Component<any, any> {
    element: any = null;
    width: any = null;
    height: any = null;
    context: any = null;
    draw: any = null;
    id: string = randomChar();

    constructor(props) {
        super(props);

        this.assignDimension = this.assignDimension.bind(this);
        this.assignValuesAndDraw = this.assignValuesAndDraw.bind(this);
        this.polarToCartesian = this.polarToCartesian.bind(this);
        this.describeArc = this.describeArc.bind(this);
        this.drawPie = this.drawPie.bind(this);

        this.state = {
            data: [ {
                label: 'Fixed Income',
                value: 200,
                color: '#E5EDF5',
            }, {
                label: 'Equity',
                value: 344,
                color: '#29CB97',
            }, {
                label: 'Money Market',
                value: 234,
                color: '#FEC400',
            }, {
                label: 'Balanced',
                explode: true,
                value: 120,
                color: '#034EA1',
            }]
        }
    }

    componentWillReceiveProps(nextProps: any) {
        if (nextProps && nextProps.visible) {
            setTimeout(() => {
                if (this.element) {
                    this.assignDimension();
                    this.assignValuesAndDraw();
                }
            }, 300);
        }
    }

    componentDidMount() {
    }

    assignDimension() {
        if (this.element) {
            this.height = this.element.parentElement.clientHeight;
            this.width = this.element.parentElement.clientWidth;

            this.element.width = this.element.parentElement.clientWidth;
            this.element.height = this.element.parentElement.clientHeight;

            this.draw = SVG(this.id).size(this.width, this.height);
        }
    }

    assignValuesAndDraw() {
        if (this.state.data && this.state.data.length) {
            let total_value = 0;
            let _length = this.state.data.length;
            let start_angle = 75;

            for (let i = 0; i < _length; i++) {
                let datum = this.state.data[i];
                total_value += datum.value;
            }

            for (let i = 0; i < _length; i++) {
                let datum = this.state.data[i];
                if (i === 0)
                    datum.startAngle = start_angle;
                else
                    datum.startAngle = this.state.data[i - 1].endAngle;

                if (total_value === 0 ) {
                    let percentage = .25;
                    let translateToAngle = 360 * percentage;
                    datum.endAngle = datum.startAngle + translateToAngle;
                    datum.percentage = 0;
                    datum.explode = false;
                    datum.color = '#eee';
                } else {
                    let percentage = datum.value / total_value;
                    let translateToAngle = 360 * percentage;
                    datum.endAngle = datum.startAngle + translateToAngle;
                    datum.percentage = parseFloat((percentage * 100).toFixed(2));
                }
            }


            // draw this slice
            this.drawPie(this.state.data[0], () => {
                this.drawPie(this.state.data[1], () => {
                    this.drawPie(this.state.data[2], () => {
                        this.drawPie(this.state.data[3]);
                    });
                });
            });
        }
    }

    polarToCartesian(centerX, centerY, radius, angleInDegrees) {
        let angleInRadians = (angleInDegrees-90) * Math.PI / 180.0;
        return {
            x: centerX + (radius * Math.cos(angleInRadians)),
            y: centerY + (radius * Math.sin(angleInRadians))
        };
    }

    describeArc(x, y, radius, startAngle, endAngle){
        let start = this.polarToCartesian(x, y, radius, endAngle);
        let end = this.polarToCartesian(x, y, radius, startAngle);
        let largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
        let d = [
            "M", start.x, start.y,
            "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
        ].join(" ");
        return d;
    }

    drawPie(data, callback?) {
        let y = data.startAngle;
        let _width = data.explode?45:35;
        let parentWidth = this.height * .3;

        let animationFrame = (window as any).requestAnimationFrame ||
            (window as any).mozRequestAnimationFrame ||
            (window as any).webkitRequestAnimationFrame ||
            (window as any).msRequestAnimationFrame;

        let path = this.draw.path();
        let animate = () => {
            if (y < data.endAngle) {
                animationFrame(animate);
            } else {
                // draw text;
                let radStart = (data.startAngle-90) * Math.PI / 180.0;
                let radEnd = (data.endAngle-90) * Math.PI / 180.0;
                let x = (Math.cos((radEnd + radStart) / 2) * parentWidth*1.3) + this.width/2;
                let y = (Math.sin((radEnd + radStart) / 2) * parentWidth*1.3) + this.height/2;

                let lineStartX;
                let lineEndX;
                let percentTextX;
                let labelTextX;
                let anchor;

                if (x <= this.width/2) {
                    anchor = "end";
                    lineStartX = x - 50;
                    lineEndX = x;
                    percentTextX = lineStartX - 5;
                }
                else {
                    anchor = "start";
                    lineStartX = x;
                    lineEndX = x + 50;
                    percentTextX = lineEndX + 5;
                }

                if (y <= this.height/2) {
                    if (x <= this.width/2) {
                        labelTextX = x + 5;
                    }
                    else {
                        labelTextX = x - 5;
                    }
                } else {
                    if (x <= this.width/2 ) labelTextX = x - 20;
                    else labelTextX = x + 10;
                }


                let txt = this.draw.text(data.label);
                txt.move(labelTextX, y - 25);
                txt.fill('#fff');
                txt.font('anchor', anchor);
                txt.font('family', 'Raleway');
                txt.font('size', '14px');
                txt.animate(200).fill('#777');

                this.draw.line(lineStartX, y, lineEndX, y)
                    .animate(200)
                    .stroke({ width: 2, color: '#999' });

                // draw text percentage
                let txtPercentage = this.draw.text(data.percentage + '%');
                txtPercentage.move(percentTextX, y - 10);
                txtPercentage.font('anchor', anchor);
                txtPercentage.fill('#fff');
                txtPercentage.font('family', 'Raleway');
                txtPercentage.font('size', '16px');
                txtPercentage.animate(200).fill('#555');

                if (callback) callback();
            }

            path.plot(this.describeArc(this.width/2, this.height/2, parentWidth, data.startAngle, y));
            path.fill('none');
            path.stroke({ color: data.color, width: _width, linejoin: 'round'});

            y += 8;
        };

        animate();
    }

    render() {
        return (
            <div id={this.id} ref={el => { this.element = el; }} />
        )
    }
}