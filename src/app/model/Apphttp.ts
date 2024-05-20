import { HttpHeaders } from "@angular/common/http";

export class Apphttp{
    public static baseurl: string = "http://localhost:5000/";
    public static requestHeaders = {
		headers: new HttpHeaders({
			'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
		})
	};

	public static requestHeadersJSON = {
		headers: new HttpHeaders({
			'Content-Type': 'application/json'
		})
	};
}