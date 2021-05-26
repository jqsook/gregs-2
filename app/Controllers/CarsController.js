import { ProxyState } from "../AppState.js";
import { carsService } from "../Services/CarsService.js";

export class CarsController {
    constructor(){
        ProxyState.on('cars', this.drawCars)
        carsService.getCars()

        // this.drawCars()

    }
    drawCars(){
        let template = ''
        ProxyState.cars.forEach(car =>{

            template += car.cardTemplate


        })
        document.getElementById('listings').innerHTML = template
    }

    addCar(event){
        try{
            event.preventDefault()
            console.log(event)
            let form = event.target
            let formData = {
                make: form.make.value,
                model: form.model.value,
                year: form.year.value,
                price: form.price.value,
                imgUrl: form.imgUrl.value,
            }
            if(form.carId.value){
                formData.id = form.carId.value
                carsService.updateCar(formData)
            }else{
                carsService.addCar(formData)
            }
            form.reset()
            this.toggleForm()
        }catch(e){
            console.error(e.message)
        }
    }

    deleteCar(id){
        try {
            if(window.confirm("are you sure this is not reversiable")){
                carsService.deleteCar(id)
            }
        } catch (e) {
            console.error(e.message)
        }
    }

    /**
     * To put the car data in a form
     */
    editCar(id){
        let car = ProxyState.cars.find(c => c.id == id)
        console.log("did it find the car?", car)
        let form = document.getElementById('car-form')
        form.make.value = car.make
        form.model.value = car.model
        form.year.value = car.year
        form.price.value = car.price
        form.imgUrl.value = car.imgUrl
        form.carId.value = car.id
    }

    toggleForm(){
        // @ts-ignore
        const carForm = document.getElementById('car-form').content
        const slotElem = document.getElementById('forms')
        slotElem.appendChild(carForm)
    }

}