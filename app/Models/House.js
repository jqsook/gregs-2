export class House {
    constructor({ id, imgUrl, price, bedrooms, bathrooms, description }) {
        this.id = id
        this.imgUrl = imgUrl
        this.price = price
        this.bedrooms = bedrooms
        this.bathrooms = bathrooms
        this.description = description
    }

    get cardTemplate() {
        return /*html*/`
    <div class="col-lg-4 listing my-3">
        <div class="card">  
        <img src="${this.imgUrl}" height="250" /> 
        
        <div class="card-body">
            <p>
                <b>${this.bedrooms} ${this.description}</b>
            </p>
            <p>
                <em>$${this.price.toFixed(2)}</em>
            </p>

            <button class="btn btn-warning btn-block" onclick="app.housesController.editCar('${this.id}')">EDIT House</button>
            <button class="btn btn-danger btn-block" onclick="app.housesController.deleteCar('${this.id}')">DELETE House</button>
        </div>
        </div>
        </div>
        `
    }
}
