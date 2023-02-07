import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent {
    @Input() label: string = ""
    @Input() value: string = ""
    @Input() options: string[] = []
    @Output() change: EventEmitter<boolean> = new EventEmitter<boolean>()
    opened: boolean = false

    public toggle() {
        this.opened = !this.opened
    }
}
