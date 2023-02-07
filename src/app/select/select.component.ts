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
    @Output() change: EventEmitter<string> = new EventEmitter<string>()
    opened: boolean = false

    public toggle() {
        this.opened = !this.opened
    }

    public click(target: string) {
        this.value = target
        this.change.emit(this.value)
        this.opened = false
    }
}
