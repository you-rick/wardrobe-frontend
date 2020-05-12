import {TestBed, inject} from '@angular/core/testing';

import {OutfitService} from "./outfit.service";
import {Outfit} from "../models/outfit.model";
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {environment} from "../../../environments/environment";

describe('OutfitService', () => {
  let helper: outfitHelper;
  //declare the variables that will be used for the Test Controller and for our Service
  let service: OutfitService;
  let httpMock: HttpTestingController;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });

    helper = new outfitHelper();
    // inject our service (which imports the HttpClient) and the Test Controller
    service = TestBed.get(OutfitService);
    httpMock = TestBed.get(HttpTestingController);

  });

  // Verify that no unmatched requests are outstanding.
  afterAll(() => httpMock.verify());

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return items', () => {
    const mockResponse = helper.getOutfits(1);

    service.getOutfitList().subscribe(res => {
      expect(res).toEqual(mockResponse);
    });

    // Expect that a single request has been made which matches the given URL, and return its mock.
    const req = httpMock.expectOne(environment.API_URL + 'outfits');
    expect(req.request.method).toBe('GET');
    // Resolve the request by returning a body plus additional HTTP information (such as response headers) if provided.
    req.flush(mockResponse);
  });
});


// Create necessary amount of dummy items
class outfitHelper {
  outfitList: Outfit[] = [];

  getOutfits(amount: number): Outfit[] {
    for (let i = 0; i < amount; i++) {
      this.outfitList.push(
        {_id: 'abc' + i, title: 'test', weather: ['test'], type: ['test']}
      );
    }
    return this.outfitList;
  }
}
