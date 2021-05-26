import { ProxyState } from "../AppState.js";
import { Job } from "../Models/Job.js";

let url = 'https://bcw-sandbox.herokuapp.com/api/jobs/'

class JobsService{
    async updateJob(formData) {
        let res = await axios.put(url + formData.id, formData)

        let indexOfJobToBeUpdated = ProxyState.jobs.findIndex(j => j.id == formData.id)
        ProxyState.jobs.splice(indexOfJobToBeUpdated, 1, new Job(res.data))
        ProxyState.jobs = ProxyState.jobs
    }
    async deleteJob(id) {
        await axios.delete(url + id)
        ProxyState.jobs = ProxyState.jobs.filter(j => j.id != id)
}
    async getJobs() {
        let res = await axios.get(url)
        ProxyState.jobs = res.data.map(j => new Job(j))
    }

    async addJob(formData) {
        let res = await axios.post(url, formData)
        let newJob = new Job(res.data)
        ProxyState.jobs = [newJob, ...ProxyState.jobs]
    }    


}

export const jobsService = new JobsService()