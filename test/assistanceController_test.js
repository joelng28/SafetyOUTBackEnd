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
        .post('/assistance')
        .send({
            user_id: "604ca4f3482d773168499269",
            place: {
                longitude:"59",
                latitude:"13"
            },
            dateTime: "15:00",
            num_hours:2
        })
        .end(function(err, res){
            expect(res).to.have.status(201);
            done();
        });
    });
    it("Retorna status 409 quan s'intenta donar d'alta una assistència amb un usuari que no existeix", (done) => {
        chai.request(url)
        .post('/assistance')
        .send({
            user_id: "604ca4f3482d773168499869",
            place: {
                longitude:"59",
                latitude:"13"
            },
            dateTime: "15:00",
            num_hours:2
        })
        .end(function(err, res){
            expect(res).to.have.status(409);
            done();
        });
    });
    it("Retorna status 409 quan s'intenta donar d'alta una assistència que ja existeix", (done) => {
        chai.request(url)
        .post('/assistance')
        .send({
            user_id: "604ca4f3482d773168499269",
            place: {
                longitude:"59",
                latitude:"13"
            },
            dateTime: "15:00",
            num_hours:2
        })
        .end(function(err, res){
            expect(res).to.have.status(409);
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
                longitude:"59",
                latitude:"13"
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
                longitude:"59",
                latitude:"13"
            }
        })
        .end(function(err, res){
            expect(res).to.have.status(404);
            done();
        });
    });
});
