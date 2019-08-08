import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.css']
})

/**
 * Reusable component for card
 */
export class CardComponent {

    @Input('imgSrc')
    private imageSrc: string;

    @Input('height')
    public height: number;

    @Input('width')
    public width: number;

    @Output('hover')
    public cardHover: EventEmitter<CardComponent> = new EventEmitter<CardComponent>();

    /**
     * method invoked on hover of card image
     */
    public onHover(): void {
        this.cardHover.emit(this);
    }

    /**
     * method to get src of card image
     * @return src of card image
     */
    public getImageSrc(): string {
        return this.imageSrc;
    }

    /**
     * method to set src of card image
     * @param src src to be set
     */
    public setImageSrc(src: string): void {
        this.imageSrc = src;
    }
}
