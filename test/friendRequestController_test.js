const chai = require("chai");
const randomstring = require("randomstring")
const chaiHttp = require("chai-http")
const expect = require("chai").expect;

chai.use(chaiHttp);
const localhost_url = "http://localhost:8080";
const heroku_url = "https://safetyout.herokuapp.com"
const url = localhost_url;


describe("Realitzar una solicitud d'amistad: ",() => {

    it("Retorna status 201 quan es dona d'alta una solicitut d'amistad", (done) => {
        chai.request(url)
        .post('/friendRequest')
        .send({
            user_id_request: "606c65b16ccd0a00226ea7cb",
            user_id_requested: "6075a54d5aae680022afb892",
        })
        .end(function(err, res){
            expect(res).to.have.status(201);
            done();
        });
    });
    it("Retorna status 404 quan s'intenta donar d'alta una solicitut d'amistad i l'usuari que rep la solicitut no existeix", (done) => {
        chai.request(url)
        .post('/friendRequest')
        .send({
            user_id_request: "606c65b16ccd0a00226ea7cb",
            user_id_requested: "6075a54d5aae680022afb892",
        })
        .end(function(err, res){
            expect(res).to.have.status(404);
            done();
        });
    });
    it("Retorna status 404 quan s'intenta donar d'alta una solicitut d'amistat i l'usuari que envia la solicitud no existeix.", (done) => {
        chai.request(url)
        .post('/friendRequest')
        .send({
            user_id_request: "606c65b16ccd0a00226ea7cb",
            user_id_requested: "6075a54d5aae680022afb892",
        })
        .end(function(err, res){
            expect(res).to.have.status(404);
            done();
        });
    });

});