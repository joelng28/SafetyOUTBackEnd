const chai = require("chai");
const chaiHttp = require("chai-http")
const expect = require("chai").expect;

chai.use(chaiHttp);
const url = "http://localhost:8080";


describe("Registra un usuario con información valida: ",() => {

    it('devuelve un status de 201 y mensaje "User created!"', (done) => {
        chai.request(url)
        .put('/user/signup')
        .send({
            username: "sergidoce",
            name: "Sergi",
            surnames: "Doce Planas",
            email: "sergi.dol@estudiantat.upc.edu",
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
});

          