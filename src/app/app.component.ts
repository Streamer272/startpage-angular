import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core'
import * as moment from 'moment';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
    @ViewChild("time") timeElement?: ElementRef;
    @ViewChild("date") dateElement?: ElementRef;

    ngAfterViewInit() {
        this.updateTime()
        setInterval(this.updateTime, 500);
    }

    private updateTime() {
        this.timeElement!!.nativeElement.innerText = moment().format("[It's] h:mm A")
        this.dateElement!!.nativeElement.innerText = moment().format("ddd MMM D, YYYY")
    }

    public search(query: string) {
        window.location.href = `https://www.google.com/search?q=${query}`
    }

    public openGoogle() {
        window.location.href = "https://www.google.com/"
    }
}
