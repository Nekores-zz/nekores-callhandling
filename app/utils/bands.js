// This definition has to mach bandTypes enum in Scala World

export const bandTypes = {
  Gold: {
    name: "Gold",
    icon: "",
    color: "#999238",
    value: 0
  },
  Silver: {
    name: "Silver",
    icon: "",
    color: "#A8A8A8",
    value: 1
  },
  Bronze: {
    name: "Bronze",
    icon: "",
    color: "#AF702E",
    value: 2
  },
  Standard: {
    name: "Standard",
    icon: "",
    color: "#353535",
    value: 3
  }
};

export const bands = [bandTypes.Gold, bandTypes.Silver, bandTypes.Bronze, bandTypes.Standard];
