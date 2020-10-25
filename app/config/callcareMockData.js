export const errors = [
  {
    id: "Undefined",
    rowNumber: 12,
    rowInfo: "123, 11, 30, 17, 30, Open",
    numberOfErrors: 1,
    errors: [
      {
        key: "Collision",
        data: {
          fromColumns: [
            {
              collidingColumnNo: 2,
              collidingColumnName: "FromHour"
            },
            {
              collidingColumnNo: 3,
              collidingColumnName: "FromMinute"
            }
          ],
          toColumns: [
            {
              collidingColumnNo: 4,
              collidingColumnName: "ToHour"
            },
            {
              collidingColumnNo: 5,
              collidingColumnName: "ToMinute"
            }
          ],
          insertedRows: [
            {
              rowId: "5d043b60-2af7-411a-8972-3ef66bbe2b8d",
              rowInfo: "123, 06, 00, 11, 45, Open"
            },
            {
              rowId: "b91e947c-ecb5-4c96-9539-922bbfdda528",
              rowInfo: "123, 11, 46, 17, 45, Open"
            }
          ]
        }
      }
    ]
  },
  {
    id: "Undefined",
    rowNumber: 13,
    rowInfo: "124, , 30, 170, 30, Open",
    numberOfErrors: 2,
    errors: [
      {
        key: "Missing",
        data: {
          columnNo: 2,
          columnName: "FromHour"
        }
      },
      {
        key: "Wrongformat",
        data: {
          columnNo: 4,
          columnName: "ToHour",
          expectedFormat: "<HH>"
        }
      }
    ]
  },
  {
    id: "2cabb630-9e63-49cd-8440-a80bfa7e37f5",
    rowNumber: 14,
    rowInfo: "125, 11, 30, 17, 30, 22742bbf-1463-4058-9506-85d69535816d",
    numberOfErrors: 1,
    errors: [
      {
        key: "Unknown",
        data: {
          referenceCode: "123456",
          detail: "Failed due to a system fault"
        }
      }
    ]
  }
];

export const uploadResult = {
  id: "239f0b78-e6a6-4707-99de-7810d2c5ecff",
  account_id: "d9e7d51b-3f91-435c-958a-22d9f86942e0",
  schema_id: "79c6dc58-e3b5-4d57-b153-78ed901e27cf",
  successful_uploads: 30,
  failed_uploads: 5,
  total_to_upload: 100,
  request_id: "9f388ea8-93a4-448a-8cc0-c813bea42f37",
  request_epoch: 1565771618,
  request_finished_epoch: 1565774018,
  is_live: "true",
  reason: "reason"
};
