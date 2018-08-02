import { Component, ElementRef, ViewChild, AfterViewInit } from "@angular/core";
import { IData } from './../data.interface';
import { DataService } from './../data.service';
import * as D3 from "d3";
import {schemeSet2} from "d3-scale-chromatic";

@Component({selector: 'app-pie-chart', templateUrl: './pie-chart.component.html', styleUrls: ['./pie-chart.component.css']})
export class PieChartComponent implements AfterViewInit {
    @ViewChild("containerPieChart") element: ElementRef;

private host: D3.Selection<any,any,any,any>;
private svg: D3.Selection<any,any,any,any>;
private width: number;
private height: number;
private radius: number;
private htmlElement: HTMLElement;
private pieData: IData[];

constructor(private dataService:DataService){

}
    ngAfterViewInit() {
        this.htmlElement = this.element.nativeElement;
        this.host = D3.select(this.htmlElement);
        this.dataService.$data.subscribe(data => {
            this.pieData = data;
            this.buildPie();
        });
    }
    
    private buildPie(): void {
        this.width = 400;
        this.height = 400;
        this.radius = Math.min(this.width, this.height) / 2;
        this.host.html('');
        let innerRadius = this.radius - 50;
        let outerRadius = this.radius - 10;
    
        this.svg = this.host.append('svg')
            .attr('viewBox', `0 0 ${this.width} ${this.height}`)
            .data([this.pieData])
            .attr('width', this.width)
            .attr('height', this.height)
            .append('g')
            .attr('transform', `translate(${this.width / 2},${this.height / 2})`);
    
        let pie = D3.pie();//.value((function(d) { return d}));
        var path = D3.arc().outerRadius( this.radius - 10).innerRadius(0);
        let label = D3.arc().outerRadius(this.radius - 40).innerRadius( this.radius - 40);
    
        let values = this.pieData.map(data => data.value);
    
        let arc = this.svg.selectAll('.arc')
            .data(pie(values))
            .enter()
            .append('g')
            .attr('class', 'arc');
    
        let pieColor = D3.scaleOrdinal(schemeSet2); 
        
        arc.append('path')
            .attr('d', path)
            .attr('fill', function (d, i) {
                return pieColor(i);
            });
    
        arc.append('text')
            .attr('transform', (datum: any) => {
                datum.innerRadius = 0;
                datum.outerRadius = this.radius;
                return 'translate(' + label.centroid(datum) + ')';
            })
            .text((datum, index) => this.pieData[index].label)
            .style('text-anchor', 'middle');
    }

}