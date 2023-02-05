import {Component} from '@angular/core';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
})
export class SearchComponent {
    public search(query: string) {
        window.location.href = `https://www.google.com/search?q=${query}`
    }
}
