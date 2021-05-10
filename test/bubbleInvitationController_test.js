const chai = require("chai");
const randomstring = require("randomstring")
const chaiHttp = require("chai-http")
const expect = require("chai").expect;

chai.use(chaiHttp);
const localhost_url = "http://localhost:8080";
const heroku_url = "https://safetyout.herokuapp.com"
const url = localhost_url;

describe("Donar d'alta una bombolla: ",() => {
    it("Retorna status 200 quan es dona d'alta bombolla nova", (done) => {
        chai.request(url)
        .post('/bubble/createBubble')
        .send({
            id: "6075a54d5aae680022afb892",
            bubble_name: "Test"
        })
        .end(function(err, res){
            expect(res).to.have.status(201);
            done();
        });
    });
    it("Retorna status 404 quan s'intenta donar d'alta una bombolla i l'usuari administrador no existeix.", (done) => {
        chai.request(url)
        .post('/bubble/createBubble')
        .send({
            id: "606c65b16ccd0a00226ea7cc",
            bubble_name: "Test"
        })
        .end(function(err, res){
            expect(res).to.have.status(404);
            done();
        });
    });
    it("Retorna status 404 quan s'intenta donar d'alta una bombolla amb el mateix nom que una altra ja administrada per l'usuari indicat", (done) => {
        chai.request(url)
        .post('/bubble/createBubble')
        .send({
            id: "6075a54d5aae680022afb892",
            bubble_name: "Test"
        })
        .end(function(err, res){
            expect(res).to.have.status(404);
            done();
        });
    });
});


describe("Donar d'alta una nova invitació a bombolla: ",() => {

    it("Retorna status 201 quan es dona d'alta una invitació a bombolla nova", (done) => {
        chai.request(url)
        .post('/bubbleInvitation/')
        .send({
            invitee_id: "606c65b16ccd0a00226ea7cb",
            bubble_name: "Test",
            invited_by_id: "6075a54d5aae680022afb892",
        })
        .end(function(err, res){
            expect(res).to.have.status(201);
            done();
        });
    });
    it("Retorna status 404 quan s'intenta donar d'alta una invitació a bombolla i l'usuari invitat no existeix.", (done) => {
        chai.request(url)
        .post('/bubbleInvitation/')
        .send({
            invitee_id: "606c65b06ccd0a00226ea7cb",
            bubble_name: "Test",
            invited_by_id: "6075a54d5aae680022afb892", 
        })
        .end(function(err, res){
            expect(res).to.have.status(404);
            done();
        });
    });
    it("Retorna status 404 quan s'intenta donar d'alta una invitació a bombolla i l'usuari que invita no existeix.", (done) => {
        chai.request(url)
        .post('/bubbleInvitation/')
        .send({
            invitee_id: "606c65b16ccd0a00226ea7cb",
            bubble_name: "Test",
            invited_by_id: "6075a54d5bae680022afb892",
        })
        .end(function(err, res){
            expect(res).to.have.status(404);
            done();
        });
    });
    it("Retorna status 404 quan s'intenta donar d'alta una invitació a bombolla i la bombolla no existeix.", (done) => {
        chai.request(url)
        .post('/bubbleInvitation/')
        .send({
            invitee_id: "606c65b16ccd0a00226ea7cb",
            bubble_name: "Triar",
            invited_by_id: "6075a54d5aae680022afb892",
        })
        .end(function(err, res){
            expect(res).to.have.status(404);
            done();
        });
    });
});

describe("Acceptar invitació a bombolla: ",() => {

    it("Retorna status 201 quan s'accepta una invitació a una bombolla de la qual un usuari no forma part", (done) => {
        chai.request(url)
        .post('/bubbleInvitation/accept')
        .send({
            invitee_id: "606c65b16ccd0a00226ea7cb",
            bubble_name: "Test",
            invited_by_id: "6075a54d5aae680022afb892",
        })
        .end(function(err, res){
            expect(res).to.have.status(201);
            done();
        });
    });

    it("Retorna status 404 quan s'accepta una invitació a una bombolla de la qual un usuari ja forma part", (done) => {
        chai.request(url)
        .post('/bubbleInvitation/accept')
        .send({
            invitee_id: "606c65b16ccd0a00226ea7cb",
            bubble_name: "Test",
            invited_by_id: "6075a54d5aae680022afb892",
        })
        .end(function(err, res){
            expect(res).to.have.status(404);
            done();
        });
    });

    it("Retorna status 404 quan la invitacio no existeix", (done) => {
        chai.request(url)
        .post('/bubbleInvitation/accept')
        .send({
            invitee_id: "606c65b16ccd0a00226ea7cb",
            bubble_name: "Non-Exists",
            invited_by_id: "6075a54d5aae680022afb892",
        })
        .end(function(err, res){
            expect(res).to.have.status(404);
            done();
        });
    });
});

describe("Denegar invitació a bombolla: ",() => {

    it("Retorna status 201 quan es denega una invitació a una bombolla", (done) => {
        chai.request(url)
        .post('/bubbleInvitation/deny')
        .send({
            invitee_id: "606c65b16ccd0a00226ea7cb",
            bubble_name: "Test",
            invited_by_id: "6075a54d5aae680022afb892",
        })
        .end(function(err, res){
            expect(res).to.have.status(201);
            done();
        });
    });

    it("Retorna status 404 quan la invitacio no existeix", (done) => {
        chai.request(url)
        .post('/bubbleInvitation/deny')
        .send({
            invitee_id: "606c65b16ccd0a00226ea7cb",
            bubble_name: "Non-Exists",
            invited_by_id: "6075a54d5aae680022afb892",
        })
        .end(function(err, res){
            expect(res).to.have.status(404);
            done();
        });
    });
});


describe("Donar de baixa una bombolla: ",() => {
    it("Retorna status 201 quan es dona d'alta bombolla nova", (done) => {
        chai.request(url)
        .post('/bubble/deleteBubble')
        .send({
            id: "6075a54d5aae680022afb892",
            bubble_name: "Test"
        })
        .end(function(err, res){
            expect(res).to.have.status(201);
            done();
        });
    });
    it("Retorna status 404 quan s'intenta donar de baixa una bombolla i l'usuari administrador no existeix.", (done) => {
        chai.request(url)
        .post('/bubble/deleteBubble')
        .send({
            id: "606c65b16ccd0a00226ea7cc",
            bubble_name: "Test"
        })
        .end(function(err, res){
            expect(res).to.have.status(404);
            done();
        });
    });
    it("Retorna status 404 quan s'intenta donar de baixa una bombolla que no existeix", (done) => {
        chai.request(url)
        .post('/bubble/deleteBubble')
        .send({
            id: "6075a54d5aae680022afb892",
            bubble_name: "Non-Existent"
        })
        .end(function(err, res){
            expect(res).to.have.status(404);
            done();
        });
    });
});

