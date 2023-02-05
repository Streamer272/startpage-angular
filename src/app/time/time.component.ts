import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import * as moment from 'moment';

@Component({
    selector: 'app-time',
    templateUrl: './time.component.html',
    styleUrls: ['./time.component.scss']
})
export class TimeComponent implements AfterViewInit {
    @ViewChild("time", {static: false}) timeElement?: ElementRef;
    @ViewChild("date", {static: false}) dateElement?: ElementRef;

    ngAfterViewInit() {
        this.updateTime(this.timeElement!!, this.dateElement!!)
        setInterval(() => {
            this.updateTime(this.timeElement!!, this.dateElement!!)
        }, 500);
    }

    private updateTime(timeElement: ElementRef, dateElement: ElementRef) {
        timeElement.nativeElement.innerText = moment().format("[It's] h:mm A")
        dateElement.nativeElement.innerText = moment().format("ddd MMM D, YYYY")
    }
}
