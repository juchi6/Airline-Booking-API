const { Logger } = require("../config");

class CrudRespository{
    constructor(model){
        this.model = model;
    }

    async create(data, options = {}){
        console.log("Currently inside repositories/crud-repository.js");
        try{
            const response = await this.model.create(data, options);
            return response;
        }catch(error){
            Logger.error("Error while creating data", "CrudRepository", error);
            throw error;
        }
    }

    async destroy(data){
        try{
            const response = await this.model.destroy({
                where:{
                    id: data.id
                }
            });
            return response;
        }catch(error){
            Logger.error("Error while destroying data", "CrudRepository", error);
            throw error;
        }
    }

    async get(data){
        try{
            const response = await this.model.findByPk(data.id);
            return response;
        }catch(error){
            Logger.error("Error while getting data", "CrudRepository", error);
            throw error;
        }
    }

    async getAll(data){
        try{
            const response = await this.model.findAll();
            return response;
        }catch(error){
            Logger.error("Error while getting all data", "CrudRepository", error);
            throw error;
        }
    }

    async update(id, data){
        try{
            const response = await this.model.update(data, {
                where: {
                    id: id
                }
            });
            return response;
        }catch(error){
            Logger.error("Error while updating data", "CrudRepository", error);
            throw error;
        }
    }
}

module.exports = CrudRespository;