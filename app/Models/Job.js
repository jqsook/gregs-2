export class Job {
    constructor({ id, jobTitle, company, rate, hours, description,}) {
        this.id = id
        this.jobTitle = jobTitle
        this.company = company
        this.rate = rate
        this.hours = hours
        this.description = description
        
    }

    get cardTemplate() {
        return /*html*/`
    <div class="col-lg-4 listing my-3">
        <div class="card">  
        
        
        <div class="card-body">
            <p>
                <b>${this.company} ${this.jobTitle}</b>
            </p>
            <p>
                <em>$${this.rate}</em>
            </p>

            <button class="btn btn-warning btn-block" onclick="app.jobsController.editCar('${this.id}')">EDIT JOB</button>
            <button class="btn btn-danger btn-block" onclick="app.jobsController.deleteCar('${this.id}')">DELETE JOB</button>
        </div>
        </div>
        </div>
        `
    }
}