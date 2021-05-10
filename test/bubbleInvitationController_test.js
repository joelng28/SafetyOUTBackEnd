const chai = require("chai");
const randomstring = require("randomstring")
const chaiHttp = require("chai-http")
const expect = require("chai").expect;

chai.use(chaiHttp);
const localhost_url = "http://localhost:8080";
const heroku_url = "https://safetyout.herokuapp.com"
const url = localhost_url;


describe("Donar d'alta una nova invitació a bombolla: ",() => {

    it("Retorna status 201 quan es dona d'alta una invitació a bombolla nova", (done) => {
        chai.request(url)
        .post('/bubbleInvitation')
        .send({
            invitee_id: "606c65b16ccd0a00226ea7cb",
            bubble_id: "609166718f155a3ed8aef712",
            invited_by_id: "6075a54d5aae680022afb892",
        })
        .end(function(err, res){
            expect(res).to.have.status(201);
            done();
        });
    });
    it("Retorna status 404 quan s'intenta donar d'alta una invitació a bombolla i l'usuari invitat no existeix.", (done) => {
        chai.request(url)
        .post('/bubbleInvitation')
        .send({
            invitee_id: "606c65b06ccd0a00226ea7cb",
            bubble_id: "609166718f155a3ed8aef712",
            invited_by_id: "6075a54d5aae680022afb892", 
        })
        .end(function(err, res){
            expect(res).to.have.status(404);
            done();
        });
    });
    it("Retorna status 404 quan s'intenta donar d'alta una invitació a bombolla i l'usuari que invita no existeix.", (done) => {
        chai.request(url)
        .post('/bubbleInvitation')
        .send({
            invitee_id: "606c65b16ccd0a00226ea7cb",
            bubble_id: "609166718f155a3ed8aef712",
            invited_by_id: "6075a54d5bae680022afb892",
        })
        .end(function(err, res){
            expect(res).to.have.status(404);
            done();
        });
    });
    it("Retorna status 404 quan s'intenta donar d'alta una invitació a bombolla i la bombolla no existeix.", (done) => {
        chai.request(url)
        .post('/bubbleInvitation')
        .send({
            invitee_id: "606c65b16ccd0a00226ea7cb",
            bubble_id: "609166718f165a3ed8aef712",
            invited_by_id: "6075a54d5aae680022afb892",
        })
        .end(function(err, res){
            expect(res).to.have.status(404);
            done();
        });
    });
});

