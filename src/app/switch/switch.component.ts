import {Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
    selector: 'app-switch',
    templateUrl: './switch.component.html',
    styleUrls: ['./switch.component.scss']
})
export class SwitchComponent {
    @Input() label: string = ""
    @Input() value: boolean = false
    @Input() disabled: boolean = false
    @Output() change: EventEmitter<boolean> = new EventEmitter<boolean>()

    public click() {
        this.value = !this.value
        this.change.emit(this.value)
    }
}
