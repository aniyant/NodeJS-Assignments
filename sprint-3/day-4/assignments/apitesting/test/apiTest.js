import { expect, use } from "chai";
import chaiHttp from "chai-http";
import { describe, it } from "mocha";
import server from "../src/server.js";

const chai = use(chaiHttp);

describe("API Testing", function () {
  let accessToken;
  let todo;
  before(function (done) {
    chai
      .request(server)
      .post("/users/login")
      .send({
        email: "full@gmail.com",
        password: "123123",
      })
      .end((err, res) => {
        if (err) console.log(err);
        // token=res.body.token;
        accessToken = res.body.token;
        done();
        // console.log(res.body.token
      });
  });

  it("should return an message", (done) => {
    // we have to make the request to the sever
    chai
      .request(server)
      .get("/rest")
      .end((err, res) => {
        if (err) console.log(err);
        expect(res).to.have.status(200);
        expect(res.body.message).to.equal("this is a rest route");
        done();
        //here we have the result
      });
  });

  it("should return an array of todos", (done) => {
    // we have to make the request to the sever

    chai
      .request(server)
      .get("/todos")
      .set("Authorization", `Berer ${accessToken}`)
      .end((err, res) => {
        if (err) console.log(err);
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("array");
        todo = res.body[0];
        done();
        //here we have the result
      });
  });

  it("should add the todo in the db", (done) => {
    // we have to make the request to the sever

    chai
      .request(server)
      .post("/todos")
      .set("Authorization", `Berer ${accessToken}`)
      .send({ title: "API test by mocha and chai", desc: "test" })
      .end((err, res) => {
        if (err) console.log(err);
        expect(res).to.have.status(201);
        done();
        //here we have the result
      });
  });

  it("should update the todo in the db", (done) => {
    // we have to make the request to the sever
    chai
      .request(server)
      .patch(`/todos/${todo._id}`)
      .set("Authorization", `Berer ${accessToken}`)
      .send({ title: "api testing", desc: "this is a api testing class" })
      .end((err, res) => {
        if (err) console.log(err);
        expect(res).to.have.status(200);
        done();
        //here we have the result
      });
  });

  it("should delet the todo in the db", (done) => {
    // we have to make the request to the sever
    chai
      .request(server)
      .delete(`/todos/${todo._id}`)
      .set("Authorization", `Berer ${accessToken}`)
      .end((err, res) => {
        if (err) console.log(err);
        expect(res).to.have.status(200);
        done();
        //here we have the result
      });
  });
});


