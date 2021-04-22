const chai = require("chai");
const randomstring = require("randomstring")
const chaiHttp = require("chai-http")
const expect = require("chai").expect;

chai.use(chaiHttp);
const localhost_url = "http://localhost:8080";
const heroku_url = "https://safetyout.herokuapp.com"
const url = localhost_url;


describe("Donar d'alta una nova assistència: ",() => {

    it("Retorna status 201 quan es dona d'alta una assistència nova", (done) => {
        chai.request(url)
        .post('/assistance/add')
        .send({
            user_id: "604ca4f3482d773168499269",
            place: {
                longitude:"100",
                latitude:"200"
            },
            dateInterval:{
                startDate: {
                    year:"2070",
                    month:"9",
                    day:"14",
                    hour:"15",
                    minute:"0",
                },
                endDate: {
                    year:"2070",
                    month:"10",
                    day:"14",
                    hour:"19",
                    minute:"0",
                }
            }
        })
        .end(function(err, res){
            expect(res).to.have.status(201);
            done();
        });
    });
    it("Retorna status 409 quan s'intenta donar d'alta una assistència amb un usuari que no existeix", (done) => {
        chai.request(url)
        .post('/assistance/add')
        .send({
            user_id: "604ca4f3482d773968499269",
            place: {
                longitude:"100",
                latitude:"200"
            },
            dateInterval:{
                startDate: {
                    year:"2000",
                    month:"9",
                    day:"14",
                    hour:"15",
                    minute:"0",
                },
                endDate: {
                    year:"2000",
                    month:"9",
                    day:"14",
                    hour:"19",
                    minute:"0",
                }
            }
        })
        .end(function(err, res){
            expect(res).to.have.status(409);
            done();
        });
    });
    it("Retorna status 409 quan s'intenta donar d'alta una assistència que ja existeix", (done) => {
        chai.request(url)
        .post('/assistance/add')
        .send({
            user_id: "604ca4f3482d773168499269",
            place: {
                longitude:"100",
                latitude:"200"
            },
            dateInterval:{
                startDate: {
                    year:"2070",
                    month:"9",
                    day:"14",
                    hour:"15",
                    minute:"0",
                },
                endDate: {
                    year:"2000",
                    month:"10",
                    day:"14",
                    hour:"19",
                    minute:"0",
                }
            }
        })
        .end(function(err, res){
            expect(res).to.have.status(409);
            done();
        });
    });
});

describe("Consultar assistències futures: ",() => {

    it("Retorna status 200 quan l'usuari existeix i té alguna asistència futura", (done) => {
        chai.request(url)
        .get('/assistance/consultFuture')
        .send({
            user_id: "604ca4f3482d773168499269",
            dateInterval:{
                startDate: {
                    year:"1999",
                    month:"9",
                    day:"14",
                    hour:"15",
                    minute:"0",
                },
                endDate: {
                    year:"2000",
                    month:"9",
                    day:"14",
                    hour:"19",
                    minute:"0",
                }
            }
        })
        .end(function(err, res){
            expect(res).to.have.status(200);
            done();
        });
    });

    it("Retorna status 409 quan s'intenta consultar un usuari que no existeix", (done) => {
        chai.request(url)
        .get('/assistance/consultFuture')
        .send({
            user_id: "604ca4f3482d773168499869",
            dateInterval:{
                startDate: {
                    year:"1999",
                    month:"9",
                    day:"14",
                    hour:"15",
                    minute:"0",
                },
                endDate: {
                    year:"2000",
                    month:"9",
                    day:"14",
                    hour:"19",
                    minute:"0",
                }
            }
        })
        .end(function(err, res){
            expect(res).to.have.status(409);
            done();
        });
    });

    it("Retorna status 200 quan s'intenta consultar un usuari sense assistències futures", (done) => {
        chai.request(url)
        .get('/assistance/consultFuture')
        .send({
            user_id: "604cb1aa228a8c10a42ce241",
            dateInterval:{
                startDate: {
                    year:"1999",
                    month:"9",
                    day:"14",
                    hour:"15",
                    minute:"0",
                },
                endDate: {
                    year:"2000",
                    month:"9",
                    day:"14",
                    hour:"19",
                    minute:"0",
                }
            }
        })
        .end(function(err, res){
            expect(res).to.have.status(200);
            done();
        });
    });

});


describe("Consultar assistències en una data: ",() => {

    it("Retorna status 200 quan l'usuari existeix i té alguna asistència en la data donada", (done) => {
        chai.request(url)
        .get('/assistance/consultOnDate')
        .send({
            user_id: "604ca4f3482d773168499269",
            startDate: {
                year:"2070",
                month:"9",
                day:"14",
                hour:"15",
                minute:"0",
            }
        })
        .end(function(err, res){
            expect(res).to.have.status(200);
            done();
        });
    });

    it("Retorna status 409 quan s'intenta consultar un usuari que no existeix", (done) => {
        chai.request(url)
        .get('/assistance/consultOnDate')
        .send({
            user_id: "604ca4f3482d773168499869",
            startDate: {
                    year:"2000",
                    month:"9",
                    day:"14",
                    hour:"15",
                    minute:"0",
            }
        })
        .end(function(err, res){
            expect(res).to.have.status(409);
            done();
        });
    });

    it("Retorna status 200 quan s'intenta consultar un usuari sense assistències en la data indicada", (done) => {
        chai.request(url)
        .get('/assistance/consultOnDate')
        .send({
            user_id: "604cb1aa228a8c10a42ce241",
            startDate: {
                    year:"1900",
                    month:"9",
                    day:"14",
                    hour:"15",
                    minute:"0",
            }
        })
        .end(function(err, res){
            expect(res).to.have.status(200);
            done();
        });
    });

});

describe("Modificar assistència: ",() => {

    it("Retorna status 201 quan es modifica una assistència", (done) => {
        chai.request(url)
        .post('/assistance/modify')
        .send({
            user_id: "604ca4f3482d773168499269",
    place: {
        "longitude":"100",
        "latitude":"200"
    },
    dateInterval: {
        startDate: {
            "day":  "14",
            "month":  "9",
            "year":  "2070",
            "hour":  "15",
            "minute": "0" 

        }
    },
    newStartDate:{
        "year": "1999",
        "month": "10",
        "day": "13",
        "hour": "15",
        "minute":"0"
    },
    newEndDate:{
        "year": "2999",
        "month": "10",
        "day": "13",
        "hour": "15",
        "minute":"0"
    }

        })
        .end(function(err, res){
            expect(res).to.have.status(201);
            done();
        });
    });

    it("Retorna status 404 quan s'intenta modificar una assistència que no existeix", (done) => {
        chai.request(url)
        .post('/assistance/modify')
        .send({
            user_id: "604ca4f3482d773168499269",
            place: {
                longitude:"59",
                latitude:"14"
            },
            dateInterval:{
                startDate: {
                    year:"2070",
                    month:"9",
                    day:"14",
                    hour:"15",
                    minute:"0",
                },
            },
            newStartDate:{
                year:"2070",
                month:"10",
                day:"14",
                hour:"15",
                minute:"0",
            },
            newEndDate:{
                year:"2070",
                month:"11",
                day:"14",
                hour:"15",
                minute:"0",
            }
        })
        .end(function(err, res){
            expect(res).to.have.status(404);
            done();
        });
    });
});


describe("Eliminar una assistència existent: ",() => {

    it("Retorna status 200 quan s'elimina una assistència existent", (done) => {
        chai.request(url)
        .delete('/assistance')
        .send({
            user_id: "604ca4f3482d773168499269",
            place: {
                longitude:"100",
                latitude:"200"
            },
            dateInterval:{
                startDate: {
                    year:"2070",
                    month:"9",
                    day:"14",
                    hour:"15",
                    minute:"0",
                }
            }
        })
        .end(function(err, res){
            expect(res).to.have.status(200);
            done();
        });
    });
    it("Retorna status 404 quan s'intenta eliminar una assistència que no existeix", (done) => {
        chai.request(url)
        .delete('/assistance')
        .send({
            user_id: "604ca4f3482d773168499269",
            place: {
                longitude:"100",
                latitude:"200"
            },
            dateInterval:{
                startDate: {
                    year:"1984",
                    month:"9",
                    day:"14",
                    hour:"15",
                    minute:"0",
                }
            }
        })
        .end(function(err, res){
            expect(res).to.have.status(404);
            done();
        });
    });
});
