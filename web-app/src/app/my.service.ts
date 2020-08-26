import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class MyService {
  token: string;
  data;
  constructor(private httpreq: HttpClient) {}
  signup(data) {
    return this.httpreq.post("http://neighborhoodonlinemarket-env.eba-mkbgjfpb.us-east-1.elasticbeanstalk.com/auth/signup", data);
  }
  login(data) {
    return this.httpreq.post("http://neighborhoodonlinemarket-env.eba-mkbgjfpb.us-east-1.elasticbeanstalk.com/auth/signin", data);
  }
  profile(data, id) {
    console.log(data);
    return this.httpreq.post(
      `http://neighborhoodonlinemarket-env.eba-mkbgjfpb.us-east-1.elasticbeanstalk.com/farmers/images/${id}`,
      data
    );
  }
  getFarmerproducst(id) {
    return this.httpreq.get(`http://neighborhoodonlinemarket-env.eba-mkbgjfpb.us-east-1.elasticbeanstalk.com/farmers/${id}`);
  }
  editproduct(id, pId, data) {
    return this.httpreq.patch(
      `http://neighborhoodonlinemarket-env.eba-mkbgjfpb.us-east-1.elasticbeanstalk.com/farmers/${id}/${pId}`,
      data
    );
  }
  deleteproduct(id, pId) {
    return this.httpreq.delete(`http://neighborhoodonlinemarket-env.eba-mkbgjfpb.us-east-1.elasticbeanstalk.com/farmers/${id}/${pId}`);
  }
  addproduct(id, data) {
    return this.httpreq.post(`http://neighborhoodonlinemarket-env.eba-mkbgjfpb.us-east-1.elasticbeanstalk.com/farmers/${id}`, data);
  }

  getorders(id) {
    return this.httpreq.get(`http://neighborhoodonlinemarket-env.eba-mkbgjfpb.us-east-1.elasticbeanstalk.com/farmers/orders/${id}`);
  }
  changestatus(id, data) {
    return this.httpreq.post(
      `http://neighborhoodonlinemarket-env.eba-mkbgjfpb.us-east-1.elasticbeanstalk.com/farmers/orders/${id}`,
      data
    );
  }
  getFarmers() {
    return this.httpreq.get("http://neighborhoodonlinemarket-env.eba-mkbgjfpb.us-east-1.elasticbeanstalk.com/admin/farmers");
  }
  getCustomers() {
    return this.httpreq.get("http://neighborhoodonlinemarket-env.eba-mkbgjfpb.us-east-1.elasticbeanstalk.com/admin/customers");
  }
  farmeractivity(id) {
    return this.httpreq.patch("http://neighborhoodonlinemarket-env.eba-mkbgjfpb.us-east-1.elasticbeanstalk.com/admin/farmers", id);
  }
  customeractivity(id) {
    return this.httpreq.patch("http://neighborhoodonlinemarket-env.eba-mkbgjfpb.us-east-1.elasticbeanstalk.com/admin/customers", id);
  }
  // image upload
  uploadimage(file) {
    console.log(file);
    const frm: any = new FormData();
    frm.append("file", file);

    return this.httpreq.post("http://neighborhoodonlinemarket-env.eba-mkbgjfpb.us-east-1.elasticbeanstalk.com/file/upload", frm);
  }
  resetPassword(data){
    return this.httpreq.patch("http://neighborhoodonlinemarket-env.eba-mkbgjfpb.us-east-1.elasticbeanstalk.com/admin",data)
  }

getLogs(){
  return this.httpreq.get("http://neighborhoodonlinemarket-env.eba-mkbgjfpb.us-east-1.elasticbeanstalk.com/admin/log")
}
}
