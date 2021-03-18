const chai = require("chai");
const randomstring = require("randomstring")
const chaiHttp = require("chai-http")
const expect = require("chai").expect;
const user = require("../models/user");

chai.use(chaiHttp);
const url = "http://localhost:8080";


const userEmail = randomstring.generate(8) + "@estudiantat.upc.edu";

describe("Registre d'usuari: ",() => {

    it('Retorna status 201 quan es crea un usuari amb email no registrat', (done) => {
        chai.request(url)
        .put('/user/signup')
        .send({
            username: "sergidoce",
            name: "Sergi",
            surnames: "Doce Planas",
            email: userEmail,
            password: "123456",
            birthday: new Date(1999, 9, 12),
            gender: "Male",
            profileImage: "path/to/profile/image" 
        })
        .end(function(err, res){
            expect(res).to.have.status(201);
            done();
        });
    });
    it("Retorna status 409 quan s'intenta registrar un usuari amb email ja registrat", (done) => {
        chai.request(url)
        .put('/user/signup')
        .send({
            username: "sergidoce",
            name: "Sergi",
            surnames: "Doce Planas",
            email: userEmail,
            password: "123456",
            birthday: new Date(1999, 9, 12),
            gender: "Male",
            profileImage: "path/to/profile/image" 
        })
        .end(function(err, res){
            expect(res).to.have.status(409);
            done();
        });
    });
});

describe("Inici de sessió: ",() => {

    it("Retorna status 200 quan s'inicia sessió amb un email registrat i contrasenya correcte", (done) => {
        chai.request(url)
        .post('/user/login')
        .send({
            email: userEmail,
            password: "123456",
        })
        .end(function(err, res){
            expect(res).to.have.status(200);
            done();
        });
    });
    it("Retorna status 404 quan s'intenta iniciar sessió amb un email que no està registrat", (done) => {
        chai.request(url)
        .post('/user/login')
        .send({
            email: randomstring.generate(8),
            password: "123456",
        })
        .end(function(err, res){
            expect(res).to.have.status(404);
            done();
        });
    });
    it("Retorna status 401 quan s'intenta iniciar sessió amb un email que està registrat però amb contrasenya incorrecte", (done) => {
        chai.request(url)
        .post('/user/login')
        .send({
            email: userEmail,
            password: "12345",
        })
        .end(function(err, res){
            expect(res).to.have.status(401);
            done();
        });
    });
});