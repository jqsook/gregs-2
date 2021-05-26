import { ProxyState } from "../AppState.js";
import { jobsService } from "../Services/JobsService.js"

export class JobsController {
    constructor() {
        ProxyState.on('jobs', this.drawJobs)
        jobsService.getJobs()
    }
    drawJobs() {
        let template = ''
        ProxyState.jobs.forEach(job => {

            template += job.cardTemplate  
        })
        document.getElementById('listings').innerHTML = template
    }

    addJob(event) {
        try {
            event.preventDefault()
            console.log(event)
            let form = event.target
            let formData = {
                jobtitle: form.jobTitle.value,
                company: form.company.value,
                rate: form.rate.value,
                hours: form.hours.value,
                description: form.description.value
            }
            if (form.jobId.value) {
                formData.id = form.jobId.value
                jobsService.updateJob(formData)
            } else {
                jobsService.addJob(formData)
            }
            form.reset()
            this.toggleForm()
        } catch (e) {
            console.error(e.message)
        }
    }
    deleteJob(id) {
        try {
            if (window.confirm("Delete Job??")) {
                    jobsService.deleteJob(id)
                }
        } catch (e) {
            console.error(e.message)
            }
        }

    editJob(id) {
        let job = ProxyState.jobs.find(j => j.id == id)
        console.log("Found the job", job)
        let form = document.getElementById('job-form')
        form.jobTitle.value = job.jobTitle
        form.company.value = job.company
        form.rate.value = job.rate
        form.hours.value = job.hours
        form.description.value = job.description
    }
    toggleForm() {
        const jobForm = document.getElementById('job-form').content
        const slotElem = document.getElementById('forms')
        slotElem.appendChild(jobForm)
    }
}
