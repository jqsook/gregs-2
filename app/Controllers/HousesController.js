import { ProxyState } from "../AppState.js";
import { housesService } from "../Services/HousesService.js"

export class HousesController{
    constructor(){
        ProxyState.on('houses', this.drawHouses)
        housesService.getHouses()
    }

    drawHouses(){
        let template = ''
        ProxyState.houses.forEach(house => {
            template += house.cardTemplate
        })
        document.getElementById('listings').innerHTML = template
    
    }
    addCar(event) {
        try {
            event.preventDefault()
            console.log(event)
            let form = event.target
            let formData = {
                imgUrl: form.imgUrl.value,
                price: form.price.value,
                year: form.year.value,
                bedrooms: form.bedrooms.value
            }
            if (form.carId.value) {
                formData.id = from.houseId.value
                housesService.updateHouse(formData)
            } else {
                housesService.addHouse(formData)
            }
            form.reset()
            this.toggleForm()
        } catch (e) {
            console.error(e.message)
        }
    }
    deleteHouse(id) {
        try {
            if (window.confirm("Are yous ure you want to delete?")) {
                housesService.deletHouse(id)
            }
        } catch (e) {
            console.error(e.message)
        }
    }

    editHome(id) {
        let house = ProxyState.houses.find(c => c.id == id)
        console.log("You found the house in edithome in house controller", house)
        let form = document.getElementById('house-form')
        form.price.value = house.price
        form.imgUrl.value = house.imgUrl
        form.price.value = price.id
        form.bedrooms.value = bedrooms.id
    
    }
    toggleForm() {
        const houseForm = document.getElementById('house-form').content
        const slotElem = document.getElementById('forms')
        slotElem.appendChild(houseForm)
    }
}