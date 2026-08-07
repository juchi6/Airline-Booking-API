const { AirplaneRepository } = require("../repositories");
const airplaneRepository = new AirplaneRepository();

async function createAirplane(data){
    console.log("Currently inside services/airplane-service.js");
    try{
        const airplane = await airplaneRepository.create(data);
        return airplane;
    }catch(error){
        console.log("Something went wrong in the service layer");
        throw error;
    }   
}
module.exports = {createAirplane};