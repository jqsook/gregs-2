import { ProxyState } from "../AppState.js";
import { House } from "../Models/House.js"

let url = 'https://bcw-sandbox.herokuapp.com/api/houses/'

class HousesService {
    async updateHouse(formData) {
        let res = await axious.put(url + formData.id, formData)

        let indexOfHouseToBeUpdated =
        ProxyState.houses.findIndex(h => h.id == formData.id)
        ProxyState.houses.splice(indexOfHouseToBeUpdated, 1, new House(res.data))
        ProxyState.houses = ProxyState.houses
    }
    async deleteHouse(id) {
        await axios.delete(url + id)
        ProxyState.houses = ProxyState.houses.filter(h = h.id != id)
    }
    async getHouses() {
        let res = await axios.get(url)
        ProxyState.houses = res.data.map(h => new House(h))
    }
    async addHouse(formData) {
        let res = await axios.post(url, formData)
        let newHouse = new House(res.data)
        ProxyState.houses = [newHouse, ...ProxyState.houses]

    }
}
export const housesService = new HousesService()