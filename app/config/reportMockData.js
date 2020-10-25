/**
 * by , Sajid U. / OCT-2019
 */

const description =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Emenim ad minim veniam, quis nostrud exercitation ullamco.";

const startTime = { seconds: 1525140000, nanos: 0 };
const endTime = { seconds: 1526140000, nanos: 0 };

export const tags = ["Calls", "Summary", "Agent", "Performance", "Caller"];
export const services = ["All Services", "Cusotmer Services", "Branches"];

export const timePeriods = [
  "Today",
  "Yesterday",
  "This Week",
  "Last Week",
  "This Month",
  "Last Month",
  "Custom"
];
export const numbers = ["033 786 1231", "033 786 1232", "033 786 1233", "033 786 1234"];

const cardGroup = [
  {
    type: "default",
    title: "Avg number of attempts",
    value: "3.1",
    titleDesc: "per CLI"
  },
  {
    type:"default",
    value: "70%",
    titleDesc: "of callers",
    attempts: [
      {
        type: "default",
        title: "Connected",
        value: "30%"
      },
      {
        type: "default",
        title: "Busy",
        value: "5%"
      },
      {
        type: "default",
        title: "Average time in IVR",
        value: "2.5 sec"
      },
      {
        type: "default",
        title: "Abandoned",
        value: "60%"
      },
      {
        type: "default",
        title: "RNA",
        value: "15%"
      },
      {
        type: "default",
        title: "Voicemails",
        value: "2"
      },
      {
        type: "default",
        title: "Connected",
        value: "30%"
      }
    ]
  },
  {
    type: "default",
    value: "19%",
    titleDesc: "of callers",
    attempts: [
      {
        type: "default",
        title: "Connected",
        value: "30%"
      },
      {
        type: "default",
        title: "RNA",
        value: "30%"
      }
    ]
  },
  {
    type: "default",
    value: "19%",
    titleDesc: "of callers",
    attempts: [
      {
        type: "default",
        title: "Connected",
        value: "30%"
      },
      {
        type: "default",
        title: "RNA",
        value: "30%"
      },
      {
        type: "default",
        title: "Abandoned",
        value: "60%"
      }
    ]
  },
  {
    type: "default",
    value: "19%",
    titleDesc: "of callers",
    attempts: [
      {
        type: "default",
        title: "Connected",
        value: "30%"
      },
      {
        type: "default",
        title: "RNA",
        value: "30%"
      },
      {
        type: "default",
        title: "Average time in IVR",
        value: "2.5 sec"
      },
      {
        type: "default",
        title: "Abandoned",
        value: "60%"
      },
      {
        type: "default",
        title: "RNA",
        value: "15%"
      }
    ]
  }
];

export const reports = [
  {
    params: {
      layoutType: "lout1", // "lout1", "lout2"
      showVisualization: true,
      showGraph: false,
      showTable: true,
      showSummary: true
    },
    id: "78901",
    name: "Report 1",
    number: numbers[1],
    service: "NHSV10",
    days: "All",
    outOfHours: "Excluded",
    from: "9 Jan 2018 - 7 Jan 2018",
    sortBy: "9 Jan 2018 - 7 Jan 2018",
    description: description,
    tags: ["Calls", "Summary"],
    graph: {
      title: "Graph Title",
      type: "Sankey", // "Line" , "BarChart" , "Bar" , "PieChart"
      options: {
        // title: "My Big Pie Chart",
        showColorCode: true,
        height: 350,
        hAxis: {
          title: "Total Population",
          minValue: 0
        },
        legend: { position: "top", alignment: "end" }
      },
      data: [
        ["Source", "Outcome", "Measure"],
        ["Brazil", "Portugal", 1],
        ["Brazil", "France", 1],
        ["Brazil", "Spain", 1],
        ["Brazil", "England", 3],
        ["Canada", "Portugal", 1],
        ["Canada", "France", 3],
        ["Canada", "England", 1],
        ["Mexico", "Portugal", 1],
        ["Mexico", "France", 3],
        ["Mexico", "Spain", 2],
        ["Mexico", "England", 1],
        ["USA", "Portugal", 2],
        ["USA", "France", 1],
        ["USA", "Spain", 4],
        ["USA", "England", 4],
        ["Portugal", "Angola", 5],
        ["Portugal", "Senegal", 1],
        ["Portugal", "Morocco", 3],
        ["Portugal", "South Africa", 3],
        ["France", "Angola", 5],
        ["France", "Senegal", 3],
        ["France", "Mali", 3],
        ["France", "Morocco", 3],
        ["France", "South Africa", 1],
        ["Spain", "Senegal", 1],
        ["Spain", "Morocco", 5],
        ["Spain", "South Africa", 1],
        ["England", "Angola", 5],
        ["England", "Senegal", 1],
        ["England", "Morocco", 2],
        ["England", "South Africa", 1]
      ]
    },
    summarySection: {
      type: "default", //"default", "pink", "blue, "yellow"", "green"
      cardGroup: cardGroup
    },
    table: {
      type: "wideTable", //"wideTable", "collapseTable"
      data: [
        {
          service: "Service One",
          number: "03234 2343 3",
          description: "description one",
          attempts: "410",
          connected: "1536",
          connectedPercent: "10",
          busy: "2",
          busyPercent: "12",
          notAnswered: "7",
          abandoned: "3",
          abandonedPercent: "5",
          talkTime: "talk Time 1",
          status: "active"
        },
        {
          service: "Service Two",
          number: "03234 2343 3",
          description: "description Two",
          attempts: "45",
          connected: "12",
          connectedPercent: "15",
          busy: "4",
          busyPercent: "2",
          notAnswered: "3",
          abandoned: "2",
          abandonedPercent: "5",
          talkTime: "talk Time 2",
          status: "active"
        },
        {
          service: "Service Three",
          number: "03234 2343 3",
          description: "description Three",
          attempts: "1",
          connected: "1241",
          connectedPercent: "25",
          busy: "9",
          busyPercent: "3",
          notAnswered: "8",
          abandoned: "9",
          abandonedPercent: "15",
          talkTime: "talk Time 3",
          status: "active"
        },
        {
          service: "Service Four",
          number: "03234 2343 3",
          description: "description Four",
          attempts: "25",
          connected: "4534",
          connectedPercent: "1",
          busy: "10",
          busyPercent: "7",
          notAnswered: "0",
          abandoned: "3",
          abandonedPercent: "30",
          talkTime: "talk Time 4",
          status: "active"
        },
        {
          service: "Service Five",
          number: "03234 2343 3",
          description: "description Five",
          attempts: "12",
          connected: "1",
          connectedPercent: "12",
          busy: "6",
          busyPercent: "3",
          notAnswered: "3",
          abandoned: "5",
          abandonedPercent: "15",
          talkTime: "talk Time 5",
          status: "active"
        }
      ]
    },
    isFavorite: true
  },
  {
    params: {
      layoutType: "lout1", // "lout1", "lout2"
      showGraph: true,
      showVisualization: true,
      showTable: true,
      showSummary: true
    },
    id: "78902",
    name: "Report 2",
    number: numbers[1],
    service: "NHSV11",
    days: "All",
    outOfHours: "Not Excluded",
    from: "9 Jan 2018 - 7 Jan 2018",
    sortBy: "9 Jan 2018 - 7 Jan 2018",
    description: description,
    tags: ["Agent", "Performance"],
    graph: {
      title: "Graph Title",
      type: "Line", // "Sankey" , "BarChart" , "Bar", "PieChart"
      options: {
        chartArea: { width: "60%" },
        height: 400,
        colors: ["#2196F3", "#FFC107"],
        title: "chartTitle",
        bar: { groupWidth: "60%" },
        legend: { position: "top", alignment: "end" }
      },
      data: [
        ["Time", "Calls", "Answered", "RNA", "Busy"],
        [1, 37.8, 80.8, 41.8, 5],
        [2, 30.9, 69.5, 32.4, 12],
        [3, 25.4, 57, 25.7, 34],
        [4, 11.7, 18.8, 10.5, 23],
        [5, 11.9, 17.6, 10.4, 2],
        [6, 8.8, 13.6, 7.7, 43],
        [7, 7.6, 12.3, 9.6, 5],
        [8, 12.3, 29.2, 10.6, 8],
        [9, 16.9, 42.9, 14.8, 51],
        [10, 12.8, 30.9, 11.6, 15],
        [11, 5.3, 7.9, 4.7, 25],
        [12, 6.6, 8.4, 5.2, 20],
        [13, 4.8, 6.3, 3.6, 11],
        [14, 4.2, 6.2, 3.4, 14]
      ]
    },
    summarySection: {
      type: "default", //"default", "success", "danger,"
      cardGroup: cardGroup
    },
    table: {
      type: "collapseTable", //"wideTable", "collapseTable"
      data: [
        {
          service: "Service One",
          number: "03234 2343 3",
          description: "description one",
          attempts: "400",
          connected: "connected title",
          connectedPercent: "connected %",
          busy: "Busy",
          busyPercent: "Busy Percent",
          notAnswered: "Not Answered",
          abandoned: "Abandoned",
          abandonedPercent: "Abandoned Percent",
          talkTime: "talk Time",
          status: "active"
        },
        {
          service: "Service Three",
          number: "03234 2343 3",
          description: "description one",
          attempts: "400",
          connected: "connected title",
          connectedPercent: "connected %",
          busy: "Busy",
          busyPercent: "Busy Percent",
          notAnswered: "Not Answered",
          abandoned: "Abandoned",
          abandonedPercent: "Abandoned Percent",
          talkTime: "talk Time",
          status: "active"
        },
        {
          service: "Service Three",
          number: "03234 2343 3",
          description: "description one",
          attempts: "400",
          connected: "connected title",
          connectedPercent: "connected %",
          busy: "Busy",
          busyPercent: "Busy Percent",
          notAnswered: "Not Answered",
          abandoned: "Abandoned",
          abandonedPercent: "Abandoned Percent",
          talkTime: "talk Time",
          status: "active"
        }
      ]
    },
    isFavorite: true
  },
  {
    params: {
      showGraph: true
    },
    id: "78903",
    name: "Report 3",
    number: numbers[1],
    service: "NHSV12",
    days: "All",
    outOfHours: "Excluded",
    from: "9 Jan 2018 - 7 Jan 2018",
    sortBy: "9 Jan 2018 - 7 Jan 2018",
    description: description,
    tags: ["Queue"],
    graph: {
      // title: "Graph Title",
      type: "BarChart", // "Sankey" , "Bar" , "Line"
      options: {
        chartArea: { width: "60%" },
        height: 500,
        colors: ["#2196F3", "#FFC107"],
        title: "Graph Title",
        bar: { groupWidth: "60%" },
        legend: { position: "top", alignment: "end" }
      },
      data: [
        ["City", "Calls", "Minutes"],
        ["New York City, NY", 100, 10000],
        ["Los Angeles, CA", 1000, 8000],
        ["Chicago, IL", 500, 7000],
        ["Houston, TX", 400, 5000],
        ["Philadelphia, PA", 3000, 4000]
      ]
    },
    table: {
      type: "collapseTable", //"collapseTable", "wideTable"
      data: [
        {
          service: "Service One",
          number: "03234 2343 3",
          description: "description one",
          attempts: "400",
          connected: "connected title",
          connectedPercent: "connected %",
          busy: "Busy",
          busyPercent: "Busy Percent",
          notAnswered: "Not Answered",
          abandoned: "Abandoned",
          abandonedPercent: "Abandoned Percent",
          talkTime: "talk Time",
          status: "active"
        },
        {
          service: "Service Three",
          number: "03234 2343 3",
          description: "description one",
          attempts: "400",
          connected: "connected title",
          connectedPercent: "connected %",
          busy: "Busy",
          busyPercent: "Busy Percent",
          notAnswered: "Not Answered",
          abandoned: "Abandoned",
          abandonedPercent: "Abandoned Percent",
          talkTime: "talk Time",
          status: "active"
        },
        {
          service: "Service Three",
          number: "03234 2343 3",
          description: "description one",
          attempts: "400",
          connected: "connected title",
          connectedPercent: "connected %",
          busy: "Busy",
          busyPercent: "Busy Percent",
          notAnswered: "Not Answered",
          abandoned: "Abandoned",
          abandonedPercent: "Abandoned Percent",
          talkTime: "talk Time",
          status: "active"
        }
      ]
    },
    isFavorite: true
  },
  {
    params: {
      showGraph: true
    },
    id: "78904",
    name: "Report 4",
    number: numbers[1],
    service: "NHSV13",
    days: "All",
    outOfHours: "Not Excluded",
    from: "9 Jan 2018 - 7 Jan 2018",
    sortBy: "9 Jan 2018 - 7 Jan 2018",
    description: description,
    tags: ["Caller"],
    graph: {
      title: "Graph Title",
      type: "Bar", // "Line" , "Sankey" , "BarChart", "PieChart"
      options: {
        chartArea: { width: "60%" },
        height: 400,
        colors: ["#2196F3", "#FFC107"],
        isStacked: true,
        // bars: 'vertical',
        bar: { groupWidth: "60%" },
        legend: { position: "top", alignment: "end" }
      },
      data: [
        ["Time", "Calls"],
        ["8 am", 11],
        ["9 am", 10],
        ["10 am", 15],
        ["11 am", 13],
        ["12 pm", 12],
        ["1 pm", 10],
        ["2 pm", 6],
        ["3 pm", 4],
        ["4 pm", 5]
      ]
    },

    table: {
      type: "collapseTable", //"collapseTable", "wideTable"
      data: [
        {
          service: "Service One",
          number: "03234 2343 3",
          description: "description one",
          attempts: "400",
          connected: "connected title",
          connectedPercent: "connected %",
          busy: "Busy",
          busyPercent: "Busy Percent",
          notAnswered: "Not Answered",
          abandoned: "Abandoned",
          abandonedPercent: "Abandoned Percent",
          talkTime: "talk Time",
          status: "active"
        },
        {
          service: "Service Three",
          number: "03234 2343 3",
          description: "description one",
          attempts: "400",
          connected: "connected title",
          connectedPercent: "connected %",
          busy: "Busy",
          busyPercent: "Busy Percent",
          notAnswered: "Not Answered",
          abandoned: "Abandoned",
          abandonedPercent: "Abandoned Percent",
          talkTime: "talk Time",
          status: "active"
        },
        {
          service: "Service Three",
          number: "03234 2343 3",
          description: "description one",
          attempts: "400",
          connected: "connected title",
          connectedPercent: "connected %",
          busy: "Busy",
          busyPercent: "Busy Percent",
          notAnswered: "Not Answered",
          abandoned: "Abandoned",
          abandonedPercent: "Abandoned Percent",
          talkTime: "talk Time",
          status: "active"
        }
      ]
    },
    isFavorite: true
  },
  {
    params: {
      showGraph: true
    },
    id: "78905",
    name: "Report 5",
    number: numbers[1],
    service: "NHSV14",
    days: "All",
    outOfHours: "Excluded",
    from: "9 Jan 2018 - 7 Jan 2018",
    sortBy: "9 Jan 2018 - 7 Jan 2018",
    description: description,
    tags: ["Calls", "Dilaler"],
    graph: {
      title: "Graph Title",
      type: "Bar", // "Line" , "Sankey" , "BarChart" , "PieChart"
      options: {
        chartArea: { width: "100%" },
        height: 400,
        colors: ["#2196F3", "#FFC107"]
      },

      data: [
        ["Time", "Calls", "Minutes"],
        ["9am", 5, 10],
        ["10am", 30, 20],
        ["11am", 25, 30],
        ["12pm", 15, 25],
        ["1pm", 15, 30],
        ["2pm", 25, 30],
        ["3pm", 35, 15],
        ["4pm", 20, 30],
        ["5pm", 15, 25]
      ]
    },
    table: {
      type: "collapseTable", //"collapseTable", "wideTable"
      data: [
        {
          service: "Service One",
          number: "03234 2343 3",
          description: "description one",
          attempts: "400",
          connected: "connected title",
          connectedPercent: "connected %",
          busy: "Busy",
          busyPercent: "Busy Percent",
          notAnswered: "Not Answered",
          abandoned: "Abandoned",
          abandonedPercent: "Abandoned Percent",
          talkTime: "talk Time",
          status: "active"
        },
        {
          service: "Service Three",
          number: "03234 2343 3",
          description: "description one",
          attempts: "400",
          connected: "connected title",
          connectedPercent: "connected %",
          busy: "Busy",
          busyPercent: "Busy Percent",
          notAnswered: "Not Answered",
          abandoned: "Abandoned",
          abandonedPercent: "Abandoned Percent",
          talkTime: "talk Time",
          status: "active"
        },
        {
          service: "Service Three",
          number: "03234 2343 3",
          description: "description one",
          attempts: "400",
          connected: "connected title",
          connectedPercent: "connected %",
          busy: "Busy",
          busyPercent: "Busy Percent",
          notAnswered: "Not Answered",
          abandoned: "Abandoned",
          abandonedPercent: "Abandoned Percent",
          talkTime: "talk Time",
          status: "active"
        }
      ]
    },
    isFavorite: false
  },
  {
    params: {
      showGraph: true
    },
    id: "78906",
    name: "Report 6",
    number: numbers[1],
    service: "NHSV14",
    days: "All",
    outOfHours: "Excluded",
    from: "9 Jan 2018 - 7 Jan 2018",
    sortBy: "9 Jan 2018 - 7 Jan 2018",
    description: description,
    tags: ["Calls", "Dilaler"],
    graph: {
      title: "Graph Title",
      type: "Bar", // "Line" , "Sankey" , "BarChart" , "PieChart"
      options: {
        chartArea: { width: "100%" },
        height: 400,
        colors: ["#2196F3", "#FFC107"],
        bars: "vertical",
        isStacked: true
      },

      data: [
        ["Duration", "Calls"],
        ["0-10 secs", 5],
        ["10-30 secs", 30],
        ["30-60 secs", 25],
        ["1-2 mins", 15],
        ["3-4 mins", 10],
        ["5-6 mins", 14],
        ["7-8 mins", 12],
        ["9-10 mins", 9],
        ["11-12 mins", 4],
        ["13-14 mins", 25],
        ["15-16 mins", 6],
        ["17-18 mins", 11],
        ["19-20 mins", 20],
        ["21-22 mins", 5],
        ["23-24 mins", 10],
        ["25-26 mins", 5],
        ["27-28 mins", 16],
        ["29-30 mins", 5],
        ["31-32 mins", 23],
        ["33-34 mins", 15],
        ["35-36 mins", 20],
        ["37-38 mins", 12],
        ["39-40 mins", 18]
      ]
    },
    table: {
      type: "collapseTable", //"collapseTable", "wideTable"
      data: [
        {
          service: "Service One",
          number: "03234 2343 3",
          description: "description one",
          attempts: "400",
          connected: "connected title",
          connectedPercent: "connected %",
          busy: "Busy",
          busyPercent: "Busy Percent",
          notAnswered: "Not Answered",
          abandoned: "Abandoned",
          abandonedPercent: "Abandoned Percent",
          talkTime: "talk Time",
          status: "active"
        },
        {
          service: "Service Three",
          number: "03234 2343 3",
          description: "description one",
          attempts: "400",
          connected: "connected title",
          connectedPercent: "connected %",
          busy: "Busy",
          busyPercent: "Busy Percent",
          notAnswered: "Not Answered",
          abandoned: "Abandoned",
          abandonedPercent: "Abandoned Percent",
          talkTime: "talk Time",
          status: "active"
        },
        {
          service: "Service Three",
          number: "03234 2343 3",
          description: "description one",
          attempts: "400",
          connected: "connected title",
          connectedPercent: "connected %",
          busy: "Busy",
          busyPercent: "Busy Percent",
          notAnswered: "Not Answered",
          abandoned: "Abandoned",
          abandonedPercent: "Abandoned Percent",
          talkTime: "talk Time",
          status: "active"
        }
      ]
    },
    isFavorite: false
  },
  {
    params: {
      showGraph: true
    },
    id: "78907",
    name: "Report 7",
    number: numbers[1],
    service: "NHSV14",
    days: "All",
    outOfHours: "Excluded",
    from: "9 Jan 2018 - 7 Jan 2018",
    sortBy: "9 Jan 2018 - 7 Jan 2018",
    description: description,
    tags: ["Calls", "Dilaler"],
    graph: {
      title: "Graph Title",
      type: "PieChart", //"PieChart", "Line" , "Sankey" , "BarChart", "Bar"
      options: {
        chartArea: { width: "100%" },
        height: 400,
        pieHole: 0.4,
        colors: ["#2196F3", "#FFC107", "#E91E63"]
      },

      data: [
        ["Talk", "Hours per Day"],
        ["Mobile callers", 70],
        ["Landline callers", 20],
        ["Short or missing", 10]
      ]
    },
    table: {
      type: "collapseTable", //"collapseTable", "wideTable"
      data: [
        {
          service: "Service One",
          number: "03234 2343 3",
          description: "description one",
          attempts: "400",
          connected: "connected title",
          connectedPercent: "connected %",
          busy: "Busy",
          busyPercent: "Busy Percent",
          notAnswered: "Not Answered",
          abandoned: "Abandoned",
          abandonedPercent: "Abandoned Percent",
          talkTime: "talk Time",
          status: "active"
        },
        {
          service: "Service Three",
          number: "03234 2343 3",
          description: "description one",
          attempts: "400",
          connected: "connected title",
          connectedPercent: "connected %",
          busy: "Busy",
          busyPercent: "Busy Percent",
          notAnswered: "Not Answered",
          abandoned: "Abandoned",
          abandonedPercent: "Abandoned Percent",
          talkTime: "talk Time",
          status: "active"
        },
        {
          service: "Service Three",
          number: "03234 2343 3",
          description: "description one",
          attempts: "400",
          connected: "connected title",
          connectedPercent: "connected %",
          busy: "Busy",
          busyPercent: "Busy Percent",
          notAnswered: "Not Answered",
          abandoned: "Abandoned",
          abandonedPercent: "Abandoned Percent",
          talkTime: "talk Time",
          status: "active"
        }
      ]
    },
    isFavorite: false
  },
  {
    params: {
      showGraph: true
    },
    id: "78908",
    name: "Report 8",
    number: numbers[1],
    service: "NHSV14",
    days: "All",
    outOfHours: "Excluded",
    from: "9 Jan 2018 - 7 Jan 2018",
    sortBy: "9 Jan 2018 - 7 Jan 2018",
    description: description,
    tags: ["Calls", "Dilaler"],
    graph: {
      title: "Graph Title",
      type: "Sankey", // "Line" , "Bar" , "BarChart" , "PieChart"
      options: {
        chartArea: { width: "100%" },
        height: 400,
        colors: ["#2196F3", "#FFC107"]
      },

      data: [
        ["Source", "Outcome", "Measure"],
        ["London", "Opening Time", 5],
        ["London", "Customer Service", 7],
        ["London", "Orders", 6],
        ["Manchestor", "Opening Time", 2],
        ["Manchestor", "Customer Service", 9],
        ["Manchestor", "Orders", 4]
      ]
    },
    table: {
      type: "collapseTable", //"collapseTable", "wideTable"
      data: [
        {
          service: "Service One",
          number: "03234 2343 3",
          description: "description one",
          attempts: "400",
          connected: "connected title",
          connectedPercent: "connected %",
          busy: "Busy",
          busyPercent: "Busy Percent",
          notAnswered: "Not Answered",
          abandoned: "Abandoned",
          abandonedPercent: "Abandoned Percent",
          talkTime: "talk Time",
          status: "active"
        },
        {
          service: "Service Three",
          number: "03234 2343 3",
          description: "description one",
          attempts: "400",
          connected: "connected title",
          connectedPercent: "connected %",
          busy: "Busy",
          busyPercent: "Busy Percent",
          notAnswered: "Not Answered",
          abandoned: "Abandoned",
          abandonedPercent: "Abandoned Percent",
          talkTime: "talk Time",
          status: "active"
        },
        {
          service: "Service Three",
          number: "03234 2343 3",
          description: "description one",
          attempts: "400",
          connected: "connected title",
          connectedPercent: "connected %",
          busy: "Busy",
          busyPercent: "Busy Percent",
          notAnswered: "Not Answered",
          abandoned: "Abandoned",
          abandonedPercent: "Abandoned Percent",
          talkTime: "talk Time",
          status: "active"
        }
      ]
    },
    isFavorite: false
  },
  {
    params: {
      showGraph: true
    },
    id: "78909",
    name: "Report 9",
    number: numbers[1],
    service: "NHSV14",
    days: "All",
    outOfHours: "Excluded",
    from: "9 Jan 2018 - 7 Jan 2018",
    sortBy: "9 Jan 2018 - 7 Jan 2018",
    description: description,
    tags: ["Calls", "Dilaler"],
    graph: {
      title: "Graph Title",
      type: "Bar", // "Line" , "Sankey" , "BarChart"
      options: {
        chartArea: { width: "100%" },
        height: 400,
        colors: ["#FFC107"]
      },

      data: [
        ["Talk", "Hours per Day"],
        ["Mobile callers", 50],
        ["Landline callers", 20],
        ["Short or missing", 40]
      ]
    },
    table: {
      type: "collapseTable", //"collapseTable", "wideTable"
      data: [
        {
          service: "Service One",
          number: "03234 2343 3",
          description: "description one",
          attempts: "400",
          connected: "connected title",
          connectedPercent: "connected %",
          busy: "Busy",
          busyPercent: "Busy Percent",
          notAnswered: "Not Answered",
          abandoned: "Abandoned",
          abandonedPercent: "Abandoned Percent",
          talkTime: "talk Time",
          status: "active"
        },
        {
          service: "Service Three",
          number: "03234 2343 3",
          description: "description one",
          attempts: "400",
          connected: "connected title",
          connectedPercent: "connected %",
          busy: "Busy",
          busyPercent: "Busy Percent",
          notAnswered: "Not Answered",
          abandoned: "Abandoned",
          abandonedPercent: "Abandoned Percent",
          talkTime: "talk Time",
          status: "active"
        },
        {
          service: "Service Three",
          number: "03234 2343 3",
          description: "description one",
          attempts: "400",
          connected: "connected title",
          connectedPercent: "connected %",
          busy: "Busy",
          busyPercent: "Busy Percent",
          notAnswered: "Not Answered",
          abandoned: "Abandoned",
          abandonedPercent: "Abandoned Percent",
          talkTime: "talk Time",
          status: "active"
        }
      ]
    },
    isFavorite: false
  }
];

// it is returning a function so you must call emptyReport() to get an object
export const emptyReport = () => {
  const report = {
    graph: {
      showGraph: null
    },
    name: "",
    description: "",
    services: [],
    tags: [],
    startTime: null,
    endTime: null,
    // defaultPublishedVersionId: "",
    // exceptionsEnabled: false,

    fieldService: "service",
    fieldNumbers: "numbers",
    fieldTags: "tags",
    fieldStartTime: "startTime",
    fieldEndTime: "endTime"
    // fieldDefaultPublishedVersionId: "defaultPublishedVersionId",
    // fieldExceptionsEnabled: "exceptionsEnabled"
  };
  report.setName = name => {
    report.name = name;
    return report;
  };
  report.setDescription = description => {
    report.description = description;
    return report;
  };

  report.setService = services => {
    report.services = services;
    return report;
  };

  report.setNumber = numbers => {
    report.numbers = numbers;
    return report;
  };

  report.setTimePeriod = timePeriod => {
    report.timePeriod = timePeriod;
    return report;
  };

  // report.setAdvanceForm = showAdvance => {
  //   report.showAdvance = showAdvance;
  //   return report;
  // };
  report.setShowGraph = showGraph => {
    report.graph.showGraph = showGraph;
    return report;
  };

  report.setTags = tags => {
    report.tags = tags;
    return report;
  };

  report.setStartTime = startTime => {
    report.startTime = startTime;
    return report;
  };

  report.setEndTime = endTime => {
    report.endTime = endTime;
    return report;
  };

  // report.setDefaultPublishedVersionId = defaultPublishedVersionId => {
  //   report.defaultPublishedVersionId = defaultPublishedVersionId;
  //   return report;
  // };

  // report.setExceptionsEnabled = exceptionsEnabled => {
  //   report.exceptionsEnabled = exceptionsEnabled;
  //   return report;
  // };

  report.toScala = () => {
    return report;
  };

  return report;
};

export const reportExample = {
  // exceptions options: 'd' = Default, 'e' = Exception
  id: "73910",
  ...emptyReport()
    .setName("Example Service")
    .setDescription(description)
    .setShowGraph(true)
  // .setStartTime(startTime)
  // .setEndTime(endTime)
  // .setDefaultPublishedVersionId(null) // ("1")
  // .setExceptionsEnabled(true),

  // deprecated fields (need to bee updated also):
  // lastOpenedName: "Jack Smith",
  // lastOpenedDate: "10:00 1 May, 2018",
  // status: "Live on Version 1.2",
  // statusFrom: "1 May, 2018",
  // isFavorite: true
  // defaultPublishedVersionNumber: {
  //   majorVersion: 1,
  //   minorVersion: 1
  // }
};
