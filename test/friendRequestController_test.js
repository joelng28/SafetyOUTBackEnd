const chai = require("chai");
const randomstring = require("randomstring")
const chaiHttp = require("chai-http")
const expect = require("chai").expect;
const { request } = require("chai");

chai.use(chaiHttp);
const localhost_url = "http://localhost:8080";
const heroku_url = "https://safetyout.herokuapp.com"
const url = localhost_url;

var request_id;

describe("Realitzar una solicitud d'amistad: ",() => {

    it("Retorna status 201 quan es dona d'alta una solicitut d'amistad", (done) => {
        chai.request(url)
        .post('/friendRequest')
        .send({
            user_id_request: "60a39b58f458df0022709fab",
            user_id_requested: "60a3a16bf458df0022709fb7",
        })
        .end(function(err, res){
            expect(res).to.have.status(201);
            request_id = res.body.request_id;
            done();
        });
    });
    it("Retorna status 404 quan s'intenta donar d'alta una solicitut d'amistad i l'usuari que rep la solicitut no existeix", (done) => {
        chai.request(url)
        .post('/friendRequest')
        .send({
            user_id_request: "60a39b58f458df0022709fab",
            user_id_requested: "60a3a16bf458df0022709000",
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
            user_id_request: "60a39b58f458df0022000fab",
            user_id_requested: "60a3a16bf458df0022709fb7",
        })
        .end(function(err, res){
            expect(res).to.have.status(404);
            done();
        });
    });

});

describe("Acceptar una solicitud d'amistad: ",() => {

    it("Retorna status 200 quan s'accepta una solicitut d'amistad i l'usuari1 no era amic de l'usuari2 ", (done) => {
        chai.request(url)
        .post('/friendRequest/' + request_id + '/accept')
        .end(function(err, res){
            expect(res).to.have.status(200);
            chai.request(url)
            .post('/friendRequest/')
            .send({
                user_id_request: "60a39b58f458df0022709fab",
                user_id_requested: "60a3ae6197f5da46b03334e3",
            })
            .end(function(err, response){
                request_id = response.body.request_id;
                done();
            });
        });
    });
    it("Retorna status 404 quan s'intenta acceptar una solicitut d'amistad i la solicitud no existeix", (done) => {
        chai.request(url)
        .post('/friendRequest/' + '606c65b16ccd0a00226ea000' + '/accept')
        .end(function(err, res){
            expect(res).to.have.status(404);
            done();
        });
    });
});

describe("Denegar una solicitud d'amistad: ",() => {
    it("Retorna status 200 quan es denega una solicitut d'amistad", (done) => {
        chai.request(url)
        .post('/friendRequest/' + request_id + '/deny')
        .end(function(err, res){
            expect(res).to.have.status(200);
            done();
        });
    });
    it("Retorna status 404 quan s'intenta denegar una solicitut d'amistad i la solicitud no existeix", (done) => {
        chai.request(url)
        .post('/friendRequest/' + '606c65b16ccd0a00226ea000' + '/deny')
        .end(function(err, res){
            expect(res).to.have.status(404);
            done();
        });
    });
});



