import React from 'react';
import {cleanup, screen, render, act} from '@testing-library/react';
import '@testing-library/jest-dom'

import AbsenceLanding from '../../src/components/AbsenceLanding';

// global.fetch = jest.fn(() =>
//   Promise.resolve({
//     json: () => Promise.resolve({ rates: { CAD: 1.42 } }),
//   })
// );

// beforeEach(() => {
//   fetch.mockClear();
// });
// Note: running cleanup afterEach is done automatically for you in @testing-library/react@9.0.0 or higher
// unmount and cleanup DOM after the test is finished.
afterEach(cleanup);


describe("When the component is rendered", () => {
  it("should show the content heading", async () => {
    const mockSuccessResponse = [
      {
          "admitterId": null,
          "admitterNote": "-",
          "confirmedAt": "2021-03-15T16:36:34.000+01:00",
          "createdAt": "2021-03-15T16:36:34.000+01:00",
          "crewId": 352,
          "endDate": "2021-01-02",
          "memberNote": "-",
          "rejectedAt": null,
          "startDate": "2020-12-31",
          "type": "vacation",
          "userId": 644,
          "name": "Max",
          "status": "Confirmed"
      }];
    const mockJsonPromise = Promise.resolve(mockSuccessResponse);
    const mockFetchPromise = Promise.resolve({
        json: () => mockJsonPromise,
    });
    var globalRef:any =global;
    globalRef.fetch = jest.fn().mockImplementation(() => mockFetchPromise);
    await act(() => {
      render(<AbsenceLanding/>);
    });
    expect(
      screen.getByText(/Absence Data/)
    ).toBeInTheDocument();
  });
});
