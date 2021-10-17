const request = require("supertest");
const app = require("../main");
describe("Post Endpoints", () => {
  it("Test unauthorise user acess", async () => {
    const res = await request(app).post("/api/pass").send({
      userId: 1,
      title: "test is cool",
    });
    expect(res.statusCode).toEqual(401);
    expect(res.body).toHaveProperty("error");
  });
  
  it("Test gets rate for an order", async () => {
    const res = await request(app)
    .post("/api/rate")
    .set("token", "verysecretivetoken")
    .send({
      pickup_latitude: "6.435275500000001",
      pickup_longitude: "3.4147874",
      delivery_latitude: "6.456150699999999",
      delivery_longitude: "3.4298536",
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("status")
  });

  it("Test posting product for delivery", async () => {
    const res = await request(app)
      .post("/api/order")
      .set("token", "verysecretivetoken")
      .send({
        pickup_address: "Vita Towers, Kofo Abayomi Street, Lagos, Nigeria",
        pickup_latitude: "6.435275500000001",
        pickup_longitude: "3.4147874",
        delivery_address: "21 Lugard Avenue, Lagos, Nigeria",
        delivery_latitude: "6.456150699999999",
        delivery_longitude: "3.4298536",
        pickup_name: "Foo",
        pickup_phone: "+23412345678",
        pickup_email: "example@about.com",
        delivery_name: "Bar",
        delivery_phone: "+2341234567891",
        delivery_email: "example+1@about.com",
        description: "Food delivery",
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body)
      .toHaveProperty("msg")
      // .toEqual("Order has been created successfully");
  });

  it("Test getting specific order detail", async () => {
    const res = await request(app)
      .get("/api/order/FFFXY-426043")
      .set("token", "verysecretivetoken")
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("status")
  });

  it("Test getting all created orders", async () => {
    const res = await request(app)
      .get("/api/all_orders")
      .set("token", "verysecretivetoken")
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("status")
  });

});
