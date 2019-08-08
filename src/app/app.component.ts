import { Component, TemplateRef } from '@angular/core';
import { CardComponent } from './card/card.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { GridData } from './grid-data';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

/**
 * Root component of application
 */
export class AppComponent {

    public hoveredCard: CardComponent;
    public modalRef: BsModalRef;
    public newImageBase64: string;
    public gridData: Array<Array<string>> = GridData;
    public readonly dummyImageSrc: string = 'assets/images/dummy.jpg';

    constructor(private modalService: BsModalService) {
        this.modalService.onHidden.subscribe(() => {
            this.closeCard();
            this.newImageBase64 = "";
        });
    }

    /**
     * method to set base64 string of uploaded image
     * @param fileElem HTML element for file upload
     */
    private readImage(fileElem): void {
        let reader = new FileReader();
        reader.onload = (e: any) => {
            this.newImageBase64 = e.target.result;
        }
        reader.readAsDataURL(fileElem.files[0]);
    }

    /**
     * method to open modal for changing card image
     * @param template reference of modal template
     */
    public openEditImageModal(template: TemplateRef<any>): void {
        this.modalRef = this.modalService.show(template);
        document.getElementById("newImage").addEventListener('change', (event) => {
            this.readImage(event.target);
        });
    }

    /**
     * handler of hover event emitted by card,
     * shows transparent overlay for hovered card
     * @param card instance of hovered card
     */
    public onCardHover(card: CardComponent): void {
        // if transparent overlay is visible for a card, do not set it again for newly
        // hovered card
        if (!this.hoveredCard) {
            this.hoveredCard = card;
        }
    }

    /**
     * method to hide transparent overlay
     */
    public closeCard(): void {
        this.hoveredCard = null;
    }

    /**
     * method to hide change image modal
     */
    public hideEditImageModal(): void {
        this.modalRef.hide();
    }

    /**
     * method to change card image with uploaded image
     */
    public changeCardImage(): void {
        if (this.newImageBase64) {
            this.hoveredCard.setImageSrc(this.newImageBase64);
            this.hideEditImageModal();
        }
    }
}
