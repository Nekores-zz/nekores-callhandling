

export const CollapseRowTableData = {
  columns: ["services", "number", "description", "attempts", "connected", "connectedPercent"],
  values: [
    {
      location: "EUROPE",
      subData: [
        {
          services: "Service 1",
          number: 6789,
          description: "description",
          attempts: 8,
          connected: 676,
          connectedPercent: 60
        },
        {
          services: "Service 2",
          number: 6790,
          description: "description",
          attempts: 7,
          connected: 56,
          connectedPercent: 40
        },
        {
          services: "Service 3",
          number: 6791,
          description: "description",
          attempts: 9,
          connected: 54,
          connectedPercent: 47
        },
        {
          services: "Service 4",
          number: 6792,
          description: "description",
          attempts: 8,
          connected: 51,
          connectedPercent: 49
        }
      ]
    },
    {
      location: "ENGLAND",
      subData: [
        {
          services: "sub2",
          number: 6789,
          description: "description2",
          attempts: 7,
          connected: 56,
          connectedPercent: 80
        }
      ]
    },
    {
      location: "CANADA",
      subData: [
        {
          services: "sub3",
          number: 456745,
          description: "description3",
          attempts: 4,
          connected: 45,
          connectedPercent: 10
        }
      ]
    }
  ]
};
