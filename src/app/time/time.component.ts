import {AfterViewInit, Component} from '@angular/core';
import * as moment from 'moment';

@Component({
    selector: 'app-time',
    templateUrl: './time.component.html',
    styleUrls: ['./time.component.scss']
})
export class TimeComponent implements AfterViewInit {
    time: string = ""
    date: string = ""

    ngAfterViewInit() {
        this.updateTime()
        setInterval(() => {
            this.updateTime()
        }, 500);
    }

    private updateTime() {
        this.time = moment().format("[It's] h:mm A")
        this.date = moment().format("ddd MMM D, YYYY")
    }
}
