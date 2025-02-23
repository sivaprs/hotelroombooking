import httpClient from "../helpers/httpClient";

class HotelService {
  getHotels() {
    return httpClient.get(`api/v1/hotels`);
  }

  getHotelsByLocation(id: number) {
    return httpClient.get(`api/v1/hotels/location/${id}`);
  }

  getHotelsById(id: number) {
    return httpClient.get(`api/v1/hotels?id=${id}`);
  }
}

export default new HotelService();
