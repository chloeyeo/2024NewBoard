const continents = [
    {
        _id: 1,
        name: "Seoul",
    },
    {
        _id: 2,
        name: "Busan",
    },
    {
        _id: 3,
        name: "Suwon",
    },
    {
        _id: 4,
        name: "Daegu",
    },
    {
        _id: 5,
        name: "Incheon",
    },
    {
        _id: 6,
        name: "Jeju",
    },
];

const prices = [
    {
        _id: 0,
        name: "All",
        array: [],
    },
    {
        _id: 1,
        name: "0 ~ 199 KRW",
        array: [0, 199],
    },
    {
        _id: 2,
        name: "200 ~ 249 KRW",
        array: [200, 249],
    },
    {
        _id: 3,
        name: "250 ~ 279 KRW",
        array: [250, 279],
    },
    {
        _id: 4,
        name: "280 ~ 299 KRW",
        array: [280, 299],
    },
    {
        _id: 5,
        name: "300 KRW and above",
        array: [300, 1500000],
    },
];

export { continents, prices };
