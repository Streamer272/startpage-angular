import {Component, Input} from '@angular/core';

@Component({
    selector: 'app-shortcut',
    templateUrl: './shortcut.component.html',
    styleUrls: ['./shortcut.component.scss']
})
export class ShortcutComponent {
    @Input() link1?: string
    @Input() link2?: string
    @Input() title1?: string
    @Input() title2?: string
    @Input() icon1?: string = ""
    @Input() icon2?: string = ""
}
